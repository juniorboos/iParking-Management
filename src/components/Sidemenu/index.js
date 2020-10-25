import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { SidemenuData } from './SidemenuData';
import { IconContext } from 'react-icons';
import './styles.css';

export default function Sidemenu() {
   const [sidemenu, setSidemenu] = useState(true)

   const showSidemenu = () => setSidemenu(!sidemenu)
   const location = useLocation()
   
   return (
      <>
         <IconContext.Provider value={{color:'#fff'}}>
            {/* <div className="navbar">
               <Link to='#' className='menu-bars' >
                  <FaIcons.FaBars onClick={showSidemenu} />
               </Link>
               <ul className="nav-menu-items" onClick={showSidemenu}>
                  {SidemenuData.map((item, index) => {
                     return (
                        <li key={index} className={item.cName}>
                           <Link to={item.path}>
                              {item.icon}
                           </Link>
                        </li>
                     )
                  })}
               </ul>
            </div> */}
            <nav style={location.pathname == '/' ? {display: 'none'} : null} className={sidemenu ? 'nav-menu active' : 'nav-menu'}>
            {/* <nav className={'nav-menu'}> */}
               <Link to='#' className="menu-bars" onClick={showSidemenu}>
                  {sidemenu ? (
                     <FaIcons.FaChevronLeft  />
                  ) : (
                     <FaIcons.FaChevronRight  />
                  )}
                  
               </Link>
               <ul className="nav-menu-items">
                  {SidemenuData.map((item, index) => {
                     return (
                        <li key={index} className={sidemenu ? 'nav-text active' : 'nav-text'}>
                           <Link to={item.path}>
                              {item.icon}
                              {/* <span className={sidemenu ? 'title active': 'title'}>{item.title}</span>                               */}
                              <div className={sidemenu ? 'contents active' : 'contents'}>
                                 <div className={sidemenu ? 'inner active' : 'inner'}>
                                    {item.title}
                                 </div>
                              </div>                             
                           </Link>
                        </li>
                     )
                  })}
               </ul>
            </nav>
         </IconContext.Provider>
      </>
   )
}