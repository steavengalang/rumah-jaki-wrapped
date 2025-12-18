'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import ParallaxBackground from '@/components/ParallaxBackground';
import AnimatedCard from '@/components/AnimatedCard';
import { useToast } from '@/components/Toast';

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const { showToast, ToastComponent } = useToast();

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || '');
            setImage(session.user.image || '');
        }
    }, [session]);

    const handleSave = async () => {
        if (!name.trim()) {
            showToast('Nama tidak boleh kosong', 'error');
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), image: image.trim() }),
            });

            if (!response.ok) throw new Error('Failed to update');

            // Update session
            await update({ name, image });

            showToast('Profile berhasil diupdate! ✨', 'success');
        } catch (err) {
            console.error('Error updating profile:', err);
            showToast('Gagal mengupdate profile', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-950">
                <div className="w-10 h-10 border-3 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <ParallaxBackground variant="hero" />
                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
                    <h1 className="text-2xl font-bold text-white mb-4">Login Required</h1>
                    <p className="text-white/60 mb-6">Login untuk mengakses profile</p>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold"
                    >
                        Kembali ke Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            <ParallaxBackground variant="hero" />
            {ToastComponent}

            <div className="relative z-10 min-h-screen px-4 py-8">
                <div className="w-full max-w-lg mx-auto">
                    {/* Header */}
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

                        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                            Edit{' '}
                            <span className="bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text text-transparent">
                                Profile
                            </span>
                        </h1>
                        <p className="text-white/60">Update nama dan foto profile kamu</p>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <AnimatedCard className="py-8 px-6" hoverable={false}>
                            {/* Profile Picture Preview */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-500/30 bg-white/10">
                                        {image ? (
                                            <img src={image} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/40 text-3xl">
                                                👤
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-white/50 text-sm">{session.user.email}</p>
                            </div>

                            {/* Form */}
                            <div className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">Nama</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Masukkan nama kamu"
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
                                    />
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-white/70 mb-2">URL Foto Profile</label>
                                    <input
                                        type="url"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder="https://example.com/photo.jpg"
                                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50 transition-all"
                                    />
                                    <p className="text-xs text-white/40 mt-2">
                                        Masukkan URL gambar dari internet atau gunakan foto dari Google
                                    </p>
                                </div>

                                {/* Save Button */}
                                <motion.button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-primary-400 hover:to-primary-500 transition-all disabled:opacity-50"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            <span>Menyimpan...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Simpan Perubahan</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </AnimatedCard>
                    </motion.div>

                    {/* Danger Zone */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6"
                    >
                        <AnimatedCard className="py-5 px-6" hoverable={false}>
                            <h3 className="text-sm font-semibold text-white/50 mb-4">Akun</h3>
                            <motion.button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium hover:bg-red-500/20 transition-all"
                            >
                                Logout dari Akun
                            </motion.button>
                        </AnimatedCard>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
