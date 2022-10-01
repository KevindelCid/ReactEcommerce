import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Products from "../Components/Products";
import { getProductsThunk } from "../store/slices/products.slice";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  console.log(categories);

  return (
    <div>
      <Container>
        {categories.map((category) => (
          <Button key={category}>{category.name}</Button>
        ))}
        <Products />
      </Container>
    </div>
  );
};

export default Home;
