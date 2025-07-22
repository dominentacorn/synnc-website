// App.jsx
import React, { useState } from "react";
import { ShoppingCart, LogOut, Plus } from "lucide-react";
import './index.css';
import logo from "./assets/Syncc Logo.png";

const mockProducts = [
  {
    id: 1,
    name: "Moderation Bot",
    price: "$9.99",
    description: "Powerful moderation system with auto-mod, logging & role-based punishments.",
  },
  {
    id: 2,
    name: "Ticket Panel",
    price: "$7.99",
    description: "Fully customizable ticket system with claim/close buttons.",
  },
  {
    id: 3,
    name: "Giveaway Bot",
    price: "$5.99",
    description: "Easy-to-use giveaway bot with auto rerolls & reaction-based entry.",
  },
];

export default function App() {
  const [view, setView] = useState("store");
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleBuy = (product) => {
    alert(`Purchased: ${product.name}`);
    setOrders([...orders, { ...product, date: new Date().toLocaleString() }]);
  };

  const handleAddProduct = () => {
    const name = prompt("Product name?");
    const price = prompt("Product price?");
    const description = prompt("Product description?");
    if (name && price && description) {
      mockProducts.push({
        id: mockProducts.length + 1,
        name,
        price,
        description,
      });
      alert("Product added! Reload the page.");
    }
  };

  if (view === "admin" && !authenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center text-white">
        <img src={logo} alt="logo" className="w-24 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
        />
        <button
          onClick={() => {
            if (password === "synccsecure123") setAuthenticated(true);
            else alert("Incorrect password");
          }}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded hover:opacity-90"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Syncc" className="w-10" />
          <h1 className="text-xl font-bold">Syncc</h1>
        </div>
        <nav className="space-x-4">
          <button onClick={() => setView("store")} className="hover:underline">Store</button>
          <button onClick={() => setView("admin")} className="hover:underline">Admin</button>
        </nav>
      </header>

      {view === "store" && (
        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {mockProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/30 border border-gray-800"
            >
              <h2 className="text-lg font-bold text-blue-400">{product.name}</h2>
              <p className="text-sm text-gray-400 mb-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold">{product.price}</span>
                <button
                  onClick={() => handleBuy(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </main>
      )}

      {view === "admin" && authenticated && (
        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Orders</h2>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>
          <ul className="space-y-4">
            {orders.map((order, i) => (
              <li
                key={i}
                className="bg-gray-800 rounded-xl p-4 flex justify-between items-center"
              >
                <span>{order.name} - {order.price}</span>
                <span className="text-sm text-gray-400">{order.date}</span>
              </li>
            ))}
            {orders.length === 0 && <p>No orders yet.</p>}
          </ul>
        </div>
      )}

      <footer className="text-center text-gray-500 py-6 border-t border-gray-800">
        <p>© 2025 Syncc Technologies — Built for Roblox + Discord Developers</p>
      </footer>
    </div>
  );
}
