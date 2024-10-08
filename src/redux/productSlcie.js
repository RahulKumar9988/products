import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: [],
    categories: [],
    loading: false,
    error: null,
};

export const getProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async (category) => {
        const url = category
            ? `https://dummyjson.com/products/category/${category}`
            : 'https://dummyjson.com/products';
        const response = await axios.get(url);
        console.log("API Response:", response.data.products); // Debug response
        return response.data.products;
    }
);



// Thunk to fetch categories
export const getCategories = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        const response = await axios.get('https://dummyjson.com/products/categories');
        return response.data;
    }
);

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetching products by category
            .addCase(getProductsByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            // Handle fetching categories
            .addCase(getCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });
    },
});

export default productSlice.reducer;
