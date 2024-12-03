import axios from 'axios';
import { getAuthHeaders } from './auth';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const headers = getAuthHeaders();
        config.headers = { ...config.headers, ...headers };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle token expiration
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 