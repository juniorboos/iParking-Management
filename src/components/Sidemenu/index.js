import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidemenuData } from './SidemenuData';
import { IconContext } from 'react-icons';
import './styles.css';

export default function Sidemenu() {
   const [sidemenu, setSidemenu] = useState(false)

   const showSidemenu = () => setSidemenu(!sidemenu)

   
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
            <nav className={sidemenu ? 'nav-menu active' : 'nav-menu'}>
            {/* <nav className={'nav-menu'}> */}
               <Link to='#' className="menu-bars">
                  {sidemenu ? (
                     <FaIcons.FaChevronLeft onClick={showSidemenu} />
                  ) : (
                     <FaIcons.FaChevronRight onClick={showSidemenu} />
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