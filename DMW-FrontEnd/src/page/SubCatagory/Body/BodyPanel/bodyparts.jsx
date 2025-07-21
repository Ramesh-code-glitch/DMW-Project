import React from 'react';
import './bodyparts.css';



const BrakeParts = () => {
  const products = [
    {
      name: 'Body Shell',
      price: '₹1,017.00',
      originalPrice: '₹1,287.00',
      discount: '21%',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/322d06a.jpg',
      link: 'http://localhost:5173/#/body_parts_price',
    },
    {
      name: 'Chassis',
      price: '₹1,062.00',
      originalPrice: '₹1,295.00',
      discount: '18%',
      link: ' ',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/92b134e.jpg',
    },
    {
      name: 'Locking Pins',
      price: '₹1,124.00',
      originalPrice: '₹1,422.00',
      discount: '21%',
      link: ' ',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/ee25150.webp',
    },
    {
      name: 'Support Frame',
      price: '₹1,229.00',
      originalPrice: '₹1,499.00',
      discount: '18%',
      link: ' ',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/973aa93.jpg',
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
