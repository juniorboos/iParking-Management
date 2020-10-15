import React, {useState, useEffect} from 'react';
import {MdAdd, MdEdit} from 'react-icons/md';
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
                  return {...item, value: item.id, label: item.name}
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
         try {
            api.get(`parkings/${parking.id}`)
               .then(response => {
                  const formatArray = response.data.map(function(item) {
                     return {...item, value: item.id, label: item.name}
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
                     return {...item, value: item.id, label: item.id}
                  })
                  setSpots(formatArray)
                  console.log("Spots: ", formatArray)
               })
         } catch(err) {
            alert('Erro ao encontrar spots')
         }
      }
   }, [region])


   return (
      <div className="wrapper">
         <div className="card">
            <div className="selectHeader">
              <Select
                  label="Parking"
                  className="select"
                  onChange={selectedOption => setParking(selectedOption)}
                  options={parkings}
                  isSearchable
                  placeholder="Select parking"
               />
               <div className="options">
                  <button className="buttonAdd"><MdAdd size={24} color="#FFF"/></button>   
                  <button className="buttonEdit"><MdEdit size={24} color="#FFF"/></button>   
               </div> 
            </div>
            
            {parking !== null && (
               <div className="info">
                  <img className="info-image" src={parking.image} />
                  <p className="info-label">Name:<p className="info-text">{parking.name}</p></p>
                  <p className="info-label">Max. parking duration:<p className="info-text">8h</p></p>
                  <p className="info-label">Vehicles allowed:<p className="info-text">car, bike</p></p>
                  <p className="info-label">Total spots:<p className="info-text">300</p></p>
                  <p className="info-label">Coordinates:<p className="info-text">{parking.coordinates[0]}, {parking.coordinates[1]}</p></p>
                  <p className="info-label">Address:<p className="info-text">5300-252, Bragança, Portugal</p></p>
                  <p className="info-label">Description:<p className="info-text">University parking located in the center of Bragança.</p></p>
               </div>
            )}
         </div>
         <div className="card" style={parking === null ? {display: 'none'}: null}>
            <div className="selectHeader">
               <Select
                  className="select"
                  onChange={selectedOption => setRegion(selectedOption)}
                  options={regions}
                  isSearchable
                  value={region}
                  placeholder="Select region"
               />
               <div className="options">
                  <button className="buttonAdd"><MdAdd size={24} color="#FFF"/></button>   
                  <button className="buttonEdit"><MdEdit size={24} color="#FFF"/></button>   
               </div>
            </div>
               {region !== null && (
                  <div className="info">
                     <p className="info-label">Name:<p className="info-text">{region.name}</p></p>
                  </div>
               )}
         </div>         
         <div className="card" style={region === null ? {display: 'none'}: null}>
            <div className="selectHeader">
               <Select
                  className="select"
                  onChange={selectedOption => setSpot(selectedOption)}
                  options={spots}
                  value={spot}
                  isSearchable
                  placeholder="Select spot"
               />
               <div className="options">
                  <button className="buttonAdd"><MdAdd size={24} color="#FFF"/></button>   
                  <button className="buttonEdit"><MdEdit size={24} color="#FFF"/></button>   
               </div>
            </div>
               {spot !== null && (
                  <div className="info">
                     <p className="info-label">ID:<p className="info-text">{spot.id}</p></p>
                     <p className="info-label">Coordinates:<p className="info-text">{spot.coordinates[0]}, {spot.coordinates[1]}</p></p>
                  </div>
               )}
         </div>         
      </div>
      
   );
};