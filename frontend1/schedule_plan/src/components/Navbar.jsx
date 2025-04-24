/// File: src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <h2>Schedule Planning</h2>
    <div>
      <Link to="/">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  </nav>
);

export default Navbar;
