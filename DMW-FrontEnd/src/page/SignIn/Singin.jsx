import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SignIn.css";
import logo from '../../assets/AutoAction DMW Logo.png'; // Adjust the path as necessary

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
            const { token } = response.data; // Assume your API returns a token in this format
            localStorage.setItem('authToken', token); // Store the token in localStorage

            // Navigate to UserHome after successful login
            navigate('/userhome'); // Ensure your route is set correctly
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.errors) {
                setError(err.response.data.errors[0].msg); // Display the specific error message
            } else {
                setError('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="LR-page">
            <div className="login-box">
                <img src={logo} alt="Logo" className="logo" />
                <h2>Login</h2>
                <p>Please enter your credentials:</p>

                {error && <div className="alert">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
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
                    </div>

                    <div className="button-container">
                        <button type="submit" className="btn btn-success">
                            Login
                        </button>
                    </div>
                </form>
                <p>Don't have an account? <Link to="/Signup">Sign Up</Link></p>
            </div>
        </div>
    );
}

export default SignIn;
