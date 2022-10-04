import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../store/slices/cart.slice";

const CartProduct = ({ product }) => {
  const [quantity, setQuantity] = useState(product.count);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  return (
    <li>
      {product.product.title}
      Quantity:
      <div className="contador">
        <span className="quantity">Quantity</span>
        <br />
        <div className="div-contador">
          <button
            className="menos"
            onClick={() => {
              if (!quantity < 1) setQuantity(quantity - 1);
              let key = false;
              products.find((product1, index) => {
                
                if (product1.id === product.product?.id && key === false) {
                 
                  dispatch(deleteProduct(index));
                  key = true;
                }
              });
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
              dispatch(addProduct(product.product));
            }}
          >
            +
          </button>
        </div>
      </div>
      Total: ${product.product.price * quantity}
    </li>
  );
};

export default CartProduct;
