import axios from 'axios';

// Create a base instance to avoid repeating the URL
const API = axios.create({
    baseURL: 'https://vaibhavi-badadale-5.onrender.com/api',
});

// Use "export const" for multiple functions in one file
export const fetchUsers = () => API.get('/users');

export const createUser = (userData) => API.post('/users', userData, {
    headers: { 'Content-Type': 'multipart/form-data' } // Required for profile images
});

export default API;