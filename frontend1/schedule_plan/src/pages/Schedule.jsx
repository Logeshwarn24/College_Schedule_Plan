// src/pages/Schedule.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get('http://localhost:5000/schedule', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchedules(res.data);
      } catch (err) {
        console.error('Failed to fetch schedules:', err);
      }
    };

    if (token) fetchSchedules();
    else window.location.href = '/login';
  }, [token]);

  return (
    <div>
      <h2>Schedule (View Only)</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>#</th><th>Month</th><th>Subject</th><th>Name</th><th>College</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length ? schedules.map((s, i) => (
            <tr key={s._id}>
              <td>{i + 1}</td><td>{s.month}</td><td>{s.subject}</td><td>{s.name}</td><td>{s.college}</td>
            </tr>
          )) : <tr><td colSpan="5">No schedules available.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
