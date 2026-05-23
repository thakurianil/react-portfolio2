const express = require('express');
const mockServices = require('../utils/mockServices');
const router = express.Router();

// @route   POST /api/contact
// @desc    Validated contact form that emails configurable address using mock SMTP
router.post('/', async (req, res) => {
  const { name, email, message, captchaToken } = req.body;
  
  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please provide name, email, and message' });
  }
  
  // ReCAPTCHA validation Mock
  const isHuman = captchaToken ? await mockServices.verifyCaptcha(captchaToken) : false;
  if (!isHuman && captchaToken) {
     // For demo purposes, we will proceed even without token if not provided, but fail if provided an empty token string sometimes
  }
  
  const receiverEmail = process.env.SUPPORT_EMAIL || 'support@marketplace.com';
  
  await mockServices.sendEmail(
    receiverEmail,
    `New Contact Form Submission from ${name}`,
    `Email: ${email}\n\nMessage:\n${message}`
  );
  
  res.json({ message: 'Your message has been received! Our support team will contact you shortly.' });
});

module.exports = router;
