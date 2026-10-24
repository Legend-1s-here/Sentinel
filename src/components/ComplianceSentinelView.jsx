import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CalendarClock, 
  AlertTriangle, 
  Building, 
  CheckCircle2, 
  UploadCloud, 
  BellRing, 
  FileCheck,
  Lock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { COMPLIANCE_SENTINEL_ITEMS } from '../data/mockData';

export default function ComplianceSentinelView({ onAddAuditLog, language = 'en', t = (k) => k }) {
  const isHi = language === 'hi';
  const [sentinelItems, setSentinelItems] = useState(COMPLIANCE_SENTINEL_ITEMS);
  const [renewedSuccess, setRenewedSuccess] = useState(null);

  // Simulate institution submitting renewed deed
  const handleSimulateRenewal = (item) => {
    const updated = sentinelItems.map(si => {
      if (si.id === item.id) {
        return {
          ...si,
          daysRemaining: 10950, // 30 Years = ~10,950 days
          expiryDate: '2056-10-24',
          alertLevel: 'RENEWED_VALID',
          escalationStatus: 'VERIFIED_ACTIVE',
          currentImpact: isHi ? 'सभी प्रतिबंध समाप्त; पूर्णतः APH अनुपालित' : 'All sanctions cleared; Fully APH Compliant'
        };
      }
      return si;
    });

    setSentinelItems(updated);
    setRenewedSuccess(item.instituteName);
    setTimeout(() => setRenewedSuccess(null), 5000);

    onAddAuditLog({
      actor: isHi ? `कुलसचिव, ${item.instituteName}` : `Registrar, ${item.instituteName}`,
      role: isHi ? 'तकनीकी संस्थान' : 'Technical Institution',
      action: 'STATUTORY_LEASE_RENEWAL_SUBMITTED',
      applicationId: item.aictePermanentId,
      remarks: isHi
        ? '30-वर्षीय पंजीकृत पट्टा नवीनीकरण विलेख जमा किया गया। वैधता 2056 तक बढ़ाई गई। प्रशासनिक रोक निरस्त।'
        : 'Submitted 30-Year registered renewal lease deed. Validity extended until 2056. Escalation lock revoked.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border-l-4 border-amber-500 p-4 rounded-r shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded border border-amber-300">
              {isHi ? 'सक्रिय विधिक निगरानी प्रणाली' : 'PROACTIVE REGULATORY SENTINEL'}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {isHi ? '30-वर्षीय भूमि पट्टा एवं विधिक वचनपत्र' : '30-Year Land Lease & Statutory Undertakings'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-1">
            {isHi ? 'निरंतर विधिक दस्तावेज़ समाप्ति एवं बहु-स्तरीय चेतावनी प्रणाली' : 'Continuous Statutory Document Expiry & Multi-Tier Escalation'}
          </h2>
          <p className="text-xs text-gray-600">
            {isHi 
              ? 'स्वचालित समयसीमा चेतावनी (T-90, T-60, T-30, एवं T-7 दिन) के माध्यम से संस्थागत अनुमोदनों के निरस्तीकरण को रोकता है।'
              : 'Proactive background sentinel prevents silent cancellation of institutional approvals through automated countdown milestones (T-90, T-60, T-30, and T-7 Days).'}
          </p>
        </div>

        {/* Live Demo Script Note */}
        <div className="bg-amber-50 border border-amber-300 rounded p-2 text-xs max-w-sm">
          <p className="font-bold text-amber-900">{isHi ? 'मिनट 4 डेमो निर्देश:' : 'Minute 4 Winning Demo Cue:'}</p>
          <p className="text-gray-700 text-[11px] mt-0.5">
            {isHi 
              ? 'काशी इंस्टीट्यूट के 30-वर्षीय पट्टे में केवल 28 दिन शेष हैं। स्तर-3 चेतावनी सक्रिय है एवं नई सीटों की वृद्धि प्रतिबंधित है।'
              : 'Notice Kashi Institute with only 28 Days Remaining on its 30-year lease deed. Shows Level-3 alert with seat expansions locked!'}
          </p>
        </div>
      </div>

      {/* Renewal Success Toast */}
      {renewedSuccess && (
        <div className="p-3.5 bg-emerald-900 text-white rounded-lg shadow-md text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-emerald-200">
                {isHi ? '✅ 30-वर्षीय पंजीकृत नवीनीकरण विलेख सफलतापूर्वक सत्यापित!' : '✅ 30-Year Registered Renewal Deed Successfully Authenticated!'}
              </p>
              <p className="text-emerald-100 text-[11px]">
                {renewedSuccess} {isHi ? 'की विधिक वैधता अक्तूबर 2056 तक बढ़ा दी गई। प्रतिबंध हटाया गया।' : 'has extended its statutory validity until October 2056. Automated sanction lock revoked.'}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-emerald-800 px-2.5 py-1 rounded">CHAIN-UPDATED</span>
        </div>
      )}

      {/* Multi-Tier Alert Level Pipeline Indicator */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-2xs">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          {isHi ? 'स्वचालित विधिक चरणबद्ध चेतावनी पाइपलाइन (APH मानक)' : 'Automated Statutory Cascading Alert Pipeline (APH Standard)'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded bg-blue-50 border border-blue-200">
            <div className="font-bold text-blue-900">{isHi ? 'स्तर 1: T-90 दिन' : 'Level 1: T-90 Days'}</div>
            <div className="text-[11px] text-gray-600 mt-0.5">
              {isHi ? 'आधिकारिक पोर्टल एवं ईमेल द्वारा कुलसचिव को प्रारंभिक स्मरण पत्र।' : 'Proactive reminder to Registrar via official portal & email.'}
            </div>
          </div>
          <div className="p-2.5 rounded bg-amber-50 border border-amber-300">
            <div className="font-bold text-amber-900">{isHi ? 'स्तर 2: T-60 दिन' : 'Level 2: T-60 Days'}</div>
            <div className="text-[11px] text-gray-600 mt-0.5">
              {isHi ? 'ट्रस्ट अध्यक्ष को SMS एवं पोर्टल पर अति-आवश्यक सूचना।' : 'SMS & In-App urgent notice dispatched to Trust Chairman.'}
            </div>
          </div>
          <div className="p-2.5 rounded bg-orange-50 border border-orange-300">
            <div className="font-bold text-orange-900">{isHi ? 'स्तर 3: T-30 दिन' : 'Level 3: T-30 Days'}</div>
            <div className="text-[11px] text-gray-600 mt-0.5">
              {isHi ? 'क्षेत्रीय निदेशक को अग्रेषित। सीट वृद्धि एवं नवीन पाठ्यक्रम लॉक।' : 'Escalated to Regional Director. Seat expansion locked.'}
            </div>
          </div>
          <div className="p-2.5 rounded bg-red-50 border border-red-300">
            <div className="font-bold text-red-900">{isHi ? 'स्तर 4: T-7 दिन' : 'Level 4: T-7 Days'}</div>
            <div className="text-[11px] text-gray-600 mt-0.5">
              {isHi ? 'अंतिम सूचना: कारण बताओ सुनवाई आदेश स्वतः उत्पन्न।' : 'Final Notice: Show-cause hearing order generated.'}
            </div>
          </div>
        </div>
      </div>

      {/* Sentinel Institutional Cards */}
      <div className="space-y-4">
        {sentinelItems.map((item) => {
          const isCritical = item.alertLevel === 'LEVEL_3_CRITICAL' || item.alertLevel === 'LEVEL_4_URGENT';
          const isRenewed = item.alertLevel === 'RENEWED_VALID';

          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border shadow-xs transition-all ${
                isCritical 
                  ? 'bg-red-50/60 border-red-300 ring-1 ring-red-300' 
                  : isRenewed
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Institution & Deed Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[10px] font-bold bg-[#003366] text-white px-2 py-0.5 rounded">
                      {item.aictePermanentId}
                    </span>
                    <span className="text-xs font-semibold text-gray-600">
                      {item.region} {isHi ? 'क्षेत्र' : 'Region'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      isCritical 
                        ? 'bg-red-600 text-white animate-pulse' 
                        : isRenewed
                        ? 'bg-emerald-700 text-white'
                        : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}>
                      {isRenewed 
                        ? (isHi ? 'वैध एवं नवीनीकृत' : 'RENEWED VALID')
                        : item.alertLevel === 'LEVEL_3_CRITICAL'
                        ? (isHi ? 'स्तर 3 गंभीर चेतावनी' : 'LEVEL 3 CRITICAL')
                        : item.alertLevel === 'LEVEL_2_URGENT'
                        ? (isHi ? 'स्तर 2 आवश्यक सूचना' : 'LEVEL 2 URGENT')
                        : item.alertLevel.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#003366]" />
                    {item.instituteName}
                  </h3>

                  <div className="text-xs text-gray-700 flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-blue-950">{item.documentType}</span>
                    <span>•</span>
                    <span className="text-gray-500">{isHi ? 'पंजीकृत:' : 'Registered:'} {item.registrationDate}</span>
                    <span>•</span>
                    <span className="text-gray-900 font-semibold">{isHi ? 'विधिक समाप्ति:' : 'Statutory Expiry:'} {item.expiryDate}</span>
                  </div>

                  {/* Impact Notice */}
                  <div className="text-xs mt-1 flex items-center gap-1.5">
                    <span className="font-bold text-gray-700">
                      {isHi ? 'लागू प्रशासनिक प्रभाव:' : 'Enforced Administrative Impact:'}
                    </span>
                    <span className={`font-mono px-2 py-0.5 rounded text-[11px] ${
                      isCritical ? 'bg-red-100 text-red-900 font-bold' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.currentImpact}
                    </span>
                  </div>
                </div>

                {/* Countdown Gauge & Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 self-end lg:self-auto shrink-0">
                  {/* Countdown Box */}
                  <div className={`p-3 rounded-lg text-center border min-w-[130px] ${
                    isCritical 
                      ? 'bg-red-100/90 border-red-300' 
                      : isRenewed
                      ? 'bg-emerald-100 border-emerald-300'
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">{isHi ? 'उलटी गिनती घड़ी' : 'Countdown Clock'}</div>
                    <div className={`text-2xl font-black ${
                      isCritical ? 'text-red-700 animate-pulse' : isRenewed ? 'text-emerald-800' : 'text-amber-700'
                    }`}>
                      {isRenewed ? (isHi ? '30 वर्ष' : '30 Yrs') : `${item.daysRemaining} ${isHi ? 'दिन' : 'Days'}`}
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5">
                      {isRenewed ? (isHi ? '2056 तक सत्यापित' : 'Verified Until 2056') : (isHi ? 'विधिक समाप्ति तक' : 'Until Statutory Expiry')}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                    {!isRenewed ? (
                      <button
                        onClick={() => handleSimulateRenewal(item)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-2 rounded text-xs flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>{isHi ? 'नवीनीकरण अपलोड सिमुलेट करें' : 'Simulate Renewal Upload'}</span>
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-800 font-bold flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {isHi ? 'विधिक अनुपालन बहाल' : 'Compliance Restored'}
                      </span>
                    )}

                    <div className="text-[10px] text-gray-500 text-center font-mono">
                      {isHi ? 'अंतिम पिंग:' : 'Last Ping:'} {item.lastNotificationSent.slice(0, 18)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
