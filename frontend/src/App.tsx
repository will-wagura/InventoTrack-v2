import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import { RootState } from './redux/store';
import { loginSuccess } from './redux/slices/authSlice';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import ManageUsers from './pages/ManageUsers';
import ManageStorePage from './pages/ManageStorePage';
import Order from './pages/Order';
import Products from './pages/Products';
import Settings from './pages/Settings';
import Statistic from './pages/Statistic';
import ClerkDashboard from './pages/Clerk/ClerkDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SuperuserDashboard from './pages/SuperuserDashboard';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  useEffect(() => {
    // Example of auto-login logic, e.g., checking session storage or cookie
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser) {
      dispatch(loginSuccess(storedUser));
    }
  }, [dispatch]);

  const getDashboardRoute = (role: string | undefined) => {
    switch (role) {
      case 'clerk':
        return <ClerkDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'superuser':
        return <SuperuserDashboard />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <div style={{ flex: 1 }}>
          {isAuthenticated && <Header />}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated
                  ? getDashboardRoute(userRole)
                  : <Navigate to="/login" />
              }
            />
            <PrivateRoute path="/manage-store" element={<ManageStorePage />} isAuthenticated={isAuthenticated} />
            <PrivateRoute path="/manage-users" element={<ManageUsers />} isAuthenticated={isAuthenticated} />
            <PrivateRoute path="/order" element={<Order />} isAuthenticated={isAuthenticated} />
            <PrivateRoute path="/products" element={<Products />} isAuthenticated={isAuthenticated} />
            <PrivateRoute path="/settings" element={<Settings />} isAuthenticated={isAuthenticated} />
            <PrivateRoute path="/statistic" element={<Statistic />} isAuthenticated={isAuthenticated} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
          {isAuthenticated && <Footer />}
        </div>
      </div>
    </Router>
  );
};

export default App;