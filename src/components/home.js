import React from 'react';
import schoolEvents from '../components/events';
import './home.css';

function Home() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return { day, month, year };
  };
  return (
    <div>
      <div className="home">
        <h1>Welcome to Innerman School Page</h1>
      </div>
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
  </div>
  );
}

export default Home;







