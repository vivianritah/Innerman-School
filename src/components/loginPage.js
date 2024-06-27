import React, { useState } from 'react';
import './loginPage.css';

const Login = () => {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [biography, setBiography] = useState('');
  const [userType, setUserType] = useState('');
  const [image, setImage] = useState(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic, such as sending the data to a server or logging in the user
    console.log({
      firstName,
      lastName,
      otherName,
      email,
      contact,
      password,
      biography,
      userType,
      image,
    });
    alert('Form submitted successfully!');
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <label>
          Other Name:
          <input type="text" value={otherName} onChange={(e) => setOtherName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contact:
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Biography:
          <textarea value={biography} onChange={(e) => setBiography(e.target.value)} />
        </label>
        <label>
          User Type:
          <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="">Select User Type</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
