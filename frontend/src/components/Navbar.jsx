import React from 'react';
import { Bell, Search, User, Sparkles } from 'lucide-react';

const Navbar = ({ title }) => {
    return (
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-blue-600 text-xs font-bold border border-blue-100 uppercase tracking-wider animate-pulse">
                    <Sparkles size={12} />
                    <span>AI Insight Active</span>
                </div>
            </div>

            <div className="flex items-center gap-6">


                <div className="flex items-center gap-4 text-slate-500">
                    <button className="hover:text-slate-900 transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                    <button className="flex items-center gap-2 hover:text-slate-900 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                            <User size={18} />
                        </div>
                        <span className="text-sm font-medium">Administrator</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
