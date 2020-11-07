import React from 'react';
import firebase from '../../services/firebase'

import './styles.css';

export default function Admin() {

   const addAdmin = () => {
      const adminEmail = "miltonboosj@gmail.com"
      const addAdminRole = firebase.functions().httpsCallable('addAdminRole')
      addAdminRole({email: adminEmail}).then(result => {
         console.log(result)
      })
   }

   return (
      <div className="admin-wrapper">
         <div className="card">
            <input placeholder="Email" type="text" name="adminName" />
            <button type="button" onClick={addAdmin}>Tornar admin</button>
         </div>
         
      </div>
   );
};