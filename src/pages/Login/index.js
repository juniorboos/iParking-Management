import React, {useState} from 'react';
// import {FiLogIn} from 'react-icons/fi';
// import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'
// import firebase from '../../services/firebase'

import './styles.css';

export default function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   function login (e) {
      e.preventDefault()
      const data = { email, password }
      try {
         api.post('authenticate', data)
            .then((response) => {
               console.log(response)
            })
      } catch (err) {
         console.log(err)
         alert('An error ocurred, try again.')
      }
   }

   return (
      <div className="loginContainer">
         <form className="box" onSubmit={login}>
            <h1>Login</h1>
            <input 
               type="text" 
               name="" 
               placeholder="Username"
               onChange={e => setEmail(e.target.value)}  
            />
            <input 
               type="password"
               name="" 
               placeholder="Password"
               onChange={e => setPassword(e.target.value)}
            />
            <button 
               type="submit" 
               name="" 
            >Login</button>
         </form>
      </div>
      
   );
};