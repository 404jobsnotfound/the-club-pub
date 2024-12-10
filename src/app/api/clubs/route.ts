// src/app/api/clubs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Fetch all clubs
export async function GET(req: NextRequest) {
  try {
    const clubs = await prisma.club.findMany();
    return NextResponse.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json({ message: 'Failed to fetch clubs' }, { status: 500 });
  }
}
