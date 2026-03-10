import React from 'react';
import { User, Library, Calendar, ArrowRight } from 'lucide-react';

const RecommendationCard = ({ collaborator }) => {
    const handleProfileClick = () => {
        alert(`Opening ${collaborator.name}'s profile. In a live environment, this would show their full research history, metrics, and contact info.`);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 group flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <User size={28} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{collaborator.name}</h3>
                        <p className="text-sm text-slate-500 font-medium">{collaborator.expertise}</p>
                    </div>
                </div>
                <button
                    onClick={handleProfileClick}
                    className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:text-blue-500 transition-colors"
                >
                    <ArrowRight size={18} />
                </button>
            </div>

            <div className="space-y-4 mb-6 flex-1">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <Library size={14} />
                        <span>Top Projects</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {collaborator.projects.map((project, idx) => (
                            <span key={idx} className="bg-slate-50 text-slate-700 px-3 py-1 rounded-full text-xs font-medium border border-slate-100">
                                {project}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <Calendar size={14} />
                        <span>Key Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {collaborator.skills.map((skill, idx) => (
                            <span key={idx} className="bg-blue-50/50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100/50">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={handleProfileClick}
                className="w-full py-3 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
                <span>View Researcher Profile</span>
            </button>
        </div>
    );
};

export default RecommendationCard;
