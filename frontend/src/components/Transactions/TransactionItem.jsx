import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Coffee, 
  Home, 
  Car, 
  Heart, 
  Gift, 
  TrendingUp,
  TrendingDown,
  MoreVertical,
  ExternalLink,
  Clock,
  CheckCircle
} from 'lucide-react';
import Button from '../Common/Button';

const TransactionItem = ({ transaction, isSelected, onSelect }) => {
  const getIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'shopping':
        return ShoppingBag;
      case 'food':
      case 'dining':
        return Coffee;
      case 'housing':
      case 'rent':
        return Home;
      case 'transportation':
      case 'travel':
        return Car;
      case 'health':
      case 'medical':
        return Heart;
      case 'entertainment':
      case 'gift':
        return Gift;
      case 'income':
      case 'salary':
        return TrendingUp;
      default:
        return TrendingUp;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'deposit':
      case 'transfer_in':
        return 'emerald';
      case 'withdrawal':
      case 'transfer_out':
        return 'red';
      case 'payment':
        return 'gold';
      default:
        return 'gray';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'deposit': return 'Deposit';
      case 'withdrawal': return 'Withdrawal';
      case 'transfer_in': return 'Received';
      case 'transfer_out': return 'Sent';
      default: return type;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const Icon = getIcon(transaction.category);
  const color = getColor(transaction.type);
  const isPositive = ['deposit', 'transfer_in'].includes(transaction.type);

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      className={`
        group relative card-premium overflow-hidden
        ${isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : ''}
      `}
    >
      {/* Selection checkbox */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-5 h-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500 cursor-pointer"
        />
      </div>

      <div className="pl-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className={`
              relative p-3 rounded-xl
              ${color === 'emerald' ? 'bg-emerald-100' :
                color === 'red' ? 'bg-red-100' :
                color === 'gold' ? 'bg-gold-100' : 'bg-gray-100'
              }
            `}>
              <Icon className={`
                w-5 h-5
                ${color === 'emerald' ? 'text-emerald-600' :
                  color === 'red' ? 'text-red-600' :
                  color === 'gold' ? 'text-gold-600' : 'text-gray-600'
                }
              `} />
              {transaction.status === 'completed' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-2 h-2 text-white" />
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {transaction.description || 'Untitled Transaction'}
                </h4>
                {transaction.category && (
                  <span className={`
                    text-xs px-2 py-0.5 rounded-full
                    ${color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                      color === 'red' ? 'bg-red-100 text-red-800' :
                      color === 'gold' ? 'bg-gold-100 text-gold-800' : 'bg-gray-100 text-gray-800'
                    }
                  `}>
                    {transaction.category}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3" />
                  {formatDate(transaction.createdAt)}
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  {getTypeLabel(transaction.type)}
                </span>
                {transaction.relatedUser && (
                  <>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {transaction.type === 'transfer_out' ? 'To: ' : 'From: '}
                      {transaction.relatedUser.name || 'User'}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Amount and Actions */}
          <div className="flex items-center gap-4">
            {/* Amount */}
            <div className="text-right">
              <div className={`
                text-xl font-bold
                ${isPositive ? 'text-emerald-600' : 'text-red-600'}
              `}>
                {isPositive ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Balance: ${transaction.balanceAfter?.toLocaleString()}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                icon={ExternalLink}
                className="!p-2"
                title="View details"
              />
              <Button
                variant="ghost"
                size="sm"
                icon={MoreVertical}
                className="!p-2"
                title="More options"
              />
            </div>
          </div>
        </div>

        {/* Additional Info (collapsible) */}
        {transaction.note && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 pt-4 border-t border-gray-100"
          >
            <p className="text-sm text-gray-600">{transaction.note}</p>
          </motion.div>
        )}

        {/* Status Indicator */}
        <div className="absolute top-0 right-0">
          {transaction.status === 'pending' && (
            <div className="bg-gold-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
              Pending
            </div>
          )}
          {transaction.status === 'failed' && (
            <div className="bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
              Failed
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionItem;