'use client';

import { forwardRef } from 'react';
import { WrappedResult } from '@/types';

interface ResultCardProps {
    result: WrappedResult;
}

const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(({ result }, ref) => {
    return (
        <div
            ref={ref}
            className="w-[360px] bg-gradient-to-br from-[#030308] via-[#0a0a1a] to-[#050515] p-6 rounded-3xl"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {/* Header */}
            <div className="text-center mb-4">
                <p className="text-primary-400/80 text-xs font-medium tracking-wider uppercase mb-1">
                    Open House Rumah Jaki
                </p>
                <p className="text-white/40 text-[10px]">WRAPPED 2024</p>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1
                    className="text-3xl font-bold mb-2"
                    style={{
                        background: 'linear-gradient(135deg, #93c5fd, #60a5fa, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    {result.title}
                </h1>
                <p className="text-white/70 text-sm leading-relaxed px-2">{result.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 mb-5">
                {result.stats.map((stat, index) => (
                    <div
                        key={index}
                        className="text-center p-3 rounded-xl bg-white/5 border border-white/10"
                    >
                        <div className="text-xl font-bold text-primary-400">{stat.value}</div>
                        <div className="text-[10px] text-white/50 leading-tight mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Highlights */}
            <div className="mb-5">
                <p className="text-[10px] text-white/40 uppercase tracking-wider text-center mb-3">Highlights</p>
                <div className="space-y-2">
                    {result.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2 text-white/80 text-sm">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-[10px] font-bold text-white">
                                {index + 1}
                            </span>
                            <span className="pt-0.5 leading-tight">{highlight}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Share Caption */}
            <div className="border-t border-white/10 pt-4">
                <p className="text-center text-white/60 text-xs italic">"{result.shareCaption}"</p>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
                <p className="text-[10px] text-white/30">rumah-jaki-wrapped.vercel.app</p>
            </div>
        </div>
    );
});

ResultCard.displayName = 'ResultCard';

export default ResultCard;
