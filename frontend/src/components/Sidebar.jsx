import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Users, TrendingUp, Cpu } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { name: 'Semantic Search', icon: <Search size={20} />, path: '/search' },
        { name: 'Collaborators', icon: <Users size={20} />, path: '/collaborators' },
        { name: 'Innovation Trends', icon: <TrendingUp size={20} />, path: '/trends' },
    ];

    return (
        <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3 border-b border-slate-100">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                    <Cpu size={24} />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-slate-900 leading-tight">IK Engine</h1>
                    <p className="text-xs text-slate-500 font-medium">Institutional Intel</p>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 mt-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-xl text-white">
                    <p className="text-xs font-semibold opacity-80 uppercase tracking-wider mb-1">Hackathon Demo</p>
                    <p className="text-sm font-medium">AI-Powered Institutional Knowledge Engine</p>
                    <div className="mt-3 bg-white/20 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-white h-full w-3/4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
