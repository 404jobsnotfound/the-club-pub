import Link from 'next/link';
import settings from '../../../config/settings.development.json';

const SimpleBrowse = () => {
  const clubs = settings.defaultClubData.map((club, index) => ({
    id: index.toString(),
    name: club.name,
    description: club.description,
    meetingTime: club.meetingTime,
    location: club.meetingLocation,
    categories: club.interestAreas.split(', ').map((area) => area.trim()),
    image: club.image,
  }));

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
