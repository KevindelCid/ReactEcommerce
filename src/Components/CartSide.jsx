import React from "react";
import { useDispatch } from "react-redux";
import { setIsCartVisible } from "../store/slices/cartIsVisible.slice";
import Cart from "./Cart";

const CartSide = () => {
  const dispatch = useDispatch();

  return (
    <aside className="cart-side-main">
      <div
        className="cart-side-close"
        onClick={() => dispatch(setIsCartVisible(false))}
      ></div>

      <div className="cart-side-principal">
        <div className="space"></div>
        {/* <Categories
          setFilteredProducts={setFilteredProducts}
          setIsVisibleFilterSide={setIsVisibleFilterSide}
        /> */}
        <Cart />
      </div>
    </aside>
  );
};

export default CartSide;
