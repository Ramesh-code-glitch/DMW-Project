import React, { useEffect, useState } from "react";
import axios from "axios";
import './myorders.css'; 
import Navbar from '../../page/UserNavbar/UserNavbar';
import Footer from '../../component/Footer/Footer';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
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
        
        fetchOrders();
    }, []);

    const handleApprove = async (orderId) => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            setError('You need to be logged in to approve orders.');
            return;
        }

        try {
            // Send a request to update the order status to "Approved"
            const response = await axios.patch(`http://localhost:3001/api/fetch/orders/${orderId}`, 
            { status: 'Approved' }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Update the orders state to reflect the new status
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: response.data.order.status } : order // Update order status correctly
                )
            );
        } catch (error) {
            console.error("Error approving order:", error.response?.data || error.message);
            setError('Failed to approve order.'); // Set error state
        }
    };

    return (
        <div className="my-orders-container">
            <Navbar />
            <div className="my-orders">
                <h3>User Orders</h3>
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
                                {/* Approve button only if status is not Approved */}
                                {order.status !== 'Approved' && (
                                    <button className="approve-button" onClick={() => handleApprove(order._id)}>
                                        Approve
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default MyOrders;
