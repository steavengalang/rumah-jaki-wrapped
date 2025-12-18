'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';
import AnimatedCard from '@/components/AnimatedCard';

export default function AboutPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <ParallaxBackground variant="hero" />

            <div className="relative z-10 min-h-screen px-4 py-12">
                <div className="w-full max-w-lg mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium mb-6"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Kembali</span>
                        </Link>

                        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                            Tentang{' '}
                            <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                                Wrapped
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <AnimatedCard className="mb-6" hoverable={false}>
                            <h2 className="text-lg font-semibold text-white mb-3">
                                Apa itu Open House Rumah Jaki Wrapped?
                            </h2>
                            <p className="text-white/70 leading-relaxed mb-4">
                                Ini adalah quiz interaktif untuk mengetahui personality kamu di Open House Rumah Jaki!
                                Terinspirasi dari Spotify Wrapped, quiz ini menganalisis kebiasaan dan gaya hangout kamu
                                untuk memberikan hasil yang seru dan relatable.
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                Jawab 15 pertanyaan singkat, dan dapatkan titel{' '}
                                <span className="text-primary-400 font-semibold">"SIPALING ..."</span> unik kamu!
                            </p>
                        </AnimatedCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <AnimatedCard className="mb-6" hoverable={false}>
                            <h2 className="text-lg font-semibold text-white mb-3">Tipe Personality</h2>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { emoji: '🎮', label: 'KERKOM', desc: 'Si Kompetitif' },
                                    { emoji: '🌊', label: 'TES OMBAK', desc: 'Si Explorer' },
                                    { emoji: '☕', label: 'NYANTAI', desc: 'Si Chill' },
                                    { emoji: '👻', label: 'CABUT', desc: 'Si Ninja' },
                                    { emoji: '🎉', label: 'RAMAI', desc: 'Si Hype' },
                                    { emoji: '🛋️', label: 'MAGERS', desc: 'Si Betah' },
                                    { emoji: '🌸', label: 'HEALING', desc: 'Si Tenang' },
                                    { emoji: '🌊', label: 'NGIKUT', desc: 'Si Flexible' },
                                    { emoji: '🎯', label: 'AMBIS', desc: 'Si Focused' },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + index * 0.05 }}
                                        className="text-center p-3 rounded-xl bg-white/5"
                                    >
                                        <div className="text-xl mb-1">{item.emoji}</div>
                                        <div className="text-xs font-semibold text-white/80">{item.label}</div>
                                        <div className="text-[10px] text-white/50">{item.desc}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatedCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <AnimatedCard className="mb-6" hoverable={false}>
                            <h2 className="text-lg font-semibold text-white mb-3">Cara Kerja</h2>
                            <ul className="space-y-3 text-white/70">
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">
                                        1
                                    </span>
                                    <span>Jawab 15 pertanyaan tentang kebiasaan hangout kamu</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">
                                        2
                                    </span>
                                    <span>AI akan menganalisis jawaban dan menentukan personality kamu</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-xs font-bold">
                                        3
                                    </span>
                                    <span>Dapatkan hasil dengan stats lucu dan caption siap share!</span>
                                </li>
                            </ul>
                        </AnimatedCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <AnimatedCard className="mb-8" hoverable={false}>
                            <h2 className="text-lg font-semibold text-white mb-3">Tech Stack</h2>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'Next.js 14',
                                    'TypeScript',
                                    'TailwindCSS v4',
                                    'Framer Motion',
                                    'react-scroll-parallax',
                                    'canvas-confetti',
                                    'Groq AI',
                                ].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-xs font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </AnimatedCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-center"
                    >
                        <Link href="/quiz">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-2xl font-semibold text-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/40 transition-all duration-300 border border-primary-500/30"
                            >
                                Mulai Quiz Sekarang
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 text-center text-white/30 text-xs"
                    >
                        <p>Made with ❤️ for Rumah Jaki community</p>
                        <p className="mt-1">Quiz ini just for fun — ga ada data yang disimpan di server!</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
