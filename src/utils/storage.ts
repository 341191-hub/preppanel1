import { UserProfile, MistakeLogEntry, EvaluationReport } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'preppannel_profile',
  MISTAKES: 'preppannel_mistakes',
  COMPLETED_GUESSTIMATES: 'preppannel_completed_guesstimates',
  COMPLETED_CASES: 'preppannel_completed_cases',
  COMPLETED_QUIZZES: 'preppannel_completed_quizzes',
  SAVED_CONCEPTS: 'preppannel_saved_concepts',
  RAPID_FIRE_SCORES: 'preppannel_rapid_fire',
  STREAK: 'preppannel_streak',
};

export const defaultProfile: UserProfile = {
  name: 'Candidate',
  degree: 'MBA',
  college: 'FMS Delhi',
  targetRoles: ['Management Consultant', 'Associate', 'Strategy Consultant'],
  targetFirms: ['McKinsey & Company', 'Boston Consulting Group (BCG)', 'Bain & Company', 'Kearney', 'Strategy&'],
  confidenceLevel: 'Intermediate',
  dailyPrepMinutes: 45,
  struggles: ['Guesstimates', 'Structuring', 'Communication'],
  onboardingCompleted: false,
};

export function getStoredProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile', err);
  }
}

export function getMistakeLog(): MistakeLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    return raw ? JSON.parse(raw) : getInitialMistakes();
  } catch {
    return getInitialMistakes();
  }
}

export function logMistake(entry: Omit<MistakeLogEntry, 'id' | 'timestamp'>): void {
  try {
    const existing = getMistakeLog();
    const newEntry: MistakeLogEntry = {
      ...entry,
      id: 'm-' + Date.now(),
      timestamp: new Date().toISOString(),
    };
    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to log mistake', err);
  }
}

export function deleteMistake(id: string): void {
  try {
    const existing = getMistakeLog();
    const updated = existing.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete mistake', err);
  }
}

function getInitialMistakes(): MistakeLogEntry[] {
  return [
    {
      id: 'm-init-1',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      exerciseTitle: 'Guesstimate: Number of Petrol Pumps in India',
      exerciseType: 'Guesstimate',
      category: 'Structure',
      whatIDid: 'Started calculating pump count directly by dividing highway kilometers without estimating vehicle fleet or refuel visits.',
      whatWasExpected: 'A structured demand/flow tree (total vehicle fleet * refueling frequency / throughput capacity per pump).',
      whyItMattered: 'Geographic area or highway distance completely ignores urban density where 60% of fuel is consumed.',
      howToAvoid: 'Spend 45 seconds upfront defining whether the problem is supply/capacity constrained or demand/population driven.',
      practiceRecommendation: 'Practice supply-side bottleneck and vehicle fleet guesstimates.',
    },
    {
      id: 'm-init-2',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      exerciseTitle: 'Case: Apex Foods Profitability Decline',
      exerciseType: 'Case',
      category: 'Business Judgement',
      whatIDid: 'Immediately suggested 15% headcount reduction to cut costs when margins dropped.',
      whatWasExpected: 'Isolating product mix shift and analyzing raw material commodity pass-through (shrinkflation).',
      whyItMattered: 'Cutting factory labor harms manufacturing yield when the root cause was unfavorable sales mix and trade discounts.',
      howToAvoid: 'Never jump to cost-cutting recommendations before diagnosing whether the problem stems from price realization, mix, or raw materials.',
      practiceRecommendation: 'Profitability issue tree deep drills.',
    },
  ];
}

export function getCompletedExercises(type: 'guesstimate' | 'case'): { id: string; title: string; score: number; date: string }[] {
  try {
    const key = type === 'guesstimate' ? STORAGE_KEYS.COMPLETED_GUESSTIMATES : STORAGE_KEYS.COMPLETED_CASES;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordCompletedExercise(type: 'guesstimate' | 'case', item: { id: string; title: string; score: number }): void {
  try {
    const key = type === 'guesstimate' ? STORAGE_KEYS.COMPLETED_GUESSTIMATES : STORAGE_KEYS.COMPLETED_CASES;
    const existing = getCompletedExercises(type);
    const updated = [{ ...item, date: new Date().toISOString() }, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to record completed exercise', err);
  }
}

export function getBookmarkedConcepts(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_CONCEPTS);
    return raw ? JSON.parse(raw) : ['c-3cs', 'c-porter-5', 'c-mece', 'c-profitability-tree'];
  } catch {
    return ['c-3cs', 'c-porter-5', 'c-mece'];
  }
}

export function toggleBookmarkConcept(conceptId: string): boolean {
  try {
    const bookmarks = getBookmarkedConcepts();
    let updated: string[];
    let isBookmarked: boolean;
    if (bookmarks.includes(conceptId)) {
      updated = bookmarks.filter((id) => id !== conceptId);
      isBookmarked = false;
    } else {
      updated = [...bookmarks, conceptId];
      isBookmarked = true;
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_CONCEPTS, JSON.stringify(updated));
    return isBookmarked;
  } catch {
    return false;
  }
}

export function getStreak(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    return raw ? parseInt(raw, 10) : 4;
  } catch {
    return 4;
  }
}
