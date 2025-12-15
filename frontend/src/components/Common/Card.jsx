import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
  glow = false,
  animate = false,
  padding = true,
  ...props
}) => {
  const variants = {
    default: 'card-premium',
    glass: 'glass-card',
    gradient: 'card-gradient',
    flat: 'bg-white border border-gray-200 rounded-2xl',
    dark: 'glass-dark text-white',
  };

  const paddingClass = padding ? 'p-6' : '';

  const CardComponent = animate ? motion.div : 'div';

  return (
    <CardComponent
      className={`
        ${variants[variant]}
        ${paddingClass}
        ${hover ? 'hover:shadow-2xl transition-shadow duration-300' : ''}
        ${glow ? 'shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}
        ${className}
      `}
      whileHover={animate ? { y: -5 } : undefined}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-bold text-gray-800 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-gray-600 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-6 pt-6 border-t border-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;