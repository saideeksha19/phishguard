import React, { useState } from 'react';
import { TabSection } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { AcademySection } from './components/AcademySection';
import { EmailAnalyzerSection } from './components/EmailAnalyzerSection';
import { QuizSection } from './components/QuizSection';
import { CasesSection } from './components/CasesSection';
import { TipsSection } from './components/TipsSection';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabSection>('home');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div id="phishguard-app-root" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        isOpenMobile={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Sticky Top Header */}
        <Header
          currentTab={currentTab}
          onOpenMobile={() => setIsMobileNavOpen(true)}
        />

        {/* Dynamic Section View */}
        <main id="main-content-area" className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'home' && (
            <HomeSection onNavigate={(tab) => setCurrentTab(tab)} />
          )}

          {currentTab === 'academy' && (
            <AcademySection />
          )}

          {currentTab === 'analyzer' && (
            <EmailAnalyzerSection />
          )}

          {currentTab === 'quiz' && (
            <QuizSection />
          )}

          {currentTab === 'cases' && (
            <CasesSection />
          )}

          {currentTab === 'tips' && (
            <TipsSection />
          )}
        </main>

        {/* Global Footer */}
        <footer id="app-footer" className="border-t border-slate-200 px-6 py-4 text-center text-xs font-mono text-slate-500 bg-white">
          PhishGuard Security Suite • Cybersecurity Awareness & Defense Training
        </footer>
      </div>
    </div>
  );
}
