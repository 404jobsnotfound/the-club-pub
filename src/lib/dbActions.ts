'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: Email , password.
 */
export async function newUser({
  credentials,
  user,
}: {
  credentials: { email: string; password: string };
  user: { firstName: string; lastName: string; email: string };
}): Promise<void> {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: user.email,
      password,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  redirect('/');
}

/**
 * Retrieves a club using its unique identifier.
 * @param id, unique ID of the club.
 */
export async function getClubById(id: number) {
  const club = await prisma.club.findUnique({
    where: { id },
  });

  return club
    ? {
      name: club.name,
      description: club.description || 'Not specified',
      meetingTime: club.meetingTime || 'Not specified',
      meetingLocation: club.meetingLocation || 'Not specified',
      image: club.image || 'Not specified',
      interestAreas: club.interestAreas || 'Not specified',
      admins: club.admins || 'Not specified',
    }
    : null;
}

export async function addClub(club: {
  name: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  image: string;
  interestAreas: string;
  admins: string;
}) {
  await prisma.club.create({
    data: {
      name: club.name,
      description: club.description,
      meetingTime: club.meetingTime,
      meetingLocation: club.meetingLocation,
      image: club.image,
      interestAreas: club.interestAreas,
      admins: club.admins,
    },
  });
}

export async function getAllClubs() {
  return prisma.club.findMany();
}

export async function updateClub(
  id: number,
  data: {
    name: string;
    description: string;
    meetingTime: string;
    meetingLocation: string;
    image: string;
    interestAreas: string;
    admins: string;
  },
) {
  const formattedData = {
    ...data,
  };
  await prisma.club.update({
    where: { id },
    data: formattedData,
  });

  redirect('/browseClub');
}

export async function changePassword(
  credentials: { email: string; password: string },
) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
