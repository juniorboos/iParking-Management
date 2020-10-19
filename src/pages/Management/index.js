import React, {useState, useEffect} from 'react';
import {MdAdd, MdEdit} from 'react-icons/md';
import Modal from 'react-modal'
import api from '../../services/api'
import FormModal from '../../components/FormModal'
import Select from 'react-select';
import './styles.css';

export default function Dashboard() {
   const [parkings, setParkings] = useState([])
   const [regions, setRegions] = useState([])
   const [spots, setSpots] = useState([])

   const [parking, setParking] = useState(null)
   const [region, setRegion] = useState(null)
   const [spot, setSpot] = useState(null)

   const [modalShow, setModalShow] = useState(false)

   const [name, setName] = useState('')
   const [maxDuration, setMaxDuration] = useState('')
   const [vehiclesAllowed, setVehiclesAllowed] = useState([])
   const [totalSpots, setTotalSpots] = useState('')
   const [latitude, setLatitude] = useState('')
   const [longitude, setLongitude] = useState('')
   const [address, setAddress] = useState('')
   const [description, setDescription] = useState('')
   const [image, setImage] = useState('')

   const vehicleOptions = [
      {value: 'bicycle', label: 'Bicycle'},
      {value: 'car', label: 'Car'},
      {value: 'motorcycle', label: 'Motorcycle'}
   ]

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

   useEffect(() => {
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

   async function addParking(e) {
      e.preventDefault()
      console.log("Adicionando")

      const coordinates = [latitude, longitude]

      const data = {
         name,
         maxDuration,
         vehiclesAllowed,
         totalSpots,
         coordinates,
         address,
         description,
         image
      }

      console.log(data)

      try {
         await api.post('parkings', data)
         setModalShow(false)
         loadParkings()
         alert('Parking registered successfully!')
      } catch (err) {
         alert('Error registering parking, try again.')
      }
   }

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
                  <button className="button add" onClick={() => setModalShow(true)}><MdAdd size={24} color="#FFF"/></button>   
                  <button className="button edit" onClick={() => setModalShow(true)}><MdEdit size={24} color="#FFF"/></button>   
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
                  styles={customStyles}
                  className="select"
                  onChange={selectedOption => setRegion(selectedOption)}
                  options={regions}
                  isSearchable
                  value={region}
                  placeholder="Select region"
               />
               <div className="options">
                  <button className="button add" onClick={() => setModalShow(true)}><MdAdd size={24} color="#FFF"/></button>   
                  <button className="button edit" onClick={() => setModalShow(true)}><MdEdit size={24} color="#FFF"/></button>   
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
                  <button className="button add" onClick={() => setModalShow(true)}><MdAdd size={24} color="#FFF"/></button>   
                  <button className="button edit" onClick={() => setModalShow(true)}><MdEdit size={24} color="#FFF"/></button>   
               </div> 
            </div>
               {spot !== null && (
                  <div className="info">
                     <p className="info-label">ID:<p className="info-text">{spot.id}</p></p>
                     <p className="info-label">Coordinates:<p className="info-text">{spot.coordinates[0]}, {spot.coordinates[1]}</p></p>
                  </div>
               )}
         </div>
         <FormModal 
            show={modalShow}
            onRequestClose={() => setModalShow(false)}/>
         {/* <Modal
            className="formModal"
            overlayClassName="overlay"
            isOpen={modalShow}
            closeTimeoutMS={150}
            contentLabel="modalB"
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setModalShow(false)}
            >
            <form className="form" onSubmit={addParking}>
               <div className="formDiv">
                  <div className="inputDiv">
                     <label className="inputLabel" >Name</label>
                     <input className="input" type="text" name="name" onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel">Description</label>
                     <textarea rows={2} className="input" style={{height: '96px', resize: 'vertical'}} type="text" name="name" onChange={e => setDescription(e.target.value)} placeholder=""/>
                  </div>
                  <div className="smallInputDiv">
                     <div className="inputDiv">
                        <label className="inputLabel" >Max. parking duration (hours)</label>
                        <input className="input" style={{width: 150, textAlign: 'center'}} type="number" min={0} max={24} name="name" defaultValue={0} onChange={e => setMaxDuration(e.target.value)}/>
                     </div>
                     <div className="inputDiv">
                        <label className="inputLabel" >Total spots</label>
                        <input className="input" style={{width: 150, textAlign: 'center'}} type="number" min={0} name="name" defaultValue={0} onChange={e => setTotalSpots(e.target.value)}/>
                     </div>
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel" >Vehicles allowed</label>
                     <Select
                        onChange={(selectedOption, newValue) => setVehiclesAllowed([ ... vehiclesAllowed, newValue.option.label])}
                        styles={customStyles}
                        className="input"
                        isMulti
                        name="vehicles"
                        options={vehicleOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                     />
                     <br/>
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel" >Coordinates</label>
                     <div>
                        <input className="input" style={{width: 150, textAlign: 'center', marginRight: 6}} type="text" name="name" onChange={e => setLatitude(e.target.value)} placeholder="Latitude"/>
                        <input className="input" style={{width: 150, textAlign: 'center'}} type="text" name="name" onChange={e => setLongitude(e.target.value)} placeholder="Longitude"/>
                     </div>
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel">Address</label>
                     <input className="input" type="text" name="name" onChange={e => setAddress(e.target.value)} placeholder="Rua João Carvalho, nº 537, Bragança, Portugal, 5300-000"/>
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel">Image URL</label>
                     <input className="input" type="text" name="name" onChange={e => setImage(e.target.value)} placeholder="URL"/>
                  </div>
               </div>
               
               <div className="modalFooter">
                  <button type="submit" className="footerButton add">Submit</button>
               </div>
            </form>
         </Modal> */}
         
      </div>
      
   );
};