import axios from 'axios';
import { tokenstore } from './tokenStore.js';


const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = tokenstore.getAccess()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(response => response,
error => {
    if (status === 401) {
        // will loop if refreshToken returns 401
        return refreshToken(store).then(_ => {
            error.config.headers['Authorization'] = 'Bearer ' + store.state.auth.token;
            error.config.baseURL = undefined;
            return Axios.request(error.config);
        })
        // Would be nice to catch an error here, which would work if the interceptor is omitted
        .catch(err => err);
    }

    return Promise.reject(error);
})