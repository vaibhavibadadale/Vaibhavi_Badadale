import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsersApi, EXPORT_URL, deleteUserApi } from '../services/api';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const loadData = async () => {
        try {
            const res = await fetchUsersApi(search);
            setUsers(res.data.users);
        } catch (err) { console.log(err); }
    };

    useEffect(() => { loadData(); }, [search]);

    const handleDelete = async (id) => {
        if (window.confirm("Delete this user?")) {
            await deleteUserApi(id);
            loadData();
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <input type="text" className="form-control w-25 shadow-sm" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                <div>
                    <Link to="/register" className="btn btn-danger me-2">+ Add User</Link>
                    <a href={EXPORT_URL} className="btn btn-primary" target="_blank" rel="noreferrer">Export To Csv</a>
                </div>
            </div>
            <div className="table-responsive shadow-sm rounded border bg-white">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th><th>FullName</th><th>Email</th><th>Gender</th><th>Status</th><th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, i) => (
                            <tr key={u._id}>
                                <td>{i + 1}</td>
                                <td className="fw-bold">{u.firstName} {u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.gender === 'Male' ? 'M' : 'F'}</td>
                                <td><span className={`badge ${u.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{u.status}</span></td>
                                <td>
                                    <Link to={`/user/${u._id}`} className="btn btn-sm btn-info text-white me-2">View</Link>
                                    <Link to={`/edit/${u._id}`} className="btn btn-sm btn-warning text-white me-2">Edit</Link>
                                    <button onClick={() => handleDelete(u._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Home;