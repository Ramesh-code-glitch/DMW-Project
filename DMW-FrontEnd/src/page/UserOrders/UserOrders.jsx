import React, { useEffect, useState } from "react";
import axios from "axios";
import './userorders.css'; 
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';

const UserOrder = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        const token = localStorage.getItem('authToken'); // Get the JWT token from localStorage

        if (!token) {
            setError('You need to be logged in to view orders.');
            return;
        }

        try {
            const response = await axios.get('http://localhost:3001/api/fetch/orders', {
                headers: {
                    Authorization: `Bearer ${token}` // Pass token in Authorization header
                }
            });
            setOrders(response.data); // Set the fetched orders to state
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
            setError('Failed to fetch orders.'); // Set error state
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="user-orders-container">
            <Navbar />
            <div className="user-orders">
                <h3>My Orders</h3>
                {error && <p className="error-message">{error}</p>} {/* Show error message if exists */}
                {orders.length === 0 ? (
                    <p>No orders found.</p> // Display if no orders are present
                ) : (
                    <ul className="orders-list">
                        {orders.map((order) => (
                            <li key={order._id} className="order-item">
                                <h4>Order ID: {order._id}</h4>

                                <div className="order-section">
                                    <h5>Personal Details</h5>
                                    <p><strong>Name:</strong> {order.personalDetails.name}</p>
                                    <p><strong>Email:</strong> {order.personalDetails.email}</p>
                                    <p><strong>Phone:</strong> {order.personalDetails.phone}</p>
                                    <p><strong>Address:</strong> {order.personalDetails.address}, {order.personalDetails.city}, {order.personalDetails.state} - {order.personalDetails.pincode}, {order.personalDetails.country}</p>
                                    {order.personalDetails.additionalInfo && (
                                        <p><strong>Additional Info:</strong> {order.personalDetails.additionalInfo}</p>
                                    )}
                                </div>

                                <div className="order-section">
                                    <h5>Vehicle Details</h5>
                                    <p><strong>Make:</strong> {order.vehicle.make}</p>
                                    <p><strong>Model:</strong> {order.vehicle.model}</p>
                                    <p><strong>Year:</strong> {order.vehicle.year}</p>
                                </div>

                                <div className="order-section">
                                    <h5>Selected Parts</h5>
                                    <ul className="parts-list">
                                        {order.selectedParts.map((part) => (
                                            <li key={part.id}>{part.name}</li>
                                        ))}
                                    </ul>
                                </div>

                                <p><strong>Status:</strong> {order.status}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default UserOrder;
