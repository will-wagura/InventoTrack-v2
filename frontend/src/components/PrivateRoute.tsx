// src/components/PrivateRoute.tsx
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  element: React.ReactNode;
  path: string;
}

const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;