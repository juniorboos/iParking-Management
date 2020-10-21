import React, {useState, useEffect} from 'react';
// import {MdAdd, MdEdit} from 'react-icons/md';
import Modal from 'react-modal'
import Select from 'react-select';
import api from '../../services/api'
import './styles.css';

export default function SpotModal({show, onRequestClose, options}) {

   const [id, setId] = useState('')
   const [latitude, setLatitude] = useState(0)
   const [longitude, setLongitude] = useState(0)
   const [type, setType] = useState('')

   useEffect(() => {
      const spot = options.spot

      if(spot !== null) {
         setId(spot.id)
         setLatitude(spot.coordinates[0])
         setLongitude(spot.coordinates[1])
         setType(spot.type)
      }
   }, [show, options]);

   const close = onRequestClose

   async function addSpot(e) {
      e.preventDefault()
      console.log("Adicionando")

      const coordinates = [latitude, longitude]

      const data = {
         id,
         coordinates,
         type,
      }

      console.log(data)

      switch (options.action) {
         case 'add':
            try {
               await api.post(`parkings/${options.parking}/${options.region}`, data)
               alert('Spot registered successfully!')
               close()
            } catch (err) {
               alert('Error registering spot, try again.')
            }
            break;
      
         case 'edit':
            try {
               await api.put(`parkings/${options.parking}/${options.region}`, {...data, id: id})
               alert('Spot updated successfully!')
               close()
            } catch (err) {
               alert('Error updating spot, try again.')
            }
            break;

         default:
            break;
      }
   }

   async function deleteSpot () {
      const res = window.confirm("Are you sure you want to delete?\nThis action will be irreversible.")
      if(res){
         try {
            await api.delete(`parkings/${options.parking}/${options.region}/${id}`)
            alert('Spot removed successfully!')
            close()
         } catch (err) {
            alert('Error removing spot, try again.')
         }
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

   const vehicleOptions = [
      {value: 'bicycle', label: 'Bicycle'},
      {value: 'car', label: 'Car'},
      {value: 'motorcycle', label: 'Motorcycle'}
   ]
   
   return (
      <Modal
         ariaHideApp={false}
         className="formModal spot"
         overlayClassName="overlay"
         isOpen={show}
         closeTimeoutMS={150}
         contentLabel="modalB"
         shouldCloseOnOverlayClick={true}
         onRequestClose={onRequestClose}
      >
         <form className="form" onSubmit={addSpot}>
            <div className="formDiv">
               <div className="inputDiv">
                  <label className="inputLabel" >Spot type</label>
                  <Select
                     styles={customStyles}
                     label="spotType"
                     onChange={selectedOption => setType(selectedOption.label)}
                     options={vehicleOptions}
                     placeholder="Select type"
                     className="basic-multi-select"
                     classNamePrefix="select"
                  />
                  <br/>
               </div>
               <div className="inputDiv">
                  <label className="inputLabel" >ID</label>
                  <input required className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action === 'edit' ? options.spot.id : null} name="name" onChange={e => setId(e.target.value)}/>
               </div>
               <div className="inputDiv">
                  <label className="inputLabel" >Coordinates</label>
                  <div>
                     <input required className="input" style={{width: 150, textAlign: 'center', marginRight: 6}} defaultValue={options.action === 'edit' ? options.spot.coordinates[0] : null} type="text" name="name" onChange={e => setLatitude(e.target.value)} placeholder="Latitude"/>
                     <input required className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action === 'edit' ? options.spot.coordinates[1] : null} type="text" name="name" onChange={e => setLongitude(e.target.value)} placeholder="Longitude"/>
                  </div>
               </div>                  
            </div> 
            <div className="modalFooter">
               {options.action === 'add' ?
                  <button type="submit" className="footerButton add">Submit</button>
               :  
               <>
                  <button type="button" onClick={() => deleteSpot()} className="footerButton delete half">Delete</button>
                  <button type="submit" className="footerButton edit half">Save</button>
               </>}
               
            </div>
            
         </form>
      </Modal>
   )
}