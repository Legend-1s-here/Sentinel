import React, { useState } from 'react';
import { 
  FileCheck2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Building2, 
  MapPin, 
  Search, 
  FileText, 
  Eye, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert 
} from 'lucide-react';
import EoALetterModal from '../EoALetterModal';

export default function OfficerDashboard({ 
  applications, 
  setApplications, 
  onAddAuditLog,
  selectedAppId = 'APP-2025-0842',
  setSelectedAppId,
  language = 'en',
  t = (k) => k
}) {
  const isHi = language === 'hi';
  const [internalAppId, setInternalAppId] = useState(selectedAppId);
  const activeAppId = setSelectedAppId ? selectedAppId : internalAppId;
  const setActiveAppId = setSelectedAppId || setInternalAppId;

  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [clause, setClause] = useState('APH Chapter 2, Clause 4.1');
  const [remarks, setRemarks] = useState(
    isHi 
      ? 'अपलोड किया गया अग्निशमन सुरक्षा एनओसी 2023 का है जिसमें मुख्य अग्निशमन अधिकारी का सक्रिय नवीनीकरण पृष्ठांकन नहीं है।'
      : 'Fire Safety NOC uploaded is dated 2023 with no active renewal endorsement from Chief Fire Officer.'
  );
  const [approvalToast, setApprovalToast] = useState(false);
  const [showEoAModal, setShowEoAModal] = useState(false);

  const selectedApp = applications.find(a => a.id === activeAppId) || applications[0];

  const handleFlagDeficiency = () => {
    const updated = applications.map(app => {
      if (app.id === selectedApp.id) {
        return {
          ...app,
          status: 'DEFICIENT',
          documents: app.documents.map(d => 
            d.id === (selectedDoc?.id || 'DOC-03') 
              ? { ...d, status: 'DEFICIENT', validity: isHi ? 'क्षेत्रीय अधिकारी द्वारा कमी दर्ज की गई' : 'Deficiency Flagged by Regional Officer' } 
              : d
          ),
          deficiencyHistory: [
            {
              id: `DEF-${Date.now().toString().slice(-4)}`,
              stage: 'Scrutiny',
              date: new Date().toISOString().split('T')[0],
              officer: isHi ? 'डॉ. आर.के. शर्मा (कानपुर क्षेत्रीय कार्यालय)' : 'Dr. R.K. Sharma (RO Kanpur)',
              clause: clause,
              remarks: remarks,
              resolved: false
            },
            ...app.deficiencyHistory
          ]
        };
      }
      return app;
    });

    setApplications(updated);
    setShowDeficiencyModal(false);

    onAddAuditLog({
      actor: isHi ? 'डॉ. आर.के. शर्मा (कानपुर क्षेत्रीय कार्यालय)' : 'Dr. R.K. Sharma (RO Kanpur)',
      role: isHi ? 'क्षेत्रीय संवीक्षा अधिकारी' : 'Regional Scrutiny Officer',
      action: 'DEFICIENCY_REVERT_ISSUED',
      applicationId: selectedApp.id,
      remarks: isHi ? `दस्तावेज़ हेतु ${clause} के अंतर्गत कमी दर्ज की गई। औपचारिक सूचना प्रेषित।` : `Deficiency flagged for DOC-03 citing ${clause}. Revert notice dispatched to college.`
    });
  };

  const handleApproveScrutiny = () => {
    const updated = applications.map(app => {
      if (app.id === selectedApp.id) {
        return {
          ...app,
          currentStage: 'EVC_Pending',
          status: 'EVC_SCHEDULED',
          daysElapsed: 1,
          slaDeadlineDays: 14,
          documents: app.documents.map(d => ({ ...d, status: 'VERIFIED' })),
          evcDetails: {
            ...app.evcDetails,
            status: 'QUEUED_FOR_INSPECTION',
            isNewInstitution: true
          }
        };
      }
      return app;
    });

    setApplications(updated);
    setApprovalToast(true);
    setTimeout(() => setApprovalToast(false), 5000);

    onAddAuditLog({
      actor: isHi ? 'डॉ. आर.के. शर्मा (कानपुर क्षेत्रीय कार्यालय)' : 'Dr. R.K. Sharma (RO Kanpur)',
      role: isHi ? 'क्षेत्रीय संवीक्षा अधिकारी' : 'Regional Scrutiny Officer',
      action: 'SCRUTINY_STAGE_CLEARED_AUTO_EVC',
      applicationId: selectedApp.id,
      remarks: isHi 
        ? 'सभी दस्तावेज़ APH मानकों के अनुरूप सत्यापित। त्वरित परिसर निरीक्षण हेतु EVC कतार में स्वतः अग्रेषित।' 
        : 'All documents verified compliant under APH norms. Automatically forwarded to EVC queue for fast-track campus inspection.'
    });
  };

  const getStatusText = (st) => {
    if (!isHi) return st;
    switch (st) {
      case 'DEFICIENT': return 'कमी दर्ज (वापस भेजा गया)';
      case 'APPROVED': return 'अनुमोदित';
      case 'OVERDUE': return 'SLA समाप्त';
      case 'EVC_SCHEDULED': return 'EVC निर्धारित';
      case 'IN_PROGRESS': return 'प्रक्रियाधीन';
      case 'VERIFIED': return 'सत्यापित';
      case 'RECTIFIED_PENDING_APPROVAL': return 'संशोधित (समीक्षाधीन)';
      default: return st;
    }
  };

  return (
    <div className="space-y-6">
      {/* Officer Identification Bar */}
      <div className="bg-white border-t-4 border-[#003366] p-5 rounded-lg shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-blue-100 text-[#003366] rounded-lg">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-[#003366] text-white px-2 py-0.5 rounded">
                OFFICER ID: RO-KAN-4091
              </span>
              <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded">
                {isHi ? 'उत्तरी क्षेत्रीय कार्यालय (कानपुर)' : 'Northern Regional Office (Kanpur)'}
              </span>
              <span className="bg-blue-50 text-blue-900 text-[11px] font-semibold px-2 py-0.5 rounded border border-blue-200">
                {isHi ? 'विधिक अधिकार: स्तर-2 संवीक्षा पटल' : 'Statutory Authority: Level-2 Desk'}
              </span>
            </div>
            <h1 className="text-xl font-black text-gray-900 mt-1">
              {isHi ? 'डॉ. आर.के. शर्मा — क्षेत्रीय संवीक्षा अधिकारी' : 'Dr. R.K. Sharma — Regional Scrutiny Officer'}
            </h1>
            <p className="text-xs text-gray-600">
              {isHi ? 'क्षेत्राधिकार: उत्तर प्रदेश, उत्तराखंड, दिल्ली एवं हरियाणा के तकनीकी संस्थान' : 'Jurisdiction: Technical Institutions across Uttar Pradesh, Uttarakhand, Delhi & Haryana'}
            </p>
          </div>
        </div>

        {/* NeSDA SLA Performance Widget */}
        <div className="bg-red-50 border border-red-300 p-3 rounded-lg text-xs min-w-[220px]">
          <div className="flex items-center justify-between font-bold text-red-950">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-red-600" />
              {isHi ? 'कानपुर कार्यालय SLA निगरानी' : 'Kanpur RO SLA Watch'}
            </span>
            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded font-mono">
              {isHi ? 'गंभीर' : 'CRITICAL'}
            </span>
          </div>
          <div className="text-[11px] text-red-800 mt-1">
            <strong>14 {isHi ? 'आवेदन' : 'Applications'}</strong> {isHi ? '10-दिवसीय संवीक्षा सीमा पार कर चुके हैं।' : 'exceeding 10-day scrutiny limit.'}
          </div>
          <div className="text-[10px] text-red-600 mt-0.5">
            {isHi ? 'शीर्ष ब्यूरो चेतावनी सक्रिय (24 घंटे में समीक्षा)' : 'Apex Bureau Notice Active (Action within 24h)'}
          </div>
        </div>
      </div>

      {/* Approval Success Feedback */}
      {approvalToast && (
        <div className="p-4 bg-emerald-900 text-white rounded-lg shadow-lg text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-emerald-200">
                {isHi ? '✅ संवीक्षा चरण स्वीकृत एवं आवेदन EVC कतार में अग्रेषित!' : '✅ Scrutiny Stage Cleared & Application Fast-Tracked to EVC Queue!'}
              </p>
              <p className="text-emerald-100 text-[11px]">
                {isHi ? 'संवीक्षा सत्यापन रिपोर्ट को डिजिटल रूप से प्रमाणित कर दिया गया है। आवेदन विशेषज्ञ समिति निरीक्षण हेतु कतारबद्ध है।' : 'Scrutiny verification report digitally authenticated. Application queued for Expert Visit Committee panel inspection.'}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-emerald-800 px-2.5 py-1 rounded">E-SIGN-VALID</span>
        </div>
      )}

      {/* Main Grid: Left Side Queue, Right Side Scrutiny Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Officer Assigned Queue */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#003366]" />
              {isHi ? `आवंटित इनबॉक्स (${applications.length})` : `Assigned Inbox (${applications.length})`}
            </h3>
            <span className="text-[10px] text-gray-500 font-mono">RO Kanpur</span>
          </div>

          <div className="space-y-2">
            {applications.map(app => {
              const isSelected = activeAppId === app.id;
              const isDef = app.status === 'DEFICIENT';
              const isOverdue = app.status === 'OVERDUE' || app.daysElapsed > app.slaDeadlineDays;

              return (
                <div
                  key={app.id}
                  onClick={() => setActiveAppId(app.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-[#003366] bg-blue-50/60 ring-2 ring-blue-100' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-gray-900">{app.id}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      isDef 
                        ? 'bg-red-100 text-red-800' 
                        : isOverdue 
                        ? 'bg-red-600 text-white animate-pulse' 
                        : 'bg-blue-100 text-blue-900'
                    }`}>
                      {getStatusText(app.status)}
                    </span>
                  </div>

                  <div className="font-semibold text-gray-800 text-[11px] mt-1 line-clamp-1">
                    {app.instituteName}
                  </div>

                  <div className="text-[10px] text-gray-500 flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                    <span>{app.district}, {app.state}</span>
                    <span className={`font-mono font-bold ${isOverdue ? 'text-red-700' : 'text-gray-700'}`}>
                      {isHi ? 'दिन' : 'Day'} {app.daysElapsed} / {app.slaDeadlineDays}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Scrutiny Audit Workbench */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-5 shadow-xs space-y-5">
          {/* Active Application Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-3 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-[#003366] text-white px-2 py-0.5 rounded">
                  {selectedApp.id}
                </span>
                <span className="text-xs font-mono text-gray-600">PID: {selectedApp.aictePermanentId}</span>
                {selectedApp.isNewInstitution && (
                  <span className="bg-purple-100 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded">
                    ⚡ {isHi ? 'नवीन तकनीकी संस्थान प्रस्ताव (प्राथमिकता)' : 'New Technical College Proposal'}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-gray-900 mt-1">
                {selectedApp.instituteName}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{isHi ? 'SLA घड़ी:' : 'NeSDA SLA Clock:'}</span>
              <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2 py-1 rounded border border-amber-300">
                {isHi ? `दिन ${selectedApp.daysElapsed} / ${selectedApp.slaDeadlineDays}` : `Day ${selectedApp.daysElapsed} of ${selectedApp.slaDeadlineDays}`}
              </span>
            </div>
          </div>

          {/* Hackathon Demo Instruction */}
          <div className="bg-amber-50 border border-amber-300 rounded p-2.5 text-xs">
            <p className="font-bold text-amber-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {isHi ? 'मिनट 2 संवीक्षा डेमो निर्देश:' : 'Minute 2 Scrutiny Demo Action:'}
            </p>
            <p className="text-gray-700 text-[11px] mt-0.5">
              {isHi 
                ? 'कमी दर्ज करने हेतु "कमी विवरण दर्ज करें" पर क्लिक करें। संस्थान द्वारा संशोधित दस्तावेज़ जमा होने के बाद "संवीक्षा स्वीकृत करें" पर क्लिक करें।' 
                : 'Click "Flag Deficiency" on the Fire Safety NOC to simulate an official revert. Once the institution responds, click "Approve Scrutiny & Auto-Forward to EVC"!'}
            </p>
          </div>

          {/* Document Verification Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              {isHi ? 'प्रारंभिक संवीक्षा हेतु विधिक चेकलिस्ट (APH अध्याय 1 एवं 2)' : 'Statutory Checklist for Initial Scrutiny (APH Chapter 1 & 2)'}
            </h3>

            <div className="space-y-2 text-xs">
              {selectedApp.documents.map((doc) => {
                const isDef = doc.status === 'DEFICIENT';
                const isRect = doc.status === 'RECTIFIED_PENDING_APPROVAL';

                return (
                  <div
                    key={doc.id}
                    className={`p-3 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                      isDef 
                        ? 'border-red-400 bg-red-50/60' 
                        : isRect
                        ? 'border-amber-400 bg-amber-50/70'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] bg-gray-100 font-bold px-1.5 py-0.5 rounded">{doc.id}</span>
                        <span className="font-bold text-gray-900">{doc.title}</span>
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5">
                        <span className="font-mono text-blue-900 font-semibold">{doc.aphClause}</span> • {isHi ? 'श्रेणी:' : 'Category:'} {doc.category}
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium">
                        {isHi ? 'सत्यापन टिप्पणी:' : 'Observation:'} <span className={isDef ? 'text-red-700 font-bold' : 'text-gray-800'}>{doc.validity}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isDef 
                          ? 'bg-red-100 text-red-800 border border-red-300' 
                          : isRect
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {getStatusText(doc.status)}
                      </span>

                      <button
                        onClick={() => {
                          setSelectedDoc(doc);
                          setShowDeficiencyModal(true);
                        }}
                        className="px-2 py-1 border border-red-300 text-red-700 hover:bg-red-100 rounded text-[11px] font-bold cursor-pointer"
                      >
                        {isHi ? 'कमी दर्ज करें' : 'Flag Deficiency'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statutory Gate: Final Scrutiny Decision */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-800">
                {isHi ? 'विधिक नियामक सुरक्षा निर्णय गेटवे' : 'Statutory Regulatory Safeguard Decision Gate'}
              </span>
              <span className="text-[10px] font-mono text-blue-900 bg-blue-100 px-2 py-0.5 rounded font-bold">
                DSC / Aadhaar e-Sign
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleApproveScrutiny}
                disabled={selectedApp.status === 'DEFICIENT'}
                className={`flex-1 py-3 px-4 rounded text-xs font-bold flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer ${
                  selectedApp.status === 'DEFICIENT'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t('btnApproveScrutiny')}</span>
              </button>

              <button
                onClick={() => setShowDeficiencyModal(true)}
                className="py-3 px-4 border border-red-600 text-red-700 hover:bg-red-50 rounded text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{isHi ? 'औपचारिक कमी आदेश जारी करें' : 'Issue Revert Notice'}</span>
              </button>

              {selectedApp.status === 'APPROVED' && (
                <button
                  onClick={() => setShowEoAModal(true)}
                  className="py-3 px-4 bg-[#003366] hover:bg-blue-900 text-white rounded text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isHi ? 'स्वीकृत आदेश (EoA) देखें' : 'View Approved EoA Letter'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Deficiency Modal Popup */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border-t-4 border-red-600 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                {isHi ? 'औपचारिक संवीक्षा कमी आदेश (APH अध्याय 2)' : 'Official Scrutiny Deficiency Revert (APH Chapter 2)'}
              </h3>
              <button 
                onClick={() => setShowDeficiencyModal(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {isHi ? 'लक्षित विधिक दस्तावेज़:' : 'Target Statutory Document:'}
                </label>
                <div className="p-2 bg-gray-100 rounded text-gray-800 font-mono">
                  {selectedDoc?.title || 'DOC-03: State Fire Safety NOC'}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {isHi ? 'विधिक APH धारा / नियामक संदर्भ:' : 'Statutory APH Clause / Regulatory Reference:'}
                </label>
                <input
                  type="text"
                  value={clause}
                  onChange={(e) => setClause(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded font-mono text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {isHi ? 'आधिकारिक कमी कारण (ऑडिट लेजर एवं एसएमएस/ईमेल में दर्ज):' : 'Official Deficiency Reason (Logs to Audit Ledger & SMS/Email):'}
                </label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {isHi ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleFlagDeficiency}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isHi ? 'पुष्टि करें एवं कमी आदेश जारी करें' : 'Confirm & Issue Revert'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official AICTE Extension of Approval (EoA) Letter Modal */}
      {showEoAModal && (
        <EoALetterModal
          application={selectedApp}
          onClose={() => setShowEoAModal(false)}
          language={language}
        />
      )}
    </div>
  );
}
