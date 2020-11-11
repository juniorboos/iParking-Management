import React, { useState } from 'react';
import firebase from '../../services/firebase'

import './styles.css';

export default function Admin() {
   const [email, setEmail] = useState('')

   const addAdmin = () => {
      const addAdminRole = firebase.functions().httpsCallable('addAdminRole')
      addAdminRole({email: email}).then(result => {
         console.log(result)
         alert(result.data.message)
      })
   }

   return (
      <div className="admin-wrapper">
         <div className="card">
            <input placeholder="Email" type="text" name="adminName" onChange={e => setEmail(e.target.value)} />
            <button type="button" onClick={addAdmin}>Make Admin</button>
         </div>
         
      </div>
   );
};