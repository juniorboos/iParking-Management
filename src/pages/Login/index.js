import React, {useState} from 'react';
// import {FiLogIn} from 'react-icons/fi';
import {useHistory} from 'react-router-dom'
import api from '../../services/api'
import {setAccessToken} from '../../services/accessToken'
import firebase from '../../services/firebase'
import { useDispatch } from 'react-redux'
import './styles.css';

export default function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const history = useHistory()
   const dispatch = useDispatch()
   
   function login (e) {
      e.preventDefault()
      // const data = { email, password }
      // try {
      //    api.post('authenticate', data, { withCredentials: true })
      //       .then((response) => {
      //          if (response && response.data) {
      //             // setData(response.data)
      //             dispatch({
      //                type: 'LOGIN', 
      //                user: response.data.user
      //             })
      //             setAccessToken(response.data.token)
      //             history.push("/dashboard");
      //          }
      //       })
      // } catch (err) {
      //    console.log(err)
      //    alert('An error ocurred, try again.')
      // }

      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(() => {
            const user = {
               email: firebase.auth().currentUser.email,
               name: firebase.auth().currentUser.displayName,
            };
            dispatch({
               type: 'LOGIN', 
               user: user
            })
            // const user = firebase.auth().currentUser;
            // user.getIdTokenResult().then(idTokenResult => {
            //    console.log(user)
            //    user.admin = idTokenResult.claims.admin

            //    if()
            // })
         }).catch((error) => {
            alert(error.toString())
            if (
               error == "auth/wrong-password" ||
               error ==
               "The password is invalid or the user does not have a password."
            ) {
               return alert("Wrong Password!");
            }
            if (error == "auth/invalid-email") {
               return alert("Invalid Email!");
            }
            console.log(error);
            // alert(error);
         });
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