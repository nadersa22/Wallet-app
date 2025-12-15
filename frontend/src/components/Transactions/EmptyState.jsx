import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  TrendingUp,
  Wallet
} from 'lucide-react';
import Button from '../Common/Button';

const EmptyState = ({ 
  title = "No transactions yet",
  description = "Start by making your first transaction",
  action,
  actionText = "Get Started",
  icon = "transactions",
  variant = "default"
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'search':
        return Search;
      case 'add':
        return PlusCircle;
      case 'trending':
        return TrendingUp;
      case 'wallet':
        return Wallet;
      default:
        return FileText;
    }
  };

  const Icon = getIcon();

  const variants = {
    default: {
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
      iconBg: 'bg-white',
      iconColor: 'text-primary-600',
    },
    premium: {
      bg: 'bg-gradient-premium',
      iconBg: 'bg-white/20',
      iconColor: 'text-white',
    },
    subtle: {
      bg: 'bg-white',
      iconBg: 'bg-gray-50',
      iconColor: 'text-gray-600',
    },
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        rounded-2xl p-8 text-center
        ${selectedVariant.bg}
        ${variant === 'default' ? 'border-2 border-dashed border-gray-200' : ''}
      `}
    >
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className={`
            w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6
            ${selectedVariant.iconBg}
            ${variant === 'premium' ? 'backdrop-blur-sm' : ''}
          `}
        >
          <Icon className={`w-10 h-10 ${selectedVariant.iconColor}`} />
        </motion.div>

        {/* Title */}
        <h3 className={`
          text-xl font-semibold mb-2
          ${variant === 'premium' ? 'text-white' : 'text-gray-800'}
        `}>
          {title}
        </h3>

        {/* Description */}
        <p className={`
          mb-6
          ${variant === 'premium' ? 'text-white/80' : 'text-gray-600'}
        `}>
          {description}
        </p>

        {/* Action Button */}
        {action && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant={variant === 'premium' ? 'outline' : 'premium'}
              size="lg"
              onClick={action}
              className={variant === 'premium' ? '!text-white !border-white hover:!bg-white/10' : ''}
            >
              {actionText}
            </Button>
          </motion.div>
        )}

        {/* Tips/Instructions */}
        {variant === 'default' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="p-3 bg-white rounded-xl">
                <div className="font-medium text-gray-800 mb-1">Deposit Funds</div>
                <div className="text-gray-600">Add money to your wallet</div>
              </div>
              <div className="p-3 bg-white rounded-xl">
                <div className="font-medium text-gray-800 mb-1">Make Transfer</div>
                <div className="text-gray-600">Send money to others</div>
              </div>
              <div className="p-3 bg-white rounded-xl">
                <div className="font-medium text-gray-800 mb-1">View History</div>
                <div className="text-gray-600">Check past transactions</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Decorative Elements */}
        {variant === 'premium' && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EmptyState;