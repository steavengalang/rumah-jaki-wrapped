'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface CountUpStatProps {
    value: string;
    label: string;
    delay?: number;
    duration?: number;
}

export default function CountUpStat({
    value,
    label,
    delay = 0,
    duration = 2,
}: CountUpStatProps) {
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Parse numeric value from string
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    const suffix = value.replace(/[0-9.,]/g, '').trim();
    const hasPercent = value.includes('%');
    const isInfinity = value === '∞' || value.includes('999+');

    // Spring animation for the number
    const spring = useSpring(0, {
        stiffness: 50,
        damping: 20,
    });

    // Transform spring value to display string
    const display = useTransform(spring, (latest) => {
        if (isInfinity) return value;
        const num = Math.round(latest);
        if (hasPercent) return `${num}%`;
        return num.toLocaleString() + (suffix ? ` ${suffix}` : '');
    });

    // Trigger animation when component becomes visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const timer = setTimeout(() => {
                        spring.set(numericValue);
                    }, delay * 1000);
                    return () => clearTimeout(timer);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [spring, numericValue, delay, hasAnimated]);

    // Subscribe to display changes
    const [displayValue, setDisplayValue] = useState(isInfinity ? value : '0');

    useEffect(() => {
        const unsubscribe = display.on('change', (latest) => {
            setDisplayValue(latest);
        });
        return () => unsubscribe();
    }, [display]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="text-center"
        >
            <motion.div
                className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-primary-300 via-primary-400 to-accent-400 bg-clip-text text-transparent"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
            >
                {isInfinity ? value : displayValue}
            </motion.div>
            <div className="mt-2 text-sm md:text-base text-white/70 font-medium">
                {label}
            </div>
        </motion.div>
    );
}
