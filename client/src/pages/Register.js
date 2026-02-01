import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getUserByIdApi, editUserApi, addUserApi } from '../services/api';

const Register = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        firstName: '', lastName: '', email: '', mobile: '',
        gender: '', status: '', location: '', profile: ''
    });

    useEffect(() => {
        if (isEdit && id) {
            getUserByIdApi(id)
                .then(res => setUser(res.data))
                .catch(() => toast.error("User not found"));
        }
    }, [isEdit, id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Debugging: Check console to see if fields are empty
        console.log("Submitting Data:", user);

        try {
            if (isEdit) {
                await editUserApi(id, user);
                toast.success("User updated!");
            } else {
                await addUserApi(user);
                toast.success("User registered successfully!");
            }
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Operation failed";
            toast.error(errorMsg);
            console.error("API Error:", err);
        }
    };

    return (
        <div className="main-wrapper" style={{ backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
            <ToastContainer position="top-right" autoClose={2000} />
            
            <div className="bg-dark text-white text-center py-2 mb-4">
                <small className="text-uppercase fw-bold">MERN stack developer practical task</small>
            </div>

            <div className="container pb-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">{isEdit ? "Update User Details" : "Register Your Details"}</h2>
                </div>

                <div className="card shadow-sm border mx-auto" style={{ maxWidth: '800px', borderRadius: '10px' }}>
                    <div className="card-body p-4">
                        <div className="text-center mb-4">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" width="60" className="rounded-circle border" />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6 text-start">
                                    <label className="form-label fw-bold">First name</label>
                                    <input type="text" name="firstName" className="form-control" value={user.firstName} onChange={handleInput} placeholder="Enter FirstName" required />
                                </div>
                                <div className="col-md-6 text-start">
                                    <label className="form-label fw-bold">Last Name</label>
                                    <input type="text" name="lastName" className="form-control" value={user.lastName} onChange={handleInput} placeholder="Enter LastName" required />
                                </div>
                                <div className="col-md-6 text-start">
                                    <label className="form-label fw-bold">Email address</label>
                                    <input type="email" name="email" className="form-control" value={user.email} onChange={handleInput} placeholder="Enter Email" required />
                                </div>
                                <div className="col-md-6 text-start">
                                    <label className="form-label fw-bold">Mobile</label>
                                    <input type="text" name="mobile" className="form-control" value={user.mobile} onChange={handleInput} placeholder="Enter Mobile" required />
                                </div>
                                <div className="col-md-6 text-start">
                                    <label className="form-label fw-bold d-block">Select Your Gender</label>
                                    <div className="mt-2">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" value="Male" checked={user.gender === 'Male'} onChange={handleInput} required />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" value="Female" checked={user.gender === 'Female'} onChange={handleInput} required />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 text-start">
                                    <label className="form-label fw-bold">Select Your Status</label>
                                    <select name="status" className="form-select" value={user.status} onChange={handleInput} required>
                                        <option value="">Select...</option>
                                        <option value="Active">Active</option>
                                        <option value="InActive">InActive</option>
                                    </select>
                                </div>
                                <div className="col-md-6 text-start">
                                    <label className="form-label fw-bold">Select Your Profile</label>
                                    <input type="file" className="form-control" />
                                </div>
                                <div className="col-md-6 text-start">
                                    <label className="form-label fw-bold">Enter Your Location</label>
                                    <input type="text" name="location" className="form-control" value={user.location} onChange={handleInput} placeholder="Enter Your Location" required />
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn w-100 fw-bold text-white py-2 shadow-sm" style={{ backgroundColor: '#9b2c2c', border: 'none' }}>
                                        {isEdit ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;