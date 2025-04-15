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
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  async function getProducts() {
    try {
      const res = await fetch('http://localhost:3002', {
        method: 'GET',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response: expected an array');
      }
      console.log('Products fetched:', data.length, 'items');
      return data;
    } catch (e) {
      console.error('Product fetch error:', e.message);
      setError(e.message);
      return [];
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        setToken(storedToken);
        const decoded = jwtDecode(storedToken);
        setRole(decoded.role || 'user');
      } catch (err) {
        console.error('Token decode error:', err.message);
        setToken('');
        setRole('');
        localStorage.removeItem('token');
      }
    }
    getProducts().then(data => {
      setProducts(data);
      setError(null);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {token ? (
        <>
          <Navbar token={token} setToken={setToken} cart={cart} setSearchQuery={setSearchQuery} />
          <Hero />
          {error ? (
            <p className="text-red-500 text-center">Error loading products: {error}</p>
          ) : (
            <ProductList
              token={token}
              role={role}
              cart={cart}
              setCart={setCart}
              searchQuery={searchQuery}
              products={products}
            />
          )}
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );}