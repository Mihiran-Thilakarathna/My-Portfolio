import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import EntityListPage from './EntityListPage';
import './admin.css';

const AdminApp: React.FC = () => {
  return (
    <AdminAuthProvider>
      <div className="admin-root">
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="projects" replace />} />
            <Route path="projects" element={<EntityListPage entityKey="projects" />} />
            <Route path="certifications" element={<EntityListPage entityKey="certifications" />} />
            <Route path="education" element={<EntityListPage entityKey="education" />} />
            <Route path="work" element={<EntityListPage entityKey="workExperience" />} />
            <Route path="competitions" element={<EntityListPage entityKey="competitions" />} />
          </Route>
        </Routes>
      </div>
    </AdminAuthProvider>
  );
};

export default AdminApp;
