import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurschasesThunk } from "../store/slices/purchases.slice";
import moment from "moment";
import "../styles/purchases.css";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurschasesThunk());
  }, []);

  return (
    <div className="div-purchases">
      <h1>My purchases</h1>
      
      {purchases.map((purchase) => (
        
      <section className="ul-purchases">
        <ul  key={purchase.id}>
          {console.log(purchase)}
          
          <li>
            <div className="purchases">
            <h2> {moment(purchase.createdAt).format("MMMM D, YYYY LT")}</h2>
            </div>
            {purchase.cart.products.map(product => (

              <div key={product.id} className="product-purchase">

              

                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>

            ))}
            {/* [opcional] hacer esto un componente dentro de este mismo archivo y poner un total de la compra */}
          </li>
          
        </ul>
        </section>
      ))}
    </div>
  );
};

export default Purchases;
