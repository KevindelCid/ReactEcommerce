import React from "react";
import { useDispatch } from "react-redux";
import { setIsCartVisible } from "../store/slices/cartIsVisible.slice";
import Cart from "./Cart";

const CartSide = () => {
  const dispatch = useDispatch();

  return (
    <aside className="filterside-main">
      <div
        className="filterside-close"
        onClick={() => dispatch(setIsCartVisible(false))}
      ></div>

      <div className="filterside-principal">
        <div className="space"></div>
        {/* <Categories
          setFilteredProducts={setFilteredProducts}
          setIsVisibleFilterSide={setIsVisibleFilterSide}
        /> */}
        <Cart  />
      </div>
    </aside>
  );
};

export default CartSide;
