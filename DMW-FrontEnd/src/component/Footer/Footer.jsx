import React from "react";
import "./Footer.css";
import { HiMail } from "react-icons/hi";
import { BiSolidPhoneCall } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__section footer__brand">
        <img
          src="AutoAction DMW Logo.png"
          alt="Select Used Parts"
          className="footer__logo"
        />
        <p>
          AutoActionDMW.com is the best online marketplace for car spare parts
          for sale shopping in all over India. One of the best ways to save
          money on purchasing car spare parts at affordable prices for your
          vehicles is to rely on used ones.
        </p>
      </div>

      <div className="footer__section footer__nav">
        <h4>NAVIGATION</h4>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/spare">Spare Part</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>

      <div className="footer__section footer__important">
        <h4>IMPORTANT</h4>
        <ul>
          <li>
            <a href="/search-by-make">Search By Make</a>
          </li>
          <li>
            <a href="/search-by-part">Search By Part</a>
          </li>
          <li>
            <a href="/privacy-policy">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms-and-conditions">Terms and Conditions</a>
          </li>
        </ul>
      </div>

      <div className="footer__section footer__contact">
        <h4>CONTACT US</h4>

        <ul>
          <li>
            <HiMail className="icon" />
            <span className="Email">BUSINESS@MARIPOSADIGITAL.COM</span>
          </li>
        </ul>

        <ul>
          <li>
            <BiSolidPhoneCall className="icon" />
            <span className="Contact">+91-8617378821</span>
          </li>
        </ul>
      </div>

      <div className="footer__copyright">
        <p>© Copyright Mariposa Digital . All Rights Reserved</p>
        <p>Website Design services By mariposadigital.com</p>
      </div>
    </footer>
  );
};

export default Footer;
