import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma'; // Adjust the import if needed

export async function GET(req: NextRequest) {
  try {
    const session = await getSession(); // Get the session to identify the logged-in user
    let clubs;

    if (session?.user?.email) {
      // If the user is logged in and their email exists, filter clubs where their email is in the admins field
      clubs = await prisma.club.findMany({
        where: {
          admins: {
            contains: session.user.email, // Filter clubs where the logged-in user is an admin
          },
        },
        orderBy: {
            id: 'asc',
        },
      });
    } else {
      // Normal users (not logged in or no matching admin email): Fetch all clubs
      clubs = await prisma.club.findMany();
    }

    return NextResponse.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    return NextResponse.json({ message: 'Failed to fetch clubs' }, { status: 500 });
  }
}
