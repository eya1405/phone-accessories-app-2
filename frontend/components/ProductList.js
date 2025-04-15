'use client';
import { useState, useEffect } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3002')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const addToCart = async (productId, quantity) => {
    try {
      await fetch('http://localhost:3003/api/cart/test@example.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity, price: products.find(p => p.id === productId).price }),
      });
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  return (
    <div>
      <a href="http://localhost:4200" target="_blank" className="bg-blue-500 text-white p-2 rounded">View Cart</a>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id}>
            <img src="/images/placeholder.jpg" alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} TND</p>
            <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
