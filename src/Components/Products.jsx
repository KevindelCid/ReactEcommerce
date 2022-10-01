import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const Product = ({ filteredProducts, setProductFiltered }) => {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div>
      Product
      <ul>
        <Row>
          {filteredProducts.map((product) => (
            <Col   className="m-1" key={product.id}>
              <li onClick={() => navigate(`/product/${product.id}`)}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={product.productImgs[0]} />
                  <Card.Body>
                    <Card.Title>
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
                        <Button className="add-cart-on-card">
                          <FontAwesomeIcon icon={faCartShopping} />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </li>
            </Col>
          ))}
        </Row>
      </ul>
    </div>
  );
};

export default Product;
