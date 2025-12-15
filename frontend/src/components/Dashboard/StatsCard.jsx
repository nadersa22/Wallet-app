import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, CreditCard, PieChart, Shield } from 'lucide-react';

const StatsCard = ({ title, value, change, icon: Icon, color = 'primary', trend = 'up', description }) => {
  const colors = {
    primary: {
      bg: 'bg-primary-50',
      icon: 'text-primary-600',
      text: 'text-primary-700',
      border: 'border-primary-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      icon: 'text-emerald-600',
      text: 'text-emerald-700',
      border: 'border-emerald-100',
    },
    gold: {
      bg: 'bg-gold-50',
      icon: 'text-gold-600',
      text: 'text-gold-700',
      border: 'border-gold-100',
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      text: 'text-purple-700',
      border: 'border-purple-100',
    },
  };

  const selectedColor = colors[color] || colors.primary;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`
        ${selectedColor.bg} ${selectedColor.border}
        border rounded-2xl p-5 transition-all duration-300
        hover:shadow-lg hover:border-transparent
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${selectedColor.bg.replace('50', '100')}`}>
          <Icon className={`w-6 h-6 ${selectedColor.icon}`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-100' : 'bg-red-100'}`}>
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3 text-emerald-600" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-600" />
          )}
          <span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-700' : 'text-red-700'}`}>
            {change}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-sm text-gray-600">{title}</div>
        <div className={`text-2xl font-bold ${selectedColor.text}`}>{value}</div>
        {description && (
          <div className="text-xs text-gray-500 mt-2">{description}</div>
        )}
      </div>

      {/* Progress bar for some cards */}
      {(title.includes('Goal') || title.includes('Limit')) && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>75%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${color === 'emerald' ? 'bg-emerald-500' : 'bg-primary-500'}`}
              style={{ width: '75%' }}
            ></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const StatsGrid = () => {
  const stats = [
    {
      title: 'Total Transactions',
      value: '1,248',
      change: '+12.5%',
      icon: CreditCard,
      color: 'primary',
      trend: 'up',
      description: 'This month',
    },
    {
      title: 'Active Users',
      value: '542',
      change: '+8.2%',
      icon: Users,
      color: 'emerald',
      trend: 'up',
      description: 'Connected accounts',
    },
    {
      title: 'Savings Rate',
      value: '24%',
      change: '+3.1%',
      icon: PieChart,
      color: 'gold',
      trend: 'up',
      description: 'Monthly average',
    },
    {
      title: 'Security Score',
      value: '98%',
      change: '+0.5%',
      icon: Shield,
      color: 'purple',
      trend: 'up',
      description: 'Excellent',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatsCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCard;