import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const Product = () => {
  const { id } = useParams();

  const products = useSelector((state) => state.products);
  const product = products.find((prod) => prod.id === Number(id));

  console.log(product);
  return (
    <div>
      <Carousel className="carrousel-container">
        {product?.productImgs.map((img) => (
          <Carousel.Item interval={2000} key={img}>
            <img className="d-block w-100 h-50" src={img} alt="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Product;
