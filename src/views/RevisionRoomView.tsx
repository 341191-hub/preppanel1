import React from 'react';
import { RotateCcw, AlertTriangle, CheckCircle, ArrowRight, Zap, BookOpen } from 'lucide-react';
import { MistakeLogEntry, UserProfile } from '../types';

interface RevisionRoomViewProps {
  userProfile: UserProfile;
  mistakes: MistakeLogEntry[];
  onNavigate: (view: string, itemId?: string) => void;
}

export const RevisionRoomView: React.FC<RevisionRoomViewProps> = ({
  userProfile,
  mistakes,
  onNavigate,
}) => {
  // Identify recurring patterns
  const mistakeCounts = mistakes.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topWeakArea =
    Object.entries(mistakeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Structuring';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <RotateCcw className="h-5 w-5 text-amber-400" />
          <span>Consulting Revision Room</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Adaptive targeted drills focusing specifically on your recurring mistakes and weak areas.
        </p>
      </div>

      {/* Target Focus Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-transparent p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <Zap className="h-4 w-4" />
          <span>Priority Focus Area Detected</span>
        </div>
        <h3 className="text-lg font-bold text-white">
          Primary Bottleneck: <span className="text-amber-300">{topWeakArea}</span>
        </h3>
        <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
          Based on your logged simulation history, you tend to jump into calculations before fully locking the issue tree. Today's adaptive sequence is designed to anchor structured MECE habits.
        </p>
      </div>

      {/* Recommended 3-Step Drill Sequence */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Personalized 3-Step Adaptive Revision Plan
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                Step 1 · 10 Mins
              </div>
              <h4 className="text-sm font-bold text-white mt-1">MECE & 3Cs Foundation</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Review the core MECE principles and common segmentation traps in the Learn library.
              </p>
            </div>
            <button
              onClick={() => onNavigate('learn')}
              className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold hover:text-amber-300"
            >
              <span>Open Framework</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                Step 2 · 15 Mins
              </div>
              <h4 className="text-sm font-bold text-white mt-1">Supply-Side Guesstimate</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Practice the Delhi-Gurgaon Toll Plaza or Petrol Pumps bottleneck exercise.
              </p>
            </div>
            <button
              onClick={() => onNavigate('guesstimates', 'g-delhi-toll')}
              className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold hover:text-amber-300"
            >
              <span>Start Guesstimate</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                Step 3 · 20 Mins
              </div>
              <h4 className="text-sm font-bold text-white mt-1">Apex Foods Profitability</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Re-attempt the profitability mix-shift case with zero hints.
              </p>
            </div>
            <button
              onClick={() => onNavigate('cases', 'case-apex-fmcg-profitability')}
              className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold hover:text-amber-300"
            >
              <span>Solve Case</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recurring Traps Quick Grid */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Recurring Traps Identified Across MBA Candidates
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
            <div className="font-semibold text-rose-300">Jumping Straight to Solving</div>
            <div className="text-slate-400 mt-1">
              Failing to ask clarifying questions about client objective or scope. Always clarify before building your issue tree.
            </div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
            <div className="font-semibold text-rose-300">Forgetting Sanity Checks</div>
            <div className="text-slate-400 mt-1">
              Reaching a final guesstimate and immediately stopping without comparing to population per capita or macro industry metrics.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
