import React, { useState } from 'react';
import { Settings, User, Shield, Trash2, CheckCircle2, RotateCcw } from 'lucide-react';
import { UserProfile } from '../types';
import { saveProfile, defaultProfile } from '../utils/storage';

interface SettingsViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onClearAllData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  onClearAllData,
}) => {
  const [profileData, setProfileData] = useState<UserProfile>(userProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(profileData);
    saveProfile(profileData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-amber-400" />
          <span>Prep Room Settings</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Manage your candidate profile, target firms, local data, and privacy controls.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <User className="h-4 w-4 text-amber-400" />
          <span>Candidate Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">College / School</label>
            <input
              type="text"
              value={profileData.college}
              onChange={(e) => setProfileData({ ...profileData, college: e.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Target Roles</label>
            <input
              type="text"
              value={profileData.targetRoles.join(', ')}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  targetRoles: e.target.value.split(',').map((s) => s.trim()),
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Confidence Level
            </label>
            <select
              value={profileData.confidenceLevel}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  confidenceLevel: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced',
                })
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Changes saved successfully!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              className="rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-bold text-slate-950 transition-colors shadow-sm"
            >
              Save Profile
            </button>
          </div>
        </div>
      </form>

      {/* Privacy Guarantee */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400" />
          <span>Local Data & Privacy Policy</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Your CV text, practice session history, mistake logs, and evaluation reports are stored locally in your browser session. No personal profile data or resumes are saved into external tracking databases.
        </p>
      </div>

      {/* Clear Data Danger Zone */}
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 space-y-3">
        <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
          <Trash2 className="h-4 w-4" />
          <span>Clear Local Data</span>
        </h3>
        <p className="text-xs text-slate-300">
          Reset all locally saved mistake logs, completed exercises, and preferences back to fresh defaults.
        </p>
        <button
          onClick={() => setShowClearConfirm(true)}
          className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/20 transition-colors"
        >
          Clear My Data
        </button>
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#0d1424] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Reset All Prep Data?</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              This will erase all recorded session histories, mistake log entries, and reset your streak. Are you sure?
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowClearConfirm(false);
                  onClearAllData();
                }}
                className="rounded-lg bg-rose-500 hover:bg-rose-400 px-4 py-2 text-xs font-bold text-white transition-colors"
              >
                Yes, Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
