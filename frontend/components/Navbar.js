'use client';
import Link from 'next/link';

export default function Navbar({ token, setToken, cart, setSearchQuery }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Phone Accessories</Link>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded text-black"
          />
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/orders" className="hover:underline">Orders</Link>
          <Link href="/cart" className="hover:underline">
            Cart ({cart.length})
          </Link>
          {token ? (
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          ) : (
            <Link href="/" className="hover:underline">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}