import React from 'react';
import { Search, Sparkles, User, Mic, Volume2 } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  userProfile: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenProfile,
  userProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-800/80 bg-[#090e1a]/90 px-6 py-3.5 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('dashboard')}
          className="group text-left text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <span className="font-serif-brand tracking-widest text-amber-400">PREPPANNEL</span>
          <span className="ml-2 text-xs font-normal text-slate-400">Consulting Interview Lab</span>
        </button>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`transition-colors hover:text-white ${
            currentView === 'dashboard' ? 'text-amber-400' : ''
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('guesstimates')}
          className={`transition-colors hover:text-white ${
            currentView === 'guesstimates' ? 'text-amber-400' : ''
          }`}
        >
          Guesstimate Lab
        </button>
        <button
          onClick={() => onNavigate('cases')}
          className={`transition-colors hover:text-white ${
            currentView === 'cases' ? 'text-amber-400' : ''
          }`}
        >
          Case Lab
        </button>
        <button
          onClick={() => onNavigate('mock')}
          className={`transition-colors hover:text-white ${
            currentView === 'mock' ? 'text-amber-400' : ''
          }`}
        >
          Mock Interview
        </button>
        <button
          onClick={() => onNavigate('learn')}
          className={`transition-colors hover:text-white ${
            currentView === 'learn' ? 'text-amber-400' : ''
          }`}
        >
          Learn
        </button>
        <button
          onClick={() => onNavigate('quiz')}
          className={`transition-colors hover:text-white ${
            currentView === 'quiz' ? 'text-amber-400' : ''
          }`}
        >
          Quiz
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-colors"
          title="Search casebook knowledge base (Ctrl+K)"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden sm:inline">Ask Casebook...</span>
          <kbd className="hidden sm:inline rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800/80 transition-colors"
          title="Candidate Profile"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
            {userProfile.name.charAt(0).toUpperCase()}
          </div>
          <span className="hidden md:inline font-medium text-slate-200 truncate max-w-[100px]">
            {userProfile.name}
          </span>
        </button>
      </div>
    </header>
  );
};
