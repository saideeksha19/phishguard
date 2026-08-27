import React, { useState, useMemo, useEffect } from 'react';
import { 
  GraduationCap, 
  Search, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  X, 
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Mail,
  Key,
  Globe,
  Users,
  Check,
  FileText,
  HelpCircle,
  ExternalLink,
  Layers,
  Award
} from 'lucide-react';
import { ACADEMY_MODULES } from '../data/trainingData';
import { AcademyModule, AcademyLesson } from '../types';
import { EmptyState } from './EmptyState';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  GraduationCap,
  Mail,
  Key,
  Globe,
  Users,
  ShieldCheck
};

export const AcademySection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  
  // Learning Mode State
  const [activeModule, setActiveModule] = useState<AcademyModule | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  
  // Persistence for completed lessons and quiz responses
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('phishguard_academy_completed_lessons');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, number | null>>(() => {
    try {
      const saved = localStorage.getItem('phishguard_academy_checkpoint_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [showModuleSummary, setShowModuleSummary] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('phishguard_academy_completed_lessons', JSON.stringify(completedLessons));
    } catch {
      // ignore
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem('phishguard_academy_checkpoint_answers', JSON.stringify(checkpointAnswers));
    } catch {
      // ignore
    }
  }, [checkpointAnswers]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    ACADEMY_MODULES.forEach(m => set.add(m.category));
    return ['all', ...Array.from(set)];
  }, []);

  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredModules = useMemo(() => {
    return ACADEMY_MODULES.filter((mod) => {
      const matchesSearch = 
        mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.keyConcepts.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (mod.tagline && mod.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || mod.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || mod.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  // Total lessons count and completion stats
  const totalLessonsCount = useMemo(() => {
    return ACADEMY_MODULES.reduce((acc, m) => acc + (m.lessons?.length || m.lessonsCount || 0), 0);
  }, []);

  const completedLessonsCount = useMemo(() => {
    return Object.values(completedLessons).filter(Boolean).length;
  }, [completedLessons]);

  const overallProgressPercent = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;

  const currentLesson: AcademyLesson | undefined = useMemo(() => {
    if (!activeModule || !activeModule.lessons || activeModule.lessons.length === 0) return undefined;
    return activeModule.lessons[activeLessonIndex] || activeModule.lessons[0];
  }, [activeModule, activeLessonIndex]);

  const isCurrentLessonCompleted = currentLesson ? !!completedLessons[currentLesson.id] : false;

  const toggleLessonCompletion = (lessonId: string) => {
    setCompletedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }));
  };

  const handleCheckpointSelect = (lessonId: string, optionIndex: number) => {
    setCheckpointAnswers(prev => ({
      ...prev,
      [lessonId]: optionIndex
    }));
  };

  const startModule = (module: AcademyModule, lessonIdx: number = 0) => {
    setActiveModule(module);
    setActiveLessonIndex(lessonIdx);
    setShowModuleSummary(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeLearningMode = () => {
    setActiveModule(null);
    setShowModuleSummary(false);
  };

  const handleNextLesson = () => {
    if (!activeModule || !activeModule.lessons) return;
    if (activeLessonIndex < activeModule.lessons.length - 1) {
      setActiveLessonIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowModuleSummary(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(prev => prev - 1);
      setShowModuleSummary(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset all Phishing Academy progress?')) {
      setCompletedLessons({});
      setCheckpointAnswers({});
    }
  };

  // Find next unfinished module/lesson for "Resume" button
  const handleResumeNextLesson = () => {
    for (const mod of ACADEMY_MODULES) {
      if (mod.lessons) {
        for (let i = 0; i < mod.lessons.length; i++) {
          if (!completedLessons[mod.lessons[i].id]) {
            startModule(mod, i);
            return;
          }
        }
      }
    }
    // All complete, start module 1
    if (ACADEMY_MODULES.length > 0) {
      startModule(ACADEMY_MODULES[0], 0);
    }
  };

  return (
    <div id="academy-section-container" className="space-y-6">
      {/* If learning mode is active */}
      {activeModule && currentLesson ? (
        <div id="academy-classroom-view" className="space-y-6">
          {/* Classroom Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={closeLearningMode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Catalog</span>
              </button>
              <div>
                <span className="text-[11px] font-mono uppercase text-blue-700 font-bold tracking-wider">
                  {activeModule.category} • Module {ACADEMY_MODULES.findIndex(m => m.id === activeModule.id) + 1} of {ACADEMY_MODULES.length}
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 leading-tight">
                  {activeModule.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-mono text-slate-500 block">
                  Lesson {activeLessonIndex + 1} of {activeModule.lessons?.length || 0}
                </span>
                <div className="w-28 h-2 bg-slate-100 border border-slate-200 mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-blue-700 transition-all duration-300"
                    style={{ 
                      width: `${Math.round(((activeLessonIndex + (isCurrentLessonCompleted ? 1 : 0)) / (activeModule.lessons?.length || 1)) * 100)}%` 
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleLessonCompletion(currentLesson.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border transition-colors ${
                  isCurrentLessonCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCurrentLessonCompleted ? 'Completed' : 'Mark Complete'}</span>
              </button>
            </div>
          </div>

          {/* Module Summary Celebration Screen */}
          {showModuleSummary ? (
            <div id="module-summary-view" className="bg-white border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <Award className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono uppercase text-emerald-800 font-bold tracking-widest block">
                  Module Completed
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {activeModule.title}
                </h2>
                <p className="text-sm text-slate-600 font-sans leading-relaxed">
                  {activeModule.overview || activeModule.description}
                </p>
              </div>

              {/* Summary Takeaways Recap */}
              <div className="max-w-2xl mx-auto p-6 bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-xs font-mono uppercase text-slate-700 font-bold tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-700" />
                  Key Security Principles Mastered
                </h3>
                <ul className="space-y-2.5">
                  {(activeModule.summaryTakeaways || activeModule.keyConcepts).map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 font-sans">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    const currentIdx = ACADEMY_MODULES.findIndex(m => m.id === activeModule.id);
                    if (currentIdx < ACADEMY_MODULES.length - 1) {
                      startModule(ACADEMY_MODULES[currentIdx + 1], 0);
                    } else {
                      closeLearningMode();
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium font-sans shadow-xs transition-colors"
                >
                  <span>Advance to Next Module</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={closeLearningMode}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium font-mono border border-slate-200 transition-colors"
                >
                  <span>Return to Academy Catalog</span>
                </button>
              </div>
            </div>
          ) : (
            /* Standard Lesson Reader Layout */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Sidebar / Table of Contents */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-5 shadow-sm space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block mb-1">
                    Syllabus Overview
                  </span>
                  <h3 className="text-sm font-serif font-bold text-slate-900">
                    {activeModule.lessons?.length} Structured Lessons
                  </h3>
                </div>

                <div className="space-y-2">
                  {activeModule.lessons?.map((les, idx) => {
                    const isSelected = idx === activeLessonIndex;
                    const isCompleted = !!completedLessons[les.id];

                    return (
                      <button
                        key={les.id}
                        type="button"
                        onClick={() => {
                          setActiveLessonIndex(idx);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left p-3 border transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-blue-50 border-blue-300 shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className={`w-5 h-5 flex items-center justify-center font-mono text-[10px] font-bold border shrink-0 mt-0.5 ${
                            isCompleted
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : isSelected
                              ? 'bg-blue-700 text-white border-blue-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {isCompleted ? '✓' : `0${idx + 1}`}
                          </span>
                          <div>
                            <span className={`text-xs block leading-snug ${
                              isSelected ? 'font-serif font-bold text-blue-900' : 'font-sans font-medium text-slate-800'
                            }`}>
                              {les.title}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                              {les.duration}
                            </span>
                          </div>
                        </div>

                        {isCompleted && (
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200 shrink-0">
                            Done
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Module Core Competencies */}
                <div className="pt-4 border-t border-slate-200">
                  <span className="text-[11px] font-mono uppercase text-slate-500 font-bold block mb-2">
                    Key Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModule.keyConcepts.map((concept, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 bg-slate-50 text-slate-700 border border-slate-200"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right / Main Lesson Content */}
              <div className="lg:col-span-8 space-y-6">
                <article className="bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                  {/* Lesson Header */}
                  <div className="border-b border-slate-200 pb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                        Lesson {activeLessonIndex + 1}
                      </span>
                      <span className="text-xs font-mono text-slate-500 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-700" />
                        {currentLesson.duration}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight mb-3">
                      {currentLesson.title}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed bg-slate-50 p-4 border border-slate-200">
                      <strong>Executive Summary:</strong> {currentLesson.summary}
                    </p>
                  </div>

                  {/* Lesson Sections */}
                  {currentLesson.sections.map((section, sIdx) => (
                    <section key={sIdx} className="space-y-4 pt-2">
                      <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 border border-blue-200">
                          § {sIdx + 1}
                        </span>
                        {section.title}
                      </h2>

                      <div className="text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line space-y-3">
                        {section.content}
                      </div>

                      {/* Interactive Visual Example Box */}
                      {section.exampleBox && (
                        <div className="my-5 border border-slate-200 bg-slate-50 overflow-hidden shadow-xs">
                          <div className="p-3.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                            <span className="text-xs font-mono uppercase text-slate-800 font-bold flex items-center gap-2">
                              <Layers className="w-3.5 h-3.5 text-blue-700" />
                              {section.exampleBox.title}
                            </span>
                            {section.exampleBox.subtitle && (
                              <span className="text-[11px] font-mono text-slate-500">
                                {section.exampleBox.subtitle}
                              </span>
                            )}
                          </div>

                          <div className="p-4 sm:p-5 space-y-3">
                            {/* Email Breakdown Item List */}
                            {section.exampleBox.items && (
                              <div className="space-y-2">
                                {section.exampleBox.items.map((item, itmIdx) => (
                                  <div
                                    key={itmIdx}
                                    className={`p-3 border text-xs ${
                                      item.isSuspicious
                                        ? 'bg-red-50/70 border-red-200 text-red-950'
                                        : 'bg-white border-slate-200 text-slate-800'
                                    }`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                      <span className="font-mono font-bold uppercase text-[10px] tracking-wide text-slate-600">
                                        {item.label}
                                      </span>
                                      {item.isSuspicious && (
                                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-red-800 bg-red-100 px-1.5 py-0.5 border border-red-300 w-fit">
                                          <AlertTriangle className="w-3 h-3 text-red-700" />
                                          RED FLAG INDICATOR
                                        </span>
                                      )}
                                    </div>
                                    <div className="font-mono text-xs font-semibold break-all text-slate-900">
                                      {item.value}
                                    </div>
                                    {item.annotation && (
                                      <p className="text-[11px] text-slate-600 font-sans mt-1.5 leading-snug border-t border-slate-200/60 pt-1.5">
                                        💡 {item.annotation}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Comparison Side-by-Side (Legitimate vs Malicious) */}
                            {section.exampleBox.legitimateVsMalicious && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3.5 bg-emerald-50/50 border border-emerald-200 text-xs">
                                  <span className="font-mono font-bold text-[10px] uppercase text-emerald-800 block mb-1.5 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                    {section.exampleBox.legitimateVsMalicious.legitimate.label}
                                  </span>
                                  <p className="text-slate-700 font-sans mb-2">
                                    {section.exampleBox.legitimateVsMalicious.legitimate.details}
                                  </p>
                                  {section.exampleBox.legitimateVsMalicious.legitimate.code && (
                                    <pre className="p-2.5 bg-white border border-emerald-200 font-mono text-[11px] text-emerald-950 overflow-x-auto whitespace-pre-wrap">
                                      {section.exampleBox.legitimateVsMalicious.legitimate.code}
                                    </pre>
                                  )}
                                </div>

                                <div className="p-3.5 bg-red-50/50 border border-red-200 text-xs">
                                  <span className="font-mono font-bold text-[10px] uppercase text-red-800 block mb-1.5 flex items-center gap-1">
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
                                    {section.exampleBox.legitimateVsMalicious.malicious.label}
                                  </span>
                                  <p className="text-slate-700 font-sans mb-2">
                                    {section.exampleBox.legitimateVsMalicious.malicious.details}
                                  </p>
                                  {section.exampleBox.legitimateVsMalicious.malicious.code && (
                                    <pre className="p-2.5 bg-white border border-red-200 font-mono text-[11px] text-red-950 overflow-x-auto whitespace-pre-wrap">
                                      {section.exampleBox.legitimateVsMalicious.malicious.code}
                                    </pre>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Step Sequence Breakdown */}
                            {section.exampleBox.steps && (
                              <div className="space-y-2.5">
                                {section.exampleBox.steps.map((st) => (
                                  <div
                                    key={st.step}
                                    className="flex items-start gap-3 p-3 bg-white border border-slate-200 text-xs"
                                  >
                                    <span className="w-6 h-6 bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                                      0{st.step}
                                    </span>
                                    <div>
                                      <span className="font-bold text-slate-900 block font-serif text-sm">
                                        {st.title}
                                      </span>
                                      <p className="text-slate-600 font-sans leading-relaxed mt-0.5">
                                        {st.desc}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Key Takeaways Callout */}
                      {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                        <div className="p-3.5 bg-blue-50/50 border border-blue-200 text-xs space-y-1.5">
                          <span className="font-mono font-bold text-[10px] uppercase text-blue-900 block">
                            Key Security Takeaway
                          </span>
                          <ul className="space-y-1">
                            {section.keyTakeaways.map((k, kIdx) => (
                              <li key={kIdx} className="flex items-start gap-2 text-slate-800 font-sans">
                                <span className="text-blue-700 font-bold">•</span>
                                <span>{k}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </section>
                  ))}

                  {/* Interactive Checkpoint Question */}
                  {currentLesson.checkpointQuestion && (
                    <div id="lesson-checkpoint-card" className="mt-8 pt-6 border-t-2 border-slate-200 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="p-1 bg-amber-50 text-amber-800 border border-amber-200">
                          <HelpCircle className="w-4 h-4" />
                        </span>
                        <span className="text-xs font-mono uppercase text-amber-900 font-bold tracking-wider">
                          Knowledge Checkpoint
                        </span>
                      </div>

                      <h3 className="text-base font-serif font-bold text-slate-900">
                        {currentLesson.checkpointQuestion.question}
                      </h3>

                      <div className="space-y-2">
                        {currentLesson.checkpointQuestion.options.map((opt, optIdx) => {
                          const selectedAnswer = checkpointAnswers[currentLesson.id];
                          const hasAnswered = selectedAnswer !== undefined && selectedAnswer !== null;
                          const isSelected = selectedAnswer === optIdx;
                          const isCorrect = optIdx === currentLesson.checkpointQuestion?.correctIndex;

                          let optionStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
                          if (hasAnswered) {
                            if (isSelected) {
                              optionStyle = isCorrect 
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold' 
                                : 'bg-red-50 border-red-400 text-red-950 font-semibold';
                            } else if (isCorrect) {
                              optionStyle = 'bg-emerald-50/50 border-emerald-300 text-emerald-900';
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => {
                                handleCheckpointSelect(currentLesson.id, optIdx);
                                if (optIdx === currentLesson.checkpointQuestion?.correctIndex) {
                                  setCompletedLessons(prev => ({ ...prev, [currentLesson.id]: true }));
                                }
                              }}
                              className={`w-full text-left p-3.5 border transition-all text-xs flex items-start gap-3 ${optionStyle}`}
                            >
                              <span className={`w-5 h-5 flex items-center justify-center font-mono font-bold text-[10px] border shrink-0 mt-0.5 ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-emerald-700 text-white border-emerald-700'
                                    : 'bg-red-700 text-white border-red-700'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="leading-snug font-sans flex-1">
                                {opt}
                              </span>
                              {hasAnswered && isSelected && (
                                <span className={`text-[10px] font-mono px-2 py-0.5 border font-bold shrink-0 ${
                                  isCorrect 
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                                    : 'bg-red-100 text-red-800 border-red-300'
                                }`}>
                                  {isCorrect ? 'CORRECT' : 'INCORRECT'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation Feedback */}
                      {checkpointAnswers[currentLesson.id] !== undefined && checkpointAnswers[currentLesson.id] !== null && (
                        <div className="p-4 bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <span className="font-mono font-bold text-slate-800 uppercase text-[10px] block">
                            Checkpoint Analysis & Rationale
                          </span>
                          <p className="text-slate-700 font-sans leading-relaxed">
                            {currentLesson.checkpointQuestion.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Lesson Navigation Footer */}
                  <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevLesson}
                      disabled={activeLessonIndex === 0}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-medium border transition-colors ${
                        activeLessonIndex === 0
                          ? 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Lesson</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextLesson}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium font-sans shadow-xs transition-colors"
                    >
                      <span>
                        {activeLessonIndex < (activeModule.lessons?.length || 1) - 1
                          ? 'Next Lesson'
                          : 'Complete Module'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Catalog & Curriculum Overview Mode */
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 bg-blue-50 text-blue-700 border border-blue-200">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase text-blue-700 font-bold tracking-wide">
                  Structured Curriculum
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Phishing Academy
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
                Interactive defense masterclasses covering attack anatomy, fake login pages, fraudulent websites, and behavioral defense protocols.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-800 bg-white px-3 py-1.5 border border-slate-200 shadow-xs font-semibold">
                {ACADEMY_MODULES.length} Learning Modules • {totalLessonsCount} Lessons
              </span>
            </div>
          </div>

          {/* Academy Progress Banner */}
          <div className="p-5 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-slate-500 font-bold">
                Your Academy Progress
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-serif font-bold text-slate-900">
                  {completedLessonsCount} of {totalLessonsCount}
                </span>
                <span className="text-xs font-mono text-slate-600">
                  Lessons Completed ({overallProgressPercent}%)
                </span>
              </div>
              <div className="w-full sm:w-64 h-2 bg-slate-100 border border-slate-200 overflow-hidden mt-1">
                <div 
                  className="h-full bg-blue-700 transition-all duration-300"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResumeNextLesson}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium font-sans shadow-xs transition-colors"
              >
                <span>{completedLessonsCount > 0 ? 'Resume Learning' : 'Start Module 1'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {completedLessonsCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllProgress}
                  title="Reset Academy progress"
                  className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div id="academy-filter-toolbar" className="flex flex-col lg:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="academy-search-input"
                type="text"
                placeholder="Search concepts, vectors (e.g. AitM, Punycode, Spoofing, Evilginx, OOB)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs font-sans"
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

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <select
                id="academy-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-blue-600 shadow-xs"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Learning Focuses' : cat}
                  </option>
                ))}
              </select>

              {/* Level */}
              <select
                id="academy-level-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3.5 py-2.5 bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-800 focus:outline-none focus:border-blue-600 shadow-xs"
              >
                {levels.map(lvl => (
                  <option key={lvl} value={lvl}>
                    {lvl === 'all' ? 'All Levels' : lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Modules Grid */}
          {filteredModules.length > 0 ? (
            <div id="academy-modules-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module, mIdx) => {
                const IconComp = (module.iconName && iconMap[module.iconName]) || GraduationCap;
                
                const levelColor = 
                  module.level === 'Beginner' 
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200 font-bold'
                    : module.level === 'Intermediate'
                    ? 'text-blue-800 bg-blue-50 border-blue-200 font-bold'
                    : 'text-purple-800 bg-purple-50 border-purple-200 font-bold';

                // Check how many lessons in this module are complete
                const moduleLessonIds = module.lessons?.map(l => l.id) || [];
                const completedInThisModule = moduleLessonIds.filter(id => completedLessons[id]).length;
                const isModuleFullyComplete = moduleLessonIds.length > 0 && completedInThisModule === moduleLessonIds.length;

                return (
                  <div
                    key={module.id}
                    id={`module-card-${module.id}`}
                    className={`flex flex-col justify-between border bg-white p-6 shadow-sm hover:border-slate-300 transition-all duration-200 ${
                      isModuleFullyComplete ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Card Header badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="p-1 bg-slate-100 text-slate-800 border border-slate-200">
                            <IconComp className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                            {module.category}
                          </span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 border ${levelColor}`}>
                          {module.level}
                        </span>
                      </div>

                      <h3 className="text-lg font-serif font-bold text-slate-900 leading-snug mb-2">
                        {module.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed font-sans">
                        {module.description}
                      </p>

                      {/* Key concepts pills */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {module.keyConcepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 bg-slate-50 text-slate-600 border border-slate-200"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      {/* Completion progress bar for this module */}
                      {moduleLessonIds.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                            <span>Progress</span>
                            <span className="font-semibold text-slate-800">
                              {completedInThisModule} / {moduleLessonIds.length} Lessons
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 border border-slate-200 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${
                                isModuleFullyComplete ? 'bg-emerald-600' : 'bg-blue-700'
                              }`}
                              style={{ width: `${Math.round((completedInThisModule / moduleLessonIds.length) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-200 mb-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-700" />
                          {module.duration}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-indigo-700" />
                          {module.lessons?.length || module.lessonsCount} Lessons
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => startModule(module, 0)}
                        className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium font-sans transition-colors shadow-xs ${
                          isModuleFullyComplete
                            ? 'bg-emerald-800 hover:bg-emerald-900 text-white'
                            : completedInThisModule > 0
                            ? 'bg-blue-700 hover:bg-blue-800 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <span>
                          {isModuleFullyComplete
                            ? 'Review Mastered Module'
                            : completedInThisModule > 0
                            ? 'Continue Module'
                            : 'Start Module'}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              id="empty-academy-search"
              icon="search"
              title="No Matching Training Modules Found"
              description="No curriculum modules match the specified search query or category filters. Try clearing your filters."
              actionText="Reset All Filters"
              onAction={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
              badgeText="ACADEMY CATALOG"
            />
          )}
        </div>
      )}
    </div>
  );
};
