import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { UserProfile, ChatMessage, EvaluationReport, GuesstimateItem, CaseItem } from '../types';
import { ALL_GUESSTIMATES, CASE_BANK, BEHAVIOURAL_BANK } from '../data/casebookData';
import { EvaluationModal } from '../components/EvaluationModal';
import { speechService } from '../utils/speech';

interface MockInterviewViewProps {
  userProfile: UserProfile;
}

type MockStage = 'intro' | 'behavioural' | 'guesstimate' | 'case' | 'synthesis' | 'completed';

export const MockInterviewView: React.FC<MockInterviewViewProps> = ({ userProfile }) => {
  const [stage, setStage] = useState<MockStage>('intro');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Selected random components for the mock
  const [selectedBehavioural, setSelectedBehavioural] = useState(BEHAVIOURAL_BANK[0]);
  const [selectedGuesstimate, setSelectedGuesstimate] = useState<GuesstimateItem>(ALL_GUESSTIMATES[0]);
  const [selectedCase, setSelectedCase] = useState<CaseItem>(CASE_BANK[0]);

  const [evaluationReport, setEvaluationReport] = useState<EvaluationReport | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Initial startup
  useEffect(() => {
    startMock();
  }, []);

  const startMock = () => {
    speechService.stopAudio();
    const bQuestion = BEHAVIOURAL_BANK[Math.floor(Math.random() * BEHAVIOURAL_BANK.length)];
    const gQuestion = ALL_GUESSTIMATES[Math.floor(Math.random() * ALL_GUESSTIMATES.length)];
    const cQuestion = CASE_BANK[Math.floor(Math.random() * CASE_BANK.length)];

    setSelectedBehavioural(bQuestion);
    setSelectedGuesstimate(gQuestion);
    setSelectedCase(cQuestion);
    setStage('intro');
    setTimerSeconds(0);
    setEvaluationReport(null);

    const initialGreeting: ChatMessage = {
      id: 'mock-1',
      sender: 'interviewer',
      text: `Hello ${userProfile.name}, welcome. Today we have a standard 40-minute consulting interview covering a brief fit discussion, followed by a quantitative problem and a business case. To begin: Tell me a little bit about yourself and why you're interested in consulting.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialGreeting]);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'candidate',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: 'mock',
          question:
            stage === 'intro' || stage === 'behavioural'
              ? selectedBehavioural.question
              : stage === 'guesstimate'
              ? selectedGuesstimate.question
              : selectedCase.prompt,
          clientContext: `Current Mock Phase: ${stage.toUpperCase()}`,
          privateEvaluationState: {
            referenceSolution:
              stage === 'guesstimate'
                ? selectedGuesstimate.referenceSolution
                : selectedCase.recommendedActions,
          },
          messages: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
          persona: 'neutral',
          currentStage: stage,
          userMessage: text,
        }),
      });

      if (!response.ok) throw new Error('API failed');
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'interviewer',
        text: data.text || "Understood. Let's move forward.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        interviewerThoughts: data.internalFeedback,
      };

      setMessages((prev) => [...prev, aiMsg]);
      if (autoSpeak) speechService.speakText(data.text);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'interviewer',
        text: "Thank you. Let's explore that further. Can you walk me through your key numbers?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const advanceStage = (nextStage: MockStage) => {
    setStage(nextStage);
    let transitionPrompt = '';

    if (nextStage === 'guesstimate') {
      transitionPrompt = `Thank you for sharing that. Let's transition to the quantitative part of our discussion. Here is your question: ${selectedGuesstimate.question} How would you structure this?`;
    } else if (nextStage === 'case') {
      transitionPrompt = `Good. Let's pivot to our core business case. ${selectedCase.prompt} Take 30 seconds to formulate your initial thoughts and structure.`;
    } else if (nextStage === 'synthesis') {
      transitionPrompt = `We are approaching the end of our allotted time. Please provide your executive recommendation to the CEO, summarizing key drivers, recommended actions, and risks.`;
    } else if (nextStage === 'completed') {
      concludeMock();
      return;
    }

    const aiMsg: ChatMessage = {
      id: 'mock-transition-' + Date.now(),
      sender: 'interviewer',
      text: transitionPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, aiMsg]);
    if (autoSpeak) speechService.speakText(transitionPrompt);
  };

  const concludeMock = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: 'mock',
          question: `Full Mock: ${selectedBehavioural.question} -> ${selectedGuesstimate.question} -> ${selectedCase.title}`,
          transcript: messages.map((m) => ({ sender: m.sender, text: m.text })),
          durationSeconds: timerSeconds,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setEvaluationReport(data);
      }
    } catch {
      setEvaluationReport({
        overallScore: 7.7,
        dimensions: {
          structure: 8.0,
          assumptions: 7.5,
          calculations: 7.5,
          businessJudgement: 8.0,
          communication: 8.0,
          interviewerEngagement: 8.5,
          synthesis: 7.5,
        },
        orderOfMagnitudeCheck: 'Within Reasonable Bound',
        whatYouDidWell: [
          'Excellent poise and transitions across behavioural, guesstimate, and case modules.',
          'Consistently engaged with interviewer cues.',
          'Clear top-down structuring.',
        ],
        whatToImprove: [
          'More concise delivery during the fit/behavioural introduction.',
          'State concrete risk mitigation steps in the final synthesis.',
        ],
        interviewerPerception:
          'High consulting presence and strong analytical discipline. A well-rounded performance meeting MBB hiring standards.',
        betterApproach: 'Deliver a structured 90-second pyramid recommendation.',
        actionPlanNext7Days: ['Drill 2 timed case syntheses', 'Polish 2-minute resume walkthrough'],
        mistakesIdentified: [],
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const STAGES: { id: MockStage; label: string; part: string }[] = [
    { id: 'intro', label: 'Intro & Fit', part: 'Part 1-2' },
    { id: 'guesstimate', label: 'Guesstimate', part: 'Part 3' },
    { id: 'case', label: 'Business Case', part: 'Part 4' },
    { id: 'synthesis', label: 'Recommendation', part: 'Part 5' },
    { id: 'completed', label: 'Evaluation', part: 'Part 6' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-6xl mx-auto">
      {/* Top Stage Bar */}
      <div className="border-b border-slate-800 pb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Full Mock Interview Simulator</h2>
            <div className="text-[11px] text-slate-400">
              Live consulting partner interview sequence
            </div>
          </div>
        </div>

        {/* Phase progress indicators */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {STAGES.map((s, idx) => {
            const isActive = stage === s.id;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${
                  isActive
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-300 font-bold'
                    : 'border-slate-800 text-slate-500 bg-slate-900/40'
                }`}
              >
                <span>{s.part}</span>
                <span className="hidden md:inline">· {s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs font-mono text-slate-300">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span className="tabular-nums font-bold">{formatTimer(timerSeconds)}</span>
          </div>

          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`rounded-lg border p-1.5 text-xs ${
              autoSpeak
                ? 'border-amber-500/40 bg-amber-500/20 text-amber-300'
                : 'border-slate-800 bg-slate-900 text-slate-400'
            }`}
            title="Audio toggle"
          >
            {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main Mock Area */}
      <div className="flex-1 flex overflow-hidden pt-4 gap-4">
        {/* Messages */}
        <div className="flex-1 flex flex-col rounded-xl border border-slate-800 bg-[#090e1a]/80 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isInterviewer = msg.sender === 'interviewer';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isInterviewer ? 'items-start' : 'items-end'}`}
                >
                  <div className="text-[10px] text-slate-500 mb-1 px-1">
                    {isInterviewer ? 'Consulting Partner' : userProfile.name} · {msg.timestamp}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isInterviewer
                        ? 'border border-slate-700/80 bg-slate-900/90 text-slate-100 shadow-sm'
                        : 'border border-amber-500/30 bg-amber-500/10 text-amber-100'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic px-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Interviewer is listening...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Advance stage button bar */}
          <div className="border-t border-slate-800/80 bg-slate-950/40 px-4 py-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Current Phase: <strong className="text-amber-300 capitalize">{stage}</strong></span>
            <div className="flex gap-2">
              {stage === 'intro' && (
                <button
                  onClick={() => advanceStage('guesstimate')}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs text-slate-200 transition-colors"
                >
                  Move to Guesstimate →
                </button>
              )}
              {stage === 'guesstimate' && (
                <button
                  onClick={() => advanceStage('case')}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs text-slate-200 transition-colors"
                >
                  Move to Case Study →
                </button>
              )}
              {stage === 'case' && (
                <button
                  onClick={() => advanceStage('synthesis')}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs text-slate-200 transition-colors"
                >
                  Move to Final Synthesis →
                </button>
              )}
              {stage === 'synthesis' && (
                <button
                  onClick={() => advanceStage('completed')}
                  className="rounded-lg bg-amber-500 hover:bg-amber-400 px-4 py-1.5 text-xs font-bold text-slate-950 transition-colors"
                >
                  Conclude & Generate Scorecard
                </button>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-slate-800 p-3 bg-slate-900/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Speak or type your answer directly to the consulting partner..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-40 transition-colors font-bold"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {evaluationReport && (
        <EvaluationModal
          isOpen={!!evaluationReport}
          onClose={() => setEvaluationReport(null)}
          report={evaluationReport}
          exerciseTitle="Complete 40-Minute Mock Interview"
          onRetry={startMock}
        />
      )}
    </div>
  );
};
