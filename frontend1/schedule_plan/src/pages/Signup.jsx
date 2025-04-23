import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', {
        email,
        password,
        role,
      });
      navigate('/');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup} className="form">
      <h2>Signup</h2>
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
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
