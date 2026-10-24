import React, { useState } from 'react';
import { 
  MapPin, 
  AlertOctagon, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Send, 
  ShieldAlert, 
  FileWarning, 
  Building, 
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { REGIONAL_PENDENCY_DATA } from '../data/mockData';
import IndiaRegionalMap from './IndiaRegionalMap';

export default function HeatmapView({ onAddAuditLog, language = 'en', t = (k) => k }) {
  const isHi = language === 'hi';
  const [selectedRegion, setSelectedRegion] = useState(REGIONAL_PENDENCY_DATA[0]); // Northern Region by default
  const [escalationSent, setEscalationSent] = useState(false);

  const handleTriggerEscalation = (regionName, officer) => {
    setEscalationSent(true);
    setTimeout(() => setEscalationSent(false), 5000);

    onAddAuditLog({
      actor: isHi ? 'शीर्ष ब्यूरो प्रमुख (नई दिल्ली मुख्यालय)' : 'Apex Bureau Head (New Delhi HQ)',
      role: isHi ? 'ब्यूरो एवं शीर्ष नेतृत्व' : 'Bureau & Apex Leadership',
      action: 'BUREAU_LEVEL_ESCALATION_TRIGGERED',
      applicationId: `REGIONAL-BREACH-${regionName.slice(0, 8)}`,
      remarks: isHi 
        ? `10-दिवसीय NeSDA SLA सीमा पार करने वाली 14 लंबित फाइलों हेतु ${officer} को स्तर-2 चेतावनी जारी।`
        : `Automated Level-2 escalation notice dispatched to ${officer} for 14 overdue files exceeding 10-day NeSDA SLA benchmark.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border-l-4 border-red-600 p-4 rounded-r shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-100 text-red-900 text-xs font-bold px-2 py-0.5 rounded border border-red-200">
              {isHi ? 'अखिल भारतीय शीर्ष शासन' : 'PAN-INDIA APEX GOVERNANCE'}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {isHi ? 'राष्ट्रीय ई-गवर्नेंस (NeSDA) लाइव फीड' : 'National e-Governance (NeSDA) Live Feed'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-1">
            {isHi ? 'वास्तविक समय क्षेत्रीय लंबित स्थिति हीटमैप एवं SLA निगरानी' : 'Real-Time Regional Pendency Heatmap & SLA Ageing Gauges'}
          </h2>
          <p className="text-xs text-gray-600">
            {isHi 
              ? 'AICTE के सभी 8 क्षेत्रीय कार्यालयों में स्वचालित बहु-स्तरीय निगरानी। विधिक समयसीमा समाप्त होने से पूर्व प्रसंस्करण बाधाओं को चिन्हित करता है।'
              : 'Automated multi-tier monitoring across all 8 AICTE Regional Offices. Pinpoints processing backlogs before statutory deadlines lapse.'}
          </p>
        </div>

        {/* Demo Script Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs max-w-sm">
          <p className="font-bold text-blue-900">{isHi ? 'मिनट 3 निर्णायक डेमो निर्देश:' : 'Minute 3 Winning Demo Cue:'}</p>
          <p className="text-blue-800 text-[11px] mt-0.5">
            {isHi 
              ? 'उत्तरी क्षेत्र को लाल (14 उल्लंघन) बनाम पश्चिमी क्षेत्र को हरे (0 उल्लंघन) में दिखाएं। तत्काल शीर्ष चेतावनी जारी करने हेतु बटन दबाएं।'
              : 'Highlight Northern Region in Red (14 breaches) vs Western Region in Green (0 breaches). Click "Trigger Escalation Notice"!'}
          </p>
        </div>
      </div>

      {/* National KPI Scorecards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-3.5 rounded-lg border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase">
            {isHi ? 'कुल प्राप्त आवेदन' : 'Total Applications Ingested'}
          </div>
          <div className="text-2xl font-black text-gray-900 mt-1">8,460</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">
            {isHi ? '↑ 12% शैक्षणिक वर्ष 2024 की तुलना में' : '↑ 12% vs Academic Year 2024'}
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase">
            {isHi ? 'निर्धारित SLA के भीतर' : 'Within Prescribed SLA'}
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">8,429</div>
          <div className="text-[10px] text-emerald-800 font-semibold mt-1">
            {isHi ? '99.63% अनुपालन दर' : '99.63% Compliance Rate'}
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-red-300 bg-red-50/30 shadow-2xs">
          <div className="text-[11px] font-bold text-red-700 uppercase">
            {isHi ? 'गंभीर SLA उल्लंघन (अतिदेय)' : 'Critical Overdue SLA Breaches'}
          </div>
          <div className="text-2xl font-black text-red-600 mt-1 flex items-center justify-between">
            <span>31</span>
            <AlertOctagon className="w-5 h-5 text-red-600 animate-pulse" />
          </div>
          <div className="text-[10px] text-red-700 font-semibold mt-1">
            {isHi ? '14 उत्तरी क्षेत्र में केंद्रित' : '14 concentrated in Northern Region'}
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase">
            {isHi ? 'औसत प्रसंस्करण समय (TAT)' : 'Avg. Processing Turnaround (TAT)'}
          </div>
          <div className="text-2xl font-black text-[#003366] mt-1">
            6.8 <span className="text-xs font-normal text-gray-500">{isHi ? 'दिन' : 'Days'}</span>
          </div>
          <div className="text-[10px] text-blue-800 font-semibold mt-1">
            {isHi ? 'स्वतः-रूटिंग द्वारा 60% तीव्र' : '60% Faster via Auto-Routing'}
          </div>
        </div>
      </div>

      {/* Escalation Success Alert */}
      {escalationSent && (
        <div className="p-3.5 bg-red-900 text-white rounded-lg shadow-lg text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-amber-300">
                {isHi ? '🚨 पदानुक्रमित स्तर-2 ब्यूरो चेतावनी प्रेषित!' : '🚨 Hierarchical Level-2 Bureau Escalation Dispatched!'}
              </p>
              <p className="text-red-100 text-[11px]">
                {isHi 
                  ? 'क्षेत्रीय निदेशक (कानपुर) तथा अधिकारी शर्मा को SMS एवं आधिकारिक ईमेल द्वारा उच्च प्राथमिकता SLA उल्लंघन चेतावनी प्रेषित। 24 घंटे में समीक्षा अनिवार्य।'
                  : 'High-priority SLA breach warning delivered via SMS & Official Email to Regional Director (RO Kanpur) and Officer Sharma. File review mandatory within 24 hours.'}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-red-800 px-2.5 py-1 rounded">DISPATCH-OK</span>
        </div>
      )}

      {/* Interactive Visual SVG Pan-India Regional Heatmap */}
      <IndiaRegionalMap
        regions={REGIONAL_PENDENCY_DATA}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        language={language}
        onTriggerEscalation={handleTriggerEscalation}
      />

      {/* Regional Cards Heatmap Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REGIONAL_PENDENCY_DATA.map((region) => {
          const isCritical = region.status === 'CRITICAL_BOTTLENECK';
          const isExemplary = region.status === 'EXEMPLARY';
          const isSelected = selectedRegion.region === region.region;

          return (
            <div
              key={region.region}
              onClick={() => setSelectedRegion(region)}
              className={`p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden ${
                isSelected ? 'ring-2 ring-[#003366] shadow-md' : 'hover:shadow-xs'
              } ${
                isCritical 
                  ? 'bg-red-50/70 border-red-300' 
                  : isExemplary 
                  ? 'bg-emerald-50/70 border-emerald-300' 
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Status Ribbon Tag */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    <MapPin className={`w-3.5 h-3.5 ${isCritical ? 'text-red-600' : isExemplary ? 'text-emerald-600' : 'text-blue-900'}`} />
                    {region.region}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">{region.states}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  isCritical 
                    ? 'bg-red-600 text-white animate-pulse' 
                    : isExemplary 
                    ? 'bg-emerald-700 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {isCritical 
                    ? (isHi ? 'गंभीर अड़चन' : 'CRITICAL BOTTLENECK')
                    : isExemplary 
                    ? (isHi ? '100% समयबद्ध' : '100% ON TRACK') 
                    : (isHi ? 'सामान्य' : 'NORMAL')}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-200/60 text-center">
                <div className="bg-white/80 p-1.5 rounded">
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">
                    {isHi ? 'कुल' : 'Total'}
                  </div>
                  <div className="font-bold text-gray-800 text-sm">{region.totalApplications}</div>
                </div>
                <div className="bg-white/80 p-1.5 rounded">
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">
                    {isHi ? 'प्रगति पर' : 'In Progress'}
                  </div>
                  <div className="font-bold text-blue-900 text-sm">{region.inProgress}</div>
                </div>
                <div className={`p-1.5 rounded ${isCritical ? 'bg-red-100' : 'bg-white/80'}`}>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">
                    {isHi ? 'अतिदेय' : 'Overdue'}
                  </div>
                  <div className={`font-black text-sm ${isCritical ? 'text-red-700' : 'text-gray-800'}`}>
                    {region.breachedSLA}
                  </div>
                </div>
              </div>

              {/* Bottleneck Callout */}
              <div className="mt-3 text-[11px] flex items-center justify-between text-gray-600">
                <span>{isHi ? 'औसत समय:' : 'Avg Turnaround:'} <strong>{region.avgProcessingDays} {isHi ? 'दिन' : 'Days'}</strong></span>
                <span className="text-[#003366] font-bold text-[10px] flex items-center gap-0.5">
                  {isHi ? 'विवरण देखें' : 'Inspect'} <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Drill-Down Panel for Selected Region */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-gray-200 pb-3">
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
              {isHi ? 'क्षेत्रीय डेस्क विस्तृत विश्लेषण' : 'Regional Desk Audit Drill-Down'}
            </span>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 mt-0.5">
              <span>{selectedRegion.region}</span>
              <span className="text-xs font-normal text-gray-500">({selectedRegion.states})</span>
            </h3>
          </div>

          {selectedRegion.breachedSLA > 0 && (
            <button
              onClick={() => handleTriggerEscalation(selectedRegion.region, selectedRegion.flaggedOfficer)}
              className="bg-red-700 hover:bg-red-800 text-white font-bold px-3.5 py-2 rounded text-xs flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isHi 
                  ? `शीर्ष ब्यूरो चेतावनी जारी करें (${selectedRegion.breachedSLA} फाइलें अतिदेय)` 
                  : `Trigger Apex Bureau Escalation (${selectedRegion.breachedSLA} Files Overdue)`}
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-gray-50 rounded border border-gray-200 space-y-2">
            <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              {isHi ? 'SLA समयावधि विश्लेषण:' : 'SLA Ageing Analysis:'}
            </h4>
            <div className="space-y-1.5 text-gray-700">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span>{isHi ? 'निर्धारित संवीक्षा SLA:' : 'Prescribed Scrutiny SLA:'}</span>
                <strong className="font-mono">{isHi ? '10 कैलेंडर दिन' : '10 Calendar Days'}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span>{isHi ? 'समयसीमा पार आवेदन:' : 'Overdue Applications:'}</span>
                <strong className="text-red-700 font-mono font-bold">
                  {selectedRegion.breachedSLA} {isHi ? 'फाइलें' : 'Files'}
                </strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span>{isHi ? 'पहचानी गई अड़चन / अधिकारी:' : 'Identified Bottleneck:'}</span>
                <span className="text-red-900 font-semibold">{selectedRegion.flaggedOfficer}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-blue-50/50 rounded border border-blue-200 space-y-2">
            <h4 className="font-bold text-blue-950 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#003366]" />
              {isHi ? 'NeSDA प्रदर्शन मानक:' : 'NeSDA Performance Benchmark:'}
            </h4>
            <p className="text-gray-700 text-[11px] leading-relaxed">
              {isHi
                ? 'राष्ट्रीय ई-गवर्नेंस सेवा वितरण आकलन (NeSDA) मानदंडों के अनुसार, स्वचालित SLA ट्रैकिंग नागरिक पारदर्शिता सुनिश्चित करती है। यदि कोई आवेदन किसी अधिकारी के खाते में 10 दिनों से अधिक रहता है तो क्षेत्रीय निदेशक को स्वतः सूचना भेजी जाती है, और 14वें दिन नई दिल्ली स्थित शीर्ष ब्यूरो को स्वतः अग्रेषित हो जाता है।'
                : "Under National e-Governance Service Delivery Assessment norms, automated SLA tracking guarantees citizen transparency. Applications remaining in an officer's queue past day 10 trigger automated notifications to the Regional Director, with day 14 auto-escalating to Apex Bureau in New Delhi."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
