import React from 'react';
import { Menu, Lock } from 'lucide-react';
import { TabSection } from '../types';

interface HeaderProps {
  currentTab: TabSection;
  onOpenMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onOpenMobile }) => {
  const getTabTitle = (tab: TabSection) => {
    switch (tab) {
      case 'home':
        return 'Overview Dashboard';
      case 'academy':
        return 'Phishing Academy';
      case 'analyzer':
        return 'Email Header & Body Analyzer';
      case 'quiz':
        return 'Interactive Security Quiz';
      case 'cases':
        return 'Real-World Incident Cases';
      case 'tips':
        return 'Security Guidelines & Rules';
      default:
        return 'Security Training';
    }
  };

  return (
    <header
      id="app-header"
      className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-8 bg-white/90 backdrop-blur-md border-b border-slate-200"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold font-serif text-slate-900 tracking-tight">
            {getTabTitle(currentTab)}
          </h1>
          <span className="hidden sm:block text-[11px] font-mono text-slate-500">
            PhishGuard Defense System • Protocol 802.1X
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 text-xs font-mono bg-slate-100 border border-slate-200 text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>ZERO-TRUST READY</span>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 text-xs font-mono bg-blue-50 border border-blue-200 text-blue-800">
          <Lock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-semibold">TRAINING MODE</span>
        </div>
      </div>
    </header>
  );
};

