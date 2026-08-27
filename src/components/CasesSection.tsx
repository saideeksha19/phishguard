import React, { useState, useMemo } from 'react';
import { 
  BookOpenCheck, 
  Search, 
  AlertOctagon, 
  Calendar, 
  Building2, 
  Crosshair, 
  CheckCircle, 
  ChevronRight, 
  X
} from 'lucide-react';
import { REAL_WORLD_CASES } from '../data/trainingData';
import { RealWorldCase } from '../types';
import { EmptyState } from './EmptyState';

export const CasesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [activeCase, setActiveCase] = useState<RealWorldCase | null>(null);

  const filteredCases = useMemo(() => {
    return REAL_WORLD_CASES.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.targetOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.vector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity = selectedSeverity === 'all' || c.severity === selectedSeverity;

      return matchesSearch && matchesSeverity;
    });
  }, [searchQuery, selectedSeverity]);

  return (
    <div id="cases-section-container" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-indigo-50 text-indigo-800 border border-indigo-200">
              <BookOpenCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase text-indigo-800 font-bold tracking-wide">
              Incident Post-Mortems
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">Real-World Cases</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
            Deep-dive post-mortems of high-profile phishing breaches, attack vectors, and enterprise lessons learned.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-800 bg-white px-3 py-1.5 border border-slate-200 shadow-xs font-semibold">
            {filteredCases.length} Documented Breaches
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div id="cases-toolbar" className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="cases-search-input"
            type="text"
            placeholder="Search breach cases, targets (e.g. Ubiquiti, Okta, BEC)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs transition-colors font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <select
          id="cases-severity-select"
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-blue-600 shadow-xs"
        >
          <option value="all">All Severity Levels</option>
          <option value="Critical">Critical Impact</option>
          <option value="High">High Impact</option>
          <option value="Medium">Medium Impact</option>
        </select>
      </div>

      {/* Case Grid */}
      {filteredCases.length > 0 ? (
        <div id="cases-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((caseItem) => {
            const severityColor =
              caseItem.severity === 'Critical'
                ? 'text-red-800 bg-red-50 border-red-200 font-bold'
                : 'text-amber-800 bg-amber-50 border-amber-200 font-bold';

            return (
              <div
                key={caseItem.id}
                id={`case-card-${caseItem.id}`}
                className="flex flex-col justify-between border border-slate-200 bg-white hover:border-slate-300 p-6 shadow-sm transition-all duration-200"
              >
                <div>
                  {/* Metadata header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{caseItem.year}</span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 border ${severityColor}`}>
                      {caseItem.severity}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 leading-snug">
                    {caseItem.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-blue-700 font-mono font-semibold mb-3">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Target: {caseItem.targetOrg}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed font-sans">
                    {caseItem.summary}
                  </p>

                  <div className="p-3 bg-slate-50 border border-slate-200 mb-5 text-xs">
                    <span className="text-[11px] font-mono text-slate-500 block mb-1 font-semibold">Attack Vector</span>
                    <span className="font-medium text-slate-800 font-sans">{caseItem.vector}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCase(caseItem)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-xs"
                >
                  <span>Deconstruct Kill-Chain</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          id="empty-cases-search"
          icon="search"
          title="No Incident Cases Match Search"
          description="Try broadening your search query or reset the severity filter."
          actionText="Reset Case Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedSeverity('all');
          }}
          badgeText="INCIDENT ARCHIVE"
        />
      )}

      {/* Case Detail Modal */}
      {activeCase && (
        <div 
          id="case-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div 
            id="case-modal-content"
            className="relative w-full max-w-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-200 bg-slate-50">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2.5 py-0.5 bg-indigo-50 text-indigo-900 border border-indigo-200 font-semibold">
                    Year: {activeCase.year}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 bg-white text-slate-800 border border-slate-200 font-semibold">
                    Target: {activeCase.targetOrg}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900">{activeCase.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveCase(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700">
              {/* Financial / Data Impact Banner */}
              <div className="p-4 bg-red-50 border border-red-200 text-xs flex items-center gap-3">
                <AlertOctagon className="w-5 h-5 text-red-700 shrink-0" />
                <div>
                  <span className="font-mono uppercase text-red-800 font-bold block">Incident Impact</span>
                  <span className="text-slate-900 font-medium font-sans">{activeCase.impact}</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-600 font-bold mb-2">
                  Executive Briefing
                </h4>
                <p className="text-slate-700 leading-relaxed text-sm bg-slate-50 p-4 border border-slate-200 font-sans">
                  {activeCase.summary}
                </p>
              </div>

              {/* Attack Flow (Kill Chain) */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-600 font-bold mb-3">
                  Attack Kill-Chain Sequence
                </h4>
                <div className="space-y-2.5">
                  {activeCase.attackFlow.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 text-xs"
                    >
                      <span className="w-5 h-5 bg-blue-100 text-blue-900 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-800 leading-relaxed font-sans">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicators of Compromise & Red Flags */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-600 font-bold mb-2">
                  Key Indicators & Red Flags
                </h4>
                <div className="space-y-2">
                  {activeCase.indicators.map((ind, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 text-xs text-amber-950 font-mono"
                    >
                      <Crosshair className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defensive Lessons */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-600 font-bold mb-2">
                  Defensive Countermeasures & Hardening
                </h4>
                <div className="space-y-2">
                  {activeCase.defensiveLessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-sans"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-t border-slate-200 bg-slate-50">
              <span className="text-xs font-mono text-slate-600 font-medium">
                Vector: {activeCase.vector}
              </span>
              <button
                type="button"
                onClick={() => setActiveCase(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shadow-xs transition-colors"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

