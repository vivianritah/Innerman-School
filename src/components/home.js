import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import AchievementImage from '../images/background3.jpg';
import FacilitiesImage from '../images/background5.jpg';
import CommunityImage from '../images/image7.jpg';

const Home = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorEvent, setErrorEvent] = useState(null);
  const [errorEvents, setErrorEvents] = useState(null);

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axios.post('http://127.0.0.1:5000/api/v1/auth/refresh', {
        refresh_token: refreshToken,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      return access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new Error('Unable to refresh token');
    }
  };

  const fetchEvent = useCallback(async (id) => {
    setLoadingEvent(true);
    try {
      let access_token = localStorage.getItem('access_token');
      if (!access_token) {
        throw new Error('No token found');
      }
      console.log('Access Token:', access_token); // Log the token for debugging
  
      const response = await axios.get(`http://127.0.0.1:5000/api/v1/events/${id}`, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      setEvent(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          const response = await axios.get(`http://127.0.0.1:5000/api/v1/events/${id}`, {
            headers: {
              'Authorization': `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          setEvent(response.data);
        } catch (refreshError) {
          setErrorEvent(refreshError.message);
          console.error('Error refreshing token and fetching event:', refreshError);
        }
      } else {
        setErrorEvent(error.message);
        console.error('Error fetching event:', error);
      }
    } finally {
      setLoadingEvent(false);
    }
  }, []);

  const fetchEvents = useCallback(async () => {
    setLoadingEvents(true);
    try {
      let access_token = localStorage.getItem('access_token');
      if (!access_token) {
        throw new Error('No token found');
      }
      console.log('Access Token:', access_token); // Log the token for debugging
  
      const response = await axios.get('http://127.0.0.1:5000/api/v1/events/get_event', {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      setEvents(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          const response = await axios.get('http://127.0.0.1:5000/api/v1/events/get_event', {
            headers: {
              'Authorization': `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          });
          setEvents(response.data);
        } catch (refreshError) {
          setErrorEvents(refreshError.message);
          console.error('Error refreshing token and fetching events:', refreshError);
        }
      } else {
        setErrorEvents(error.message);
        console.error('Error fetching events:', error);
      }
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId);
    }
    fetchEvents();
  }, [eventId, fetchEvent, fetchEvents]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return { day, month, year };
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return { day: 'N/A', month: 'N/A', year: 'N/A' };
    }
  };

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

      {eventId && (
        <div className="event-details-section">
          {loadingEvent ? (
            <p>Loading event details...</p>
          ) : errorEvent ? (
            <p>Error: {errorEvent}</p>
          ) : (
            event && (
              <div className="event-details">
                <h2>Event Details</h2>
                <strong>{event.name}</strong>
                <p>{event.description}</p>
                <p className="event-time">
                  {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="event-location">{event.location}</p>
              </div>
            )
          )}
        </div>
      )}

      <div className="events-section">
        <h2>Upcoming Events</h2>
        {loadingEvents ? (
          <p>Loading events...</p>
        ) : errorEvents ? (
          <p>Error: {errorEvents}</p>
        ) : (
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
                    <strong>{event.name}</strong>
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
        )}
      </div>
    </div>
  );
};

export default Home;
