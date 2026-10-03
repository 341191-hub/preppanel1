import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Bookmark,
  BookmarkCheck,
  Check,
  Sparkles,
  ArrowRight,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { CONCEPTS_LIBRARY, BENCHMARK_CHEATSHEET } from '../data/casebookData';
import { ConceptItem } from '../types';
import { getBookmarkedConcepts, toggleBookmarkConcept } from '../utils/storage';

interface LearnViewProps {
  onStartQuizOnTopic?: (topic: string) => void;
  onPracticeGuesstimate?: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  onStartQuizOnTopic,
  onPracticeGuesstimate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>(getBookmarkedConcepts());
  const [activeConcept, setActiveConcept] = useState<ConceptItem>(CONCEPTS_LIBRARY[0]);

  // AI expansion states
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const categories = [
    'All',
    'Frameworks',
    'Consulting Basics',
    'Business Concepts',
    'Finance & Accounting',
    'Economics',
    'Cheatsheet',
    'Bookmarks',
  ];

  const handleToggleBookmark = (id: string) => {
    toggleBookmarkConcept(id);
    setBookmarks(getBookmarkedConcepts());
  };

  const handleAskAiToExplain = async (promptMode: 'simple' | 'example' | 'case') => {
    setIsExplaining(true);
    setAiExplanation(null);

    let prompt = '';
    if (promptMode === 'simple') {
      prompt = `Explain ${activeConcept.title} in simple, memorable terms for a consulting candidate, using a relatable analogy.`;
    } else if (promptMode === 'example') {
      prompt = `Give a detailed real-world McKinsey or BCG case study example demonstrating the exact application of ${activeConcept.title}.`;
    } else {
      prompt = `How would you use ${activeConcept.title} inside an active consulting case interview? Provide exact phrasing to use with the interviewer.`;
    }

    try {
      const res = await fetch('/api/search-casebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: prompt }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiExplanation(data.answer);
      }
    } catch {
      setAiExplanation('Unable to generate AI explanation right now.');
    } finally {
      setIsExplaining(false);
    }
  };

  const filteredConcepts = CONCEPTS_LIBRARY.filter((c) => {
    if (selectedCategory === 'Bookmarks') {
      return bookmarks.includes(c.id);
    }
    if (selectedCategory !== 'All' && c.category !== selectedCategory) {
      return false;
    }
    if (
      searchQuery &&
      !c.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !c.definition.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-amber-400" />
            <span>Casebook Knowledge & Concept Library</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Structured frameworks, financial trees, and economics from the FMS Consulting Casebook 2025-26.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts..."
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills (Button filters compliant with Section 1A) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors shrink-0 ${
              selectedCategory === cat
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat} {cat === 'Bookmarks' && `(${bookmarks.length})`}
          </button>
        ))}
      </div>

      {/* Cheatsheet view if selected */}
      {selectedCategory === 'Cheatsheet' ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
            FMS Casebook Guesstimate Cheat Sheet
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BENCHMARK_CHEATSHEET.map((b) => (
              <div
                key={b.label}
                className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs"
              >
                <div className="text-slate-400">{b.label}</div>
                <div className="font-mono tabular-nums text-slate-100 font-bold mt-1 text-sm">
                  {b.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Split view: List & Detail */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Concept List */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Concepts ({filteredConcepts.length})
            </div>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredConcepts.map((c) => {
                const isSelected = activeConcept.id === c.id;
                const isSaved = bookmarks.includes(c.id);
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setActiveConcept(c);
                      setAiExplanation(null);
                    }}
                    className={`group cursor-pointer rounded-xl border p-3.5 text-xs transition-colors flex items-start justify-between ${
                      isSelected
                        ? 'border-amber-500/50 bg-amber-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{c.category}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBookmark(c.id);
                      }}
                      className="text-slate-500 hover:text-amber-400 p-1"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="h-4 w-4 text-amber-400" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Concept Detail */}
          <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] uppercase font-semibold text-amber-400">
                  {activeConcept.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{activeConcept.title}</h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Source: {activeConcept.casebookReference}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleBookmark(activeConcept.id)}
                  className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 hover:text-amber-300 transition-colors"
                  title="Bookmark for quick revision"
                >
                  {bookmarks.includes(activeConcept.id) ? (
                    <BookmarkCheck className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Definition */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-xs font-bold text-slate-300 mb-1">Definition & Core Logic:</div>
              <p className="text-xs text-slate-200 leading-relaxed">{activeConcept.definition}</p>
            </div>

            {/* Key Points */}
            <div>
              <div className="text-xs font-bold text-slate-300 mb-2">Key Components:</div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeConcept.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">·</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* When to Use & Example */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="font-bold text-slate-300 mb-1">When to Use:</div>
                <p className="text-slate-400">{activeConcept.whenToUse}</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                <div className="font-bold text-slate-300 mb-1">Practical Example:</div>
                <p className="text-slate-400">{activeConcept.example}</p>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-xs">
              <div className="font-bold text-rose-400 mb-1">Common Traps & Mistakes:</div>
              <ul className="space-y-1 text-slate-300">
                {activeConcept.commonMistakes.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Deepening Buttons */}
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-2">
                Deepen Understanding with AI:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAskAiToExplain('simple')}
                  disabled={isExplaining}
                  className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-amber-400 transition-colors"
                >
                  Explain this simply
                </button>
                <button
                  onClick={() => handleAskAiToExplain('example')}
                  disabled={isExplaining}
                  className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-amber-400 transition-colors"
                >
                  Give a detailed case study
                </button>
                <button
                  onClick={() => handleAskAiToExplain('case')}
                  disabled={isExplaining}
                  className="rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-amber-400 transition-colors"
                >
                  How to phrase this in an interview
                </button>
              </div>

              {aiExplanation && (
                <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>AI Coaching Deep Dive</span>
                  </div>
                  {aiExplanation}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
