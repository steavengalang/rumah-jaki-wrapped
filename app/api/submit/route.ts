import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, canUserSubmit, getCurrentYear } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { WrappedResult } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    // Check if user can submit
    const { canSubmit, reason } = await canUserSubmit(session.user.id);
    if (!canSubmit) {
      return NextResponse.json(
        { error: reason },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const result: WrappedResult = body.result;

    if (!result) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Save to database
    const yearlyResult = await prisma.yearlyResult.create({
      data: {
        userId: session.user.id,
        year: getCurrentYear(),
        title: result.title,
        description: result.description,
        statsJson: JSON.stringify(result.stats),
        highlightsJson: JSON.stringify(result.highlights),
        shareCaption: result.shareCaption,
        primaryArchetype: result.primaryArchetype || 'NGIKUT',
        secondaryArchetype: result.secondaryArchetype || null,
        confidence: result.confidence,
        isAI: result.isAI,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Result saved successfully',
      id: yearlyResult.id,
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
