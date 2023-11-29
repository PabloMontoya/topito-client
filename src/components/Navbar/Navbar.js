import React from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
  };

  // Retrieve user details from sessionStorage
  const userName = sessionStorage.getItem('user_name');
  const userPicture = sessionStorage.getItem('user_picture');

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/topito.png" alt="Topito Logo" className="navbar-logo" />
        <h1>Topito</h1>
      </div>
      {isAuthenticated && (
        <div className="profile-section">
          <span>{userName}</span>
          {userPicture ? (
            <img src={userPicture} alt={userName} className="profile-picture" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          )}
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
