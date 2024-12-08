import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Retrieve user role from localStorage
  const role = localStorage.getItem("role");

  // Check if the user role is valid and allowed
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // Render the child components if access is allowed
  return children;
};

export default ProtectedRoute;