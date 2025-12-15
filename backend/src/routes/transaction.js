const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  deposit,
  withdraw,
  transfer,
  getTransactions,
  getTransactionSummary
} = require('../controllers/transactionController');
const { protect } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');

// Deposit validation
const depositValidation = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least 0.01'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters')
];

// Withdrawal validation
const withdrawValidation = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least 0.01'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters')
];

// Transfer validation
const transferValidation = [
  body('recipientEmail')
    .trim()
    .notEmpty()
    .withMessage('Recipient email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be at least 0.01'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters')
];

// Routes
router.post('/deposit', protect, validate(depositValidation), deposit);
router.post('/withdraw', protect, validate(withdrawValidation), withdraw);
router.post('/transfer', protect, validate(transferValidation), transfer);
router.get('/', protect, getTransactions);
router.get('/summary', protect, getTransactionSummary);

module.exports = router;