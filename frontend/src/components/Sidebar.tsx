import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, Mail, Settings, LogOut, Zap, Shield, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Pipeline', path: '/dashboard' },
    { icon: Search, label: 'Find Leads', path: '/find-leads' },
    { icon: Sparkles, label: 'Search AI', path: '/' },
    { icon: Mail, label: 'Email Generator', path: '/email-generator' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-white/5 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">LeadGen AI</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-sm" 
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            )}
          >
            <item.icon className={clsx("w-5 h-5 transition-transform group-hover:scale-110")} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <p className="text-xs font-bold text-purple-300 uppercase tracking-widest mb-1">Current Plan</p>
          <p className="text-white font-bold text-lg mb-3">Free Trial</p>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3">
            <div className="bg-purple-500 h-full w-[40%]"></div>
          </div>
          <p className="text-[10px] text-slate-400 mb-3">20/50 leads used this month</p>
          <button className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold py-2 rounded-lg transition-all border border-white/10">
            Upgrade Now
          </button>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
