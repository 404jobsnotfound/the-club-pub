'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const EditClubPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return; // Don't fetch clubs while session is loading

    const fetchClubs = async () => {
      try {
        // Fetch clubs based on session (normal users will see all clubs)
        const response = await fetch('/api/clubs');
        if (response.ok) {
          const data = await response.json();

          // If the user is logged in and has a session, filter clubs by admin email
          if (session?.user?.email) {
            const filteredClubs = data.filter((club: any) =>
              club.admins.includes(session.user.email) // Only clubs that the logged-in user can edit
            );
            setClubs(filteredClubs);
          } else {
            // Normal user (not logged in or not an admin): Show all clubs
            setClubs(data);
          }
        } else {
          console.error('Failed to fetch clubs');
        }
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [session, status, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-4 py-8">
        <h2 className="text-4xl font-bold text-green-900 mb-8">Edit Your Clubs</h2>
        {/* Club Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.length === 0 ? (
            <p>No clubs found for your email.</p>
          ) : (
            clubs.map((club) => (
              <div key={club.id} className="bg-white rounded-lg shadow-sm border p-4">
                <img
                  src={club.image || '/default-image.jpg'} // Default image if no image exists
                  alt={club.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  style={{ maxWidth: '100%', objectFit: 'cover' }}
                />
                <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
                <p className="text-gray-600 mb-4">{club.description}</p>
                <div className="text-sm text-gray-500 mb-2">
                  <span>🕒 {club.meetingTime}</span>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  <span>📍 {club.meetingLocation}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {club.categories?.map((category: string) => (
                    <span key={category} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {category}
                    </span>
                  ))}
                </div>
                {/* Interest Areas as Bubbles */}
                <div className="flex flex-wrap gap-2">
                  {club.interestAreas?.split(',').map((area: string) => (
                    <span
                      key={area.trim()}
                      className="px-3 py-1 bg-green-900 text-white rounded-full text-xs font-medium"
                    >
                      {area.trim()}
                    </span>
                  ))}
                </div>
                <Link href={`/edit/${club.id}`} className="text-blue-500 mt-4 inline-block">
                  Edit Club
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default EditClubPage;