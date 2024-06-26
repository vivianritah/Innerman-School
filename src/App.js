import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import NavBar from './components/navigation';
import About from './components/about';
import Contact from './components/contact';
import Admissions from './components/admissions';
import Applications from './components/applications';
import Gallery from './components/gallery';
import NoPage from './components/noPage';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeaderSlideshow from './components/slideShow';
import schoolEvents from './components/events'; 

function App() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return { day, month, year };
  };
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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NoPage />} />
          </Routes>

          <div className="events-section">
            <h2>Upcoming Events</h2>
            <ul>
              {schoolEvents.map((event, index) => {
                const { day, month, year } = formatDate(event.date);
                return (
                  <li key={index}>
                    <div className="event-date">
                      <div className="month">{month}</div>
                      <div className="day">{day}</div>
                      <div className="year">{year}</div>
                    </div>
                    <div className="event-details">
                      <strong>{event.eventName}</strong>
                      <p>{event.description}</p>
                      <p className="event-time">{event.date}</p>
                      <p className="event-location">{event.location}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* <div className="events-section">
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
          </div> */}
        </div>
        
      </Router>
    </div>
  );
}

export default App;