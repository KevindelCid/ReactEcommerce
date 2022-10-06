import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurschasesThunk } from "../store/slices/purchases.slice";
import moment from "moment";
import "../styles/purchases.css";
import {  useNavigate } from "react-router";

const Purchases = () => {
  const navigate = useNavigate( )
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurschasesThunk());
  }, []);

  return (
    <div className="div-purchases">
      <h1 className="my-purchases"><strong> My purchases</strong></h1>
      
      {purchases.map((purchase) => (
        <section>
           <div className="purchases">
          
          
            <h2 className="fecha-purchases"><strong> {moment(purchase.createdAt).format("MMMM D, YYYY LT")}</strong></h2>
           </div>
      <div className="ul-purchases">
        <ul  key={purchase.id}>
          {console.log(purchase)}
           
            {purchase.cart.products.map(product => (
 <li>
              <div key={product.id} className="product-purchase">

             

                <p type="button" onClick={() =>  navigate(`/product/${product.id}` )

                }>{product.title}</p>
                <div className="quantity-purchases" type="button" onClick={() =>  navigate(`/product/${product.id}` )

} >{product.productsInCart.quantity}</div>
                <p><strong>${product.price}</strong></p>
                
              </div>
 </li>
            ))}
            {/* [opcional] hacer esto un componente dentro de este mismo archivo y poner un total de la compra */}
         
           
        </ul>
        </div>
        </section>
      ))}
    </div>
  );
};

export default Purchases;
