import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaProjectDiagram, FaCertificate, FaGraduationCap, FaBriefcase, FaTrophy, FaSignOutAlt } from 'react-icons/fa';
import { useAdminAuth } from './AuthContext';

const navItems = [
  { to: '/admin/projects', label: 'Projects', icon: <FaProjectDiagram /> },
  { to: '/admin/certifications', label: 'Certifications', icon: <FaCertificate /> },
  { to: '/admin/education', label: 'Education', icon: <FaGraduationCap /> },
  { to: '/admin/work', label: 'Work Experience', icon: <FaBriefcase /> },
  { to: '/admin/competitions', label: 'Achievements', icon: <FaTrophy /> },
];

const AdminLayout: React.FC = () => {
  const { logout } = useAdminAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Portfolio Admin</div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
        <a className="admin-view-site" href="/" target="_blank" rel="noopener noreferrer">
          View Live Site
        </a>
        <button className="admin-logout-btn" onClick={() => logout()}>
          <FaSignOutAlt /> Sign Out
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
