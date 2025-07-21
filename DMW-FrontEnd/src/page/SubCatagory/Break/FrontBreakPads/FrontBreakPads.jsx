import React from 'react';
import './Front Break Pads.css';



const BrakeParts = () => {
  const products = [
    {
      name: 'Front Brake Pad Set',
      price: '₹1,017.00',
      originalPrice: '₹1,287.00',
      discount: '21%',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/2f78507.jpg',
      link: 'http://localhost:5173/#/Front_Break_Pads_Price',
    },
    {
      name: 'Front Brake Pad Set',
      price: '₹1,062.00',
      originalPrice: '₹1,295.00',
      discount: '18%',
      link: ' ',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/2f78507.jpg',
    },
    {
      name: 'Front Brake Pad Set',
      price: '₹1,124.00',
      originalPrice: '₹1,422.00',
      discount: '21%',
      link: ' ',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/2f78507.jpg',
    },
    {
      name: 'Front Brake Pad Set',
      price: '₹1,229.00',
      originalPrice: '₹1,499.00',
      discount: '18%',
      link: ' ',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/2f78507.jpg',
    },
   
  ];

  return (
    
      
      <section className="products-section">
        <h2>Front Break Pads</h2>
        <div className="products-grid">
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
               
              </div>
            </div>
          ))}
        </div>
      </section>
      
    
  );
};

export default BrakeParts;
