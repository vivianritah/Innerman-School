import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">AboutUs</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact">ContactUs</Link>
        </li>
        <li className="nav-item">
          <Link to="/admissions">Admissions</Link>
        </li>
        <li className="nav-item">
          <Link to="/applications">Applications</Link>
        </li>

        
      </ul>
    </nav>
  );
}

export default NavBar;
