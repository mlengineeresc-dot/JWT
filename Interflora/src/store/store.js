import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../featureSlice/ProductReducer";
import cartSlice from "../featureSlice/CartReducer";
import searchReducer from "../featureSlice/SearchReducer";

const store = configureStore({
  reducer: {
    product: productSlice,
    cart: cartSlice,
    search: searchReducer,
  },
});

export default store;
