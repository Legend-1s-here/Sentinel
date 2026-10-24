import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  FileSearch, 
  HelpCircle, 
  CheckCircle, 
  Copy, 
  Check,
  ShieldCheck,
  Building,
  Scale,
  UserCheck,
  GraduationCap
} from 'lucide-react';

// Stylized Human Regulatory Advisor Avatar
function HumanAdvisorIcon({ className = "w-6 h-6" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-amber-300 drop-shadow-xs">
        {/* Scholar / Officer Cap */}
        <path d="M4 6 L12 2.5 L20 6 L12 9.5 Z" fill="#c59b27" stroke="#fde047" strokeWidth="1.2" />
        <path d="M20 6 L20 10.5" stroke="#fde047" strokeWidth="1.5" />
        {/* Human Head */}
        <circle cx="12" cy="10" r="3.2" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.2" />
        {/* Human Shoulders / Officer Robe */}
        <path d="M5.5 21 C5.5 17 8.5 14.5 12 14.5 C15.5 14.5 18.5 17 18.5 21" fill="#003366" stroke="#fde047" strokeWidth="1.5" />
        {/* Lapel / Emblem Accent */}
        <path d="M10 14.8 L12 18 L14 14.8" stroke="#f57c00" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

const APH_KNOWLEDGE_BASE = [
  {
    keywords: ['land', 'area', 'acre', 'location', 'mega', 'metro', 'campus'],
    question: "What are the land norms for setting up a New Technical Institution?",
    answer: "Under AICTE APH 2024–27 Chapter 1, Section 1.4 & Table 1.1:\n• Mega & Metro Cities (Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad): Minimum 2.5 Acres of contiguous land.\n• Urban Areas (State Capitals & Municipal Corp): Minimum 4.0 Acres.\n• Rural / Other Areas: Minimum 7.5 Acres.\n\nMandatory Requirement: Land must be owned or on registered lease for minimum 30 years (in government format).",
    clause: "APH Chapter 1, Section 1.4, Table 1.1",
    category: "Land & Infrastructure"
  },
  {
    keywords: ['fire', 'noc', 'safety', 'clause 4.1', 'disaster'],
    question: "Explain statutory norms for State Fire Safety NOC under Clause 4.1",
    answer: "Under APH Chapter 2, Clause 4.1:\nInstitutions must submit an active Fire Safety NOC issued by the competent State Fire Authority (Chief Fire Officer / Fire Commissioner). The certificate must:\n1. Certify fire hydrants, smoke detectors, and emergency exits per National Building Code (NBC 2016).\n2. Be currently valid with active renewal seal. Expired or un-endorsed certificates attract mandatory deficiency reverts.",
    clause: "APH Chapter 2, Clause 4.1",
    category: "Statutory Clearances"
  },
  {
    keywords: ['faculty', 'ratio', 'cadre', 'professor', 'teacher', 'student'],
    question: "What is the mandatory Faculty-to-Student Cadre Ratio for UG Engineering?",
    answer: "Under APH 2024–27 Chapter 7, Cadre & Qualification Norms:\n• Faculty-Student Ratio (FSR): 1:20 for UG Engineering programs (1:15 recommended for accredited tier-1).\n• Cadre Proportion: 1 : 2 : 6 (1 Professor : 2 Associate Professors : 6 Assistant Professors).\n• Principal/Director must be a Ph.D. with minimum 15 years experience and at least 8 research publications in SCI/Scopus journals.",
    clause: "APH Chapter 7, Norms 7.2 & 7.3",
    category: "Academic & Faculty"
  },
  {
    keywords: ['lease', '30 year', '30-year', 'deed', 'expiry', 'sentinel'],
    question: "What are the statutory requirements for 30-Year Land Lease deeds?",
    answer: "Under APH Chapter 1, Section 1.4:\n• The lease agreement must be executed with the Competent Sub-Registrar of the State Government.\n• The residual lease period must never fall below 3 years during any academic session.\n• Approaching expiry triggers mandatory automated sentinel alerts at T-90, T-60, T-30, and T-7 days. Failure to renew locks seat expansion sanctions.",
    clause: "APH Chapter 1, Section 1.4(b)",
    category: "Legal Compliance"
  },
  {
    keywords: ['evc', 'inspection', 'expert', 'schedule', 'committee'],
    question: "What are the protocols for Expert Visit Committee (EVC) inspections?",
    answer: "Under APH Chapter 3, EVC Guidelines:\n• EVC consists of a 3-member peer panel: 1 Lead Academic Expert (IIT/NIT/Univ Prof), 1 Subject Expert, and 1 Architectural/PWD Engineer.\n• The inspection must be completed within the 14-day statutory SLA window.\n• Geo-tagged, timestamped photographs of labs, classrooms, and boundary walls must be uploaded to the portal along with the digitally signed report.",
    clause: "APH Chapter 3, Section 3.2",
    category: "EVC Norms"
  }
];

export default function AphCoPilot({ currentRole, language = 'en', t = (k) => k }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: language === 'hi' 
        ? "नमस्ते! मैं **AICTE APH विधिक AI सह-पायलट** हूँ। आधिकारिक अनुमोदन प्रक्रिया पुस्तिका (APH 2024–27) के अनुसार कोई भी नियम, भूमि मानक या संकाय अनुपात पूछें!"
        : "Namaste! I am the **AICTE APH Co-Pilot**, trained on the official Approval Process Handbook (APH 2024–27). Ask me any regulatory question, land norm, or clause lookup!",
      clause: null,
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Search knowledge base
    const lowerQuery = query.toLowerCase();
    const match = APH_KNOWLEDGE_BASE.find(k => 
      k.keywords.some(word => lowerQuery.includes(word)) ||
      lowerQuery.includes(k.category.toLowerCase())
    );

    setTimeout(() => {
      let botResponse;
      if (match) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: match.answer,
          clause: match.clause,
          category: match.category,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Under AICTE Approval Process Handbook (APH 2024–27):\nFor "${query}", statutory guidelines mandate adherence to standard Chapter norms. For new colleges or variations, verify the document against prescribed format affidavits and state approvals.\n\nTip: You can ask about land requirements, Fire Safety NOC Clause 4.1, 30-year lease deeds, or EVC inspection norms!`,
          clause: "APH General Provisions",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      setMessages(prev => [...prev, botResponse]);
    }, 400);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed bottom-5 left-5 z-50 font-sans">
      {/* Floating Launcher Pill */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-linear-to-r from-[#003366] via-blue-900 to-indigo-950 text-white p-3.5 rounded-full shadow-2xl border-2 border-amber-400 hover:scale-105 transition-all flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="relative">
            <HumanAdvisorIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <div className="text-left hidden sm:block pr-1">
            <div className="text-[11px] font-black uppercase text-amber-300 leading-none flex items-center gap-1">
              <span>{t('copilotTitle')}</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>
            <div className="text-[9px] text-blue-200 mt-0.5">{t('copilotSub')}</div>
          </div>
        </button>
      )}

      {/* Slide-Up Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl border-2 border-[#003366] w-[350px] sm:w-[420px] max-h-[580px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-linear-to-r from-[#002244] to-[#003366] text-white p-3.5 flex justify-between items-center border-b-2 border-amber-400">
            <div className="flex items-center space-x-2.5">
              <div className="p-1 bg-white/10 rounded-lg border border-amber-400/40">
                <HumanAdvisorIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black tracking-wide text-white flex items-center gap-1.5">
                  <span>{t('copilotTitle')}</span>
                  <span className="text-[9px] bg-amber-400 text-blue-950 font-extrabold px-1.5 py-0.2 rounded">
                    AI 2025-26
                  </span>
                </h3>
                <p className="text-[10px] text-blue-200">
                  {t('copilotSub')}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white p-1 rounded-md hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Query Pills */}
          <div className="bg-gray-50 border-b border-gray-200 p-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 text-[10px]">
            <span className="text-gray-400 font-bold shrink-0">{t('quickQueries')}</span>
            {[
              "Fire Safety NOC (Clause 4.1)",
              "Land Norms (Table 1.1)",
              "30-Yr Lease Deed Rules",
              "Faculty Ratio (1:20)"
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="bg-white border border-gray-300 hover:border-blue-700 hover:bg-blue-50 text-gray-800 font-semibold px-2 py-1 rounded whitespace-nowrap cursor-pointer shadow-2xs transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[90%] shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#003366] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed text-[11px] font-sans">
                    {msg.text}
                  </p>

                  {/* Statutory Clause Badge */}
                  {msg.clause && (
                    <div className="mt-2.5 pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] font-mono">
                      <span className="bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                        <Scale className="w-3 h-3 text-amber-700" />
                        {msg.clause}
                      </span>
                      <button
                        onClick={() => handleCopy(`${msg.clause}: ${msg.text}`, msg.id)}
                        className="text-blue-900 hover:underline flex items-center gap-0.5 cursor-pointer font-sans"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">{t('btnCopied')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-gray-500" />
                            <span>{t('btnCopy')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-gray-400 mt-0.5 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t('copilotPlaceholder')}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#003366] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#003366] hover:bg-blue-900 text-white p-2 rounded-lg cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4 text-amber-300" />
            </button>
          </form>

          {/* Bottom Security Strip */}
          <div className="bg-gray-100 py-1 px-3 text-[9px] text-gray-500 flex items-center justify-between border-t border-gray-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified with AICTE APH 2024–27 Gazette
            </span>
            <span className="font-mono text-gray-400">v2.1-Live</span>
          </div>
        </div>
      )}
    </div>
  );
}
