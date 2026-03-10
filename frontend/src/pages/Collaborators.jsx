import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import RecommendationCard from '../components/RecommendationCard';
import { getRecommendations } from '../services/api';
import { Users, Search, Sparkles, Filter, ChevronDown, Loader2 } from 'lucide-react';

const Collaborators = () => {
    const [skill, setSkill] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleRecommend = async () => {
        if (!skill) return;
        setLoading(true);
        setHasSearched(true);
        const data = await getRecommendations(skill);
        setRecommendations(data);
        setLoading(false);
    };

    const trendingSkills = ["Machine Learning", "Quantum Computing", "Bio-Ethics", "Cybersecurity", "Sustainable Energy"];

    const handleSkillClick = (s) => {
        setSkill(s);
        handleRecommend();
    };

    const handleAction = (action) => {
        alert(`Action "${action}" triggered. This feature is part of the premium collaborator matching suite.`);
    };

    return (
        <div className="flex-1 min-h-screen bg-slate-50 pb-20">
            <Navbar title="Collaborator Recommendation Engine" />

            <main className="max-w-7xl mx-auto p-8 space-y-12">
                {/* Hero Section */}
                <section className="bg-white rounded-[2.5rem] border border-slate-200 p-12 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
                    <div className="flex-1 space-y-6 relative z-10">
                        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full text-blue-600 text-xs font-bold border border-blue-100 uppercase tracking-wider">
                            <Sparkles size={14} />
                            <span>AI Matching Engine</span>
                        </div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                            Find Perfect Research <span className="text-blue-600">Partners</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-medium max-w-lg">
                            Input a skill or research topic to find the best collaborators across the entire institutional network.
                        </p>

                        <div className="relative flex items-center max-w-md group">
                            <Search className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="e.g. Natural Language Processing"
                                className="w-full pl-12 pr-32 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-600 focus:bg-white outline-none transition-all font-semibold"
                                value={skill}
                                onChange={(e) => setSkill(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleRecommend()}
                            />
                            <button
                                onClick={handleRecommend}
                                className="absolute right-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                            >
                                Find
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 py-2">Hot:</span>
                            {trendingSkills.map(s => (
                                <button
                                    key={s}
                                    onClick={() => handleSkillClick(s)}
                                    className="bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative hidden lg:block">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 animate-in slide-in-from-bottom-10 duration-1000">
                                <div className="bg-slate-50 h-32 rounded-3xl border border-slate-200 p-4 flex flex-col justify-end">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-blue-200"></div>)}
                                    </div>
                                </div>
                                <div className="bg-blue-600 h-48 rounded-3xl p-6 text-white flex flex-col justify-between">
                                    <Users size={32} className="opacity-50" />
                                    <div className="font-bold text-xl leading-tight">840+ Active Researchers</div>
                                </div>
                            </div>
                            <div className="space-y-4 pt-8 animate-in slide-in-from-bottom-10 duration-1000 delay-150">
                                <div className="bg-slate-900 h-48 rounded-3xl p-6 text-white flex flex-col justify-between">
                                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">Match Quality</div>
                                    <div className="text-4xl font-black">98.4%</div>
                                </div>
                                <div className="bg-slate-50 h-32 rounded-3xl border border-slate-200 p-4">
                                    <div className="h-2 w-3/4 bg-blue-100 rounded-full mb-2"></div>
                                    <div className="h-2 w-1/2 bg-blue-100 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        {/* Background blur */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-3xl rounded-full"></div>
                    </div>
                </section>

                {/* Results Section */}
                {hasSearched && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Recommended Collaborators</h2>
                                <p className="text-slate-500 font-medium">Top matches for <span className="text-blue-600 font-bold">"{skill}"</span> based on project history and skill-set affinity.</p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleAction('Filter')}
                                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
                                >
                                    <Filter size={16} />
                                    <span>Filter</span>
                                </button>
                                <button
                                    onClick={() => handleAction('Sort')}
                                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
                                >
                                    <span>Newest</span>
                                    <ChevronDown size={16} />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="w-full flex flex-col items-center justify-center py-24 gap-4">
                                <Loader2 className="animate-spin text-blue-600" size={48} />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Matching Research Profiles...</p>
                            </div>
                        ) : recommendations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {recommendations.map((collaborator) => (
                                    <RecommendationCard key={collaborator.id} collaborator={collaborator} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-20 rounded-[2.5rem] border-4 border-dashed border-slate-100 text-center">
                                <Users size={64} className="text-slate-200 mx-auto mb-6" />
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Finding your matches...</h3>
                                <p className="text-slate-500 max-w-sm mx-auto font-medium">Enter a specific skill or topic above to start discovering experts in that field.</p>
                            </div>
                        )}

                        {!loading && recommendations.length > 0 && (
                            <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <h4 className="text-lg font-bold text-blue-900">Didn't find what you're looking for?</h4>
                                    <p className="text-blue-700/70 text-sm font-medium">Try broadening your search or exploring related research areas.</p>
                                </div>
                                <button
                                    onClick={() => handleAction('AI Assistant Help')}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm tracking-wide hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                                >
                                    Request AI Assistant Help
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Collaborators;
