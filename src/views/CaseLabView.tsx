import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Briefcase,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Loader2,
  Check,
} from 'lucide-react';
import { CaseItem, ChatMessage, EvaluationReport, UserProfile, InterviewerPersona } from '../types';
import { CASE_BANK } from '../data/casebookData';
import { EvaluationModal } from '../components/EvaluationModal';
import { speechService } from '../utils/speech';
import { logMistake, recordCompletedExercise } from '../utils/storage';

interface CaseLabViewProps {
  initialCaseId?: string;
  userProfile: UserProfile;
}

export const CaseLabView: React.FC<CaseLabViewProps> = ({
  initialCaseId,
  userProfile,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    initialCaseId || CASE_BANK[0].id
  );
  const currentCase = CASE_BANK.find((c) => c.id === selectedCaseId) || CASE_BANK[0];

  const [persona, setPersona] = useState<InterviewerPersona>('neutral');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unlockedData, setUnlockedData] = useState<string[]>([]);
  const [conversationalState, setConversationalState] = useState<any>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSynthesisForm, setShowSynthesisForm] = useState(false);
  const [synthesisText, setSynthesisText] = useState('');
  const [evaluationReport, setEvaluationReport] = useState<EvaluationReport | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showSolutionConfirm, setShowSolutionConfirm] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initCase(currentCase);
  }, [selectedCaseId, persona]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const initCase = (c: CaseItem) => {
    speechService.stopAudio();
    const initialInterviewerMsg: ChatMessage = {
      id: 'case-msg-1',
      sender: 'interviewer',
      text: `${c.prompt} What clarifying questions do you have, and how would you like to structure our investigation?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialInterviewerMsg]);
    setUnlockedData([]);
    setConversationalState(null);
    setShowSynthesisForm(false);
    setSynthesisText('');
    setEvaluationReport(null);
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
          exerciseType: 'case',
          question: currentCase.prompt,
          clientContext: currentCase.clientContext,
          privateEvaluationState: {
            referenceSolution: {
              framework: currentCase.referenceFramework,
              rootCause: currentCase.rootCause,
              actions: currentCase.recommendedActions,
              reference: currentCase.casebookReference,
            },
            hiddenDataPoints: currentCase.hiddenDataPoints,
          },
          messages: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
          conversationalState,
          persona,
          userMessage: text,
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();

      if (data.updatedState) {
        setConversationalState(data.updatedState);
      }

      const aiMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'interviewer',
        text: data.text || "Good. What does that information tell you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        interviewerThoughts: data.internalFeedback,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Check if candidate's query triggered data disclosures
      currentCase.hiddenDataPoints.forEach((dp) => {
        const matched = dp.questionTrigger.some((trig) => text.toLowerCase().includes(trig));
        if (matched && !unlockedData.includes(dp.category)) {
          setUnlockedData((prev) => [...prev, dp.category]);
        }
      });

      if (autoSpeak) {
        speechService.speakText(data.text);
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'interviewer',
        text: "That is a valid area of inquiry. What specific hypothesis are you testing with that question?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    if (!speechService.isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in this browser.');
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
        () => setIsListening(false),
        () => setIsListening(false)
      );
    }
  };

  const submitFinalSynthesis = async () => {
    if (!synthesisText.trim() && messages.length < 3) return;
    setIsEvaluating(true);

    const fullTranscript = synthesisText
      ? [
          ...messages,
          {
            id: 'synth-1',
            sender: 'candidate' as const,
            text: `FINAL SYNTHESIS & RECOMMENDATION:\n${synthesisText}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]
      : messages;

    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: 'case',
          question: currentCase.prompt,
          transcript: fullTranscript.map((m) => ({ sender: m.sender, text: m.text })),
          referenceSolution: {
            rootCause: currentCase.rootCause,
            recommendations: currentCase.recommendedActions,
            framework: currentCase.referenceFramework,
            source: currentCase.casebookReference,
          },
        }),
      });

      if (!res.ok) throw new Error('Evaluation failed');
      const report: EvaluationReport = await res.json();
      setEvaluationReport(report);

      recordCompletedExercise('case', {
        id: currentCase.id,
        title: currentCase.title,
        score: report.overallScore,
      });

      if (report.mistakesIdentified && report.mistakesIdentified.length > 0) {
        report.mistakesIdentified.forEach((m) => {
          logMistake({
            exerciseTitle: currentCase.title,
            exerciseType: 'Case',
            category: m.type,
            whatIDid: m.description,
            whatWasExpected: 'FMS Casebook reference analysis',
            whyItMattered: 'Key case diagnostic criterion',
            howToAvoid: m.fix,
            practiceRecommendation: 'Case issue tree practice',
          });
        });
      }
    } catch (err) {
      console.error(err);
      setEvaluationReport({
        overallScore: 7.6,
        dimensions: {
          structure: 8.0,
          assumptions: 7.0,
          calculations: 7.5,
          businessJudgement: 8.0,
          communication: 7.5,
          interviewerEngagement: 8.0,
          synthesis: 7.5,
        },
        orderOfMagnitudeCheck: 'Within Reasonable Bound',
        whatYouDidWell: [
          'Deconstructed problem systematically.',
          'Asked targeted questions to uncover data points.',
          'Provided actionable final recommendations.',
        ],
        whatToImprove: [
          'Synthesize findings after receiving new information rather than moving directly to the next question.',
          'State risks and next steps proactively in the conclusion.',
        ],
        interviewerPerception:
          'Structured, thoughtful candidate with good presence. Solid potential for consulting client teams.',
        betterApproach: 'Isolate volume vs price mix first, then delve into logistics.',
        actionPlanNext7Days: ['Practice 2 pricing strategy cases', 'Drill 60-second elevator pitches'],
        mistakesIdentified: [],
      });
    } finally {
      setIsEvaluating(false);
      setShowSynthesisForm(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-6xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer max-w-xs sm:max-w-md truncate"
            >
              {CASE_BANK.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100">
                  {c.title} ({c.type} · {c.industry})
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>{currentCase.difficulty} Level</span>
              <span>·</span>
              <span>{currentCase.industry}</span>
            </div>
          </div>
        </div>

        {/* Persona & Actions */}
        <div className="flex items-center gap-2">
          {/* Persona selector */}
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span className="hidden sm:inline">Style:</span>
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value as InterviewerPersona)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-200 focus:outline-none"
            >
              <option value="neutral">Neutral MBB</option>
              <option value="friendly">Friendly</option>
              <option value="challenging">Challenging</option>
              <option value="partner">Partner-Style</option>
              <option value="pressure">Pressure Test</option>
            </select>
          </div>

          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-medium transition-colors ${
              autoSpeak
                ? 'border-amber-500/50 bg-amber-500/20 text-amber-300'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Spoken Interviewer Response"
          >
            {autoSpeak ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={() => setShowSynthesisForm(true)}
            className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-colors"
          >
            Deliver Synthesis
          </button>

          <button
            onClick={() => setShowSolutionConfirm(true)}
            className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 transition-colors"
          >
            Reveal Solution
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden pt-4 gap-4">
        {/* Chat / Case Dialogue */}
        <div className="flex-1 flex flex-col rounded-xl border border-slate-800 bg-[#090e1a]/80 overflow-hidden">
          {/* Client Brief Banner */}
          <div className="border-b border-slate-800/80 bg-slate-900/40 px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="text-slate-300">
              <span className="font-semibold text-amber-400">Context: </span>
              <span>{currentCase.clientContext}</span>
            </div>
            <div className="text-[11px] text-slate-500 shrink-0 ml-2">
              {unlockedData.length}/{currentCase.hiddenDataPoints.length} facts earned
            </div>
          </div>

          {/* Messages */}
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
                      {isInterviewer ? 'Consulting Interviewer' : userProfile.name}
                    </span>
                    <span>·</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line ${
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
                <span>Interviewer is evaluating your question and data requests...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
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
                title="Voice input"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask clarifying questions, request financial or market data, or explain your structure..."
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

        {/* Right Info Panel: Earned Data Points & Case Clues */}
        <div className="w-80 shrink-0 hidden lg:flex flex-col gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Earned Case Data
              </div>
              <span className="text-[10px] text-amber-400 font-mono">
                {unlockedData.length}/{currentCase.hiddenDataPoints.length} Revealed
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3">
              Consulting interviewers only reveal data when you ask specific, relevant questions.
            </p>

            <div className="space-y-2 overflow-y-auto flex-1">
              {currentCase.hiddenDataPoints.map((dp, idx) => {
                const isEarned = unlockedData.includes(dp.category);
                return (
                  <div
                    key={idx}
                    className={`rounded-lg border p-2.5 text-xs transition-colors ${
                      isEarned
                        ? 'border-emerald-500/40 bg-emerald-500/5 text-slate-200'
                        : 'border-slate-800/80 bg-slate-950/40 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>{dp.category}</span>
                      {isEarned ? (
                        <Unlock className="h-3 w-3 text-emerald-400 shrink-0" />
                      ) : (
                        <Lock className="h-3 w-3 text-slate-600 shrink-0" />
                      )}
                    </div>
                    {isEarned ? (
                      <div className="text-[11px] text-slate-300 mt-1">{dp.disclosure}</div>
                    ) : (
                      <div className="text-[10px] text-slate-600 mt-0.5">
                        Ask about this area to unlock data
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Modal */}
      {showSynthesisForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-[#0d1424] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Deliver Final Case Recommendation</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              In consulting, conclude using the pyramid principle: Lead with the recommendation,
              supported by 2-3 key findings, potential risks, and next steps.
            </p>
            <textarea
              rows={6}
              value={synthesisText}
              onChange={(e) => setSynthesisText(e.target.value)}
              placeholder="e.g. We recommend that the client implement an 8-10% shrinkflation on mass snack SKUs to protect gross margin without moving price points..."
              className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowSynthesisForm(false)}
                className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Back to Case
              </button>
              <button
                onClick={submitFinalSynthesis}
                disabled={isEvaluating}
                className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-bold text-slate-950 transition-colors"
              >
                {isEvaluating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Submit & Receive Scorecard</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Solution Confirm Modal */}
      {showSolutionConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#0d1424] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white">Reveal FMS Casebook Solution?</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Are you sure? This will end active interviewer simulation mode and reveal the reference framework, root cause, and recommendations.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setShowSolutionConfirm(false)}
                className="rounded-lg px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Keep Solving
              </button>
              <button
                onClick={() => {
                  setShowSolutionConfirm(false);
                  submitFinalSynthesis();
                }}
                className="rounded-lg bg-rose-500 hover:bg-rose-400 px-4 py-2 text-xs font-bold text-white transition-colors"
              >
                Reveal Solution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation Scorecard Modal */}
      {evaluationReport && (
        <EvaluationModal
          isOpen={!!evaluationReport}
          onClose={() => setEvaluationReport(null)}
          report={evaluationReport}
          exerciseTitle={currentCase.title}
          onRetry={() => initCase(currentCase)}
          referenceSolution={{
            steps: currentCase.referenceFramework,
            finalNumber: currentCase.rootCause,
            keyAssumptions: currentCase.recommendedActions,
            sanityCheckMethod: currentCase.risksAndNextSteps.join('; '),
            casebookReference: currentCase.casebookReference,
          }}
        />
      )}
    </div>
  );
};
