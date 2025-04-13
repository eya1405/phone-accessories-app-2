'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetch('http://localhost:3003/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded">
              <p>Order ID: {order._id}</p>
              <p>Product ID: {order.productId}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: ${order.totalPrice}</p>
              <p>Status: {order.paymentStatus}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
