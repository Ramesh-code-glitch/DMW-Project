import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { HiMail } from "react-icons/hi";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart, FaClipboardList } from "react-icons/fa"; // Import cart and order icons
import Button from "../Button/Button";

function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(0); // Set initial cart item count to 0
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken'); // Check if the user is logged in

  useEffect(() => {
    // Here, you would fetch the actual cart item count
    // Example: axios.get('/api/cart').then(response => setCartItemCount(response.data.count));
  }, []);

  return (
    <div className="div_container">
      <div className="navbar_flex">
        <Link to="/" className="logo">
          <img className="logo_img" src="/AutoAction DMW Logo.png" alt="Logo" />
        </Link>

        <ul className="items">
          <li className="email">
            <HiMail className="icon" />
            <div>
              <span className="Email">BUSINESS@MARIPOSADIGITAL.COM</span>
              <br />
              <span className="text_sm">Hour: 09:00am - 06:00pm</span>
            </div>
          </li>

          <li className="contact">
            <BiSolidPhoneCall className="icon" />
            <div>
              <span className="Phone">8617378821</span>
              <br />
              <span className="text_sm">(Free Call)</span>
            </div>
          </li>

          <li className="singin">
            <MdAccountCircle className="icon" />
            <div>
              <span className="signin">
                <Link to="/login">SIGN-IN</Link>
              </span>
              <br />
              <span className="text_sm">Lead Area</span>
            </div>
          </li>

          {authToken && ( // Conditionally show "My Orders" if logged in
            <li className="account">
              <FaClipboardList className="my-order-icon" /> {/* Order Icon */}
              <Link to="/user-orders">My Orders</Link>
            </li>
          )}

          {/* Cart icon with item count */}
          <li className="cart">
            <Link to="/cart">
              <FaShoppingCart className="cart_icon" />
              {cartItemCount > 0 && (
                <span className="cart_items_count">{cartItemCount}</span>
              )}
            </Link>
          </li>

          {/* "Become A Supplier" button */}
          <Button
            className='Supplier'
            width="11rem"
            text="Become A Supplier➡"
            height="3rem"
            fontSize="1rem"
            background="#000000"
            color="#FFFFFF"
            event={() => {
              navigate("/Signup");
            }}
          />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
