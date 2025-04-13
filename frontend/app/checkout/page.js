'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, [router]);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    for (const item of cart) {
      try {
        const res = await fetch('http://localhost:3003/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.id,
            quantity: item.quantity,
          }),
        });
        const data = await res.json();
        if (!data._id) throw new Error('Order failed');
      } catch (err) {
        alert('Checkout failed: ' + err.message);
        return;
      }
    }
    localStorage.setItem('cart', '[]');
    router.push('/orders');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <h2 className="text-lg mb-2">Order Summary</h2>
          {cart.map(item => (
            <div key={item.id} className="border-b py-2">
              <p>{item.name} x {item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="mt-4">
            <label htmlFor="payment" className="block text-sm font-medium">Payment Method</label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}
