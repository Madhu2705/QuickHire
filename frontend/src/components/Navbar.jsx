import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const baseNavItems = [
  { label: 'Home', to: '/' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'About', to: '/recruiter/about' },
  { label: 'Contact', to: '/recruiter/contact' }
];

const Navbar = ({ isMobileSidebarOpen, setIsMobileSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileDropdown, setProfileDropdown] = React.useState(false);

  useEffect(() => {
    if (user) {
      setProfileDropdown(true);
    }
  }, [user]);

  const roleNavItems = user?.role === 'recruiter'
    ? [
        { label: 'Dashboard', to: '/recruiter/dashboard' },
        { label: 'Post Job', to: '/recruiter/post-job' }
      ]
    : user?.role === 'candidate'
      ? [
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'My Applications', to: '/my-applications' }
        ]
      : [];

  const shouldHideJobs = user?.role === 'recruiter';
  const navItemsToShow = [
    ...baseNavItems.filter((item) => !(shouldHideJobs && item.to === '/jobs')),
    ...roleNavItems
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-slate-950">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-600 to-violet-600 text-white shadow-lg">
            Q
          </span>
          QuickHire
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItemsToShow.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-sm font-medium transition ${isActiveLink(item.to) ? 'text-slate-950' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 transition">
            <Search size={18} />
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm hover:shadow-md transition"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white">{user.fullName.charAt(0).toUpperCase()}</span>
                {user.fullName}
              </button>
              {profileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-3xl border border-slate-200 bg-white shadow-lg">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-3 text-slate-900 hover:bg-slate-50"
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-sky-600 to-violet-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-sky-500/20 hover:opacity-95 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
          {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileSidebarOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4">
          <div className="flex flex-col gap-3">
            {navItemsToShow.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="block rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="block rounded-2xl border border-slate-200 px-4 py-3 text-center text-slate-900 hover:bg-slate-100"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="block rounded-2xl border border-slate-200 px-4 py-3 text-center text-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="block rounded-2xl bg-slate-900 px-4 py-3 text-center text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
