import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Plus, LogOut } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Moderation Bot",
    price: "$9.99",
    description: "Powerful mod commands, logs, auto mod, and more."
  },
  {
    id: 2,
    name: "Ticket System",
    price: "$7.99",
    description: "Advanced ticket panel with dropdowns, claiming & closing."
  },
  {
    id: 3,
    name: "Giveaway Bot",
    price: "$5.99",
    description: "Run giveaways, reroll winners, auto entries, and more."
  }
];

export default function SynccDashboard() {
  const [products, setProducts] = useState(mockProducts);
  const [view, setView] = useState("store");
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
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
        description
      };
      setProducts([...products, newProduct]);
    }
  };

  const handleDashboardAccess = () => {
    if (adminPasswordInput === adminPassword) {
      setIsAuthenticated(true);
      setView("dashboard");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Syncc Admin</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => setView("store")}>Store</Button>
          <Button variant="outline" onClick={() => setView("dashboard")}>Dashboard</Button>
          <Button variant="destructive" onClick={() => { setIsAuthenticated(false); alert("Logged out"); }}>Logout</Button>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="max-w-md mx-auto bg-zinc-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={adminPasswordInput}
            onChange={(e) => setAdminPasswordInput(e.target.value)}
            className="w-full p-2 rounded mb-4 text-black"
          />
          <Button className="w-full" onClick={handleDashboardAccess}>
            Login
          </Button>
        </div>
      )}

      {view === "store" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Syncc Bot Store</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-zinc-800">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm mb-2">{product.description}</p>
                  <p className="text-md font-bold mb-2">{product.price}</p>
                  <Button onClick={() => handleBuy(product)} className="w-full flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {view === "dashboard" && isAuthenticated && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
          <Button onClick={handleAddProduct} className="mb-6 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
          <div>
            <h3 className="text-lg font-medium mb-2">Orders</h3>
            {orders.length === 0 ? (
              <p className="text-gray-400">No orders yet.</p>
            ) : (
              <ul className="space-y-2">
                {orders.map((order, index) => (
                  <li key={index} className="border p-2 rounded">
                    <strong>{order.product.name}</strong> — {order.product.price} <span className="text-sm text-gray-400">({order.date})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
