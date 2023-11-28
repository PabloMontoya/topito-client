import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isLoggedIn, user }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>TOPITO</h1>
      </div>
      {isLoggedIn && (
        <div className="profile-section">
          <span>{user.name}</span>
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
