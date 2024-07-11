import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
    fetchUsers();
    fetchApplications();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/applications');
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = applications.filter(application =>
    application.user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userChartData = {
    labels: users.map(user => user.name),
    datasets: [
      {
        label: 'Authenticated Users',
        data: users.map(user => user.authenticated ? 1 : 0),
        backgroundColor: 'rgba(75,192,192,1)',
      }
    ]
  };

  const applicationChartData = {
    labels: applications.map(application => application.date),
    datasets: [
      {
        label: 'Applications Over Time',
        data: applications.map(application => application.count),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      }
    ]
  };

  return (
    <div className="dashboard">
      <h2>School Dashboard</h2>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>Search Users and Applications</h3>
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="dashboard-section">
          <h3>Users</h3>
          <ul className="user-list">
            {filteredUsers.map((user, index) => (
              <li key={index} className="user-item">
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section">
          <h3>Applications</h3>
          <ul className="application-list">
            {filteredApplications.map((application, index) => (
              <li key={index} className="application-item">
                <strong>{application.user_name}</strong> - {application.date}
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-section">
          <h3>Authenticated Users</h3>
          <Bar data={userChartData} />
        </div>

        <div className="dashboard-section">
          <h3>Applications Over Time</h3>
          <Line data={applicationChartData} />
        </div>

        <div className="dashboard-section">
          <h3>Events</h3>
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index} className="event-item">
                <strong>{event.date}</strong> - {event.name}
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
