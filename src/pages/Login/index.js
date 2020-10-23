import React from 'react';
// import {FiLogIn} from 'react-icons/fi';
// import {Link, useHistory} from 'react-router-dom'
// import api from '../../services/api'
// import firebase from '../../services/firebase'

import './styles.css';

export default function Dashboard() {

   const login = () => {
      // if (user == "" || pass == "") {
      //    return alert("Error, empty field!");
      // }

      // firebase
      //    .auth()
      //    .signInWithEmailAndPassword(user, pass)
      //    .then(() => {
      //       console.log("Autenticado - Enviando para rota correta...");
      //       navigation.reset({
      //          index: 0,
      //          routes: [{ name: "RoutesDrawer" }],
      //       })
      //       // navigation.dispatch(
      //       //    CommonActions.reset({
      //       //       index: 0,
      //       //       routes: [{ name: "RoutesDrawer" }],
      //       //    })
      //       // );
      //    })
      //    .catch((error) => {
      //       createButtonAlert("Error", error.toString())
      //       if (
      //          error == "auth/wrong-password" ||
      //          error ==
      //          "The password is invalid or the user does not have a password."
      //       ) {
      //          return createButtonAlert("Error", "Wrong Password!");
      //       }
      //       if (error == "auth/invalid-email") {
      //          return createButtonAlert("Error", "Invalid Email!");
      //       }
      //       console.log(error);
      //       // alert(error);
      //    });
   }

   return (
      <div className="loginContainer">
         <form className="box" action="index.html" method="post">
            <h1>Login</h1>
            <input type="text" name="" placeholder="Username"/>
            <input type="password" name="" placeholder="Password"/>
            <input type="submit" name="" value="Login"/>
         </form>
      </div>
      
   );
};