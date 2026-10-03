import React from 'react';
import {
  Calculator,
  Briefcase,
  Users,
  BookOpen,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Award,
  Zap,
  CheckCircle2,
  Clock,
  Flame,
} from 'lucide-react';
import { UserProfile, MistakeLogEntry } from '../types';
import { ALL_GUESSTIMATES, CASE_BANK } from '../data/casebookData';

interface DashboardViewProps {
  userProfile: UserProfile;
  onNavigate: (view: string, itemId?: string) => void;
  mistakes: MistakeLogEntry[];
  streak: number;
  completedGuesstimates: { id: string; title: string; score: number; date: string }[];
  completedCases: { id: string; title: string; score: number; date: string }[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  onNavigate,
  mistakes,
  streak,
  completedGuesstimates,
  completedCases,
}) => {
  // Calculate dynamic metrics
  const totalCompleted = completedGuesstimates.length + completedCases.length;
  const avgGuesstimateScore =
    completedGuesstimates.length > 0
      ? completedGuesstimates.reduce((acc, curr) => acc + curr.score, 0) /
        completedGuesstimates.length
      : 7.2;

  const avgCaseScore =
    completedCases.length > 0
      ? completedCases.reduce((acc, curr) => acc + curr.score, 0) / completedCases.length
      : 6.8;

  const overallReadiness = Number(((avgGuesstimateScore + avgCaseScore + 7.5) / 3).toFixed(1));

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Startup Experience Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-[#0f172a] via-[#090e1a] to-[#040711] p-6 sm:p-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <span>Built around the FMS Consulting Casebook 2025-26</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-serif-brand">
            CONSULTING INTERVIEW LAB
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Practice cases. Think like a consultant. Interview like a consultant.
            Experience an AI interviewer that dynamically probes your logic, tests assumptions,
            and guides without spoon-feeding answers.
          </p>

          {/* Quick Action Launch Buttons */}
          <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
            <button
              onClick={() => onNavigate('cases')}
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Briefcase className="h-4 w-4" />
              <span>Start Practice</span>
            </button>
            <button
              onClick={() => onNavigate('guesstimates')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Calculator className="h-4 w-4 text-amber-400" />
              <span>Practice a Guesstimate</span>
            </button>
            <button
              onClick={() => onNavigate('mock')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Users className="h-4 w-4 text-amber-400" />
              <span>Start a Mock</span>
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <HelpCircle className="h-4 w-4 text-slate-400" />
              <span>Take a Quiz</span>
            </button>
            <button
              onClick={() => onNavigate('learn')}
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <BookOpen className="h-4 w-4 text-slate-400" />
              <span>Learn Frameworks</span>
            </button>
          </div>
        </div>

        {/* Subtle decorative background pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/5 to-transparent pointer-events-none" />
      </div>

      {/* Today's Recommendation Banner */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <TrendingUp className="h-4 w-4" />
            <span>Today's Recommendation</span>
          </div>
          <div className="text-sm font-medium text-slate-200 mt-1">
            Focus: {userProfile.struggles.join(' + ') || 'Case Structuring & Guesstimates'}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Your target is {userProfile.dailyPrepMinutes} mins today. Recommended drill: 1 supply-side guesstimate + 1 FMCG profitability case.
          </p>
        </div>
        <button
          onClick={() => onNavigate('guesstimates', 'g-petrol-pumps')}
          className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 px-3.5 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-colors shrink-0"
        >
          <span>Start Drill</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Readiness & Performance Scorecard Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Overall Readiness</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {overallReadiness}
            </span>
            <span className="text-xs text-slate-500">/ 10</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Simulated App Benchmark</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Case-Solving Score</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-amber-400">
              {avgCaseScore.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500">/ 10</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Structure & Diagnostics</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Guesstimate Score</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-amber-400">
              {avgGuesstimateScore.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500">/ 10</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Order-of-magnitude & Math</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Interviewer Engagement</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-emerald-400">
              8.2
            </span>
            <span className="text-xs text-slate-500">/ 10</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Buy-in & Listening Cues</div>
        </div>
      </div>

      {/* Secondary Performance Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-slate-800/80 bg-slate-900/20 p-4">
        <div>
          <div className="text-[11px] text-slate-400">Quantitative Accuracy</div>
          <div className="text-base font-bold font-mono text-slate-200 mt-0.5">82%</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400">Structuring (MECE)</div>
          <div className="text-base font-bold font-mono text-slate-200 mt-0.5">7.8 / 10</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400">Communication Score</div>
          <div className="text-base font-bold font-mono text-slate-200 mt-0.5">7.4 / 10</div>
        </div>
        <div>
          <div className="text-[11px] text-slate-400">Behavioural Fit</div>
          <div className="text-base font-bold font-mono text-slate-200 mt-0.5">8.0 / 10</div>
        </div>
      </div>

      {/* Practice Banks Quick Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Practice Guesstimates */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Guesstimate Lab</h3>
              <p className="text-xs text-slate-400">
                All 39 practice questions from FMS Casebook
              </p>
            </div>
            <button
              onClick={() => onNavigate('guesstimates')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              View All 39 →
            </button>
          </div>

          <div className="space-y-2.5">
            {ALL_GUESSTIMATES.slice(0, 4).map((g) => (
              <div
                key={g.id}
                onClick={() => onNavigate('guesstimates', g.id)}
                className="group flex cursor-pointer items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/40 p-3 hover:border-slate-700 hover:bg-slate-800/40 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                    {g.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{g.category} · {g.difficulty}</div>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-slate-200">
                  Practice →
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Cases */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Case Interview Lab</h3>
              <p className="text-xs text-slate-400">
                Profitability, Market Entry, Growth, Pricing & GTM
              </p>
            </div>
            <button
              onClick={() => onNavigate('cases')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              View Cases →
            </button>
          </div>

          <div className="space-y-2.5">
            {CASE_BANK.slice(0, 4).map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate('cases', c.id)}
                className="group flex cursor-pointer items-center justify-between rounded-lg border border-slate-800/80 bg-slate-950/40 p-3 hover:border-slate-700 hover:bg-slate-800/40 transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{c.type} · {c.industry}</div>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-slate-200">
                  Solve Case →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Mistakes & Revision Teaser */}
      {mistakes.length > 0 && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Recent Logged Mistakes</h3>
            </div>
            <button
              onClick={() => onNavigate('mistakes')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
            >
              Open Mistake Log ({mistakes.length}) →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {mistakes.slice(0, 2).map((m) => (
              <div
                key={m.id}
                className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3 text-xs"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{m.category}</span>
                  <span>{m.exerciseType}</span>
                </div>
                <div className="font-semibold text-slate-200 mt-1">{m.exerciseTitle}</div>
                <div className="text-slate-400 mt-1 line-clamp-2">
                  <span className="text-amber-400 font-medium">Fix: </span>
                  {m.howToAvoid}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
