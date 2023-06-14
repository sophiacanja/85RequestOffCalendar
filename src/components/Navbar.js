import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
// import * as IoIcons from 'react-icons/io';
import { CheckForAdminAccess } from './PrivateRouterUser';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);


  const showSidebar = () => {
    setSidebar(!sidebar);
    console.log();
  };



  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="logo-container">
            <img src={require('../assets/photos/85.png')} alt={'85 degrees logo'} style={{ width: '70px', height: "70px", borderRadius: "70%" }} />
          </div>

          {/* <h1 className='app-title' style={{ fontFamily: "Open Sans, sans-serif", fontWeight: 600, fontSize: "2.5rem", letterSpacing: "1px", color: "#3c3c3c", textTransform: "uppercase", textAlign: "center", margin: "1rem 0" }}>Icy Delivery</h1> */}
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
              if (localStorage.userIsLoggedIn === "true" && localStorage.admin === "true" && CheckForAdminAccess(localStorage.employeeID)) {
                return (
                  <>
                    <li className='nav-text'>
                      <Link to='/adminHome'>
                        <AiIcons.AiFillHome />
                        <span>Admin Home</span>
                      </Link>
                    </li>
                    <li className='nav-text'>
                      <Link to='/adminManagement'>
                        <FaIcons.FaUserCog />
                        <span>Admin Management</span>
                      </Link>
                    </li>
                    <li className='nav-text'>
                      <Link to='/logout'>
                        <AiIcons.AiOutlineLogout />
                        <span>Logout</span>
                      </Link>
                    </li>
                  </>
                )
                // if user is logged in and is a regular admin
              } else if (localStorage.userIsLoggedIn === "true") {
                return (
                  SidebarData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
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
                  <>
                    <li className='nav-text'>
                      <Link to='/'>
                        <AiIcons.AiFillHome />
                        <span>Home</span>
                      </Link>
                    </li>
                    <li className='nav-text'>
                      <Link to='/login'>
                        <FaIcons.FaSignInAlt />
                        <span>Login</span>
                      </Link>
                    </li>
                    <li className='nav-text'>
                      <Link to='/adminLogin'>
                        <FaIcons.FaUserShield />
                        <span>Admin Login</span>
                      </Link>
                    </li>
                  </>
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
