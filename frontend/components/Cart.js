'use client';
import Link from 'next/link';

export default function Cart({ cart, setCart }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h2>
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
          <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
            <p className="text-xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</p>
            <Link
              href="/checkout"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}