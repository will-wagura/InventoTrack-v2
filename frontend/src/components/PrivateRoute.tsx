import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PrivateRoute: React.FC<{ element: React.ReactNode; path: string }> = ({ element, path }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Route path={path} element={element} /> : <Navigate to="/login" />;
};

export default PrivateRoute;