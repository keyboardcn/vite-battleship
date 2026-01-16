import React from "react";
import {Outlet, Navigate} from 'react-router-dom';
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = () => {
    const { authanticated } = useAppSelector(state => state.loggedUser)

    return authanticated ? <Outlet /> : <Navigate to="/user-profile" />
};

export default PrivateRoute;