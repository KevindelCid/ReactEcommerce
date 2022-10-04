import { createSlice } from "@reduxjs/toolkit";

// Cambiamos isLoadingSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const cartIsVisibleSlide = createSlice({
  name: "cartvisible",
  initialState: false,
  reducers: {
    setIsCartVisible: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsCartVisible } = cartIsVisibleSlide.actions;

export default cartIsVisibleSlide.reducer;

//  cartIsVisible: (state, action) => {
//     return action.payload;
//   },
