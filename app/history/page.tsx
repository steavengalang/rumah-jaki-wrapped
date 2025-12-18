'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';
import AnimatedCard from '@/components/AnimatedCard';
import AuthButton from '@/components/AuthButton';

interface YearlyResultData {
    id: string;
    year: number;
    title: string;
    description: string;
    stats: { label: string; value: string }[];
    highlights: string[];
    shareCaption: string;
    primaryArchetype: string;
    confidence: number;
    isAI: boolean;
    createdAt: string;
}

export default function HistoryPage() {
    const { data: session, status } = useSession();
    const [results, setResults] = useState<YearlyResultData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === 'authenticated') {
            fetchHistory();
        } else if (status === 'unauthenticated') {
            setIsLoading(false);
        }
    }, [status]);

    const fetchHistory = async () => {
        try {
            const response = await fetch('/api/history');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setResults(data.results || []);
        } catch (err) {
            console.error('Error fetching history:', err);
            setError('Gagal memuat history');
        } finally {
            setIsLoading(false);
        }
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-950">
                <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-dark-950">
                <ParallaxBackground variant="hero" />
                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
                    <div className="text-center">
                        <div className="text-6xl mb-6">🔒</div>
                        <h1 className="text-2xl font-bold text-white mb-4">Login Required</h1>
                        <p className="text-white/60 mb-8">Login untuk melihat history Wrapped kamu</p>
                        <AuthButton className="justify-center" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-dark-950">
            <ParallaxBackground variant="hero" />

            <div className="relative z-10 min-h-screen px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span>Kembali</span>
                            </Link>
                            <AuthButton />
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                            History{' '}
                            <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                                Wrapped
                            </span>
                        </h1>
                        <p className="text-white/60 text-lg">Lihat perjalanan personality kamu dari tahun ke tahun</p>
                    </motion.div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Results Grid */}
                    {results.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-lg mx-auto"
                        >
                            <AnimatedCard className="py-16 text-center" hoverable={false}>
                                <div className="text-6xl mb-6">📭</div>
                                <h2 className="text-2xl font-semibold text-white mb-3">Belum Ada History</h2>
                                <p className="text-white/60 mb-8 max-w-sm mx-auto">
                                    Kamu belum pernah submit Wrapped. Mulai quiz sekarang untuk mendapatkan hasil pertamamu!
                                </p>
                                <Link
                                    href="/quiz"
                                    className="inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-400 hover:to-primary-500 transition-all shadow-lg shadow-primary-500/20"
                                >
                                    🎯 Mulai Quiz
                                </Link>
                            </AnimatedCard>
                        </motion.div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {results.map((result, index) => (
                                <motion.div
                                    key={result.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <AnimatedCard className="p-6 h-full" hoverable={true}>
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium mb-2">
                                                    <span>WRAPPED {result.year}</span>
                                                </div>
                                                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                                                    {result.title}
                                                </h2>
                                            </div>
                                            <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-lg">
                                                {result.isAI ? '✨ AI' : '📊 Offline'}
                                            </span>
                                        </div>

                                        <p className="text-white/70 text-sm mb-5 leading-relaxed">{result.description}</p>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-3 gap-2 mb-5">
                                            {result.stats.slice(0, 3).map((stat, i) => (
                                                <div key={i} className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                                                    <div className="text-lg font-bold text-primary-400">{stat.value}</div>
                                                    <div className="text-[10px] text-white/50 leading-tight">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Highlights */}
                                        <div className="space-y-2 mb-5">
                                            {result.highlights.slice(0, 2).map((h, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                                                    <span className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs">✓</span>
                                                    <span>{h}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                            <p className="text-xs text-white/40">
                                                {new Date(result.createdAt).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                            <div className="text-xs text-white/40">
                                                Confidence: {result.confidence}%
                                            </div>
                                        </div>
                                    </AnimatedCard>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Comparison Stats */}
                    {results.length > 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8"
                        >
                            <AnimatedCard className="p-6" hoverable={false}>
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <span>📊</span>
                                    <span>Statistik Wrapped Kamu</span>
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="text-center p-4 rounded-xl bg-white/5">
                                        <div className="text-3xl font-bold text-primary-400">{results.length}</div>
                                        <div className="text-sm text-white/50">Total Tahun</div>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/5">
                                        <div className="text-3xl font-bold text-primary-400">
                                            {Math.round(results.reduce((acc, r) => acc + r.confidence, 0) / results.length)}%
                                        </div>
                                        <div className="text-sm text-white/50">Avg Confidence</div>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/5">
                                        <div className="text-3xl font-bold text-primary-400">
                                            {results.filter(r => r.isAI).length}
                                        </div>
                                        <div className="text-sm text-white/50">AI Generated</div>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-white/5">
                                        <div className="text-3xl font-bold text-primary-400">🎉</div>
                                        <div className="text-sm text-white/50">Active Member</div>
                                    </div>
                                </div>
                            </AnimatedCard>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
