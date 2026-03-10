import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TrendsChart from '../components/TrendsChart';
import { getTrends } from '../services/api';
import { TrendingUp, BarChart3, LineChart, PieChart, Info, ArrowUpRight, Sparkles } from 'lucide-react';

const Trends = () => {
    const [trendsData, setTrendsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const fetchTrends = async () => {
            setLoading(true);
            const data = await getTrends();
            setTrendsData(data);
            setLoading(false);
        };
        fetchTrends();
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) {
            alert("Please enter a valid academic email.");
            return;
        }
        setSubscribed(true);
        alert(`Successfully subscribed ${email} to weekly trends!`);
        setEmail('');
        setTimeout(() => setSubscribed(false), 5000);
    };

    const handleAction = (action) => {
        alert(`Action "${action}" triggered. This feature will be available once the analytics engine is fully connected.`);
    };

    if (loading) {
        return (
            <div className="flex-1 min-h-screen bg-slate-50">
                <Navbar title="Innovation Trends Analytics" />
                <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                            <TrendingUp size={32} />
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Processing Trends Data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 min-h-screen bg-slate-50 pb-20">
            <Navbar title="Innovation Trends Analytics" />

            <main className="max-w-7xl mx-auto p-8 space-y-12">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm">
                            <TrendingUp size={18} />
                            <span>Real-time Institutional Growth</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Innovation Intelligence</h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl">
                            Understand the research trajectory of your institution with advanced data analytics and predictive skill mapping.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center border border-green-100">
                                <ArrowUpRight size={24} />
                            </div>
                            <div className="pr-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Rate</p>
                                <p className="text-xl font-bold text-slate-900 leading-none mt-1">+12.4%</p>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center border border-indigo-100">
                                <Sparkles size={24} />
                            </div>
                            <div className="pr-2">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Innovation Score</p>
                                <p className="text-xl font-bold text-slate-900 leading-none mt-1">92/100</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <TrendsChart
                        data={trendsData.skills}
                        type="bar"
                        title="Top Research Skills Distribution"
                    />
                    <TrendsChart
                        data={trendsData.activity}
                        type="line"
                        title="Institutional Research Activity (2025)"
                    />
                </div>

                {/* Insight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                            <BarChart3 size={20} />
                        </div>
                        <h4 className="font-bold text-slate-900">Emerging Skills</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            We've noticed a 40% uptick in "Generative AI" mentions across new research proposals in the last 3 months.
                        </p>
                        <button
                            onClick={() => handleAction('Verify Clusters')}
                            className="text-blue-600 text-sm font-bold hover:underline"
                        >
                            Verify Clusters
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                            <PieChart size={20} />
                        </div>
                        <h4 className="font-bold text-slate-900">Publication Velocity</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            The time from project initiation to first publication has decreased by an average of 14 days compared to last year.
                        </p>
                        <button
                            onClick={() => handleAction('View Analytics')}
                            className="text-blue-600 text-sm font-bold hover:underline"
                        >
                            View Analytics
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                        <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                            <LineChart size={20} />
                        </div>
                        <h4 className="font-bold text-slate-900">Collaboration Index</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            Inter-departmental projects now account for 35% of all research ventures, a record high for the institution.
                        </p>
                        <button
                            onClick={() => handleAction('Heatmap View')}
                            className="text-blue-600 text-sm font-bold hover:underline"
                        >
                            Heatmap View
                        </button>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[3rem] p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-600/20 relative overflow-hidden">
                    <div className="space-y-4 relative z-10 text-center lg:text-left">
                        <h3 className="text-3xl font-extrabold tracking-tight">Stay Ahead of the Curve</h3>
                        <p className="text-lg opacity-80 font-medium max-w-xl">
                            Get weekly AI-generated reports on research trends and collaboration opportunities delivered to your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 pt-4 lg:justify-start justify-center">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your academic email"
                                className="px-6 py-4 bg-white/10 border border-white/20 rounded-2xl outline-none focus:bg-white/20 transition-all font-medium placeholder:text-white/40 w-full sm:w-80"
                            />
                            <button
                                type="submit"
                                className={`px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-xl whitespace-nowrap ${subscribed ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={subscribed}
                            >
                                {subscribed ? 'Subscribed!' : 'Subscribe to Trends'}
                            </button>
                        </form>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 backdrop-blur-sm">
                            <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 animate-pulse">
                                <TrendingUp size={64} className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Decorations */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl"></div>
                </div>
            </main>
        </div>
    );
};

export default Trends;
