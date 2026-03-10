import React from 'react';
import { Search, Sparkles } from 'lucide-react';

const SearchBar = ({ value, onChange, onSearch, placeholder }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="relative max-w-3xl mx-auto w-full group">
            <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-2xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
            <div className="relative flex items-center bg-white border-2 border-slate-200 p-2 rounded-2xl shadow-xl focus-within:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 flex-1 px-4">
                    <Search className="text-slate-400" size={24} />
                    <input
                        type="text"
                        className="flex-1 py-3 text-lg outline-none placeholder:text-slate-300 font-medium bg-transparent"
                        placeholder={placeholder || "Search research topics, skills, or publications..."}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <button
                    onClick={onSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-500/30"
                >
                    <Sparkles size={18} />
                    <span>Search</span>
                </button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-4 text-xs font-semibold text-slate-400 tracking-wider uppercase">
                <span>Suggested:</span>
                <button onClick={() => onChange("Generative AI")} className="hover:text-blue-500 transition-colors">Generative AI</button>
                <button onClick={() => onChange("Quantum Computing")} className="hover:text-blue-500 transition-colors">Quantum Computing</button>
                <button onClick={() => onChange("Sustainability")} className="hover:text-blue-500 transition-colors">Sustainability</button>
            </div>
        </div>
    );
};

export default SearchBar;
