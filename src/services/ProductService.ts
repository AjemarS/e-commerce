import { IProduct } from "../models/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: " https://api.escuelajs.co/api/v1/",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query<IProduct[], number[]>({
      query: ([offset, limit]: number[]) => ({
        url: `/products`,
        params: { offset: offset, limit: limit },
      }),
      providesTags: (result) => ["Product"],
    }),
  }),
});

export const { useFetchAllProductsQuery } = productAPI;
