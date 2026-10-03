import React, { useState } from 'react';
import {
  AlertTriangle,
  Trash2,
  Filter,
  CheckCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { MistakeLogEntry } from '../types';
import { deleteMistake } from '../utils/storage';

interface MistakeLogViewProps {
  mistakes: MistakeLogEntry[];
  onRefreshMistakes: () => void;
  onNavigateToDrill: (exerciseType: string) => void;
}

export const MistakeLogView: React.FC<MistakeLogViewProps> = ({
  mistakes,
  onRefreshMistakes,
  onNavigateToDrill,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = [
    'All',
    'Structure',
    'Calculation',
    'Assumption',
    'Framework',
    'Conceptual',
    'Business Judgement',
  ];

  const handleDelete = (id: string) => {
    deleteMistake(id);
    onRefreshMistakes();
  };

  const filtered = filterCategory === 'All'
    ? mistakes
    : mistakes.filter((m) => m.category === filterCategory);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <span>Consulting Mistake Log</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Every flawed assumption, calculation slip, and structuring trap logged automatically for systematic revision.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors shrink-0 ${
                filterCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No Logged Mistakes in this Category</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Mistakes from your Guesstimate Lab, Case Lab, and Quizzes are automatically captured here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 transition-colors hover:border-slate-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase">
                      {m.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {m.exerciseTitle}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Logged on {new Date(m.timestamp).toLocaleDateString()}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(m.id)}
                  className="rounded-lg p-1 text-slate-500 hover:bg-slate-800 hover:text-rose-400 transition-colors"
                  title="Remove from mistake log"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                  <div className="font-semibold text-rose-300 mb-1">What I Did:</div>
                  <div className="text-slate-300 leading-relaxed">{m.whatIDid}</div>
                </div>

                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="font-semibold text-emerald-300 mb-1">Expected Standard:</div>
                  <div className="text-slate-300 leading-relaxed">{m.whatWasExpected}</div>
                </div>
              </div>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs space-y-1">
                <div>
                  <span className="font-bold text-amber-400">Why It Mattered: </span>
                  <span className="text-slate-300">{m.whyItMattered}</span>
                </div>
                <div>
                  <span className="font-bold text-amber-400">How to Avoid Next Time: </span>
                  <span className="text-slate-300">{m.howToAvoid}</span>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() =>
                    onNavigateToDrill(
                      m.exerciseType.toLowerCase().includes('guesstimate') ? 'guesstimates' : 'cases'
                    )
                  }
                  className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Practice Target Drill</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
