import React from "react";
import Categories from "./Categories";

const FilterSide = ({ setIsVisibleFilterSide, setFilteredProducts }) => {
  return (
    <aside className="filterside-main">
      <div
        className="filterside-close"
        onClick={() => setIsVisibleFilterSide(false)}
      ></div>

      <div className="filterside-principal">
        <div className="space"></div>
        <Categories setFilteredProducts={setFilteredProducts} setIsVisibleFilterSide={setIsVisibleFilterSide} />
      </div>
    </aside>
  );
};

export default FilterSide;
