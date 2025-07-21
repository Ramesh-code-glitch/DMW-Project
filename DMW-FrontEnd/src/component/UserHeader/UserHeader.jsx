import React from "react";
import "./UserHeader.css"; 
 

const UserCarPartsBanner = () => {
  return (
    <div className="banner-container">
      
      <div className="text-container">
        <h1>
          ALL TYPE OF <span className="highlight">CAR PARTS</span> DELIVERED
        </h1>
        <p>
          Select Used Parts supply quality used parts from all over India, any
          part from full engines to modules. Get in touch now.
        </p>

        <div className="image-container">
          <img src="/car.png" alt="Car" />
        </div>
      </div>
    </div>
  );
};

export default UserCarPartsBanner;
