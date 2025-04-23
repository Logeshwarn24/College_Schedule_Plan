import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Schedule from './pages/Schedule';
import AdminSchedule from './pages/AdminSchedule';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/adminschedule" element={<AdminSchedule />} />
        <Route path="/admin" element={<AdminSchedule />} />
      </Routes>
    </Router>
  );
}

export default App;
