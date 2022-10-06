import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import getConfig from "../../../utils";
import { setIsCartVisible } from "./cartIsVisible.slice";
import { setIsLoading } from "./isLoading.slice";
import isLoadingCartSlice, { setIsLoadingCart } from "./isLoadingCart.slice";

// Cambiamos isLoadingSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const cartSlice = createSlice({
  name: "productsOnCart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      const cart = action.payload;
      return cart;
    },
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
    deleteProductLocal: (state, action)=>{
      return [action.payload];
    },
    changeCartFor: (state, action)=>{
      return action.payload;
    },

    // addUserProductToCart: async (state, action) => {},
    getCart: (state, action) => {
      return action.payload;
    },
    addSameProduct: (state, action) => {
      const data = [...state];
      const element = action.payload;

      let counter = element.quantity;
      counter++;

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

export const addProductQuantityOnCartUserThunk =
  (product, quantity, type) => (dispatch) => {
    if (type === "addition") {
      // agrego uno del producto

      axios
        .patch(
          "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
          { id: product.id, newQuantity: quantity + 1 },
          getConfig()
        )
        .then(() => {
          // alert("se agregó un product");
        })
        .catch((error) => console.log(error));
    } else if (type === "subtraction" && quantity >= 2) {
      // elimino uno del producto
      axios
        .patch(
          "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
          { id: product.id, newQuantity: quantity - 1 },
          getConfig()
        )
        .then(() => {
          // alert("se restó un product");
        })
        .catch((error) => console.log(error));
    }
  };

export const addUserProductToCartThunk = (product) => async (dispatch) => {
  const addToCart = (cartServer) => {
    const found = cartServer.find((item) => item.id === product.id);

    console.log(found);
    if (found) {
      //aqui voy a actualizar

      const newQuantity = found.productsInCart?.quantity + 1;
      const id = product.id;

      //actualizo los datos
      axios
        .patch(
          "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
          { id: id, newQuantity: newQuantity },
          getConfig()
        ).then(()=> dispatch(getCartThunk()))
        .catch((err) => console.log(err))
        .finally(() => {
          Toast.fire({
            icon: "success",
            title: "Add to cart",
          });
        });
    } else {
      // aqui voy a crear
      axios
        .post(
          "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
          { id: product.id, quantity: 1 },
          getConfig()
        )
        .then(() => {
          dispatch(getCartThunk());
          Toast.fire({
            icon: "success",
            title: "Add to cart",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  try {
    const cartOnServer = await axios.get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
      getConfig()
    );
    const cartServer = cartOnServer.data.data.cart.products;
    addToCart(cartServer);
  } catch (error) {
    if (error.response?.status === 404) {
      addToCart([]);
    }
  }
};

export const migrateLocalCartThunk = (products) => async (dispatch) => {
  const newCart = products.map((item) => {
    return { id: item.product.id, quantity: item.count };
  });

  const promises = [];

  const addToCart = (cartServer) => {
    newCart.map((item) => {
      let key = "";
      cartServer.map(async (ne) => {
        if (item.id === ne.id && key === "") {
       
          const newQuantity = ne.productsInCart?.quantity + item?.quantity;
          const id = item.id;
          //actualizo los datos
          promises.push(
            axios.patch(
              "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
              { id: id, newQuantity: newQuantity },
              getConfig()
            )
          );

          key = ne.title;
        }
      });
      if (key === "") {
        // aqui necesito ingresar algo nuevo

        promises.push(
          axios.post(
            "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
            { id: item.id, quantity: item.quantity },
            getConfig()
          )
        );
      }
    });
    Promise.all(promises).then(() => dispatch(getCartThunk()));
  };

  try {
    const cartOnServer = await axios.get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
      getConfig()
    );
    const cartServer = cartOnServer.data.data.cart.products;
    addToCart(cartServer);
  } catch (error) {
    if (error.response?.status === 404) {
      addToCart([]);
    }
  }

};

export const deleteProductOnCartUserThunk = (idProduct) => (dispatch) => {
  // https://ecommerce-api-react.herokuapp.com/api/v1/cart/1

  dispatch(setIsLoading(true));
  axios
    .delete(
      `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${idProduct}`,
      getConfig()
    )
    .then(() => {
      dispatch(getCartThunk());
      dispatch(setIsLoading(false));
    });
};


export const  addProductsQuantityUserThunk =  (productId, quantity)  => async dispatch => {


  try {
    const cartOnServer = await axios.get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
      getConfig()
    );
    const cartServer = cartOnServer.data.data.cart.products;
    
      const found = cartServer.find(product => product.id === productId)
      if(found){
        // vamos solo a actualizar
        // console.log(found)
        axios.patch(
          "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
          { id: productId, newQuantity: quantity + found.productsInCart.quantity },
          getConfig()
        ).catch(err =>console.log(err))
      }
      else{
        //vamos a agregar como nuevo producto
      }

  } catch (error) {
    if (error.response?.status === 404) {
      addToCart([]);
    }
  }


}

export const addProductLocalQuantity = (product,quantity) => dispatch =>{

  for(let i = 1; i<= quantity; i++){
    dispatch(addProduct(product))
  }


}

export const deleteLocalProductCart =(productId, cart) => dispatch =>{

  const filterWithoutProduct = cart.filter(product => product.id !== productId)


  console.log(filterWithoutProduct)
  dispatch(changeCartFor(filterWithoutProduct))

}

export const getCartThunk = () => (dispatch) => {
  axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
    .then((res) => dispatch(getCart(res.data.data.cart.products)))
    .catch((error) => {
      if (error.response.status === 404) {
      // el carrito se encuentra vacio
      }
    });
};
export const purchaseCartThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      {},
      getConfig()
    )
    .then(() => {
      dispatch(deleteCart());
      dispatch(setIsCartVisible(false));
      Swal.fire({
        icon: "success",
        title: "Thanks for you purchase",
        text: "you are cool!",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      dispatch(setIsLoading(false));
    })
    .catch((error) => {
      if (error.response.status === 404) {
        dispatch(setIsCartVisible(false));
        Swal.fire({
          icon: "error",
          title: "without products in cart",
          text: "Before add a product in cart",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        dispatch(setIsLoading(false));
      } else {
        alert("hemos encontrado un error " + error.response.status + ' por favor contacta al soporte técnico kevindelcid731@gmail.com');
        dispatch(setIsLoading(false));
      }
    });
};

export const {
  setCart,
  addProduct,
  getCart,
  deleteProduct,
  deleteCart,
  addSameProduct,
  deleteProductLocal,
  changeCartFor,
} = cartSlice.actions;

export default cartSlice.reducer;
