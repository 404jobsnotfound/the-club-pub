import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Create user promises
  const userPromises = config.defaultAccounts.map(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'CLUB_OWNER') {
      role = 'CLUB_OWNER';
    } else if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }

    console.log(`  Creating user: ${account.firstName} + ${account.lastName} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        password,
        role,
      },
    });
  });

  // Execute all user creation promises in parallel
  await Promise.all(userPromises);

  // Create club promises
  const clubPromises = config.defaultClubData.map(async (data) => {
    console.log(`  Adding club: ${data.name}`);
    console.log(data);
    await prisma.club.upsert({
      where: { name: data.name },
      update: {},
      create: {
        name: data.name,
        description: data.description,
        meetingTime: data.meetingTime,
        meetingLocation: data.meetingLocation,
        interestAreas: data.interestAreas,
        image: data.image,
        admins: data.admins,
      },
    });
  });

  // Execute all club creation promises in parallel
  await Promise.all(clubPromises);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
