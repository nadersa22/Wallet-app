import API from './api';

export const transactionService = {
  // Get user's wallet
  getWallet: async () => {
    try {
      const response = await API.get('/wallets/my-wallet');
      localStorage.setItem('wallet', JSON.stringify(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Deposit money
  deposit: async (data) => {
    try {
      const response = await API.post('/transactions/deposit', data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Withdraw money
  withdraw: async (data) => {
    try {
      const response = await API.post('/transactions/withdraw', data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Transfer money
  transfer: async (data) => {
    try {
      const response = await API.post('/transactions/transfer', data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get transactions
  getTransactions: async (params = {}) => {
    try {
      const response = await API.get('/transactions', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get transaction summary
  getSummary: async (params = {}) => {
    try {
      const response = await API.get('/transactions/summary', { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get user profile
  getProfile: async () => {
    try {
      const response = await API.get('/users/profile');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update user profile
  updateProfile: async (data) => {
    try {
      const response = await API.put('/users/profile', data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update wallet currency
  updateCurrency: async (data) => {
    try {
      const response = await API.put('/wallets/currency', data);
      localStorage.setItem('wallet', JSON.stringify(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};