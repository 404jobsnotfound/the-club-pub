import { getServerSession } from 'next-auth';
import { Container } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';

/** The Home page. */
const Home = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; role: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  return (
    <main>
      <Container
        id="landing-page"
        fluid
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{ height: '65vh' }}
      >
        <div>
          <h1>Welcome to The Club Pub</h1>
          <h4>Find the Right Club For You Now</h4>
          <h6>Sign up or log in to get started</h6>
        </div>
        {session && (
        <div className="mt-4">
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => window.location.href = '/list'}
            >
              Browse Clubs
            </button>
          </div>
        </div>
        )}
      </Container>
    </main>
  );
};

export default Home;
