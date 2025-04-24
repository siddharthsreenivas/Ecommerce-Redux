import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		addToCart: (state, action) => {
			const item = state.find((item) => item.id === action.payload.id);
			if (item) {
				item.quantity += 1;
			} else {
				const sellingPrice = action.payload.discount
					? Math.floor(
							(action.payload.price -
								(action.payload.price * action.payload.discount) / 100) * 83.2
					  )
					: Math.floor(action.payload.price * 83.2);
				const discountAmount = action.payload.discount
					? Math.floor(action.payload.price * 83.2) - sellingPrice
					: 0;
				state.push({
					...action.payload,
					quantity: 1,
					sellingPrice,
					discountAmount,
				});
			}
		},
		removeFromCart: (state, action) => {
			return state.filter((item) => item.id !== action.payload);
		},
		decreaseQuantity: (state, action) => {
			const item = state.find((item) => item.id === action.payload);
			if (item) {
				if (item.quantity === 1) {
					return state.filter((item) => item.id !== action.payload);
				} else {
					item.quantity -= 1;
				}
			}
		},
		setCart: (state,action) => {
			return action.payload
		},
		clearCart: () => [],
	},
});

export const { addToCart, clearCart, decreaseQuantity, removeFromCart, setCart } =
	cartSlice.actions;
export default cartSlice.reducer;
