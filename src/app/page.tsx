/* eslint-disable @next/next/no-img-element */
/* eslint-disable max-len */

'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming you've created a custom Button component
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const Home = () => {
  const { status } = useSession(); // Manage session states
  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Add navigation bar */}

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Discover Your Community at UH Manoa
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join over 200+ student clubs and organizations. Find your passion, meet new friends, and make the most of your university experience.
          </p>
          <img
            src="https://img.s-hawaiianairlines.com/static/images/tripplanning/06-10-interesting-facts-about-hawaii/hero-image.jpg?version=0bf7&sc_lang=en-au&w=1290&hash=6D18B7524E4E1FD4AD619F68F7B0207CD2FB22A7"
            alt="Community at UH Manoa"
            className="w-full h-auto mb-8 rounded-lg shadow-md"
          />

          <div className="flex justify-center gap-4">
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="bg-green-900 text-white hover:bg-green-700">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-xl transition-shadow">
            <CardTitle className="text-xl font-semibold mb-2">Find Your People</CardTitle>
            <CardContent>
              <p className="text-gray-600">Connect with students who share your interests and passions.</p>
            </CardContent>
          </Card>

          <Card className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-xl transition-shadow">
            <CardTitle className="text-xl font-semibold mb-2">Easy Discovery</CardTitle>
            <CardContent>
              <p className="text-gray-600">Browse clubs by interest areas and find the perfect fit.</p>
            </CardContent>
          </Card>

          <Card className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-xl transition-shadow">
            <CardTitle className="text-xl font-semibold mb-2">Stay Updated</CardTitle>
            <CardContent>
              <p className="text-gray-600">Never miss meetings and events from your favorite clubs.</p>
            </CardContent>
          </Card>
        </div>

      </main>
    </div>
  );
};

export default Home;
