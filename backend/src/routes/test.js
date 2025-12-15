const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');
const { TRANSACTION_TYPES } = require('../utils/constants');

// Test user creation
router.post('/create-user', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Create wallet for user
    const wallet = await Wallet.create({ user: user._id });

    res.status(201).json({
      success: true,
      message: 'User and wallet created successfully',
      data: {
        user: user.getPublicProfile(),
        wallet
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Test get all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Test get all wallets
router.get('/wallets', async (req, res, next) => {
  try {
    const wallets = await Wallet.find().populate('user', 'name email');
    res.json({
      success: true,
      count: wallets.length,
      data: wallets
    });
  } catch (error) {
    console.error('Get wallets error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Test create transaction
router.post('/transaction', async (req, res, next) => {
  try {
    const { userId, amount, type, description } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }

    // Calculate new balance
    let newBalance = wallet.balance;
    if (type === TRANSACTION_TYPES.DEPOSIT) {
      newBalance += amount;
    } else if (type === TRANSACTION_TYPES.WITHDRAWAL) {
      newBalance -= amount;
    }

    // Check sufficient funds for withdrawal
    if (type === TRANSACTION_TYPES.WITHDRAWAL && !wallet.hasSufficientFunds(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient funds'
      });
    }

    // Create transaction
    const transaction = await Transaction.create({
      wallet: wallet._id,
      user: userId,
      type,
      amount,
      description,
      balanceAfter: newBalance
    });

    // Update wallet balance
    await wallet.updateBalance(type === TRANSACTION_TYPES.DEPOSIT ? amount : -amount);

    res.status(201).json({
      success: true,
      data: {
        transaction,
        newBalance: wallet.balance
      }
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Test get all transactions
router.get('/transactions', async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate('user', 'name email')
      .populate('wallet', 'balance')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;