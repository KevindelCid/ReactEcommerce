import { useEffect, useState } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import LoadingScreen from "./Components/LoadingScreen";
import NavBar from "./Components/NavBar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Purchases from "./pages/Purchases";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "./store/slices/products.slice";
import "../src/App.css";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import { setUser } from "./store/slices/user.slice";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsThunk());
    const localUser = JSON.parse(localStorage.getItem("user"))
    if(localUser) dispatch(setUser(localUser))
  
  }, []);




  



  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <div className="space"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
              <Route path="/purchases" element={<Purchases />} />
        </Route>
    
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
