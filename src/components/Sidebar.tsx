import React from 'react';
import {
  LayoutDashboard,
  Calculator,
  Briefcase,
  Users,
  BookOpen,
  HelpCircle,
  UserCheck,
  UserPlus,
  Zap,
  BarChart3,
  AlertTriangle,
  RotateCcw,
  Settings,
  Flame,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  streak: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  streak,
}) => {
  const navSections = [
    {
      group: 'Core Practice',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'guesstimates', label: 'Guesstimate Lab', icon: Calculator, badge: '39' },
        { id: 'cases', label: 'Case Interview Lab', icon: Briefcase },
        { id: 'mock', label: 'Mock Interview', icon: Users, highlight: true },
        { id: 'behavioural', label: 'Behavioural & CV', icon: UserCheck },
        { id: 'interviewer_mode', label: 'Interviewer Mode', icon: UserPlus },
      ],
    },
    {
      group: 'Knowledge & Drills',
      items: [
        { id: 'learn', label: 'Learn Library', icon: BookOpen },
        { id: 'quiz', label: 'Quiz Engine', icon: HelpCircle },
        { id: 'rapid_fire', label: 'Consulting 10', icon: Zap },
      ],
    },
    {
      group: 'Analytics & Coaching',
      items: [
        { id: 'analytics', label: 'Progress & Analytics', icon: BarChart3 },
        { id: 'mistakes', label: 'Mistake Log', icon: AlertTriangle },
        { id: 'revision', label: 'Revision Room', icon: RotateCcw },
        { id: 'settings', label: 'Settings & Profile', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-slate-800/80 bg-[#080d19] p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-57px)]">
      <div className="space-y-6">
        {/* Streak & Status Card */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                <Flame className="h-4 w-4 fill-amber-500/30 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  <span className="font-mono tabular-nums text-amber-400 font-bold">{streak}</span> Day Prep Streak
                </div>
                <div className="text-[11px] text-slate-500">FMS Casebook Standard</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-5">
          {navSections.map((section) => (
            <div key={section.group} className="space-y-1">
              <div className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {section.group}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 font-semibold shadow-sm'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-amber-400'
                            : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="font-mono text-[10px] text-slate-500 group-hover:text-slate-400">
                        {item.badge}
                      </span>
                    )}
                    {item.highlight && !isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80"></span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Casebook attribution */}
      <div className="pt-4 border-t border-slate-800/60 text-[11px] text-slate-500">
        <div className="font-medium text-slate-400">FMS Casebook 2025-26</div>
        <div>Knowledge Base Edition</div>
      </div>
    </aside>
  );
};
