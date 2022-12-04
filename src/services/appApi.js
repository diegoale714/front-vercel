import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// create the api

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://vercel-back3.onrender.com' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: 'https://vercel-back3.onrender.com/users/signup',
        method: 'POST',
        body: user,
      }),
    }),

    login: builder.mutation({
      query: (user) => ({
        url: 'https://vercel-back3.onrender.com/users/login',
        method: 'POST',
        body: user,
      }),
    }),
    // creating product
    createProduct: builder.mutation({
      query: (product) => ({
        url: 'https://vercel-back3.onrender.com/products',
        body: product,
        method: 'POST',
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({ product_id, user_id }) => ({
        url: `https://vercel-back3.onrender.com/products/${product_id}`,
        body: {
          user_id,
        },
        method: 'DELETE',
      }),
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `https://vercel-back3.onrender.com/products/${product.id}`,
        body: product,
        method: 'PATCH',
      }),
    }),

    // add to cart
    addToCart: builder.mutation({
      query: (cartInfo) => ({
        url: 'https://vercel-back3.onrender.com/products/add-to-cart',
        body: cartInfo,
        method: 'POST',
      }),
    }),
    // remove from cart
    removeFromCart: builder.mutation({
      query: (body) => ({
        url: 'https://vercel-back3.onrender.com/products/remove-from-cart',
        body,
        method: 'POST',
      }),
    }),

    // increase cart
    increaseCartProduct: builder.mutation({
      query: (body) => ({
        url: 'https://vercel-back3.onrender.com/products/increase-cart',
        body,
        method: 'POST',
      }),
    }),

    // decrease cart
    decreaseCartProduct: builder.mutation({
      query: (body) => ({
        url: 'https://vercel-back3.onrender.com/products/decrease-cart',
        body,
        method: 'POST',
      }),
    }),
    // create order
    createOrder: builder.mutation({
      query: (body) => ({
        url: 'https://vercel-back3.onrender.com/orders',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useCreateProductMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useIncreaseCartProductMutation,
  useDecreaseCartProductMutation,
  useCreateOrderMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = appApi

export default appApi
