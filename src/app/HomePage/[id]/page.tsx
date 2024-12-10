'use client';

import { Button } from 'react-bootstrap';
import { CompassFill, HeartFill, ArrowRight } from 'react-bootstrap-icons';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
    <Navbar />

    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Welcome to ClubVerse!</h1>
        <p className="text-gray-600">Your journey to finding the perfect clubs starts here</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <Link to="/browse" className="group">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CompassFill className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Browse Clubs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Explore all available clubs and find
                the perfect match for your interests.
              </p>
              <Button className="group-hover:translate-x-2 transition-transform">
                View Clubs
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link to="/interests" className="group">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <HeartFill className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Interest Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">Discover clubs based on your specific interests and hobbies.</p>
              <Button className="group-hover:translate-x-2 transition-transform">
                Explore Interests
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <div className="space-y-4 text-left">
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              1
            </div>
            <p className="text-gray-600">Browse through our extensive list of clubs or filter by your interests</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              2
            </div>
            <p className="text-gray-600">Read about club activities, meeting times, and requirements</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
              3
            </div>
            <p className="text-gray-600">Join clubs that align with your interests and schedule</p>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
