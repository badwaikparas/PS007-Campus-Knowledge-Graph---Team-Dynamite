import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import { searchResearch } from '../services/api';
import { Library, User, ExternalLink, Sparkles, Loader2, Info } from 'lucide-react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        setHasSearched(true);
        const data = await searchResearch(query);
        setResults(data);
        setLoading(false);
    };

    const handleResultClick = (title) => {
        alert(`Opening details for: "${title}". In a live system, this would navigate to a detailed entity page.`);
    };

    return (
        <div className="flex-1 min-h-screen bg-slate-50 pb-20">
            <Navbar title="Semantic Knowledge Search" />

            <main className="max-w-7xl mx-auto p-8 flex flex-col items-center">
                {/* Search Header */}
                <div className={`transition-all duration-700 w-full flex flex-col items-center ${hasSearched ? 'mt-0' : 'mt-24 mb-12'}`}>
                    {!hasSearched && (
                        <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <div className="bg-blue-600 w-20 h-20 rounded-3xl p-5 text-white mx-auto shadow-2xl shadow-blue-500/20 mb-6">
                                <Sparkles size={40} />
                            </div>
                            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Institutional Knowledge Oracle</h1>
                            <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
                                Find exactly what you need with semantic, AI-powered search across all institutional research and expertise.
                            </p>
                        </div>
                    )}

                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        onSearch={handleSearch}
                        placeholder="Search research topics, skills, or publications..."
                    />
                </div>

                {/* Results Section */}
                {hasSearched && (
                    <div className="w-full max-w-4xl mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-bold text-slate-800 tracking-tight">Search Results</h2>
                                <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-xs font-bold leading-none">
                                    {results.length} found
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                                <span>Sorted by:</span>
                                <button className="text-blue-600 hover:underline">Relevance</button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-6">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                    <Sparkles className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600/50" size={24} />
                                </div>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Consulting AI Knowledge Base...</p>
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-6">
                                {results.map((result) => (
                                    <div key={result.id} className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                                                    <span className={`${result.type === 'project' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'} px-2 py-0.5 rounded`}>
                                                        {result.type}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                                    {result.title}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => handleResultClick(result.title)}
                                                className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                                            >
                                                <ExternalLink size={18} />
                                            </button>
                                        </div>

                                        <p className="text-slate-600 leading-relaxed font-medium mb-6 line-clamp-2">
                                            {result.description}
                                        </p>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <User size={14} />
                                                </div>
                                                <div className="flex items-center gap-1.5 overflow-hidden">
                                                    {result.relatedResearchers.map((researcher, idx) => (
                                                        <React.Fragment key={idx}>
                                                            <span className="text-sm font-bold text-slate-800 truncate max-w-[120px]">{researcher}</span>
                                                            {idx < result.relatedResearchers.length - 1 && <span className="text-slate-300">•</span>}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleResultClick(result.title)}
                                                className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
                                            >
                                                <span>Read Detail</span>
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-3xl border border-slate-200 border-dashed text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                    <Info size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No results found</h3>
                                <p className="text-slate-500 font-medium">Try searching for other topics like "AI Safety" or "Bioelectronics".</p>
                            </div>
                        )}

                        {!loading && results.length > 0 && (
                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={() => alert('Loading more results... In a live app, this would fetch the next page of pagination.')}
                                    className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm tracking-wide hover:bg-slate-800 transition-colors shadow-lg"
                                >
                                    Load More Results
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

const ArrowRight = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
);

export default Search;
