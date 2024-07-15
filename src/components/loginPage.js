import React, { useState } from 'react';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      localStorage.setItem('user_id', data.user_id);

      if (data.user_type === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/applications');
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
