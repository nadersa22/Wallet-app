const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  getMyWallet,
  updateCurrency
} = require('../controllers/walletController');
const { protect } = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');

// Currency validation
const currencyValidation = [
  body('currency')
    .trim()
    .notEmpty()
    .withMessage('Currency is required')
    .isLength({ min: 3, max: 3 })
    .withMessage('Currency must be 3 characters (e.g., USD, EUR)')
    .isUppercase()
    .withMessage('Currency must be uppercase')
];

// Routes
router.get('/my-wallet', protect, getMyWallet);
router.put('/currency', protect, validate(currencyValidation), updateCurrency);

module.exports = router;