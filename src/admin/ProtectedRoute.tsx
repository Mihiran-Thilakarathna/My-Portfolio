import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <div className="admin-login-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
