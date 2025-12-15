const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getProfile,
  updateProfile
} = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');

// Profile update validation
const profileValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
];

// Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, validate(profileValidation), updateProfile);

module.exports = router;