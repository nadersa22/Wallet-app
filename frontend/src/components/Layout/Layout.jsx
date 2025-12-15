import React from 'react';
import Navbar from './Navbar';
import { ToastContainer } from '../Common/Toast';
import { useToast } from '../../hooks/useToast';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react'; // ADD THIS IMPORT

const Layout = ({ children }) => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Floating Action Button for Quick Transfer */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 z-30"
      >
        <button className="group relative">
          <div className="absolute inset-0 bg-gradient-premium rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div className="relative gradient-premium p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
            <Send className="w-6 h-6 text-white" /> {/* FIXED: Capital S */}
          </div>
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            1
          </span>
        </button>
      </motion.div>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="gradient-premium p-1.5 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">
                © 2024 WalletPro. Secure digital wallet.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-primary-600 transition-colors">Support</a>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                v1.0.0
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;