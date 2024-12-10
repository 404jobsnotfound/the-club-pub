// src/app/api/clubs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const club = await prisma.club.findUnique({
      where: { id: Number(id) },  // Assuming the ID is a number
    });

    if (club) {
      return NextResponse.json(club);
    } else {
      return NextResponse.json({ message: 'Club not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching club details:', error);
    return NextResponse.json({ message: 'Failed to fetch club details' }, { status: 500 });
  }
}
