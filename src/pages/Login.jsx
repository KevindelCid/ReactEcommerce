import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  deleteCart,
  getCartThunk,
  migrateLocalCartThunk,
} from "../store/slices/cart.slice";
import { setIsLoadingCart } from "../store/slices/isLoadingCart.slice";

import "../styles/login.css";

import { setUser } from "../store/slices/user.slice";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputType, setinputType] = useState("password");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChargin, setIsChargin] = useState(false);
  const cart = useSelector((state) => state.cart);
  const isLoadingCart = useSelector((state) => state.isLoadingCart);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const submit = (data) => {
    dispatch(setIsLoadingCart(true));
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => {
        dispatch(setUser(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data));
        localStorage.setItem("token", JSON.stringify(res.data.data.token));

        /// soolo si hay elementos en carrito
        if (cart.length !== 0) {
          swalWithBootstrapButtons
            .fire({
              title: "Keep products in cart?",
              text: "There is a list of products in your cart before login, do you want to keep those products in your cart?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, keep cart",
              cancelButtonText: "No, delete cart",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                const elements = cart.filter(
                  (item, index) => cart.indexOf(item) === index
                );

                const productsCart = elements.map((product) => {
                  let count = 0;
                  cart.map((item) => {
                    if (product.id === item.id) {
                      count += 1;
                    }
                  });
                  return { product, count };
                });

                /// soolo si hay elementos en carrito
                if (cart.length !== 0) {
                  swalWithBootstrapButtons
                    .fire({
                      title: "Keep products in cart?",
                      text: "There is a list of products in your cart before login, do you want to keep those products in your cart?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes, keep cart",
                      cancelButtonText: "No, delete cart",
                      reverseButtons: true,
                    })
                    .then((result) => {
                      if (result.isConfirmed) {
                        // Eliminando repetidos
                        const elements = cart.filter(
                          (item, index) => cart.indexOf(item) === index
                        );

                        const productsCart = elements.map((product) => {
                          let count = 0;
                          cart.map((item) => {
                            if (product.id === item.id) {
                              count += 1;
                            }
                          });
                          return { product, count };
                        });

                        dispatch(migrateLocalCartThunk(productsCart));
                        dispatch(getCartThunk());
                        swalWithBootstrapButtons.fire(
                          "Deleted!",
                          "Your file has been deleted.",
                          "success"
                        );
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        dispatch(deleteCart());
                        dispatch(getCartThunk());
                        swalWithBootstrapButtons.fire(
                          "Cancelled",
                          "Your imaginary file is safe :)",
                          "error"
                        );
                      }
                    });
                }

                dispatch(migrateLocalCartThunk(productsCart));

                swalWithBootstrapButtons.fire(
                  "Ok, your cart was imported or merged",
                  "We take your previous products and merge them with the ones you already had in your cart.",
                  "success"
                );
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                dispatch(deleteCart());

                swalWithBootstrapButtons.fire(
                  "Cancelled",
                  "the data of the previous cart has been deleted.",
                  "error"
                );
              }
            });
        }
        navigate("/");
      })
      .catch((err) => {
        if (err.message === "Network Error")
          Swal.fire({
            icon: "error",
            title: "Oops... No Internet Connection?",
            text: "Sorry, you need access to internet for create a user",
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        else if (err.response.status === 400)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect email or password",
            // footer: '<a href="">Why do I have this issue?</a>'
          });
      })
      .finally(() => {
        dispatch(getCartThunk());

        console.log(dispatch(setIsLoadingCart(false)));
      });
  };

  return (
    <div className="login-container">
      <section className="form-login-container">
        <Card className="card">
          <h1 className="welcome-login">
            Welcome! Enter your email and password to continue
          </h1>

          {/*<Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">Register</Nav.Link>
              </Nav.Item>
               <Nav.Item>
            <Nav.Link href="#disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item> 
            </Nav>
  </Card.Header>*/}
          <Card.Body>
            <div className="test-data">
              <b className="test-data-text"> Test data</b>
              <div className="email-data">
                <FontAwesomeIcon className="email-icon" icon={faEnvelope} />
                john@gmail.com
              </div>
              <div className="password-data">
                <FontAwesomeIcon className="password-icon" icon={faLock} />
                john1234
              </div>
            </div>
            <Form onSubmit={handleSubmit(submit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="email-input"
                  {...register("email")}
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="password-input"
                  {...register("password")}
                  type={inputType}
                  placeholder="Password"
                  required
                />
                <button
                  className="password-eye"
                  type="button"
                  onClick={() =>
                    inputType === "password"
                      ? setinputType("text")
                      : setinputType("password")
                  }
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button
                disabled={isLoadingCart}
                className="submit-login"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <div className="dont">
              Dont have an account?
              <Link to="/signup">
                <button className="button-signup" type="button">
                  Sign up
                </button>
              </Link>
            </div>
          </Card.Body>
        </Card>

        {/* 


        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <button type="button">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form> */}

        {/* 
    <form >
      <div className="input-login">
        <label htmlFor="user"></label>
        <input type="text" id="user" placeholder="Email"  value=""/>
      </div>
      <div className="input-login-password">
        <label htmlFor="user"></label>
        <input type="password" id="user" placeholder="password"  value=""/>
        <button type=""> <FontAwesomeIcon icon={faEye} /></button>
      </div>
      <button type="submit">Login</button>

    </form> */}
      </section>
    </div>
  );
};

export default Login;
