import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './cartSlice'
import  productSlcie  from './productSlcie';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlcie,
  },

})

export default store;