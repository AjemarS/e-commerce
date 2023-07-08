import { IProduct } from "./../../models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";

interface ProductState {
  allProducts: IProduct[];
  searchedProducts: IProduct[];
  isSearchedProducts: boolean;
  filteredProducts: IProduct[];
  currentProducts: IProduct[];
  currentPage: number;
  productsPerPage: number;
}

const initialState: ProductState = {
  allProducts: [],
  searchedProducts: [],
  isSearchedProducts: false,
  filteredProducts: [],
  currentProducts: [],
  currentPage: 1,
  productsPerPage: 20,
};

export const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.allProducts = action.payload;
    },
    setSearchedProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.searchedProducts = action.payload;
    },
    setIsSearchedProducts: (state, action: PayloadAction<boolean>) => {
      state.isSearchedProducts = action.payload;
    },
    setFilteredProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.filteredProducts = action.payload;
    },
    setCurrentProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.currentProducts = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setProductsPerPage: (state, action: PayloadAction<number>) => {
      state.productsPerPage = action.payload;
    },
  },
});

export const updateCurrentProducts = (): AppThunk => (dispatch, getState) => {
  const { allProducts } = getState().product;
  const { searchedProducts } = getState().product;
  const { isSearchedProducts } = getState().product;

  let currentProducts: IProduct[] = [];
  isSearchedProducts
    ? (currentProducts = searchedProducts)
    : (currentProducts = allProducts);

  dispatch(setCurrentProducts(currentProducts));
};

export const {
  setAllProducts,
  setSearchedProducts,
  setIsSearchedProducts,
  setFilteredProducts,
  setCurrentProducts,
  setCurrentPage,
  setProductsPerPage,
} = ProductSlice.actions;
export default ProductSlice.reducer;
