export const addCart = createAsyncThunk(
  "cart/addCart",
  async (product, { getState }) => {
    const state = getState();
    const existingItem = state.cart.cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity on the server (if your backend supports it)
      // Otherwise, just update locally and skip the POST
      const updatedProduct = {
        ...product,
        quantity: existingItem.quantity + 1,
      };
      // If your backend supports updating, send updatedProduct
      const response = await api.put(`/${product.id}`, updatedProduct);
      return response.data;
    } else {
      // Add new item
      const response = await api.post("/", product);
      return response.data;
    }
  }
);




addCase(addCart.fulfilled, (state, action) => {
  const saved = action.payload;
  const incoming = action.meta.arg;

  const existing = state.cart.find(item => item.id === saved.id);

  if (existing) {
    existing.quantity += 1;
    existing.totalPrice = Number((existing.quantity * existing.price).toFixed(2));
  } else {
    state.cart.push({
      id: saved.id,
      title: saved.title,
      price: saved.price,
      quantity: 1,
      totalPrice: Number((saved.price).toFixed(2)),
    });
  }
});


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeQty, removeFromCart, clearCart } from "./cartSlice";
 
export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
 
  if (!items.length)
    return <p className="text-center my-16">Your cart is empty.</p>;
 
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
 
  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    dispatch(changeQty({ id, qty }));
  };
 
  return (
    <div className="max-w-2xl mx-auto my-8 bg-white p-6 rounded shadow transition-transform duration-200 hover:scale-105">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between py-2 border-b gap-2 transition-transform duration-200 hover:scale-105"
        >
          <img
            src={item.image || "https://via.placeholder.com/50"}
            alt={item.title}
            className="w-14 h-14 object-cover rounded mr-2 border"
          />
          <div className="flex-1">
            <div className="font-bold">{item.title}</div>
            <div className="text-gray-500 text-xs">${item.price}</div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleQtyChange(item.id, item.qty - 1)}
              className="px-2 py-0 bg-gray-200 rounded hover:bg-gray-300"
              aria-label="Decrease Quantity"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) =>
                handleQtyChange(item.id, Number(e.target.value))
              }
              className="w-14 text-center border rounded"
              style={{
                appearance: "textfield",
                MozAppearance: "textfield",
                WebkitAppearance: "none",
              }}
            />
            <button
              onClick={() => handleQtyChange(item.id, item.qty + 1)}
              className="px-2 py-0 bg-gray-200 rounded hover:bg-gray-300"
              aria-label="Increase Quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-xs bg-red-400 text-white px-2 py-1 rounded ml-2 hover:bg-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-between font-bold mt-6 text-lg transition-transform duration-200 hover:scale-105">
        <div>Total:</div>
        <div>${total.toFixed(2)}</div>
      </div>
      <button
        onClick={() => dispatch(clearCart())}
        className="btn btn-sm w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded  transition-transform duration-200 hover:scale-105"
      >
        Clear Cart
      </button>
    </div>
  );
}
 
 
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import AddProductPage from "./pages/AddProductPage";
import Cart from "./features/cart/Cart";
import { useSelector } from "react-redux";
 
export default function App() {
  const cartCount = useSelector(s => s.cart.items.reduce((a, b) => a + b.qty, 0));
 
  return (
    <BrowserRouter>
      <header className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">MyShop</Link>
        <nav className="space-x-4">
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/add-product" className="hover:underline">Add Product</Link>
          <Link to="/cart" className="relative hover:underline">
            Cart
            {cartCount > 0 && (
              <span className="ml-1 px-2 py-1 rounded-full bg-red-500 text-xs">{cartCount}</span>
            )}
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
 

import { createSlice } from "@reduxjs/toolkit";
 
const initial = JSON.parse(localStorage.getItem('cart') || '[]');
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: initial },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.find(i => i.id === action.payload.id);
      found ? found.qty++ : state.items.push({ ...action.payload, qty: 1 });
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    changeQty: (state, { payload }) => {
      const item = state.items.find(i => i.id === payload.id);
      if (item) item.qty = payload.qty;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }
});
 









 