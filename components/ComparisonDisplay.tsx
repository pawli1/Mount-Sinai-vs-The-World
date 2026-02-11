
import React from 'react';
import { ComparisonResult } from '../types';
import { CATEGORY_ICONS } from '../constants';
import { MapPin, CheckCircle } from 'lucide-react';

interface Props {
  result: ComparisonResult;
}

export const ComparisonDisplay: React.FC<Props> = ({ result }) => {
  return (
    <div className="mt-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          {result.headline}
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {result.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-100 rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-slate-500" />
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-sm">Contender</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">{result.targetTown}</h3>
          <p className="text-sm text-slate-500 italic">Competitive, but missing the Mount Sinai magic.</p>
        </div>
        
        <div className="bg-blue-900 rounded-xl p-6 border border-blue-800 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CheckCircle className="w-20 h-20" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="text-blue-400" />
            <span className="font-semibold text-blue-200 uppercase tracking-wider text-sm">The Champion</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Mount Sinai, NY</h3>
          <p className="text-sm text-blue-100">The gold standard of North Shore living.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {result.categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:border-blue-300 transition-colors">
            <div className="flex flex-col md:flex-row">
              <div className="p-6 md:w-1/4 bg-slate-50 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mb-3">
                  {CATEGORY_ICONS[cat.name] || <CheckCircle />}
                </div>
                <h4 className="font-bold text-slate-800">{cat.name}</h4>
              </div>
              
              <div className="p-6 md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase">{result.targetTown}</p>
                  <p className="text-slate-600 text-sm">{cat.otherTownMetric}</p>
                </div>
                <div className="space-y-2 bg-blue-50/50 p-3 rounded-lg border-l-4 border-blue-600">
                  <p className="text-xs font-bold text-blue-700 uppercase">Mount Sinai, NY Advantage</p>
                  <p className="text-slate-800 text-sm font-medium">{cat.mtSinaiAdvantage}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-900 text-white rounded-2xl p-8 text-center shadow-2xl">
        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">
          {result.verdict}
        </h3>
        <p className="text-blue-100 mb-6">
          Whether you're looking for world-class education, serene nature, or a family-focused community, Mount Sinai delivers it all with unparalleled North Shore charm.
        </p>
        <a 
          href="https://search.heritagediner.com/i/mount-sinai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors"
        >
          View Mount Sinai Properties
        </a>
      </div>
    </div>
  );
};
