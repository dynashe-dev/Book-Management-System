import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/utils/helpers';

const Sidebar: React.FC = () => {
  const location = window.location;
  const { logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/books', label: 'Books', icon: '📚' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 md:hidden"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden bg-black bg-opacity-50"
          onClick={() => toggleSidebar()}
        />
      )}

      <div
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-secondary-900 text-white z-30 transition-transform md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center gap-2 p-6 border-b border-secondary-800">
          <BookOpen size={28} />
          <h1 className="text-xl font-bold">BookHub</h1>
        </div>

        <nav className="p-4 flex-1">
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
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition',
                    isActive(item.href)
                      ? 'bg-primary-500 text-white'
                      : 'text-secondary-300 hover:bg-secondary-800'
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-secondary-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-secondary-300 hover:bg-secondary-800 rounded-lg transition"
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
