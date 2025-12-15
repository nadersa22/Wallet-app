import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ padding: '50px', backgroundColor: 'white' }}>
      <h1 style={{ color: 'blue', fontSize: '32px', marginBottom: '20px' }}>🏦 DASHBOARD</h1>
      
      <div style={{ backgroundColor: '#f0f9ff', padding: '30px', borderRadius: '10px', marginBottom: '30px' }}>
        <h2 style={{ color: '#666', marginBottom: '10px' }}>Your Balance</h2>
        <h1 style={{ color: 'green', fontSize: '48px', margin: 0 }}>$1,000.00</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#334155' }}>📤 Send Money</h3>
          <p style={{ color: '#64748b', margin: 0 }}>Transfer to anyone</p>
        </div>
        
        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#334155' }}>📥 Deposit</h3>
          <p style={{ color: '#64748b', margin: 0 }}>Add money to wallet</p>
        </div>
        
        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#334155' }}>📊 Transactions</h3>
          <p style={{ color: '#64748b', margin: 0 }}>View history</p>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>Recent Transactions</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Welcome Bonus</p>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Today • Bonus</p>
          </div>
          <div style={{ color: 'green', fontWeight: 'bold', fontSize: '18px' }}>+$1000</div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Coffee with Sarah</p>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Yesterday • Food</p>
          </div>
          <div style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>-$50</div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
          <div>
            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Freelance Payment</p>
            <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>2 days ago • Income</p>
          </div>
          <div style={{ color: 'green', fontWeight: 'bold', fontSize: '18px' }}>+$200</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;