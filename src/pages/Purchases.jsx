import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurschasesThunk } from "../store/slices/purchases.slice";
import moment from "moment";
import "../styles/purchases.css";
import { useNavigate } from "react-router";
import { Container } from "react-bootstrap";


const Cart = ({purchase})=>{
  const navigate = useNavigate()
 

  return  <>
  {
  purchase.cart.products.map(product => (
    <li  key={product.id} className="elemento-container">

       <div className="element "> <p className="product" onClick={() => navigate(`/product/${product.id}`)}>{product.title}</p></div>

        <div className=" element c"  onClick={() => navigate(`/product/${product.id}`) } >{product.productsInCart.quantity}</div>

       <div className="element"> <p><strong>${product.price * product.productsInCart.quantity}</strong></p></div>

      
  
    </li>
  ))}
 
</>
}



const Purchases = () => {

  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurschasesThunk());
  }, []);


  



  return (
    <Container className="spac">
    <section className="purchases-container">

      <h1>My purchases</h1>

      {purchases.map((purchase) => (
        <article key={purchase.id}>

          <h2 className="card-purchase shadow"><strong> {moment(purchase.createdAt).format("MMMM D, YYYY LT")}</strong></h2>

          <ul className="card-purchase shadow item-container" >



<Cart purchase={purchase} />

        </ul>

        </article>
      ))}
    </section>
    </Container>
  );
};







// return (
//   <div className="div-purchases">
//     <h1 className="my-purchases"><strong> My purchases</strong></h1>

//     {purchases.map((purchase) => (
//       <section>
//         <div className="purchases">


//           <h2 className="fecha-purchases"><strong> {moment(purchase.createdAt).format("MMMM D, YYYY LT")}</strong></h2>
//         </div>
//         <div className="ul-purchases">
//           <ul key={purchase.id}>


//             {purchase.cart.products.map(product => (
//               <li>
//                 <div key={product.id} className="product-purchase">



//                   <p className="titulo-purchases" type="button" onClick={() => navigate(`/product/${product.id}`)

//                   }>{product.title}</p>
//                   <div className="quantity-purchases" type="button" onClick={() => navigate(`/product/${product.id}`)

//                   } >{product.productsInCart.quantity}</div>
//                   <p><strong>${product.price}</strong></p>

//                 </div>
//               </li>
//             ))}
//             {/* [opcional] hacer esto un componente dentro de este mismo archivo y poner un total de la compra */}


//           </ul>
//         </div>
//       </section>
//     ))}
//   </div>
// );
// };

export default Purchases;
