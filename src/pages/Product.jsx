import React, { useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/products.css";
import { addProduct } from "../store/slices/cart.slice";
const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const products = useSelector((state) => state.products);
  const product = products.find((prod) => prod.id === Number(id));
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);

  const user = localStorage.getItem('user')

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

  const addQuantityProducts = (quantity) => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addProduct(product));
    }
  };

  return (
    <Container>
      <section className="product-detail-container">
        <Carousel
          className="carrousel-container"
          activeIndex={index}
          onSelect={handleSelect}
        >
          {product?.productImgs.map((img, index) => (
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
                <strong>${product?.price}</strong>
              </span>
            </div>
            <div className="contador">
              <span className="quantity">Quantity</span>
              <br />
              <div className="div-contador">
                <button
                  className="menos"
                  onClick={() => {
                    if (!quantity < 1) setQuantity(quantity - 1);
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
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="buttom-cart">
            <button
              className="buttom-add"
              onClick={() => {
                if(user) alert('el usuario esta logeado actuo diferente')
                else addQuantityProducts(quantity);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>

      <h2 className="title-section ">Articulos realcionados</h2>
      <section className="articulos-relacionados-container secundary-card">
        {relatedPorducts.map((prod, index) => (
          <Card className="shadow" key={prod.id} style={{ width: "18rem" }}>
            <Card.Img
              onClick={() => {
                navigate(`/product/${prod.id}`);
                window.scrollTo(0, 0);
              }}
              variant="top"
              className="img-product-selected secundary-img click"
              src={prod?.productImgs}
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
                    if(user) alert('el usuario esta logeado actuo diferente')
                    else dispatch(addProduct(prod));
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
      <h2 className="title-section">Quizás te interese</h2>
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
              src={prod?.productImgs}
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
                    dispatch(addProduct(prod));
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
