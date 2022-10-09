import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartVisible } from "../store/slices/cartIsVisible.slice";
import Cart from "./Cart";
import { motion } from "framer-motion";
import { Button, Offcanvas } from "react-bootstrap";

const CartSide = () => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.cartVisible);

  const handleClose = () => dispatch(setIsCartVisible(false));
  const handleShow = () => dispatch(setIsCartVisible(true));

  return (
    <div>
      <Offcanvas show={show} onHide={handleClose} {...{ placement: "end" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Cart />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartSide;
