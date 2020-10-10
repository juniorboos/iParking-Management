import React, {useState, useEffect} from 'react';
// import {FiLogIn} from 'react-icons/fi';
// import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

import './styles.css';

export default function Dashboard() {
   const [parkings, setParkings] = useState([])
   const [regions, setRegions] = useState([])
   const [spots, setSpots] = useState([])

   const [parking, setParking] = useState('')
   const [region, setRegion] = useState('')
   const [spot, setSpot] = useState('')

   useEffect(() => {
      const loadParkings = () => {
         api.get('parkings')
            .then(response => {
               setParkings(response.data)
               console.log("Parkings: ", response)
            })
      }
      loadParkings()
      
   },[])

   

   const loadRegions = () => {
      try {
         api.get(`parkings/${parking}`)
            .then(response => {
               const reponseData = response.data
               setRegions(reponseData)
               console.log("Regions: ", response)
            })
      } catch(err) {
         alert('Erro ao encontrar regiões')
      }
   }

   const loadSpots = () => {
      try {
         api.get(`parkings/${parking}/${region}`)
            .then(response => {
               const reponseData = response.data
               setSpots(reponseData)
               setSpot(reponseData[0].id)
               console.log("Spots: ", response)
            })
      } catch(err) {
         alert('Erro ao encontrar spots')
      }
   }

   return (
      <div>
         <div>
            <select value={parking} onChange={e => setParking(e.target.value)}>
               {parkings.map((parking, index) => {
                  return (
                     <option key={index} value={parking.id}>{parking.name}</option>
                  )
               })}
            </select>
            <button onClick={() => loadRegions()}>Search</button>
         </div>
         <div>
            <select value={region} onChange={e => setRegion(e.target.value)}>
               {regions.map((region, index) => {
                  return (
                     <option key={index} value={region.id}>{region.name}</option>
                  )
               })}
            </select>
            <button onClick={() => loadSpots()}>Search</button>
         </div>         
         <div>
            <select value={spot} onChange={e => setSpot(e.target.value)}>
               {spots.map((spot, index) => {
                  return (
                     <option key={index} value={spot.id}>{spot.id}</option>
                  )
               })}
            </select>
         </div>         
      </div>
   );
};