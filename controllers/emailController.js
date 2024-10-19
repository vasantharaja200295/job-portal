const Job = require('../models/Job');
const { sendJobAlert } = require('../utils/emailService');

exports.sendJobAlerts = async (req, res, next) => {
  try {
    const { jobId } = req.params;  // Get jobId from route parameters
    const { candidates } = req.body;

    const job = await Job.findOne({ _id: jobId, company: req.company.id });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    for (let candidate of candidates) {
      await sendJobAlert(candidate, job);
    }

    job.candidates.push(...candidates);
    await job.save();

    res.status(200).json({ success: true, message: 'Job alerts sent successfully' });
  } catch (error) {
    next(error);
  }
};