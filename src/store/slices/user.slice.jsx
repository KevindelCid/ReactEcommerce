import { createSlice } from "@reduxjs/toolkit";

// Cambiamos isLoadingSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});






export const { setUser } = userSlice.actions;

export default userSlice.reducer;
