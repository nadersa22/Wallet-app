import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Eye, EyeOff, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import Button from '../Common/Button';

const BalanceCard = ({ balance, currency = 'USD', onRefresh }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    if (balance && balance !== animatedBalance) {
      const increment = balance > animatedBalance ? 1 : -1;
      const interval = setInterval(() => {
        setAnimatedBalance(prev => {
          const next = prev + increment * Math.ceil(Math.abs(balance - prev) / 20);
          if ((increment > 0 && next >= balance) || (increment < 0 && next <= balance)) {
            clearInterval(interval);
            return balance;
          }
          return next;
        });
      }, 20);

      setIsIncreasing(increment > 0);
      return () => clearInterval(interval);
    }
  }, [balance]);

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-gradient rounded-2xl overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-800/20"></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-1">Total Balance</h3>
            <div className="flex items-baseline gap-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-white">
                    {showBalance ? formatBalance(animatedBalance) : '••••••'}
                  </span>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    {showBalance ? (
                      <EyeOff className="w-4 h-4 text-white" />
                    ) : (
                      <Eye className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isIncreasing ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                    {isIncreasing ? (
                      <TrendingUp className="w-3 h-3 text-emerald-300" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-300" />
                    )}
                    <span className={`text-xs font-medium ${isIncreasing ? 'text-emerald-300' : 'text-red-300'}`}>
                      {isIncreasing ? '+12.5%' : '-5.2%'}
                    </span>
                  </div>
                  <span className="text-sm text-white/60">vs last month</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={RefreshCw}
            onClick={onRefresh}
            className="!text-white !bg-white/20 hover:!bg-white/30"
          >
            Refresh
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-sm text-white/60 mb-1">Income</div>
            <div className="text-lg font-semibold text-emerald-300">+$2,450</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-white/60 mb-1">Expenses</div>
            <div className="text-lg font-semibold text-red-300">-$890</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-white/60 mb-1">Savings</div>
            <div className="text-lg font-semibold text-gold-300">24%</div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute -top-10 left-0 right-0 h-20 bg-gradient-to-t from-white/10 to-transparent">
          <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
            <path
              d="M0,50 C150,150 350,0 500,50 L500,150 L0,150 Z"
              className="fill-white/10"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;