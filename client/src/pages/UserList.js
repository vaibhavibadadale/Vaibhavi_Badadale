import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { EXPORT_URL } from '../services/api'; // Using centralized URL

const BASE_URL = "https://vaibhavi-badadale-5.onrender.com"; 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/users?search=${search}&page=${page}`);
            setUsers(res.data.users);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [search, page]);

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await axios.delete(`${BASE_URL}/api/delete/${id}`);
            fetchUsers();
        }
    };

    return (
        <div className="container mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <input type="text" className="form-control w-25 shadow-sm" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                <div>
                    <Link to="/register" className="btn btn-danger me-2">+ Add User</Link>
                    {/* Updated to use EXPORT_URL */}
                    <a href={EXPORT_URL} className="btn btn-primary">Export CSV</a>
                </div>
            </div>
            <div className="table-responsive shadow rounded">
                <table className="table table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th><th>FullName</th><th>Email</th><th>Gender</th><th>Status</th><th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.length > 0 ? users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{(page - 1) * 5 + index + 1}</td>
                                <td className="fw-semibold">{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.gender === 'Male' ? 'M' : 'F'}</td>
                                <td><span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{user.status}</span></td>
                                <td className="text-center">
                                    <Link to={`/user/${user._id}`} className="btn btn-sm btn-info text-white me-1">View</Link>
                                    <Link to={`/edit/${user._id}`} className="btn btn-sm btn-warning text-white me-1">Edit</Link>
                                    <button onClick={() => deleteUser(user._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="6" className="text-center">No users found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;