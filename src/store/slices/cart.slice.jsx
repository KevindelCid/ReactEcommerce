import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../../../utils";

// Cambiamos isLoadingSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const cartSlice = createSlice({
  name: "productsOnCart",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      // estoy tentado a volarme la funcionalidad para que en el carrito solo cuente los productos no repetidos y que los repetidos pos los ponga juntos mediante un nuevo campo llamado quantity

      console.log(action.payload);
      Toast.fire({
        icon: "success",
        title: "Add to cart",
      });
      // localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];
    },
    deleteProduct: (state, action) => {
      const index = action.payload;
      const result = state.filter((item, index1) => index1 !== index);
      // localStorage.setItem("cart", JSON.stringify(result));
      return result;
    },
    deleteCart: () => {
      return []
    },
    migrateLocalCart: (state, action) => {
      const products = action.payload
      const newCart = products.map(item => {
        return { id: item.product.id, quantity: item.count }
      })
      console.log(newCart)

      newCart.map(item => {
        axios
        .post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', item, getConfig())
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
      })
      return newCart

    }
  },
});

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const setAddProductsThunk = () => (dispatch) => { };

export const { addProduct, deleteProduct, deleteCart, migrateLocalCart } = cartSlice.actions;

export default cartSlice.reducer;
