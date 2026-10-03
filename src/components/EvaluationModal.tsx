import React from 'react';
import { X, Award, CheckCircle, AlertCircle, ArrowRight, RotateCcw, TrendingUp } from 'lucide-react';
import { EvaluationReport } from '../types';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: EvaluationReport;
  exerciseTitle: string;
  onRetry: () => void;
  referenceSolution?: {
    steps: string[];
    finalNumber: string;
    keyAssumptions: string[];
    sanityCheckMethod: string;
    casebookReference: string;
  };
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  onClose,
  report,
  exerciseTitle,
  onRetry,
  referenceSolution,
}) => {
  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 8.0) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 6.5) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700/80 bg-[#0c1222] p-6 shadow-2xl my-6">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Consulting Assessment Scorecard
          </div>
          <h2 className="text-xl font-bold text-white mt-1">{exerciseTitle}</h2>
          <div className="text-xs text-slate-400 mt-1">
            Evaluated against MBB standards & FMS Consulting Casebook 2025-26 criteria.
          </div>
        </div>

        {/* Top Score Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl font-extrabold font-mono tabular-nums ${getScoreColor(
                report.overallScore
              )}`}
            >
              {report.overallScore.toFixed(1)}
            </div>
            <div>
              <div className="text-xs text-slate-400">Overall Readiness</div>
              <div className="text-sm font-bold text-white">
                {report.overallScore >= 8.0
                  ? 'Strong Pass'
                  : report.overallScore >= 6.5
                  ? 'Competitive / Needs Polish'
                  : 'Development Needed'}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Scale: 0.0 - 10.0</div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs text-slate-400">Order-of-Magnitude Check</div>
            <div className="text-sm font-bold text-slate-200 mt-1">
              {report.orderOfMagnitudeCheck || 'Within Reasonable Bound'}
            </div>
            {report.finalEstimateGiven && (
              <div className="text-[11px] text-slate-400 mt-1">
                Your Est:{' '}
                <span className="font-mono text-amber-300 font-semibold">
                  {report.finalEstimateGiven}
                </span>
              </div>
            )}
            {report.referenceEstimate && (
              <div className="text-[11px] text-slate-500">
                Reference: <span className="font-mono">{report.referenceEstimate}</span>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-xs text-slate-400">Interviewer Engagement</div>
            <div className="text-sm font-bold text-amber-300 mt-1 font-mono tabular-nums">
              {report.dimensions.interviewerEngagement?.toFixed(1) || '8.0'} / 10
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Measures buy-in, listening to cues, articulating assumptions & composure.
            </div>
          </div>
        </div>

        {/* Detailed Competency Dimensions */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Core Competency Breakdown
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(report.dimensions).map(([dim, val]) => (
              <div key={dim} className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-2.5">
                <div className="text-[11px] text-slate-400 capitalize">
                  {dim.replace(/([A-Z])/g, ' $1')}
                </div>
                <div className="text-base font-bold font-mono tabular-nums text-slate-200 mt-0.5">
                  {val.toFixed(1)} <span className="text-[10px] text-slate-500">/ 10</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${Math.min(100, (val / 10) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <CheckCircle className="h-4 w-4" />
              <span>What You Did Well</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {report.whatYouDidWell.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <AlertCircle className="h-4 w-4" />
              <span>What You Should Improve</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {report.whatToImprove.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Observable Interviewer Perception */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            How an Interviewer May Perceive You
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "{report.interviewerPerception}"
          </p>
        </div>

        {/* Better / Reference Approach */}
        {referenceSolution && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              FMS Casebook Reference Approach
            </div>
            <div className="text-xs text-slate-300 space-y-1.5 mb-3">
              {referenceSolution.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-slate-500 shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-xs pt-3 border-t border-slate-800/80">
              <div>
                <span className="text-slate-400">Reference Output: </span>
                <span className="font-mono font-bold text-amber-300">
                  {referenceSolution.finalNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Sanity Check: </span>
                <span className="text-slate-300">{referenceSolution.sanityCheckMethod}</span>
              </div>
              <div className="text-slate-500">
                Source: {referenceSolution.casebookReference}
              </div>
            </div>
          </div>
        )}

        {/* Next 7-Day Action Plan */}
        {report.actionPlanNext7Days && report.actionPlanNext7Days.length > 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2">
              <TrendingUp className="h-4 w-4 text-amber-400" />
              <span>Tailored Next 7-Day Practice Plan</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {report.actionPlanNext7Days.map((action, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-2.5 text-xs text-slate-300"
                >
                  <div className="text-[10px] font-mono text-amber-400 font-bold mb-1">
                    STEP {idx + 1}
                  </div>
                  <div>{action}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retry This Exercise</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-bold text-slate-950 transition-colors shadow-sm"
          >
            Done & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
