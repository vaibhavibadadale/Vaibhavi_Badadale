import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/${id}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!user) return <div className="text-center mt-5">Loading Profile...</div>;

    return (
        <div className="container mt-5">
            <div className="card mx-auto shadow-lg" style={{ maxWidth: '450px', borderRadius: '15px' }}>
                <div className="card-header bg-danger text-white text-center py-4" style={{ borderRadius: '15px 15px 0 0' }}>
                    <h3>User Profile</h3>
                </div>
                <div className="card-body text-center p-4">
                    <div className="mb-4">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                            alt="profile" 
                            className="rounded-circle border border-3" 
                            width="120" 
                        />
                    </div>
                    <h2 className="mb-1">{user.firstName} {user.lastName}</h2>
                    <p className="text-muted">{user.email}</p>
                    <hr />
                    <div className="text-start px-3">
                        <p><strong>Mobile:</strong> {user.mobile}</p>
                        <p><strong>Location:</strong> {user.location}</p>
                        <p><strong>Gender:</strong> {user.gender}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                    </div>
                    <Link to="/" className="btn btn-outline-danger mt-3 w-100">Return to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;