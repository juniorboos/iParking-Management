import React from 'react';
import firebase from '../../services/firebase'

import './styles.css';

export default function Dashboard() {

   const addAdmin = () => {
      const adminEmail = "miltonboosj@gmail.com"
      const addAdminRole = firebase.functions().httpsCallable('addAdminRole')
      addAdminRole({email: adminEmail}).then(result => {
         console.log(result)
      })
   }

   return (
      <div className="dashboard-wrapper">
         <button type="button" onClick={addAdmin}>Tornar admin</button>
      </div>
   );
};