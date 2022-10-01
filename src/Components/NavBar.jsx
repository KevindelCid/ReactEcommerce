import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          E-Commerce
        </Navbar.Brand>
        <Navbar.Collapse>
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
        </Navbar.Collapse>
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
