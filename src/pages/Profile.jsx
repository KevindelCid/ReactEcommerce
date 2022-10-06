import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteCart } from '../store/slices/cart.slice';
import { setUser } from '../store/slices/user.slice';

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
        <div>
            <h1>Bienvenido {user.user.firstName} {user.user.lastName}</h1>

            {user.user.email}
            {user.user.phone}
            {user.user.role}
            {user.user.status}


            <button onClick={logout}> Logout</button>
        </div>
    );
};

export default Profile;