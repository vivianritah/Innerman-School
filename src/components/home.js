import React from 'react';
import schoolEvents from '../components/events'; // Ensure the path is correct
import './home.css'; // Ensure the file exists

function Home() {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return { day, month, year };
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return { day: 'N/A', month: 'N/A', year: 'N/A' };
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Innerman Pre & Primary School</h1>
        <p>Empowering young minds for a brighter future.</p>
        <button className="apply-button">Apply Now</button>
      </section>
      
      {/* Events Section */}
      <div className="events-section">
        <h2>Upcoming Events</h2>
        <ul>
          {schoolEvents.map((event, index) => {
            const { day, month, year } = formatDate(event.date);
            return (
              <li key={index} className="event-item">
                <div className="event-date">
                  <div className="month">{month}</div>
                  <div className="day">{day}</div>
                  <div className="year">{year}</div>
                </div>
                <div className="event-details">
                  <strong>{event.eventName}</strong>
                  <p>{event.description}</p>
                  <p className="event-time">
                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="event-location">{event.location}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Community Says</h2>
        <blockquote>
          "Innerman School has provided my children with a well-rounded education and a caring environment."
          <cite>- Parent of a Grade 5 student</cite>
        </blockquote>
      </section>
    </div>
  );
}

export default Home;
