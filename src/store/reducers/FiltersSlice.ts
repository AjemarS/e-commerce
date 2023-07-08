import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/product";

interface FiltersState {
  category: string;
  price: number;
  priceRange: [number, number];
  filteredProducts: IProduct[];
}

const initialState: FiltersState = {
  category: "",
  price: 0,
  priceRange: [0, 0],
  filteredProducts: [],
};

const FiltersSlice = createSlice({
  name: "Filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    filterProduct: (state, action: PayloadAction<IProduct[]>) => {
      state.filteredProducts = action.payload.filter((product: IProduct) => {
        if (product.category !== state.category) {
          return false;
        }

        if (product.price !== state.price) {
          return false;
        }

        if (
          product.price < state.priceRange[0] ||
          product.price > state.priceRange[1]
        ) {
          return false;
        }

        return true;
      });
    },
  },
});

export const { setCategory, setPrice, setPriceRange, filterProduct } =
  FiltersSlice.actions;
export default FiltersSlice.reducer;
