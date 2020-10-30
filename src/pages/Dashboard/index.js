import React, { useState, useEffect } from 'react';
// import {FiLogIn} from 'react-icons/fi';
// import {Link, useHistory} from 'react-router-dom'
import Select from 'react-select';
import api from '../../services/api'
import reservationsImage from '../../assets/reservations.svg'
import spotsImage from '../../assets/spots.svg'
import moneyImage from '../../assets/money.svg'
import timeImage from '../../assets/time.svg'
import weatherImage from '../../assets/weather.svg'
import firebase from '../../services/firebase'

import './styles.css';

export default function Dashboard() {
   const parkingsRef = firebase.firestore().collection('Parkings');
   const [parkings, setParkings] = useState([])
   const [parking, setParking] = useState(null)

   const loadParkings = () => {
      parkingsRef.get()
         .then((snapshot) => {
            let parkingsList = []
            snapshot.forEach(doc => {
               parkingsList.push({id: doc.id, ... doc.data(), value: doc.id, label: doc.data().name})
            })
            setParkings(parkingsList)
         })
   }

   useEffect(() => {
      loadParkings()
   },[])


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
               <div className="dashboard-card">
                  <img className="image" src={reservationsImage} alt=""/>
                  <div className="label">
                     <h1>258</h1>
                     <h3>reservations</h3>
                  </div>
               </div>
               <div className="dashboard-card">
                  <img className="image" src={spotsImage} alt=""/>
                  <div className="label">
                     <h1>64 / 300</h1>
                     <h3>spots available</h3>
                  </div>
               </div>
            </div>
            <div className="lower-cards">
               <div className="dashboard-card">
                  <img className="image" src={moneyImage} alt=""/>
                  <div className="label">
                     <h1>€ 2376,75</h1>
                     <h3>gained today</h3>
                  </div>
               </div>
               <div className="dashboard-card">
                  <img className="image" src={weatherImage} alt=""/>
                  <div className="label">
                     <h1>16 °C</h1>
                     <h3>Cloudy</h3>
                  </div>
               </div>
               <div className="dashboard-card">
                  <img className="image" src={timeImage} alt=""/>
                  <div className="label">
                     <h1>3h 24min</h1>
                     <h3>average time</h3>
                  </div>
               </div>
            </div>
            
         </div>
      </div>
   );
};