
import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Loader2, MapPin, ExternalLink, ShieldCheck, Home } from 'lucide-react';
import { SHORTCUT_TOWNS } from './constants';
import { ComparisonResult } from './types';
import { compareTowns } from './services/geminiService';
import { ComparisonDisplay } from './components/ComparisonDisplay';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (town: string) => {
    if (!town.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await compareTowns(town);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch comparison. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setInputValue('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-blue-900 text-white py-2 px-4 border-b border-blue-800 flex justify-center items-center">
        <a 
          href="https://search.heritagediner.com/i/mount-sinai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium hover:text-blue-300 transition-colors"
        >
          <Home className="w-4 h-4" />
          Explore Mount Sinai Real Estate
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Header */}
      <header className="bg-blue-950 text-white py-12 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 px-4 py-1 rounded-full text-blue-200 text-sm font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" />
            North Shore's Finest Community
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase">
            Mount Sinai <span className="text-blue-400">vs</span> The World
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            Discover why living in Mount Sinai, NY is the smartest choice you'll ever make.
          </p>
        </div>
      </header>

      {/* Search & Actions */}
      <main className="flex-grow max-w-5xl w-full mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 -mt-10 relative z-10 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Type any town (e.g., Beverly Hills, Tokyo, Aspen)..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg shadow-inner"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCompare(inputValue)}
              />
            </div>
            <button 
              onClick={() => handleCompare(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap shadow-md active:scale-95"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Compare Now'}
            </button>
            <button 
              onClick={handleReset}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>
          </div>

          <div className="mt-8">
            <p className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Quick Compare Nearby Towns
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
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 border border-blue-100 transition-colors disabled:opacity-50"
                >
                  {town}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center">
            {error}
          </div>
        )}

        {isLoading && !result && (
          <div className="mt-20 text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 border-8 border-blue-100 border-t-blue-700 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <ShieldCheck className="w-8 h-8 text-blue-700" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-800">Analyzing Excellence...</h3>
              <p className="text-slate-500 italic">"Finding all the reasons why Mount Sinai wins again."</p>
            </div>
          </div>
        )}

        {result && <ComparisonDisplay result={result} />}

        {!result && !isLoading && (
          <div className="mt-20 text-center max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="bg-blue-50 p-10 rounded-3xl border-2 border-dashed border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Start Your Comparison</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Think your current town measures up? Or curious how we compare to the famous cities of the world? 
                Enter any town above to see the data-backed reasons why Mount Sinai remains the gold standard for luxury, community, and value.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                {['Safe Streets', 'Award-Winning Schools', 'Pristine Beaches', 'Strong Community'].map(perk => (
                  <div key={perk} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CheckCircleSmall /> {perk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center mt-20 border-t border-slate-800">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-bold text-slate-300">Created for the Mount Sinai Community — Why Live Anywhere Else?</p>
          <p className="text-sm max-w-md mx-auto">
            Mount Sinai offers a unique blend of heritage, nature, and modern luxury that few places in the world can replicate.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <a 
              href="https://search.heritagediner.com/i/mount-sinai" 
              className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse Mount Sinai Properties <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="pt-8 text-xs text-slate-600">
            &copy; {new Date().getFullYear()} Mount Sinai NY Advocates. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const CheckCircleSmall = () => (
  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export default App;
