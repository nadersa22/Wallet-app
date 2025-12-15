import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'demo-token');
    login({ email, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-2 border rounded mb-4" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} 
          className="w-full p-2 border rounded mb-6" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <p className="mt-4 text-center text-gray-600">Test: Any email/password works</p>
      </form>
    </div>
  );
};

export default Login;
