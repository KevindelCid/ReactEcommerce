import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/user.slice";
import { setIsCartVisible } from "../store/slices/cartIsVisible.slice";
import { deleteCart } from "../store/slices/cart.slice";

const NavBar = () => {
  const counterCart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoadingCart = useSelector((state) => state.isLoadingCart);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser({}));
    dispatch(deleteCart());
    navigate("/");
  };

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
          <Nav.Link to="/" as={Link}>
            Home
          </Nav.Link>

          {user.token !== undefined ? (
            <>
              <Nav.Link to="/purchases" as={Link}>
                Purchases
              </Nav.Link>
              <Nav.Link to="/profile" as={Link}>
                {user.token !== undefined
                  ? `${user.user.firstName} ${user.user.lastName}`
                  : console.log("pos nah")}
              </Nav.Link>

              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link to="/login" as={Link}>
                Login
              </Nav.Link>
            </>
          )}
          <Nav.Link
            disabled={isLoadingCart}
            onClick={() => dispatch(setIsCartVisible(true))}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="notify-pop badge text-bg">
              {counterCart.length > 9 ? `+9` : counterCart.length}
            </span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
