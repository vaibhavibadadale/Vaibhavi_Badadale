import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// DEPLOYMENT TIP: Replace this with your Render URL after deploying the backend
// Example: const BASE_URL = "https://your-app-name.onrender.com";
const BASE_URL = "http://localhost:5000"; 

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
        const delayDebounceFn = setTimeout(() => {
            fetchUsers();
        }, 300); 
        return () => clearTimeout(delayDebounceFn);
    }, [search, page]);

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await axios.delete(`${BASE_URL}/api/delete/${id}`);
            fetchUsers();
        }
    };

    return (
        <div className="container mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <input 
                    type="text" 
                    className="form-control w-25 shadow-sm" 
                    placeholder="Search users..." 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <div>
                    <Link to="/register" className="btn btn-danger me-2 fw-bold">+ Add User</Link>
                    {/* Updated Export Link to use BASE_URL */}
                    <a href={`${BASE_URL}/api/exportcsv`} className="btn btn-primary fw-bold">Export To Csv</a>
                </div>
            </div>

            <div className="table-responsive shadow rounded">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{(page - 1) * 5 + index + 1}</td>
                                <td className="fw-semibold">{user.firstName} {user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.gender === 'Male' ? 'M' : 'F'}</td>
                                <td>
                                    <span className={`badge rounded-pill ${user.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    <Link to={`/user/${user._id}`} className="btn btn-sm btn-info text-white me-1">View</Link>
                                    <Link to={`/edit/${user._id}`} className="btn btn-sm btn-warning text-white me-1">Edit</Link>
                                    <button onClick={() => deleteUser(user._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-muted">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center mt-4">
                <nav>
                    <ul className="pagination shadow-sm">
                        <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page - 1)}>Prev</button>
                        </li>
                        <li className="page-item disabled">
                            <span className="page-link text-dark">Page {page} of {totalPages}</span>
                        </li>
                        <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default UserList;