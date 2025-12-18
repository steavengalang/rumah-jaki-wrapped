'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CelebrationAnimationProps {
    show: boolean;
    onComplete?: () => void;
}

const EMOJIS = ['🎉', '🎊', '✨', '🌟', '⭐', '🏆', '🎯', '🔥', '💥', '🚀'];

export default function CelebrationAnimation({ show, onComplete }: CelebrationAnimationProps) {
    const [particles, setParticles] = useState<
        { id: number; emoji: string; x: number; y: number; delay: number; scale: number }[]
    >([]);

    useEffect(() => {
        if (show) {
            // Generate particles
            const newParticles = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
                x: Math.random() * 100,
                y: Math.random() * 100,
                delay: Math.random() * 0.5,
                scale: 0.5 + Math.random() * 1,
            }));
            setParticles(newParticles);

            const timer = setTimeout(() => {
                onComplete?.();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        >
            {/* Radial burst from center */}
            <motion.div
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-primary-500 to-primary-700"
            />

            {/* Floating emojis */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{
                        x: `${particle.x}vw`,
                        y: '110vh',
                        scale: 0,
                        rotate: 0,
                    }}
                    animate={{
                        y: '-20vh',
                        scale: particle.scale,
                        rotate: 360,
                    }}
                    transition={{
                        duration: 2 + Math.random(),
                        delay: particle.delay,
                        ease: 'easeOut',
                    }}
                    className="absolute text-2xl sm:text-4xl"
                >
                    {particle.emoji}
                </motion.div>
            ))}

            {/* Central text burst */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 0.5,
                        repeat: 3,
                    }}
                    className="text-6xl sm:text-8xl mb-4"
                >
                    🎉
                </motion.div>
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl sm:text-4xl font-bold text-white drop-shadow-lg"
                >
                    Quiz Selesai!
                </motion.h2>
            </motion.div>

            {/* Pulsing rings */}
            {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{
                        duration: 2,
                        delay,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-4 border-primary-400"
                />
            ))}
        </motion.div>
    );
}
