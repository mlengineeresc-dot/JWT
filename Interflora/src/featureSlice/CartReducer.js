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
  console.log("id received at cart", product);
  const response = await api.post("/", product);
  // console.log("product response",response);

  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    count: 0,
    loading: false,
    error: null,
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      // payload: product object at least { id, title, price }
      const incoming = action.payload;
      // ensure price is a number
      const price =
        typeof incoming.price === "string"
          ? parseFloat(incoming.price)
          : Number(incoming.price);
      //   const existing = state.items.find((it) => it.id === incoming.id);
      const existing = state.cart.find(
        (it) => Number(it.id) === Number(incoming.id)
      );

      if (existing) {
        existing.quantity += 1;
        existing.totalPrice = Number(
          (existing.quantity * existing.price).toFixed(2)
        );
      } else {
        state.cart.push({
          id: incoming.id,
          title: incoming.title ?? incoming.name,
          price: Number(isNaN(price) ? 0 : price),
          quantity: 1,
          totalPrice: Number((isNaN(price) ? 0 : price).toFixed(2)),
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.cart = action.payload;
        // console.log("id at state.cart", state.cart);

        state.loading = false;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
       const incoming = action.payload;
       // ensure price is a number
       const price =
         typeof incoming.price === "string"
           ? parseFloat(incoming.price)
           : Number(incoming.price);
       //   const existing = state.items.find((it) => it.id === incoming.id);
       const existing = state.cart.find(
         (it) => Number(it.id) === Number(incoming.id)
       );

       if (existing) {
         existing.quantity += 1;
         existing.totalPrice = Number(
           (existing.quantity * existing.price).toFixed(2)
         );
       } else {
         state.cart.push({
           id: incoming.id,
           title: incoming.title ?? incoming.name,
           price: Number(isNaN(price) ? 0 : price),
           quantity: 1,
           totalPrice: Number((isNaN(price) ? 0 : price).toFixed(2)),
         });
       }

        state.loading = false;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
