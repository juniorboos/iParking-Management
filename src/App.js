import React, { useState } from 'react';
import { useEffect } from 'react';
import './global.css';
import Routes from './routes'
import { setAccessToken } from './services/accessToken';
import api from './services/api';

function App() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    api.post("refresh_token", {}, { withCredentials: true })
      .then( response => {
        setAccessToken(response.data.accessToken)
        setLoading(false)
      })
  }, [])

  if(loading) {
    return <div>loading...</div>
  }
  return (
    <Routes/>
  );
}

export default App;
