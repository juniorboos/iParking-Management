import React, {useState, useEffect} from 'react';
// import {FiLogIn} from 'react-icons/fi';
// import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'
import Select from 'react-select';
import './styles.css';

export default function Dashboard() {
   const [parkings, setParkings] = useState([])
   const [regions, setRegions] = useState([])
   const [spots, setSpots] = useState([])

   const [parking, setParking] = useState(null)
   const [region, setRegion] = useState(null)
   const [spot, setSpot] = useState(null)


   useEffect(() => {
      const loadParkings = () => {
         api.get('parkings')
            .then(response => {
               const formatArray = response.data.map(function(item) {
                  return {... item, value: item.id, label: item.name}
               })
               setParkings(formatArray)
               console.log("Parkings: ", formatArray)
            })
      }
      loadParkings()
   },[])

   useEffect(() => {
      if (parking !== null) {
         setRegion(null)
         console.log("Regionsss: ",region)
         try {
            api.get(`parkings/${parking.id}`)
               .then(response => {
                  const formatArray = response.data.map(function(item) {
                     return {... item, value: item.id, label: item.name}
                  })
                  setRegions(formatArray)
                  console.log("Regions: ", formatArray)
               })
         } catch(err) {
            alert('Erro ao encontrar regiões')
         }
      }
   }, [parking]);

   useEffect(() => {
      if(region !== null) {
         setSpot(null)
         console.log("Region: ", region)
         try {
            api.get(`parkings/${parking.id}/${region.id}`)
               .then(response => {
                  const formatArray = response.data.map(function(item) {
                     return {... item, value: item.id, label: item.id}
                  })
                  setSpots(formatArray)
                  console.log("Spots: ", formatArray)
               })
         } catch(err) {
            alert('Erro ao encontrar spots')
         }
      }
   },[region])


   return (
      <div className="wrapper">
         <div className="card">
            <Select
               label="Parking"
               className="select"
               onChange={selectedOption => setParking(selectedOption)}
               options={parkings}
               isSearchable
               placeholder="Select parking"
            />
            {parking !== null && (
               <div className="info">
                  <p>{parking.name}</p>
                  <p>{parking.coordinates}</p>
                  <p>{parking.image}</p>
               </div>
            )}
            

         </div>
         <div className="card" style={parking === null ? {display: 'none'}: null}>
               <Select
                  className="select"
                  onChange={selectedOption => setRegion(selectedOption)}
                  options={regions}
                  isSearchable
                  value={region}
                  placeholder="Select region"
               />
               {region !== null && (
                  <div className="info">
                     <p>{region.name}</p>
                  </div>
               )}
         </div>         
         <div className="card" style={region === null ? {display: 'none'}: null}>
               <Select
                  className="select"
                  onChange={selectedOption => setSpot(selectedOption)}
                  options={spots}
                  value={spot}
                  isSearchable
                  placeholder="Select spot"
               />
               {spot !== null && (
                  <div className="info">
                     <p>{spot.name}</p>
                     <p>{spot.coordinates}</p>
                  </div>
               )}
         </div>         
      </div>
   );
};