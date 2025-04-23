// src/pages/AdminSchedule.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    month: '',
    subject: '',
    name: '',
    college: '',
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  const fetchSchedules = async () => {
    try {
      const res = await axios.get('http://localhost:5000/schedule', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchedules(res.data);
    } catch (err) {
      console.error('Error fetching schedules:', err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/schedule/${editingId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/schedule', formData, config);
      }

      setFormData({ month: '', subject: '', name: '', college: '' });
      setEditingId(null);
      fetchSchedules();
    } catch (err) {
      alert('Only admin can modify data.');
    }
  };

  const handleEdit = (schedule) => {
    setEditingId(schedule._id);
    setFormData({
      month: schedule.month,
      subject: schedule.subject,
      name: schedule.name,
      college: schedule.college,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/schedule/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSchedules();
    } catch (err) {
      alert('Only admin can delete data.');
    }
  };

  return (
    <div>
      <h2>Admin Schedule Management</h2>
      <form onSubmit={handleSubmit} className='admin-schedule-form '>
        <input name="month" value={formData.month} onChange={handleChange} placeholder="Month" required />
        <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required /> 
        <select
          name="college"
          value={formData.college}
          onChange={handleChange}
          required
        >
          <option value="">Select College</option>
          <option value="Pondicherry University">Pondicherry University</option>
          <option value="Sri Aurobindo International Centre of Education">Sri Aurobindo International Centre of Education</option>
          <option value="Rajiv Gandhi College of Engineering and Technology">Rajiv Gandhi College of Engineering and Technology</option>
          <option value="Sri Manakula Vinayagar Engineering College">Sri Manakula Vinayagar Engineering College</option>
          <option value=" Aarupadai Veedu Medical College and Hospital">Aarupadai Veedu Medical College and Hospital</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'} Schedule</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>#</th><th>Month</th><th>Subject</th><th>Name</th><th>College</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length ? schedules.map((s, i) => (
            <tr key={s._id}>
              <td>{i + 1}</td>
              <td>{s.month}</td>
              <td>{s.subject}</td>
              <td>{s.name}</td>
              <td>{s.college}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="6">No schedules available.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSchedule;
