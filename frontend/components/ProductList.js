
'use client';
export default function ProductList({ token, role, cart, setCart, searchQuery, products }) {
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Phone Accessories</h2>
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover mb-2"
                onError={(e) => (e.target.src = '/images/placeholder.jpg')}
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p className="text-sm">{product.description}</p>
              <p className="text-sm">Stock: {product.stock}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white p-2 mt-2 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
