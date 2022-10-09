import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteCart } from "../store/slices/cart.slice";
import { setUser } from "../store/slices/user.slice";
import "../styles/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(setUser({}));
    dispatch(deleteCart());
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="main-profile">
      <motion.div
        className="profile"
        initial={{ scale: 0.1 }}
        // drag="y"
        // dragConstraints={{ top: 20, bottom: 50 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="div-icon">
          <FontAwesomeIcon className="icon-user" icon={faUser} />
        </div>
        <h1>
          <strong>
            {" "}
            Bienvenido <br />
            {user.user.firstName} {user.user.lastName}
          </strong>
        </h1>

        <button className="logout" onClick={logout}>
          {" "}
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;
