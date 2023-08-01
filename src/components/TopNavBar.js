import React, { useState, useEffect } from 'react';
import { CheckIfLoggedIn, CheckForAdminAccess } from './PrivateRouterUser';
import { Container, Navbar, Nav } from 'react-bootstrap';

import homeJSON from '../assets/gifs/white home icon.json';
import adminManagementJSON from '../assets/gifs/white admin management icon.json';
import accountJSON from '../assets/gifs/white account icon.json';
import logoutJSON from '../assets/gifs/white logout icon.json';
import NavbarOption from './NavbarOption';
import './Navbar.css';

const TopNavBar = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);


  useEffect(() => {
    const getUserInformation = async () => {
      try {
        setIsAdmin(await CheckForAdminAccess());
        setIsLoggedIn(await CheckIfLoggedIn());
        setTimeout(() => {
          setDataLoaded(true);
          setErrorPresent(false);
        }, 200)

      } catch (err) {
        console.log("Error fetching user information:", err);
        setDataLoaded(false);
        setErrorPresent(true);
      }
    };

    getUserInformation();

  }, []); // Dependency array: Leave empty if the effect should only run once (on mount)


  if (dataLoaded === false) {
    return (
      <div className='navbar justify-content-center'>
        <p>Authenticating account permissions, please wait.</p>
      </div>
    )
  }

  if (errorPresent === true) {
    return (
      <div className='navbar justify-content-center'>
        <p>Server error, please try again later</p>
      </div >
    )
  }

  if (isLoggedIn === false) {
    return (
      <div className='navbar justify-content-center'>
        <p>Please refresh the page and re-login</p>
      </div>
    )
  }

  if (isAdmin === true) {
    return (
      <Navbar expand="lg" className="navbar">
        <Container className='navbar'>
          <Nav className="me-auto">
            <NavbarOption title='Home' icon={homeJSON} pageRef='/adminHome' />
            <NavbarOption title='Admin Management' icon={adminManagementJSON} pageRef='/adminManagement' />
          </Nav>
          <Nav>
            <NavbarOption title='Account' icon={accountJSON} pageRef='/updateAccount' />
            <NavbarOption title='Logout' icon={logoutJSON} pageRef={'/logout'} />
            <img
              src={require('../assets/photos/85.png')}
              style={{ borderRadius: '100px', height: '65px', width: '65px' }}
              alt='85c logo'
            />
          </Nav>
        </Container>
      </Navbar>
    );
  } else {
    return (
      <Navbar expand="lg" className="navbar">
        <Container>
          <Nav className="me-auto">
            <NavbarOption title='Home' icon={homeJSON} pageRef='/' />
          </Nav>
          <Nav>
            <NavbarOption title='Account' icon={accountJSON} pageRef='/updateAccount' />
            <NavbarOption title='Logout' icon={logoutJSON} pageRef={'/logout'} />
            <img
              src={require('../assets/photos/85.png')}
              style={{ borderRadius: '100px', height: '65px', width: '65px' }}
              alt='85c logo'
            />
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default TopNavBar;