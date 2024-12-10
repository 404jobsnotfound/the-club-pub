'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession(); // Access session data
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; role: string };
  const role = userWithRole?.role;
  const pathName = usePathname();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/HomePage">The Club Pub</Navbar.Brand>
        {/* Conditionally render "Browse Clubs" only if the user is logged in */}
        {currentUser && (
          <Navbar.Brand href="/browseClub">Browse Clubs</Navbar.Brand>
        )}

        {/* Only show AddClub if user is logged in */}
        {currentUser && (
          <Navbar.Brand href="/add">Add Club</Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              <>
                <Nav.Link href="/add" active={pathName === '/add'}>
                  Add Stuff
                </Nav.Link>
                <Nav.Link href="/list" active={pathName === '/list'}>
                  List Stuff
                </Nav.Link>
              </>
            )}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link href="/admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown title={currentUser}>
                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Login">
                <NavDropdown.Item href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
