import React from 'react';
import { Loader2, Check, X, AlertCircle } from 'lucide-react';

const Button = ({
  children,
  variant = 'premium',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  success = false,
  error = false,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 backdrop-blur-sm';
  
  const variants = {
    premium: 'btn-premium focus:ring-primary-500/50',
    emerald: 'btn-emerald focus:ring-emerald-500/50',
    outline: 'btn-outline-premium focus:ring-primary-500/50',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-400',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-red-500/50',
    success: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-xl hover:-translate-y-0.5 focus:ring-emerald-500/50',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const getIcon = () => {
    if (loading) return <Loader2 className="animate-spin" />;
    if (success) return <Check className="w-4 h-4" />;
    if (error) return <X className="w-4 h-4" />;
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const iconElement = getIcon();

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${success ? '!bg-gradient-to-r !from-emerald-500 !to-emerald-600' : ''}
        ${error ? '!bg-gradient-to-r !from-red-500 !to-red-600' : ''}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {iconPosition === 'left' && iconElement}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
      {iconPosition === 'right' && iconElement}
    </button>
  );
};

export const IconButton = ({
  icon: Icon,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes = {
    xs: 'p-1.5',
    sm: 'p-2',
    md: 'p-2.5',
    lg: 'p-3',
    xl: 'p-4',
  };

  const variants = {
    ghost: 'hover:bg-gray-100 text-gray-600',
    premium: 'bg-gradient-premium text-white hover:shadow-lg',
    emerald: 'bg-gradient-emerald text-white hover:shadow-lg',
  };

  return (
    <button
      className={`
        rounded-xl transition-all duration-300
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default Button;