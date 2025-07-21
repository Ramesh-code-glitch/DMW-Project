import React from 'react';
import './bodypanel.css';
import Navbar from "../../../../component/Navbar/Navbar";
import Footer from '../../../../component/Footer/Footer';

const PartsBrake = () => {
  const subcategories = [
    {
      name: 'Body Panel',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1652161546-Body-Panels.png',
      link: 'http://localhost:5173/#/body_parts',
    },
    {
      name: 'Doors',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1652161568-Car-Door.png',
      link: '',
    },
    {
      name: 'Bonnet',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/6899905.jpg',
      link: '',
    },
    {
      name: 'Windshield',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/f6abd00.jpg',
      link: '',
    },
    {
      name: 'Sunroof',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/edfd556.jpg',
      link: '',
    },
    {
      name: 'Body Accessories',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/ab143a7.webp',
      link: '',
    },
    {
      name: 'Engine Cover',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/aceebde.jpg',
      link: '',
    },
    {
      name: 'Fuel Tank',
      imageUrl: 'https://boodmo.com/media/cache/catalog_image/images/categories/49ed220.jpg',
      link: '',
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
