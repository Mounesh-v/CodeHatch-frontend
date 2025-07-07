import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to access this page.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
