const mongoose = require('mongoose');
const { STARTING_BALANCE } = require('../utils/constants');

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  balance: {
    type: Number,
    default: STARTING_BALANCE,
    min: [0, 'Balance cannot be negative'],
    get: v => Math.round(v * 100) / 100, // Round to 2 decimal places
    set: v => Math.round(v * 100) / 100
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastTransaction: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Method to update balance
walletSchema.methods.updateBalance = async function(amount) {
  this.balance = Math.round((this.balance + amount) * 100) / 100;
  this.lastTransaction = Date.now();
  return await this.save();
};

// Method to check sufficient funds
walletSchema.methods.hasSufficientFunds = function(amount) {
  return this.balance >= amount;
};

module.exports = mongoose.model('Wallet', walletSchema);