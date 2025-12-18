'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';
import AnimatedCard from '@/components/AnimatedCard';
import AuthButton from '@/components/AuthButton';

const ARCHETYPES = [
    { emoji: '📚', label: 'KERKOM', desc: 'Kerja Kelompok', color: 'from-blue-500 to-blue-700' },
    { emoji: '🎮', label: 'TES OMBAK', desc: 'Main Game', color: 'from-cyan-500 to-cyan-700' },
    { emoji: '☕', label: 'NYANTAI', desc: 'Si Chill', color: 'from-amber-500 to-amber-700' },
    { emoji: '👻', label: 'CABUT', desc: 'Si Ninja', color: 'from-purple-500 to-purple-700' },
    { emoji: '🎉', label: 'RAMAI', desc: 'Si Hype', color: 'from-pink-500 to-pink-700' },
    { emoji: '🛋️', label: 'MAGERS', desc: 'Si Betah', color: 'from-green-500 to-green-700' },
];

export default function HomePage() {
    const { data: session, status } = useSession();
    const isDecember = new Date().getMonth() === 11;

    return (
        <div className="min-h-screen relative overflow-hidden bg-dark-950">
            <ParallaxBackground variant="hero" />

            <div className="relative z-10 min-h-screen">
                {/* Navbar */}
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-xl bg-dark-950/50 border-b border-white/5"
                >
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-xl">🏠</span>
                            <span className="font-bold text-white hidden sm:block">Rumah Jaki Wrapped</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            {session && (
                                <Link
                                    href="/history"
                                    className="text-white/60 hover:text-white text-sm font-medium transition-colors hidden sm:block"
                                >
                                    History
                                </Link>
                            )}
                            <AuthButton />
                        </div>
                    </div>
                </motion.nav>

                {/* Hero Section - Grid Layout */}
                <div className="min-h-screen pt-20 pb-12 px-4">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="order-2 lg:order-1"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                                <span>Wrapped {new Date().getFullYear()}</span>
                            </motion.div>

                            {/* Title */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] mb-6">
                                <span className="text-white">Temukan</span>
                                <br />
                                <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                                    Personality
                                </span>
                                <br />
                                <span className="text-white">Kamu</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg lg:text-xl text-white/60 mb-8 max-w-lg leading-relaxed">
                                Quiz interaktif untuk mengetahui tipe kamu di Open House Rumah Jaki.
                                Dapatkan hasil <span className="text-primary-400 font-semibold">SIPALING ...</span> yang lucu dan shareable!
                            </p>

                            {/* December Warning */}
                            {!isDecember && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-start gap-3"
                                >
                                    <span className="text-xl">⚠️</span>
                                    <div>
                                        <p className="font-medium">Wrapped hanya di Desember!</p>
                                        <p className="text-amber-300/70">Tunggu bulan Desember untuk submit hasil.</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {status === 'loading' ? (
                                    <div className="flex justify-center py-4">
                                        <div className="w-8 h-8 border-2 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                                    </div>
                                ) : session ? (
                                    <>
                                        <Link href="/quiz" className="flex-1 sm:flex-none">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={!isDecember}
                                                className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${isDecember
                                                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-xl shadow-primary-500/20 hover:shadow-2xl hover:shadow-primary-500/30'
                                                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                                                    }`}
                                            >
                                                <span>Mulai Wrapped</span>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </motion.button>
                                        </Link>
                                        <Link href="/history" className="flex-1 sm:flex-none">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <span>📜</span>
                                                <span>Lihat History</span>
                                            </motion.button>
                                        </Link>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <AuthButton className="justify-center" />
                                        <p className="text-white/40 text-sm text-center sm:text-left">Login untuk memulai quiz</p>
                                    </div>
                                )}
                            </div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-12 grid grid-cols-3 gap-4"
                            >
                                {[
                                    { value: '15', label: 'Pertanyaan' },
                                    { value: '9', label: 'Tipe Hasil' },
                                    { value: '∞', label: 'Fun Level' },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl sm:text-3xl font-bold text-primary-400">{stat.value}</div>
                                        <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Archetype Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="order-1 lg:order-2"
                        >
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                {ARCHETYPES.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        <AnimatedCard className="p-4 sm:p-5 text-center group" hoverable={true}>
                                            <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl sm:text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                {item.emoji}
                                            </div>
                                            <h3 className="font-bold text-white text-xs sm:text-sm mb-1">{item.label}</h3>
                                            <p className="text-[10px] sm:text-xs text-white/50">{item.desc}</p>
                                        </AnimatedCard>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Floating Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                                className="mt-6"
                            >
                                <AnimatedCard className="p-4 sm:p-5" hoverable={false}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center flex-shrink-0">
                                            <span className="text-2xl">✨</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-white text-sm mb-1">AI Generated</h4>
                                            <p className="text-xs text-white/50 leading-relaxed">Hasil analisis menggunakan AI untuk pengalaman yang lebih personal</p>
                                        </div>
                                    </div>
                                </AnimatedCard>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="py-8 px-4 border-t border-white/5"
                >
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
                        <p>Made with ❤️ for Rumah Jaki Community</p>
                        <div className="flex items-center gap-6">
                            <Link href="/about" className="hover:text-white/80 transition-colors">
                                Tentang
                            </Link>
                            <span>•</span>
                            <span>© {new Date().getFullYear()}</span>
                        </div>
                    </div>
                </motion.footer>
            </div>
        </div>
    );
}
