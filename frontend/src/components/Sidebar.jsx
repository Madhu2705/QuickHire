import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Briefcase, FileText, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const candidateMenus = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Briefcase, label: 'Browse Jobs', path: '/jobs' },
    { icon: FileText, label: 'My Applications', path: '/my-applications' },
    { icon: FileText, label: 'Saved Jobs', path: '/saved-jobs' },
    { icon: Settings, label: 'Profile', path: '/profile' }
  ];

  const recruiterMenus = [
    { icon: Home, label: 'Dashboard', path: '/recruiter/dashboard' },
    { icon: Briefcase, label: 'Post Job', path: '/recruiter/post-job' },
    { icon: FileText, label: 'Manage Jobs', path: '/recruiter/manage-jobs' },
    { icon: Users, label: 'Applicants', path: '/recruiter/applicants' },
    { icon: Settings, label: 'Company Profile', path: '/recruiter/company-profile' }
  ];

  const menus = user?.role === 'recruiter' ? recruiterMenus : candidateMenus;

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed md:static left-0 top-16 md:top-0 w-64 h-screen bg-white border-r border-gray-200 shadow-lg md:shadow-none transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-6 space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;
          return (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(menu.path)
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{menu.label}</span>
            </Link>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
