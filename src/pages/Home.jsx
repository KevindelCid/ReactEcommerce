import axios from "axios";

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../Components/Categories";
import Products from "../Components/Products";
import { getProductsThunk } from "../store/slices/products.slice";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    searchProducts();
  }, [searchValue]);

  const filteredByName = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  // console.log(products);
  const searchProducts = () => {
    if (searchValue === "") setFilteredProducts(products);
    else filteredByName();
  };

  return (
    <div>
      <Container className="container-fluid">
        <Row>
          <Col xs={6} md={2}>
            <aside>
              <Categories
                setFilteredProducts={setFilteredProducts}
                filteredProducts={filteredProducts}
              />
            </aside>
          </Col>
          <Col  xs={12} md={10}>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search Products"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </InputGroup>

            <Products
              filteredProducts={filteredProducts}
              setProductFiltered={setFilteredProducts}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
