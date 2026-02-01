import axios from 'axios';

const BASE_URL = "https://vaibhavi-badadale-5.onrender.com/api";
// const BASE_URL = "http://localhost:5000/api";

const API = axios.create({ 
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

/**
 * FETCH USERS
 * Handles both searching and pagination.
 * @param {string} search - The search term (name or email)
 * @param {number} page - The current page number
 */
export const fetchUsersApi = (search = "", page = 1) => {
    return API.get(`/users?search=${search}&page=${page}&limit=5`);
};

export const getUserByIdApi = (id) => API.get(`/user/${id}`);

export const addUserApi = (userData) => API.post('/add', userData);

export const editUserApi = (id, userData) => API.put(`/edit/${id}`, userData);

export const deleteUserApi = (id) => API.delete(`/delete/${id}`);

export const EXPORT_URL = `${BASE_URL}/exportcsv`;

export default API;