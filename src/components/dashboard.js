// Dashboard.js
import React, { useState, useEffect } from 'react';
import './dashboard.css';

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
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApplications = applications.filter(application =>
    `${application.first_name} ${application.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <table className="data-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.user_type}</td>
                  <td>{user.isadmin ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h3>Applications</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Other Name</th>
                <th>Date of Birth</th>
                <th>Previous School</th>
                <th>Math Grade</th>
                <th>English Grade</th>
                <th>Current Level</th>
                <th>Admission Year</th>
                <th>Guardian Name</th>
                <th>Guardian Contact</th>
                <th>Guardian Email</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application, index) => (
                <tr key={index}>
                  <td>{application.first_name}</td>
                  <td>{application.last_name}</td>
                  <td>{application.other_name || 'N/A'}</td>
                  <td>{new Date(application.date_of_birth).toLocaleDateString()}</td>
                  <td>{application.name_of_previous_school}</td>
                  <td>{application.previous_math_grade}</td>
                  <td>{application.previous_english_grade}</td>
                  <td>{application.current_level}</td>
                  <td>{application.year_of_admission}</td>
                  <td>{application.guardian_full_name || 'N/A'}</td>
                  <td>{application.guardian_contact || 'N/A'}</td>
                  <td>{application.guardian_email || 'N/A'}</td>
                  <td>{new Date(application.created_at).toLocaleDateString()}</td>
                  <td>{new Date(application.updated_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h3>Events</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
