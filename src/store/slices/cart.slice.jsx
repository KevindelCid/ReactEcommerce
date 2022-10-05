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
      return [];
    },
    migrateLocalCart: async (state, action) => {
      const products = action.payload;
      const newCart = products.map((item) => {
        return { id: item.product.id, quantity: item.count };
      });

      const cartOnServer = await axios.get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
        getConfig()
      );

      // pending

      // trae los datos del carrito local
      console.log(newCart);
      // trae los productos que estan en el servidor
      console.log(cartOnServer.data.data.cart.products);

      newCart.map((item) => {
        let key = "";
        cartOnServer.data.data.cart.products.map((ne) => {
          if (item.id === ne.id && key === "") {
            // aqui debo hacer el update y eliminar del newCart esos elementos
            console.log(
              "en el server tengo: " +
                ne.productsInCart?.quantity +
                " y en local tengo: " +
                item?.quantity
            );

            console.log(
              "de " +
                ne.title +
                " tengo un total de: " +
                (ne.productsInCart?.quantity + item?.quantity)
            );
            const newQuantity = ne.productsInCart?.quantity + item?.quantity;
            const id = item.id;

            axios
              .patch(
                "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
                { id: id, newQuantity: newQuantity },
                getConfig()
              )
              .catch((err) => console.log(err));

            key = ne.title;
          }
        });
        if (key === "") {
          // aqui necesito ingresar algo nuevo
          alert("el producto es nuevo ");
        }
      });

      newCart.map((item) => {
        axios
          .post(
            "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
            item,
            getConfig()
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      });
    },
    getCart: (state, action) => {
      return action.payload;
    },
    addSameProduct: (state, action) => {
      const data = [...state];
      const element = action.payload;

      let counter = element.quantity;
      counter++;

      //  const res =  data.map((item, index) => item.id === element.id)

      // //  {

      //       // if(item.id === element.id){
      //       //   // data.splice(index)
      //       //   // return {id: element.id, quantity: counter}

      //       //   return data

      //       // }
      //     } )
      // console.log(res)
      // console.log(data)

      // data.push(data)

      Toast.fire({
        icon: "success",
        title: "Add to cart",
      });

      // localStorage.setItem("cart", JSON.stringify([...state, action.payload]));
      // return   data;
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

export const getCartThunk = () => (dispatch) => {
  axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
    .then((res) => dispatch(getCart(res.data.data.cart.products)));
};

export const {
  addProduct,
  getCart,
  deleteProduct,
  deleteCart,
  migrateLocalCart,
  addSameProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
