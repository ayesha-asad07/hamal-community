import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { saveAuthToken } from '../utils/auth';

const API_URL = 'https://hamal-backend-8c5a7d408193.herokuapp.com/api'; // Replace with your Strapi backend URL

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/email`, { identifier: email, password });
      saveAuthToken(response.data.jwt);
      router.push('/');
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100">
      <div className="p-8 rounded-2xl bg-white shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-pink-500 mb-6 text-center">Welcome Back!</h1>
        <form onSubmit={handleLogin} className="space-y-6 text-black">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition duration-300 ease-in-out"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-gray-500 text-sm text-center mt-4">
          Don't have an account? <a href="/signup" className="text-pink-500 hover:underline">Sign up here</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
