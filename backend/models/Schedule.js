const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  sno: Number,
  month: String,
  subject: String,
  name: String,
  college: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
