import API from './api';

export const authService = {
  // Signup user
  signup: async (userData) => {
    try {
      const response = await API.post('/auth/signup', userData);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('wallet', JSON.stringify(response.data.wallet));
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await API.post('/auth/login', credentials);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('wallet', JSON.stringify(response.data.wallet));
      }
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await API.get('/auth/me');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('wallet', JSON.stringify(response.data.wallet));
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await API.get('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('wallet');
    }
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Get stored wallet
  getStoredWallet: () => {
    const wallet = localStorage.getItem('wallet');
    return wallet ? JSON.parse(wallet) : null;
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Update stored user
  updateStoredUser: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
  }
};