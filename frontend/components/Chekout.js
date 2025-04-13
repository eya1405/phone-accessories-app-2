'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Checkout({ token, cart, setCart }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setError('');
    setSuccess('');
    try {
      const orderPromises = cart.map((item) =>
        axios.post(
          `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/api/orders`,
          { productId: item._id, quantity: item.quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      );
      const orders = await Promise.all(orderPromises);
      const orderIds = orders.map((res) => res.data._id);
      
      for (const orderId of orderIds) {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/api/orders/${orderId}/payment`,
          { paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed' },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
      setCart([]);
      setSuccess(`Order placed successfully! Payment: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayPal'}.`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order');
    }
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, parseInt(quantity)) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <p className="text-green-700">{success}</p>
          <Link href="/" className="text-blue-600 hover:underline">Continue Shopping</Link>
        </div>
      )}
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center border-b py-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, e.target.value)}
                    className="w-16 p-2 border rounded-lg mr-4"
                    min="1"
                  />
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                  className="mr-2"
                />
                PayPal
              </label>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
            <p className="text-xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}