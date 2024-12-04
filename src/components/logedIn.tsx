import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ClubCard from "@/components/ClubCard";
import Navbar from "@/components/Navbar";
import { Search, Filter } from "lucide-react";
import type { Club } from "@/lib/types";

// Temporary mock data
const mockClubs: Club[] = [
  {
    id: "1",
    name: "Photography Club",
    description: "A community of photography enthusiasts sharing tips, techniques, and exploring beautiful locations around campus.",
    meetingTimes: "Thursdays at 5:00 PM",
    location: "Art Building Room 101",
    contactEmail: "photo@hawaii.edu",
    interestAreas: ["Arts", "Media"],
    imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
    officers: [
      { name: "John Doe", role: "President", email: "john@hawaii.edu" }
    ]
  },
  {
    id: "2",
    name: "Coding Club",
    description: "Learn programming, work on projects, and prepare for hackathons with fellow tech enthusiasts.",
    meetingTimes: "Tuesdays at 6:00 PM",
    location: "POST Building Room 318",
    website: "https://codingclub.hawaii.edu",
    contactEmail: "code@hawaii.edu",
    interestAreas: ["Technology", "Education"],
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    officers: [
      { name: "Jane Smith", role: "President", email: "jane@hawaii.edu" }
    ]
  },
];

const interestAreas = ["Arts", "Technology", "Sports", "Academic", "Cultural", "Service", "Media", "Education"];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const filteredClubs = mockClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInterests = selectedInterests.length === 0 ||
                            selectedInterests.some(interest => club.interestAreas.includes(interest));
    return matchesSearch && matchesInterests;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Browse Clubs</h1>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {interestAreas.map((interest) => (
              <Badge
                key={interest}
                variant={selectedInterests.includes(interest) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Browse;
