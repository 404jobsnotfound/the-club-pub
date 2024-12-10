'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession(); // Access session data
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; role: string };
  const role = userWithRole?.role;
  const pathName = usePathname();

  const [clubs, setClubs] = useState<any[]>([]);
  const [userHasClub, setUserHasClub] = useState(false); // State to track if the user has any club

  // Fetch clubs and check if the user is associated with any of them
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('/api/clubs');
        if (response.ok) {
          const data = await response.json();
          setClubs(data);

          // Check if the user's email is associated with any club
          const userInClub = data.some((club: any) => club.admins?.includes(currentUser));
          setUserHasClub(userInClub);
        } else {
          console.error('Failed to fetch clubs');
        }
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    if (currentUser) {
      fetchClubs();
    }
  }, [currentUser]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand
        href="/HomePage" style = {{ marginRight: '70px' }} >The Club Pub</Navbar.Brand>
        
        {/* Conditionally render "Browse Clubs" only if the user is logged in */}
        {currentUser && (
          <Navbar.Brand href="/browseClub">Browse Clubs</Navbar.Brand>
        )}

        {/* Only show AddClub if user is logged in */}
        {currentUser && (
          <Navbar.Brand href="/add">Add Club</Navbar.Brand>
        )}

        {/* Add the logo in the center of the navbar */}
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-center">
          <Nav className="mx-auto">
            <Navbar.Brand href="/HomePage" className="d-flex justify-content-center">
              <img src="/clublogo.png" alt="Club Logo" style={{ marginLeft: currentUser ? '72px' : '250px', height: '60px' }} />
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && role === 'ADMIN' && (
              <Navbar.Brand style = {{ marginLeft: '65px' }} href="/admin">Admin</Navbar.Brand>
            )}
              {/* Conditionally render the "Edit Clubs" button if the user has a club */}
  {userHasClub && currentUser &&(
   <Navbar.Brand style = {{ marginLeft: '65px' }} href="/edit">Edit Club</Navbar.Brand>
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
