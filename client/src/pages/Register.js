import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                .catch(err => toast.error("Failed to fetch user data."));
        }
    }, [isEdit, id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.mobile.length !== 10) return toast.warn("Mobile number must be 10 digits");

        try {
            if (isEdit) {
                await editUserApi(id, user);
                toast.success("User profile updated!");
            } else {
                await addUserApi(user);
                toast.success("User registered!");
            }
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            toast.error("Operation failed. Email/Mobile might already exist.");
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <ToastContainer />
            <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: '900px', borderRadius: '20px' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-5">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="user" className="rounded-circle shadow" width="100" />
                        <h2 className="fw-bold mt-3">{isEdit ? "Update Member" : "Register Details"}</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label">First Name</label>
                                <input type="text" name="firstName" className="form-control" value={user.firstName} onChange={handleInput} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Last Name</label>
                                <input type="text" name="lastName" className="form-control" value={user.lastName} onChange={handleInput} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" className="form-control" value={user.email} onChange={handleInput} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Mobile</label>
                                <input type="text" name="mobile" className="form-control" value={user.mobile} onChange={handleInput} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label d-block">Gender</label>
                                <input type="radio" name="gender" value="Male" checked={user.gender === 'Male'} onChange={handleInput} /> Male
                                <input type="radio" name="gender" value="Female" className="ms-3" checked={user.gender === 'Female'} onChange={handleInput} /> Female
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select name="status" className="form-select" value={user.status} onChange={handleInput} required>
                                    <option value="">Select...</option>
                                    <option value="Active">Active</option>
                                    <option value="InActive">InActive</option>
                                </select>
                            </div>
                            <div className="col-12 mt-4">
                                <button type="submit" className="btn btn-danger w-100 py-3">{isEdit ? "SAVE CHANGES" : "REGISTER"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;