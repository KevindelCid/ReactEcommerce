import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CartSide from "../Components/CartSide";
import Categories from "../Components/Categories";
import FilterSide from "../Components/FilterSide";
import Products from "../Components/Products";
import { addProduct, getCartThunk } from "../store/slices/cart.slice";
import { setIsCartVisible } from "../store/slices/cartIsVisible.slice";
import { getProductsThunk } from "../store/slices/products.slice";
import { motion } from "framer-motion";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isVisibleFilterSide, setIsVisibleFilterSide] = useState(false);
  const dispatch = useDispatch();
  const user = localStorage.getItem("user");

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
    setIsVisibleFilterSide(false);
  };

  const showFilterSide = () => {
    setIsVisibleFilterSide(true);
  };

  return (
    <main className="home-container">
      {isVisibleFilterSide && (
        <FilterSide
          setIsVisibleFilterSide={setIsVisibleFilterSide}
          setFilteredProducts={setFilteredProducts}
          filteredProducts={filteredProducts}
        />
      )}
      <section className="categories-section">
        <aside className="filters">
          <Categories
            setFilteredProducts={setFilteredProducts}
            filteredProducts={filteredProducts}
            setIsVisibleFilterSide={setIsVisibleFilterSide}
          />
        </aside>
      </section>
      <section className="products-section">
        {/* //buscador */}
        <motion.section
          className="search-container"
          initial={{ x: 400, scale: 0.5 }}
          // drag="y"
          // dragConstraints={{ top: 20, bottom: 50 }}
          animate={{ x: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            className="search-input d-flex justify-content-center"
            placeholder="Search Products"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <button onClick={showFilterSide} className="button-filters">
            Filters
            <FontAwesomeIcon icon={faFilter} />
          </button>
          <small>{`${filteredProducts.length} items found`}</small>
        </motion.section>

        <Products
          filteredProducts={filteredProducts}
          setProductFiltered={setFilteredProducts}
        />
      </section>
    </main>
  );
};

export default Home;
