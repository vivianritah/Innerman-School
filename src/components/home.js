import React, { useState, useEffect } from 'react';
import './home.css'; // Importing CSS for styling
import AchievementImage from '../images/background3.jpg';
import FacilitiesImage from '../images/background5.jpg';
import CommunityImage from '../images/image7.jpg';

const Home = () => {
  const [events, setEvents] = useState([]);

  // Function to format date
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage
        const response = await fetch('http://127.0.0.1:5000/api/v1/events', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    fetchEvents();
  }, []);
  
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Innerman Pre & Primary School</h1>
        <p>Empowering young minds for a brighter future.</p>
      </section>

      <section className="testimonials">
        <h2>What Our Community Says</h2>
        <blockquote>
          "Innerman School has provided my children with a well-rounded education and a caring environment."
          <cite>- Parent of a Grade 5 student</cite>
        </blockquote>
      </section>

      <section className="highlights">
        <div className="highlight">
          <img src={AchievementImage} alt="Our Achievements" />
          <h2>Our Achievements</h2>
          <p>We are proud of our pupils' academic and extracurricular accomplishments.</p>
        </div>
        <div className="highlight">
          <img src={FacilitiesImage} alt="Facilities" />
          <h2>State-of-the-Art Facilities</h2>
          <p>Explore our modern classrooms, dormitories, and sports facilities.</p>
        </div>
        <div className="highlight">
          <img src={CommunityImage} alt="Community Engagement" />
          <h2>Community Engagement</h2>
          <p>Join us in various community service and outreach programs.</p>
        </div>
      </section>

      <div className="events-section">
        <h2>Upcoming Events</h2>
        <ul>
          {events.map((event, index) => {
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
    </div>
  );
};

export default Home;
