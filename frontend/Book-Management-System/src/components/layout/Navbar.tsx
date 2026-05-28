import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useUIStore } from '@/store/uiStore';
import { Bell, User, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  return (
    <nav className="bg-surface border-b border-border shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-primary-700 hover:bg-secondary-100 p-2 rounded-2xl transition"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <button className="relative text-primary-700 hover:bg-secondary-100 p-2 rounded-2xl transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl bg-secondary-100 px-4 py-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-text">{user?.username}</p>
              <p className="text-xs text-muted">{user?.email}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-700 text-white shadow-sm">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
