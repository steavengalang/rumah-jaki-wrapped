'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import ParallaxBackground from '@/components/ParallaxBackground';
import AnimatedCard from '@/components/AnimatedCard';
import CountUpStat from '@/components/CountUpStat';
import Confetti from '@/components/Confetti';
import ResultCard from '@/components/ResultCard';
import { useToast } from '@/components/Toast';
import { Answer, WrappedResult } from '@/types';
import { QUESTIONS } from '@/lib/questions';
import { loadAnswers, loadResult, saveResult, clearAllData } from '@/lib/storage';
import { generateOfflineResult } from '@/lib/scoring';

export default function ResultPage() {
    const router = useRouter();
    const resultCardRef = useRef<HTMLDivElement>(null);
    const [result, setResult] = useState<WrappedResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showDownloadCard, setShowDownloadCard] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { showToast, ToastComponent } = useToast();

    useEffect(() => {
        const init = async () => {
            const savedResult = loadResult();
            if (savedResult) {
                setResult(savedResult);
                setIsLoading(false);
                setShowConfetti(true);
                return;
            }

            const answers = loadAnswers();
            if (answers.length === 0) {
                router.push('/quiz');
                return;
            }

            setIsLoading(false);
            await generateResult(answers);
        };

        init();
    }, [router]);

    const generateResult = useCallback(async (answers: Answer[]) => {
        setIsGenerating(true);
        setError(null);

        try {
            const questionsData = QUESTIONS.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text })),
            }));

            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers, questions: questionsData }),
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();

            if (data.result) {
                setResult(data.result);
                saveResult(data.result);
                setShowConfetti(true);
            } else {
                throw new Error('Invalid response');
            }
        } catch (err) {
            console.error('Error generating result:', err);
            setError('Gagal generate hasil AI, menggunakan offline scoring...');
            const offlineResult = generateOfflineResult(answers);
            setResult(offlineResult);
            saveResult(offlineResult);
            setShowConfetti(true);
        } finally {
            setIsGenerating(false);
        }
    }, []);

    const handleRegenerate = useCallback(async () => {
        const answers = loadAnswers();
        if (answers.length > 0) await generateResult(answers);
    }, [generateResult]);

    const handleDownload = useCallback(async () => {
        if (!result) return;

        setIsDownloading(true);
        setShowDownloadCard(true);

        // Wait for the card to render
        await new Promise((resolve) => setTimeout(resolve, 200));

        try {
            if (resultCardRef.current) {
                const canvas = await html2canvas(resultCardRef.current, {
                    backgroundColor: '#030308',
                    scale: 2,
                    logging: false,
                    useCORS: true,
                });

                const link = document.createElement('a');
                link.download = `rumah-jaki-wrapped-${result.title.replace(/\s+/g, '-').toLowerCase()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();

                showToast('Gambar berhasil di-download! 🎉', 'success');
            }
        } catch (err) {
            console.error('Error downloading:', err);
            showToast('Gagal download gambar', 'error');
        } finally {
            setIsDownloading(false);
            setShowDownloadCard(false);
        }
    }, [result, showToast]);

    const handleCopyCaption = useCallback(async () => {
        if (!result?.shareCaption) return;
        try {
            await navigator.clipboard.writeText(result.shareCaption);
            showToast('Caption berhasil di-copy! 📋', 'success');
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = result.shareCaption;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('Caption berhasil di-copy! 📋', 'success');
        }
    }, [result?.shareCaption, showToast]);

    const handleReset = useCallback(() => {
        clearAllData();
        router.push('/');
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-950">
                <div className="text-center">
                    <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60">Memuat hasil...</p>
                </div>
            </div>
        );
    }

    if (isGenerating && !result) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ParallaxBackground variant="result" />
                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500/30 to-primary-700/30 backdrop-blur-xl mb-6"
                    >
                        <div className="w-8 h-8 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-semibold text-white mb-2"
                    >
                        Generating your Wrapped...
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/50 text-sm"
                    >
                        Analyzing {loadAnswers().length} answers
                    </motion.p>
                </div>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-dark-950">
                <div className="text-center">
                    <p className="text-white/60 mb-4">Tidak ada hasil ditemukan</p>
                    <Link
                        href="/quiz"
                        className="px-6 py-3 rounded-xl font-medium text-base bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all"
                    >
                        Mulai Quiz
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Confetti trigger={showConfetti} duration={3000} />
            <ParallaxBackground variant="result" />
            {ToastComponent}

            {/* Hidden ResultCard for download */}
            {showDownloadCard && (
                <div className="fixed left-[-9999px] top-0">
                    <ResultCard ref={resultCardRef} result={result} />
                </div>
            )}

            <div className="relative z-10 min-h-screen px-4 py-8">
                <div className="w-full max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <p className="text-white/50 text-sm font-medium mb-2">Open House Rumah Jaki</p>
                        <p className="text-primary-400 text-xs">
                            {result.isAI ? '✨ Generated by AI' : '📊 Offline Scoring'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-8"
                    >
                        <AnimatedCard className="py-8 px-6 text-center" hoverable={false}>
                            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary-500/30 via-primary-600/30 to-primary-500/30 blur-xl opacity-50 animate-pulse" />
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                                className="relative"
                            >
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent mb-4">
                                    {result.title}
                                </h1>
                                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-sm mx-auto">
                                    {result.description}
                                </p>
                            </motion.div>
                        </AnimatedCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8"
                    >
                        <AnimatedCard className="py-6" hoverable={false}>
                            <h3 className="text-sm font-semibold text-white/50 text-center mb-6 uppercase tracking-wider">
                                Your Stats
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {result.stats.map((stat, index) => (
                                    <CountUpStat key={stat.label} value={stat.value} label={stat.label} delay={0.6 + index * 0.2} />
                                ))}
                            </div>
                        </AnimatedCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mb-8"
                    >
                        <AnimatedCard className="py-6" hoverable={false}>
                            <h3 className="text-sm font-semibold text-white/50 text-center mb-4 uppercase tracking-wider">
                                Highlights
                            </h3>
                            <ul className="space-y-3">
                                {result.highlights.map((highlight, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        className="flex items-start gap-3 text-white/80"
                                    >
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-xs font-bold text-white">
                                            {index + 1}
                                        </span>
                                        <span className="pt-0.5">{highlight}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </AnimatedCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="mb-8"
                    >
                        <AnimatedCard className="py-5" hoverable={false}>
                            <h3 className="text-sm font-semibold text-white/50 text-center mb-3 uppercase tracking-wider">
                                Share Caption
                            </h3>
                            <p className="text-center text-white/80 mb-4 px-2 leading-relaxed">"{result.shareCaption}"</p>
                            <div className="grid grid-cols-2 gap-3">
                                <motion.button
                                    onClick={handleCopyCaption}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/15 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span>Copy</span>
                                </motion.button>
                                <motion.button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                                    whileTap={{ scale: isDownloading ? 1 : 0.98 }}
                                    className="py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-primary-400 hover:to-primary-500 transition-all disabled:opacity-50"
                                >
                                    {isDownloading ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    )}
                                    <span>{isDownloading ? '...' : 'Download'}</span>
                                </motion.button>
                            </div>
                        </AnimatedCard>
                    </motion.div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 }}
                        className="space-y-3"
                    >
                        <motion.button
                            onClick={handleRegenerate}
                            disabled={isGenerating}
                            whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                            whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                            className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${isGenerating
                                    ? 'bg-white/5 text-white/40 cursor-not-allowed'
                                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:border-white/20'
                                }`}
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span>Generate with AI</span>
                                </>
                            )}
                        </motion.button>

                        <motion.button
                            onClick={handleReset}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-white/60 hover:text-white font-medium transition-all border border-transparent hover:border-white/10"
                        >
                            Reset & Mulai Ulang
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-8 text-center text-white/30 text-xs"
                    >
                        <p>
                            Confidence: {result.confidence}% • Generated {new Date(result.generatedAt).toLocaleDateString('id-ID')}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
