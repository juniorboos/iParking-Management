import React, {useState, useEffect} from 'react';
// import {FiLogIn} from 'react-icons/fi';
import {useHistory} from 'react-router-dom'
import api from '../../services/api'
import {setAccessToken} from '../../services/accessToken'
// import firebase from '../../services/firebase'
import { useDispatch, useSelector } from 'react-redux'
import './styles.css';

export default function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [data, setData] = useState('')
   const history = useHistory()
   const dispatch = useDispatch()
   const user = useSelector(state => state.user)

   useEffect(() => {
      if (user.name !== '') {
         history.push('/dashboard')
      }
   }, [])

   function login (e) {
      e.preventDefault()
      const data = { email, password }
      try {
         api.post('authenticate', data, { withCredentials: true })
            .then((response) => {
               if (response && response.data) {
                  // setData(response.data)
                  dispatch({
                     type: 'LOGIN', 
                     user: response.data.user
                  })
                  setAccessToken(response.data.token)
                  history.push("/dashboard");
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