import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "../../models/product";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<IProduct[]>(
        "https://api.escuelajs.co/api/v1/products",
      );
      return response.data;
    } catch (e) {
      thunkApi.rejectWithValue("Не вдалось завантажити користувачів");
    }
  },
);
