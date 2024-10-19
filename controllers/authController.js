const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/emailService');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;

    const company = await Company.create({
      name,
      email,
      password,
      mobile,
      verificationToken: crypto.randomBytes(20).toString('hex')
    });

    await sendVerificationEmail(company.email, company.verificationToken);

    res.status(201).json({ success: true, message: 'Company registered. Please check your email to verify your account.' });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const company = await Company.findOne({ verificationToken: req.params.token });

    if (!company) {
      return res.status(400).json({ success: false, message: 'Invalid verification token' });
    }

    company.isVerified = true;
    company.verificationToken = undefined;
    await company.save();

    res.status(200).json({ success: true, message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });

    if (!company || !(await company.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!company.isVerified) {
      return res.status(401).json({ success: false, message: 'Please verify your email before logging in' });
    }

    const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

