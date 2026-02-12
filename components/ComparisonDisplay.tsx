
import React from 'react';
import { ComparisonResult } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { MapPin, Globe } from 'lucide-react';

interface Props {
  result: ComparisonResult;
  heroImage: string | null;
}

export const ComparisonDisplay: React.FC<Props> = ({ result, heroImage }) => {
  return (
    <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
          {result.headline}
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto font-medium">
          {result.summary}
        </p>
      </div>

      {heroImage && (
        <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-video relative group bg-slate-100">
          <img src={heroImage} alt="Comparison Visual" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <p className="text-white text-sm font-medium opacity-90 italic">
              AI Visualization: {result.targetTown} & Mount Sinai, NY
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-slate-400 w-5 h-5" />
            <span className="font-bold text-slate-500 uppercase tracking-widest text-xs">Location A</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">{result.targetTown}</h3>
          <p className="text-sm text-slate-500">Factual data and local characteristics.</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border-2 border-blue-600 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-blue-600 w-5 h-5" />
            <span className="font-bold text-blue-600 uppercase tracking-widest text-xs">Location B</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Mount Sinai, NY</h3>
          <p className="text-sm text-slate-500">Factual data and local characteristics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {result.categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:border-slate-300 transition-colors group">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/4 bg-slate-50 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200">
                <div className="w-12 h-12 bg-white text-slate-600 border border-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                  {CATEGORY_ICONS[cat.name] || <MapPin />}
                </div>
                <h4 className="font-bold text-slate-800">{cat.name}</h4>
              </div>
              
              <div className="p-6 md:w-3/4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2 border-l-4 border-slate-200 pl-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{result.targetTown}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{cat.otherTownFactual}</p>
                  </div>
                  <div className="space-y-2 border-l-4 border-blue-600 pl-4 bg-blue-50/20 rounded-r-lg">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Mount Sinai, NY</p>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">{cat.mtSinaiFactual}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-2xl p-10 text-center shadow-2xl">
        <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">
          Comparison Verdict
        </h3>
        <p className="text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          {result.verdict}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://search.heritagediner.com/i/mount-sinai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-500 transition-all shadow-lg active:scale-95"
          >
            Explore Mount Sinai Listings
          </a>
          <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
             className="inline-block bg-slate-800 text-slate-300 font-bold py-3 px-8 rounded-full hover:bg-slate-700 transition-all border border-slate-700"
          >
            New Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
