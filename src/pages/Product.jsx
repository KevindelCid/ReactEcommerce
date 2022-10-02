import React, { useState } from "react";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "../styles/products.css";
const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const products = useSelector((state) => state.products);
  const product = products.find((prod) => prod.id === Number(id));

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
    <div>
      <section className="product-detail-container">
        <h1>{product?.title}</h1>
        <Carousel className="carrousel-container">
          {product?.productImgs.map((img, index) => (
            <Carousel.Item interval={3000} key={img + index}>
              <img
                className=" img-product-selected"
                src={img}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
      <section>
        <h2>Articulos realcionados</h2>
        <Row>
          {relatedPorducts.map((prod, index) => (
            <Col key={prod.id}>
              <Card
                onClick={() => {
                  navigate(`/product/${prod.id}`);
                  window.scrollTo(0, 0);
                }}
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  className="img-product-selected"
                  src={prod?.productImgs}
                />
                <Card.Body>
                  <Card.Title>
                    {prod.title.length > 17
                      ? `${prod.title.substring(0, 17)}...`
                      : prod.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <h2>Quizás te interese</h2>
        <Row>
          {generateRelationSearch().map((prod) => (
            <Col key={prod.id}>
              <Card
                onClick={() => {
                  navigate(`/product/${prod.id}`);
                  window.scrollTo(0, 0);
                }}
                style={{ width: "18rem" }}
              >
                <Card.Img
                  variant="top"
                  className="img-product-selected"
                  src={prod?.productImgs}
                />
                <Card.Body>
                  <Card.Title>
                    {prod.title.length > 17
                      ? `${prod.title.substring(0, 17)}...`
                      : prod.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Product;
