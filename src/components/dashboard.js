import React, { useState, useEffect } from 'react';
import './dashboard.css';


const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API or wherever they are stored
    // Example fetch call
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>School Dashboard</h2>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>Upcoming Events</h3>
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                <strong>{event.date}</strong> - {event.eventName} ({event.type})
                <br />
                <span>{event.description}</span>
                <br />
                <span>Location: {event.location}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
