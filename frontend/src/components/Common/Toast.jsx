import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-gold-50 border-gold-200 text-gold-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const Icon = icons[toast.type] || icons.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`
        ${colors[toast.type]}
        border rounded-2xl shadow-xl p-4 mb-3 w-80 relative
        backdrop-blur-sm
      `}
    >
      <div className="flex items-start gap-3">
        <Icon className={`
          w-5 h-5 mt-0.5 flex-shrink-0
          ${toast.type === 'success' ? 'text-emerald-600' :
            toast.type === 'error' ? 'text-red-600' :
            toast.type === 'warning' ? 'text-gold-600' : 'text-blue-600'
          }
        `} />
        <div className="flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-current opacity-20 rounded-full"
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
      />
    </motion.div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};