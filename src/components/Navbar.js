import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RegularUserSidebarData, AdminSidebarData, LoggedOutSidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { CheckIfLoggedIn, CheckForAdminAccess } from './PrivateRouterUser';
// import * as IoIcons from 'react-icons/io';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorPresent, setErrorPresent] = useState(false);


  const showSidebar = () => {
    setSidebar(!sidebar);
    console.log();
  };

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        setIsAdmin(await CheckForAdminAccess());
        setIsLoggedIn(await CheckIfLoggedIn());
        setDataLoaded(true);
        setErrorPresent(false);
      } catch (err) {
        console.log("Error fetching user information:", err);
        setDataLoaded(false);
        setErrorPresent(true);
      }
    };

    getUserInformation();
  }, []); // Dependency array: Leave empty if the effect should only run once (on mount)




  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            {/* checks if backend is working, then gives option if it is */}
            {!errorPresent && dataLoaded ? (
              <FaIcons.FaBars onClick={showSidebar} />
            ) : null}
          </Link>
          <div className="logo-container">
            <img src={require('../assets/photos/85.png')} alt={'85 degrees logo'} style={{ width: '70px', height: "70px", borderRadius: "70%" }} />
          </div>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} style={{ zIndex: 99 }}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>


            {/* if admin is logged in, then render admin options only. if it's a regular user logged in, then render user options. if not logged in, render login and create account */}
            {(() => {

              if (!dataLoaded) {
                return (
                  <h4 style={{ textAlign: 'center' }}>Loading...</h4>
                )
              }
              else if (isLoggedIn && isAdmin) {
                return (
                  AdminSidebarData.map((item, index) => {
                    return (
                      <li key={index} className='nav-text'>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                  })
                )
                // if user is logged in and is a regular admin
              } else if (isLoggedIn) {
                return (
                  RegularUserSidebarData.map((item, index) => {
                    return (
                      <li key={index} className='nav-text'>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                  })
                )
              } else { // if user is not logged in
                return (
                  LoggedOutSidebarData.map((item, index) => {
                    return (
                      <li key={index} className='nav-text'>
                        <Link to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                  })
                )
              }
            })()}


          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
