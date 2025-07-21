import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './RegisterBanner.css';

const RegisterBanner = () => {
  return (
    <div className="rbanner-container">
      <div className="banner-content">
        <h1>Are you a professional supplier?</h1>
        <p>Boost your business with the help of Selectedusedparts marketplace</p>
      </div>
      {/* Use Link component for client-side navigation */}
      <Link to="/Signup" className="banner-button">REGISTER HERE</Link>
    </div>
  );
};

export default RegisterBanner;
