import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrakeParts = () => {
  const navigate = useNavigate();
  const products = [
    {
      name: 'Alarms, Immobilisers & Horns Parts',
      price: '₹1,017.00',
      originalPrice: '₹1,287.00',
      discount: '21%',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651556566-Alarms-,-Immobilisers-and-Horns.png',
      link: '',
    },
  ];

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    // Retrieve existing cart from local storage or create a new one
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the new product to the cart
    existingCart.push(product);
    
    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Navigate to the cart page
    navigate('/cart');
  };

  return (
    <section className="product-section">
      <h2>Alarms, Immobilisers & Horns Parts</h2>
      <div className="product-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <a href={product.link}>
              <img src={product.imageUrl} alt={product.name} />
            </a>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <p className="original-price">MRP: <s>{product.originalPrice}</s></p>
              <p className="discount">{product.discount} OFF</p>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrakeParts;
