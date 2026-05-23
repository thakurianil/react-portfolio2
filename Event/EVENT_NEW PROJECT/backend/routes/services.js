const express = require('express');
const { protect } = require('../middleware/auth');
const Service = require('../models/Service');
const router = express.Router();

// @route   GET /api/services
// @desc    Get all active services for the marketplace
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ active: true }).populate('businessProvider', 'name email profileData.companyName');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/services/me
// @desc    Get business's own services
router.get('/me', protect, async (req, res) => {
  if (req.user.role !== 'business') return res.status(403).json({ message: 'Access denied' });
  
  try {
    const services = await Service.find({ businessProvider: req.user._id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/services
// @desc    Create a new service
router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'business') return res.status(403).json({ message: 'Access denied' });
  
  const { title, description, category, price, images } = req.body;
  try {
    const service = await Service.create({
      title,
      description,
      category,
      price,
      images: images || [],
      businessProvider: req.user._id
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service
router.put('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    if (service.businessProvider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service
router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    
    if (service.businessProvider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await service.deleteOne();
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
