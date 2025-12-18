import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions['adapter'],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
  debug: process.env.NODE_ENV === 'development',
};

// Helper to check if it's December
export function isDecember(): boolean {
  const now = new Date();
  return now.getMonth() === 11; // December is month 11 (0-indexed)
}

// Helper to get current year
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

// Helper to check if user can submit this year
export async function canUserSubmit(userId: string): Promise<{ canSubmit: boolean; reason?: string }> {
  // Check if it's December
  if (!isDecember()) {
    return {
      canSubmit: false,
      reason: 'Wrapped hanya tersedia di bulan Desember! Tunggu Desember untuk submit.',
    };
  }

  const currentYear = getCurrentYear();

  // Check if user already submitted this year
  const existingResult = await prisma.yearlyResult.findUnique({
    where: {
      userId_year: {
        userId,
        year: currentYear,
      },
    },
  });

  if (existingResult) {
    return {
      canSubmit: false,
      reason: `Kamu sudah submit Wrapped ${currentYear}! Lihat hasilnya di halaman History.`,
    };
  }

  return { canSubmit: true };
}
