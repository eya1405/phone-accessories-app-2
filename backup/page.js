'use client';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

export default function Home() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setRole(decoded.role || 'user');
      } catch (err) {
        setToken('');
        setRole('');
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {token ? (
        <>
          <Navbar token={token} setToken={setToken} cart={cart} setSearchQuery={setSearchQuery} />
          <Hero />
          <ProductList token={token} role={role} cart={cart} setCart={setCart} searchQuery={searchQuery} />
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}