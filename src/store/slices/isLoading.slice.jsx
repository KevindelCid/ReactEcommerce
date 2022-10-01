import { createSlice } from "@reduxjs/toolkit";

// Cambiamos isLoadingSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const isLoadingSlice = createSlice({
  name: "isloading",
  initialState: false,
  reducers: {
    setIsLoading: (state, action) => {
      return action.payload;
    },
  },
});






export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
