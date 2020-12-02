import React, { useState } from "react";
import firebase from "../../services/firebase";

import "./styles.css";

export default function Admin() {
   const [email, setEmail] = useState("");

   const addAdmin = () => {
      console.log("Tornando " + email + " admin");
      const addAdminRole = firebase.functions().httpsCallable("addAdminRole");
      addAdminRole({ email: email }).then((response) => {
         alert("Success!");
      });
   };

   return (
      <div className="admin-wrapper">
         <div className="card">
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
      </div>
   );
}
