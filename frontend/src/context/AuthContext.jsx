import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { useToast } from '../hooks/useToast';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = authService.getStoredUser();
    const storedWallet = authService.getStoredWallet();
    
    if (storedUser && storedWallet) {
      setUser(storedUser);
      setWallet(storedWallet);
      
      // Verify token validity in background
      authService.getCurrentUser()
        .then(response => {
          if (response.success) {
            setUser(response.data.user);
            setWallet(response.data.wallet);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('wallet', JSON.stringify(response.data.wallet));
          } else {
            // Token invalid, logout
            authService.logout();
            setUser(null);
            setWallet(null);
          }
        })
        .catch(() => {
          // Silent fail - token might be expired
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signup = async (userData) => {
    setLoading(true);
    const response = await authService.signup(userData);
    
    if (response.success) {
      setUser(response.data.user);
      setWallet(response.data.wallet);
      addToast('Account created successfully! $1000 added to your wallet.', 'success');
    } else {
      addToast(response.error || 'Signup failed', 'error');
    }
    
    setLoading(false);
    return response;
  };

  const login = async (credentials) => {
    setLoading(true);
    const response = await authService.login(credentials);
    
    if (response.success) {
      setUser(response.data.user);
      setWallet(response.data.wallet);
      addToast('Welcome back!', 'success');
    } else {
      addToast(response.error || 'Login failed', 'error');
    }
    
    setLoading(false);
    return response;
  };

  const logout = async () => {
    setLoading(true);
    await authService.logout();
    setUser(null);
    setWallet(null);
    addToast('Logged out successfully', 'info');
    setLoading(false);
  };

  const updateUser = (userData) => {
    setUser(userData);
    authService.updateStoredUser(userData);
  };

  const updateWallet = (walletData) => {
    setWallet(walletData);
    localStorage.setItem('wallet', JSON.stringify(walletData));
  };

  const value = {
    user,
    wallet,
    loading,
    signup,
    login,
    logout,
    updateUser,
    updateWallet,
    isAuthenticated: !!user && !!wallet,
    refreshUser: () => authService.getCurrentUser().then(response => {
      if (response.success) {
        setUser(response.data.user);
        setWallet(response.data.wallet);
      }
    })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};