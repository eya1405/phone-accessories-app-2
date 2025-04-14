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
      const res = await fetch('http://localhost:3002', { cache: 'no-store' });
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const data = await res.json();
      console.log('Fetched products:', data.length);
      return data;
    } catch (e) {
      console.error('Fetch error:', e.message);
      setError('Failed to load products. Please try again later.');
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
        console.error('Token error:', err.message);
        setToken('');
        setRole('');
        localStorage.removeItem('token');
      }
    }
    getProducts().then(data => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {token ? (
        <>
          <Navbar token={token} setToken={setToken} cart={cart} setSearchQuery={setSearchQuery} />
          <Hero />
          {error ? (
            <p className="text-red-500 text-center p-4">{error}</p>
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
  );
}
