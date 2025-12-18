'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
    className?: string;
}

export default function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
    const progress = (current / total) * 100;

    return (
        <div className={`w-full ${className}`}>
            {/* Progress text */}
            <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-white/70 font-medium">
                    Pertanyaan {current} dari {total}
                </span>
                <span className="text-primary-400 font-semibold">{Math.round(progress)}%</span>
            </div>

            {/* Progress bar container */}
            <div className="relative h-3 rounded-full bg-white/10 backdrop-blur-sm overflow-hidden border border-white/5">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5" />

                {/* Animated fill */}
                <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </motion.div>

                {/* Step indicators */}
                <div className="absolute inset-0 flex justify-between px-0.5">
                    {Array.from({ length: total }, (_, i) => (
                        <div
                            key={i}
                            className={`
                w-0.5 h-full
                ${i < current ? 'bg-transparent' : 'bg-white/10'}
              `}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
