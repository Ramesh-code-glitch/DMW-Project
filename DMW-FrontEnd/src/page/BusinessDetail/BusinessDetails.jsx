import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BusinessDetails.css'; // Ensure the CSS is correctly imported

function BusinessDetails() {
    const [businessName, setBusinessName] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [panno, setPanno] = useState('');
    const [gstno, setGstno] = useState('');
    const [locationField, setLocation] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [panCardImage, setPanCardImage] = useState(null);
    const [gstImage, setGstImage] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Basic validation
        if (!businessName || !address || !country || !state || !city || !panno || !gstno || !locationField || !panCardImage || !gstImage) {
            setError('Please fill out all required fields.');
            setLoading(false);
            return;
        }

        // Validate no spaces in GST number
        if (/\s/.test(gstno)) {
            setError('GST number should not contain spaces.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('businessName', businessName);
        formData.append('address', address);
        formData.append('country', country);
        formData.append('state', state);
        formData.append('city', city);
        formData.append('panno', panno);
        formData.append('gstno', gstno);
        formData.append('location', locationField);
        formData.append('whatsappNumber', whatsappNumber);
        formData.append('panCardImage', panCardImage);
        formData.append('gstImage', gstImage);

        try {
            const result = await axios.post('http://localhost:3001/api/business/add-business-details', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(result.data);
            navigate('/bankdetails'); // Navigate to Bank Details page after submission
        } catch (err) {
            console.error('Error response:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="LR-page">
            <div className="form-holder">
                <img src="/AutoAction DMW Logo.png" alt="Logo" className="logo" /> {/* Reference logo directly */}
                <h2>BUSINESS DETAILS</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit} className="business-details-form">
                    <div className="form-left">
                        <div className="form-group">
                            <label><strong>Business Name</strong></label>
                            <input
                                type="text"
                                placeholder="Business Name"
                                autoComplete="off"
                                className="form-control"
                                onChange={(e) => setBusinessName(e.target.value)}
                                value={businessName}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>Address</strong></label>
                            <input
                                type="text"
                                placeholder="Enter Address"
                                autoComplete="off"
                                className="form-control"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>Country</strong></label>
                            <input
                                type="text"
                                placeholder="Enter Country"
                                className="form-control"
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>State</strong></label>
                            <input
                                type="text"
                                placeholder="Enter State"
                                className="form-control"
                                onChange={(e) => setState(e.target.value)}
                                value={state}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>WhatsApp Number (optional)</strong></label>
                            <input
                                type="text"
                                placeholder="Enter WhatsApp Number"
                                autoComplete="off"
                                className="form-control"
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                value={whatsappNumber}
                            />
                        </div>
                    </div>
                    <div className="form-right">
                        <div className="form-group">
                            <label><strong>City</strong></label>
                            <input
                                type="text"
                                placeholder="Enter City"
                                className="form-control"
                                onChange={(e) => setCity(e.target.value)}
                                value={city}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>PAN No.</strong></label>
                            <input
                                type="text"
                                placeholder="Enter PAN No."
                                className="form-control"
                                onChange={(e) => setPanno(e.target.value)}
                                value={panno}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>GST No.</strong></label>
                            <input
                                type="text"
                                placeholder="Enter GST No."
                                className="form-control"
                                onChange={(e) => setGstno(e.target.value)}
                                value={gstno}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>Location</strong></label>
                            <input
                                type="text"
                                placeholder="Enter Location"
                                className="form-control"
                                onChange={(e) => setLocation(e.target.value)}
                                value={locationField}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>PAN Card Image</strong></label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => setPanCardImage(e.target.files[0])}
                            />
                            {panCardImage && (
                                <img 
                                    src={URL.createObjectURL(panCardImage)} 
                                    alt="Preview of PAN Card" 
                                    style={{ width: '100%', marginTop: '10px' }} 
                                />
                            )}
                        </div>
                        <div className="form-group">
                            <label><strong>GST Image</strong></label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                onChange={(e) => setGstImage(e.target.files[0])}
                            />
                            {gstImage && (
                                <img 
                                    src={URL.createObjectURL(gstImage)} 
                                    alt="Preview of GST Image" 
                                    style={{ width: '100%', marginTop: '10px' }} 
                                />
                            )}
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn" disabled={loading} style={{ fontSize: '18px' }}> {/* Adjust the font size here */}
                            {loading ? 'Submitting...' : 'SUBMIT'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BusinessDetails;
