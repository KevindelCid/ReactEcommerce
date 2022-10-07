import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  addProductQuantityOnCartUserThunk,
  deleteProduct,
  deleteProductOnCartUserThunk,
} from "../store/slices/cart.slice";
import "../styles/cartproduct.css";

const CartProduct = ({ product, count }) => {
  const [quantity, setQuantity] = useState(count);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);
  const user = localStorage.getItem("user");

  return (
    <li className="li-cart">
      <div className="contador">
        <div>
<div className="titulo-cart">
      <img className="img-cart" src={product.productImgs[0]} width="50"  alt={product.title} />
      <br />
      {product.title}
      <br />
     </div>
        <span className="quantity"> <strong>Quantity</strong> </span>
        <br />
        <div className="div-contador">
          <button
            className="menos"
            onClick={() => {
              if (user) {
                if (quantity >= 2) {
                  setQuantity(quantity - 1);
                  dispatch(
                    addProductQuantityOnCartUserThunk(
                      product,
                      quantity,
                      "subtraction"
                    )
                  );
                }
              } else {
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
              if (user) {
                // aqui vamos a agregar 1 del producto seleccionado
                dispatch(
                  addProductQuantityOnCartUserThunk(
                    product,
                    quantity,
                    "addition"
                  )
                );
              } else dispatch(addProduct(product));
            }}
          >
            +
          </button>
</div>
        </div>
        <div className="trash-cart">
        <FontAwesomeIcon
          onClick={() => {
            dispatch(deleteProductOnCartUserThunk(product.id));
          }}
          icon={faTrashCan}
        />
        </div>
      </div>
      <div className="price-cart">
      Total: <strong>${product.price * quantity}</strong> 
      </div>
    </li>
  );
};

export default CartProduct;
