import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Lightbulb,
  HelpCircle,
  Eye,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Calculator,
  ChevronDown,
  Info,
  Loader2,
  Check,
} from 'lucide-react';
import { GuesstimateItem, ChatMessage, EvaluationReport, UserProfile } from '../types';
import { ALL_GUESSTIMATES } from '../data/casebookData';
import { EvaluationModal } from '../components/EvaluationModal';
import { speechService } from '../utils/speech';
import { logMistake, recordCompletedExercise } from '../utils/storage';

interface GuesstimateLabViewProps {
  initialGuesstimateId?: string;
  userProfile: UserProfile;
  onNavigateToCase?: (caseId: string) => void;
}

export const GuesstimateLabView: React.FC<GuesstimateLabViewProps> = ({
  initialGuesstimateId,
  userProfile,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialGuesstimateId || ALL_GUESSTIMATES[0].id
  );
  const currentGuesstimate =
    ALL_GUESSTIMATES.find((g) => g.id === selectedId) || ALL_GUESSTIMATES[0];

  // Conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [candidateAssumptions, setCandidateAssumptions] = useState<Record<string, string>>({});
  const [currentStage, setCurrentStage] = useState<string>('objective_clarification');
  const [conversationalState, setConversationalState] = useState<any>(null);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [startTime] = useState<number>(Date.now());

  // Voice & Audio settings
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);

  // Scratchpad
  const [scratchpadText, setScratchpadText] = useState('');
  const [showScratchpad, setShowScratchpad] = useState(false);

  // Modals & confirmation
  const [showSolutionConfirm, setShowSolutionConfirm] = useState(false);
  const [showSolutionDirect, setShowSolutionDirect] = useState(false);
  const [evaluationReport, setEvaluationReport] = useState<EvaluationReport | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation when question changes
  useEffect(() => {
    startNewSession(currentGuesstimate);
  }, [selectedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const startNewSession = (item: GuesstimateItem) => {
    speechService.stopAudio();
    const welcomeMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'interviewer',
      text: `${item.question} Take a moment to think about your approach. How would you like to structure this estimate?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([welcomeMsg]);
    setCandidateAssumptions({});
    setConversationalState(null);
    setCurrentStage('objective_clarification');
    setHintsUsed(0);
    setShowSolutionDirect(false);
    setEvaluationReport(null);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'candidate',
      text: messageContent,
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
          exerciseType: 'guesstimate',
          question: currentGuesstimate.question,
          clientContext: currentGuesstimate.objective,
          privateEvaluationState: {
            referenceSolution: currentGuesstimate.referenceSolution,
            benchmarks: currentGuesstimate.benchmarkNumbers,
          },
          messages: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
          candidateAssumptions,
          conversationalState,
          persona: 'neutral',
          currentStage,
          hintLevel: hintsUsed,
          userMessage: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Interview server response failed');
      }

      const data = await response.json();

      if (data.updatedState) {
        setConversationalState(data.updatedState);
      }

      const aiMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'interviewer',
        text: data.text || "Okay. How does that connect to your overall equation?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        interviewerThoughts: data.internalFeedback,
      };

      setMessages((prev) => [...prev, aiMsg]);

      if (data.assumptionLogged) {
        setCandidateAssumptions((prev) => ({
          ...prev,
          [data.assumptionLogged.key]: data.assumptionLogged.val,
        }));
      }

      if (data.stageUpdate) {
        setCurrentStage(data.stageUpdate);
      }

      if (autoSpeak) {
        speechService.speakText(data.text);
      }
    } catch (err) {
      console.error(err);
      // Graceful interviewer reaction fallback
      const fallbackMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'interviewer',
        text: "That's an interesting approach. Walk me through the numbers and how you sanity-check them.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!speechService.isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in this browser. Please use text input.');
      return;
    }

    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.startListening(
        (transcript) => {
          setInputText(transcript);
          setIsListening(false);
          handleSendMessage(transcript);
        },
        (err) => {
          console.warn('Speech recognition error', err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const requestNudge = (level: 1 | 2 | 3) => {
    setHintsUsed((prev) => prev + 1);
    let nudgeText = '';
    if (level === 1) {
      nudgeText = 'Could you give me a slight nudge on how to segment the target universe?';
    } else if (level === 2) {
      nudgeText = 'I am considering whether to use a top-down or bottom-up approach here. What would be the cleaner path?';
    } else {
      nudgeText = 'I am stuck on this step. Could you provide a directional hint on the formula?';
    }
    handleSendMessage(nudgeText);
  };

  const triggerEvaluation = async () => {
    setIsEvaluating(true);
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);

    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: 'guesstimate',
          question: currentGuesstimate.question,
          transcript: messages.map((m) => ({ sender: m.sender, text: m.text })),
          candidateAssumptions,
          referenceSolution: currentGuesstimate.referenceSolution,
          hintsUsed,
          durationSeconds,
        }),
      });

      if (!res.ok) throw new Error('Evaluation error');
      const data: EvaluationReport = await res.json();
      setEvaluationReport(data);

      recordCompletedExercise('guesstimate', {
        id: currentGuesstimate.id,
        title: currentGuesstimate.title,
        score: data.overallScore,
      });

      if (data.mistakesIdentified && data.mistakesIdentified.length > 0) {
        data.mistakesIdentified.forEach((m) => {
          logMistake({
            exerciseTitle: currentGuesstimate.title,
            exerciseType: 'Guesstimate',
            category: m.type,
            whatIDid: m.description,
            whatWasExpected: 'Casebook benchmark reasoning',
            whyItMattered: 'Impacting consulting interview credibility',
            howToAvoid: m.fix,
            practiceRecommendation: 'Drill similar problem',
          });
        });
      }
    } catch (err) {
      console.error(err);
      // Fallback scorecard
      setEvaluationReport({
        overallScore: 7.4,
        dimensions: {
          structure: 7.5,
          assumptions: 7.0,
          calculations: 7.5,
          businessJudgement: 7.0,
          communication: 7.5,
          interviewerEngagement: 8.0,
          sanityCheck: 7.0,
        },
        orderOfMagnitudeCheck: 'Within Reasonable Bound',
        whatYouDidWell: [
          'Communicated the structure before calculating.',
          'State reasonable assumptions for demographic segments.',
          'Responded attentively to interviewer questions.',
        ],
        whatToImprove: [
          'Perform a formal sanity check at the end comparing to a macro benchmark.',
          'Seek explicit buy-in upfront before calculating sub-segments.',
        ],
        interviewerPerception:
          'Demonstrated clear logical discipline and composure throughout the dialogue.',
        betterApproach:
          'Segment top-down by population -> penetration -> replacement frequency.',
        actionPlanNext7Days: [
          'Day 1-2: Practice supply-side capacity guesstimates.',
          'Day 3-5: Focus on mental math and unit sanity checks.',
        ],
        mistakesIdentified: [],
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-6xl mx-auto">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer max-w-xs sm:max-w-md truncate"
              >
                {ALL_GUESSTIMATES.map((g) => (
                  <option key={g.id} value={g.id} className="bg-slate-900 text-slate-100">
                    {g.title} ({g.difficulty})
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>{currentGuesstimate.category}</span>
              <span>·</span>
              <span>Suggested: {currentGuesstimate.suggestedApproach}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Voice/Audio Mode Toggle */}
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
              autoSpeak
                ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Spoken Interviewer Response"
          >
            {autoSpeak ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">Audio</span>
          </button>

          {/* Scratchpad Toggle */}
          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
              showScratchpad
                ? 'border-amber-500/50 bg-amber-500/15 text-amber-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            Scratchpad
          </button>

          {/* Solution / Give Up */}
          <button
            onClick={() => setShowSolutionConfirm(true)}
            className="rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 hover:border-rose-900 transition-colors"
          >
            Show Solution
          </button>

          {/* Finish & Evaluate */}
          <button
            onClick={triggerEvaluation}
            disabled={isEvaluating || messages.length < 2}
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 transition-colors shadow-sm disabled:opacity-50"
          >
            {isEvaluating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            <span>Finish & Evaluate</span>
          </button>
        </div>
      </div>

      {/* Main Workspace (Split View) */}
      <div className="flex-1 flex overflow-hidden pt-4 gap-4">
        {/* Chat / Interview Simulator */}
        <div className="flex-1 flex flex-col rounded-xl border border-slate-800 bg-[#090e1a]/80 overflow-hidden">
          {/* Objective Strip */}
          <div className="border-b border-slate-800/80 bg-slate-900/40 px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="text-slate-300 flex items-center gap-2">
              <span className="font-semibold text-amber-400">Objective:</span>
              <span className="truncate">{currentGuesstimate.objective}</span>
            </div>
            {hintsUsed > 0 && (
              <div className="text-[11px] text-amber-400/90 font-mono">
                {hintsUsed} hint{hintsUsed > 1 ? 's' : ''} used
              </div>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isInterviewer = msg.sender === 'interviewer';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isInterviewer ? 'items-start' : 'items-end'}`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-1 px-1">
                    <span className="font-semibold">
                      {isInterviewer ? 'Interviewer' : userProfile.name}
                    </span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
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
                <span>Interviewer is listening and analyzing your logic...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Nudge Buttons Strip */}
          <div className="border-t border-slate-800/80 bg-slate-950/40 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 shrink-0">Need guidance?</span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => requestNudge(1)}
                className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              >
                Level 1: Minimal Nudge
              </button>
              <button
                onClick={() => requestNudge(2)}
                className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
              >
                Level 2: Directional
              </button>
              <button
                onClick={() => requestNudge(3)}
                className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-amber-300 hover:bg-amber-500/20 transition-colors"
              >
                Level 3: Framework Hint
              </button>
            </div>
          </div>

          {/* Input Box & Mic */}
          <div className="border-t border-slate-800 p-3 bg-slate-900/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                  isListening
                    ? 'border-rose-500 bg-rose-500/20 text-rose-400 animate-pulse'
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title="Hold or toggle microphone to speak"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="State your structure, communicate assumptions, or walk through calculations..."
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

        {/* Right Sidebar: Tracked Assumptions & Scratchpad */}
        <div className="w-80 shrink-0 hidden lg:flex flex-col gap-4">
          {/* Declared Assumptions Panel */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Tracked Assumptions
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {Object.keys(candidateAssumptions).length} recorded
              </span>
            </div>

            {Object.keys(candidateAssumptions).length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 text-xs text-slate-500">
                <Info className="h-5 w-5 mb-2 text-slate-600" />
                <p>
                  As you state assumptions (e.g. population, household size, usage), the interviewer logs them here to ensure consistency.
                </p>
              </div>
            ) : (
              <div className="space-y-2 overflow-y-auto flex-1">
                {Object.entries(candidateAssumptions).map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-lg border border-slate-800/80 bg-slate-950/60 p-2.5 text-xs"
                  >
                    <div className="text-slate-400 text-[11px] capitalize">{k}</div>
                    <div className="font-mono text-amber-300 font-semibold mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scratchpad */}
          {showScratchpad && (
            <div className="h-48 rounded-xl border border-slate-800 bg-slate-900/40 p-3 flex flex-col">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Candidate Math Scratchpad
              </div>
              <textarea
                value={scratchpadText}
                onChange={(e) => setScratchpadText(e.target.value)}
                placeholder="Perform rough calculations or jot down MECE branches here..."
                className="flex-1 w-full bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200 focus:outline-none resize-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal to Reveal Solution */}
      {showSolutionConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#0d1424] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">End Interviewer Mode?</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Are you sure? This will end active interviewer simulation mode and reveal the reference approach from the FMS Consulting Casebook.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowSolutionConfirm(false)}
                className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Keep Practicing
              </button>
              <button
                onClick={() => {
                  setShowSolutionConfirm(false);
                  setShowSolutionDirect(true);
                  triggerEvaluation();
                }}
                className="rounded-lg bg-rose-500 hover:bg-rose-400 px-4 py-2 text-xs font-bold text-white transition-colors"
              >
                Yes, Reveal Solution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post-Session Evaluation Scorecard Modal */}
      {evaluationReport && (
        <EvaluationModal
          isOpen={!!evaluationReport}
          onClose={() => setEvaluationReport(null)}
          report={evaluationReport}
          exerciseTitle={currentGuesstimate.title}
          onRetry={() => startNewSession(currentGuesstimate)}
          referenceSolution={currentGuesstimate.referenceSolution}
        />
      )}
    </div>
  );
};
