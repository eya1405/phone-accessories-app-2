'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    // Mock cart data (replace with real cart logic)
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [router]);

  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <div>
                <h2 className="text-lg">{item.name}</h2>
                <p>${item.price}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 border p-1 rounded"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <Link href="/checkout" className="mt-4 inline-block bg-blue-500 text-white p-2 rounded">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
