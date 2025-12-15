import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  History, 
  Send, 
  CreditCard, 
  BarChart3, 
  Settings,
  HelpCircle,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { wallet } = useAuth();

  const mainLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Transactions', path: '/transactions', icon: History },
    { name: 'Transfer', path: '/transfer', icon: Send },
    { name: 'Cards', path: '/cards', icon: CreditCard },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  const secondaryLinks = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Security', path: '/security', icon: Shield },
    { name: 'Help', path: '/help', icon: HelpCircle },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="glass-card rounded-2xl p-6 sticky top-24">
        {/* Balance Summary */}
        {wallet && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Balance</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-800">
                ${wallet.balance?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">{wallet.currency}</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm">
              <span className={`px-2 py-0.5 rounded-full ${wallet.balance >= 1000 ? 'bg-emerald-100 text-emerald-800' : 'bg-gold-100 text-gold-800'}`}>
                {wallet.balance >= 1000 ? '✓ Good' : 'Low'}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">Last updated: Just now</span>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="space-y-1 mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Navigation
          </h3>
          {mainLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
                  ${active 
                    ? 'gradient-premium text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
                {active && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Secondary Navigation */}
        <nav className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Account
          </h3>
          {secondaryLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300
                  ${active 
                    ? 'bg-gray-100 text-primary-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                  }
                `}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="text-sm font-semibold text-emerald-600">+$450</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Monthly Avg.</span>
              <span className="text-sm font-semibold text-gray-800">$1,850</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Savings Rate</span>
              <span className="text-sm font-semibold text-primary-600">24%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;