import React, { useState } from 'react';
import schoolEvents from '../components/events'; // Adjust the path according to your project structure
import './dashboard.css';
const Dashboard = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [events, setEvents] = useState(schoolEvents);

  // Handler for adding new event
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      date: eventDate,
      eventName,
      description: eventDescription,
      type: eventType,
      location: eventLocation,
    };
    setEvents([...events, newEvent]);
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

        <div className="dashboard-section">
          <h3>Add New Event</h3>
          <form className="event-form" onSubmit={handleAddEvent}>
            <label>
              Event Name:
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </label>
            <label>
              Event Date:
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </label>
            <label>
              Event Type:
              <input
                type="text"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                required
              />
            </label>
            <button type="submit">Add Event</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
