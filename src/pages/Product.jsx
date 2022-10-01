import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import "../styles/products.css";
const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const products = useSelector((state) => state.products);
  const product = products.find((prod) => prod.id === Number(id));
  const [relatedProducts, setRelatedProducts] = useState([]);
  // console.log(product);

  const getRelatedPorducts = products.filter(
    (filtrateProduct) => filtrateProduct.category.id === product.category.id
  );
  console.log(getRelatedPorducts);

  return (
    <div>
      <Carousel className="carrousel-container">
        {product?.productImgs.map((img) => (
          <Carousel.Item interval={2000} key={img}>
            <img
              className=" img-product-selected"
              src={img}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <section>
        {getRelatedPorducts.map((prod) => (
          <button type="" onClick={() => navigate(`/product/${prod.id}`)}>
            <b>{prod.title}</b>
          </button>
        ))}
      </section>
    </div>
  );
};

export default Product;
