import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const RegularUserSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Account',
    path: '/updateAccount',
    icon: <FaIcons.FaUser />,
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
  }
];


export const AdminSidebarData = [
  {
    title: 'Admin',
    path: '/adminHome',
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: 'Admin Management',
    path: '/adminManagement',
    icon: <FaIcons.FaUserCog />
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
  }
];


export const LoggedOutSidebarData = [
  {
    title: 'Login',
    path: '/login',
    icon: <FaIcons.FaSignInAlt />
  }
]

