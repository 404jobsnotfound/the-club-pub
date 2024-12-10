// src/app/browseClub/[id]/page.tsx

'use client';  // Add this line

import { useParams } from 'next/navigation';  // Use useParams instead of useRouter
import { useEffect, useState } from 'react';

const ClubDetails = () => {
  const { id } = useParams();  // Get the dynamic `id` from the URL
  const [clubDetails, setClubDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;  // Don't fetch until the id is available

    const fetchClubDetails = async () => {
      try {
        const response = await fetch(`/api/clubs/${id}`); // API endpoint to fetch a single club by ID
        if (response.ok) {
          const data = await response.json();
          setClubDetails(data);
        } else {
          console.error('Failed to fetch club details');
        }
      } catch (error) {
        console.error('Error fetching club details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [id]); // Re-run when the `id` changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!clubDetails) {
    return <p>Club not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <div className="space-y-8">
          <img
            src={clubDetails.image}
            alt={clubDetails.name}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-primary mb-4">{clubDetails.name}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {clubDetails.interestAreas.split(', ').map((area: string) => (
                <span key={area} className="badge">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-lg mb-8">{clubDetails.description}</p>

            <div className="space-y-4 mb-8">
              <div className="font-medium">
                Meeting Time: {clubDetails.meetingTime}
              </div>
              <div className="font-medium">
                Location: {clubDetails.meetingLocation}
              </div>
              <div className="font-medium">
                Admin: {clubDetails.admins}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubDetails;
