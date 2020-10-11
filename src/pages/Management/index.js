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
                  return {value: item.id, label: item.name}
               })
               setParkings(formatArray)
               console.log("Parkings: ", formatArray)
            })
      }
      loadParkings()
   },[])

   useEffect(() => {
      setRegion(null)
      if (parking !== null) {
         try {
            api.get(`parkings/${parking}`)
               .then(response => {
                  const formatArray = response.data.map(function(item) {
                     return {value: item.id, label: item.name}
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
      setSpot(null)
      if(region !== null) {
         console.log("Region: ", region)
         try {
            api.get(`parkings/${parking}/${region}`)
               .then(response => {
                  const formatArray = response.data.map(function(item) {
                     return {value: item.id, label: item.id}
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
            <div className="selectDiv">
               <Select
                  label="Parking"
                  className="select"
                  onChange={selectedOption => setParking(selectedOption.value)}
                  options={parkings}
                  isSearchable
                  is
                  placeholder="Select parking"
               />
            </div>
         </div>
         <div className="card" style={parking === null ? {display: 'none'}: null}>
            <div className="selectDiv">
               <Select
                  className="select"
                  onChange={selectedOption => setRegion(selectedOption.value)}
                  options={regions}
                  isSearchable
                  value={region !== null ? region.value : null}
                  placeholder="Select region"
               />
            </div>
         </div>         
         <div className="card" style={region === null ? {display: 'none'}: null}>
            <div className="selectDiv">
               <Select
                  className="select"
                  onChange={selectedOption => setSpot(selectedOption.value)}
                  options={spots}
                  value={spot !== null ? spot.value : null}
                  isSearchable
                  placeholder="Select spot"
               />
            </div>
         </div>         
      </div>
   );
};