import axios from "axios";

import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Products from "../Components/Products";
import { getProductsThunk } from "../store/slices/products.slice";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    searchProducts();
  }, [searchValue]);

  const filterByCategory = (categoryId) => {
    const filtered = products.filter(
      (product) => product.category.id === categoryId
    );

    setFilteredProducts(filtered);
  };

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
      <Container>
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => filterByCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
        
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
      </Container>
    </div>
  );
};

export default Home;
