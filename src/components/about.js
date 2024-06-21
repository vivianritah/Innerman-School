// About.js
import React from 'react';
import './about.css'


function About() {
  return (
    <div className="about-container">
      <section className="motto-section">
        <h2 className="motto-title">Our Motto</h2>
        <p className="motto">Grow In Stature, Wisdom And Spirit</p>
      </section>
      <section className="info-section">
        <div className="vision-mission">
          <h3 className="info-title">Vision</h3>
          <p className="info-text">A joyful and prosperous generation standing for the truth and integrity.</p>
        </div>
      
        <div className="vision-mission">
          <h3 className="info-title">Mission</h3>
          <p className="info-text">To raise a God-fearing generation through a holistic quality education.</p>
        </div>
        <div className="values-section">
          <h3 className="values-title">Core Values</h3>
          <ul className="values-list">
            <li>God-fearing</li>
            <li>Bible-Centred</li>
            <li>Integrity</li>
            <li>Team work</li>
            <li>Accountability</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default About;
