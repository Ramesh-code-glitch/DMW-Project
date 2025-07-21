import React from 'react';




const BrakeParts = () => {
  const products = [
    {
      name: 'Alarms, Immobilisers & Horns Parts',
      price: '₹1,017.00',
      originalPrice: '₹1,287.00',
      discount: '21%',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651556566-Alarms-,-Immobilisers-and-Horns.png',
      link: 'http://localhost:5173/#/EandL_AlarmPartsPrice',
    },
    {
      name: 'Alarms, Immobilisers & Horns Parts',
      price: '₹1,062.00',
      originalPrice: '₹1,295.00',
      discount: '18%',
      link: ' ',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651556566-Alarms-,-Immobilisers-and-Horns.png',
    },
    {
      name: 'Alarms, Immobilisers & Horns Parts',
      price: '₹1,124.00',
      originalPrice: '₹1,422.00',
      discount: '21%',
      link: ' ',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651556566-Alarms-,-Immobilisers-and-Horns.png',
    },
    {
      name: 'Alarms, Immobilisers & Horns Parts',
      price: '₹1,229.00',
      originalPrice: '₹1,499.00',
      discount: '18%',
      link: ' ',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651556566-Alarms-,-Immobilisers-and-Horns.png',
    },
   
  ];

  return (
    
      
      <section className="products-section">
        <h2>Alarms, Immobilisers & Horns Parts</h2>
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
