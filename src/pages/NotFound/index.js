import React from 'react';
import { Link } from 'react-router-dom';
import errorImage from '../../assets/404error.svg';

import './styles.css';

export default function NotFound() {

   return (
      <div className="errorWrapper">
         <img className="errorImage" src={errorImage} alt=""/>
         <br/>
         <br/>
         <Link to="/">
            Go Home
         </Link>
      </div>
   );
};
