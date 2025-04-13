'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetch(`http://localhost:3002/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id, router]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/cart');
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-lg mb-2">${product.price}</p>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4">Stock: {product.stock}</p>
      <button
        onClick={addToCart}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
