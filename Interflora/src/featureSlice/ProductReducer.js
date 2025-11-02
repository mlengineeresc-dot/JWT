import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = "http://localhost:5432/products";

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async () => {
    // const response = await axios.get(`${api}/products`);
    const response = await axios.get(api);
    return response.data;
  }
);

export const fetchOne = createAsyncThunk("product/fetchOne", async (id) => {
  const response = await axios.get(`${api}/${id}`);
//   console.log("edit form id ", response);

  return response.data;
});

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({id,...data}) => {
    console.log("id at api call", id,data);
    const response = await axios.put(`${api}/${id}`,data);
    return response.data;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    const response = await axios.post(api, newProduct);
    return response.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const response = await axios.delete(`${api}/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    product: [],
    OneProduct: [],
    editProduct: [],
    loading: false,
    error: null,
    count: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOne.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOne.fulfilled, (state, action) => {
        state.OneProduct = action.payload;
        state.editProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchOne.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.editProduct = action.payload;
        state.loading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.editProduct = action.payload;
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
