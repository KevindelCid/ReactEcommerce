import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../store/slices/cart.slice";

const CartProduct = ({ product, count }) => {
  const [quantity, setQuantity] = useState(count);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const user = localStorage.getItem('user')

  return (
    <li>
      {product.title}
      Quantity:
      <div className="contador">
        <span className="quantity">Quantity</span>
        <br />
        <div className="div-contador">
          <button
            className="menos"
            onClick={() => {



              if(user) alert('la persona esta logeada, actuaremos distinto') //dispatch(addProductToCartUser(product))
              else
            {  

              if (!quantity < 1) setQuantity(quantity - 1);
              let key = false;
              products.find((product1, index) => {
                
                if (product1.id === product?.id && key === false) {
                 
                  dispatch(deleteProduct(index));
                  key = true;
                }
              });
              }
            }}
          >
            -
          </button>

          <input
            type="text"
            className="input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="mas"
            onClick={() => {
              setQuantity(quantity + 1);
              if(user) alert('la persona esta logeada, actuaremos distinto') //dispatch(addProductToCartUser(product))
              else
              dispatch(addProduct(product));
            }}
          >
            +
          </button>
        </div>
      </div>
      Total: ${product.price * quantity}
    </li>
  );
};

export default CartProduct;
