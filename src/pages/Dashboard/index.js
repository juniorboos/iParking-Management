import React, { useState } from 'react';
// import {FiLogIn} from 'react-icons/fi';
// import {Link, useHistory} from 'react-router-dom'
import Select from 'react-select';
import api from '../../services/api'

import './styles.css';

export default function Dashboard() {
   const [parkings, setParkings] = useState([])
   const [parking, setParking] = useState()

   const customStyles = {
      control: base => ({
        ...base,
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgb(160, 160, 160)',
        fontSize: 18
      })
   };

   return (
      <div className="dashboard-wrapper">
         <Select
            styles={customStyles}
            label="Parking"
            className="select"
            onChange={selectedOption => setParking(selectedOption)}
            options={parkings}
            isSearchable
            placeholder="Select parking"
         />
         <div className="cards-wrapper">
            <div className="upper-cards">
               <div className="card"></div>
               <div className="card"></div>
            </div>
            <div className="lower-cards">
               <div className="card"></div>
               <div className="card"></div>
               <div className="card"></div>
            </div>
            
         </div>
      </div>
   );
};