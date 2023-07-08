import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";
import { IProduct } from "../../models/product";
import {
  setIsSearchedProducts,
  setSearchedProducts,
  updateCurrentProducts,
} from "./ProductSlice";

interface SearchState {
  searchQuery: string;
  searchResults: IProduct[];
}

const initialState: SearchState = {
  searchQuery: "",
  searchResults: [],
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<IProduct[]>) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults } = SearchSlice.actions;

export const searchProducts = (): AppThunk => async (dispatch, getState) => {
  try {
    const { searchQuery } = getState().search;

    const response = await axios.get(
      `https://dummyjson.com/products/search?limit=100&q=${searchQuery}`,
    );

    const searchResults: IProduct[] = response.data.products;

    dispatch(setSearchResults(searchResults));
    dispatch(setIsSearchedProducts(true));
    dispatch(setSearchedProducts(searchResults));
    dispatch(updateCurrentProducts());
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

export const selectSearchQuery = (state: RootState) => state.search.searchQuery;
export const selectSearchResults = (state: RootState) =>
  state.search.searchResults;

export default SearchSlice.reducer;
