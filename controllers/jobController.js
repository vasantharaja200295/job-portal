const Job = require('../models/Job');
const { sendJobAlert } = require('../utils/emailService');

exports.createJob = async (req, res, next) => {
  try {
    const { title, description, experienceLevel, endDate, candidates } = req.body;
    
    // Split the candidates string into an array
    const candidateArray = candidates.split(',').map(email => email.trim());

    const job = await Job.create({
      title,
      description,
      experienceLevel,
      endDate,
      candidates: candidateArray,
      company: req.company.id
    });

    // Send emails to candidates
    for (let email of candidateArray) {
      await sendJobAlert({ email }, job);
    }

    res.status(201).json({ success: true, data: job, message: 'Job created and alerts sent to candidates' });
  } catch (error) {
    next(error);
  }
};



exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ company: req.company.id });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, company: req.company.id });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

