import React, { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import firebase from "../../services/firebase";

import "./styles.css";

export default function Admin() {
   const [email, setEmail] = useState("");
   const [users, setUsers] = useState([]);

   useEffect(() => {
      console.log("getting admins");
      const usersRef = firebase
         .firestore()
         .collection("Users")
         .where("isAdmin", "==", true);

      let usersList = [];
      usersRef
         .get()
         .then((snapshot) => {
            snapshot.forEach((doc) => {
               console.log(doc.data());
               usersList.push({ id: doc.id, ...doc.data() });
            });
         })
         .finally(() => {
            console.log(usersList);
            setUsers(usersList);
         });
   }, []);

   const addAdmin = () => {
      console.log("Tornando " + email + " admin");
      const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
      addAdminRole({ email: email }).then((response) => {
         alert("Success!");
      });
   };

   const removeAdmin = (id) => {
      console.log("removing " + id);
   };

   return (
      <div className="admin-wrapper">
         <div className="card-admin">
            <div className="make-admin">
               <input
                  placeholder="Email"
                  type="text"
                  name="adminName"
                  onChange={(e) => setEmail(e.target.value)}
               />
               <button type="button" onClick={addAdmin}>
                  Make Admin
               </button>
            </div>
            <div className="admin-list">
               {users.map((user, idx) => (
                  <div className="user-admin" key={idx}>
                     <div className="user-field">{user.fullName}</div>
                     <div className="user-field">{user.email}</div>
                     <div className="user-field">{user.phone}</div>
                     <div
                        className="user-remove"
                        onClick={() => removeAdmin(user.id)}
                     >
                        <AiIcons.AiOutlineUserDelete size={18} />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
