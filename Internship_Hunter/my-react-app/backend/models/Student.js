const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    preferredDomain: {
      type: String,
      enum: [
        'Frontend Development',
        'Backend Development',
        'MERN Stack',
        'Python Development',
        'Data Science',
        'Artificial Intelligence',
        'UI/UX Design',
      ],
      default: '',
    },
    preferredLocation: {
      type: String,
      default: '',
    },
    resumeLink: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
