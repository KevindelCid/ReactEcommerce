import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart.slice";
import cartIsVisibleSlice from "./slices/cartIsVisible.slice";
import isLoadingSlice from "./slices/isLoading.slice";
import isLoadingCartSlice from "./slices/isLoadingCart.slice";
import productsSlice from "./slices/products.slice";
import purchasesSlice from "./slices/purchases.slice";
import userSlice from "./slices/user.slice";

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    products: productsSlice,
    cart: cartSlice,
    user: userSlice,
    cartVisible: cartIsVisibleSlice,
    purchases: purchasesSlice,
    isLoadingCart: isLoadingCartSlice,
  },
});
