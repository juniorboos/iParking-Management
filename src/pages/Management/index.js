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
               setParking('IPB')
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
               setRegion(reponseData[0].name)
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
            <input 
               placeholder="Parking"
               value = {parking}
               onChange = {e => setParking(e.target.value)}
            />
            <button onClick={() => loadRegions()}>Search</button>
         </div>
         <div>
            <input 
               placeholder="Region"
               value = {region}
               onChange = {e => setRegion(e.target.value)}
            />
            <button onClick={() => loadSpots()}>Search</button>
         </div>         
      </div>
   );
};