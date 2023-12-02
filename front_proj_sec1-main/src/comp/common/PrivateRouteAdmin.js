import React, { useEffect } from "react";
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import useApi from "../../hocks/useApi";
const PrivateRoutesAdmin = () => {
    const { user, logout } = React.useContext(AuthContext);
    return (
        user.role === "admin" ? <Outlet /> : <Navigate to='/login' />
    )


}

export default PrivateRoutesAdmin;