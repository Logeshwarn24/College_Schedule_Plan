import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      const { token, role } = res.data;

      if (token && role) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);

        navigate(role === 'admin' ? '/admin' : '/schedule');
      } else {
        setErrorMsg('Unexpected server response. Please try again.');
      }

    } catch (err) {
      // Better error handling
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setErrorMsg(message);
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="form">
      <h2>Login</h2>

      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
