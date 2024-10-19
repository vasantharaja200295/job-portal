// routes/emails.js
const express = require('express');
const { sendJobAlerts } = require('../controllers/emailController');
const protect = require('../middleware/auth');
const router = express.Router();

router.use(protect);

router.post('/job-alerts/:jobId', sendJobAlerts);

module.exports = router;