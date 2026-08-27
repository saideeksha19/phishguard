import React from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  SearchCode, 
  HelpCircle, 
  BookOpenCheck, 
  Lightbulb, 
  ArrowUpRight,
  AlertTriangle,
  Lock
} from 'lucide-react';
import { TabSection } from '../types';

interface HomeSectionProps {
  onNavigate: (tab: TabSection) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const quickActions = [
    {
      tab: 'academy' as TabSection,
      title: 'Phishing Academy',
      subtitle: '5 Structured Modules',
      description: 'Master spear phishing detection, executive BEC lures, AitM proxies, and quishing vectors.',
      icon: GraduationCap,
      btnText: 'Explore Academy'
    },
    {
      tab: 'analyzer' as TabSection,
      title: 'Email Analyzer',
      subtitle: 'Inspection Console',
      description: 'Test email headers, envelope senders, SPF/DKIM flags, and suspicious links in a sandbox.',
      icon: SearchCode,
      btnText: 'Launch Analyzer'
    },
    {
      tab: 'quiz' as TabSection,
      title: 'Security Quiz',
      subtitle: 'Scenario Testing',
      description: 'Validate your defense reflexes against simulated workplace phishing emails and urgent wire requests.',
      icon: HelpCircle,
      btnText: 'Start Quiz'
    },
    {
      tab: 'cases' as TabSection,
      title: 'Real-World Cases',
      subtitle: 'Incident Post-Mortems',
      description: 'Analyze real-world breaches, attack timelines, vectors, and defensive lessons from major security events.',
      icon: BookOpenCheck,
      btnText: 'Read Cases'
    },
    {
      tab: 'tips' as TabSection,
      title: 'Security Tips',
      subtitle: 'Tactical Guidelines',
      description: 'Actionable rules of thumb, URL inspection techniques, and incident reporting protocols.',
      icon: Lightbulb,
      btnText: 'View Tips'
    }
  ];

  return (
    <div id="home-dashboard-container" className="space-y-8">
      {/* Hero / Readiness Banner - Editorial Layout */}
      <div 
        id="hero-security-banner"
        className="relative overflow-hidden bg-white border border-slate-200 p-6 sm:p-8 md:p-10 shadow-sm"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium bg-blue-50 text-blue-800 border border-blue-200 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              <span>DEFENSE TRAINING SYSTEM • ACTIVE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-slate-900 tracking-tight leading-tight">
              PhishGuard Training Center
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
              Equip yourself and your organization with sharp instinct to recognize social engineering, 
              reverse-engineered credential harvesting campaigns, and Business Email Compromise (BEC).
            </p>
          </div>

          {/* Posture Status Card */}
          <div className="flex flex-col gap-3 min-w-[260px] bg-slate-50 border border-slate-200 p-5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-500 font-semibold tracking-wider">Threat Awareness</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Operational
              </span>
            </div>
            <div className="h-px bg-slate-200 my-1" />
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Target Level:</span>
              <span className="font-semibold text-slate-900 font-mono">Enterprise Defense</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Curriculum Scope:</span>
              <span className="font-mono font-semibold text-blue-700">5 Training Modules</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div id="metrics-overview-row" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Academy Units</span>
            <GraduationCap className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">5 Modules</div>
          <div className="text-xs text-slate-500 mt-1 font-sans">22 total lessons & labs</div>
        </div>

        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Case Studies</span>
            <BookOpenCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">3 Breaches</div>
          <div className="text-xs text-slate-500 mt-1 font-sans">Root-cause & IOC analysis</div>
        </div>

        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Scenario Quizzes</span>
            <HelpCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">4 Challenges</div>
          <div className="text-xs text-slate-500 mt-1 font-sans">Simulated threat testing</div>
        </div>

        <div className="border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Security Rules</span>
            <Lightbulb className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-slate-900">11 Protocols</div>
          <div className="text-xs text-slate-500 mt-1 font-sans">Header, link & auth tactics</div>
        </div>
      </div>

      {/* Navigation Quick Cards */}
      <div id="quick-navigation-section">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-900 tracking-tight">Training Modules & Tools</h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">Select a section to begin training or test suspicious communications</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div
                key={action.tab}
                id={`card-quick-nav-${action.tab}`}
                className="group flex flex-col justify-between border border-slate-200 bg-white hover:border-slate-400 p-6 shadow-sm hover:shadow transition-all duration-200"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-slate-100 text-blue-700 border border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                        {action.title}
                      </h3>
                      <span className="text-xs font-mono text-slate-500">{action.subtitle}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5 font-sans">
                    {action.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(action.tab)}
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 bg-slate-50 hover:bg-blue-50 text-xs font-medium text-slate-800 hover:text-blue-800 border border-slate-200 hover:border-blue-300 transition-all font-mono"
                >
                  <span>{action.btnText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Advisory & Protocol Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spotlight Warning */}
        <div id="spotlight-vector-card" className="border border-amber-200 bg-amber-50/50 p-6 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-100 border border-amber-300 text-amber-800 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-amber-800 font-bold tracking-wider">Threat Spotlight</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-200 text-amber-900 border border-amber-300 font-semibold">High Priority</span>
              </div>
              <h4 className="text-base font-serif font-bold text-slate-900 mt-1.5">
                Adversary-in-the-Middle (AitM) Reverse Proxy Kits
              </h4>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                Attackers increasingly host real-time proxy servers (e.g., Evilginx) that relay requests directly to legitimate identity providers. 
                Traditional SMS codes and basic TOTP codes can be proxied in real time. Enforce FIDO2 WebAuthn hardware keys to establish origin binding.
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('academy')}
                  className="text-amber-900 hover:text-amber-950 underline underline-offset-4 font-semibold font-mono"
                >
                  Review AitM Academy Module →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Defense Golden Rule */}
        <div id="defense-rule-card" className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-700 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-blue-700 font-bold tracking-wider">Operational Rule</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-200 font-semibold">Zero-Trust Baseline</span>
              </div>
              <h4 className="text-base font-serif font-bold text-slate-900 mt-1.5">
                The Out-of-Band (OOB) Verification Protocol
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Any communication involving bank account changes, wire transfers, executive credential resets, or emergency authorization 
                MUST be confirmed via a second, independently verified channel (known internal phone number or secure in-person check).
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('tips')}
                  className="text-blue-700 hover:text-blue-900 underline underline-offset-4 font-semibold font-mono"
                >
                  View Security Tips & Protocols →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

