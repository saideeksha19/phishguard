import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Lightbulb, 
  ArrowRight, 
  Award, 
  ShieldCheck
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/trainingData';

export const QuizSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: number }>({});
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const correctOptionMap: { [key: string]: number } = {
    q1: 1,
    q2: 2,
    q3: 1,
    q4: 2
  };

  const currentCorrectIdx = correctOptionMap[currentQuestion.id] ?? 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers({ ...userAnswers, [currentIdx]: selectedOption });
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setShowHint(false);
    setIsCompleted(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] === correctOptionMap[q.id]) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div id="quiz-section-container" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 bg-amber-50 text-amber-800 border border-amber-200">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono uppercase text-amber-800 font-bold tracking-wide">
              Defense Knowledge Check
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">Security Quiz</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
            Test your decision-making instincts against simulated workplace phishing attacks.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-800 bg-white px-3 py-1.5 border border-slate-200 shadow-xs font-semibold">
            Question {Math.min(currentIdx + 1, QUIZ_QUESTIONS.length)} of {QUIZ_QUESTIONS.length}
          </span>
          <button
            type="button"
            onClick={handleResetQuiz}
            className="p-2 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs transition-colors"
            title="Reset Quiz"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Card (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div 
              id={`quiz-question-card-${currentQuestion.id}`}
              className="border border-slate-200 bg-white p-6 sm:p-7 space-y-6 shadow-sm"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2.5 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                    {currentQuestion.category}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200">
                    Difficulty: {currentQuestion.difficulty}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-800 hover:text-amber-900 font-medium transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Hint' : 'View Hint'}</span>
                </button>
              </div>

              {showHint && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 text-xs text-amber-900 font-mono">
                  💡 Hint: {currentQuestion.hint}
                </div>
              )}

              {/* Scenario */}
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2.5">
                  {currentQuestion.title}
                </h3>
                <div className="p-4 bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed font-sans">
                  {currentQuestion.scenario}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                <label className="block text-xs font-mono uppercase text-slate-600 font-bold mb-2">
                  Select your response:
                </label>
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentCorrectIdx;

                  let optionStyle = 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:border-slate-300';

                  if (isSelected && !isAnswerSubmitted) {
                    optionStyle = 'border-blue-600 bg-blue-50/70 text-blue-950 ring-1 ring-blue-600 font-medium';
                  }

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-red-500 bg-red-50 text-red-950 font-medium';
                    } else {
                      optionStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 border transition-all text-xs sm:text-sm flex items-start gap-3.5 ${optionStyle}`}
                    >
                      <span className="w-5 h-5 border border-current flex items-center justify-center shrink-0 font-mono text-xs mt-0.5 font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>
                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submit */}
              {isAnswerSubmitted && (
                <div 
                  id="quiz-explanation-box"
                  className="p-4.5 bg-blue-50/60 border border-blue-200 space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-900">
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>Security Rationale & Defense Takeaway</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-xs sm:text-sm transition-all shadow-xs"
                  >
                    Submit Response
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition-all shadow-xs"
                  >
                    <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Next Scenario' : 'View Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Quiz Progress / Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
              <h4 className="text-xs font-mono uppercase text-slate-600 font-bold pb-2 border-b border-slate-200">
                Scenario Progression
              </h4>

              <div className="space-y-2">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCorrect = isAnswered && userAnswers[idx] === correctOptionMap[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`p-3 border text-xs flex items-center justify-between ${
                        isCurrent
                          ? 'border-blue-600 bg-blue-50/50 text-slate-900 font-medium'
                          : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] font-bold text-slate-500">
                          0{idx + 1}
                        </span>
                        <span className="font-medium truncate max-w-[170px]">
                          {q.title}
                        </span>
                      </div>

                      {isAnswered ? (
                        isCorrect ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                            Safe
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-red-100 text-red-800 border border-red-300 font-bold">
                            Vulnerable
                          </span>
                        )
                      ) : isCurrent ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-300 font-bold">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400">
                          Pending
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Completed Summary Card */
        <div 
          id="quiz-completed-card"
          className="border border-slate-200 bg-white p-8 sm:p-10 text-center max-w-2xl mx-auto space-y-6 shadow-sm"
        >
          <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto shadow-xs">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-flex items-center px-3 py-1 text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
              SCENARIOS COMPLETED
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-900">
              Training Evaluation Finished
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto font-sans">
              You scored <span className="font-mono font-bold text-blue-700">{calculateScore()}</span> out of <span className="font-mono font-bold text-slate-900">{QUIZ_QUESTIONS.length}</span> threats correctly handled.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto text-xs font-mono">
            <div className="p-4 bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block mb-1">Defense Rate</span>
              <span className="text-xl font-bold text-emerald-700">
                {Math.round((calculateScore() / QUIZ_QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block mb-1">Total Scenarios</span>
              <span className="text-xl font-bold text-slate-900">
                {QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResetQuiz}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm transition-all shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

