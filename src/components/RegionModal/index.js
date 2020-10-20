import React, {useState, useEffect} from 'react';
// import {MdAdd, MdEdit} from 'react-icons/md';
import Modal from 'react-modal'
import api from '../../services/api'
import './styles.css';

export default function ParkingModal({show, onRequestClose, options}) {

   const [id, setId] = useState('')
   const [name, setName] = useState('')
   const [latitude, setLatitude] = useState(0)
   const [longitude, setLongitude] = useState(0)
   const [description, setDescription] = useState('')

   useEffect(() => {
      const region = options.region

      if(region !== null) {
         setId(region.id)
         setName(region.name)
         setLatitude(region.coordinates[0])
         setLongitude(region.coordinates[1])
         setDescription(region.description)
      }
   }, [show, options]);

   const close = onRequestClose

   async function addRegion(e) {
      e.preventDefault()
      console.log("Adicionando")

      const coordinates = [latitude, longitude]


      const data = {
         name,
         coordinates,
         description,
      }

      console.log(data)

      switch (options.action) {
         case 'add':
            try {
               await api.post(`parkings/${options.parking}`, data)
               alert('Region registered successfully!')
               close()
            } catch (err) {
               alert('Error registering region, try again.')
            }
            break;
      
         case 'edit':
            try {
               await api.put(`parkings/${options.parking}`, {...data, id: id})
               alert('Region updated successfully!')
               close()
            } catch (err) {
               alert('Error updating region, try again.')
            }
            break;

         default:
            break;
      }
   }

   async function deleteRegion () {

      try {
         await api.delete(`parkings/${options.parking}/${id}`)
         alert('Parking removed successfully!')
         close()
      } catch (err) {
         alert('Error removing parking, try again.')
      }
   }
   
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
         <form className="form" onSubmit={addRegion}>
            <div className="formDiv">
               <div className="inputDiv">
                  <label className="inputLabel" >Name</label>
                  <input required className="input" defaultValue={options.action === 'edit' ? options.region.name : null} type="text" name="name" onChange={e => setName(e.target.value)} />
               </div>
               <div className="inputDiv">
                  <label className="inputLabel">Description</label>
                  <textarea required rows={2} className="input" defaultValue={options.action === 'edit' ? options.region.description : null} style={{height: '96px', resize: 'vertical'}} type="text" name="name" onChange={e => setDescription(e.target.value)} placeholder=""/>
               </div>
               <div className="inputDiv">
                  <label className="inputLabel" >Coordinates</label>
                  <div>
                     <input required className="input" style={{width: 150, textAlign: 'center', marginRight: 6}} defaultValue={options.action === 'edit' ? options.region.coordinates[0] : null} type="text" name="name" onChange={e => setLatitude(e.target.value)} placeholder="Latitude"/>
                     <input required className="input" style={{width: 150, textAlign: 'center'}} defaultValue={options.action === 'edit' ? options.region.coordinates[1] : null} type="text" name="name" onChange={e => setLongitude(e.target.value)} placeholder="Longitude"/>
                  </div>
               </div>                  
            </div> 
            <div className="modalFooter">
               {options.action === 'add' ?
                  <button type="submit" className="footerButton add">Submit</button>
               :  
               <>
                  <button type="button" onClick={() => deleteRegion()} className="footerButton delete half">Delete</button>
                  <button type="submit" className="footerButton edit half">Save</button>
               </>}
               
            </div>
            
         </form>
      </Modal>
   )
}