import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHouse, faRightFromBracket, faShop, faStore, faUser } from "@fortawesome/free-solid-svg-icons";
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
    <Navbar collapseOnSelect
      expand="sm"
      bg="dark"
      className="p-l p-r navbar-position fixed-top"
      variant="dark">
      <Container fluid>
        <Navbar.Brand to="/" as={Link} > <FontAwesomeIcon icon={faCartShopping} /> ReactCommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link to="/" as={Link}>
            {/* <FontAwesomeIcon icon={faHouse} />  */} Home
            </Nav.Link>








          </Nav>
          
<Nav>
  

{user.token !== undefined ? (
              <>
                <Nav.Link to="/purchases" as={Link}>
               
                <FontAwesomeIcon icon={faStore} />  Purchases  
                </Nav.Link>
                <Nav.Link to="/profile" as={Link}>
                  {user.token !== undefined
                    ?<>
                    <FontAwesomeIcon icon={faUser} /> 
                   {" "} {user.user.firstName} {user.user.lastName}
                    </> 
                    : console.log("pos nah")}
                </Nav.Link>

                <Nav.Link onClick={logout}>   <FontAwesomeIcon icon={faRightFromBracket} />  Logout</Nav.Link>
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
      </Container>
    </Navbar >
  );
};

export default NavBar;
