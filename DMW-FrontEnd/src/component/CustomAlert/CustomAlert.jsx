import React from 'react';
import './CustomAlert.css'; // You can also use Tailwind or inline styles

const CustomAlert = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <img
          src="/AutoAction DMW Logo.png" // Replace with your image path
          alt="AutoAction Logo"
          className="alert-img"
        />
        <h1>This is <span className="highlight">AutoAction</span></h1>
        <p><span className="AlertMessage">𝕎𝕖𝕝𝕔𝕠𝕞𝕖 𝕥𝕠 𝕥𝕙𝕖 𝔻𝕄𝕎 ℂ𝕒𝕣 ℙ𝕒𝕣𝕥𝕤 ℙ𝕠𝕣𝕥𝕒𝕝</span></p>
        <button className="ok-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default CustomAlert;
