




// Contact.js
import React from 'react';
import './contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/badge.png'; 

function Contact() {
  return (
    <div className="contact-container">
      <header className="header">
        <img src={logo} alt="Innerman logo" className="logo" />
        <div className="contact-info">
          <p>0414 342 684 | 0757 211 737 |</p>
        </div>
      </header>
      <div className="content-wrapper">
        <h1 className="page-title">Innerman Pre & Primary School</h1>
        <div className="address-section">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
          <div className="address-details">
            <p><strong>Innerman Pre & Primary School</strong></p>
            <p> Kimera Road</p>
            <p>Kasuubi, Kampala</p>
            <p>P.O.Box 246, Kampala Uganda</p>
            <p>+256(0)757 211737 | +256(0)757 211344</p>
          </div>
        </div>
        <div className="social-media">
          <a href="https://www.facebook.com/search/top?q=innerman%20pre%20and%20primary%20school" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.youtube.com/results?search_query=innerman+pre+and+primary+school" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://www.tiktok.com/search?q=innerman%20pre%20and%20primary%20school%20kasubi&t=1718969647805" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;