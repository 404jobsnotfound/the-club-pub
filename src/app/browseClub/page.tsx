/* eslint-disable max-len */
// Your SimpleBrowse component (this doesn't change)
import Link from 'next/link';

const SimpleBrowse = () => {
  const clubs = [
    {
      id: '1',
      name: 'Photography Club',
      description: 'A community of photography enthusiasts sharing tips, techniques, and exploring beautiful locations around campus.',
      meetingTime: 'Thursdays at 5:00 PM',
      location: 'Art Building Room 101',
      categories: ['Arts', 'Media'],
      image: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2',
    },
    {
      id: '2',
      name: 'Coding Club',
      description: 'Learn programming, work on projects, and prepare for hackathons with fellow tech enthusiasts.',
      meetingTime: 'Tuesdays at 6:00 PM',
      location: 'POST Building Room 318',
      categories: ['Technology', 'Education'],
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-4 py-8">
        <h2 className="text-4xl font-bold text-primary mb-8">Browse Clubs</h2>

        {/* Club Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <div key={club.id} className="bg-white rounded-lg shadow-sm border p-4">
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
                style={{ maxWidth: '100%', objectFit: 'cover' }}
              />
              <h3 className="text-xl font-semibold mb-2">{club.name}</h3>
              <p className="text-gray-600 mb-4">{club.description}</p>
              <div className="text-sm text-gray-500 mb-2">
                <span>
                  🕒
                  {' '}
                  {club.meetingTime}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <span>
                  📍
                  {' '}
                  {club.location}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {club.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <Link href={`/browseClub/${club.id}`} className="text-blue-500 mt-4 inline-block">
                View Club Details
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SimpleBrowse;
