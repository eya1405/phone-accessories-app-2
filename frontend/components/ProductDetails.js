'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function ProductDetails({ token, cart, setCart }) {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${params.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProduct(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch product');
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  useEffect(() => {
    if (token && params.id) {
      fetchProduct();
    }
  }, [token, params.id]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;
  if (!product) return <p className="text-center py-8">Product not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Products
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6">
        <img
          src="https://via.placeholder.com/400x300?text=Product"
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h2>
          <p className="text-xl text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-500 mb-4">Stock: {product.stock}</p>
          <p className="text-gray-700 mb-6">{product.description || 'High-quality accessory for your phone.'}</p>
          <button
            onClick={handleAddToCart}
            className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}