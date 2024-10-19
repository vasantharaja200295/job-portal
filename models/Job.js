const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['Entry', 'Intermediate', 'Senior']
  },
  candidates: [{
    type: String,
    required: true,
    trim: true
  }],
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);