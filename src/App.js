// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navigation';
import About from './components/about';
import Contact from './components/contact';
import Admissions from './components/admissions';
import Applications from './components/applications';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeaderSlideshow from './components/slideShow';
import schoolEvents from './components/events'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderSlideshow /> 
        <p className="innerman-school">INNERMAN PRE & PRIMARY SCHOOL</p>
      </header>
      <Router>
        <NavBar className="navbar" />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/applications" element={<Applications />} />
            
          </Routes>
        </div>
        <div className="events-section">
          <h2>Upcoming Events</h2>
          <ul>
            {schoolEvents.map((event, index) => (
              <li key={index}>
                <strong>{event.eventName}</strong> - {event.date}
                <p>{event.description}</p>
                <p><em>{event.location}</em></p>
              </li>
            ))}
          </ul>
        </div>
      </Router>
    </div>
  );
}

export default App;
