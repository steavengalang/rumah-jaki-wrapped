// Category types for quiz scoring
export type Category = 
  | 'KERKOM'
  | 'TES_OMBAK'
  | 'NYANTAI'
  | 'CABUT'
  | 'RAMAI'
  | 'MAGERS'
  | 'HEALING'
  | 'NGIKUT'
  | 'AMBIS';

// All available categories
export const CATEGORIES: Category[] = [
  'KERKOM',
  'TES_OMBAK',
  'NYANTAI',
  'CABUT',
  'RAMAI',
  'MAGERS',
  'HEALING',
  'NGIKUT',
  'AMBIS',
];

// Category display names for UI
export const CATEGORY_LABELS: Record<Category, string> = {
  KERKOM: 'Kerkom',
  TES_OMBAK: 'Tes Ombak',
  NYANTAI: 'Nyantai',
  CABUT: 'Cabut',
  RAMAI: 'Ramai',
  MAGERS: 'Magers',
  HEALING: 'Healing',
  NGIKUT: 'Ngikut',
  AMBIS: 'Ambis',
};

// Question option structure
export interface QuestionOption {
  id: 'a' | 'b' | 'c';
  text: string;
  weights: Partial<Record<Category, number>>;
}

// Question structure
export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  allowOther: boolean;
  otherWeightHint?: Partial<Record<Category, number>>;
}

// User answer structure
export interface Answer {
  questionId: string;
  choiceId: 'a' | 'b' | 'c' | 'other';
  otherText?: string;
}

// Stat item for results
export interface StatItem {
  label: string;
  value: string;
}

// AI response structure
export interface AIResponse {
  primary_archetype: string;
  secondary_archetype: string | null;
  title: string;
  description: string;
  stats: StatItem[];
  highlights: string[];
  share_caption: string;
  confidence: number;
}

// Result structure stored locally
export interface WrappedResult {
  title: string;
  description: string;
  stats: StatItem[];
  highlights: string[];
  shareCaption: string;
  primaryArchetype: string;
  secondaryArchetype: string | null;
  confidence: number;
  generatedAt: string;
  isAI: boolean;
}

// Storage keys
export const STORAGE_KEYS = {
  QUESTIONS: 'wrapped_questions_v1',
  ANSWERS: 'wrapped_answers_v1',
  RESULT: 'wrapped_result_v1',
} as const;
