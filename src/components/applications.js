import React, { useState, useEffect } from 'react';
import './application.css';
import { showNotification } from './notification';
import { useNavigate } from 'react-router-dom';

function Applications() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [dob, setDob] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [mathGrade, setMathGrade] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      otherName,
      dob,
      previousSchool,
      mathGrade,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      showNotification('Your application has been submitted!');
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
      showNotification('Failed to submit your application.');
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Redirect or handle unauthenticated user
      navigate('/login'); // Example redirection to login page
    }
  }, [navigate]);

  return (
    <div className="application">
      <h1 className="application-title">Please Fill This Application Form</h1>
      <form className="application-form" onSubmit={handleSubmit}>
        <label>First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>Other Name:
          <input type="text" value={otherName} onChange={(e) => setOtherName(e.target.value)} />
        </label>
        <label>Date of Birth:
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
        </label>
        <label>Name of Previous School:
          <input type="text" value={previousSchool} onChange={(e) => setPreviousSchool(e.target.value)} required />
        </label>
        <label>Previous Math Grade:
          <input type="text" value={mathGrade} onChange={(e) => setMathGrade(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Applications;
