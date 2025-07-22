import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Plus, LogOut } from "lucide-react";

const mockProducts = [
  {
    name: "Moderation Bot",
    price: "$9.99",
    description: "Powerful mod commands, logs, auto mod, and more.",
    id: 1,
  },
  {
    name: "Ticket System",
    price: "$7.99",
    description: "Advanced ticket panel with dropdowns, claiming & closing.",
    id: 2,
  },
  {
    name: "Giveaway Bot",
    price: "$5.99",
    description: "Run giveaways, reroll winners, auto entries, and more.",
    id: 3,
  },
];

export default function SynccDashboard() {
  const [products, setProducts] = useState(mockProducts);
  const [view, setView] = useState("store");
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const adminPassword = "synccsecure123";

  const handleBuy = (product) => {
    setOrders([...orders, { product, date: new Date().toLocaleString() }]);
    alert(`Purchased ${product.name}`);
  };

  const handleAddProduct = () => {
    const name = prompt("Product Name:");
    const price = prompt("Price:");
    const description = prompt("Description:");
    if (name && price && description) {
      const newProduct = {
        id: Date.now(),
        name,
        price,
        description,
      };
      setProducts([...products, newProduct]);
    }
  };

  const handleDashboardAccess = () => {
    if (!isAuthenticated) {
      const input = prompt("Enter admin password:");
      if (input === adminPassword) {
        setIsAuthenticated(true);
        setView("dashboard");
      } else {
        alert("Incorrect password.");
      }
    } else {
      setView("dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <header className="p-6 flex justify-between items-center bg-gray-950 shadow-md border-b border-gray-800">
        <h1 className="text-3xl font-bold">Syncc Admin</h1>
        <nav className="space-x-4 text-sm">
          <Button variant="ghost" onClick={() => setView("store")}>Store</Button>
          <Button variant="ghost" onClick={handleDashboardAccess}>Dashboard</Button>
          <Button variant="ghost" onClick={() => alert("Logged out")}>Logout <LogOut className="w-4 h-4 ml-1" /></Button>
        </nav>
      </header>

      {view === "store" && (
        <section className="px-10 py-12">
          <h2 className="text-4xl font-bold mb-6">Syncc Bot Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-gray-900 border border-gray-700 hover:scale-[1.02] transition shadow-xl">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{product.description}</p>
                  <p className="text-lg font-semibold mb-4">{product.price}</p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleBuy(product)}>
                    <ShoppingCart className="w-4 h-4 mr-2" /> Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {view === "dashboard" && (
        <section className="px-10 py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Admin Dashboard</h2>
            <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-1" /> Add Product
            </Button>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">Orders</h3>
            <ul className="bg-gray-900 p-4 rounded-lg border border-gray-800 divide-y divide-gray-800">
              {orders.length === 0 && <p className="text-gray-500">No orders yet.</p>}
              {orders.map((order, index) => (
                <li key={index} className="py-2 text-sm text-gray-300">
                  <strong>{order.product.name}</strong> — {order.product.price} <span className="text-gray-500 ml-2">{order.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Your Products</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg mb-1">{product.name}</h4>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                  <p className="text-blue-400 font-semibold mt-2">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="text-center py-6 text-sm text-gray-600 border-t border-gray-800">
        © 2025 Syncc. All rights reserved.
      </footer>
    </div>
  );
}
