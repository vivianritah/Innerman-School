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
  const [englishGrade, setEnglishGrade] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [yearOfAdmission, setYearOfAdmission] = useState('');
  const [guardianFullName, setGuardianFullName] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch user data from local storage
    const accessToken = localStorage.getItem('access_token');
    const storedUserId = localStorage.getItem('user_id');

    if (!accessToken) {
      navigate('/login');
    } else if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('User ID not found in local storage');
      showNotification('User ID not found. Please log in again.');
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      showNotification('User ID is required.');
      return;
    }

    const formData = {
      first_name: firstName,
      last_name: lastName,
      other_name: otherName,
      date_of_birth: dob,
      name_of_previous_school: previousSchool,
      previous_math_grade: mathGrade,
      previous_english_grade: englishGrade,
      current_level: currentLevel,
      year_of_admission: yearOfAdmission,
      guardian_full_name: guardianFullName,
      guardian_contact: guardianContact,
      guardian_email: guardianEmail,
      user_id: userId
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/application/register', {
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
          <input type="number" value={mathGrade} onChange={(e) => setMathGrade(e.target.value)} required />
        </label>
        <label>Previous English Grade:
          <input type="number" value={englishGrade} onChange={(e) => setEnglishGrade(e.target.value)} required />
        </label>
        <label>Current Level:
          <input type="text" value={currentLevel} onChange={(e) => setCurrentLevel(e.target.value)} required />
        </label>
        <label>Year of Admission:
          <input type="number" value={yearOfAdmission} onChange={(e) => setYearOfAdmission(e.target.value)} required />
        </label>
        <label>Guardian Full Name:
          <input type="text" value={guardianFullName} onChange={(e) => setGuardianFullName(e.target.value)} required />
        </label>
        <label>Guardian Contact:
          <input type="text" value={guardianContact} onChange={(e) => setGuardianContact(e.target.value)} required />
        </label>
        <label>Guardian Email:
          <input type="email" value={guardianEmail} onChange={(e) => setGuardianEmail(e.target.value)} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Applications;
