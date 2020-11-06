import React, { useState, useEffect } from 'react';
import {IoMdRefresh} from 'react-icons/io';
// import {Link, useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton';
import Select from 'react-select';
import ReactLoading from 'react-loading';
import reservationsImage from '../../assets/reservations.svg'
import spotsImage from '../../assets/spots.svg'
import moneyImage from '../../assets/money.svg'
import timeImage from '../../assets/time.svg'
import weatherImage from '../../assets/weather.svg'
import firebase from '../../services/firebase'

import './styles.css';

export default function Dashboard() {
   const parkingsRef = firebase.firestore().collection('Parkings');
   const [parkings, setParkings] = useState([])
   const [parking, setParking] = useState(null)
   const [reservationsCount, setReservationsCount] = useState(0)
   const [weather, setWeather] = useState({temp: '', desc: ''})
   const [availableSpots, setAvailableSpots] = useState('?')
   const [averageTime, setAverageTime] = useState('')
   const [loading, setLoading] = useState(false)
   const [loadingSpots, setLoadingSpots] = useState(false)
   const [loadingTime, setLoadingTime] = useState(false)
   const userId = useSelector(state => state.user.id)

   const loadParkings = () => {
      parkingsRef.get()
         .then((snapshot) => {
            let parkingsList = []
            snapshot.forEach(doc => {
               parkingsList.push({id: doc.id, ...doc.data(), value: doc.id, label: doc.data().name})
            })
            setParkings(parkingsList)
         })
   }

   useEffect(() => {
      loadParkings()
   },[])

   function calculateTime (reservationsTime, reservationsFinished) { 
      const average = reservationsTime / reservationsFinished
      const hours = Math.floor(average / 60);  
      const minutes = average % 60;
      setAverageTime(hours + 'h ' + minutes.toString().slice(0,2) + 'min')
   }

   useEffect(() => {
      if (parking !== null) {
         const currentDate = new Date()
         const docDate = currentDate.getFullYear().toString() + '-' + (currentDate.getMonth() + 1).toString() + '-' + currentDate.getDate().toString()

         parkingsRef.doc(parking.id).collection('Logs').doc(docDate).get()
            .then((doc) => {
               if(!doc.exists) {
                  setReservationsCount(0)
                  setAverageTime('Unavailable')
               } else {
                     setReservationsCount(doc.data().reservationsCount)
                     calculateTime(doc.data().reservationsTime, doc.data().reservationsFinished)
                  }
               }
            )
         
         fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${parking.coordinates[0]}&lon=${parking.coordinates[1]}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
               setWeather({temp: data.main.temp, desc: data.weather[0].main})
            })
      }

   }, [parking])


   async function checkSpots () {
      setLoadingSpots(true)
      const { data } = await firebase.functions().httpsCallable('searchSpots')({
         parking: parking.id
      })

      const userRef = firebase.database().ref('Users/' + userId).child('SearchSpots')
      var spotsCounter = 0
      userRef.on('child_added', snapshot => {
         if(snapshot.val() != null) {
            console.log("Spot found")
            spotsCounter ++
            console.log(snapshot.val())
         }
      })

      setTimeout(() => {
         console.log("Parou de escutar")
         setLoadingSpots(false)
         setAvailableSpots(spotsCounter)
         userRef.off()
         userRef.remove()
      }, 7000)
   }

   async function checkAverageTime () {
      setLoadingTime(true)
      const currentDate = new Date()
      const docDate = currentDate.getFullYear().toString() + '-' + (currentDate.getMonth() + 1).toString() + '-' + currentDate.getDate().toString()
      const log = await parkingsRef.doc(parking.id).collection('Logs').doc(docDate).get()
      console.log(log.data())
      if (typeof log.data() !== 'undefined') {
         setReservationsCount(log.data().reservationsCount)
         calculateTime(log.data().reservationsTime, log.data().reservationsFinished)
      } else {
         setAverageTime('Unavailable')
         alert('Data not available.')
      }
      setLoadingTime(false)
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
      <div className="dashboard-wrapper">
         <Select
            styles={customStyles}
            label="Parking"
            className="select"
            onChange={selectedOption => setParking(selectedOption)}
            options={parkings}
            isSearchable
            placeholder="Select parking"
         />
         <div className="cards-wrapper">
            <div className="upper-cards">
               <div className="dashboard-card">
                  <img className="image" src={reservationsImage} alt=""/>
                  <div className="label">
                     {parking ? 
                        <h1>{reservationsCount}</h1>
                     :  <h1><Skeleton width={100}/></h1> 
                     }
                     <h3>reservations</h3>
                  </div>
               </div>
               <div className="dashboard-card">
                  <img className="image" src={spotsImage} alt=""/>
                  <div className="label">
                     {parking ? 
                        !loadingSpots ?
                           <h1>{availableSpots} / {parking.totalSpots}</h1>
                        : 
                           <h1><ReactLoading type="spinningBubbles" color="#ad00ff" /></h1>
                     :  <h1><Skeleton width={250}/></h1> 
                     }
                     <h3>spots available</h3>
                  </div>
                  <button type="button" className="checkSpots" onClick={checkSpots}>
                     <IoMdRefresh size={24} color="#6200ff"/>
                  </button>
               </div>
            </div>
            <div className="lower-cards">
               <div className="dashboard-card">
                  <img className="image" src={moneyImage} alt=""/>
                  <div className="label">
                     {parking ? 
                        <h1>€ 2376,75</h1>
                     :  <h1><Skeleton width={150}/></h1> 
                     }
                     <h3>gained today</h3>
                  </div>
               </div>
               <div className="dashboard-card">
                  <img className="image" src={weatherImage} alt=""/>
                  <div className="label">
                     {parking ? 
                        <>
                           <h1>{weather.temp} °C</h1>
                           <h3>{weather.desc}</h3>
                        </>
                     :  
                        <>
                           <h1><Skeleton width={120} /></h1>
                           <h3><Skeleton width={120} /></h3>
                        </>
                     }
                  </div>
               </div>
               <div className="dashboard-card">
                  <img className="image" src={timeImage} alt=""/>
                  <div className="label">
                     {parking ?
                        !loadingTime ? 
                           <h1>{averageTime}</h1>
                        : 
                           <h1><ReactLoading type="spinningBubbles" color="#ad00ff" /></h1>
                     :  <h1><Skeleton width={160}/></h1> 
                     }
                     <h3>average parking time</h3>
                  </div>
                  <button type="button" className="checkSpots" onClick={checkAverageTime}>
                     <IoMdRefresh size={24} color="#6200ff"/>
                  </button>
               </div>
            </div>
            
         </div>
      </div>
   );
};