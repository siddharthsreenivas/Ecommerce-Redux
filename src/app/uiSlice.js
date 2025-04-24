import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		selectedCategory: "all",
		activePage: 1,
		searchValue: ''
	},
	reducers: {
		setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
		setActivePage: (state,action) => {
			state.activePage = action.payload;
		},
		setSearchValue: (state,action) => {
			state.searchValue = action.payload
		}

	},
});

export const { setSelectedCategory, setActivePage, setSearchValue } = uiSlice.actions;
export default uiSlice.reducer;