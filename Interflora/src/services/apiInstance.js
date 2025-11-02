import { createAsyncThunk } from "@reduxjs/toolkit";
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

  return response.data;
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct) => {
    const response = await axios.post(api, newProduct);
    return response.data;
  }
);
