import { configureStore } from "@reduxjs/toolkit";
import cartReducer from '../app/cartSlice'
import { productApi } from "../app/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from '../app/authSlice'
import categoryReducer from '../app/uiSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		ui: categoryReducer,
		[productApi.reducerPath]: productApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);