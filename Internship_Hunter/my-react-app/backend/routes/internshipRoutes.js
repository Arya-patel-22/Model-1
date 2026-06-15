const express = require('express');
const Internship = require('../models/Internship');
const router = express.Router();

// Get all internships with optional filtering
router.get('/', async (req, res) => {
  try {
    const { domain, location, search } = req.query;
    let query = {};

    if (domain) {
      query.domain = domain;
    }
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    if (search) {
      query.$or = [
        { companyName: new RegExp(search, 'i') },
        { role: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const internships = await Internship.find(query).sort({ createdAt: -1 });
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internships', error: error.message });
  }
});

// Get single internship by ID
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.status(200).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internship', error: error.message });
  }
});

// Create internship (Admin only)
router.post('/', async (req, res) => {
  try {
    const {
      companyName,
      role,
      domain,
      requiredSkills,
      location,
      stipend,
      duration,
      applyLink,
      description,
      companyLogo,
    } = req.body;

    const internship = new Internship({
      companyName,
      role,
      domain,
      requiredSkills: requiredSkills || [],
      location,
      stipend,
      duration,
      applyLink,
      description: description || '',
      companyLogo: companyLogo || '',
    });

    await internship.save();
    res.status(201).json({ message: 'Internship created successfully', internship });
  } catch (error) {
    res.status(500).json({ message: 'Error creating internship', error: error.message });
  }
});

// Update internship (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const {
      companyName,
      role,
      domain,
      requiredSkills,
      location,
      stipend,
      duration,
      applyLink,
      description,
      companyLogo,
    } = req.body;

    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      {
        companyName,
        role,
        domain,
        requiredSkills: requiredSkills || [],
        location,
        stipend,
        duration,
        applyLink,
        description: description || '',
        companyLogo: companyLogo || '',
      },
      { new: true }
    );

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.status(200).json({ message: 'Internship updated successfully', internship });
  } catch (error) {
    res.status(500).json({ message: 'Error updating internship', error: error.message });
  }
});

// Delete internship (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const internship = await Internship.findByIdAndDelete(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.status(200).json({ message: 'Internship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting internship', error: error.message });
  }
});

module.exports = router;
