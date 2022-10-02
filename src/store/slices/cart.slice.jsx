import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

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
      return [...state, action.payload];
    },
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

export const setAddProductsThunk = () => (dispatch) => {};

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
