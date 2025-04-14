'use client';
import { useState } from 'react';

export default function ProductList({ token, role, cart, setCart, searchQuery, products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});

  const filteredProducts = products.filter(p =>
    p && p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (product) => {
    setSelectedProduct(selectedProduct?.id === product.id ? null : product);
  };

  const handleQuantityChange = (productId, value) => {
    const product = products.find(p => p.id === productId);
    if (product && product.stock) {
      setQuantities({
        ...quantities,
        [productId]: Math.max(1, Math.min(value, product.stock))
      });
    }
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    setCart([...cart, { ...product, quantity }]);
    setQuantities({ ...quantities, [product.id]: 1 });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Phone Accessories</h2>
      {filteredProducts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded bg-white"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.image ? `/images/${product.image}` : '/images/placeholder.jpg'}
                alt={product.name || 'Product'}
                className="w-full h-32 object-cover mb-2"
              />
              <h3 className="text-lg">{product.name || 'Unknown'}</h3>
              <p>{(product.price || 0).toFixed(2)} TND</p>
              {selectedProduct?.id === product.id && (
                <div className="mt-2">
                  <p className="text-sm">{product.description || 'No description'}</p>
                  <p className="text-sm">Stock: {product.stock || 0}</p>
                  <input
                    type="number"
                    min="1"
                    max={product.stock || 1}
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                    className="w-16 p-1 border"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="bg-blue-500 text-white p-2 ml-2"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
