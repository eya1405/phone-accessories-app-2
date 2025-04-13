'use client';
export default function Navbar({ token, setToken, cart, setSearchQuery }) {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-xl">Phone Accessories</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2"
        />
        <div>
          <span className="text-white">Cart: {cart.length}</span>
          <button
            onClick={() => {
              setToken('');
              localStorage.removeItem('token');
            }}
            className="ml-4 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
