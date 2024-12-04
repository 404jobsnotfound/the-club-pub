/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React from 'react';

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
  const categories = ['Arts', 'Technology', 'Sports', 'Academic', 'Cultural', 'Service', 'Media', 'Education'];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="px-4 py-8">
        <h2 className="text-4xl font-bold text-primary mb-8">Browse Clubs</h2>

        {/* Search Bar */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search clubs..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
          />
          <button className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
            Filters
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-3 py-1 rounded-full bg-secondary text-white text-sm"
            >
              {category}
            </button>
          ))}
        </div>

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
                  {club.meetingTime}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <span>
                  📍
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SimpleBrowse;
