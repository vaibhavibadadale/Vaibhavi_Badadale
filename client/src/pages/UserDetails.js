import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserByIdApi } from '../services/api';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserByIdApi(id)
            .then(res => setUser(res.data))
            .catch(err => console.log(err));
    }, [id]);

    if (!user) return <div className="text-center mt-5">Loading Profile...</div>;

    return (
        <div className="container mt-5 mb-5">
            {/* Design Branding Header */}
            <div className="text-center mb-3">
                <p className="fw-bold text-uppercase small" style={{ letterSpacing: '1px', color: '#333' }}>
                    MERN stack developer practical task
                </p>
            </div>

            <div className="card mx-auto shadow-lg border-0" style={{ maxWidth: '450px', borderRadius: '20px' }}>
                <div className="card-header bg-danger text-white text-center py-4" style={{ borderRadius: '20px 20px 0 0' }}>
                    <h3 className="mb-0">User Profile</h3>
                </div>
                <div className="card-body text-center p-4">
                    {/* Updated Profile Image Section */}
                    <div className="d-inline-block p-1 border rounded-circle mb-3">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                            alt="user-avatar" 
                            width="100" 
                            height="100"
                            className="rounded-circle"
                        />
                    </div>

                    <h2 className="fw-bold">{user.firstName} {user.lastName}</h2>
                    <p className="text-danger fw-semibold">{user.email}</p>
                    <hr />
                    
                    <div className="text-start px-3 bg-light p-3 rounded shadow-sm">
                        <p className="mb-2"><strong>📞 Mobile:</strong> {user.mobile}</p>
                        <p className="mb-2"><strong>📍 Location:</strong> {user.location}</p>
                        <p className="mb-2"><strong>🚻 Gender:</strong> {user.gender}</p>
                        <p className="mb-0"><strong>⚡ Status:</strong> 
                            <span className={`ms-2 fw-bold ${user.status === 'Active' ? 'text-success' : 'text-danger'}`}>
                                {user.status}
                            </span>
                        </p>
                    </div>

                    <Link to="/" className="btn btn-outline-danger mt-4 w-100 fw-bold" style={{ borderRadius: '10px' }}>
                        BACK TO DASHBOARD
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;