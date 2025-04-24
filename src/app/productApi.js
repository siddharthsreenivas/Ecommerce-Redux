import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.in/api" }),
	endpoints: (builder) => ({
		//get all products
		getAllProducts: builder.query({
			query: () => "/products",
		}),
		//get single product
		getProductById: builder.query({
			query: (id) => `/products/${id}`,
		}),
		//get all the categories`
		getAllCategories: builder.query({
			query: () => "/products/category",
		}),
		//get products by category
		getProductsByCategory: builder.query({
			query: ({category = 'all', page = 1}) =>
				category === "all"
					? `/products?page=${Number(page)}&limit=12`
					: `/products/category?type=${category}`,
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useGetProductByIdQuery,
	useGetAllCategoriesQuery,
	useGetProductsByCategoryQuery,
} = productApi;
