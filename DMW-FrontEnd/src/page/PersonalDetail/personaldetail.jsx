import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './personaldetail.css';
import Footer from '../../component/Footer/Footer';
import Navbar from '../../component/Navbar/Navbar'; // Import the UserNavbar

const PersonalDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { make, model, year, selectedParts } = location.state || { make: "", model: "", year: "", selectedParts: [] };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    country: '',
    additionalInfo: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRemovePart = (partIndex) => {
    const updatedParts = selectedParts.filter((_, index) => index !== partIndex);
    // Ensure this is handled appropriately in the parent component or through a global state if required.
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.state || !formData.city || !formData.pincode || !formData.country || !selectedParts.length) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    // Validate phone number (exactly 10 digits)
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError('Phone number must be exactly 10 digits.');
      setLoading(false);
      return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:3001/api/purchase', {
        personalDetails: formData,
        vehicle: { make, model, year },
        selectedParts,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response.data.message);
      setLoading(false);
      navigate('/user-orders'); // Navigate to a confirmation page or similar
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Error saving data');
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate('/searchandresults'); // Navigate to the SearchAndResults page
  };

  return (
    <div>
      <Navbar /> {/* Replace the normal Navbar with UserNavbar */}
      <div className="form-container">
        <div className="personal-details">
          <h3>Personal Details</h3>
          <div className="input-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-row">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-row">
            <select name="state" value={formData.state} onChange={handleChange} required>
              <option value="">Select State</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              {/* Add other states */}
            </select>
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              {/* Add other cities */}
            </select>
          </div>
          <div className="input-row">
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Your Country"
              value={formData.country}
              onChange={handleChange}
              required // Make country required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="previous-btn" onClick={handlePrevious}>Previous</button>
          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>

        <div className="vehicle-details">
          <h3>Selected Vehicle Details</h3>
          <div className="vehicle-info">
            <img
              src="https://www.selectusedparts.com/assets/images/2019/08/20190511_101154.gif"
              alt="Vehicle Logo"
              className="vehicle-img"
            />
            <div className="vehicle-brand">{make}, {model}</div>
            <div className="vehicle-year">{year}</div>
          </div>
          <div className="selected-parts">
            <h4>Selected Parts</h4>
            <div className="part-tag">
              {selectedParts.map((part, index) => (
                <span key={index} className="part">
                  {part.name} <button className="remove-part" onClick={() => handleRemovePart(index)}>✕</button>
                </span>
              ))}
            </div>
          </div>
          <textarea
            name="additionalInfo"
            placeholder="Additional Information (optional)"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalDetail;
