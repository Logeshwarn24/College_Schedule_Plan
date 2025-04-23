// routes/auth.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare the password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(403).json({ message: 'Invalid password' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      'secret_key',  // Change 'secret_key' to a strong secret in production
      { expiresIn: '1d' } // Optional: Token expiration time (e.g., 1 day)
    );

    // Send response with the token and user info
    res.status(200).json({
      message: 'Login successful',
      token,
      role: user.role, // Include role in the response
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
