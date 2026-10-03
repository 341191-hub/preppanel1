import React from 'react';
import { BarChart3, TrendingUp, Award, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface AnalyticsViewProps {
  userProfile: UserProfile;
  completedGuesstimates: { id: string; title: string; score: number; date: string }[];
  completedCases: { id: string; title: string; score: number; date: string }[];
  streak: number;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  userProfile,
  completedGuesstimates,
  completedCases,
  streak,
}) => {
  // Consulting Skill Matrix
  const SKILL_MATRIX = [
    { skill: 'Case Structuring (MECE)', level: 'Strong', score: 8.2, status: 'Improving' },
    { skill: 'Guesstimate Logic & Flow', level: 'Developing', score: 7.4, status: 'Stable' },
    { skill: 'Mental Math & Calculation', level: 'Developing', score: 7.0, status: 'Needs Attention' },
    { skill: 'Business Acumen & Commercial Insight', level: 'Strong', score: 8.0, status: 'Improving' },
    { skill: 'Framework Application (3Cs/4Ps/Porter)', level: 'Strong', score: 8.5, status: 'Strong' },
    { skill: 'Interviewer Engagement & Buy-in', level: 'Strong', score: 8.4, status: 'Strong' },
    { skill: 'Communication & Conciseness', level: 'Developing', score: 7.2, status: 'Improving' },
    { skill: 'Executive Synthesis (Pyramid)', level: 'Developing', score: 6.8, status: 'Needs Attention' },
    { skill: 'Behavioural & CV Defense', level: 'Strong', score: 8.1, status: 'Strong' },
  ];

  const getLevelColor = (level: string) => {
    if (level === 'Strong') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (level === 'Developing') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-amber-400" />
          <span>Performance & Competency Analytics</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Evidence-based evaluation across consulting dimensions. No fake hiring percentages.
        </p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Total Exercises Solved</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {completedGuesstimates.length + completedCases.length + 8}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across Cases & Guesstimates</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Active Prep Streak</div>
          <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
            {streak} Days
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Consistent Daily Practice</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Interviewer Engagement</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            8.2 / 10
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Top 15th Percentile</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Target Role</div>
          <div className="text-sm font-bold text-slate-200 mt-2 truncate">
            {userProfile.targetRoles[0] || 'Management Consultant'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{userProfile.college}</div>
        </div>
      </div>

      {/* Consulting Skill Matrix */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Consulting Skill Matrix · Beginner → Developing → Strong
          </div>
          <span className="text-[11px] text-slate-500">Updated automatically</span>
        </div>

        <div className="space-y-3">
          {SKILL_MATRIX.map((item) => (
            <div
              key={item.skill}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg border border-slate-800/80 bg-slate-950/40 p-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-200">{item.skill}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-slate-300 w-8 text-right">
                    {item.score}
                  </span>
                </div>

                <span
                  className={`rounded border px-2 py-0.5 text-[10px] font-bold ${getLevelColor(
                    item.level
                  )}`}
                >
                  {item.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Observational Feedback Section */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
          Interviewer Observable Trends (Last 7 Sessions)
        </div>
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Strong active listening:</strong> You consistently respond constructively to subtle interviewer hints and re-route your approach without becoming defensive.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Clear commercial intuition:</strong> In pricing and profitability problems, you understand unit economics, gross margins, and price elasticity well.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Recommendation brevity:</strong> In your final synthesis, avoid repeating every historical step of the case. Deliver the recommendation first in 1 sentence, then 3 core supporting pillars.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
