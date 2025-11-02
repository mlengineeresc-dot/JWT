import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../featureSlice/ProductReducer";
import cartSlice from "../featureSlice/CartReducer";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
  },
});

export default store;
