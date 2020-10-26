import React, {useState, useEffect} from 'react';
import {MdAdd, MdEdit} from 'react-icons/md';
import api from '../../services/api'
import ParkingModal from '../../components/ParkingModal'
import RegionModal from '../../components/RegionModal'
import Select from 'react-select';
import './styles.css';
import SpotModal from '../../components/SpotModal';
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
export default function Dashboard() {
   const [parkings, setParkings] = useState([])
   const [regions, setRegions] = useState([])
   const [spots, setSpots] = useState([])

   const [parking, setParking] = useState(null)
   const [region, setRegion] = useState(null)
   const [spot, setSpot] = useState(null)

   const [modalParking, setModalParking] = useState(false)
   const [modalRegion, setModalRegion] = useState(false)
   const [modalSpot, setModalSpot] = useState(false)
   const [modalOptions, setModalOptions] = useState({action: '', parking: null, region: null, spot: null})
   
   const history = useHistory()
   const dispatch = useDispatch()

   const logout = () => {
      alert('Authenticate again!')
      dispatch({type: 'LOGOUT'})
      history.push('/')
   }

   const loadParkings = () => {
      api.get('parkings')
         .then(response => {
            const formatArray = response.data.map(function(item) {
               return {...item, value: item.id, label: item.name}
            })
            setParkings(formatArray)
         })
         .catch(err => {
            if (err.response.status === 401) {
               logout()
            }
         })
   }

   useEffect(() => {
      loadParkings()
   },[modalParking])

   useEffect(() => {
      if (parking !== null) {
         setRegion(null)
         try {
            api.get(`parkings/${parking.id}`)
               .then(response => {
                  console.log(response.status)
                  const formatArray = response.data.map(function(item) {
                     return {...item, value: item.id, label: item.name}
                  })
                  setRegions(formatArray)
                  console.log("Regions: ", formatArray)
               })
               .catch(err => {
                  if (err.response.status === 401) {
                     logout()
                  }
               })
         } catch(err) {
            alert('Erro ao encontrar regiões')
         }
      }
   }, [parking, modalRegion]);

   useEffect(() => {
      if(region !== null) {
         setSpot(null)
         console.log("Region: ", region)
         try {
            api.get(`parkings/${parking.id}/${region.id}`)
               .then(response => {
                  console.log(response.status)
                  const formatArray = response.data.map(function(item) {
                     return {...item, value: item.id, label: item.id}
                  })
                  setSpots(formatArray)
                  console.log("Spots: ", formatArray)
               })
               .catch(err => {
                  if (err.response.status === 401) {
                     logout()
                  }
               })
         } catch(err) {
            alert('Erro ao encontrar spots')
         }
      }
   }, [region, parking, modalSpot])

   

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

   function callModal(action, type, object = null) {
      if (  (action === "edit" && type === "parking" && parking === null) ||
            (action === "edit" && type === "region" && region === null) ||
            (action === "edit" && type === "spot" && spot === null)) {
         alert("Select a "+ type + "!")
      } else {
         switch (type) {
            case 'parking':
               console.log("Abrindo parking")
               setModalParking(true)
               setModalOptions({
                  action: action,
                  parking: object
               })
               break;
         
            case 'region':
               console.log("Abrindo region")
               setModalRegion(true)
               setModalOptions({
                  action: action,
                  parking: parking.id,
                  region: object
               })
               break

            case 'spot':
               console.log("Abrindo spot")
               setModalSpot(true)
               setModalOptions({
                  action: action,
                  parking: parking.id,
                  region: region.id,
                  spot: object
               })
               break

            default:
               break;
         }
      }
      
   }


   return (
      <div className="wrapper">
         <div className="card">
            <div className="selectHeader">
              <Select
                  styles={customStyles}
                  label="Parking"
                  className="select"
                  onChange={selectedOption => setParking(selectedOption)}
                  options={parkings}
                  isSearchable
                  placeholder="Select parking"
               />
               <div className="options">
                  <button className="button add" onClick={() => callModal('add', 'parking')}><MdAdd size={24} color="#FFF"/></button>   
                  <button className="button edit" onClick={() => callModal('edit', 'parking', parking)}><MdEdit size={24} color="#FFF"/></button>   
               </div> 
            </div>
            
            {parking !== null && (
               <div className="info">
                  <img className="info-image" alt='' src={parking.image} />
                  <label className="info-label">Name:<p className="info-text">{parking.name}</p></label>
                  <label className="info-label">Max. parking duration:<p className="info-text">{parking.maxDuration}h</p></label>
                  <label className="info-label">Vehicles allowed:
                     {parking.vehiclesAllowed.map((vehicle, index) => (
                        <p key={index} className="info-text">{vehicle}{index + 1 !== parking.vehiclesAllowed.length && ','}</p>
                     ))}
                  </label>
                  <label className="info-label">Total spots:<p className="info-text">{parking.totalSpots}</p></label>
                  <label className="info-label">Coordinates:<p className="info-text">{parking.coordinates[0]}, {parking.coordinates[1]}</p></label>
                  <label className="info-label">Address:<p className="info-text">{parking.address}</p></label>
                  <label className="info-label">Description:<p className="info-text">{parking.description}</p></label>
               </div>
            )}
         </div>
         <div className="card" style={parking === null ? {display: 'none'}: null}>
            <div className="selectHeader">
               <Select
                  styles={customStyles}
                  className="select"
                  onChange={selectedOption => setRegion(selectedOption)}
                  options={regions}
                  isSearchable
                  value={region}
                  placeholder="Select region"
               />
               <div className="options">
                  <button className="button add" onClick={() => callModal('add', 'region')}><MdAdd size={24} color="#FFF"/></button>   
                  <button className="button edit" onClick={() => callModal('edit', 'region', region)}><MdEdit size={24} color="#FFF"/></button>   
               </div>
            </div>
               {region !== null && (
                  <div className="info">
                     <label className="info-label">Name:<p className="info-text">{region.name}</p></label>
                     <label className="info-label">Coordinates:<p className="info-text">{region.coordinates[0]}, {region.coordinates[1]}</p></label>
                     <label className="info-label">Description:<p className="info-text">{region.description}</p></label>
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
                  <button className="button add" onClick={() => callModal('add', 'spot')}><MdAdd size={24} color="#FFF"/></button>   
                  <button className="button edit" onClick={() => callModal('edit', 'spot', spot)}><MdEdit size={24} color="#FFF"/></button>   
               </div>
            </div>
               {spot !== null && (
                  <div className="info">
                     <label className="info-label">ID:<p className="info-text">{spot.id}</p></label>
                     <label className="info-label">Type:<p className="info-text">{spot.type}</p></label>
                     <label className="info-label">Coordinates:<p className="info-text">{spot.coordinates[0]}, {spot.coordinates[1]}</p></label>
                  </div>
               )}
         </div>
         {modalParking ? 
            <ParkingModal 
               show={modalParking}
               onRequestClose={() => setModalParking(false)}
               options={modalOptions}/> 
         : modalRegion ?
            <RegionModal 
               show={modalRegion}
               onRequestClose={() => setModalRegion(false)}
               options={modalOptions}/>  
         : modalSpot ?
            <SpotModal
               show={modalSpot}
               onRequestClose={() => setModalSpot(false)}
               options={modalOptions}/>
         : null}
                 
                
      </div>
      
   );
};