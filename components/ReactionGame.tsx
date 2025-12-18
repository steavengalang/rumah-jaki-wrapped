'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTarget, FiRefreshCw, FiAward, FiZap } from 'react-icons/fi';
import { IoGameControllerOutline } from 'react-icons/io5';

interface ReactionGameProps {
    onComplete?: (score: number) => void;
}

export default function ReactionGame({ onComplete }: ReactionGameProps) {
    const [gameState, setGameState] = useState<'idle' | 'waiting' | 'ready' | 'clicked' | 'tooEarly'>('idle');
    const [startTime, setStartTime] = useState<number>(0);
    const [reactionTime, setReactionTime] = useState<number>(0);
    const [bestTime, setBestTime] = useState<number>(0);
    const [attempts, setAttempts] = useState<number>(0);
    const [totalScore, setTotalScore] = useState<number>(0);

    const startGame = useCallback(() => {
        setGameState('waiting');
        const delay = Math.random() * 3000 + 1500; // 1.5-4.5 seconds

        const timeout = setTimeout(() => {
            setGameState('ready');
            setStartTime(Date.now());
        }, delay);

        return () => clearTimeout(timeout);
    }, []);

    const handleClick = useCallback(() => {
        if (gameState === 'waiting') {
            setGameState('tooEarly');
            setAttempts((prev) => prev + 1);
        } else if (gameState === 'ready') {
            const time = Date.now() - startTime;
            setReactionTime(time);
            setGameState('clicked');
            setAttempts((prev) => prev + 1);

            if (bestTime === 0 || time < bestTime) {
                setBestTime(time);
            }

            // Calculate score based on reaction time
            const score = Math.max(0, Math.floor(500 - time));
            setTotalScore((prev) => prev + score);

            if (attempts + 1 >= 5 && onComplete) {
                onComplete(totalScore + score);
            }
        } else if (gameState === 'idle' || gameState === 'clicked' || gameState === 'tooEarly') {
            if (attempts < 5) {
                startGame();
            }
        }
    }, [gameState, startTime, bestTime, attempts, totalScore, onComplete, startGame]);

    const getBackgroundColor = () => {
        switch (gameState) {
            case 'waiting':
                return 'bg-red-500';
            case 'ready':
                return 'bg-green-500';
            case 'clicked':
                return 'bg-primary-500';
            case 'tooEarly':
                return 'bg-amber-500';
            default:
                return 'bg-primary-500/20';
        }
    };

    const getMessage = () => {
        switch (gameState) {
            case 'waiting':
                return 'Tunggu warna hijau...';
            case 'ready':
                return 'KLIK SEKARANG!';
            case 'clicked':
                return `${reactionTime}ms! ${reactionTime < 250 ? '⚡ Amazing!' : reactionTime < 350 ? '👍 Good!' : '🎯 Nice!'}`;
            case 'tooEarly':
                return 'Terlalu cepat! 😅';
            default:
                return 'Klik untuk mulai';
        }
    };

    const resetGame = () => {
        setGameState('idle');
        setReactionTime(0);
        setBestTime(0);
        setAttempts(0);
        setTotalScore(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
            <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <IoGameControllerOutline className="w-5 h-5 text-primary-400" />
                    <h3 className="text-lg font-semibold text-white">Reaction Time Game</h3>
                </div>
                <p className="text-white/50 text-sm">Test kecepatan reaksi kamu!</p>
            </div>

            {/* Game Area */}
            <motion.div
                onClick={handleClick}
                whileHover={{ scale: gameState === 'idle' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className={`relative w-full h-40 rounded-2xl cursor-pointer flex items-center justify-center transition-colors duration-200 ${getBackgroundColor()}`}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={gameState}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="text-center"
                    >
                        {gameState === 'idle' && <FiTarget className="w-12 h-12 text-white mx-auto mb-2" />}
                        {gameState === 'ready' && <FiZap className="w-12 h-12 text-white mx-auto mb-2 animate-pulse" />}
                        {gameState === 'clicked' && <FiAward className="w-12 h-12 text-white mx-auto mb-2" />}
                        <p className="text-white font-bold text-lg">{getMessage()}</p>
                    </motion.div>
                </AnimatePresence>
            </motion.div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-lg font-bold text-primary-400">{attempts}/5</div>
                    <div className="text-[10px] text-white/50">Attempts</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-lg font-bold text-green-400">{bestTime || '-'}ms</div>
                    <div className="text-[10px] text-white/50">Best Time</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                    <div className="text-lg font-bold text-amber-400">{totalScore}</div>
                    <div className="text-[10px] text-white/50">Score</div>
                </div>
            </div>

            {/* Reset Button */}
            {attempts >= 5 && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={resetGame}
                    className="mt-4 w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/15 transition-all"
                >
                    <FiRefreshCw className="w-4 h-4" />
                    <span>Main Lagi</span>
                </motion.button>
            )}
        </motion.div>
    );
}
