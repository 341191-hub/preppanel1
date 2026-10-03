export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Partner';
export type InterviewerPersona = 'friendly' | 'neutral' | 'challenging' | 'partner' | 'pressure';

export interface UserProfile {
  name: string;
  degree: string;
  college: string;
  targetRoles: string[];
  targetFirms: string[];
  confidenceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  interviewDate?: string;
  dailyPrepMinutes: number;
  struggles: string[];
  cvText?: string;
  onboardingCompleted: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'candidate' | 'interviewer' | 'system';
  text: string;
  timestamp: string;
  isNudge?: boolean;
  nudgeLevel?: 1 | 2 | 3;
  interviewerThoughts?: string; // Private reasoning kept during interview, shown optionally in review
}

export interface GuesstimateItem {
  id: string;
  title: string;
  category: 'Consumer Goods' | 'Transport & Infrastructure' | 'Media & Tech' | 'Urban & Retail' | 'Agriculture & Rural' | 'Healthcare & Services';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  objective?: string;
  suggestedApproach: 'Top-down' | 'Bottom-up' | 'Demand-side' | 'Supply-side' | 'Hybrid';
  benchmarkNumbers: { label: string; value: string; notes?: string }[];
  referenceSolution: {
    steps: string[];
    finalNumber: string;
    keyAssumptions: string[];
    sanityCheckMethod: string;
    casebookReference: string;
  };
  interviewerTips: string[];
}

export interface CaseDataPoint {
  category: string;
  questionTrigger: string[];
  disclosure: string;
}

export interface CaseItem {
  id: string;
  title: string;
  type: 'Profitability' | 'Market Entry' | 'Growth Strategy' | 'Pricing' | 'GTM' | 'Operations / Turnaround' | 'M&A';
  industry: 'FMCG' | 'Automotive & EV' | 'Technology & SaaS' | 'Pharmaceuticals' | 'Aviation' | 'Retail & E-comm' | 'BFSI' | 'Healthcare';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Partner';
  prompt: string;
  clientContext: string;
  initialClarifications: string;
  hiddenDataPoints: CaseDataPoint[];
  referenceFramework: string[];
  rootCause: string;
  recommendedActions: string[];
  risksAndNextSteps: string[];
  casebookReference: string;
}

export interface EvaluationReport {
  overallScore: number; // 0 - 10
  dimensions: {
    structure: number;
    assumptions: number;
    calculations: number;
    businessJudgement: number;
    communication: number;
    interviewerEngagement: number;
    synthesis?: number;
    sanityCheck?: number;
  };
  finalEstimateGiven?: string;
  referenceEstimate?: string;
  orderOfMagnitudeCheck?: 'Exact' | 'Within Reasonable Bound' | 'Slightly Off' | 'Orders of Magnitude Off';
  whatYouDidWell: string[];
  whatToImprove: string[];
  interviewerPerception: string;
  betterApproach: string;
  actionPlanNext7Days: string[];
  mistakesIdentified: {
    type: 'Conceptual' | 'Framework' | 'Structure' | 'Calculation' | 'Assumption' | 'Communication' | 'Business Judgement';
    description: string;
    fix: string;
  }[];
}

export interface QuizQuestion {
  id: string;
  category: 'Fundamentals' | 'Frameworks' | 'Finance & Accounting' | 'Marketing' | 'Economics' | 'Guesstimate Concepts' | 'Case Concepts' | 'Behavioural';
  type: 'mcq' | 'true_false' | 'multi_select' | 'scenario';
  question: string;
  options: string[];
  correctAnswer: number | number[]; // index or indices
  explanation: string;
  casebookReference: string;
  interviewTip: string;
}

export interface MistakeLogEntry {
  id: string;
  timestamp: string;
  exerciseTitle: string;
  exerciseType: 'Guesstimate' | 'Case' | 'Quiz' | 'Behavioural' | 'Mock';
  category: 'Conceptual' | 'Framework' | 'Structure' | 'Calculation' | 'Assumption' | 'Communication' | 'Business Judgement';
  whatIDid: string;
  whatWasExpected: string;
  whyItMattered: string;
  howToAvoid: string;
  practiceRecommendation: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  category: 'Consulting Basics' | 'Business Concepts' | 'Frameworks' | 'Guesstimates' | 'Case Solving' | 'Industry Knowledge' | 'Finance & Accounting' | 'Marketing' | 'Economics';
  definition: string;
  keyPoints: string[];
  diagramDescription?: string;
  whenToUse: string;
  example: string;
  commonMistakes: string[];
  casebookReference: string;
}

export interface BehaviouralQuestion {
  id: string;
  question: string;
  category: 'Personal' | 'Fit for Consulting' | 'Leadership & Teamwork' | 'Adversity & Failure' | 'Ethics & Decision Making';
  whatInterviewerLooksFor: string[];
  goodStructure: string;
  trapsToAvoid: string[];
  sampleProbingQuestions: string[];
}
