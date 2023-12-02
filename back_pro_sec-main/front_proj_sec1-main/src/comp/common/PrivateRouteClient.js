import React, { useEffect } from "react";
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import useApi from "../../hocks/useApi";
const PrivateRoutesClient = () => {
    const { user } = React.useContext(AuthContext);
    return (
        user.role === "client" ? <Outlet /> : <Navigate to='/login' />
    )


}

export default PrivateRoutesClient;