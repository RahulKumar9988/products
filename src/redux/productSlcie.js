import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for fetching data
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://dummyjson.com/products/');
  return response.data.products;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get('https://dummyjson.com/products/categories');
  return response.data;
});

export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (category) => {
  if (category === '') {
    const response = await axios.get('https://dummyjson.com/products/');
    return response.data.products;
  } else {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return response.data.products;
  }
});

// Initial state
const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
};

// Product slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Optionally, we can add reducers for other synchronous actions
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Fetch products by category
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export default productsSlice.reducer;
