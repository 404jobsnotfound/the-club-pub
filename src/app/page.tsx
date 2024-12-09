'use client';

import { Container } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
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
      {/* This button will still show up for all users */}
      <div className="mt-4">
        <div className="d-flex justify-content-center" />
      </div>
    </Container>
  </main>
);

export default Home;
