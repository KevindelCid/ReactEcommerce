import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

// Cambiamos isLoadingSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const getProductsThunk = () => (dispatch) => {
  document.body.style.overflow = "hidden";
  dispatch(setIsLoading(true));
  axios
    .get("https://e-commerce-api.academlo.tech/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => {
      dispatch(setIsLoading(false));
      document.body.style.overflow = "auto";
    });
};

export const { setProducts, setFilteredProducts } = productSlice.actions;

export default productSlice.reducer;
