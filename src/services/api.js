import axios from 'axios';
import { getAccessToken } from './accessToken';

const api = axios.create({
    baseURL: 'http://localhost:3333',    
})


api.interceptors.request.use(function (config) {
    const accessToken = getAccessToken()
    
    if(accessToken) {
        config.headers.Authorization =  `bearer ${accessToken}`
    }
    
    return config;
});

export default api;