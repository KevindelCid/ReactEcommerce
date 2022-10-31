import React, { useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/products.css";
import {
  addProduct,
  addProductLocalQuantity,
  addProductsQuantityUserThunk,
  addUserProductToCartThunk,
  getCartThunk,
} from "../store/slices/cart.slice";
import { motion } from "framer-motion";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const products = useSelector((state) => state.products);
  const product = products.find((prod) => prod.id === Number(id));

  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const user = localStorage.getItem("user");

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // console.log(product);

  const relatedPorducts = products.filter(
    (filtrateProduct) => filtrateProduct.category.id === product.category.id
  );

  const generateRelationSearch = () => {
    const forFirstLetters = products.filter((filtrateProduct) =>
      filtrateProduct.title
        .toLowerCase()
        .includes(product.title.toLowerCase().substring(0, 4))
    );

    const forMiddleLetters = products.filter((filtrateProduct) =>
      filtrateProduct.title
        .toLowerCase()
        .includes(
          product.title
            .toLowerCase()
            .substring(
              Math.floor(filtrateProduct.title.length / 2),
              Math.floor(filtrateProduct.title.length / 2) + 4
            )
        )
    );

    const forLastLetters = products.filter((filtrateProduct) =>
      filtrateProduct.title
        .toLowerCase()
        .includes(
          product.title
            .toLowerCase()
            .substring(
              filtrateProduct.title.length - 5,
              product.title.length - 1
            )
        )
    );

    const generatedResults = [
      ...forFirstLetters,
      ...forMiddleLetters,
      ...forLastLetters,
    ];
    const result = generatedResults.filter(
      (item, index) => generatedResults.indexOf(item) === index
    );
    return result;
  };
  return (
    <Container>
      <motion.section
        className="product-detail-container"
        initial={{ x: 400, scale: 0.5 }}
        // drag="y"
        // dragConstraints={{ top: 20, bottom: 50 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Carousel className="carrousel-container">
          {product?.productImgs.map((img) => (
            <Carousel.Item interval={3000} key={img}>
              <img
                className=" img-product-selected"
                src={img}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="description">
          <h1>
            <strong>{product?.title}</strong>
          </h1>
          <p>{product?.description}</p>
          <div className="flex">
            <div className="precio">
              <span className="price">Price</span>
              <br />
              <span className="amount">
                {" "}
                <strong>${product?.price * quantity}</strong>
              </span>
            </div>
            <div className="contador">
              <span className="quantity">Quantity</span>
              <br />
              <div className="div-contador">
                <button
                  className="menos"
                  onClick={() => {
                    if (quantity >= 2) setQuantity(quantity - 1);
                  }}
                >
                  -
                </button>

                <input
                  type="text"
                  className="input"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
                <button
                  className="mas"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* <div className="buttom-cart">
            <button className="buttom-add">Add to cart</button>
          </div> */}

          <button
            className="buttom-add"
            onClick={() => {
              if (user) {
                dispatch(addProductsQuantityUserThunk(product.id, quantity));
              } else {
                dispatch(addProductLocalQuantity(product, quantity));
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </motion.section>
      <motion.h2
        className="title-section bottom"
        initial={{ x: 400, scale: 0.5 }}
        // drag="y"
        // dragConstraints={{ top: 20, bottom: 50 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Articulos realcionados
        <div className="sep"></div>
      </motion.h2>
      <div className="center">
        <motion.section
          className="articulos-relacionados-container secundary-card"
          initial={{ y: 400, scale: 0.5 }}
          // drag="y"
          // dragConstraints={{ top: 20, bottom: 50 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {relatedPorducts.map((prod, index) => (
            <Card className="shadow" key={prod.id} style={{ width: "18rem" }}>
              <Card.Img
                onClick={() => {
                  navigate(`/product/${prod.id}`);
                  window.scrollTo(0, 0);
                }}
                variant="top"
                className="img-product-selected secundary-img click"
                src={prod?.productImgs[0]}
              />
              <Card.Body>
                <Card.Title
                  className="click"
                  onClick={() => {
                    navigate(`/product/${prod.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  {prod.title.length > 17
                    ? `${prod.title.substring(0, 17)}...`
                    : prod.title}
                </Card.Title>
                <div className="price-cart">
                  <div>
                    <span>Price</span>
                    <h3>${prod.price}</h3>
                  </div>
                  <Button
                    onClick={() => {
                      if (user) {
                        dispatch(
                          addUserProductToCartThunk({
                            id: prod.id,
                            quantity: 1,
                          })
                        );
                        dispatch(getCartThunk());
                      } else dispatch(addProduct(prod));
                    }}
                    className="add-cart-on-card"
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </motion.section>
      </div>

      <h2 className="title-section">
        Quizás te interese
        <div className="sep"></div>
      </h2>
      <section className="articulos-relacionados-container  secundary-card">
        {generateRelationSearch().map((prod) => (
          <Card
            className="shadow"
            key={prod.id}
            onClick={() => {
              navigate(`/product/${prod.id}`);
              window.scrollTo(0, 0);
            }}
            style={{ width: "18rem" }}
          >
            <Card.Img
              variant="top"
              className="img-product-selected secundary-img click"
              src={prod?.productImgs[0]}
            />
            <Card.Body>
              <Card.Title className="click">
                {prod.title.length > 17
                  ? `${prod.title.substring(0, 17)}...`
                  : prod.title}
              </Card.Title>
              <div className="price-cart">
                <div>
                  <span>Price</span>
                  <h3>${prod.price}</h3>
                </div>
                <Button
                  onClick={() => {
                    if (user) {
                      dispatch(
                        addUserProductToCartThunk({
                          id: prod.id,
                          quantity: 1,
                        })
                      );
                      dispatch(getCartThunk());
                    } else dispatch(addProduct(prod));
                  }}
                  className="add-cart-on-card"
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </section>
    </Container>
  );
};

export default Product;
