import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react';

const Navbar = ({ title }) => {
    const { user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/80">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
                <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">AI Engine Active</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Search Bar */}


                <div className="flex items-center gap-3">
                    <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="w-px h-6 bg-slate-200 mx-2"></div>

                    {/* User Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-50 rounded-2xl transition-all group"
                        >
                            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:border-blue-500 transition-all">
                                {user?.picture ? (
                                    <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white">
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 leading-tight">{user?.name || 'Researcher'}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized</p>
                            </div>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-[1.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account</p>
                                    <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
                                </div>
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all text-sm font-bold">
                                    <User size={18} />
                                    <span>My Profile</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-all text-sm font-bold">
                                    <Settings size={18} />
                                    <span>Settings</span>
                                </button>
                                <div className="h-px bg-slate-50 my-1 mx-4"></div>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-all text-sm font-bold"
                                >
                                    <LogOut size={18} />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
