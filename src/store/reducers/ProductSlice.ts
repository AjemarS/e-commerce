import { IProduct } from "./../../models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./ActionCreators";

interface ProductState {
  products: IProduct[];
  isLoading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: "",
};

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchProducts.fulfilled.type,
        (state, action: PayloadAction<IProduct[]>) => {
          state.isLoading = false;
          state.error = "";
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProducts.rejected.type,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export default ProductSlice.reducer;
