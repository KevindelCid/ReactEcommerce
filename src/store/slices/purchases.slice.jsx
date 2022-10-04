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
    .get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      getConfig()
    )
    .then((res) => {
      console.log(res.data.data.purchases[0].cart.products[0].title);
      dispatch(getPurchases(res.data.data.purchases));
    })
    .catch((err) => console.log(err));
};

export const { getPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
