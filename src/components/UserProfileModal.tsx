import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile: UserProfile;
  onSave: (updated: UserProfile) => void;
}

const STRUGGLE_OPTIONS = [
  'Guesstimates',
  'Case Structuring',
  'Mental Math',
  'Framework Selection',
  'Communication & Polish',
  'Behavioural / HR',
  'Business Awareness',
  'Interviewer Engagement',
  'Data Interpretation',
];

const FIRM_OPTIONS = [
  'McKinsey & Company',
  'Boston Consulting Group (BCG)',
  'Bain & Company',
  'Kearney',
  'Strategy& (PwC)',
  'Oliver Wyman',
  'Roland Berger',
  'Accenture Strategy',
  'EY-Parthenon',
  'Deloitte S&O',
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  initialProfile,
  onSave,
}) => {
  const [formData, setFormData] = useState<UserProfile>(initialProfile);

  if (!isOpen) return null;

  const toggleStruggle = (item: string) => {
    const list = formData.struggles.includes(item)
      ? formData.struggles.filter((s) => s !== item)
      : [...formData.struggles, item];
    setFormData({ ...formData, struggles: list });
  };

  const toggleFirm = (firm: string) => {
    const list = formData.targetFirms.includes(firm)
      ? formData.targetFirms.filter((f) => f !== firm)
      : [...formData.targetFirms, firm];
    setFormData({ ...formData, targetFirms: list });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      onboardingCompleted: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700/80 bg-[#0c1222] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
            Candidate Profile & Personalization
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Configure Your Prep Room</h2>
          <p className="text-xs text-slate-400 mt-1">
            Tailor the AI interviewer to your background, target firms, and focus areas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Candidate Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="e.g. Rahul Sharma"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                College / Business School
              </label>
              <input
                type="text"
                required
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="e.g. FMS Delhi / IIM / ISB"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Current Degree / Program
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                placeholder="e.g. MBA (Full Time) / B.Tech"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Confidence Level
              </label>
              <select
                value={formData.confidenceLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confidenceLevel: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced',
                  })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
              >
                <option value="Beginner">Beginner (Starting first cases)</option>
                <option value="Intermediate">Intermediate (Familiar with frameworks)</option>
                <option value="Advanced">Advanced (Final interview round prep)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Target Consulting Firms
            </label>
            <div className="flex flex-wrap gap-2">
              {FIRM_OPTIONS.map((firm) => {
                const isSelected = formData.targetFirms.includes(firm);
                return (
                  <button
                    type="button"
                    key={firm}
                    onClick={() => toggleFirm(firm)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {firm}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Areas You Want to Strengthen (Select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STRUGGLE_OPTIONS.map((item) => {
                const isSelected = formData.struggles.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleStruggle(item)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium border text-left transition-colors ${
                      isSelected
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-200'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{item}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Daily Target Preparation Time
            </label>
            <div className="flex gap-2">
              {[15, 30, 45, 60, 90].map((mins) => (
                <button
                  type="button"
                  key={mins}
                  onClick={() => setFormData({ ...formData, dailyPrepMinutes: mins })}
                  className={`flex-1 rounded-lg py-1.5 text-xs font-medium border transition-colors ${
                    formData.dailyPrepMinutes === mins
                      ? 'border-amber-500/40 bg-amber-500/20 text-amber-300 font-bold'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {mins} min
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-bold text-slate-950 transition-colors shadow-sm"
            >
              Save Profile & Begin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
