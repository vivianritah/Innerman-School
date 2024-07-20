import React, { useState, useEffect } from 'react';
import './home.css';
import AchievementImage from '../images/background3.jpg';
import FacilitiesImage from '../images/background5.jpg';
import CommunityImage from '../images/image7.jpg';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/events/get_event', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMTM4NzIxNSwianRpIjoiMjllN2JlMmQtMWUwZS00YjRkLWFjMzctYzY1MDAyMTAxMjRiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6OCwibmJmIjoxNzIxMzg3MjE1LCJjc3JmIjoiOWZiNTY5NzMtNDdhMi00ZTlhLWEyYjMtNTU4MWExMzAxN2NlIiwiZXhwIjoxNzIxMzg4MTE1fQ.lB7O0jajTMb2uJIQAJpOWSQkZPIWgCKNlu63fiXVhys`, // Replace with your token
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'An error occurred');
        });
      })
      .then(data => {
        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.error('Unexpected data format:', data);
          setData([]);
        }
      })
      .catch(err => {
        console.log('Fetch error:', err);
        setData([]);
      });
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
          <img src={CommunityImage} alt="Community" />
          <h2>Community Engagement</h2>
          <p>Join our community events and be a part of our family.</p>
        </div>
      </section>

      <div className="events-section">
        <h2>Upcoming Events</h2>
        <ul>
          {data.length > 0 ? (
            data.map((event, index) => {
              const eventDate = new Date(event.date);
              const day = eventDate.getDate();
              const month = eventDate.toLocaleString('default', { month: 'short' });
              const year = eventDate.getFullYear();

              return (
                <li key={index} className="event-item">
                  <div className="event-date">
                    <div className="month">{month}</div>
                    <div className="day">{day}</div>
                    <div className="year">{year}</div>
                  </div>
                  <div className="event-details">
                    <strong>{event.name}</strong>
                    <p>{event.description}</p>
                    <p className="event-time">
                      {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="event-location">{event.location}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <p>No events available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
