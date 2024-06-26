// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="address">
            <h3>ADDRESS</h3>
            <p>
              Plot 1077, Kasuubi, Kampala<br />
              (500 m after Quality Shopping Village)<br />
              P.O. Box 11119 Kampala Uganda<br />
              <strong>Tel:</strong> +256 781 468 000<br />
              <strong>Email:</strong> <a href="mailto:admissions@gisu.ac.ug">admissions@gisu.ac.ug</a> | <a href="mailto:info@gisu.ac.ug">info@gisu.ac.ug</a><br />
            </p>
          </div>
          <div className="quick-links">
            <h3>QUICK LINKS</h3>
            <ul>
              <li><Link to="/applications">ENROLL ONLINE</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>All rights reserved © 2024. Innerman Pre & Primary School.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
