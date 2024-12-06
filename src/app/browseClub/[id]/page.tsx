/* eslint-disable @next/next/no-img-element */
import settings from '../../../../config/settings.development.json';

const ClubDetails = () => {
  const clubDetails = settings.defaultClubData.find(
    (club) => club.name === 'Coding Club',
  );

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
              {clubDetails.interestAreas.split(', ').map((area) => (
                <span key={area} className="badge">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-gray-600 text-lg mb-8">{clubDetails.description}</p>

            <div className="space-y-4 mb-8">
              <div className="font-medium">
                Meeting Time:
                {clubDetails.meetingTime}
              </div>
              <div className="font-medium">
                Location:
                {clubDetails.meetingLocation}
              </div>
              <div className="font-medium">
                Admin:
                {clubDetails.admins}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubDetails;
