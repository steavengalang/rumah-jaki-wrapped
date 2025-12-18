import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    // Get all yearly results for this user
    const results = await prisma.yearlyResult.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        year: 'desc',
      },
    });

    // Transform data
    const transformedResults = results.map((r) => ({
      id: r.id,
      year: r.year,
      title: r.title,
      description: r.description,
      stats: JSON.parse(r.statsJson),
      highlights: JSON.parse(r.highlightsJson),
      shareCaption: r.shareCaption,
      primaryArchetype: r.primaryArchetype,
      secondaryArchetype: r.secondaryArchetype,
      confidence: r.confidence,
      isAI: r.isAI,
      createdAt: r.createdAt.toISOString(),
    }));

    return NextResponse.json({
      results: transformedResults,
    });
  } catch (error) {
    console.error('History fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
