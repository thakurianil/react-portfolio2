const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'client'
    });
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login 
// @desc    Auth user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/otp/send
// @desc    Send mock OTP
router.post('/otp/send', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  const otpCode = '123456'; // Mocked fixed code
  const expiresAt = new Date(Date.now() + 5 * 60000); // 5 mins expiry
  
  user.otp = { code: otpCode, expiresAt };
  await user.save();
  
  // In reality, this calls mockServices.sendEmail or Vonage
  res.json({ message: 'OTP sent (mock)' });
});

// @route   POST /api/auth/otp/verify
// @desc    Verify OTP
router.post('/otp/verify', async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.otp || !user.otp.code) return res.status(400).json({ message: 'Invalid request' });
  
  if (user.otp.expiresAt < new Date()) {
    return res.status(400).json({ message: 'OTP expired' });
  }
  
  if (user.otp.code === code) {
    user.otp = undefined; // clear otp
    await user.save();
    return res.json({ token: generateToken(user._id), message: 'OTP verified' });
  }
  
  res.status(400).json({ message: 'Invalid OTP' });
});

// @route   POST /api/auth/oauth/:provider
// @desc    Mock OAuth login
router.post('/oauth/:provider', async (req, res) => {
  const provider = req.params.provider; // 'google', 'facebook', 'apple'
  const { email, name, mockToken } = req.body; // Mock payload we send from frontend

  if (!email || !name) return res.status(400).json({ message: 'Missing fields for mock OAuth' });

  let user = await User.findOne({ email });
  if (!user) {
    // Note: providing dummy password since we enforce it in DB, or we can make it optional in Schema.
    // For simplicity, generate a random hash as a placeholder password.
    const salt = await bcrypt.genSalt(10);
    const mockPassword = await bcrypt.hash('oauth_dummy_' + Date.now().toString(), salt);
    
    user = await User.create({
      name,
      email,
      password: mockPassword,
      role: 'client' // default
    });
  }
  
  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
    provider: provider
  });
});

module.exports = router;
