const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const User = require('../models/User');
const { TRANSACTION_TYPES, TRANSACTION_CATEGORIES } = require('../utils/constants');

// @desc    Deposit money
// @route   POST /api/transactions/deposit
// @access  Private
const deposit = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const userId = req.user._id;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid amount'
      });
    }

    // Get user's wallet
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }

    // Calculate new balance
    const newBalance = wallet.balance + amount;

    // Create transaction
    const transaction = await Transaction.create({
      wallet: wallet._id,
      user: userId,
      type: TRANSACTION_TYPES.DEPOSIT,
      amount,
      description: description || 'Deposit',
      category: TRANSACTION_CATEGORIES.INCOME,
      balanceAfter: newBalance,
      status: 'completed'
    });

    // Update wallet balance
    await wallet.updateBalance(amount);

    res.status(201).json({
      success: true,
      message: 'Deposit successful',
      data: {
        transaction,
        newBalance: wallet.balance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Withdraw money
// @route   POST /api/transactions/withdraw
// @access  Private
const withdraw = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const userId = req.user._id;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid amount'
      });
    }

    // Get user's wallet
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }

    // Check sufficient funds
    if (!wallet.hasSufficientFunds(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient funds'
      });
    }

    // Calculate new balance
    const newBalance = wallet.balance - amount;

    // Create transaction
    const transaction = await Transaction.create({
      wallet: wallet._id,
      user: userId,
      type: TRANSACTION_TYPES.WITHDRAWAL,
      amount,
      description: description || 'Withdrawal',
      category: TRANSACTION_CATEGORIES.EXPENSE,
      balanceAfter: newBalance,
      status: 'completed'
    });

    // Update wallet balance (negative amount)
    await wallet.updateBalance(-amount);

    res.status(201).json({
      success: true,
      message: 'Withdrawal successful',
      data: {
        transaction,
        newBalance: wallet.balance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Transfer money to another user
// @route   POST /api/transactions/transfer
// @access  Private
const transfer = async (req, res) => {
  try {
    const { recipientEmail, amount, description } = req.body;
    const senderId = req.user._id;

    // Validate inputs
    if (!recipientEmail || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide recipient email and valid amount'
      });
    }

    // Check if transferring to self
    if (recipientEmail === req.user.email) {
      return res.status(400).json({
        success: false,
        message: 'Cannot transfer to yourself'
      });
    }

    // Get recipient user
    const recipient = await User.findOne({ email: recipientEmail.toLowerCase() });
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: 'Recipient not found'
      });
    }

    // Get sender's wallet
    const senderWallet = await Wallet.findOne({ user: senderId });
    if (!senderWallet) {
      return res.status(404).json({
        success: false,
        message: 'Your wallet not found'
      });
    }

    // Get recipient's wallet
    const recipientWallet = await Wallet.findOne({ user: recipient._id });
    if (!recipientWallet) {
      return res.status(404).json({
        success: false,
        message: 'Recipient wallet not found'
      });
    }

    // Check sufficient funds
    if (!senderWallet.hasSufficientFunds(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient funds'
      });
    }

    // Calculate new balances
    const senderNewBalance = senderWallet.balance - amount;
    const recipientNewBalance = recipientWallet.balance + amount;

    // Create sender transaction (transfer_out)
    const senderTransaction = await Transaction.create({
      wallet: senderWallet._id,
      user: senderId,
      type: TRANSACTION_TYPES.TRANSFER_OUT,
      amount,
      description: description || `Transfer to ${recipientEmail}`,
      category: TRANSACTION_CATEGORIES.TRANSFER,
      relatedUser: recipient._id,
      balanceAfter: senderNewBalance,
      status: 'completed'
    });

    // Create recipient transaction (transfer_in)
    const recipientTransaction = await Transaction.create({
      wallet: recipientWallet._id,
      user: recipient._id,
      type: TRANSACTION_TYPES.TRANSFER_IN,
      amount,
      description: description || `Transfer from ${req.user.email}`,
      category: TRANSACTION_CATEGORIES.TRANSFER,
      relatedUser: senderId,
      relatedTransaction: senderTransaction._id,
      balanceAfter: recipientNewBalance,
      status: 'completed'
    });

    // Link transactions together
    senderTransaction.relatedTransaction = recipientTransaction._id;
    await senderTransaction.save();

    // Update both wallets
    await senderWallet.updateBalance(-amount);
    await recipientWallet.updateBalance(amount);

    res.status(201).json({
      success: true,
      message: 'Transfer successful',
      data: {
        transaction: senderTransaction,
        recipient: {
          name: recipient.name,
          email: recipient.email
        },
        newBalance: senderWallet.balance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get transaction history
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { 
      type, 
      startDate, 
      endDate, 
      page = 1, 
      limit = 10 
    } = req.query;

    // Build query
    const query = { user: userId };

    // Filter by type
    if (type && Object.values(TRANSACTION_TYPES).includes(type)) {
      query.type = type;
    }

    // Filter by date range
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get transactions with pagination
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('relatedUser', 'name email');

    // Get total count for pagination info
    const total = await Transaction.countDocuments(query);

    // Get wallet for current balance
    const wallet = await Wallet.findOne({ user: userId });

    res.status(200).json({
      success: true,
      data: {
        transactions,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        },
        currentBalance: wallet ? wallet.balance : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get transaction statistics
// @route   GET /api/transactions/summary
// @access  Private
const getTransactionSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate } = req.query;

    // Build date query
    const dateQuery = {};
    if (startDate) {
      dateQuery.$gte = new Date(startDate);
    }
    if (endDate) {
      dateQuery.$lte = new Date(endDate);
    }

    const matchStage = { user: userId };
    if (startDate || endDate) {
      matchStage.createdAt = dateQuery;
    }

    // Get summary using aggregation
    const summary = await Transaction.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Format summary
    const formattedSummary = {
      deposits: { count: 0, totalAmount: 0 },
      withdrawals: { count: 0, totalAmount: 0 },
      transfers: { count: 0, totalAmount: 0 }
    };

    summary.forEach(item => {
      if (item._id === TRANSACTION_TYPES.DEPOSIT) {
        formattedSummary.deposits = item;
      } else if (item._id === TRANSACTION_TYPES.WITHDRAWAL) {
        formattedSummary.withdrawals = item;
      } else if (item._id === TRANSACTION_TYPES.TRANSFER_IN || item._id === TRANSACTION_TYPES.TRANSFER_OUT) {
        formattedSummary.transfers.count += item.count;
        formattedSummary.transfers.totalAmount += item.totalAmount;
      }
    });

    // Get current balance
    const wallet = await Wallet.findOne({ user: userId });

    res.status(200).json({
      success: true,
      data: {
        summary: formattedSummary,
        currentBalance: wallet ? wallet.balance : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  deposit,
  withdraw,
  transfer,
  getTransactions,
  getTransactionSummary
};