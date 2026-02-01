import axios from 'axios';

const BASE_URL = "https://vaibhavi-badadale-5.onrender.com/api";

const API = axios.create({
    baseURL: BASE_URL,
});

export const fetchUsersApi = (search = "") => API.get(`/users?search=${search}`);
export const getUserByIdApi = (id) => API.get(`/user/${id}`);
export const addUserApi = (userData) => API.post('/add', userData);
export const editUserApi = (id, userData) => API.put(`/edit/${id}`, userData);
export const deleteUserApi = (id) => API.delete(`/delete/${id}`);
export const EXPORT_URL = `${BASE_URL}/exportcsv`;

export default API;