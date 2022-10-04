import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurschasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurschasesThunk());
  }, []);

  return (
    <div>
      {purchases.map((purchase) => (
        <ul key={purchase.cart.id}>
          <li>
          
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Purchases;
