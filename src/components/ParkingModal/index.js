import React, {useState, useEffect} from 'react';
// import {MdAdd, MdEdit} from 'react-icons/md';
import Modal from 'react-modal'
import api from '../../services/api'
import Select from 'react-select';
import './styles.css';

export default function ParkingModal({show, onRequestClose, options}) {

   const [id, setId] = useState('')
   const [name, setName] = useState('')
   const [maxDuration, setMaxDuration] = useState('')
   const [vehiclesSelected, setVehiclesSelected] = useState([])
   const [totalSpots, setTotalSpots] = useState('')
   const [latitude, setLatitude] = useState(0)
   const [longitude, setLongitude] = useState(0)
   const [address, setAddress] = useState('')
   const [description, setDescription] = useState('')
   const [image, setImage] = useState('')

   const vehicleOptions = [
      {value: 'bicycle', label: 'Bicycle'},
      {value: 'car', label: 'Car'},
      {value: 'motorcycle', label: 'Motorcycle'}
   ]

   useEffect(() => {
      const parking = options.parking

      if(parking !== null) {
         setId(parking.id)
         setName(parking.name)
         setMaxDuration(parking.maxDuration)
         setTotalSpots(parking.totalSpots)
         setLatitude(parking.coordinates[0])
         setLongitude(parking.coordinates[1])
         setAddress(parking.address)
         setDescription(parking.description)
         setImage(parking.image)

         const vehicles = []
         parking.vehiclesAllowed.map((vehicleLabel) => {
            return vehicles.push(vehicleOptions.find(({label}) => label === vehicleLabel))
         })

         setVehiclesSelected(vehicles)
      }
   }, [options]);

   const close = onRequestClose

   async function addParking(e) {
      e.preventDefault()
      console.log("Adicionando")

      const coordinates = [latitude, longitude]

      var vehiclesAllowed = []
      vehiclesSelected.map((item) => {
         return vehiclesAllowed.push(item.label)
      })

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

      switch (options.action) {
         case 'add':
            try {
               await api.post('parkings', data)
               alert('Parking registered successfully!')
            } catch (err) {
               alert('Error registering parking, try again.')
            }
            break;
      
         case 'edit':
            try {
               await api.put('parkings', {...data, id: id})
               alert('Parking updated successfully!')
            } catch (err) {
               alert('Error updating parking, try again.')
            }
            break;

         default:
            break;
      }
      
      close()
   }

   async function deleteParking () {

      try {
         await api.delete(`parkings/${id}`)
         alert('Parking removed successfully!')
         close()
      } catch (err) {
         alert('Error removing parking, try again.')
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
         <form className="form" onSubmit={addParking}>
            <div className="formDiv">
               <div className="inputDiv">
                  <label className="inputLabel" >Name</label>
                  <input required className="input" defaultValue={options.action === 'edit' ? options.parking.name : null} type="text" name="name" onChange={e => setName(e.target.value)} />
               </div>
               <div className="inputDiv">
                  <label className="inputLabel">Description</label>
                  <textarea required rows={2} className="input" defaultValue={options.action === 'edit' ? options.parking.description : null} style={{height: '96px', resize: 'vertical'}} type="text" name="name" onChange={e => setDescription(e.target.value)} placeholder=""/>
               </div>
               <div className="smallInputDiv">
                  <div className="inputDiv">
                     <label className="inputLabel" >Max. parking duration (hours)</label>
                     <input required className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action === 'edit' ? options.parking.maxDuration : 0} type="number" min={0} max={24} name="name" onChange={e => setMaxDuration(e.target.value)}/>
                  </div>
                  <div className="inputDiv">
                     <label className="inputLabel" >Total spots</label>
                     <input required className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action === 'edit' ? options.parking.totalSpots : 0} type="number" min={0} name="name" onChange={e => setTotalSpots(e.target.value)}/>
                  </div>
               </div>
               <div className="inputDiv">
                  <label className="inputLabel" >Vehicles allowed</label>
                  <Select
                     onChange={(selectedOption) => setVehiclesSelected(selectedOption)}
                     value={vehiclesSelected}
                     styles={customStyles}
                     isMulti
                     name="vehicles"
                     options={vehicleOptions}
                     placeholder="Select vehicles"
                     className="basic-multi-select"
                     classNamePrefix="select"
                  />
                  <br/>
               </div>
               <div className="inputDiv">
                  <label className="inputLabel" >Coordinates</label>
                  <div>
                     <input required className="input" style={{width: 150, textAlign: 'center', marginRight: 6}} defaultValue={options.action === 'edit' ? options.parking.coordinates[0] : null} type="text" name="name" onChange={e => setLatitude(e.target.value)} placeholder="Latitude"/>
                     <input required className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action === 'edit' ? options.parking.coordinates[1] : null} type="text" name="name" onChange={e => setLongitude(e.target.value)} placeholder="Longitude"/>
                  </div>
               </div>
               <div className="inputDiv">
                  <label className="inputLabel">Address</label>
                  <input required className="input" defaultValue={options.action === 'edit' ? options.parking.address : null} type="text" name="name" onChange={e => setAddress(e.target.value)} placeholder="Rua João Carvalho, nº 537, Bragança, Portugal, 5300-000"/>
               </div>
               <div className="inputDiv">
                  <label className="inputLabel">Image URL</label>
                  <input required className="input" defaultValue={options.action === 'edit' ? options.parking.image : null} type="text" name="name" onChange={e => setImage(e.target.value)} placeholder="URL"/>
               </div>
               
            </div> 
            <div className="modalFooter">
               {options.action === 'add' ?
                  <button type="submit" className="footerButton add">Submit</button>
               :  
               <>
                  <button type="button" onClick={() => deleteParking()} className="footerButton delete half">Delete</button>
                  <button type="submit" className="footerButton edit half">Save</button>
               </>}
               
            </div>
            
         </form>
      </Modal>
   )
}