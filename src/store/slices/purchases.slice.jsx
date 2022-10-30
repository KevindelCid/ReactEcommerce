import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../../utils";

// Cambiamos isLoadingSlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const purchasesSlice = createSlice({
  name: "cartvisible",
  initialState: [],
  reducers: {
    getPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const getPurschasesThunk = () => (dispatch) => {
  axios
    .get("https://e-commerce-api.academlo.tech/api/v1/purchases", getConfig())
    .then((res) => {
      dispatch(getPurchases(res.data.data.purchases));
    })
    .catch((err) => console.log(err));
};

export const { getPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
