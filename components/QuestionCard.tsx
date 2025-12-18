'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Answer } from '@/types';
import AnimatedCard from './AnimatedCard';

interface QuestionCardProps {
    question: Question;
    answer: Answer | undefined;
    onAnswer: (answer: Answer) => void;
    isActive: boolean;
}

export default function QuestionCard({
    question,
    answer,
    onAnswer,
    isActive,
}: QuestionCardProps) {
    const [otherText, setOtherText] = useState(answer?.otherText || '');
    const [showOtherInput, setShowOtherInput] = useState(answer?.choiceId === 'other');

    // Update local state when answer prop changes
    useEffect(() => {
        if (answer?.choiceId === 'other') {
            setShowOtherInput(true);
            setOtherText(answer.otherText || '');
        } else {
            setShowOtherInput(false);
            setOtherText('');
        }
    }, [answer]);

    const handleOptionSelect = (optionId: 'a' | 'b' | 'c') => {
        setShowOtherInput(false);
        onAnswer({
            questionId: question.id,
            choiceId: optionId,
        });
    };

    const handleOtherClick = () => {
        setShowOtherInput(true);
        onAnswer({
            questionId: question.id,
            choiceId: 'other',
            otherText: otherText,
        });
    };

    const handleOtherTextChange = (text: string) => {
        setOtherText(text);
        onAnswer({
            questionId: question.id,
            choiceId: 'other',
            otherText: text,
        });
    };

    if (!isActive) return null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full max-w-lg mx-auto"
            >
                <AnimatedCard className="p-6 md:p-8" hoverable={false}>
                    {/* Question text */}
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
                        {question.text}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            const isSelected = answer?.choiceId === option.id;
                            const optionLabel = ['A', 'B', 'C'][index];

                            return (
                                <motion.button
                                    key={option.id}
                                    onClick={() => handleOptionSelect(option.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                    w-full text-left p-4 rounded-xl
                    flex items-center gap-4
                    transition-all duration-200
                    border
                    ${isSelected
                                            ? 'bg-primary-500/20 border-primary-400/50 shadow-lg shadow-primary-500/10'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }
                  `}
                                >
                                    {/* Option label circle */}
                                    <span
                                        className={`
                      flex-shrink-0 w-10 h-10 rounded-full
                      flex items-center justify-center
                      font-bold text-sm
                      transition-colors duration-200
                      ${isSelected
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-white/10 text-white/70'
                                            }
                    `}
                                    >
                                        {optionLabel}
                                    </span>

                                    {/* Option text */}
                                    <span
                                        className={`
                      text-base md:text-lg font-medium
                      transition-colors duration-200
                      ${isSelected ? 'text-white' : 'text-white/80'}
                    `}
                                    >
                                        {option.text}
                                    </span>

                                    {/* Check mark when selected */}
                                    {isSelected && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="ml-auto flex-shrink-0"
                                        >
                                            <svg
                                                className="w-6 h-6 text-primary-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </motion.span>
                                    )}
                                </motion.button>
                            );
                        })}

                        {/* "Lainnya" option */}
                        {question.allowOther && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <motion.button
                                    onClick={handleOtherClick}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                    w-full text-left p-4 rounded-xl
                    flex items-center gap-4
                    transition-all duration-200
                    border
                    ${showOtherInput
                                            ? 'bg-accent-500/20 border-accent-400/50 shadow-lg shadow-accent-500/10'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }
                  `}
                                >
                                    {/* Option label circle */}
                                    <span
                                        className={`
                      flex-shrink-0 w-10 h-10 rounded-full
                      flex items-center justify-center
                      font-bold text-sm
                      transition-colors duration-200
                      ${showOtherInput
                                                ? 'bg-accent-500 text-white'
                                                : 'bg-white/10 text-white/70'
                                            }
                    `}
                                    >
                                        D
                                    </span>

                                    {/* Option text */}
                                    <span
                                        className={`
                      text-base md:text-lg font-medium
                      transition-colors duration-200
                      ${showOtherInput ? 'text-white' : 'text-white/80'}
                    `}
                                    >
                                        Lainnya
                                    </span>
                                </motion.button>

                                {/* Text input for "Lainnya" */}
                                <AnimatePresence>
                                    {showOtherInput && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="mt-3 overflow-hidden"
                                        >
                                            <input
                                                type="text"
                                                value={otherText}
                                                onChange={(e) => handleOtherTextChange(e.target.value)}
                                                placeholder="Tulis jawaban kamu..."
                                                className="
                          w-full px-4 py-3 rounded-xl
                          bg-white/10 border border-white/20
                          text-white placeholder-white/40
                          focus:outline-none focus:ring-2 focus:ring-accent-400/50 focus:border-accent-400/50
                          transition-all duration-200
                          text-base
                        "
                                                autoFocus
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </div>
                </AnimatedCard>
            </motion.div>
        </AnimatePresence>
    );
}
