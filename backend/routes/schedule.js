// === BACKEND: routes/schedule.js ===
const express = require('express');
const Schedule = require('../models/Schedule');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const schedules = req.user.role === 'admin'
      ? await Schedule.find()
      : await Schedule.find({ assignedEmail: req.user.email });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch schedules', error: error.message });
  }
});

router.post('/', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const schedule = new Schedule({ ...req.body, userId: req.user.id });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create schedule', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Schedule not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update schedule', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.status(200).json({ message: 'Schedule deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete schedule', error: error.message });
  }
});

module.exports = router;
