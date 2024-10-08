import React from 'react';
import { useSelector } from 'react-redux';


function Cart() {
  const cartProducts = useSelector(state => state.cart); // Access the cart data


  return (
    <>
        {cartProducts.map(product =>(
            <div key={product.id}>
                {product.title}
            </div>
        ))}
    </>
  );
}

export default Cart;