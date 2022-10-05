import { createSlice } from "@reduxjs/toolkit";

// Cambiamos isLoadingSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const isLoadingCartSlice = createSlice({
  name: "isloadingCart",
  initialState: false,
  reducers: {
    setIsLoadingCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsLoadingCart } = isLoadingCartSlice.actions;

export default isLoadingCartSlice.reducer;
