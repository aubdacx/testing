// src/components/Navbar.js

import React from 'react';
import './Navbar.css'; // Make sure to create this CSS file
import { FaBell, FaUserCircle } from 'react-icons/fa'; // Importing icons

function Navbar() {
  return (
    <div className="navbar top-header">
      <div className="navbar-title "></div>
      <div className="navbar-right  ">
        <button className="notification-btn">
          <FaBell />
        </button>   
        <div className="profile">
          <FaUserCircle className="profile-icon" />
          <span className="username">Admin</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
