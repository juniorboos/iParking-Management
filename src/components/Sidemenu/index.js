import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import { Link } from "react-router-dom";
import { SidemenuData } from "./SidemenuData";
import { IconContext } from "react-icons";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

export default function Sidemenu() {
   const [sidemenu, setSidemenu] = useState(true);

   const showSidemenu = () => setSidemenu(!sidemenu);
   const user = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const logout = () => {
      dispatch({ type: "LOGOUT" });
   };

   return (
      <>
         <IconContext.Provider value={{ color: "#fff" }}>
            <nav className={sidemenu ? "nav-menu active" : "nav-menu"}>
               <Link to="#" className="menu-bars" onClick={showSidemenu}>
                  {sidemenu ? (
                     <FaIcons.FaChevronLeft />
                  ) : (
                     <FaIcons.FaChevronRight />
                  )}
               </Link>
               <ul className="nav-menu-items">
                  <li className={sidemenu ? "profile active" : "profile"}>
                     <div className="profileIcon">
                        <FaIcons.FaUserCircle size={18} />
                     </div>

                     <div className={sidemenu ? "contents active" : "contents"}>
                        <div className={sidemenu ? "inner active" : "inner"}>
                           {user.name.split(" ")[0]}
                        </div>
                     </div>
                  </li>

                  {SidemenuData.map((item, index) => {
                     return (
                        <li
                           key={index}
                           className={sidemenu ? "nav-text active" : "nav-text"}
                        >
                           <Link to={item.path}>
                              {item.icon}
                              <div
                                 className={
                                    sidemenu ? "contents active" : "contents"
                                 }
                              >
                                 <div
                                    className={
                                       sidemenu ? "inner active" : "inner"
                                    }
                                 >
                                    {item.title}
                                 </div>
                              </div>
                           </Link>
                        </li>
                     );
                  })}

                  <button
                     type="button"
                     onClick={logout}
                     className={
                        sidemenu ? "logout-button active" : "logout-button"
                     }
                  >
                     <div className="profileIcon">
                        <CgIcons.CgLogOut size={18} />
                     </div>
                     <div className={sidemenu ? "contents active" : "contents"}>
                        <div className={sidemenu ? "inner active" : "inner"}>
                           Logout
                        </div>
                     </div>
                  </button>
                  {/* <button type="button" onClick={logout}>LOGOUT</button> */}
               </ul>
            </nav>
         </IconContext.Provider>
      </>
   );
}
