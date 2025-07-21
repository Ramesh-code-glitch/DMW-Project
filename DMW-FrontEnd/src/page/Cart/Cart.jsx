import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Cart.css';
import Navbar from "../../component/Navbar/Navbar"; // Import the Navbar component
import Footer from "../../component/Footer/Footer"; // Import the Footer component

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart items from local storage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleRemoveFromCart = (index) => {
    // Remove item from cart
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart); // Update state
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
  };

  return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
      <section className="cart-section">
        <h2>Your Cart</h2>
        <div className="product-grid">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="product-card">
                <img src={item.imageUrl} alt={item.name} />
                <div className="product-info">
                  <h3>{item.name}</h3>
                  <p className="price">{item.price}</p>
                  <p className="original-price">MRP: <s>{item.originalPrice}</s></p>
                  <p className="discount">{item.discount} OFF</p>
                  <button 
                    className="remove-from-cart-btn" 
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </section>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default Cart;
