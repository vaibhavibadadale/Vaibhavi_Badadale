import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsersApi, EXPORT_URL, deleteUserApi } from '../services/api';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await fetchUsersApi(search);
            setUsers(res.data.users);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUserApi(id);
            fetchUsers();
        }
    };

    const handleExport = () => {
        window.open(EXPORT_URL, '_blank');
    };

    useEffect(() => { fetchUsers(); }, [search]);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className="form-control w-25" />
                <div>
                    <Link to="/register" className="btn btn-danger me-2">+ Add User</Link>
                    <button onClick={handleExport} className="btn btn-primary">Export To Csv</button>
                </div>
            </div>
            <table className="table border shadow">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th><th>FullName</th><th>Email</th><th>Gender</th><th>Status</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, i) => (
                        <tr key={user._id}>
                            <td>{i + 1}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.gender === 'Male' ? 'M' : 'F'}</td>
                            <td>{user.status}</td>
                            <td>
                                <Link className="btn btn-sm btn-info me-2" to={`/user/${user._id}`}>View</Link>
                                <Link className="btn btn-sm btn-warning me-2" to={`/edit/${user._id}`}>Edit</Link>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;