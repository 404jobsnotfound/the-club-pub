import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma'; // Adjust the import if needed

export async function GET() {
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
          id: 'asc', // This doesn't work, id is kept which is good but iterates the edited club to the end of the list
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

// New DELETE method for deleting a club
export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession(); // Get the session to identify the logged-in user
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 401 },
      );
    }

    const { id } = await req.json(); // Parse the JSON body for the club ID
    if (!id) {
      return NextResponse.json(
        { message: 'Club ID is required' },
        { status: 400 },
      );
    }

    const club = await prisma.club.findUnique({
      where: { id },
    });

    if (!club) {
      return NextResponse.json(
        { message: 'Club not found' },
        { status: 404 },
      );
    }

    if (!club.admins.includes(session.user.email)) {
      return NextResponse.json(
        { message: 'You do not have permission to delete this club' },
        { status: 403 },
      );
    }

    await prisma.club.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Club deleted successfully' });
  } catch (error) {
    console.error('Error deleting club:', error);
    return NextResponse.json({ message: 'Failed to delete club' }, { status: 500 });
  }
}
