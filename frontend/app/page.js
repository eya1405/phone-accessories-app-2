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

  async function getProducts() {
    try {
      const res = await fetch('http://localhost:3002');
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      console.log('Products fetched:', data);
      return data;
    } catch (e) {
      console.error('Product fetch error:', e.message);
      return [
        { id: 1, name: 'Phone Case', price: 10 },
        { id: 2, name: 'Charger', price: 20 }
      ];
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setRole(decoded.role || 'user');
      } catch (err) {
        console.error('Token decode error:', err.message);
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
          <ProductList
            token={token}
            role={role}
            cart={cart}
            setCart={setCart}
            searchQuery={searchQuery}
            products={products}
          />
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}
