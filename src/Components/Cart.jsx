import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartProduct from "./CartProduct";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  const diferentProducts = () => {};

  const elements = cart.filter((item, index) => cart.indexOf(item) === index);

  const productsCart = elements.map((product) => {
    let count = 0;
    cart.map((item) => {
      if (product.id === item.id) {
        count += 1;
      }
    });
    return { product, count };
  });

  const getTotal = () => {
    let total = 0;

    productsCart.foreach((product) => {
      total = total + product.product.price * products.count;
    });

    return total;
  };
  let totalPrice = 0;

  const displayCart = () => {
    if (cart.length < 1) {
      return (
        <>
          <h2>The Cart Is Empty</h2>
        </>
      );
    } else {
      return (
        <>
          <h3> hay un total de {cart.length} productos</h3>
          <h3>{productsCart.length} de ellos son diferentes</h3>
          {productsCart.map((product, index) => (
            <ul key={index}>
              <CartProduct product={product} />
            </ul>
          ))}{" "}
          {productsCart.map((prod) => {
            totalPrice = totalPrice + prod.product.price * prod.count;
          })}
          el total a pagar es:{totalPrice}
          <button type="">Check in</button>
        </>
      );
    }
  };

  return <div>{displayCart()}</div>;
};

export default Cart;
