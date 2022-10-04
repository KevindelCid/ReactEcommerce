import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Categories = ({ setFilteredProducts, setIsVisibleFilterSide }) => {
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
    setIsVisibleFilterSide(false);
  };

  const filterByPrice = () => {
    const filtered = products.filter(
      (product) =>
        product.price >= parseInt(min) && product.price <= parseInt(max)
    );
    setFilteredProducts(filtered);
    setIsVisibleFilterSide(false);
  };

  return (
    <div className=" categories-container">
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




        <Accordion.Item eventKey="2">
          <Accordion.Header>Advance filter</Accordion.Header>
          <Accordion.Body>
         <h2>Advance Search</h2>
         
            <Form.Control
              className="m-1"
              size="sm"
              type="text"
              placeholder="Key words"
            
              onChange={(e) => setMin(e.target.value)}
            />
            <label htmlFor="min-advance">Add price for serch:</label>
          <div className="search-advance-price">
            <Form.Control
              className="m-1"
              size="sm"
              id="min-advance"
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
</div>
<label htmlFor="">Select a category</label>
<br />
<select>
              {categories.map((category) => (
                <option
                  className="li-on-acordion"
                  key={category.id}
                  onClick={() => filterByCategory(category.id)}
                >
                  {category.name}
                </option>
              ))}
            </select>
            <br />

            <Button className="m-1" onClick={() => filterByPrice(min, max)}>
              Search parameters
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Categories;
