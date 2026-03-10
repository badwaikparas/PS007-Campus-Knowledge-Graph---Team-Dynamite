import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GraphView from '../components/GraphView';
import { Info, ExternalLink, Zap, Users, BookOpen, GraduationCap } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const stats = [
        { label: 'Total Students', value: '4,280', icon: <GraduationCap size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Research Projects', value: '1,156', icon: <Zap size={18} />, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Peer Publications', value: '3,892', icon: <BookOpen size={18} />, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Active Collaborators', value: '842', icon: <Users size={18} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const handleAction = (action) => {
        alert(`Action "${action}" triggered. In a live environment, this would perform a backend operation.`);
    };

    return (
        <div className="flex-1 min-h-screen bg-slate-50 pb-12">
            <Navbar title="Institution Knowledge Intelligence" />

            <main className="p-8 max-w-7xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Intelligence Dashboard</h1>
                        <p className="text-slate-500 max-w-2xl font-medium">
                            Explore relationships between students, skills, research projects and publications across the institution in real-time.
                        </p>
                    </div>

                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900 leading-tight">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Knowledge Graph Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-slate-800">Knowledge Relationship Graph</h2>
                            <div className="group relative">
                                <Info size={16} className="text-slate-300 cursor-help" />
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-slate-900 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                                    Drag nodes to rearrange. Scroll to zoom. Use color codes to identify entity types.
                                </div>
                            </div>
                        </div>
                    </div>

                    <GraphView />
                </section>

                {/* Recent Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-600/20">
                        <div className="relative z-10 space-y-4">
                            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold">
                                <Sparkles size={14} className="text-blue-200" />
                                <span>AI Recommendation</span>
                            </div>
                            <h3 className="text-2xl font-bold">New Research Cluster Detected</h3>
                            <p className="opacity-80 leading-relaxed font-medium">
                                We identified a significant overlap in skills between the "Bio-Informatics" and "Quantum Computing" departments. This suggests a potential high-impact collaboration opportunity in Molecular Simulation.
                            </p>
                            <button
                                onClick={() => navigate('/collaborators')}
                                className="bg-white text-blue-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-lg"
                            >
                                View Suggested Collaborators
                            </button>
                        </div>
                        {/* Abstract decorations */}
                        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute right-10 top-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mx-auto border border-slate-100">
                            <Users size={32} />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">Invite Your Faculty</h4>
                        <p className="text-slate-500 text-sm font-medium">Add more researchers to uncover more hidden connections across your institution.</p>

                    </div>
                </div>
            </main>
        </div>
    );
};

const Sparkles = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
    </svg>
);

export default Dashboard;
