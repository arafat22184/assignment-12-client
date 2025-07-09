import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const { pathname } = useLocation();

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
