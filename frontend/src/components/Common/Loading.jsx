import React from 'react';

export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="w-full h-full border-3 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
    </div>
  );
};

export const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = [];

  for (let i = 0; i < count; i++) {
    switch (type) {
      case 'card':
        skeletons.push(
          <div key={i} className="card-premium animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        );
        break;
      
      case 'text':
        skeletons.push(
          <div key={i} className="space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        );
        break;
      
      case 'circle':
        skeletons.push(
          <div key={i} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
        );
        break;
      
      default:
        skeletons.push(
          <div key={i} className="h-20 bg-gray-200 rounded-xl animate-pulse"></div>
        );
    }
  }

  return <>{skeletons}</>;
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center z-50">
    <div className="text-center">
      <div className="w-20 h-20 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading your wallet...</p>
    </div>
  </div>
);