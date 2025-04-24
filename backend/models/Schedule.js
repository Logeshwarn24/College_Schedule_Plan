// === BACKEND: models/Schedule.js ===
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  date: String,
  trainername: String,
  collegename: String,
  department_year: String,
  course: String,
  status: String,
  topic: String,
  assignedEmail: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
