import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, AlertCircle, Check, Search, DollarSign, Mail, User, Lock } from 'lucide-react';

const Input = forwardRef(({
  label,
  error,
  success,
  helperText,
  type = 'text',
  icon: Icon,
  prefix,
  suffix,
  className = '',
  containerClassName = '',
  labelClassName = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const getIcon = () => {
    if (type === 'email') return Mail;
    if (type === 'password') return Lock;
    if (type === 'text' && props.name === 'name') return User;
    if (props.name?.includes('amount')) return DollarSign;
    if (props.name?.includes('search')) return Search;
    return Icon;
  };

  const IconComponent = getIcon();

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative group">
        {/* Icon */}
        {(IconComponent || prefix) && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors">
            {prefix ? (
              <span className="text-gray-500">{prefix}</span>
            ) : (
              <IconComponent size={20} />
            )}
          </div>
        )}
        
        {/* Input */}
        <input
          ref={ref}
          type={inputType}
          className={`
            input-premium
            ${IconComponent || prefix ? 'pl-10' : ''}
            ${type === 'password' || suffix ? 'pr-10' : ''}
            ${error ? '!border-red-500 !focus:border-red-500 !focus:ring-red-200' : ''}
            ${success ? '!border-emerald-500 !focus:border-emerald-500 !focus:ring-emerald-200' : ''}
            ${className}
          `}
          {...props}
        />
        
        {/* Password toggle or suffix */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {success && <Check className="w-4 h-4 text-emerald-500" />}
          {type === 'password' && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          {suffix && !type === 'password' && (
            <span className="text-gray-500 text-sm">{suffix}</span>
          )}
        </div>
        
        {/* Focus border animation */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-focus-within:border-primary-300/50 pointer-events-none transition-all duration-300"></div>
      </div>
      
      {/* Helper text and error */}
      <div className="min-h-[20px]">
        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
        {error && (
          <div className="flex items-center gap-1 text-sm text-red-600 animate-fade-up">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
});

Input.displayName = 'Input';

export default Input;