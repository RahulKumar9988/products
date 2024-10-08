import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlcie';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
