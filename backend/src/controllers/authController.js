const User = require('../models/User');
const Wallet = require('../models/Wallet');
const { generateToken, attachTokenToResponse } = require('../utils/auth');

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Create wallet for user with $1000 starting balance
    const wallet = await Wallet.create({ user: user._id });

    // Generate JWT token
    const token = generateToken(user._id);

    // Attach token to response
    attachTokenToResponse(res, token);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.getPublicProfile(),
        wallet,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Get user's wallet
    const wallet = await Wallet.findOne({ user: user._id });

    // Generate JWT token
    const token = generateToken(user._id);

    // Attach token to response
    attachTokenToResponse(res, token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.getPublicProfile(),
        wallet,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = req.user;
    const wallet = await Wallet.findOne({ user: user._id });

    res.status(200).json({
      success: true,
      data: {
        user: user.getPublicProfile(),
        wallet
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

module.exports = {
  signup,
  login,
  getMe,
  logout
};