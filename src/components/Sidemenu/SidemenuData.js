import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';

export const SidemenuData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdIcons.MdDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Management',
    path: '/management',
    icon: <FaIcons.FaParking />,
    cName: 'nav-text'
  },
  {
    title: 'Admin',
    path: '/admin',
    icon: <RiIcons.RiTeamFill />,
    cName: 'nav-text'
  },
];