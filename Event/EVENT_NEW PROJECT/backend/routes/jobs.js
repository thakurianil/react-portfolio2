const express = require('express');
const { protect } = require('../middleware/auth');
const JobRequest = require('../models/JobRequest');
const Service = require('../models/Service');
const router = express.Router();

// @route   GET /api/jobs
// @desc    Get jobs for the logged in user
router.get('/', protect, async (req, res) => {
  try {
    let jobs;
    if (req.user.role === 'client') {
      jobs = await JobRequest.find({ client: req.user._id })
                             .populate('service', 'title price')
                             .populate('businessProvider', 'name profileData.companyName')
                             .sort('-createdAt');
    } else if (req.user.role === 'business') {
      jobs = await JobRequest.find({ businessProvider: req.user._id })
                             .populate('service', 'title price')
                             .populate('client', 'name email profileData.phone')
                             .sort('-createdAt');
    } else {
      jobs = await JobRequest.find().sort('-createdAt');
    }
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/jobs
// @desc    Client creates a new job request
router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'client') return res.status(403).json({ message: 'Only clients can request jobs' });
  
  const { serviceId, date, details } = req.body;
  try {
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    const job = await JobRequest.create({
      client: req.user._id,
      service: service._id,
      businessProvider: service.businessProvider,
      date,
      details
    });
    
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/jobs/:id/status
// @desc    Business updates job status
router.put('/:id/status', protect, async (req, res) => {
  if (req.user.role !== 'business') return res.status(403).json({ message: 'Only businesses can update status' });
  
  const { status } = req.body;
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    if (job.businessProvider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized for this job' });
    }
    
    job.status = status;
    const updated = await job.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
