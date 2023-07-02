import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import axios from "axios";
import { IProduct } from "../../models/product";

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
      `https://api.escuelajs.co/api/v1/products/?title=${searchQuery}`,
    );

    const searchResults: IProduct[] = response.data;

    dispatch(setSearchResults(searchResults));
  } catch (error) {
    console.error("Error searching products:", error);
  }
};

export const selectSearchQuery = (state: RootState) => state.search.searchQuery;
export const selectSearchResults = (state: RootState) =>
  state.search.searchResults;

export default SearchSlice.reducer;
