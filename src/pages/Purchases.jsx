import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurschasesThunk } from "../store/slices/purchases.slice";
import moment from "moment";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurschasesThunk());
  }, []);

  return (
    <div>
      <h1>My purchases</h1>
      {purchases.map((purchase) => (
        <ul key={purchase.cart.id}>
          <li>
            <h2> {moment(purchase.createdAt).format("MMMM D, YYYY LT")}</h2>
            {purchase.cart.products.map(product => (
              <>
                <p>{product.title}</p>
                <p>${product.price}</p>
              </>

            ))}
            {/* [opcional] hacer esto un componente dentro de este mismo archivo y poner un total de la compra */}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Purchases;
