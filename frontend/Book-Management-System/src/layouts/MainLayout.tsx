import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { useUIStore } from '@/store/uiStore';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex h-screen bg-background text-text overflow-hidden">
      <Sidebar />

      <div className={`flex-1 flex flex-col overflow-hidden transition-all md:pl-72 ${sidebarOpen ? '' : ''}`}>
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
