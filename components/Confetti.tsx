'use client';

import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
    trigger?: boolean;
    duration?: number;
}

export default function Confetti({ trigger = true, duration = 3000 }: ConfettiProps) {
    const fireConfetti = useCallback(() => {
        const end = Date.now() + duration;

        // Blue-only color scheme
        const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8', '#2563eb', '#dbeafe'];

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.7 },
                colors: colors,
                gravity: 0.8,
                scalar: 1.2,
                drift: 0,
            });

            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
                colors: colors,
                gravity: 0.8,
                scalar: 1.2,
                drift: 0,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        confetti({
            particleCount: 80,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            colors: colors,
            gravity: 0.6,
            scalar: 1.5,
        });

        frame();
    }, [duration]);

    useEffect(() => {
        if (trigger) {
            const timer = setTimeout(fireConfetti, 300);
            return () => clearTimeout(timer);
        }
    }, [trigger, fireConfetti]);

    return null;
}

export function triggerConfetti() {
    const colors = ['#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8', '#2563eb', '#dbeafe'];

    confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        gravity: 0.6,
        scalar: 1.5,
    });
}
