import React, { useState } from 'react';
import {
  UserCheck,
  FileText,
  Sparkles,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { UserProfile, BehaviouralQuestion, ChatMessage } from '../types';
import { BEHAVIOURAL_BANK } from '../data/casebookData';

interface BehaviouralViewProps {
  userProfile: UserProfile;
}

export const BehaviouralView: React.FC<BehaviouralViewProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState<'bank' | 'cv_interviewer'>('cv_interviewer');
  const [selectedQuestion, setSelectedQuestion] = useState<BehaviouralQuestion>(
    BEHAVIOURAL_BANK[0]
  );

  // CV Interviewer state
  const [cvText, setCvText] = useState(
    `Led a team of 4 engineers and improved conversion rate by 22% in 6 months through personalization algorithms. Spearheaded client engagement for enterprise FinTech bank, reducing churn by 14% and saving $450k annually.`
  );
  const [extractedSpikes, setExtractedSpikes] = useState<string[]>([]);
  const [probingQuestions, setProbingQuestions] = useState<any[]>([]);
  const [isAnalyzingCv, setIsAnalyzingCv] = useState(false);

  // Interactive CV Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  const handleAnalyzeCv = async () => {
    if (!cvText.trim()) return;
    setIsAnalyzingCv(true);
    try {
      const res = await fetch('/api/interview/cv-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText }),
      });
      if (res.ok) {
        const data = await res.json();
        setExtractedSpikes(data.extractedSpikes || []);
        setProbingQuestions(data.probingQuestions || []);

        const initialPartnerMsg: ChatMessage = {
          id: 'cv-init',
          sender: 'interviewer',
          text: `I've reviewed your CV. You mention that you "${
            data.probingQuestions?.[0]?.claim || 'led a team and improved metrics by 22%'
          }". What was the baseline metric before your intervention, and how did you measure your personal impact vs the rest of the team?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages([initialPartnerMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingCv(false);
    }
  };

  const handleSendAnswer = async () => {
    if (!inputText.trim() || isAnswering) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'candidate',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMsgs = [...chatMessages, userMsg];
    setChatMessages(newMsgs);
    setInputText('');
    setIsAnswering(true);

    try {
      const res = await fetch('/api/interview/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType: 'behavioural',
          question: 'CV Cross-Examination',
          clientContext: `Candidate CV text:\n${cvText}`,
          messages: newMsgs.map((m) => ({ sender: m.sender, text: m.text })),
          persona: 'partner',
          userMessage: inputText,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'interviewer',
          text: data.text || "Good. What was the single biggest setback during this project?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, aiMsg]);
      }
    } catch {
      const fallback: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'interviewer',
        text: "That explains the outcome. What would have happened to the account if you had taken no action at all?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, fallback]);
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-amber-400" />
            <span>Behavioural & CV Interviewer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            FMS Casebook fit guide & rigorous consulting partner CV cross-examination.
          </p>
        </div>

        <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/60 p-1">
          <button
            onClick={() => setActiveTab('cv_interviewer')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'cv_interviewer'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CV Cross-Examiner
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'bank'
                ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Core HR Questions & STAR
          </button>
        </div>
      </div>

      {/* Tab 1: CV Cross-Examiner */}
      {activeTab === 'cv_interviewer' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CV Input & Spike Extraction */}
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Paste Your CV / Resume Bullets
                </label>
                <span className="text-[11px] text-slate-500">Private & Local</span>
              </div>
              <textarea
                rows={5}
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste lines from your CV highlighting achievements, metrics, and leadership roles..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              />
              <button
                onClick={handleAnalyzeCv}
                disabled={isAnalyzingCv || !cvText.trim()}
                className="mt-3 flex items-center justify-center gap-2 w-full rounded-xl bg-amber-500 hover:bg-amber-400 py-2.5 text-xs font-bold text-slate-950 transition-colors disabled:opacity-50"
              >
                {isAnalyzingCv ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                <span>Generate Probing Partner Questions</span>
              </button>
            </div>

            {/* Extracted Questions */}
            {probingQuestions.length > 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Consulting Partner Probe Targets
                </div>
                {probingQuestions.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs">
                    <div className="text-[11px] text-slate-400 font-semibold mb-1">
                      Claim: "{item.claim}"
                    </div>
                    <ul className="space-y-1 text-slate-300 pl-2">
                      {item.questions?.map((q: string, qIdx: number) => (
                        <li key={qIdx} className="list-disc list-inside">
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Chat with Consulting Partner */}
          <div className="rounded-xl border border-slate-800 bg-[#090e1a] flex flex-col h-[520px] overflow-hidden">
            <div className="border-b border-slate-800 bg-slate-900/50 px-4 py-3 flex items-center justify-between text-xs">
              <span className="font-bold text-white">Live Partner CV Interrogation</span>
              <span className="text-slate-400 text-[11px]">Testing Ownership & Baselines</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-xs text-slate-500 p-6">
                  <FileText className="h-8 w-8 text-slate-600 mb-2" />
                  <p>
                    Paste your CV bullets on the left and click "Generate Probing Partner Questions" to begin the cross-examination.
                  </p>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'interviewer' ? 'items-start' : 'items-end'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 mb-1">
                      {msg.sender === 'interviewer' ? 'Partner' : 'You'}
                    </div>
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        msg.sender === 'interviewer'
                          ? 'border border-slate-700 bg-slate-900 text-slate-200'
                          : 'border border-amber-500/30 bg-amber-500/10 text-amber-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {isAnswering && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                  <Loader2 className="h-3 w-3 animate-spin text-amber-400" />
                  <span>Partner is evaluating your defense...</span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 p-3 bg-slate-900/60">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendAnswer();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Defend your metrics, baseline, and individual ownership..."
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isAnswering}
                  className="rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-40"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Core HR Questions & STAR Rubric */}
      {activeTab === 'bank' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Frequent FMS Questions
            </div>
            {BEHAVIOURAL_BANK.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuestion(q)}
                className={`cursor-pointer rounded-lg border p-3 text-xs transition-colors ${
                  selectedQuestion.id === q.id
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-200'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-slate-200">{q.question}</div>
                <div className="text-[10px] text-slate-500 mt-1">{q.category}</div>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
            <div>
              <div className="text-[11px] text-amber-400 font-semibold uppercase">
                {selectedQuestion.category}
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                "{selectedQuestion.question}"
              </h3>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4">
              <div className="text-xs font-bold text-slate-300 mb-2">
                What Consulting Interviewers Look For:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedQuestion.whatInterviewerLooksFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-300 mb-1">
                Recommended Structure (STAR / Pyramid):
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-xs text-slate-300 leading-relaxed font-mono">
                {selectedQuestion.goodStructure}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-300 mb-1">Traps & Red Flags to Avoid:</div>
              <ul className="space-y-1 text-xs text-slate-400">
                {selectedQuestion.trapsToAvoid.map((trap, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
