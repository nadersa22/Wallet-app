const mongoose = require('mongoose');
const {
  TRANSACTION_TYPES,
  TRANSACTION_STATUS,
  TRANSACTION_CATEGORIES
} = require('../utils/constants');

const transactionSchema = new mongoose.Schema({
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: Object.values(TRANSACTION_TYPES),
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.01, 'Amount must be at least 0.01'],
    get: v => Math.round(v * 100) / 100,
    set: v => Math.round(v * 100) / 100
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters'],
    trim: true
  },
  category: {
    type: String,
    enum: Object.values(TRANSACTION_CATEGORIES),
    default: 'other'
  },
  relatedTransaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  },
  relatedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  balanceAfter: {
    type: Number,
    required: true,
    get: v => Math.round(v * 100) / 100,
    set: v => Math.round(v * 100) / 100
  },
  status: {
    type: String,
    enum: Object.values(TRANSACTION_STATUS),
    default: TRANSACTION_STATUS.COMPLETED
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Index for faster queries
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ wallet: 1, createdAt: -1 });
transactionSchema.index({ type: 1, createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);