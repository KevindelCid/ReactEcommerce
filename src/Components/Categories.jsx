import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Categories = ({ setFilteredProducts, filteredProducts }) => {
  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.products);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  const filterByCategory = (categoryId) => {
    const filtered = products.filter(
      (product) => product.category.id === categoryId
    );
    setFilteredProducts(filtered);
  };

  const filterByPrice = () => {
    alert("buscando productos de más de " + min + " y menos de " + max);
  };

  return (
    <div>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Categories</Accordion.Header>
          <Accordion.Body>
            <ul>
              {categories.map((category) => (
                <li
                  className="li-on-acordion"
                  key={category.id}
                  onClick={() => filterByCategory(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Price Filter</Accordion.Header>
          <Accordion.Body>
            <Form.Control
              className="m-1"
              size="sm"
              type="number"
              placeholder="Set min price"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
            <Form.Control
              className="m-1"
              size="sm"
              type="number"
              placeholder="Set max price"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />

            <Button className="m-1" onClick={() => filterByPrice(min, max)}>
              Price Filter
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Categories;
