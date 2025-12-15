import React from 'react';
import { X, Calendar, Tag, Filter as FilterIcon } from 'lucide-react';
import Button from '../Common/Button';

const FilterBar = ({ filters, onFilterChange, transactionCount }) => {
  const transactionTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'deposit', label: 'Deposits' },
    { value: 'withdrawal', label: 'Withdrawals' },
    { value: 'transfer_in', label: 'Received' },
    { value: 'transfer_out', label: 'Sent' },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'bills', label: 'Bills & Utilities' },
    { value: 'income', label: 'Income' },
    { value: 'other', label: 'Other' },
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'category', label: 'Category' },
  ];

  const clearAllFilters = () => {
    onFilterChange({
      type: 'all',
      dateRange: 'all',
      category: 'all',
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  const hasActiveFilters = () => {
    return filters.type !== 'all' || 
           filters.dateRange !== 'all' || 
           filters.category !== 'all' ||
           filters.sortBy !== 'date' ||
           filters.sortOrder !== 'desc';
  };

  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
          {transactionCount !== undefined && (
            <span className="text-sm text-gray-500">
              • {transactionCount} transactions match
            </span>
          )}
        </div>
        
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            icon={X}
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <div className="flex flex-wrap gap-2">
            {transactionTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => onFilterChange({ type: type.value })}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                  ${filters.type === type.value
                    ? 'gradient-premium text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="input-premium w-full !py-2.5"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="relative">
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange({ dateRange: e.target.value })}
              className="input-premium w-full !py-2.5"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="flex gap-2">
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value })}
              className="input-premium flex-1 !py-2.5"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => onFilterChange({ 
                sortOrder: filters.sortOrder === 'desc' ? 'asc' : 'desc' 
              })}
              className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              {filters.sortOrder === 'desc' ? '↓' : '↑'}
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters() && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.type !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                Type: {transactionTypes.find(t => t.value === filters.type)?.label}
                <button
                  onClick={() => onFilterChange({ type: 'all' })}
                  className="hover:text-primary-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                Category: {categories.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => onFilterChange({ category: 'all' })}
                  className="hover:text-emerald-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.dateRange !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-100 text-gold-800 rounded-full text-sm">
                Date: {dateRanges.find(d => d.value === filters.dateRange)?.label}
                <button
                  onClick={() => onFilterChange({ dateRange: 'all' })}
                  className="hover:text-gold-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;