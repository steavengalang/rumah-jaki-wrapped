import { Answer, Question, WrappedResult, STORAGE_KEYS } from '@/types';
import { QUESTIONS } from './questions';

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Save answers to localStorage
export function saveAnswers(answers: Answer[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
  } catch (error) {
    console.error('Failed to save answers:', error);
  }
}

// Load answers from localStorage
export function loadAnswers(): Answer[] {
  if (!isBrowser) return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ANSWERS);
    if (!stored) return [];
    return JSON.parse(stored) as Answer[];
  } catch (error) {
    console.error('Failed to load answers:', error);
    return [];
  }
}

// Save questions to localStorage (for reference/versioning)
export function saveQuestions(questions: Question[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  } catch (error) {
    console.error('Failed to save questions:', error);
  }
}

// Load questions from localStorage
export function loadQuestions(): Question[] {
  if (!isBrowser) return QUESTIONS;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!stored) return QUESTIONS;
    return JSON.parse(stored) as Question[];
  } catch (error) {
    console.error('Failed to load questions:', error);
    return QUESTIONS;
  }
}

// Save result to localStorage
export function saveResult(result: WrappedResult): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEYS.RESULT, JSON.stringify(result));
  } catch (error) {
    console.error('Failed to save result:', error);
  }
}

// Load result from localStorage
export function loadResult(): WrappedResult | null {
  if (!isBrowser) return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RESULT);
    if (!stored) return null;
    return JSON.parse(stored) as WrappedResult;
  } catch (error) {
    console.error('Failed to load result:', error);
    return null;
  }
}

// Clear all stored data
export function clearAllData(): void {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(STORAGE_KEYS.ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.RESULT);
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
}

// Get answer for specific question
export function getAnswerForQuestion(
  answers: Answer[],
  questionId: string
): Answer | undefined {
  return answers.find((a) => a.questionId === questionId);
}

// Update or add answer
export function updateAnswer(answers: Answer[], newAnswer: Answer): Answer[] {
  const existingIndex = answers.findIndex(
    (a) => a.questionId === newAnswer.questionId
  );
  if (existingIndex >= 0) {
    const updated = [...answers];
    updated[existingIndex] = newAnswer;
    return updated;
  }
  return [...answers, newAnswer];
}
