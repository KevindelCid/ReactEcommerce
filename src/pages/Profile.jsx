import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteCart } from '../store/slices/cart.slice';
import { setUser } from '../store/slices/user.slice';
import "../styles/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {


    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(setUser({}));
        dispatch(deleteCart());
        navigate("/");
      };
    

    return (
        <div className='main-profile'>

        <div className='profile'>

            <div className='div-icon'>
        <FontAwesomeIcon className='icon-user' icon={faUser} />
        </div>
            <h1><strong> Bienvenido <br />{user.user.firstName} {user.user.lastName}</strong></h1>

           
           
         
           
           

            <button className='logout' onClick={logout}> Logout</button>
        </div>
        </div>
    );
};

export default Profile;