import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [fees, setFees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newEvent, setNewEvent] = useState({ date: '', name: '', description: '', location: '' });
  const [editIndex, setEditIndex] = useState(-1);
  const [editedFees, setEditedFees] = useState({
    class_name: '',
    day: '',
    boarding: '',
    registration: '',
    uniformDay: '',
    uniformBoarding: ''
  });

  useEffect(() => {
    fetchEvents();
    fetchUsers();
    fetchApplications();
    fetchFees();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/events/get_event');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUsers = () => {
    axios.get('http://127.0.0.1:5000/api/v1/users')
      .then(response => {
        console.log('Fetched users:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      });
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

  const fetchFees = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/admissions/');
      if (!response.ok) {
        throw new Error('Failed to fetch fees structure');
      }
      const data = await response.json();
      setFees(data);
    } catch (error) {
      console.error('Error fetching fees structure:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFees({ ...editedFees, [name]: value });
  };

  const addEvent = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error('Failed to add event');
      }
      fetchEvents();
      setNewEvent({ date: '', name: '', description: '', location: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const editFees = (index) => {
    setEditIndex(index);
    setEditedFees({
      class_name: fees[index].class,
      day: fees[index].fees.day,
      boarding: fees[index].fees.boarding,
      registration: fees[index].fees.registration,
      uniformDay: fees[index].fees.uniformDay,
      uniformBoarding: fees[index].fees.uniformBoarding
    });
  };

  const updateFees = async (index) => {
    const feeId = fees[index]?.id;
    
    if (feeId === undefined) {
      console.error('Fee ID is undefined');
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/admissions/${feeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          class: editedFees.class_name,
          fees: {
            day: editedFees.day,
            boarding: editedFees.boarding,
            registration: editedFees.registration,
            uniformDay: editedFees.uniformDay,
            uniformBoarding: editedFees.uniformBoarding
          }
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update fees structure');
      }
  
      // Refresh the fees data
      await fetchFees(); 
      setEditIndex(-1); // Exit edit mode
    } catch (error) {
      console.error('Error updating fees structure:', error);
    }
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{event.name}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>
                    <button onClick={() => deleteEvent(event.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-event-form">
            <h3>Add New Event</h3>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Event Location"
              value={newEvent.location}
              onChange={handleInputChange}
            />
            <button onClick={addEvent}>Add Event</button>
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Fees Structure</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Tuition Fees (Day)</th>
                <th>Tuition Fees (Boarding)</th>
                <th>Registration Fees</th>
                <th>Day Uniform Fees</th>
                <th>Boarding Uniform Fees</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fees.length === 0 ? (
                <tr>
                  <td colSpan="7">No fees data available.</td>
                </tr>
              ) : (
                fees.map((item, index) => (
                  <tr key={index}>
                    <td>{item.class}</td>
                    <td>{item.fees.day || '-'}</td>
                    <td>{item.fees.boarding || '-'}</td>
                    <td>{item.fees.registration || '-'}</td>
                    <td>{item.fees.uniformDay || '-'}</td>
                    <td>{item.fees.uniformBoarding || '-'}</td>
                    <td>
                      {editIndex === index ? (
                        <div>
                          <input
                            type="text"
                            name="class_name"
                            value={editedFees.class_name}
                            onChange={handleEditInputChange}
                          />
                          <input
                            type="text"
                            name="day"
                            value={editedFees.day}
                            onChange={handleEditInputChange}
                          />
                          <input
                            type="text"
                            name="boarding"
                            value={editedFees.boarding}
                            onChange={handleEditInputChange}
                          />
                          <input
                            type="text"
                            name="registration"
                            value={editedFees.registration}
                            onChange={handleEditInputChange}
                          />
                          <input
                            type="text"
                            name="uniformDay"
                            value={editedFees.uniformDay}
                            onChange={handleEditInputChange}
                          />
                          <input
                            type="text"
                            name="uniformBoarding"
                            value={editedFees.uniformBoarding}
                            onChange={handleEditInputChange}
                          />
                          <button onClick={() => updateFees(index)}>Save</button>
                        </div>
                      ) : (
                        <button onClick={() => editFees(index)}>Edit</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
