// pages/edit/[id].tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EditClubForm from '@/components/EditClubForm';
import { useSession } from 'next-auth/react'; // If using NextAuth for user authentication

export default function EditClubPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession(); // Assuming you're using NextAuth to get the session
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email); // Get the user's email from the session
    }
  }, [session]);

  // Handle loading state while fetching user data
  if (!session) {
    return <div>Loading...</div>;
  }

  // Return the EditClubForm and pass the `id` and `userEmail`
  return <EditClubForm id={parseInt(params.id)} userEmail={userEmail} />;
}
