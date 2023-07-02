import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import filtersReducer from "./reducers/FiltersSlice";
import searchReducer from "./reducers/SearchSlice";
import productReducer from "./reducers/ProductSlice";
import { categoryAPI } from "../services/CategoryService";
import { productAPI } from "../services/ProductService";

const rootReducer = combineReducers({
  product: productReducer,
  filter: filtersReducer,
  search: searchReducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productAPI.middleware)
        .concat(categoryAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
