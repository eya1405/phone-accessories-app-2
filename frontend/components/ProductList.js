'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ProductList({ token, role, cart, setCart, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', description: '' });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewProduct({ name: '', price: '', stock: '', description: '' });
      fetchProducts();
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  useEffect(() => {
    if (searchQuery) {
      setProducts((prev) =>
        prev.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    } else {
      fetchProducts();
    }
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {role === 'admin' && (
        <form onSubmit={handleAddProduct} className="mb-8 p-6 bg-white rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Product Name"
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Price"
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="number"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              placeholder="Stock"
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              placeholder="Description"
              className="p-3 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Product
          </button>
        </form>
      )}
      <div className="flex justify-between mb-6">
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Refresh Products'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
            <Link href={`/products/${product._id}`}>
              <img
                src="https://via.placeholder.com/300x200?text=Product"
                alt={product.name}
                className="w-full h-48 object-cover hover:opacity-75"
              />
            </Link>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}