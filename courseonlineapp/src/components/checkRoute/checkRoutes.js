import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import {MyUserContext} from "../../Configs/Context"

const PrivateRoute = ({ children, allowedRoles }) => {
    const [user,]= useContext(MyUserContext);


  if (user == null) {
    
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role) && user?.isVerify == true) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;