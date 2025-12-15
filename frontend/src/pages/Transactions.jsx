import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    setLoading(true);
    setTimeout(() => {
      const dummyTransactions = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        type: ['deposit', 'withdrawal', 'transfer'][Math.floor(Math.random() * 3)],
        amount: (Math.random() * 500 + 50) * (Math.random() > 0.5 ? 1 : -1),
        description: ['Coffee Shop', 'Salary Deposit', 'Grocery Store', 'Freelance Work', 'Rent Payment'][Math.floor(Math.random() * 5)],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        category: ['Food', 'Income', 'Shopping', 'Bills', 'Entertainment'][Math.floor(Math.random() * 5)],
        status: ['completed', 'pending'][Math.floor(Math.random() * 2)]
      }));
      setTransactions(dummyTransactions);
      setLoading(false);
    }, 1500);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'deposit': return 'bg-green-100 text-green-800';
      case 'withdrawal': return 'bg-red-100 text-red-800';
      case 'transfer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600 mt-2">View and manage all your transactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm mb-2">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm mb-2">Total Deposits</p>
            <p className="text-2xl font-bold text-green-600">
              ${transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm mb-2">Total Withdrawals</p>
            <p className="text-2xl font-bold text-red-600">
              ${Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)).toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm mb-2">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {transactions.filter(t => t.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-3 border border-gray-300 rounded-lg">
                <option>All Types</option>
                <option>Deposit</option>
                <option>Withdrawal</option>
                <option>Transfer</option>
              </select>
              <button className="px-4 py-3 bg-blue-600 text-white rounded-lg flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading transactions...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-500">{transaction.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{transaction.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;