
import React, { useState } from 'react';
import { Search, RotateCcw, Loader2, MapPin, ExternalLink, Globe, Home } from 'lucide-react';
import { SHORTCUT_TOWNS } from './constants';
import { ComparisonResult } from './types';
import { compareTowns, generateVictoryImage } from './services/geminiService';
import { ComparisonDisplay } from './components/ComparisonDisplay';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (town: string) => {
    if (!town.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    setHeroImage(null);

    try {
      const data = await compareTowns(town);
      setResult(data);
      const img = await generateVictoryImage(data.heroImagePrompt);
      setHeroImage(img);
    } catch (err) {
      console.error(err);
      setError('Comparison failed. Please try a different town name.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setHeroImage(null);
    setInputValue('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Navigation Bar */}
      <div className="bg-slate-900 text-white py-2 px-4 border-b border-slate-800 flex justify-center items-center">
        <a 
          href="https://search.heritagediner.com/i/mount-sinai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
        >
          <Home className="w-4 h-4" />
          Search Real Estate in Mount Sinai
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Header */}
      <header className="bg-white py-12 px-4 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1 rounded-full text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 border border-slate-200">
            <Globe className="w-3 h-3" />
            Global Town Comparison Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase text-slate-900">
            Mount Sinai <span className="text-slate-400">vs</span> The World
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Honest, factual, and data-driven side-by-side comparisons of history, lifestyle, and local facts.
          </p>
        </div>
      </header>

      {/* Search & Actions */}
      <main className="flex-grow max-w-5xl w-full mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 -mt-10 relative z-10 border border-slate-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Enter town name (e.g. Austin, London, Tokyo)..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 text-lg transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCompare(inputValue)}
              />
            </div>
            <button 
              onClick={() => handleCompare(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="bg-slate-900 hover:bg-black text-white font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap shadow-md active:scale-95"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Compare'}
            </button>
            <button 
              onClick={handleReset}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-widest">
              <MapPin className="w-3 h-3" />
              Quick Suggestions
            </p>
            <div className="flex flex-wrap gap-2">
              {SHORTCUT_TOWNS.map(town => (
                <button 
                  key={town}
                  onClick={() => {
                    setInputValue(town);
                    handleCompare(town);
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 border border-slate-200 transition-all disabled:opacity-50"
                >
                  {town}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        {isLoading && !result && (
          <div className="mt-20 text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800">Compiling Factual Data...</h3>
              <p className="text-slate-500 font-medium italic">"Researching history, people, and culture..."</p>
            </div>
          </div>
        )}

        {result && <ComparisonDisplay result={result} heroImage={heroImage} />}

        {!result && !isLoading && (
          <div className="mt-20 text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-700">
            <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 uppercase tracking-tighter">Objective Comparison</h3>
              <p className="text-slate-500 leading-relaxed mb-8 font-medium">
                Compare Mount Sinai, NY with any town globally based on raw data, historical landmarks, verified facts, and local culinary culture.
              </p>
              <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
                {['Verified History', 'Famous Residents', 'Local Landmarks', 'Honest Metrics'].map(perk => (
                  <div key={perk} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <CheckCircleSmall /> {perk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 px-4 text-center mt-20">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Town Comparison Archive</p>
          <div className="pt-4">
            <a 
              href="https://search.heritagediner.com/i/mount-sinai" 
              className="text-slate-900 hover:text-blue-600 font-bold flex items-center justify-center gap-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Search Real Estate in Mount Sinai <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="pt-12 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            Data sourced from official records & verified public archives.
          </div>
        </div>
      </footer>
    </div>
  );
};

const CheckCircleSmall = () => (
  <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default App;
