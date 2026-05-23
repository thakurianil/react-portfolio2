const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const mockServices = require('../utils/mockServices');
const router = express.Router();

// Special Endpoint returning status 99 (requested requirement)
router.get('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  // If user profileData is missing some critical fields, return 99 to trigger modal on frontend
  if (!user.profileData || !user.profileData.phone || !user.profileData.address) {
    return res.status(99).json({ message: 'Profile incomplete. Please edit your profile.', user });
  }
  res.json(user);
});

router.put('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.profileData = {
      ...user.profileData,
      phone: req.body.phone || user.profileData?.phone,
      address: req.body.address || user.profileData?.address,
      companyName: req.body.companyName || user.profileData?.companyName
    };
    const updated = await user.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// @route   DELETE /api/user/delete
// @desc    Delete user account and send confirmation email to configurable address
router.delete('/delete', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const emailToLog = process.env.ADMIN_NOTIFY_EMAIL || 'admin@marketplace.com';
    
    // Simulate SMTP email for account deletion
    await mockServices.sendEmail(
      emailToLog,
      `Account Deleted: ${user.email}`,
      `User ${user.email} (${user.role}) has deleted their account.`
    );
    
    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
