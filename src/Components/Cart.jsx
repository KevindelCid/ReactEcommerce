import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { purchaseCartThunk } from "../store/slices/cart.slice";
import { setIsCartVisible } from "../store/slices/cartIsVisible.slice";
import CartProduct from "./CartProduct";
import { motion } from "framer-motion";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = localStorage.getItem("user");
  const allProducts = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const elements = cart.filter((item, index) => cart.indexOf(item) === index);
  const navigate = useNavigate();

  const productsCart = elements.map((product) => {
    let count = 0;
    cart.map((item) => {
      if (product.id === item.id) {
        count += 1;
      }
    });
    return { product, count };
  });

  let totalPrice = 0;

  const displayCart = () => {
    if (user) {
      // carrito para logueados
      if (cart.length < 1) {
        return <h2>Cart is empty</h2>;
      }

      const products = cart.map((item) => {
        let prod = allProducts.find((product) => product.id === item.id);
        return { product: prod, quantity: item.productsInCart.quantity };
      });

      return (
        <>
          {" "}
          <ul
            className="cartproduct-container"
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            exit={{ x: 200 }}
          >
            {products.map((product, index) => (
              <CartProduct
                key={product.id + "" + index}
                product={product.product}
                count={product.quantity}
              />
            ))}
          </ul>{" "}
          <button
            className="buttom-add"
            onClick={() => {
              if (user) {
                //compramos el carrito

                dispatch(purchaseCartThunk());
              } else addQuantityProducts(quantity);
            }}
          >
            Purchase Cart
          </button>
        </>
      );
    } else {
      if (cart.length < 1) {
        return (
          <>
            <h2>The Cart Is Empty</h2>
          </>
        );
      } else {
        return (
          <>
            {/* <h3> hay un total de {cart.length} productos</h3>
            <h3>{productsCart.length} de ellos son diferentes</h3> */}
            <ul className="cartproduct-container">
              {productsCart.map((product, index) => (
                <CartProduct
                  key={product.id + "" + index}
                  product={product.product}
                  count={product.count}
                />
              ))}{" "}
            </ul>
            {productsCart.map((prod) => {
              totalPrice = totalPrice + prod.product.price * prod.count;
            })}
            <button
              className="buttom-add"
              onClick={() => {
                if (user) {
                  //compramos el carrito

                  dispatch(purchaseCartThunk());
                } else {
                  navigate("/login");
                  window.scrollTo(0, 0);
                  dispatch(setIsCartVisible(false));
                }
              }}
            >
              Purchase Cart ${totalPrice}
            </button>
          </>
        );
      }
    }
  };

  return <div>{displayCart()}</div>;
};

export default Cart;
