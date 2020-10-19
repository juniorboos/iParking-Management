import React, {useState, useEffect} from 'react';
import {MdAdd, MdEdit} from 'react-icons/md';
import Modal from 'react-modal'
import api from '../../services/api'
import Select from 'react-select';
import './styles.css';

export default function FormModal({show, onRequestClose, options = null}) {

   const [name, setName] = useState('')
   const [maxDuration, setMaxDuration] = useState('')
   const [vehiclesAllowed, setVehiclesAllowed] = useState([])
   const [totalSpots, setTotalSpots] = useState('')
   const [latitude, setLatitude] = useState('')
   const [longitude, setLongitude] = useState('')
   const [address, setAddress] = useState('')
   const [description, setDescription] = useState('')
   const [image, setImage] = useState('')

   const close = onRequestClose

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
         alert('Parking registered successfully!')
      } catch (err) {
         alert('Error registering parking, try again.')
      }
      close()
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

   const vehicleOptions = [
      {value: 'bicycle', label: 'Bicycle'},
      {value: 'car', label: 'Car'},
      {value: 'motorcycle', label: 'Motorcycle'}
   ]

   
   return (
      <Modal
         ariaHideApp={false}
         className="formModal"
         overlayClassName="overlay"
         isOpen={show}
         closeTimeoutMS={150}
         contentLabel="modalB"
         shouldCloseOnOverlayClick={true}
         onRequestClose={onRequestClose}
      >
         {options.type == 'parking' ?
            <form className="form" onSubmit={addParking}>
               <div className="formDiv">
                  <div className="inputDiv">
                     <label className="inputLabel" >Name</label>
                     <input className="input" defaultValue={options.action == 'edit' ? options.object.name : null} type="text" name="name" onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel">Description</label>
                     <textarea rows={2} className="input" defaultValue={options.action == 'edit' ? options.object.description : null} style={{height: '96px', resize: 'vertical'}} type="text" name="name" onChange={e => setDescription(e.target.value)} placeholder=""/>
                  </div>
                  <div className="smallInputDiv">
                     <div className="inputDiv">
                        <label className="inputLabel" >Max. parking duration (hours)</label>
                        <input className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action == 'edit' ? options.object.maxDuration : null} type="number" min={0} max={24} name="name" defaultValue={0} onChange={e => setMaxDuration(e.target.value)}/>
                     </div>
                     <div className="inputDiv">
                        <label className="inputLabel" >Total spots</label>
                        <input className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action == 'edit' ? options.object.totalSpots : null} type="number" min={0} name="name" defaultValue={0} onChange={e => setTotalSpots(e.target.value)}/>
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
                        <input className="input" style={{width: 150, textAlign: 'center', marginRight: 6}} defaultValue={options.action == 'edit' ? options.object.coordinates[0] : null} type="text" name="name" onChange={e => setLatitude(e.target.value)} placeholder="Latitude"/>
                        <input className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action == 'edit' ? options.object.coordinates[1] : null} type="text" name="name" onChange={e => setLongitude(e.target.value)} placeholder="Longitude"/>
                     </div>
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel">Address</label>
                     <input className="input" defaultValue={options.action == 'edit' ? options.object.address : null} type="text" name="name" onChange={e => setAddress(e.target.value)} placeholder="Rua João Carvalho, nº 537, Bragança, Portugal, 5300-000"/>
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel">Image URL</label>
                     <input className="input" defaultValue={options.action == 'edit' ? options.object.image : null} type="text" name="name" onChange={e => setImage(e.target.value)} placeholder="URL"/>
                  </div>
               </div>   
               <div className="modalFooter">
                  {options.action == 'add' ?
                     <button type="submit" className="footerButton add">Submit</button>
                  :  
                  <>
                     <button type="submit" className="footerButton delete half">Delete</button>
                     <button type="submit" className="footerButton edit half">Save</button>
                  </>}
                  
               </div>
            </form>
            : options.type == 'region' ?
               null
            :  
               null}
      </Modal>
   )
}