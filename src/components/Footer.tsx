import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <div className="text-center">
      <p>
        The Club Pub is a platform designed to help you find the right club for you. You can browse
        through the list of clubs and find one that interests you. You can also add a club to the
        list if you are a club owner.
      </p>
      <hr />
    </div>
    <Container>
      <Col className="text-center">
        Site Created and Managed By: 404JobsNotFound
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        <br />
        <a href="https://404jobsnotfound.github.io/">Project Home Page</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
