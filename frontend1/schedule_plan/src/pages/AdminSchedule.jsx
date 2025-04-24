// src/pages/AdminSchedule.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    trainername: '',
    collegename: '',
    department_year: '',
    course: '',
    status: '',
    topic: '',
    assignedEmail: ''
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
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/schedule/${editingId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/schedule', formData, config);
      }
      setFormData({
        date: '', trainername: '', collegename: '', department_year: '', course: '',
        status: '', topic: '', assignedEmail: ''
      });
      setEditingId(null);
      fetchSchedules();
    } catch (err) {
      alert(err.response?.data?.message || 'Only admin can modify data.');
    }
  };

  const handleEdit = (schedule) => {
    setEditingId(schedule._id);
    setFormData({
      date: schedule.date || '',
      trainername: schedule.trainername || '',
      collegename: schedule.collegename || '',
      department_year: schedule.department_year || '',
      course: schedule.course || '',
      status: schedule.status || '',
      topic: schedule.topic || '',
      assignedEmail: schedule.assignedEmail || ''
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/schedule/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSchedules();
    } catch (err) {
      alert(err.response?.data?.message || 'Only admin can delete data.');
    }
  };

  return (
    <div>
      <h2>Admin Schedule Management</h2>
      <form onSubmit={handleSubmit} className='admin-schedule-form'>
        <input name="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
        <input name="trainername" value={formData.trainername} onChange={handleChange} placeholder="Trainer Name" required />
        <select name="collegename" value={formData.collegename} onChange={handleChange} required>
          <option value="">Select College</option>
          <option value="Pondicherry University">Pondicherry University</option>
          <option value="Sri Aurobindo International Centre of Education">Sri Aurobindo International Centre of Education</option>
          <option value="Rajiv Gandhi College of Engineering and Technology">Rajiv Gandhi College of Engineering and Technology</option>
          <option value="Sri Manakula Vinayagar Engineering College">Sri Manakula Vinayagar Engineering College</option>
          <option value="Aarupadai Veedu Medical College and Hospital">Aarupadai Veedu Medical College and Hospital</option>
          <option value="Other">Other</option>
        </select>
        <input name="department_year" value={formData.department_year} onChange={handleChange} placeholder="Department/Year" required />
        <input name="course" value={formData.course} onChange={handleChange} placeholder="Course" required />
        <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" required />
        <input name="topic" value={formData.topic} onChange={handleChange} placeholder="Topics" required />
        <input name="assignedEmail" value={formData.assignedEmail} onChange={handleChange} placeholder="Assign to Email" required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Schedule</button>
      </form>

      <table border="1" cellPadding="11">
        <thead>
          <tr>
            <th>Sno.</th><th>Date</th><th>Trainer Name</th><th>College Name</th>
            <th>Department/Year</th><th>Course</th><th>Topic</th><th>Status</th>
            <th>Assigned Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length ? schedules.map((s, i) => (
            <tr key={s._id}>
              <td>{i + 1}</td>
              <td>{s.date}</td>
              <td>{s.trainername}</td>
              <td>{s.collegename}</td>
              <td>{s.department_year}</td>
              <td>{s.course}</td>
              <td>{s.topic}</td>
              <td>{s.status}</td>
              <td>{s.assignedEmail}</td>
              <td>
                <button onClick={() => handleEdit(s)}>Edit</button>
                <button onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="10">No schedules available.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSchedule;
