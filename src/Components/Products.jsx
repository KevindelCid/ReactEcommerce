import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  addProduct,
  addSameProduct,
  addUserProductToCart,
  getCartThunk,
} from "../store/slices/cart.slice";
import axios from "axios";

const Product = ({ filteredProducts, setProductFiltered }) => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");
  const cart = useSelector((state) => state.cart);

  useEffect(() => {}, []);

  return (
    <section className="section-products">
      <h2>Explore our products</h2>

      <div className="contaniner-products">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <Card className="shadow" style={{ width: "18rem" }}>
              <Card.Img
                className="click"
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  window.scrollTo(0, 0);
                }}
                variant="top"
                src={product.productImgs[0]}
              />
              <Card.Body>
                <Card.Title
                  className="click"
                  onClick={() => navigate(`/product/${product.id}`)}
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
                            addUserProductToCart({
                              id: product.id,
                              quantity: 1,
                            })
                          );
                          dispatch(getCartThunk());

                          //

                          // const result = cart.find(item=> item?.id === product?.id)

                          // if(result === undefined){
                          //   dispatch(addProduct({id: product.id, quantity: 1}))
                          // }
                          // else{

                          //   const results = {id: result.id, quantity: result.quantity+1}

                          // const index = cart.findIndex(x=>x.id === results.id)

                          // const cartFake = cart;
                          // console.log(cartFake)
                          //     cartFake.splice(index)
                          //     cartFake.push(results)
                          //     dispatch(addProduct(cart))
                          //   // dispatch(addSameProduct(results))
                          // }
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product;
