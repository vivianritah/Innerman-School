import React, { useState } from 'react';
import './loginPage.css';

const Login = () => {
  // Form state
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic, such as sending the data to a server or logging in the user
    console.log({
      email,
      password,
    });
    alert('Form submitted successfully!');
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {/* <label>
          User Type:
          <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="">Select User Type</option>
            <option value="student">Administrator</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
          </select>
        </label> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
