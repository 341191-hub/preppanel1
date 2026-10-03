import React, { useState, useEffect } from 'react';
import { Zap, Clock, ArrowRight, RotateCcw, CheckCircle, Sparkles } from 'lucide-react';
import { RAPID_FIRE_QUESTIONS } from '../data/casebookData';

export const RapidFireView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (isActive && !isCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleNext();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, isCompleted]);

  const startChallenge = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setCurrentAnswer('');
    setIsCompleted(false);
    setTimeLeft(RAPID_FIRE_QUESTIONS[0].timeLimitSec);
    setIsActive(true);
  };

  const handleNext = () => {
    setAnswers((prev) => [...prev, currentAnswer]);
    setCurrentAnswer('');

    if (currentIndex + 1 < RAPID_FIRE_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(RAPID_FIRE_QUESTIONS[currentIndex + 1].timeLimitSec);
    } else {
      setIsCompleted(true);
      setIsActive(false);
    }
  };

  const q = RAPID_FIRE_QUESTIONS[currentIndex];

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            <span>Consulting 10 · Rapid Fire Drill</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            10 high-frequency consulting questions under strict 20-25s time pressure.
          </p>
        </div>
      </div>

      {!isActive && !isCompleted ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 text-center space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 mx-auto">
            <Zap className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-white">10 Questions · Timed Pressure</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Train your mental speed and concise articulation. You will have 20-25 seconds per question to formulate and state a structured response.
          </p>
          <div className="pt-2">
            <button
              onClick={startChallenge}
              className="rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-2.5 text-xs font-bold text-slate-950 transition-colors shadow-sm"
            >
              Begin "Consulting 10" Drill
            </button>
          </div>
        </div>
      ) : isCompleted ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 space-y-6">
          <div className="text-center space-y-2">
            <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Rapid Fire Complete!</h3>
            <p className="text-xs text-slate-400">
              You answered 10 rapid-fire questions under strict consulting timing.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Review Your Answers
            </div>
            {RAPID_FIRE_QUESTIONS.map((item, idx) => (
              <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs">
                <div className="font-semibold text-amber-300">
                  {idx + 1}. {item.q}
                </div>
                <div className="text-slate-300 mt-1 italic">
                  "{answers[idx] || '(No response recorded before timer expired)'}"
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={startChallenge}
              className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-2.5 text-xs font-bold text-slate-950 transition-colors shadow-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Drill</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Question */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Question {currentIndex + 1} of 10
            </span>
            <div
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-mono font-bold ${
                timeLeft <= 5
                  ? 'border-rose-500/50 bg-rose-500/20 text-rose-300 animate-pulse'
                  : 'border-slate-700 bg-slate-800 text-amber-300'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>{timeLeft}s</span>
            </div>
          </div>

          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all"
              style={{ width: `${(timeLeft / q.timeLimitSec) * 100}%` }}
            />
          </div>

          <h3 className="text-lg font-bold text-white leading-relaxed">{q.q}</h3>

          <textarea
            rows={3}
            autoFocus
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleNext();
              }
            }}
            placeholder="Type your rapid 1-2 sentence response and press Enter..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
          />

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-bold text-slate-950 transition-colors"
            >
              <span>{currentIndex + 1 === 10 ? 'Finish' : 'Next Question'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
