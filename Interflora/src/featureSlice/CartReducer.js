import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const baseURL = "http://localhost:5432/cart";
const api = axios.create({
  baseURL: baseURL,
});

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async () => {
    const response = await api.get();
    return response.data;
  }
);

export const addCart = createAsyncThunk("cart/addCart", async (product) => {
  const { data: existingItems } = await api.get("/");

  const found = existingItems.find(
    (item) => Number(item.originalId) === Number(product.id)
  );

  if (found) {
    const updated = {
      ...found,
      quantity: (found.quantity || 1) + 1,
      totalPrice: Number(((found.quantity || 1) + 1) * found.price).toFixed(2),
    };
    await api.patch(`/${found.id}`, updated);
    return updated;
  }

  const newItem = {
    ...product,
    originalId: product.id,
    quantity: 1,
    totalPrice: Number(product.price).toFixed(2),
  };

  const response = await api.post("/", newItem);
  return response.data;
});

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id) => {
    await api.delete(`/${id}`);
    return id; 
  }
);

export const clearCartAsync = createAsyncThunk(
  "cart/clearCart",
  async () => {
    const { data: existingItems } = await api.get("/");

    await Promise.all(existingItems.map((item) => api.delete(`/${item.id}`)));

    return [];
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false;
        const incoming = action.payload;

        const existingIndex = state.cart.findIndex(
          (it) =>
            Number(it.id) === Number(incoming.id) ||
            Number(it.originalId) === Number(incoming.originalId)
        );

        if (existingIndex !== -1) {
          state.cart[existingIndex] = incoming;
        } else {
          state.cart.push(incoming);
        }
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (item) => Number(item.id) !== Number(action.payload)
        );
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.cart = [];
      });
  },
});

export default cartSlice.reducer;
export const { clearCart } = cartSlice.actions;
