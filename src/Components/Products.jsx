import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
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
        {filteredProducts.map((product) => (
          <li
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.productImgs[0]} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {`${product.description.substring(0, 80)} ... `}
                </Card.Text>
                <Button variant="primary">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Button>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
