import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Send, Download, CreditCard, QrCode } from 'lucide-react';
import Button from '../Common/Button';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'deposit',
      label: 'Deposit',
      icon: Plus,
      color: 'emerald',
      description: 'Add money to wallet',
      variant: 'emerald',
    },
    {
      id: 'withdraw',
      label: 'Withdraw',
      icon: Minus,
      color: 'red',
      description: 'Withdraw to bank',
      variant: 'danger',
    },
    {
      id: 'transfer',
      label: 'Transfer',
      icon: Send,
      color: 'primary',
      description: 'Send to others',
      variant: 'premium',
    },
    {
      id: 'pay',
      label: 'Pay',
      icon: CreditCard,
      color: 'purple',
      description: 'Make payment',
      variant: 'outline',
    },
    {
      id: 'request',
      label: 'Request',
      icon: Download,
      color: 'blue',
      description: 'Request money',
      variant: 'outline',
    },
    {
      id: 'qrcode',
      label: 'QR Code',
      icon: QrCode,
      color: 'gold',
      description: 'Show QR code',
      variant: 'outline',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="card-premium"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          <p className="text-sm text-gray-600">Fast access to common tasks</p>
        </div>
        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
          6 actions
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <motion.div
              key={action.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => onAction(action.id)}
                className="group w-full flex flex-col items-center p-4 rounded-xl bg-gray-50 hover:bg-white border-2 border-gray-100 hover:border-primary-200 transition-all duration-300"
              >
                <div className={`p-3 rounded-xl mb-3 ${action.color === 'emerald' ? 'bg-emerald-100' : action.color === 'red' ? 'bg-red-100' : action.color === 'primary' ? 'bg-primary-100' : action.color === 'purple' ? 'bg-purple-100' : action.color === 'blue' ? 'bg-blue-100' : 'bg-gold-100'}`}>
                  <Icon className={`
                    w-6 h-6
                    ${action.color === 'emerald' ? 'text-emerald-600' :
                      action.color === 'red' ? 'text-red-600' :
                      action.color === 'primary' ? 'text-primary-600' :
                      action.color === 'purple' ? 'text-purple-600' :
                      action.color === 'blue' ? 'text-blue-600' :
                      'text-gold-600'
                    }
                  `} />
                </div>
                <span className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
                  {action.label}
                </span>
                <span className="text-xs text-gray-500 mt-1">{action.description}</span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Recent Activity</span>
          <span className="text-xs text-gray-500">Just now</span>
        </div>
        <div className="space-y-2">
          {[
            { type: 'deposit', amount: '+$500', description: 'Salary deposit', time: '2 min ago' },
            { type: 'transfer', amount: '-$50', description: 'To John Doe', time: '1 hour ago' },
            { type: 'payment', amount: '-$29.99', description: 'Netflix', time: '3 hours ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'deposit' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                  {activity.type === 'deposit' ? (
                    <Plus className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Minus className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{activity.description}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
              <div className={`font-semibold ${activity.type === 'deposit' ? 'text-emerald-600' : 'text-red-600'}`}>
                {activity.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuickActions;