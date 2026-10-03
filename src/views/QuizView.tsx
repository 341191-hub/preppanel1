import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Check,
} from 'lucide-react';
import { QUIZ_BANK } from '../data/casebookData';
import { QuizQuestion, UserProfile } from '../types';
import { logMistake } from '../utils/storage';

interface QuizViewProps {
  userProfile: UserProfile;
}

type QuizMode = 'quick' | 'standard' | 'deep' | 'weak_areas' | 'random' | 'warmup';

export const QuizView: React.FC<QuizViewProps> = ({ userProfile }) => {
  const [selectedMode, setSelectedMode] = useState<QuizMode>('quick');
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = (mode: QuizMode) => {
    setSelectedMode(mode);
    let count = 5;
    if (mode === 'standard') count = 10;
    if (mode === 'deep') count = 25;
    if (mode === 'warmup') count = 5;

    // Shuffle and pick questions
    const shuffled = [...QUIZ_BANK].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, Math.min(count, QUIZ_BANK.length));

    setActiveQuiz(picked);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const currentQ = activeQuiz[currentIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      // Auto log mistake
      logMistake({
        exerciseTitle: `Quiz: ${currentQ.category}`,
        exerciseType: 'Quiz',
        category: currentQ.category === 'Economics' || currentQ.category === 'Finance & Accounting' ? 'Conceptual' : 'Framework',
        whatIDid: `Selected: "${currentQ.options[selectedOption]}"`,
        whatWasExpected: `Expected: "${currentQ.options[currentQ.correctAnswer as number]}"`,
        whyItMattered: currentQ.explanation,
        howToAvoid: currentQ.interviewTip,
        practiceRecommendation: 'Review concept in Learn room',
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuiz.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const currentQ = activeQuiz[currentIndex];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-amber-400" />
            <span>Consulting Quiz Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Scenario-driven conceptual and business tests based on the FMS Consulting Casebook.
          </p>
        </div>

        {/* Mode selector */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'quick', label: 'Quick (5)' },
            { id: 'standard', label: 'Standard (10)' },
            { id: 'warmup', label: 'Warm-up' },
            { id: 'weak_areas', label: 'Weak Areas' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => startQuiz(m.id as QuizMode)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedMode === m.id && activeQuiz.length > 0
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {activeQuiz.length === 0 ? (
        /* Quiz Selection Hero */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center space-y-4">
          <HelpCircle className="h-10 w-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Select a Consulting Quiz Mode</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Test your understanding of marketing distribution, finance metrics, microeconomics, and guesstimate structuring with real interview scenarios.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => startQuiz('quick')}
              className="rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition-colors shadow-sm"
            >
              Start Quick Quiz (5 Questions)
            </button>
            <button
              onClick={() => startQuiz('standard')}
              className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              Standard 10 Questions
            </button>
          </div>
        </div>
      ) : quizFinished ? (
        /* Quiz Finished Scorecard */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Quiz Completed
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 mx-auto text-3xl font-extrabold font-mono text-amber-300">
            {score}/{activeQuiz.length}
          </div>
          <h3 className="text-lg font-bold text-white">
            {score / activeQuiz.length >= 0.8
              ? 'Excellent Consulting Acumen!'
              : 'Good Effort — Mistakes Logged for Revision'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Accuracy: <strong className="text-slate-200">{Math.round((score / activeQuiz.length) * 100)}%</strong>. Any incorrect answers have been added directly to your Mistake Log.
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={() => startQuiz(selectedMode)}
              className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 transition-colors shadow-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={() => setActiveQuiz([])}
              className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Back to Overview
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Card */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
          {/* Progress & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-amber-400">{currentQ.category}</span>
            <span className="font-mono">
              Question {currentIndex + 1} of {activeQuiz.length}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / activeQuiz.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h3 className="text-base font-bold text-slate-100 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optionStyle = 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700';

              if (isAnswerSubmitted) {
                if (idx === currentQ.correctAnswer) {
                  optionStyle = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-200 font-semibold';
                } else if (isSelected) {
                  optionStyle = 'border-rose-500/60 bg-rose-500/10 text-rose-200 font-semibold';
                } else {
                  optionStyle = 'border-slate-800/40 bg-slate-950/20 text-slate-500';
                }
              } else if (isSelected) {
                optionStyle = 'border-amber-500/50 bg-amber-500/10 text-white font-semibold';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs transition-colors ${optionStyle}`}
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-700 text-[10px] font-mono font-bold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="leading-relaxed">{opt}</span>
                </div>
              );
            })}
          </div>

          {/* Post-Submit Explanation */}
          {isAnswerSubmitted && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold">
                {selectedOption === currentQ.correctAnswer ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4" /> Correct Answer
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" /> Incorrect
                  </span>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap justify-between gap-2 text-[11px] text-slate-400">
                <span>
                  <strong className="text-amber-400">Interview Tip: </strong>
                  {currentQ.interviewTip}
                </span>
                <span className="text-slate-500">{currentQ.casebookReference}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-2.5 text-xs font-bold text-slate-950 transition-colors disabled:opacity-40"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-2.5 text-xs font-bold text-slate-950 transition-colors"
              >
                <span>{currentIndex + 1 === activeQuiz.length ? 'View Results' : 'Next Question'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
