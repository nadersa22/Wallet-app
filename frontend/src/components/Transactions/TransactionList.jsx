import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Download, MoreVertical, ChevronDown } from 'lucide-react';
import Button from '../Common/Button';
import Input from '../Common/Input';
import TransactionItem from './TransactionItem';
import FilterBar from './FilterBar';
import EmptyState from './EmptyState';

const TransactionList = ({ 
  transactions = [], 
  loading = false,
  onFilterChange,
  onExport,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleSelectAll = () => {
    if (selectedTransactions.length === transactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(transactions.map(t => t._id));
    }
  };

  const handleSelectTransaction = (id) => {
    setSelectedTransactions(prev =>
      prev.includes(id)
        ? prev.filter(transactionId => transactionId !== id)
        : [...prev, id]
    );
  };

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        transaction.description?.toLowerCase().includes(query) ||
        transaction.amount?.toString().includes(query) ||
        transaction.category?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Type filter
    if (filters.type !== 'all' && transaction.type !== filters.type) {
      return false;
    }

    // Category filter
    if (filters.category !== 'all' && transaction.category !== filters.category) {
      return false;
    }

    return true;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const order = filters.sortOrder === 'desc' ? -1 : 1;
    
    switch (filters.sortBy) {
      case 'date':
        return order * (new Date(b.createdAt) - new Date(a.createdAt));
      case 'amount':
        return order * (b.amount - a.amount);
      case 'category':
        return order * (a.category?.localeCompare(b.category));
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="card-premium animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header with controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Transactions</h2>
          <p className="text-gray-600">
            {filteredTransactions.length} of {transactions.length} transactions
            {selectedTransactions.length > 0 && ` • ${selectedTransactions.length} selected`}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <Input
              type="text"
              placeholder="Search transactions..."
              icon={Search}
              value={searchQuery}
              onChange={handleSearch}
              className="!py-2"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant={showFilters ? 'premium' : 'outline'}
            icon={Filter}
            onClick={() => setShowFilters(!showFilters)}
            className="whitespace-nowrap"
          >
            Filter {showFilters ? '▲' : '▼'}
          </Button>

          {/* Export */}
          <Button
            variant="outline"
            icon={Download}
            onClick={onExport}
            disabled={filteredTransactions.length === 0}
          >
            Export
          </Button>

          {/* More Options */}
          <Button
            variant="ghost"
            icon={MoreVertical}
            className="!p-2"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              transactionCount={filteredTransactions.length}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selection Bar */}
      {selectedTransactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 border border-primary-200 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedTransactions.length === transactions.length}
                onChange={handleSelectAll}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="font-medium text-primary-800">
                {selectedTransactions.length} transactions selected
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Tag</Button>
              <Button variant="outline" size="sm">Categorize</Button>
              <Button variant="danger" size="sm">Delete</Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Transaction List */}
      {sortedTransactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          description={searchQuery || Object.values(filters).some(f => f !== 'all') 
            ? "Try adjusting your search or filters"
            : "Start by making your first transaction"
          }
          action={searchQuery || Object.values(filters).some(f => f !== 'all') 
            ? () => {
                setSearchQuery('');
                handleFilterChange({
                  type: 'all',
                  dateRange: 'all',
                  category: 'all',
                });
              }
            : null
          }
          actionText="Clear filters"
        />
      ) : (
        <div className="space-y-3">
          {sortedTransactions.map((transaction, index) => (
            <motion.div
              key={transaction._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <TransactionItem
                transaction={transaction}
                isSelected={selectedTransactions.includes(transaction._id)}
                onSelect={() => handleSelectTransaction(transaction._id)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination/Load More */}
      {sortedTransactions.length > 0 && (
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            Showing {Math.min(sortedTransactions.length, 10)} of {sortedTransactions.length}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled>
              ← Previous
            </Button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg font-medium ${page === 1 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
              <span className="px-2">...</span>
              <button className="w-8 h-8 rounded-lg text-gray-600 hover:bg-gray-100">
                10
              </button>
            </div>
            <Button variant="ghost" size="sm">
              Next →
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TransactionList;