import { IProductCategory } from "../models/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryAPI = createApi({
  reducerPath: "categoryAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://api.escuelajs.co/api/v1/",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    fetchAllCategories: builder.query<IProductCategory[], string>({
      query: () => ({
        url: `/categories`,
        params: {},
      }),
      providesTags: (result) => ["Category"],
    }),
  }),
});

export const { useFetchAllCategoriesQuery } = categoryAPI;
