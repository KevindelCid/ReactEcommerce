import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Form, Nav } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Login = () => {
  const [inputType, setinputType] = useState("password");
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => console.log(res.data));
  };

  return (
    <div className="login-container">
      <section className="form-login-container">
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link href="#first">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#link">Register</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
            <Nav.Link href="#disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item> */}
            </Nav>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(submit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  {...register("email")}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register("password")}
                  type={inputType}
                  placeholder="Password"
                />
                <button
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
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
