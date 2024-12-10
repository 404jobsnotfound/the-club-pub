/* eslint-disable arrow-body-style */
import { compare } from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@foo.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error('Email or password not provided.');
          return null;
        }

        // Attempt to find the user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.error('User not found for email:', credentials.email);
          return null;
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          console.error('Invalid password for user:', credentials.email);
          return null;
        }

        // Return user object with necessary data for session
        return {
          id: `${user.id}`,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    signOut: '/auth/signout', // Custom sign-out page
    //   error: '/auth/error', // Optional error page
    //   verifyRequest: '/auth/verify-request', // Optional verify request page
    //   newUser: '/auth/new-user' // Optional new user page
  },
  callbacks: {
    // Modify session object to include additional user information
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          role: token.role,
        },
      };
    },
    // Modify JWT token to include user data
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure NEXTAUTH_SECRET is set in .env
};

export default authOptions;
