import React from 'react';
import './break.css';
import Navbar from '../../../component/Navbar/Navbar';
import Footer from '../../../component/Footer/Footer';

const PartsBrake = () => {
  const subcategories = [
    {
      name: 'Front Break Pads',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/2f78507.jpg',
      link: 'http://localhost:5173/#/Front_Break_Pads',
    },
    {
      name: 'Brake Reapair Kit',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/8945d07.jpg',
      link: '',
    },
    {
      name: 'Break Fluid',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/3de286d.jpg',
      link: '',
    },
    {
      name: 'Break Shoes',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/32e7eee.webp',
      link: 'http://localhost:5174/#/cooling',
    },
    {
      name: 'Durm Break',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/9bda554.webp',
      link: 'http://localhost:5174/#/kit',
    },
    {
      name: 'Front Break Disc',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/99014ce.jpg',
      link: 'http://localhost:5174/#/engine',
    },
    {
      name: 'Rear Break Disc',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/b5d6363.webp',
      link: 'http://localhost:5174/#/suspension',
    },
    {
      name: 'Rear Break Pads',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/27bdab0.webp',
      link: 'http://localhost:5174/#/transmission',
    },
  ];


  return (
    <div>
    < Navbar/>
    <section className="feature-categories">
      <h2>Break SubCategories</h2>
      <div className="categories-grid">
        {subcategories.map((category, index) => (
          <div key={index} className="category-card">
            <a href={category.link}>
              <img src={category.imageUrl} alt={category.name} />
              </a>
              <p>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
    < Footer/>
    </div>
   
  );
};

export default PartsBrake;
