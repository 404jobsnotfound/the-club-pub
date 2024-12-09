'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { CompassFill, HeartFill, ArrowRight } from 'react-bootstrap-icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  const { data: session, status } = useSession(); // Make sure you're using the session data
  const router = useRouter();

  // Handle session states with useEffect
  useEffect(() => {
    if (status === 'loading') {
      return; // Wait for session to load
    }
    // If unauthenticated, redirect to signin
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session?.user?.role !== 'ADMIN') {
      // Redirect non-admin users to the homepage
      router.push('/HomePage');
    }
  }, [status, session, router]);

  // Optional loading state
  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Welcome to The Club Pub!</h1>
          <p className="text-gray-600">Your journey to finding the perfect clubs starts here</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Link href="/browseClub" className="group text-decoration-none">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-green-800/10 rounded-lg">
                  <CompassFill className="h-8 w-8 text-green-800" />
                </div>
                <CardTitle className="text-green-800">Browse Clubs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Explore all available clubs and find the perfect match for your interests.
                </p>
                <Button
                  className="group-hover:translate-x-2 transition-transform bg-green-800 text-white hover:bg-green-700"
                  style={{
                    backgroundColor: '#2F855A', // Tailwind's green-800
                    borderColor: '#2F855A',
                  }}
                >
                  View Clubs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/interests" className="group text-decoration-none">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-green-800/10 rounded-lg">
                  <HeartFill className="h-8 w-8 text-green-800" />
                </div>
                <CardTitle className="text-green-800">Interest Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">Discover clubs based on your specific interests and hobbies.</p>
                <Button
                  className="group-hover:translate-x-2 transition-transform bg-green-800 text-white hover:bg-green-700"
                  style={{
                    backgroundColor: '#2F855A', // Tailwind's green-800
                    borderColor: '#2F855A',
                  }}
                >
                  Explore Interests
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Getting Started</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="bg-green-800 text-white rounded-full w-6 h-6 flex items-center justify-center
              flex-shrink-0"
              >
                1
              </div>
              <p className="text-gray-600">Browse through our extensive list of clubs or filter by your interests</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-800 text-white rounded-full w-6 h-6 flex items-center justify-center
              flex-shrink-0"
              >
                2
              </div>
              <p className="text-gray-600">Read about club activities, meeting times, and requirements</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-800 text-white rounded-full w-6 h-6 flex items-center justify-center
              flex-shrink-0"
              >
                3
              </div>
              <p className="text-gray-600">Join clubs that align with your interests and schedule</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
