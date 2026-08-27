import React, { useState, useMemo } from 'react';
import { 
  Lightbulb, 
  Search, 
  MailCheck, 
  Globe, 
  ShieldAlert, 
  BellRing, 
  CheckSquare, 
  Square, 
  X
} from 'lucide-react';
import { SECURITY_TIPS } from '../data/trainingData';
import { EmptyState } from './EmptyState';

export const TipsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [checkedRules, setCheckedRules] = useState<{ [key: string]: boolean }>({});

  const iconMap: { [key: string]: React.ElementType } = {
    MailCheck,
    Globe,
    ShieldAlert,
    BellRing
  };

  const toggleRuleCheck = (ruleTitle: string) => {
    setCheckedRules((prev) => ({
      ...prev,
      [ruleTitle]: !prev[ruleTitle]
    }));
  };

  const allTipsWithCat = useMemo(() => {
    return SECURITY_TIPS.flatMap((cat) =>
      cat.tips.map((tip) => ({
        ...tip,
        categoryId: cat.id,
        categoryTitle: cat.title,
        iconName: cat.iconName
      }))
    );
  }, []);

  const filteredTips = useMemo(() => {
    return allTipsWithCat.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.actionableRule.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || t.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allTipsWithCat, searchQuery, selectedCategory]);

  return (
    <div id="tips-section-container" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-teal-50 text-teal-800 border border-teal-200">
              <Lightbulb className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase text-teal-800 font-bold tracking-wide">
              Defense Protocols & Rules of Thumb
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">Security Tips</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
            Actionable tactics, header checks, and psychological defenses to harden your day-to-day communications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-800 bg-white px-3 py-1.5 border border-slate-200 shadow-xs font-semibold">
            {filteredTips.length} Security Guidelines
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div id="tips-toolbar" className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="tips-search-input"
            type="text"
            placeholder="Search security rules, tactics (e.g. Reply-To, Punycode, Urgency)..."
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
          id="tips-category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-blue-600 shadow-xs"
        >
          <option value="all">All Focus Areas</option>
          {SECURITY_TIPS.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* Tips Grid */}
      {filteredTips.length > 0 ? (
        <div id="tips-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTips.map((tip, idx) => {
            const IconComponent = iconMap[tip.iconName] || Lightbulb;
            const isChecked = !!checkedRules[tip.title];

            const levelBadge =
              tip.level === 'Essential'
                ? 'text-emerald-800 bg-emerald-50 border-emerald-200 font-bold'
                : tip.level === 'Pro'
                ? 'text-blue-800 bg-blue-50 border-blue-200 font-bold'
                : 'text-indigo-800 bg-indigo-50 border-indigo-200 font-bold';

            return (
              <div
                key={idx}
                id={`tip-card-${idx}`}
                className={`flex flex-col justify-between border p-6 transition-all duration-200 ${
                  isChecked
                    ? 'border-blue-600 bg-blue-50/40 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-slate-100 text-slate-800 border border-slate-200">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono text-slate-600 font-semibold">
                        {tip.categoryTitle}
                      </span>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 border ${levelBadge}`}>
                      {tip.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 leading-snug">
                    {tip.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 font-sans">
                    {tip.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 text-xs">
                    <span className="text-[11px] font-mono uppercase text-blue-900 font-bold block mb-1">
                      Actionable Rule
                    </span>
                    <span className="text-slate-800 font-sans leading-relaxed">
                      {tip.actionableRule}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleRuleCheck(tip.title)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium border transition-colors ${
                      isChecked
                        ? 'bg-blue-100 text-blue-950 border-blue-300'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="text-[11px] font-mono font-semibold">
                      {isChecked ? 'Protocol Practiced & Verified' : 'Mark as Practiced Protocol'}
                    </span>
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-blue-800" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          id="empty-tips-search"
          icon="search"
          title="No Security Rules Found"
          description="Try searching with different terms like 'domain', 'urgent', or 'headers'."
          actionText="Reset Tips Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
          badgeText="SECURITY PROTOCOLS"
        />
      )}
    </div>
  );
};

