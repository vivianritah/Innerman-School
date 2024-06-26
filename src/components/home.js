import React from 'react';
import schoolEvents from '../components/events'; // Ensure the path is correct
import './home.css'; // Ensure the file exists

// Importing images from src
import AchievementImage from '../images/background3.jpg';
import FacilitiesImage from '../images/background5.jpg';
import CommunityImage from '../images/image7.jpg';


// Ensure paths are correct. Avoid importing images directly from public folder.
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
    <div className="home-page">
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

      {/* Highlights Section */}
      <section className="highlights">
        <div className="highlight">
          <img src={AchievementImage} alt="Our Achievements" />
          <h2>Our Achievements</h2>
          <p>We are proud of our students' academic and extracurricular accomplishments.</p>
        </div>
        <div className="highlight">
          <img src={FacilitiesImage} alt="Facilities" />
          <h2>State-of-the-Art Facilities</h2>
          <p>Explore our modern classrooms, laboratories, and sports facilities.</p>
        </div>
        <div className="highlight">
          <img src={CommunityImage} alt="Community Engagement" /> {/* Use public path directly */}
          <h2>Community Engagement</h2>
          <p>Join us in various community service and outreach programs.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
