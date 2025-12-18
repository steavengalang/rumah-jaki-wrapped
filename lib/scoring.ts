import { Answer, Category, Question, StatItem, WrappedResult, CATEGORIES } from '@/types';
import { QUESTIONS, getQuestionById } from './questions';

// Archetype definitions with titles and descriptions
interface ArchetypeInfo {
  title: string;
  description: string;
  stats: StatItem[];
  highlights: string[];
  shareCaption: string;
}

const ARCHETYPES: Record<Category, ArchetypeInfo> = {
  KERKOM: {
    title: 'SIPALING KERKOM',
    description: 'Lu itu partner kerkom ideal! Selalu siap buat diskusi dan ngerjain tugas bareng.',
    stats: [
      { label: 'Jam Kerja Kelompok', value: '847' },
      { label: 'Tugas Selesai', value: '23' },
      { label: 'Deadline Met', value: '100%' },
    ],
    highlights: [
      'MVP kerja kelompok',
      'Sering jadi ketua kelompok',
      'Partner diskusi andalan',
    ],
    shareCaption: '📚 Gue dapet SIPALING KERKOM di Open House Rumah Jaki Wrapped! Kerkom bareng yuk? 🔥',
  },
  TES_OMBAK: {
    title: 'SIPALING TES OMBAK',
    description: 'Gamer sejati! Lu selalu siap main game apa aja dan suka nyoba game baru.',
    stats: [
      { label: 'Jam Gaming', value: '150' },
      { label: 'Games Played', value: '25' },
      { label: 'Win Rate', value: '78%' },
    ],
    highlights: [
      'Pro gamer in the making',
      'Suka try game baru',
      'Competitive spirit tinggi',
    ],
    shareCaption: '🎮 SIPALING TES OMBAK! Gue suka banget main game di Open House Rumah Jaki 🎯',
  },
  NYANTAI: {
    title: 'SIPALING NYANTAI',
    description: 'Master of chill! Lu bikin suasana jadi calm dan cozy di mana aja.',
    stats: [
      { label: 'Chill Sessions', value: '42' },
      { label: 'Comfort Level', value: '98%' },
      { label: 'Vibe Score', value: '95' },
    ],
    highlights: [
      'Aura tenang yang menular',
      'Partner ngobrol ideal',
      'Stress relief berjalan',
    ],
    shareCaption: '☕ SIPALING NYANTAI! Gue emang paling cocok buat nongkrong santai di Rumah Jaki 🌿',
  },
  CABUT: {
    title: 'SIPALING CABUT',
    description: 'Si ninja pulang! Lu punya timing yang sempurna buat exit tanpa drama.',
    stats: [
      { label: 'Silent Exit', value: '17' },
      { label: 'Average Stay', value: '45 menit' },
      { label: 'Disappear Rate', value: '87%' },
    ],
    highlights: [
      'Master of French Exit',
      'Punctual to leave',
      'Mystery presence',
    ],
    shareCaption: '👻 SIPALING CABUT! Gue emang jagoan ilang tanpa jejak di Open House Rumah Jaki 😂',
  },
  RAMAI: {
    title: 'SIPALING RAMAI',
    description: 'Center of attention! Lu yang bikin suasana jadi hidup dan penuh tawa.',
    stats: [
      { label: 'Tawa Generated', value: '∞' },
      { label: 'Energy Level', value: '200%' },
      { label: 'Hype Moments', value: '45' },
    ],
    highlights: [
      'Official hype person',
      'Pembawa keramaian',
      'Vibes booster utama',
    ],
    shareCaption: '🎉 SIPALING RAMAI! Ga rame tanpa gue di Open House Rumah Jaki! Let\'s gooo! 🔥',
  },
  MAGERS: {
    title: 'SIPALING MAGERS',
    description: 'Professional chiller! Lu udah nyaman, ngapain pindah? Stay aja sampe bubar.',
    stats: [
      { label: 'Hours Stayed', value: '999+' },
      { label: 'Couch Potato Score', value: '100%' },
      { label: 'Move Count', value: '3' },
    ],
    highlights: [
      'Sekali duduk, betah banget',
      'Immune to FOMO',
      'Comfort zone master',
    ],
    shareCaption: '🛋️ SIPALING MAGERS! Gue emang the ultimate stay-in person di Rumah Jaki 😴',
  },
  HEALING: {
    title: 'SIPALING HEALING',
    description: 'Rumah Jaki = safe space lu! Tempat buat recharge dan me-time yang perfect.',
    stats: [
      { label: 'Peace Points', value: '847' },
      { label: 'Recharge Level', value: '95%' },
      { label: 'Zen Moments', value: '28' },
    ],
    highlights: [
      'Self-care enthusiast',
      'Good vibes absorber',
      'Mental health respector',
    ],
    shareCaption: '🌸 SIPALING HEALING! Rumah Jaki tuh safe space gue buat recharge ✨',
  },
  NGIKUT: {
    title: 'SIPALING NGIKUT',
    description: 'Go with the flow! Lu adaptable banget dan bisa vibe sama siapa aja.',
    stats: [
      { label: 'Flex Score', value: '93%' },
      { label: 'Groups Joined', value: '12' },
      { label: 'Adaptability', value: 'MAX' },
    ],
    highlights: [
      'Universal friend',
      'No drama, just vibes',
      'Easy-going legend',
    ],
    shareCaption: '🌊 SIPALING NGIKUT! Gue emang paling gampang adaptasi di Open House Rumah Jaki 🤙',
  },
  AMBIS: {
    title: 'SIPALING AMBIS',
    description: 'Strategic planner! Lu punya tujuan jelas dan tau persis mau ngapain.',
    stats: [
      { label: 'Missions Completed', value: '15' },
      { label: 'Focus Level', value: '88%' },
      { label: 'Goals Achieved', value: '12' },
    ],
    highlights: [
      'Clear intentions',
      'Time management pro',
      'Purposeful presence',
    ],
    shareCaption: '🎯 SIPALING AMBIS! Gue dateng dengan plan dan goal di Open House Rumah Jaki 💪',
  },
};

// Calculate category scores from answers
export function calculateScores(
  answers: Answer[],
  questions: Question[] = QUESTIONS
): Record<Category, number> {
  // Initialize scores
  const scores: Record<Category, number> = {} as Record<Category, number>;
  CATEGORIES.forEach((cat) => {
    scores[cat] = 0;
  });

  // Process each answer
  for (const answer of answers) {
    const question = getQuestionById(answer.questionId);
    if (!question) continue;

    if (answer.choiceId === 'other') {
      // Use otherWeightHint if available, otherwise give small neutral scores
      const weights = question.otherWeightHint || { NGIKUT: 1, HEALING: 1 };
      for (const [cat, weight] of Object.entries(weights)) {
        scores[cat as Category] += weight;
      }
    } else {
      // Find the selected option
      const option = question.options.find((o) => o.id === answer.choiceId);
      if (option) {
        for (const [cat, weight] of Object.entries(option.weights)) {
          scores[cat as Category] += weight;
        }
      }
    }
  }

  return scores;
}

// Get top categories sorted by score
export function getTopCategories(
  scores: Record<Category, number>,
  count: number = 2
): Category[] {
  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([cat]) => cat as Category);
}

// Generate offline fallback result
export function generateOfflineResult(answers: Answer[]): WrappedResult {
  // Handle empty answers
  if (answers.length === 0) {
    const defaultArchetype = ARCHETYPES.NGIKUT;
    return {
      title: 'SIPALING MYSTERIOUS',
      description: 'Lu masih misterius! Kayaknya belum terlalu aktif di rumah Jaki, tapi it\'s okay!',
      stats: [
        { label: 'Mystery Level', value: '???%' },
        { label: 'Visits', value: '0' },
        { label: 'Vibes', value: 'TBD' },
      ],
      highlights: [
        'Masih jadi teka-teki',
        'Potensi infinite',
        'Stay tuned buat next chapter',
      ],
      shareCaption: '🤔 SIPALING MYSTERIOUS! Gue masih misterius di Open House Rumah Jaki. Coming soon! 👀',
      primaryArchetype: 'NGIKUT',
      secondaryArchetype: null,
      confidence: 50,
      generatedAt: new Date().toISOString(),
      isAI: false,
    };
  }

  const scores = calculateScores(answers);
  const topCats = getTopCategories(scores, 2);
  const primary = topCats[0];
  const secondary = topCats[1] || null;

  const primaryInfo = ARCHETYPES[primary];

  // Create result with some dynamic stats
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = Math.min(95, Math.round((answers.length / QUESTIONS.length) * 100));

  return {
    title: primaryInfo.title,
    description: primaryInfo.description,
    stats: primaryInfo.stats.map((s, i) => {
      // Add some variation to make it feel more personalized
      if (s.label.includes('Level') || s.label.includes('Score') || s.label.includes('Rate')) {
        const baseValue = parseInt(s.value) || 80;
        const variation = Math.floor(Math.random() * 15) - 7;
        return { ...s, value: `${Math.min(100, Math.max(60, baseValue + variation))}%` };
      }
      return s;
    }),
    highlights: primaryInfo.highlights,
    shareCaption: primaryInfo.shareCaption,
    primaryArchetype: primary,
    secondaryArchetype: secondary,
    confidence,
    generatedAt: new Date().toISOString(),
    isAI: false,
  };
}

// Parse numeric value from stat string
export function parseStatValue(value: string): number {
  // Handle special cases
  if (value === '∞' || value === '999+') return 999;
  if (value === '???' || value === 'TBD' || value === 'MAX') return 100;
  
  // Extract numeric part
  const numeric = value.replace(/[^0-9.]/g, '');
  return parseFloat(numeric) || 0;
}
