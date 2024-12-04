// import { Link } from 'react-router-dom';
import { Calendar, Link, MapPin } from 'lucide-react';
import type { Club } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ClubCardProps {
  club: Club;
}

const ClubCard = ({ club }: ClubCardProps) => (
  <Link to={`/clubs/${club.id}`}>
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        {club.imageUrl && (
        <img
          src={club.imageUrl}
          alt={club.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        )}
        <CardTitle className="text-xl">{club.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 line-clamp-2 mb-4">{club.description}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{club.meetingTimes}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>{club.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {club.interestAreas.map((area) => (
            <Badge key={area} variant="secondary">
              {area}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  </Link>
);

export default ClubCard;
