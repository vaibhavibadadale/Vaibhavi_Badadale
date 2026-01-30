import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    

    const [user, setUser] = useState({
        firstName: '', lastName: '', email: '', mobile: '',
        gender: '', status: '', location: '', profile: ''
    });

    
    useEffect(() => {
        if (isEdit && id) {
            axios.get(`http://localhost:5000/api/user/${id}`)
                .then(res => setUser(res.data))
                .catch(err => toast.error("Failed to fetch user data. Please try again."));
        }
    }, [isEdit, id]);

    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        if (user.mobile.length !== 10) {
            return toast.warn("Mobile number must be 10 digits");
        }

        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/edit/${id}`, user);
                toast.success("User profile updated successfully!");
            } else {
                await axios.post('http://localhost:5000/api/add', user);
                toast.success("User registered successfully!");
            }
            
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || "Operation failed. Check if details are unique.");
        }
    };

    return (
        <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '900px', borderRadius: '20px' }}>
                <div className="card-body p-5">
                    {/* Header Section */}
                    <div className="text-center mb-5">
                        <div className="profile-icon-wrapper mb-3">
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                                alt="user-profile" 
                                className="rounded-circle shadow" 
                                width="100" 
                            />
                        </div>
                        <h2 className="fw-bold text-dark">{isEdit ? "Update Member Details" : "Register Your Details"}</h2>
                        <p className="text-muted">Fill in the information below to {isEdit ? "update the" : "create a new"} profile.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            {/* Personal Details */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">First Name</label>
                                <input type="text" name="firstName" className="form-control form-control-lg bg-light border-0 shadow-sm" value={user.firstName} placeholder="e.g. John" onChange={handleInput} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Last Name</label>
                                <input type="text" name="lastName" className="form-control form-control-lg bg-light border-0 shadow-sm" value={user.lastName} placeholder="e.g. Doe" onChange={handleInput} required />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Email Address</label>
                                <input type="email" name="email" className="form-control form-control-lg bg-light border-0 shadow-sm" value={user.email} placeholder="john.doe@example.com" onChange={handleInput} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Mobile Number</label>
                                <input type="text" name="mobile" className="form-control form-control-lg bg-light border-0 shadow-sm" value={user.mobile} placeholder="10-digit mobile number" onChange={handleInput} required />
                            </div>

                            {/* Demographics & Status */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary small text-uppercase d-block">Gender Identity</label>
                                <div className="d-flex gap-4 mt-2">
                                    <div className="form-check custom-radio">
                                        <input className="form-check-input" type="radio" name="gender" id="male" value="Male" checked={user.gender === 'Male'} onChange={handleInput} required />
                                        <label className="form-check-label" htmlFor="male">Male</label>
                                    </div>
                                    <div className="form-check custom-radio">
                                        <input className="form-check-input" type="radio" name="gender" id="female" value="Female" checked={user.gender === 'Female'} onChange={handleInput} required />
                                        <label className="form-check-label" htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Membership Status</label>
                                <select name="status" className="form-select form-select-lg bg-light border-0 shadow-sm" value={user.status} onChange={handleInput} required>
                                    <option value="" disabled>Select status...</option>
                                    <option value="Active">Active</option>
                                    <option value="InActive">InActive</option>
                                </select>
                            </div>

                            {/* Attachments & Location */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Profile Image</label>
                                <input type="file" className="form-control bg-light border-0 shadow-sm" onChange={(e) => setUser({...user, profile: e.target.files[0]?.name})} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold text-secondary small text-uppercase">Work/Home Location</label>
                                <input type="text" name="location" className="form-control form-control-lg bg-light border-0 shadow-sm" value={user.location} placeholder="Enter City, State" onChange={handleInput} required />
                            </div>

                            {/* Actions */}
                            <div className="col-12 mt-5">
                                <button type="submit" className="btn btn-dark btn-lg w-100 fw-bold shadow py-3 transition-btn" style={{ background: 'linear-gradient(45deg, #8B0000, #A52A2A)', border: 'none' }}>
                                    {isEdit ? "SAVE CHANGES" : "COMPLETE REGISTRATION"}
                                </button>
                                <button type="button" onClick={() => navigate('/')} className="btn btn-link w-100 mt-2 text-muted text-decoration-none">
                                    Cancel and return to list
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;