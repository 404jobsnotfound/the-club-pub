// pages/admin/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminEditForm from '@/components/AdminEditForm';
import { useSession } from 'next-auth/react'; // If using NextAuth for user authentication

export default function AdminEditPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession(); // Get session data
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null); // `null` to show loading state
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      setIsAdmin(true); // User is admin
    } else {
      setIsAdmin(false); // User is not admin, redirect to forbidden
      router.push('/forbidden'); // Optional: Redirect to a custom forbidden page
    }
  }, [session, router]);

  // Handle loading state while checking session
  if (isAdmin === null) {
    return <div>Loading...</div>; // Or loading spinner, etc.
  }

  // If the user is not an admin, don't render the edit form
  if (!isAdmin) {
    return <div>You are not authorized to view this page.</div>;
  }

  // Return the AdminEditForm and pass the `id` for editing the club
  return <AdminEditForm id={parseInt(params.id)} />;
}
