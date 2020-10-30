import React, {useState} from 'react';
// import {FiLogIn} from 'react-icons/fi';
import firebase from '../../services/firebase'
import { useDispatch } from 'react-redux'
import './styles.css';

export default function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   
   function login (e) {
      e.preventDefault()
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(() => {
            firebase.auth().currentUser.getIdTokenResult().then(idTokenResult => {
               if(idTokenResult.claims.admin) {
                   const user = {
                       email: firebase.auth().currentUser.email,
                       name: firebase.auth().currentUser.displayName,
                   };
                   dispatch({
                       type: 'LOGIN', 
                       user: user
                   })
               }
           })
         }).catch((error) => {
            alert(error.toString())
            if (
               error === "auth/wrong-password" ||
               error ===
               "The password is invalid or the user does not have a password."
            ) {
               return alert("Wrong Password!");
            }
            if (error === "auth/invalid-email") {
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