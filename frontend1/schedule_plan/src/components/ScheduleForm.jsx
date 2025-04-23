import React, { useState } from 'react';
import axios from 'axios';

const ScheduleForm = ({ refresh }) => {
  const [sno, setSno] = useState('')
  const [month, setMonth] = useState('')
  const [subject, setSubject] = useState('')
  const [name, setName] = useState('')
  const [college, setCollege] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/schedule', {sno, month, name, subject, college}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSno('');
    setMonth('');
    setName('');
    setSubject('');
    setCollege('');
    refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="sno"
        placeholder="Serial No"
        value={sno}
        onChange={(e)=> setSno(e.target.value)}
        required
      />
      <input
        type="text"
        name="month"
        placeholder="Month"
        value={month}
        onChange={(e)=> setMonth(e.target.value)}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={subject}
        onChange={(e)=> setSubject(e.target.value)}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e)=> setName(e.target.value)}
        required
      />
      <input
        type="text"
        name="college"
        placeholder="College"
        value={college}
        onChange={(e)=> setCollege(e.target.value)}
        required
      />
      <button type="submit">Add Schedule</button>
    </form>
  );
};

export default ScheduleForm;
