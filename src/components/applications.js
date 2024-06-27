import React, { useState } from 'react';
import './application.css';
import { showNotification } from './notification';

function Applications() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [dob, setDob] = useState("");
  const [previousSchool, setPreviousSchool] = useState("");
  const [mathGrade, setMathGrade] = useState("");
  const [englishGrade, setEnglishGrade] = useState("");
  const [scienceGrade, setScienceGrade] = useState("");
  const [currentClassLevel, setCurrentClassLevel] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`
      First Name: ${firstName}
      Last Name: ${lastName}
      Other Name: ${otherName}
      Date of Birth: ${dob}
      Previous School: ${previousSchool}
      Previous Math Grade: ${mathGrade}
      Previous English Grade: ${englishGrade}
      Previous Science Grade: ${scienceGrade}
      Current Class Level: ${currentClassLevel}
      Guardian Full Name: ${guardianName}
      Guardian Contact: ${guardianContact}
      Guardian Email: ${guardianEmail}
    `);
    showNotification('Your application has been submitted!');
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
          <input type="text" value={mathGrade} onChange={(e) => setMathGrade(e.target.value)} required />
        </label>
        <label>Previous English Grade:
          <input type="text" value={englishGrade} onChange={(e) => setEnglishGrade(e.target.value)} required />
        </label>
        <label>Previous Science Grade:
          <input type="text" value={scienceGrade} onChange={(e) => setScienceGrade(e.target.value)} required />
        </label>
        <label>Current Class Level:
          <input type="text" value={currentClassLevel} onChange={(e) => setCurrentClassLevel(e.target.value)} required />
        </label>
        <label>Guardian Full Name:
          <input type="text" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} required />
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
