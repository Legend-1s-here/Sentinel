import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  AlertOctagon, 
  Clock, 
  TrendingUp, 
  Send, 
  ShieldAlert, 
  FileWarning, 
  CheckCircle2, 
  Sliders, 
  ArrowUpRight, 
  Sparkles, 
  FileText 
} from 'lucide-react';
import { REGIONAL_PENDENCY_DATA, COMPLIANCE_SENTINEL_ITEMS } from '../../data/mockData';
import IndiaRegionalMap from '../IndiaRegionalMap';

export default function BureauDashboard({ onAddAuditLog, language = 'en', t = (k) => k }) {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState('heatmap');
  const [selectedRegion, setSelectedRegion] = useState(REGIONAL_PENDENCY_DATA[0]);
  const [escalationSent, setEscalationSent] = useState(false);
  const [showCauseSent, setShowCauseSent] = useState(null);

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
        : `Automated Level-2 escalation directive dispatched to ${officer} for 14 overdue files exceeding 10-day NeSDA SLA benchmark.`
    });
  };

  const handleIssueShowCause = (instName, permanentId) => {
    setShowCauseSent(instName);
    setTimeout(() => setShowCauseSent(null), 5000);

    onAddAuditLog({
      actor: isHi ? 'शीर्ष ब्यूरो प्रमुख (नई दिल्ली मुख्यालय)' : 'Apex Bureau Head (New Delhi HQ)',
      role: isHi ? 'ब्यूरो एवं शीर्ष नेतृत्व' : 'Bureau & Apex Leadership',
      action: 'SHOW_CAUSE_NOTICE_ISSUED',
      applicationId: permanentId,
      remarks: isHi 
        ? `${instName} को 30-वर्षीय पंजीकृत भूमि पट्टा समाप्ति के संबंध में कारण बताओ नोटिस जारी।`
        : `Issued statutory show-cause notice to ${instName} regarding imminent expiry of registered land lease deed.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Bureau Head Executive Banner */}
      <div className="bg-white border-t-4 border-red-700 p-5 rounded-lg shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            <Building className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-red-800 text-white px-2 py-0.5 rounded">
                {isHi ? 'शीर्ष प्राधिकरण मुख्यालय' : 'APEX AUTHORITY HQ'}
              </span>
              <span className="bg-red-100 text-red-900 text-[11px] font-bold px-2 py-0.5 rounded">
                {isHi ? 'अनुमोदन ब्यूरो • नई दिल्ली' : 'Approval Bureau • New Delhi'}
              </span>
              <span className="bg-gray-100 text-gray-800 text-[11px] font-mono px-2 py-0.5 rounded">
                {isHi ? 'नेल्सन मंडेला मार्ग मुख्यालय' : 'Nelson Mandela Marg HQ'}
              </span>
            </div>
            <h1 className="text-xl font-black text-gray-900 mt-1">
              {isHi 
                ? 'शीर्ष कार्यकारी पर्यवेक्षण एवं क्षेत्रीय शासन नियंत्रण पटल' 
                : 'Apex Executive Oversight & Regional Governance Console'}
            </h1>
            <p className="text-xs text-gray-600">
              {isHi 
                ? 'अखिल भारतीय 8 क्षेत्रीय कार्यालयों, NeSDA SLA अनुपालन एवं विधिक पट्टा समाप्ति की निरंतर निगरानी' 
                : 'Pan-India Monitoring of 8 Regional Offices, NeSDA SLA Compliance, and Statutory Expiries'}
            </p>
          </div>
        </div>

        {/* Demo Cue */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs max-w-xs">
          <p className="font-bold text-blue-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {isHi ? 'मिनट 3 निर्णायक डेमो निर्देश:' : 'Minute 3 Winning Demo Action:'}
          </p>
          <p className="text-blue-800 text-[11px] mt-0.5">
            {isHi 
              ? 'उत्तरी क्षेत्र (14 उल्लंघन) बनाम पश्चिमी क्षेत्र (100% समय पर) दिखाएं। तत्काल शीर्ष स्तर चेतावनी प्रेषित करने हेतु बटन दबाएं!' 
              : 'Point out Northern Region (14 breaches) vs Western (100% on schedule). Click "Trigger Apex Bureau Escalation" to demo instant hierarchical escalation!'}
          </p>
        </div>
      </div>

      {/* National KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase">
            {isHi ? 'कुल प्राप्त आवेदन' : 'Total Applications Ingested'}
          </div>
          <div className="text-2xl font-black text-gray-900 mt-1">8,460</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">
            {isHi ? '↑ 8 क्षेत्रीय कार्यालयों में 12% वृद्धि' : '↑ 12% across 8 Regional Offices'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase">
            {isHi ? 'निर्धारित SLA के भीतर' : 'Within Prescribed SLA'}
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">8,429</div>
          <div className="text-[10px] text-emerald-800 font-semibold mt-1">
            {isHi ? '99.63% अनुपालन दर' : '99.63% Compliance Rate'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-red-300 bg-red-50/40 shadow-2xs">
          <div className="text-[11px] font-bold text-red-700 uppercase">
            {isHi ? 'गंभीर SLA उल्लंघन' : 'Overdue SLA Breaches'}
          </div>
          <div className="text-2xl font-black text-red-600 mt-1 flex items-center justify-between">
            <span>31</span>
            <AlertOctagon className="w-5 h-5 text-red-600 animate-pulse" />
          </div>
          <div className="text-[10px] text-red-700 font-semibold mt-1">
            {isHi ? 'उत्तरी क्षेत्र (कानपुर) में 14 केंद्रित' : '14 in Northern Region (RO Kanpur)'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs">
          <div className="text-[11px] font-bold text-gray-500 uppercase">
            {isHi ? 'औसत प्रसंस्करण समय' : 'Avg Processing Turnaround'}
          </div>
          <div className="text-2xl font-black text-[#003366] mt-1">
            6.8 <span className="text-xs font-normal text-gray-500">{isHi ? 'दिन' : 'Days'}</span>
          </div>
          <div className="text-[10px] text-blue-800 font-semibold mt-1">
            {isHi ? 'मैन्युअल प्रणाली से 60% तीव्र' : '60% Faster than Manual Workflow'}
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center space-x-2 border-b border-gray-200 text-xs">
        <button
          onClick={() => setActiveTab('heatmap')}
          className={`px-4 py-2.5 font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'heatmap'
              ? 'border-red-700 text-red-800 bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <MapPin className="w-4 h-4 text-red-600" />
          <span>{isHi ? 'क्षेत्रीय लंबित हीटमैप' : 'Regional Pendency Heatmap'}</span>
        </button>

        <button
          onClick={() => setActiveTab('sentinel')}
          className={`px-4 py-2.5 font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'sentinel'
              ? 'border-red-700 text-red-800 bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>{isHi ? '30-वर्षीय भूमि पट्टा समाप्ति रडार' : '30-Year Lease Expiry Radar'}</span>
        </button>
      </div>

      {/* Escalation Notification Toast */}
      {escalationSent && (
        <div className="p-4 bg-red-900 text-white rounded-lg shadow-lg text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-amber-300">
                {isHi ? '🚨 शीर्ष ब्यूरो स्तर-2 चेतावनी प्रेषित!' : '🚨 Hierarchical Level-2 Bureau Escalation Dispatched!'}
              </p>
              <p className="text-red-100 text-[11px]">
                {isHi 
                  ? 'क्षेत्रीय निदेशक (कानपुर) एवं अधिकारी शर्मा को तत्काल एसएमएस एवं ईमेल द्वारा चेतावनी जारी। 24 घंटे में समीक्षा अनिवार्य।' 
                  : 'High-priority SLA breach warning delivered via SMS & Official Email to Regional Director (RO Kanpur) and Officer Sharma. File review mandatory within 24 hours.'}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-red-800 px-2.5 py-1 rounded">DISPATCHED-OK</span>
        </div>
      )}

      {showCauseSent && (
        <div className="p-4 bg-amber-900 text-white rounded-lg shadow-lg text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <AlertOctagon className="w-5 h-5 text-amber-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-amber-200">
                {isHi ? '⚠️ विधिक कारण बताओ नोटिस जारी!' : '⚠️ Statutory Show-Cause Directive Dispatched!'}
              </p>
              <p className="text-amber-100 text-[11px]">
                {showCauseSent} {isHi ? 'को 7-दिवसीय सुनवाई नोटिस प्रेषित किया गया।' : 'issued formal notice. 7-day hearing window opened.'}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-amber-800 px-2.5 py-1 rounded">ORDER-DELIVERED</span>
        </div>
      )}

      {/* VIEW 1: REGIONAL PENDENCY HEATMAP */}
      {activeTab === 'heatmap' && (
        <div className="space-y-6">
          {/* Interactive SVG Pan-India Heatmap */}
          <IndiaRegionalMap
            regions={REGIONAL_PENDENCY_DATA}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            language={language}
            onTriggerEscalation={handleTriggerEscalation}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REGIONAL_PENDENCY_DATA.map((region) => {
              const isCritical = region.status === 'CRITICAL_BOTTLENECK';
              const isExemplary = region.status === 'EXEMPLARY';
              const isSelected = selectedRegion.region === region.region;

              return (
                <div
                  key={region.region}
                  onClick={() => setSelectedRegion(region)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer relative ${
                    isSelected ? 'ring-2 ring-red-700 shadow-md' : 'hover:shadow-xs'
                  } ${
                    isCritical 
                      ? 'bg-red-50/70 border-red-300' 
                      : isExemplary 
                      ? 'bg-emerald-50/70 border-emerald-300' 
                      : 'bg-white border-gray-200'
                  }`}
                >
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
                      {isCritical ? (isHi ? 'गंभीर रुकावट' : 'CRITICAL BOTTLENECK') : isExemplary ? (isHi ? '100% समय पर' : '100% ON SCHEDULE') : (isHi ? 'सामान्य' : 'NORMAL')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-200/60 text-center">
                    <div className="bg-white/80 p-1.5 rounded">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">{isHi ? 'कुल' : 'Total'}</div>
                      <div className="font-bold text-gray-800 text-sm">{region.totalApplications}</div>
                    </div>
                    <div className="bg-white/80 p-1.5 rounded">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">{isHi ? 'प्रक्रियाधीन' : 'Processing'}</div>
                      <div className="font-bold text-blue-900 text-sm">{region.inProgress}</div>
                    </div>
                    <div className={`p-1.5 rounded ${isCritical ? 'bg-red-100' : 'bg-white/80'}`}>
                      <div className="text-[10px] text-gray-500 font-bold uppercase">{isHi ? 'लंबित' : 'Overdue'}</div>
                      <div className={`font-black text-sm ${isCritical ? 'text-red-700' : 'text-gray-800'}`}>
                        {region.breachedSLA}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] flex items-center justify-between text-gray-600">
                    <span>{isHi ? 'औसत अवधि:' : 'Avg Turnaround:'} <strong>{region.avgProcessingDays} {isHi ? 'दिन' : 'Days'}</strong></span>
                    <span className="text-red-700 font-bold text-[10px] flex items-center gap-0.5">
                      {isHi ? 'पटल जांचें' : 'Inspect Desk'} <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Drill-down for selected region */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-gray-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                  {isHi ? 'शीर्ष क्षेत्रीय पटल विस्तृत ऑडिट' : 'Apex Regional Desk Drill-Down'}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-0.5">
                  {selectedRegion.region} ({selectedRegion.states})
                </h3>
              </div>

              {selectedRegion.breachedSLA > 0 && (
                <button
                  onClick={() => handleTriggerEscalation(selectedRegion.region, selectedRegion.flaggedOfficer)}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2 rounded text-xs flex items-center space-x-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {isHi 
                      ? `शीर्ष स्तर चेतावनी जारी करें (${selectedRegion.breachedSLA} फाइलें लंबित)` 
                      : `Trigger Apex Bureau Escalation (${selectedRegion.breachedSLA} Files Overdue)`}
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-gray-50 rounded border border-gray-200 space-y-2">
                <h4 className="font-bold text-gray-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  {isHi ? 'SLA रुकावट विश्लेषण:' : 'SLA Bottleneck Investigation:'}
                </h4>
                <div className="space-y-1.5 text-gray-700">
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span>{isHi ? 'निर्धारित संवीक्षा SLA सीमा:' : 'Prescribed Scrutiny SLA:'}</span>
                    <strong className="font-mono">{isHi ? '10 कैलेंडर दिन' : '10 Calendar Days'}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span>{isHi ? 'समयसीमा पार आवेदन:' : 'Overdue Applications:'}</span>
                    <strong className="text-red-700 font-mono font-bold">{selectedRegion.breachedSLA} {isHi ? 'फाइलें' : 'Files'}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span>{isHi ? 'चिन्हित पटल अधिकारी:' : 'Identified Desk:'}</span>
                    <span className="text-red-900 font-semibold">{selectedRegion.flaggedOfficer}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50/60 rounded border border-blue-200 space-y-2">
                <h4 className="font-bold text-blue-950 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#003366]" />
                  {isHi ? 'कार्यकारी कार्रवाई निर्देश:' : 'Executive Action Directive:'}
                </h4>
                <p className="text-gray-700 text-[11px] leading-relaxed">
                  {isHi 
                    ? 'राष्ट्रीय ई-गवर्नेंस सेवा मानकों के तहत, 10 दिनों से अधिक लंबित फाइलें स्वतः क्षेत्रीय निदेशक को प्रेषित की जाती हैं। 14 दिनों तक लंबित रहने पर नई दिल्ली मुख्यालय द्वारा सीधा हस्तक्षेप किया जाता है।'
                    : 'Under NeSDA service standards, automated alerts escalate files remaining in a desk beyond day 10 to the Regional Director. Stagnation reaching day 14 triggers direct Apex Bureau intervention from New Delhi HQ.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: 30-YEAR LAND LEASE EXPIRES */}
      {activeTab === 'sentinel' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-xs">
            <h3 className="font-bold text-gray-800 text-sm">
              {isHi ? 'अखिल भारतीय 30-वर्षीय भूमि पट्टा एवं विधिक समाप्ति रडार' : 'Pan-India 30-Year Land Lease & Statutory Expiry Radar'}
            </h3>
            <p className="text-gray-600 text-[11px] mt-0.5">
              {isHi ? 'समाप्त पट्टों पर अनधिकृत संचालन को रोकने हेतु 10,000+ अनुमोदित संस्थानों की सक्रिय निगरानी करता है।' : 'Proactively tracks 10,000+ approved institutions to prevent unauthorized operations on expired deeds.'}
            </p>
          </div>

          <div className="space-y-3">
            {COMPLIANCE_SENTINEL_ITEMS.map((item) => {
              const isCritical = item.alertLevel === 'LEVEL_3_CRITICAL' || item.alertLevel === 'LEVEL_4_URGENT';

              return (
                <div 
                  key={item.id}
                  className={`p-4 rounded-lg border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs ${
                    isCritical ? 'bg-red-50/70 border-red-300' : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold bg-[#003366] text-white px-2 py-0.5 rounded text-[10px]">
                        {item.aictePermanentId}
                      </span>
                      <span className="font-semibold text-gray-600">{item.region} {isHi ? 'क्षेत्र' : 'Region'}</span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                        isCritical ? 'bg-red-600 text-white' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {item.alertLevel}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900">{item.instituteName}</h4>
                    <p className="text-gray-600 text-[11px]">
                      {isHi ? 'दस्तावेज़:' : 'Document:'} <strong>{item.documentType}</strong> • {isHi ? 'समाप्ति तिथि:' : 'Expiry Date:'} <strong className="text-red-700">{item.expiryDate}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                    <div className="text-center p-2 rounded bg-white border border-gray-200 min-w-[100px]">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">{isHi ? 'उलटी गिनती' : 'Countdown'}</div>
                      <div className={`text-xl font-black ${isCritical ? 'text-red-700 animate-pulse' : 'text-amber-700'}`}>
                        {item.daysRemaining} {isHi ? 'दिन' : 'Days'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleIssueShowCause(item.instituteName, item.aictePermanentId)}
                      className="bg-red-700 hover:bg-red-800 text-white font-bold px-3 py-2 rounded text-xs cursor-pointer shadow-xs"
                    >
                      {isHi ? 'कारण बताओ नोटिस जारी करें' : 'Issue Show-Cause Notice'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
