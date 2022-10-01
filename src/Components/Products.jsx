import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const Product = ({ filteredProducts, setProductFiltered }) => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Container>
      Product
      <Row>
        {filteredProducts.map((product) => (
          <Col className="m-2" key={product.id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                className="link"
                onClick={() => navigate(`/product/${product.id}`)}
                variant="top"
                src={product.productImgs[0]}
              />
              <Card.Body>
                <Card.Title
                  className="link"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
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
                    <Button className="add-cart-on-card">
                      <FontAwesomeIcon icon={faCartShopping} />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Product;
