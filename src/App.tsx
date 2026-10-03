import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { UserProfileModal } from './components/UserProfileModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

import { DashboardView } from './views/DashboardView';
import { GuesstimateLabView } from './views/GuesstimateLabView';
import { CaseLabView } from './views/CaseLabView';
import { MockInterviewView } from './views/MockInterviewView';
import { LearnView } from './views/LearnView';
import { QuizView } from './views/QuizView';
import { BehaviouralView } from './views/BehaviouralView';
import { InterviewerModeView } from './views/InterviewerModeView';
import { RapidFireView } from './views/RapidFireView';
import { AnalyticsView } from './views/AnalyticsView';
import { MistakeLogView } from './views/MistakeLogView';
import { RevisionRoomView } from './views/RevisionRoomView';
import { SettingsView } from './views/SettingsView';

import {
  UserProfile,
  MistakeLogEntry,
} from './types';
import {
  getStoredProfile,
  saveProfile,
  getMistakeLog,
  getStreak,
  getCompletedExercises,
} from './utils/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined);

  // Profile & Modals
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredProfile());
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);

  // Stored state
  const [mistakes, setMistakes] = useState<MistakeLogEntry[]>(getMistakeLog());
  const [streak, setStreak] = useState<number>(getStreak());
  const [completedGuesstimates, setCompletedGuesstimates] = useState(
    getCompletedExercises('guesstimate')
  );
  const [completedCases, setCompletedCases] = useState(
    getCompletedExercises('case')
  );

  // Check onboarding on initial mount
  useEffect(() => {
    if (!userProfile.onboardingCompleted) {
      setShowProfileModal(true);
    }
  }, []);

  const handleNavigate = (view: string, itemId?: string) => {
    setCurrentView(view);
    setSelectedItemId(itemId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    saveProfile(updated);
  };

  const handleClearAllData = () => {
    localStorage.clear();
    const fresh = getStoredProfile();
    setUserProfile(fresh);
    setMistakes([]);
    setStreak(1);
    setCompletedGuesstimates([]);
    setCompletedCases([]);
    setCurrentView('dashboard');
  };

  const refreshMistakes = () => {
    setMistakes(getMistakeLog());
  };

  return (
    <div className="min-h-screen bg-[#080d19] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        userProfile={userProfile}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          streak={streak}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1440px]">
          {currentView === 'dashboard' && (
            <DashboardView
              userProfile={userProfile}
              onNavigate={handleNavigate}
              mistakes={mistakes}
              streak={streak}
              completedGuesstimates={completedGuesstimates}
              completedCases={completedCases}
            />
          )}

          {currentView === 'guesstimates' && (
            <GuesstimateLabView
              initialGuesstimateId={selectedItemId}
              userProfile={userProfile}
            />
          )}

          {currentView === 'cases' && (
            <CaseLabView
              initialCaseId={selectedItemId}
              userProfile={userProfile}
            />
          )}

          {currentView === 'mock' && (
            <MockInterviewView userProfile={userProfile} />
          )}

          {currentView === 'learn' && (
            <LearnView
              onStartQuizOnTopic={() => handleNavigate('quiz')}
              onPracticeGuesstimate={() => handleNavigate('guesstimates')}
            />
          )}

          {currentView === 'quiz' && (
            <QuizView userProfile={userProfile} />
          )}

          {currentView === 'behavioural' && (
            <BehaviouralView userProfile={userProfile} />
          )}

          {currentView === 'interviewer_mode' && (
            <InterviewerModeView />
          )}

          {currentView === 'rapid_fire' && (
            <RapidFireView />
          )}

          {currentView === 'analytics' && (
            <AnalyticsView
              userProfile={userProfile}
              completedGuesstimates={completedGuesstimates}
              completedCases={completedCases}
              streak={streak}
            />
          )}

          {currentView === 'mistakes' && (
            <MistakeLogView
              mistakes={mistakes}
              onRefreshMistakes={refreshMistakes}
              onNavigateToDrill={(type) => handleNavigate(type)}
            />
          )}

          {currentView === 'revision' && (
            <RevisionRoomView
              userProfile={userProfile}
              mistakes={mistakes}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onClearAllData={handleClearAllData}
            />
          )}
        </main>
      </div>

      {/* Profile / Onboarding Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        initialProfile={userProfile}
        onSave={handleUpdateProfile}
      />

      {/* Global Search & Casebook Assistant Modal */}
      <GlobalSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelectConcept={() => handleNavigate('learn')}
      />
    </div>
  );
}
