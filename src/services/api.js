import axios from 'axios';
import { getAccessToken, setAccessToken } from './accessToken';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

async function refreshAccessToken() {
    await api.post("refresh_token", {}, { withCredentials: true })
        .then(response => {
            if (response.data.ok) {
                console.log("Refreshed: ")
                console.log(response.data)
                setAccessToken(response.data.accessToken)
                return response.data.accessToken

            }
        })
}


api.interceptors.request.use(function (config) {
    const accessToken = getAccessToken()

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
});


api.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return api(originalRequest);
    }
    return Promise.reject(error);
});

export default api;