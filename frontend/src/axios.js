import axios from 'axios';

const token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
};

if (token) 
  headers.Authorization = `Bearer ${token}`;

const axiosInstance = axios.create({
    headers: headers,
    baseURL: 'http://localhost:8080',
})

export default axiosInstance;