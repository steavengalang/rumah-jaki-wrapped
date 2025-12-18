'use client';

import { Parallax } from 'react-scroll-parallax';

interface ParallaxBackgroundProps {
    variant?: 'hero' | 'result' | 'quiz';
}

export default function ParallaxBackground({ variant = 'hero' }: ParallaxBackgroundProps) {
    if (variant === 'hero') {
        return (
            <div className="fixed inset-0 -z-10 overflow-hidden">
                {/* Layer 1 - Deep black with subtle blue */}
                <Parallax speed={-30} className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#030305] via-[#050510] to-[#030308]" />
                    <div className="absolute inset-0 opacity-30">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `
                  radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.6), transparent),
                  radial-gradient(1px 1px at 40px 70px, rgba(59,130,246,0.5), transparent),
                  radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent),
                  radial-gradient(1px 1px at 130px 80px, rgba(59,130,246,0.4), transparent),
                  radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.5), transparent),
                  radial-gradient(1px 1px at 200px 60px, rgba(59,130,246,0.6), transparent)
                `,
                                backgroundRepeat: 'repeat',
                                backgroundSize: '350px 180px',
                            }}
                        />
                    </div>
                </Parallax>

                {/* Layer 2 - Blue floating orbs */}
                <Parallax speed={-15} className="absolute inset-0">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)] blur-3xl animate-float" />
                        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_70%)] blur-3xl animate-float-slow" />
                        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-2xl animate-float" />
                    </div>
                </Parallax>

                {/* Layer 3 - Vignette */}
                <Parallax speed={-5} className="absolute inset-0">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(59,130,246,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
                    </div>
                </Parallax>
            </div>
        );
    }

    if (variant === 'result') {
        return (
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <Parallax speed={-20} className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#030305] via-[#050515] to-[#030308]" />
                </Parallax>
                <Parallax speed={-10} className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_70%)] blur-3xl animate-pulse-glow" />
                    <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_70%)] blur-3xl animate-float-slow" />
                </Parallax>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
            </div>
        );
    }

    // Quiz variant
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#030305] via-[#050510] to-[#030305]" />
            <Parallax speed={-10} className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-3xl" />
            </Parallax>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
        </div>
    );
}
