import React from 'react';
import { 
  Building2, 
  FileCheck, 
  MapPin, 
  CalendarClock, 
  ShieldAlert, 
  ScrollText, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  PlayCircle 
} from 'lucide-react';

export default function OverviewView({ setActiveTab, setCurrentRole, language = 'en', t = (k) => k }) {
  const isHi = language === 'hi';

  return (
    <div className="space-y-6">
      {/* Official AICTE Banner */}
      <div className="bg-linear-to-r from-[#003366] via-[#004080] to-[#002244] text-white p-6 rounded-lg shadow-md border-b-4 border-amber-500 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-amber-400 text-blue-950 px-2.5 py-0.5 rounded text-xs font-black uppercase tracking-wider mb-2">
            <span>SMART INDIA HACKATHON 2025/2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {isHi 
              ? 'अगली पीढ़ी AICTE अनुमोदन कार्यप्रणाली एवं विधिक अनुपालन निगरानी मंच' 
              : 'NextGen AICTE Approval Workflow & Compliance Monitoring Platform'}
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm mt-2 leading-relaxed">
            {isHi
              ? 'आधिकारिक AICTE पोर्टल का एक सुगम, GIGW-प्रमाणित विस्तार जो बहु-स्तरीय आवेदन रूटिंग (संवीक्षा ➔ EVC ➔ SAC/SHC) को स्वचालित करता है, 30-वर्षीय भूमि पट्टों की निरंतर निगरानी करता है, और लाइव क्षेत्रीय लंबित स्थिति हीटमैप प्रदान करता है।'
              : 'A pixel-accurate drop-in extension to the official AICTE Portal that automates multi-stage application routing (Scrutiny ➔ EVC ➔ SAC/SHC), continuously monitors land lease and undertaking validity with countdown timers, and provides live regional pendency heatmaps.'}
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <button
              onClick={() => {
                setActiveTab('role_dashboard');
                setCurrentRole('REGIONAL_OFFICER');
              }}
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-extrabold text-xs px-4 py-2 rounded shadow-sm flex items-center space-x-1.5 cursor-pointer"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{isHi ? '4-मिनट विजेता डेमो शुरू करें' : 'Launch 4-Minute Winning Demo'}</span>
            </button>
            <button
              onClick={() => setActiveTab('heatmap')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3.5 py-2 rounded border border-white/30 flex items-center space-x-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHi ? 'क्षेत्रीय हीटमैप देखें' : 'Inspect Regional Heatmap'}</span>
            </button>
          </div>
        </div>

        {/* Subtle Watermark */}
        <div className="absolute right-4 bottom-2 opacity-10 text-white font-black text-7xl select-none hidden md:block">
          AICTE
        </div>
      </div>

      {/* 4-Minute SIH Demo Script Cheat-Sheet Card */}
      <div className="bg-white border-2 border-amber-400 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500 text-blue-950 text-xs font-black px-2 py-0.5 rounded">
              {isHi ? 'SIH प्रस्तुति चीट-शीट' : 'SIH PRESENTATION CHEAT-SHEET'}
            </span>
            <h2 className="text-sm font-bold text-gray-900">
              {isHi ? '4-मिनट निर्णायक डेमो प्रवाह (कदम-दर-कदम प्रस्तुति)' : 'The 4-Minute Winning Demo Flow (Step-by-Step for Judges)'}
            </h2>
          </div>
          <span className="text-xs text-gray-500 font-mono">{isHi ? 'डोजियर खंड 6' : 'Dossier Section 6'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 text-xs">
          {/* Minute 1 */}
          <div className="p-3 bg-blue-50/60 rounded border border-blue-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-blue-950">{isHi ? 'मिनट 1' : 'Minute 1'}</span>
              <span className="text-[10px] bg-blue-200 text-blue-900 px-1.5 rounded font-bold">
                {isHi ? 'पोर्टल एवं RBAC' : 'Portal & RBAC'}
              </span>
            </div>
            <p className="text-gray-700 text-[11px]">
              {isHi
                ? 'आधिकारिक AICTE रूप-रंग दिखाएं। ऊपर-दाएं ड्रॉपडाउन से डेमो भूमिका बदलें (संस्थान, अधिकारी, ब्यूरो प्रमुख)।'
                : 'Show official AICTE look-and-feel. Switch demo role via top-right dropdown (Institution, Officer, Bureau Head).'}
            </p>
            <button
              onClick={() => { setActiveTab('role_dashboard'); setCurrentRole('INSTITUTION'); }}
              className="text-[#003366] font-bold text-[10px] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              {isHi ? 'मिनट 1 शुरू करें' : 'Start Minute 1'} <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Minute 2 */}
          <div className="p-3 bg-red-50/60 rounded border border-red-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-red-950">{isHi ? 'मिनट 2' : 'Minute 2'}</span>
              <span className="text-[10px] bg-red-200 text-red-900 px-1.5 rounded font-bold">
                {isHi ? 'कमी निवारण चक्र' : 'Deficiency Loop'}
              </span>
            </div>
            <p className="text-gray-700 text-[11px]">
              {isHi
                ? 'अधिकारी बनकर APH धारा 4.1 के तहत कमी दर्ज करें। संस्थान दस्तावेज़ पुनः अपलोड करेगा, अधिकारी स्वीकृत करेगा ➔ स्वतः EVC कतार!'
                : 'Select Officer role, flag missing Fire Safety NOC with APH Clause 4.1. Institution re-uploads, officer approves ➔ Auto EVC leap!'}
            </p>
            <button
              onClick={() => { setActiveTab('role_dashboard'); setCurrentRole('REGIONAL_OFFICER'); }}
              className="text-red-700 font-bold text-[10px] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              {isHi ? 'मिनट 2 चलाएं' : 'Run Minute 2'} <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Minute 3 */}
          <div className="p-3 bg-purple-50/60 rounded border border-purple-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-purple-950">{isHi ? 'मिनट 3' : 'Minute 3'}</span>
              <span className="text-[10px] bg-purple-200 text-purple-900 px-1.5 rounded font-bold">
                {isHi ? 'क्षेत्रीय SLA निगरानी' : 'Regional SLA'}
              </span>
            </div>
            <p className="text-gray-700 text-[11px]">
              {isHi
                ? 'ब्यूरो प्रमुख बनें। उत्तरी क्षेत्र रेड अलर्ट (14 लंबित) बनाम पश्चिमी ग्रीन दिखाएं। तत्काल स्तर-2 चेतावनी जारी करें।'
                : 'Switch to Bureau Head. Show Northern Region Red Alert (14 overdue) vs Western Green. Dispatch instant Level-2 escalation.'}
            </p>
            <button
              onClick={() => { setActiveTab('heatmap'); setCurrentRole('BUREAU_HEAD'); }}
              className="text-purple-700 font-bold text-[10px] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              {isHi ? 'मिनट 3 चलाएं' : 'Run Minute 3'} <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Minute 4 */}
          <div className="p-3 bg-amber-50/60 rounded border border-amber-300 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-amber-950">{isHi ? 'मिनट 4' : 'Minute 4'}</span>
              <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 rounded font-bold">
                {isHi ? 'पट्टा प्रहरी एवं लेजर' : 'Lease Sentinel'}
              </span>
            </div>
            <p className="text-gray-700 text-[11px]">
              {isHi
                ? 'काशी इंस्टीट्यूट का 28 दिनों में समाप्त होने वाला 30-वर्षीय पट्टा दिखाएं। सुरक्षित SHA-256 ऑडिट लेजर सत्यापित करें।'
                : "Show College XYZ's 30-year lease expiring in 28 days with seat expansion locked. Check tamper-evident SHA-256 audit ledger."}
            </p>
            <button
              onClick={() => { setActiveTab('sentinel'); }}
              className="text-amber-800 font-bold text-[10px] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              {isHi ? 'मिनट 4 चलाएं' : 'Run Minute 4'} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Feature Deep-Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#003366]">
            <FileCheck className="w-5 h-5" />
            <h3 className="font-bold text-sm text-gray-900">
              {isHi ? 'विन्यास योग्य गतिशील कार्यप्रणाली इंजन' : 'Configurable Dynamic Workflow Engine'}
            </h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {isHi
              ? 'APH 2024–27 के अनुरूप लचीले JSON नियमों द्वारा आवेदनों को विभिन्न चरणों (केवल संवीक्षा, संवीक्षा + EVC, EVC + SAC) में स्वचालित रूप से रूट करता है।'
              : 'Routes applications across custom stage matrices (Scrutiny Only, Scrutiny + EVC, EVC + SAC/SHC) governed by flexible JSON-logic rules conforming to APH 2024–27 specifications.'}
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-red-700">
            <MapPin className="w-5 h-5" />
            <h3 className="font-bold text-sm text-gray-900">
              {isHi ? 'क्षेत्रीय लंबित स्थिति हीटमैप एवं चेतावनी प्रणाली' : 'Regional Pendency Heatmap & Escalation'}
            </h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {isHi
              ? 'AICTE के सभी 8 क्षेत्रीय कार्यालयों में SLA उल्लंघनों की पहचान करता है। निर्धारित सीमा से अधिक समय तक फाइल रुकने पर स्वतः बहु-स्तरीय चेतावनी प्रेषित करता है।'
              : 'Identifies SLA breaches across all 8 AICTE Regional Offices. Automatically triggers multi-tier cascading alerts when applications stagnate in an officer inbox beyond prescribed limits.'}
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-amber-600">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-bold text-sm text-gray-900">
              {isHi ? '30-वर्षीय भूमि पट्टा एवं अनुपालन प्रहरी' : '30-Year Land Lease & Compliance Sentinel'}
            </h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {isHi
              ? 'सक्रिय पृष्ठभूमि प्रक्रिया T-90, 60, 30 और 7-दिवसीय स्वचालित चेतावनी के माध्यम से 30-वर्षीय पंजीकृत भूमि पट्टों की निरंतर वैधता निगरानी करती है।'
              : 'Proactive background daemon continuously clocks validity for 30-year registered land deeds and conditional undertakings with T-90, 60, 30, and 7-day automated triggers.'}
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-emerald-700">
            <ScrollText className="w-5 h-5" />
            <h3 className="font-bold text-sm text-gray-900">
              {isHi ? 'SHA-256 सुरक्षित डिजिटल ऑडिट लेजर' : 'SHA-256 Tamper-Proof Audit Ledger'}
            </h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {isHi
              ? 'प्रत्येक प्रशासनिक हस्ताक्षर, कमी टिप्पणी एवं दस्तावेज़ अपलोड को क्रिप्टोग्राफ़िक रूप से हैश कर श्रृंखला में सुरक्षित किया जाता है।'
              : 'Every administrative sign-off, deficiency remark, and document upload is cryptographically hashed and chained to prevent legal disputes while maintaining statutory human authority.'}
          </p>
        </div>
      </div>
    </div>
  );
}
