import React from 'react';
import { 
  Home, 
  GraduationCap, 
  SearchCode, 
  HelpCircle, 
  BookOpenCheck, 
  Lightbulb, 
  X
} from 'lucide-react';
import { TabSection } from '../types';

interface SidebarProps {
  currentTab: TabSection;
  onSelectTab: (tab: TabSection) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile
}) => {
  const navItems = [
    { id: 'home' as TabSection, label: 'Home', icon: Home, badge: undefined },
    { id: 'academy' as TabSection, label: 'Phishing Academy', icon: GraduationCap, badge: '5 Modules' },
    { id: 'analyzer' as TabSection, label: 'Email Analyzer', icon: SearchCode, badge: 'Sandbox' },
    { id: 'quiz' as TabSection, label: 'Security Quiz', icon: HelpCircle, badge: '4 Quizzes' },
    { id: 'cases' as TabSection, label: 'Real-World Cases', icon: BookOpenCheck, badge: '3 Breaches' },
    { id: 'tips' as TabSection, label: 'Security Tips', icon: Lightbulb, badge: '11 Rules' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-400 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Logo */}
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="text-white font-black text-xl tracking-tighter flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-xs font-mono font-bold text-white shadow-sm">
                PG
              </div>
              <span className="font-extrabold tracking-tight">PHISHGUARD</span>
            </div>

            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-3 px-1 font-mono">
            Navigation
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between py-2.5 px-3 text-sm transition-colors text-left ${
                    isActive
                      ? 'text-white font-semibold bg-slate-800/80 border-l-2 border-blue-500 pl-3.5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-l-2 border-transparent pl-3.5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-sm ${
                      isActive
                        ? 'bg-blue-900/60 text-blue-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info card matching design */}
        <div className="p-6 md:p-8 border-t border-slate-800/80">
          <div className="text-[11px] uppercase tracking-widest text-slate-500 mb-2 font-mono">
            Security Status
          </div>
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></div>
            <span className="text-xs font-medium">Secure Sandbox Active</span>
          </div>
        </div>
      </aside>
    </>
  );
};

