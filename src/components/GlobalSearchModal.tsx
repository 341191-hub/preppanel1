import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { CONCEPTS_LIBRARY, BENCHMARK_CHEATSHEET, ALL_GUESSTIMATES, CASE_BANK } from '../data/casebookData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConcept?: (id: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectConcept,
}) => {
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredConcepts = query.trim()
    ? CONCEPTS_LIBRARY.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.definition.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : CONCEPTS_LIBRARY.slice(0, 4);

  const filteredBenchmarks = query.trim()
    ? BENCHMARK_CHEATSHEET.filter(
        (b) =>
          b.label.toLowerCase().includes(query.toLowerCase()) ||
          b.value.toLowerCase().includes(query.toLowerCase())
      )
    : BENCHMARK_CHEATSHEET.slice(0, 4);

  const filteredGuesstimates = query.trim()
    ? ALL_GUESSTIMATES.filter(
        (g) =>
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.question.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const handleAskAI = async () => {
    if (!query.trim()) return;
    setIsLoadingAi(true);
    setAiAnswer(null);
    try {
      const res = await fetch('/api/search-casebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiAnswer(data.answer);
      } else {
        setAiAnswer('Unable to retrieve casebook response at this moment. Please try again.');
      }
    } catch {
      setAiAnswer('Unable to connect to AI assistant. Check your network or try local search results.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 p-4 pt-16 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0d1424] shadow-2xl">
        <div className="relative border-b border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-slate-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setAiAnswer(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAskAI();
              }}
              placeholder="Ask anything about consulting prep or search FMS Casebook..."
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setAiAnswer(null);
                }}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={handleAskAI}
              disabled={isLoadingAi || !query.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 disabled:opacity-50 transition-colors shrink-0"
            >
              {isLoadingAi ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              <span>Ask AI</span>
            </button>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4 space-y-5">
          {/* AI generated answer if present */}
          {aiAnswer && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs">
              <div className="flex items-center gap-2 font-semibold text-amber-300 mb-2">
                <Sparkles className="h-4 w-4" />
                <span>Casebook AI Synthesis</span>
              </div>
              <div className="text-slate-200 whitespace-pre-line leading-relaxed">
                {aiAnswer}
              </div>
            </div>
          )}

          {/* Benchmark Cheatsheet Matches */}
          {filteredBenchmarks.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Casebook Benchmark Data
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredBenchmarks.map((b) => (
                  <div
                    key={b.label}
                    className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5 text-xs"
                  >
                    <div className="text-slate-400">{b.label}</div>
                    <div className="font-mono tabular-nums text-slate-100 font-semibold mt-0.5">
                      {b.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concepts Matches */}
          {filteredConcepts.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Frameworks & Concepts
              </div>
              <div className="space-y-2">
                {filteredConcepts.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      if (onSelectConcept) onSelectConcept(c.id);
                      onClose();
                    }}
                    className="group cursor-pointer rounded-lg border border-slate-800 bg-slate-900/40 p-3 hover:border-slate-700 hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {c.title}
                      </div>
                      <span className="text-[10px] text-slate-500">{c.category}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {c.definition}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guesstimate Matches */}
          {filteredGuesstimates.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Practice Guesstimates
              </div>
              <div className="space-y-1.5">
                {filteredGuesstimates.map((g) => (
                  <div
                    key={g.id}
                    className="rounded-lg border border-slate-800 bg-slate-900/40 p-2.5 text-xs text-slate-300"
                  >
                    <div className="font-medium text-slate-100">{g.title}</div>
                    <div className="text-[11px] text-slate-400">{g.question}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-800/80 bg-slate-950/60 px-4 py-2 text-[11px] text-slate-500 flex justify-between">
          <span>Search FMS Casebook 2025-26</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
