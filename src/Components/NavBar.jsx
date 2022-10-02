import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";

const NavBar = () => {
  return (
    // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    //   <Container>
    //     <Navbar.Brand to="/" as={Link}>
    //       E-Commerce{" "}
    //     </Navbar.Brand>
    //     <Navbar.Toggle  />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link to="/login" as={Link}>
    //           Login
    //         </Nav.Link>
    //         <Nav.Link to="/purchases" as={Link}>
    //           Purchases
    //         </Nav.Link>
    //         <Nav.Link to="/cart" as={Link}>
    //           <FontAwesomeIcon icon={faCartShopping} />
    //           <span className="notify-pop badge text-bg">+9</span>
    //         </Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //     <Navbar.Toggle />
    //   </Container>
    // </Navbar>

    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      className="p-l p-r navbar-position fixed-top"
      variant="dark"
    >
      <Navbar.Brand to="/" as={Link}>
        E-Commerce
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link to="/login" as={Link}>
            Login
          </Nav.Link>
          <Nav.Link to="/purchases" as={Link}>
            Purchases
          </Nav.Link>
          <Nav.Link to="/cart" as={Link}>
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="notify-pop badge text-bg">+9</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
