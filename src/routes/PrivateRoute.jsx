import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Shared/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const { pathname } = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={pathname} to={"/login"}></Navigate>;
};

export default PrivateRoute;
