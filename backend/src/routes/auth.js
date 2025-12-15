const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { signup, login, getMe, logout } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');

// Signup validation rules
const signupValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Login validation rules
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Routes
router.post('/signup', validate(signupValidation), signup);
router.post('/login', validate(loginValidation), login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);

module.exports = router;