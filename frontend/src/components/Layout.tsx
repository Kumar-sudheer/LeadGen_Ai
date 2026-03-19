import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden flex flex-col">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0f172a]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">{title || "B2B Lead Finder & AI SDR"}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-accent transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                JD
              </div>
            </button>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
