import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Wallet, 
  Home, 
  History, 
  Send, 
  User, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Settings,
  Moon,
  Sun
} from 'lucide-react';
import Button from '../../components/Common/Button';

const Navbar = () => {
  const { user, logout, wallet } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Transactions', path: '/transactions', icon: History },
    { name: 'Transfer', path: '/transfer', icon: Send },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 glass-card border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="gradient-premium p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-premium bg-clip-text text-transparent">
                WalletPro
              </span>
              {wallet && (
                <div className="text-xs text-gray-500 hidden md:block">
                  Balance: <span className="font-semibold text-emerald-600">
                    ${wallet.balance?.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                    ${active 
                      ? 'gradient-premium text-white shadow-lg' 
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gold-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>

            {/* User Profile */}
            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                <div className="relative">
                  <div className="w-10 h-10 gradient-premium rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={LogOut}
                  onClick={handleLogout}
                  className="hidden lg:flex"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="premium" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 mt-2 pt-4 pb-4">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                      ${active 
                        ? 'gradient-premium text-white' 
                        : 'text-gray-600 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              {user ? (
                <>
                  <div className="px-4 py-3 border-t border-gray-100 mt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 gradient-premium rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {user.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          navigate('/profile');
                          setIsMenuOpen(false);
                        }}
                      >
                        <User size={18} className="mr-2" />
                        Profile
                      </Button>
                      <Button
                        variant="danger"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-4 pt-3 border-t border-gray-100 space-y-3">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block"
                  >
                    <Button variant="premium" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;