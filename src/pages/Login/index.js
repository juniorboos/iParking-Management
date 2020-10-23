import React from 'react';
// import {FiLogIn} from 'react-icons/fi';
// import {Link, useHistory} from 'react-router-dom'
// import api from '../../services/api'

import './styles.css';

export default function Dashboard() {

   return (
      <form className="box" action="index.html" method="post">
         <h1>Login</h1>
         <input type="text" name="" placeholder="Username"/>
         <input type="password" name="" placeholder="Password"/>
         <input type="submit" name="" value="Login"/>
      </form>
   );
};