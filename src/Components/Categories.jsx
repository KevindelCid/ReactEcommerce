import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const Categories = ({ setFilteredProducts, setIsVisibleFilterSide }) => {
  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.products);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [minAdvanced, setMinAdvanced] = useState('')
  const [maxAdvanced, setMaxAdvanced] = useState('')
  const [keyWordAdvanced, setKeyWordAdvanced] = useState('')
  const [selectAdvance, setSelectAdvance] = useState(0)

  useEffect(() => {
    axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  const getFilterByCategory = (categoryId, products) => {
    
 
    if(parseInt(categoryId) === 0){
      return products
    }
    const id = parseInt(categoryId)

    const filtered = products.filter(
      (product) => 
          product.category.id === id
        
      
    );
 
   
    return filtered
  };

  const filterByCategory = (id, products) => {

    setFilteredProducts(getFilterByCategory(id, products));
    setIsVisibleFilterSide(false);
  }

  const getFilterByPrice = (min, max, products) => {
    let filtered = []
    if (min === '') min = '0'
    if (max === '0' || max === '') {
      filtered = products.filter(
        product => product.price >= parseInt(min)
      )
    }
    else {

      filtered = products.filter(
        (product) =>
          product.price >= parseInt(min) && product.price <= parseInt(max)
      );
    }
    return filtered
  };

  const filterByPrice = (min, max, products) => {
    const filtered = getFilterByPrice(min, max, products)
    setFilteredProducts(filtered);
    setIsVisibleFilterSide(false);
  }

  const filteredByName = (products, searchValue) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
   return filtered
  };


  const getAdvanceSearch = (products, min, max, categoryId, words) => {

    if (min === '') min = '0'
    if (max === '0' || max === '') max = 5000;

    const filterProductsByText = filteredByName(products, words);
 
    const filterProductsByTextCategory = getFilterByCategory(categoryId, filterProductsByText)
    // console.log(filterProductsByTextCategory)
    const filterProductsByTextCategoryPrice = getFilterByPrice(min, max, filterProductsByTextCategory)


    return filterProductsByTextCategoryPrice


  }
  const advanceSearch = (products, min, max, categoryId, words) => {

    setFilteredProducts(getAdvanceSearch(products, min, max, categoryId, words));
    setIsVisibleFilterSide(false);

  }


  const getFilterByText = (products, text) => {

    const filtered = products.includes(text);
    return filtered
  }

  const changeSelectOptionHandler = (event) => {
    setSelectAdvance(event.target.value);
  };


const clearStatesAdvanceSearch = ()=>{
  

  setMinAdvanced('')
  setMaxAdvanced('')
  setKeyWordAdvanced('')


}

  return (
    <div className=" categories-container">
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Categories</Accordion.Header>
          <Accordion.Body>
            <ul>
            <li
                  className="li-on-acordion"
                
                  onClick={() => filterByCategory(0, products)}
                >
                  All products
                </li>
              {categories.map((category) => (
                <li
                  className="li-on-acordion"
                  key={category.id}
                  onClick={() => filterByCategory(category.id, products)}
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

            <Button className="m-1" onClick={() => filterByPrice(min, max, products)}>
              Price Filter
            </Button>
          </Accordion.Body>
        </Accordion.Item>

        {/* <Accordion.Item eventKey="2">
          <Accordion.Header>Advance filter</Accordion.Header>
          <Accordion.Body>
            <h2>Advance Search</h2>

            <Form.Control
              className="m-1"
              size="sm"
              type="text"
              placeholder="Key words"
              value={keyWordAdvanced}
              onChange={(e) => setKeyWordAdvanced(e.target.value)}
            />
            <label htmlFor="min-advance">Add price for serch:</label>
            <div className="search-advance-price">
              <Form.Control
                className="m-1"
                size="sm"
                id="min-advance"
                type="number"
                placeholder="Set min price"
                value={minAdvanced}
                onChange={(e) => setMinAdvanced(e.target.value)}
              />
              <Form.Control
                className="m-1"
                size="sm"
                type="number"
                placeholder="Set max price"
                value={maxAdvanced}
                onChange={(e) => setMaxAdvanced(e.target.value)}
              />
            </div>
            <label htmlFor="">Select a category</label>
            <br />


            <Form.Select aria-label="Default select example" onChange={changeSelectOptionHandler}>

            <option
                  className="li-on-acordion"
                
                  onChange={() => setSelectAdvance(0)}
                  value='0'
                  selected
                >
                 All products
                </option>
              {categories.map((category) => (
                <option
                  className="li-on-acordion"
                  key={category.id}
                  onChange={() => setSelectAdvance(category.id)}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </Form.Select>


            <br />

            <Button className="m-1" onClick={() => advanceSearch(products, minAdvanced, maxAdvanced, selectAdvance, keyWordAdvanced)}>
              Search parameters
            </Button>
            <Button className="m-1" onClick={clearStatesAdvanceSearch}>
              Clear
            </Button>

          </Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </div>
  );
};

export default Categories;
