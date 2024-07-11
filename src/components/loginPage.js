import React, { useState } from 'react';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'An error occurred');
        return;
      }

      console.log('Login successful:', data);
      alert('Login successful!');
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user_id', data.user_id); // Storing user_id in localStorage

      // Redirect logic based on user type or condition
      if (data.user_type === 'admin') {
        navigate('/dashboard'); // Redirect to admin dashboard
      } else {
        navigate('/applications'); // Redirect to user applications page
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
