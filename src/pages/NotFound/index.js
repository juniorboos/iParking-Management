import React from 'react';
import { Link } from 'react-router-dom';


import './styles.css';

export default function NotFound() {

   return (
      <div>
         <h1>404 - Not Found!</h1>
         <Link to="/">
            Go Home
         </Link>
      </div>
   );
};
