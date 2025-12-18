import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Answer, Question, AIResponse } from '@/types';
import { generateOfflineResult } from '@/lib/scoring';

// Rate limiting store (in-memory, resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

// Validate request body schema
const RequestSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      choiceId: z.enum(['a', 'b', 'c', 'other']),
      otherText: z.string().optional(),
    })
  ),
  questions: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      options: z.array(
        z.object({
          id: z.enum(['a', 'b', 'c']),
          text: z.string(),
        })
      ),
    })
  ),
});

// System prompt for AI
const SYSTEM_PROMPT = `Kamu adalah AI yang menganalisis kepribadian seseorang berdasarkan jawaban quiz "Open House Rumah Jaki Wrapped".

INSTRUKSI PENTING:
1. Output HANYA JSON valid, tanpa teks lain
2. Tentukan archetype utama dan sekunder dari: KERKOM, TES_OMBAK, NYANTAI, CABUT, RAMAI, MAGERS, HEALING, NGIKUT, AMBIS
3. Title harus format "SIPALING ..." (contoh: "SIPALING KERKOM")
4. Description 1-2 kalimat, gaya bahasa gaul Indonesia yang asyik
5. Stats 3 item dengan label dan value yang lucu tapi believable
6. Highlights 3 bullet points
7. Share caption 1 kalimat untuk di-share, pake emoji
8. Confidence 0-100 berdasarkan konsistensi jawaban

GAYA BAHASA:
- Gaul, friendly, Indonesian slang
- TIDAK BOLEH ada kata kasar atau hinaan
- Cocok untuk semua umur
- Positif dan menghibur

OUTPUT SCHEMA (WAJIB PERSIS):
{
  "primary_archetype": "string",
  "secondary_archetype": "string or null",
  "title": "SIPALING ...",
  "description": "string",
  "stats": [{"label":"string","value":"string"}, ...],
  "highlights": ["string", ...],
  "share_caption": "string",
  "confidence": number
}`;

// Get client IP for rate limiting
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return 'unknown';
}

// Check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count++;
  return true;
}

async function callGroqAPI(
  userMessage: string,
  model: string = 'llama-3.3-70b-versatile'
): Promise<AIResponse | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY not configured');
    return null;
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in Groq response');
      return null;
    }

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', content);
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]) as AIResponse;
    
    // Validate required fields
    if (!parsed.title || !parsed.description || !parsed.stats || !parsed.highlights) {
      console.error('Invalid AI response structure:', parsed);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientIP = getClientIP(request);
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please wait a minute.' },
      { status: 429 }
    );
  }

  try {
    // Parse and validate request body
    const body = await request.json();
    const parseResult = RequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { answers, questions } = parseResult.data;

    // Handle empty answers
    if (answers.length === 0) {
      const fallback = generateOfflineResult([]);
      return NextResponse.json({
        result: fallback,
        source: 'fallback',
        message: 'No answers provided, using default result',
      });
    }

    // Prepare user message for AI
    const formattedAnswers = answers.map((a) => {
      const q = questions.find((q) => q.id === a.questionId);
      const qText = q?.text || a.questionId;
      let aText = '';
      
      if (a.choiceId === 'other') {
        aText = `Lainnya: "${a.otherText || ''}"`;
      } else {
        const option = q?.options.find((o) => o.id === a.choiceId);
        aText = option?.text || a.choiceId;
      }
      
      return `Q: ${qText}\nA: ${aText}`;
    });

    const userMessage = `Analisis jawaban quiz berikut dan tentukan archetype:\n\n${formattedAnswers.join('\n\n')}`;

    // Try primary model first
    let aiResult = await callGroqAPI(userMessage, 'llama-3.3-70b-versatile');

    // Fallback to secondary model if primary fails
    if (!aiResult) {
      console.log('Trying fallback model...');
      aiResult = await callGroqAPI(userMessage, 'llama-3.1-8b-instant');
    }

    // If AI fails completely, use offline fallback
    if (!aiResult) {
      const fallback = generateOfflineResult(answers as Answer[]);
      return NextResponse.json({
        result: fallback,
        source: 'fallback',
        message: 'AI unavailable, using offline scoring',
      });
    }

    // Convert AI response to WrappedResult format
    const result = {
      title: aiResult.title,
      description: aiResult.description,
      stats: aiResult.stats,
      highlights: aiResult.highlights,
      shareCaption: aiResult.share_caption,
      primaryArchetype: aiResult.primary_archetype,
      secondaryArchetype: aiResult.secondary_archetype,
      confidence: aiResult.confidence,
      generatedAt: new Date().toISOString(),
      isAI: true,
    };

    return NextResponse.json({
      result,
      source: 'ai',
      message: 'Generated with AI',
    });
  } catch (error) {
    console.error('API route error:', error);
    
    // Try to generate fallback result
    try {
      const fallback = generateOfflineResult([]);
      return NextResponse.json({
        result: fallback,
        source: 'error_fallback',
        message: 'Error occurred, using offline fallback',
      });
    } catch {
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
}
