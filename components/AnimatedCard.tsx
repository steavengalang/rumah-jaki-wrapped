'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    onClick?: () => void;
    selected?: boolean;
    hoverable?: boolean;
}

export default function AnimatedCard({
    children,
    className = '',
    delay = 0,
    onClick,
    selected = false,
    hoverable = true,
}: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
                duration: 0.4,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={
                hoverable
                    ? {
                        scale: 1.02,
                        y: -4,
                        transition: { duration: 0.2, ease: 'easeOut' },
                    }
                    : undefined
            }
            whileTap={
                onClick
                    ? {
                        scale: 0.98,
                        transition: { duration: 0.1 },
                    }
                    : undefined
            }
            onClick={onClick}
            className={`
        relative rounded-2xl p-6 backdrop-blur-md
        bg-gradient-to-br from-white/10 to-white/5
        border border-white/10
        shadow-xl shadow-black/20
        ${selected ? 'ring-2 ring-primary-400 border-primary-400/50' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${hoverable ? 'transition-shadow hover:shadow-2xl hover:shadow-primary-500/10' : ''}
        ${className}
      `}
        >
            {/* Glow effect when selected */}
            {selected && (
                <motion.div
                    layoutId="card-glow"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/10 -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}
            {children}
        </motion.div>
    );
}
