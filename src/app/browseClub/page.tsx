'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

const ClubForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingLocation, setMeetingLocation] = useState('');
  const [image, setImage] = useState('');
  const [interestAreas, setInterestAreas] = useState('');
  const [adminEmail, setAdminEmail] = useState(''); // Admin email state

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect form data into an object
    const clubData = {
      name,
      description,
      meetingTime,
      meetingLocation,
      image,
      interestAreas,
      admins: adminEmail, // Pass adminEmail directly as a string
    };

    try {
      // Call addClub function to save club data to database
      await addClub(clubData);
      console.log('Club added successfully');
    } catch (error) {
      console.error('Error adding club:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="club-name">Club Name:</label>
        <input
          type="text"
          id="club-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="meeting-time">Meeting Time:</label>
        <input
          type="text"
          id="meeting-time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="meeting-location">Meeting Location:</label>
        <input
          type="text"
          id="meeting-location"
          value={meetingLocation}
          onChange={(e) => setMeetingLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="image-url">Image URL:</label>
        <input
          type="text"
          id="image-url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="interest-areas">Interest Areas:</label>
        <input
          type="text"
          id="interest-areas"
          value={interestAreas}
          onChange={(e) => setInterestAreas(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="admin-email">Admin Email:</label>
        <input
          type="email"
          id="admin-email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Club</button>
    </form>
  );
};

export default ClubForm;
