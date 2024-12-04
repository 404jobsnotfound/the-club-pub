export type Club = {
  id: string;
  name: string;
  description: string;
  meetingTimes: string;
  location: string;
  website?: string;
  contactEmail: string;
  interestAreas: string[];
  imageUrl?: string;
  officers: {
    name: string;
    role: string;
    email: string;
  }[];
};
