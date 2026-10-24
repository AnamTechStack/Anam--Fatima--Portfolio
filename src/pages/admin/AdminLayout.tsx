import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Code,
  Sparkles,
  FileText,
  BookOpen,
  Mail,
  Image,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected route enforcement
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Projects', path: '/admin/projects', icon: Layers },
    { label: 'Skills', path: '/admin/skills', icon: Code },
    { label: 'Services', path: '/admin/services', icon: Sparkles },
    { label: 'Resume & History', path: '/admin/resume', icon: FileText },
    { label: 'Blog Posts', path: '/admin/blog', icon: BookOpen },
    { label: 'Contact Inbox', path: '/admin/messages', icon: Mail },
    { label: 'Media Library', path: '/admin/media', icon: Image },
    { label: 'Site Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 flex flex-col md:flex-row">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0B1120] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
            ATS
          </span>
          <span className="font-heading font-semibold text-white text-sm">
            Admin CMS
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-30 h-screen w-64 bg-[#0B1120] border-r border-slate-800/80 p-5 flex flex-col justify-between transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          
          {/* Logo / Brand */}
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-blue-500/20">
                ATS
              </span>
              <div>
                <span className="block font-heading font-bold text-white text-sm">
                  Anam Tech Stack
                </span>
                <span className="block text-[10px] text-cyan-400 font-mono">
                  Super Admin CMS
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User profile & actions footer */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-semibold text-xs border border-slate-700">
              AF
            </div>
            <div className="truncate flex-1">
              <span className="block text-xs font-semibold text-white truncate">
                {user?.name || 'Anam Fatima'}
              </span>
              <span className="block text-[10px] text-slate-400 truncate">
                {user?.email || 'anamdeveloper255@gmail.com'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <Link
              to="/"
              target="_blank"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center gap-1 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Public</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-rose-100 flex items-center justify-center gap-1 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Outlet Workspace */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full overflow-x-hidden">
        <Outlet />
      </main>

    </div>
  );
};
