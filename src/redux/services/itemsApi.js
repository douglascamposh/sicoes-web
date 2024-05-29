import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const NEXT_BASE_URL = process.env.NEXT_PUBLIC_NEXT_BASE_URL;

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${NEXT_BASE_URL}/api/v1`,
  }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({

    getItems: builder.query({
      query: (params) => ({
        url: '/items',
        params: {
          page: params.page,
          search  : params.search
          //limit : 10,
        }
      }),
      providesTags : ['Items'],
    }),
    postItem: builder.mutation({
      query: (item) => ({
        method: 'POST',
        url: '/items',
        body: item,
      }),
      //invalidatesTags: ['Items'],
    }),

    deleteItem : builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/items/${id}`,
      }),
     // invalidatesTags: ['Items'],
    })
  }),
});

export const {
  useGetItemsQuery,
  usePostItemMutation,
  useDeleteItemMutation,
} = itemsApi;
