import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsersApi, EXPORT_URL, deleteUserApi } from '../services/api';
import { Dropdown } from 'react-bootstrap'; 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Function to reload data (used for Delete and Search button)
    const refreshData = async () => {
        try {
            const res = await fetchUsersApi(search, page);
            setUsers(res.data.users);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error("Error fetching data", err);
        }
    };

    // Corrected useEffect with internal function to resolve ESLint warning
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const res = await fetchUsersApi(search, page);
                setUsers(res.data.users);
                setTotalPages(res.data.totalPages);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };

        loadUsers();
    }, [search, page]); // Only runs when search or page changes

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUserApi(id);
                refreshData(); // Refresh list after deletion
            } catch (err) {
                alert("Delete failed");
            }
        }
    };

    return (
        <div className="main_container">
            {/* Black Branding Header */}
            <div className="bg-dark text-white text-center py-2 mb-4">
                <small className="text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>
                    MERN stack developer practical task
                </small>
            </div>

            <div className="container mt-2 pb-5">
                {/* Search and Action Buttons Row */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex">
                        <input 
                            type="text" 
                            className="form-control shadow-sm me-2" 
                            placeholder="Search" 
                            style={{ width: '250px' }}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }} 
                        />
                        <button className="btn btn-danger px-4" onClick={refreshData}>Search</button>
                    </div>
                    <div>
                        <Link to="/register" className="btn btn-danger me-2 shadow-sm">+ Add User</Link>
                        <a href={EXPORT_URL} target="_blank" rel="noreferrer" className="btn btn-danger shadow-sm">
                            Export To Csv
                        </a>
                    </div>
                </div>

                {/* Table Section */}
                <div className="table-responsive shadow-sm rounded-3 bg-white border">
                    <table className="table table-hover align-middle mb-0 text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Profile</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? users.map((u, i) => (
                                <tr key={u._id}>
                                    <td>{(page - 1) * 5 + i + 1}</td>
                                    <td className="fw-bold">{u.firstName} {u.lastName}</td>
                                    <td>{u.email}</td>
                                    <td>{u.gender === 'Male' ? 'M' : 'F'}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle 
                                                variant={u.status === 'Active' ? 'success' : 'danger'} 
                                                size="sm" 
                                                className="rounded-pill px-3"
                                            >
                                                {u.status}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>Active</Dropdown.Item>
                                                <Dropdown.Item>InActive</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <td>
                                        <img 
                                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                                            alt="profile" 
                                            className="rounded-circle border" 
                                            width="35" 
                                            height="35" 
                                        />
                                    </td>
                                    <td>
                                        <Dropdown align="end">
                                            <Dropdown.Toggle variant="link" className="text-dark border-0 p-0 shadow-none">
                                                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>⋮</span>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to={`/user/${u._id}`} className="text-success fw-bold">👁 View</Dropdown.Item>
                                                <Dropdown.Item as={Link} to={`/edit/${u._id}`} className="text-primary fw-bold">✏️ Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDelete(u._id)} className="text-danger fw-bold">🗑 Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-muted">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-end align-items-center mt-3">
                    <button 
                        disabled={page === 1} 
                        onClick={() => setPage(page - 1)} 
                        className="btn btn-sm btn-outline-dark me-2"
                    >
                        &lt;
                    </button>
                    <span className="btn btn-danger btn-sm px-3 fw-bold">{page}</span>
                    <button 
                        disabled={page >= totalPages} 
                        onClick={() => setPage(page + 1)} 
                        className="btn btn-sm btn-outline-dark ms-2"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserList;