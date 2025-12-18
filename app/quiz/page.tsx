'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ParallaxBackground from '@/components/ParallaxBackground';
import ProgressBar from '@/components/ProgressBar';
import QuestionCard from '@/components/QuestionCard';
import { QUESTIONS } from '@/lib/questions';
import { Answer } from '@/types';
import {
    loadAnswers,
    saveAnswers,
    updateAnswer,
    getAnswerForQuestion,
} from '@/lib/storage';

// Helper to check if answer is valid (for "other", require text)
function isValidAnswer(answer: Answer | undefined): boolean {
    if (!answer) return false;
    if (answer.choiceId === 'other') {
        return !!(answer.otherText && answer.otherText.trim().length > 0);
    }
    return true;
}

export default function QuizPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const savedAnswers = loadAnswers();
        setAnswers(savedAnswers);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!isLoading && answers.length > 0) {
            saveAnswers(answers);
        }
    }, [answers, isLoading]);

    const currentQuestion = QUESTIONS[currentIndex];
    const currentAnswer = getAnswerForQuestion(answers, currentQuestion.id);
    const totalQuestions = QUESTIONS.length;
    const isLastQuestion = currentIndex === totalQuestions - 1;
    const isFirstQuestion = currentIndex === 0;

    // Check if current answer is valid
    const canProceed = useMemo(() => {
        return isValidAnswer(currentAnswer);
    }, [currentAnswer]);

    const handleAnswer = useCallback((answer: Answer) => {
        setAnswers((prev) => updateAnswer(prev, answer));
    }, []);

    const handleNext = useCallback(() => {
        if (!canProceed) return;
        if (isLastQuestion) {
            router.push('/result');
        } else {
            setDirection(1);
            setCurrentIndex((prev) => prev + 1);
        }
    }, [canProceed, isLastQuestion, router]);

    const handleBack = useCallback(() => {
        if (!isFirstQuestion) {
            setDirection(-1);
            setCurrentIndex((prev) => prev - 1);
        }
    }, [isFirstQuestion]);

    // Determine status message
    const statusMessage = useMemo(() => {
        if (!currentAnswer) return 'Pilih jawaban untuk melanjutkan';
        if (currentAnswer.choiceId === 'other' && !currentAnswer.otherText?.trim()) {
            return 'Isi teks untuk lanjut';
        }
        return '✓ Jawaban tersimpan';
    }, [currentAnswer]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-950">
                <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <ParallaxBackground variant="quiz" />

            <div className="relative z-10 min-h-screen flex flex-col px-4 py-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-lg mx-auto mb-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Keluar</span>
                        </Link>
                        <span className="text-white/40 text-sm font-medium">Rumah Jaki Wrapped</span>
                    </div>
                    <ProgressBar current={currentIndex + 1} total={totalQuestions} />
                </motion.div>

                <div className="flex-1 flex items-center justify-center py-4">
                    <AnimatePresence mode="wait" custom={direction}>
                        <QuestionCard
                            key={currentQuestion.id}
                            question={currentQuestion}
                            answer={currentAnswer}
                            onAnswer={handleAnswer}
                            isActive={true}
                        />
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="w-full max-w-lg mx-auto pt-4"
                >
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={handleBack}
                            disabled={isFirstQuestion}
                            whileHover={{ scale: isFirstQuestion ? 1 : 1.02 }}
                            whileTap={{ scale: isFirstQuestion ? 1 : 0.98 }}
                            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 ${isFirstQuestion
                                    ? 'bg-white/5 border-white/5 text-white/20 cursor-not-allowed'
                                    : 'bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/30'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        <motion.button
                            onClick={handleNext}
                            disabled={!canProceed}
                            whileHover={{ scale: !canProceed ? 1 : 1.02 }}
                            whileTap={{ scale: !canProceed ? 1 : 0.98 }}
                            className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-semibold text-base transition-all duration-200 ${!canProceed
                                    ? 'bg-white/10 border border-white/10 text-white/40 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30'
                                }`}
                        >
                            <span>{isLastQuestion ? 'Lihat Hasil' : 'Lanjut'}</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <p className={`text-xs ${canProceed ? 'text-white/40' : 'text-primary-400'}`}>
                            {statusMessage}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
