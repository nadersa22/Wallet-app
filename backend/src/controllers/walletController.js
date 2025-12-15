const Wallet = require('../models/Wallet');

// @desc    Get user's wallet
// @route   GET /api/wallets/my-wallet
// @access  Private
const getMyWallet = async (req, res) => {
  try {
    const userId = req.user._id;

    const wallet = await Wallet.findOne({ user: userId })
      .populate('user', 'name email');

    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }

    res.status(200).json({
      success: true,
      data: wallet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update wallet currency
// @route   PUT /api/wallets/currency
// @access  Private
const updateCurrency = async (req, res) => {
  try {
    const { currency } = req.body;
    const userId = req.user._id;

    if (!currency || currency.length !== 3) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 3-letter currency code (e.g., USD, EUR)'
      });
    }

    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }

    wallet.currency = currency.toUpperCase();
    await wallet.save();

    res.status(200).json({
      success: true,
      message: 'Currency updated successfully',
      data: wallet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getMyWallet,
  updateCurrency
};