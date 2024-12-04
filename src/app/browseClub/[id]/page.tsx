/* eslint-disable max-len */

'use client';

/* eslint-disable react/no-array-index-key */
import { useParams } from 'next/navigation'; // Use Next.js useRouter to get the dynamic ID
import { Button } from '@/components/ui/button'; // Custom Button component
import { Badge } from '@/components/ui/badge'; // Custom Badge component

// Mock clubs list (replace this with real data or API call)
const mockClubs = [
  {
    id: '1',
    name: 'Photography Club',
    description:
      'A community of photography enthusiasts sharing tips, techniques, and exploring beautiful locations around campus.',
    meetingTimes: 'Thursdays at 5:00 PM',
    location: 'Art Building Room 101',
    contactEmail: 'photo@hawaii.edu',
    interestAreas: ['Arts', 'Media'],
    imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
    officers: [
      { name: 'John Doe', role: 'President', email: 'john@hawaii.edu' },
    ],
  },
  {
    id: '2',
    name: 'Coding Club',
    description:
      'Learn programming, work on projects, and prepare for hackathons with fellow tech enthusiasts.',
    meetingTimes: 'Tuesdays at 6:00 PM',
    location: 'POST Building Room 318',
    contactEmail: 'coding@hawaii.edu',
    interestAreas: ['Technology', 'Education'],
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    officers: [
      { name: 'Jane Doe', role: 'President', email: 'jane@hawaii.edu' },
    ],
  },
];

const ClubDetails = () => {
  const { id } = useParams(); // Access the dynamic `id` parameter from the URL

  // Find the club by the `id`
  const clubDetails = mockClubs.find((club) => club.id === id);

  // If the club is not found, display a message
  if (!clubDetails) {
    return <p>Club not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 min-h-screen">
        {/* Your content goes here */}
        <div className="space-y-8">
          <img
            src={clubDetails.imageUrl}
            alt={clubDetails.name}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-primary mb-4">{clubDetails.name}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {clubDetails.interestAreas.map((area) => (
                <Badge key={area} variant="secondary">
                  {area}
                </Badge>
              ))}
            </div>
            <p className="text-gray-600 text-lg mb-8">{clubDetails.description}</p>

            <div className="space-y-4 mb-8">
              <div className="font-medium">
                Meeting Time:
                {clubDetails.meetingTimes}
              </div>
              <div className="font-medium">
                Location:
                {clubDetails.location}
              </div>
              <div className="font-medium">
                Contact:
                {clubDetails.contactEmail}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Club Officers</h2>
              {clubDetails.officers.map((officer, index) => (
                <div key={index} className="mb-2">
                  <div className="font-medium">{officer.name}</div>
                  <div className="text-sm text-gray-500">
                    {officer.role}
                    {' '}
                    •
                    {officer.email}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mb-100">
              <Button>Join Club</Button>
              <Button variant="outline">Contact Club</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubDetails;
