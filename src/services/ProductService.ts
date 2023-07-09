import { IProduct } from "./../models/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  tagTypes: ["Product", "Category"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query<IProduct[], number[]>({
      query: ([limit, skip]: number[]) => ({
        url: `/products`,
        params: { limit: limit, skip: skip },
      }),
      transformResponse: (response: { products: IProduct[] }) =>
        response.products,
      providesTags: (result) => ["Product"],
    }),

    fetchAllCategories: builder.query<string[], void>({
      query: () => ({
        url: `/products/categories`,
        params: {},
      }),
      transformResponse: (response: string[]) =>
        response.map(
          (item) => (item = item.charAt(0).toUpperCase() + item.slice(1)),
        ),
      providesTags: (result) => ["Category"],
    }),
  }),
});

export const { useFetchAllProductsQuery, useFetchAllCategoriesQuery } =
  productAPI;
