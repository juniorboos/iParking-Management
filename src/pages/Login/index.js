import React, {useState, createContext} from 'react';
// import {FiLogIn} from 'react-icons/fi';
// import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'
import {setAccessToken} from '../../services/accessToken'
// import firebase from '../../services/firebase'

import './styles.css';

export default function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [data, setData] = useState('')


   const userContext = createContext(data)

   function login (e) {
      e.preventDefault()
      const data = { email, password }
      try {
         api.post('authenticate', data, { withCredentials: true })
            .then((response) => {
               console.log(response)
               setData(response.data)
               if (response && response.data) {
                  console.log(response.data.token)
                  // setAccessToken(response.data.token)
               }
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