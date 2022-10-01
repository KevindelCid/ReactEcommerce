import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          E-Commerce
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/login" as={Link}>
            Login
          </Nav.Link>
          <Nav.Link to="/purchases" as={Link}>
            Purchases
          </Nav.Link>
          <Nav.Link to="/cart" as={Link}>
            Cart
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>

    // <ul>
    //
    //   <Link to="/login">login</Link>
    //   <Link to="/purchases">Purchases</Link>
    // </ul>
  );
};

export default NavBar;
