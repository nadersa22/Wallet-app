import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Filter, Download } from 'lucide-react';
import Button from '../Common/Button';

// Mock chart component - in real app you'd use recharts or chart.js
const MockChart = ({ data, period }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="relative h-48">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-t border-gray-100"></div>
        ))}
      </div>
      
      {/* Chart bars */}
      <div className="absolute inset-0 flex items-end justify-between px-2">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / maxValue) * 100}%` }}
            transition={{ delay: index * 0.05, duration: 0.8, type: 'spring' }}
            className="relative w-8 md:w-10"
          >
            <div className="absolute inset-x-0 bottom-0">
              <div className={`h-full rounded-t-lg ${item.color} transition-all duration-300 hover:opacity-80`}></div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                {item.label}
              </div>
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              ${item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SpendingChart = () => {
  const [period, setPeriod] = useState('month');
  const [category, setCategory] = useState('all');

  const periods = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'year', label: 'Year' },
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'food', label: 'Food & Dining' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'bills', label: 'Bills & Utilities' },
  ];

  // Mock data
  const chartData = {
    week: [
      { label: 'Mon', value: 450, color: 'bg-primary-500' },
      { label: 'Tue', value: 620, color: 'bg-primary-500' },
      { label: 'Wed', value: 380, color: 'bg-primary-500' },
      { label: 'Thu', value: 540, color: 'bg-primary-500' },
      { label: 'Fri', value: 710, color: 'bg-emerald-500' },
      { label: 'Sat', value: 890, color: 'bg-emerald-500' },
      { label: 'Sun', value: 520, color: 'bg-primary-500' },
    ],
    month: [
      { label: 'Jan', value: 2450, color: 'bg-primary-500' },
      { label: 'Feb', value: 3120, color: 'bg-primary-500' },
      { label: 'Mar', value: 2780, color: 'bg-primary-500' },
      { label: 'Apr', value: 3540, color: 'bg-emerald-500' },
      { label: 'May', value: 4210, color: 'bg-emerald-500' },
      { label: 'Jun', value: 3890, color: 'bg-primary-500' },
    ],
  };

  const spendingByCategory = [
    { category: 'Shopping', amount: 1250, percentage: 35, color: 'bg-primary-500' },
    { category: 'Food & Dining', amount: 890, percentage: 25, color: 'bg-emerald-500' },
    { category: 'Entertainment', amount: 640, percentage: 18, color: 'bg-gold-500' },
    { category: 'Bills & Utilities', amount: 450, percentage: 12, color: 'bg-purple-500' },
    { category: 'Others', amount: 370, percentage: 10, color: 'bg-gray-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-premium"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Spending Analytics</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-full">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">+18.5% growth</span>
            </div>
            <span className="text-sm text-gray-500">vs last period</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${period === p.id ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Calendar}
            className="hidden md:flex"
          >
            Custom
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={Download}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-8">
        <MockChart data={chartData[period] || chartData.month} period={period} />
      </div>

      {/* Spending by Category */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-700">Spending by Category</h4>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm bg-transparent border-0 focus:outline-none focus:ring-0"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {spendingByCategory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="font-medium text-gray-700">{item.category}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color.replace('500', '400')} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">${item.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="font-medium text-gray-700 mb-3">Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl">
            <div className="text-sm font-medium text-emerald-800 mb-1">💰 You saved $240</div>
            <div className="text-xs text-emerald-600">Great job sticking to budget!</div>
          </div>
          <div className="p-3 bg-gold-50 rounded-xl">
            <div className="text-sm font-medium text-gold-800 mb-1">⚠️ High dining spend</div>
            <div className="text-xs text-gold-600">25% above monthly average</div>
          </div>
          <div className="p-3 bg-primary-50 rounded-xl">
            <div className="text-sm font-medium text-primary-800 mb-1">📈 Income increased</div>
            <div className="text-xs text-primary-600">+12.5% from last month</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpendingChart;