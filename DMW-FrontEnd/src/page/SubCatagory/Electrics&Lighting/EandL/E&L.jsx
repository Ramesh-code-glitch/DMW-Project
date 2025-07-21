import React from 'react';

import Navbar from '../../../../component/Navbar/Navbar'
import Footer from '../../../../component/Footer/Footer';

const PartsBrake = () => {
  const subcategories = [
    {
      name: 'Alarms , immobilisers & Horns',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651556566-Alarms-,-Immobilisers-and-Horns.png',
      link: 'http://localhost:5173/#/EandL_AlarmimmobilisersHorns',
    },
    {
      name: 'Altenators',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651477520-Altenators.png',
      link: '',
    },
    {
      name: 'Head Lights',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651477694-Head-Lights.png',
      link: '',
    },
    {
      name: 'Indicators',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651477710-Indicators.png',
      link: ' ',
    },
    {
      name: 'Starter Motors',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651477581-Starter-Motors.png',
      link: '  ',
    },
    {
      name: 'Driving & Fog Lamps',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651556608-Driving-and-Fog-Lamps.png',
      link: ' ',
    },
    {
      name: 'Rear Lights',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651477749-Rear-Lights.png',
      link: ' ',
    },
    {
      name: 'Reflectors',
      imageUrl: 'https://www.selectusedparts.com/assets/images/sub-category-image/1651477764-Reflectors.png',
      link: ' ',
    },
  ];


  return (
    <div>
    < Navbar/>
    <section className="feature-categories">
      <h2>E and L SubCategories</h2>
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
