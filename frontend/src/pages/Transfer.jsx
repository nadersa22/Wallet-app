import React, { useState } from 'react';
import { Send, User, Mail, CheckCircle } from 'lucide-react';

const Transfer = () => {
  const [formData, setFormData] = useState({
    recipientEmail: '',
    amount: '',
    description: ''
  });
  const [step, setStep] = useState(1); // 1: Form, 2: Review, 3: Success

  const recentContacts = [
    { id: 1, name: 'John Smith', email: 'john@example.com', avatar: 'JS' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', avatar: 'SJ' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', avatar: 'MW' },
    { id: 4, name: 'Emma Davis', email: 'emma@example.com', avatar: 'ED' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSelect = (contact) => {
    setFormData({
      ...formData,
      recipientEmail: contact.email
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.recipientEmail || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }
    setStep(2);
  };

  const handleConfirm = () => {
    setTimeout(() => {
      setStep(3);
    }, 1500);
  };

  const handleNewTransfer = () => {
    setFormData({ recipientEmail: '', amount: '', description: '' });
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Transfer Money</h1>
          <p className="text-gray-600 mt-2">Send money to anyone by email</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-24 h-1 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-8 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100">Your Available Balance</p>
              <h2 className="text-3xl font-bold mt-2">$1,000.00</h2>
            </div>
            <Send className="w-12 h-12 opacity-90" />
          </div>
        </div>

        {/* Step 1: Transfer Form */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Transfer Details</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {/* Recipient Email */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        Recipient Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="recipientEmail"
                          value={formData.recipientEmail}
                          onChange={handleChange}
                          placeholder="Enter recipient's email"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        Amount *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="0.00"
                          min="0.01"
                          step="0.01"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Available: $1,000.00
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        Description (Optional)
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Add a note for this transfer"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex items-center justify-center"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Continue to Review
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Recent Contacts */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Contacts</h3>
                <p className="text-gray-600 mb-6">Quick send to people you've sent to before</p>
                
                <div className="space-y-4">
                  {recentContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleContactSelect(contact)}
                      className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="font-bold text-blue-600">{contact.avatar}</span>
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-medium text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Review Transfer</h2>
              <p className="text-gray-600 mt-2">Please confirm the details below</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-500 text-sm">Recipient</p>
                    <p className="font-semibold text-gray-900">{formData.recipientEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Amount</p>
                    <p className="text-2xl font-bold text-blue-600">${formData.amount}</p>
                  </div>
                  {formData.description && (
                    <div className="md:col-span-2">
                      <p className="text-gray-500 text-sm">Description</p>
                      <p className="font-medium text-gray-900">{formData.description}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm Transfer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">Transfer Successful!</h2>
            <p className="text-gray-600 mt-2 mb-8">
              Your transfer of <span className="font-bold text-green-600">${formData.amount}</span> has been sent to {formData.recipientEmail}
            </p>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID:</span>
                  <span className="font-mono">TX-{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleNewTransfer}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                New Transfer
              </button>
              <button className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                View Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transfer;