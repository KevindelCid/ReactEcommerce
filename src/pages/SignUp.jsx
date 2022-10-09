import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import "../styles/signup.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [inputType, setinputType] = useState("password");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const submit = (data) => {
    data.role = "admin";
    axios
      .post("https://ecommerce-api-react.herokuapp.com/api/v1/users", data)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Your user has been created",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        navigate("/login");
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        if (err.message === "Network Error")
          Swal.fire({
            icon: "error",
            title: "Oops... No Internet Connection?",
            text: "Sorry, you need access to internet for create a user",
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        if (err.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.data?.message,
            // footer: '<a href="">Why do I have this issue?</a>'
          });
        }
      });
  };

  return (
    <div className="login-container">
      <motion.section
        className="form-login-container"
        initial={{ x: -400, scale: 0.5 }}
        // drag="y"
        // dragConstraints={{ top: 20, bottom: 50 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="card">
          <motion.h1
            className="welcome-login"
            initial={{ x: 400, scale: 0.5 }}
            // drag="y"
            // dragConstraints={{ top: 20, bottom: 50 }}
            animate={{ x: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {" "}
            Sign Up
          </motion.h1>

          <Card.Body>
            <Form onSubmit={handleSubmit(submit)}>
              <Form.Group className="mb-3" controlId="email">
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

              <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="email-input"
                  {...register("firstName")}
                  type="text"
                  placeholder="Enter first name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="email-input"
                  {...register("lastName")}
                  type="text"
                  placeholder="Enter last name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="password-input"
                  {...register("password")}
                  type={inputType}
                  placeholder="Password"
                  required
                />
                <motion.button
                  className="password-eye"
                  type="button"
                  onClick={() =>
                    inputType === "password"
                      ? setinputType("text")
                      : setinputType("password")
                  }
                  initial={{ y: 400, scale: 0.5 }}
                  // drag="y"
                  // dragConstraints={{ top: 20, bottom: 50 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </motion.button>
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone (10 characters)</Form.Label>
                <Form.Control
                  className="email-input"
                  {...register("phone")}
                  type="number"
                  placeholder="Enter phone"
                  required
                />
              </Form.Group>

              <motion.div
                initial={{ y: 400, scale: 0.5 }}
                // drag="y"
                // dragConstraints={{ top: 20, bottom: 50 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  className="submit-signup"
                  variant="primary"
                  type="submit"
                >
                  SignUp
                </Button>
              </motion.div>
            </Form>
            <div className="already">
              Already have an account?
              <Link to="/login">
                <button className="button-login" type="button">
                  Log in
                </button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </motion.section>
    </div>
  );
};

export default SignUp;
