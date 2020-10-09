import React, {useState} from 'react';
// import {FiLogIn} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'

import './styles.css';

export default function Dashboard() {
   const [parkings, setParkings] = useState([])
   const [regions, setRegions] = useState([])

   useEffect(() => {
      api.get('parkings')
         .then(response => {
            setParkings(response.data)
         })
   }, [])

   async function searchRegions(parking) {
      try {
         await api.get(`parkings/${parking}`)
            .then(response => {
               setRegions(response.data)
            })
      } catch(err) {
         alert('Erro ao encontrar regiões')
      }
   }

   async function searchSpots(parking, region) {
      try {
         await api.get(`parkings/${parking}/${region}`)
            .then(response => {
               setSpots(response.data)
            })
      } catch(err) {
         alert('Erro ao encontrar spots')
      }
   }

   

   return (
      <div>
         Management
      </div>
   );
};