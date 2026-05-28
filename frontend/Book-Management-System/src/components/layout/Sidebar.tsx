import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/utils/helpers';
import logoImage from '@/assets/mm.png';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/books', label: 'Books', icon: '📚' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 md:hidden rounded-full bg-surface p-3 shadow-sm text-primary-700 transition hover:bg-secondary-100"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden bg-slate-950/40"
          onClick={() => toggleSidebar()}
        />
      )}

      <div
        className={cn(
          'fixed left-0 top-0 h-screen w-72 bg-primary-950 text-white z-30 transition-transform duration-300 md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center gap-3 p-6 border-b border-primary-800">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-500/10 overflow-hidden">
            <img src={logoImage} alt="BookHub logo" className="h-10 w-10 object-cover rounded-2xl" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">BookHub</h1>
            <p className="text-sm text-secondary-300">Library workspace</p>
          </div>
        </div>

        <nav className="p-6 flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200',
                    isActive(item.href)
                      ? 'bg-accent-500/15 text-accent-50 shadow-sm'
                      : 'text-secondary-300 hover:bg-primary-800/70 hover:text-white'
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 border-t border-primary-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full rounded-2xl px-4 py-3 text-secondary-300 hover:bg-primary-800/70 transition"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
