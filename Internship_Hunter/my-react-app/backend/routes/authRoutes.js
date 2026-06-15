const express = require('express');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, collegeName } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    const student = new Student({
      name,
      email,
      password: hashedPassword,
      collegeName,
    });

    await student.save();
    res.status(201).json({ message: 'Student registered successfully', studentId: student._id });
  } catch (error) {
    res.status(500).json({ message: 'Error in signup', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, student.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Store in session
    req.session.studentId = student._id;
    req.session.studentEmail = student.email;

    res.status(200).json({
      message: 'Login successful',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        collegeName: student.collegeName,
        skills: student.skills,
        preferredDomain: student.preferredDomain,
        preferredLocation: student.preferredLocation,
        resumeLink: student.resumeLink,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error in login', error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error in logout' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Get Student Profile
router.get('/profile/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update Student Profile
router.put('/profile/:studentId', async (req, res) => {
  try {
    const { skills, preferredDomain, preferredLocation, resumeLink } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      { skills, preferredDomain, preferredLocation, resumeLink },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

module.exports = router;
