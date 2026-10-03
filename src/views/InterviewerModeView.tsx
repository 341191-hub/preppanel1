import React, { useState } from 'react';
import {
  UserPlus,
  Send,
  HelpCircle,
  CheckCircle,
  Eye,
  Info,
  Sparkles,
  Loader2,
  Lock,
} from 'lucide-react';
import { CASE_BANK } from '../data/casebookData';
import { ChatMessage, CaseItem } from '../types';

export const InterviewerModeView: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(CASE_BANK[0].id);
  const currentCase = CASE_BANK.find((c) => c.id === selectedCaseId) || CASE_BANK[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-cand-1',
      sender: 'interviewer', // In this mode, "interviewer" is the USER! We'll style accordingly
      text: `Hello! I'm ready. Please give me the case prompt when you're ready.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    // User is the interviewer
    const userInterviewerMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'candidate', // We treat user as speaker
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMsgs = [...messages, userInterviewerMsg];
    setMessages(newMsgs);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/interview/ai-candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseTitle: currentCase.title,
          casePrompt: currentCase.prompt,
          userInterviewerMessage: text,
          transcript: newMsgs.map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const candidateSpeech: ChatMessage = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'interviewer', // Rendered on candidate side
          text: data.candidateSpeech,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          interviewerThoughts: data.candidateThoughts,
        };
        setMessages((prev) => [...prev, candidateSpeech]);
      }
    } catch {
      const fallback: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'interviewer',
        text: "Thank you for that context. To begin, could I clarify whether the profit decline is driven primarily by falling revenues or rising operational costs?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallback]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-amber-400">Interviewer Mode</div>
            <h2 className="text-sm font-bold text-white">
              YOU are the Interviewer · AI is the Candidate
            </h2>
          </div>
        </div>

        <select
          value={selectedCaseId}
          onChange={(e) => {
            setSelectedCaseId(e.target.value);
            setMessages([
              {
                id: 'init-cand-1',
                sender: 'interviewer',
                text: `Hello! I'm ready. Please give me the case prompt when you're ready.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
          }}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
        >
          {CASE_BANK.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 flex overflow-hidden pt-4 gap-4">
        {/* Left: Interviewer Cheat Sheet & Hidden Facts */}
        <div className="w-96 shrink-0 hidden md:flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-4 overflow-y-auto space-y-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1">
              Your Case Master Sheet
            </div>
            <h3 className="text-sm font-bold text-white">{currentCase.title}</h3>
            <p className="text-xs text-slate-300 mt-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-amber-300">Case Prompt: </span>
              {currentCase.prompt}
            </p>
          </div>

          <button
            onClick={() => handleSendPrompt(currentCase.prompt)}
            className="w-full rounded-lg bg-amber-500/20 border border-amber-500/40 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-colors"
          >
            Read Case Prompt to Candidate
          </button>

          {/* Hidden Facts to Release */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Data to Disclose When Candidate Inquires:
            </div>
            <div className="space-y-2">
              {currentCase.hiddenDataPoints.map((dp, idx) => (
                <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5 text-xs">
                  <div className="font-semibold text-amber-300">{dp.category}</div>
                  <div className="text-slate-300 mt-1">{dp.disclosure}</div>
                  <button
                    onClick={() => handleSendPrompt(dp.disclosure)}
                    className="mt-2 text-[10px] text-amber-400 hover:text-amber-300 underline"
                  >
                    Send this fact to candidate →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Root cause */}
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-xs">
            <div className="font-bold text-emerald-400 mb-1">Root Cause / Solution:</div>
            <p className="text-slate-300">{currentCase.rootCause}</p>
          </div>
        </div>

        {/* Right: Live Interview with Candidate */}
        <div className="flex-1 flex flex-col rounded-xl border border-slate-800 bg-[#090e1a] overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900/60 px-4 py-2.5 text-xs flex justify-between items-center">
            <span className="font-bold text-white">Live Candidate Simulation</span>
            <span className="text-[11px] text-slate-400">
              Listen to candidate's structure and challenge weak points
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => {
              const isAiCandidate = m.sender === 'interviewer';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isAiCandidate ? 'items-start' : 'items-end'}`}
                >
                  <div className="text-[10px] text-slate-500 mb-1 px-1">
                    {isAiCandidate ? 'MBA Candidate' : 'You (Interviewer)'} · {m.timestamp}
                  </div>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isAiCandidate
                        ? 'border border-slate-700/80 bg-slate-900 text-slate-100'
                        : 'border border-amber-500/30 bg-amber-500/10 text-amber-100'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-400" />
                <span>Candidate is formulating their answer...</span>
              </div>
            )}
          </div>

          {/* Input for user interviewer */}
          <div className="border-t border-slate-800 p-3 bg-slate-900/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask the candidate: 'How would you structure this?', or answer their data question..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
