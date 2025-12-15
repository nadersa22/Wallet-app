import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Common/Button';

const PageHeader = ({ 
  title, 
  description, 
  action, 
  actionText, 
  actionIcon,
  breadcrumbs = [] 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-gray-300">/</span>}
              <a 
                href={crumb.href} 
                className={`hover:text-primary-600 transition-colors ${crumb.active ? 'text-primary-600 font-medium' : ''}`}
              >
                {crumb.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>
        
        {action && actionText && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="premium"
              icon={actionIcon}
              onClick={action}
            >
              {actionText}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Decorative Line */}
      <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </motion.div>
  );
};

export default PageHeader;