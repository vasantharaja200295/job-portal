const express = require('express');
const { createJob, getJobs, getJob } = require('../controllers/jobController');
const protect = require('../middleware/auth');
const router = express.Router();

router.use(protect);

router.route('/')
  .post(createJob)
  .get(getJobs);

router.route('/:id')
  .get(getJob);

module.exports = router;
