const express = require('express');
const { register, verifyEmail, login, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
