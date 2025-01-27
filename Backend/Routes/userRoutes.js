const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Import Mongoose model
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
 

// Signup Route
router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body;
  
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Server error. Please try again.' });
    }
  });
  
  // Login Route
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password.' });
      }
  
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
      
      res.status(200).json({
        message: 'Login successful.',
        user: { fullname: user.fullname, email: user.email },
        token,
      });
    } catch (error) {
      console.error('Error during login:', error); // Add this line
      res.status(500).json({ message: 'Server error. Please try again.' });
    }
  });
  
  module.exports = router;