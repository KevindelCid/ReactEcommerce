import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  addProduct,
  addUserProductToCartThunk,
  getCartThunk,
} from "../store/slices/cart.slice";
import axios from "axios";
import { motion } from "framer-motion";

const Product = ({ filteredProducts, setProductFiltered }) => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const cart = useSelector((state) => state.cart);

  useEffect(() => {}, []);

  return (
    <motion.section
      className="section-products"
      initial={{ y: -200 }}
      // drag="y"
      // dragConstraints={{ top: 20, bottom: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Explore our products</h2>

      <div className="contaniner-products">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ x: 400, scale: 0.5 }}
            // drag="y"
            // dragConstraints={{ top: 20, bottom: 50 }}
            animate={{ x: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow" style={{ width: "18rem" }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <Card.Img
                  className="click"
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    window.scrollTo(0, 0);
                  }}
                  variant="top"
                  src={product.productImgs[0]}
                />
              </motion.div>
              <Card.Body>
                <Card.Title
                  className="click"
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  {" "}
                  {product.title?.length > 20
                    ? `${product.title.substring(0, 20)}...`
                    : product.title}
                </Card.Title>
                <Card.Text>
                  {`${product.description.substring(0, 80)} ... `}
                </Card.Text>
                <Row>
                  <Col>
                    <span>Price</span>
                    <h3>${product.price}</h3>
                  </Col>
                  <Col xs={6} md={3}>
                    <Button
                      onClick={() => {
                        if (user) {
                          dispatch(
                            addUserProductToCartThunk({
                              id: product.id,
                              quantity: 1,
                            })
                          );
                          dispatch(getCartThunk());
                        } else dispatch(addProduct(product));
                      }}
                      className="add-cart-on-card"
                    >
                      <FontAwesomeIcon icon={faCartShopping} />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Product;
