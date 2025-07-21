import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [altPhone, setAltPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({}); // Clear previous errors

        // Frontend validation
        const trimmedName = name.trim();
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (name !== trimmedName) {
            setError((prev) => ({ ...prev, name: 'Name should not contain spaces at the beginning or end.' }));
            return;
        }
        if (username !== trimmedUsername) {
            setError((prev) => ({ ...prev, username: 'Username should not contain spaces at the beginning or end.' }));
            return;
        }
        if (email !== trimmedEmail || !emailRegex.test(trimmedEmail)) {
            setError((prev) => ({ ...prev, email: 'Please provide a valid email format with no spaces at the beginning or end.' }));
            return;
        }
        if (!passwordRegex.test(password)) {
            setError((prev) => ({ ...prev, password: 'Password must be strong: at least 8 characters long, with uppercase, lowercase, numbers, and special characters.' }));
            return;
        }
        if (password !== confirmPassword) {
            setError((prev) => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
            return;
        }

        // Prepare form data for image upload
        const formData = new FormData();
        formData.append('name', trimmedName);
        formData.append('username', trimmedUsername);
        formData.append('email', trimmedEmail);
        formData.append('phone', phone);
        formData.append('altPhone', altPhone);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        // Proceed with API call
        try {
            const result = await axios.post('http://localhost:3001/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('API call success:', result);
            navigate('/businessdetails', { state: { email: trimmedEmail } });
        } catch (err) {
            console.log('API call failed:', err);
            if (err.response && err.response.data && err.response.data.errors) {
                const backendErrors = err.response.data.errors;
                const formattedErrors = {};

                backendErrors.forEach(error => {
                    if (error.param === 'name') {
                        formattedErrors.name = error.msg;
                    }
                    if (error.param === 'username') {
                        formattedErrors.username = error.msg;
                    }
                    if (error.param === 'email') {
                        formattedErrors.email = error.msg;
                    }
                    if (error.param === 'phone') {
                        formattedErrors.phone = error.msg;
                    }
                    if (error.param === 'password') {
                        formattedErrors.password = error.msg;
                    }
                });

                setError(formattedErrors);
            } else {
                setError({ general: 'Registration failed. Please try again.' });
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>WANTS TO REGISTER AS A PART SUPPLIER?</h2>
            <img src="AutoAction DMW Logo.png" alt="Logo" className="logo" />
            <p className="form-instruction">Please fill the form below:</p>


            {error.general && <div className="alert alert-danger">{error.general}</div>}

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        autoComplete="off"
                        name="name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    {error.name && <div className="alert alert-danger">{error.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="username"><strong>Username</strong></label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        autoComplete="off"
                        name="username"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    {error.username && <div className="alert alert-danger">{error.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    {error.email && <div className="alert alert-danger">{error.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone"><strong>Phone</strong></label>
                    <input
                        type="text"
                        placeholder="Enter Phone"
                        autoComplete="off"
                        name="phone"
                        className="form-control"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                    />
                    {error.phone && <div className="alert alert-danger">{error.phone}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="altPhone"><strong>Alternate Phone</strong></label>
                    <input
                        type="text"
                        placeholder="Enter Alternate Phone"
                        autoComplete="off"
                        name="altPhone"
                        className="form-control"
                        onChange={(e) => setAltPhone(e.target.value)}
                        value={altPhone}
                    />
                    {error.altPhone && <div className="alert alert-danger">{error.altPhone}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {error.password && <div className="alert alert-danger">{error.password}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        className="form-control"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    {error.confirmPassword && <div className="alert alert-danger">{error.confirmPassword}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="profileImage"><strong>Profile Image</strong></label>
                    <input
                        type="file"
                        name="profileImage"
                        className="form-control"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="btn">Register</button>
                </div>
            </form>
            <p>Already have an account? <Link to="/login">Login Here</Link></p>
        </div>
    );
}

export default Signup;
