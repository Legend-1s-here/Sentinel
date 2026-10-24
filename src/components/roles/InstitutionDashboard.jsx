import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  AlertTriangle, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  CreditCard, 
  ExternalLink, 
  Bell, 
  User, 
  FileCheck,
  MapPin,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import EoALetterModal from '../EoALetterModal';

export default function InstitutionDashboard({ 
  applications, 
  setApplications, 
  onAddAuditLog,
  selectedAppId,
  setSelectedAppId,
  language = 'en',
  t = (k) => k
}) {
  const isHi = language === 'hi';
  const [activeSubTab, setActiveSubTab] = useState('application');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocToRectify, setSelectedDocToRectify] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [leaseRenewedSuccess, setLeaseRenewedSuccess] = useState(false);
  const [showEoAModal, setShowEoAModal] = useState(false);

  // Institution's active selected application
  const myApp = applications.find(a => a.id === selectedAppId) || applications[0];

  const handleReuploadDoc = () => {
    const docTarget = selectedDocToRectify || myApp.documents.find(d => d.status === 'DEFICIENT') || myApp.documents[0];

    const updated = applications.map(app => {
      if (app.id === myApp.id) {
        return {
          ...app,
          status: 'IN_PROGRESS',
          documents: app.documents.map(d => 
            d.id === docTarget.id
              ? { 
                  ...d, 
                  status: 'RECTIFIED_PENDING_APPROVAL', 
                  title: `${docTarget.title} (2026-2029 Certified Endorsed)`,
                  validity: isHi ? 'डिजिटल हस्ताक्षर युक्त संशोधित प्रमाण पत्र प्रस्तुत' : 'Rectified certificate submitted with digital signature' 
                } 
              : d
          ),
          deficiencyHistory: app.deficiencyHistory.map((dh, idx) => 
            idx === 0 ? { ...dh, resolved: true, resolutionDate: new Date().toISOString().split('T')[0] } : dh
          )
        };
      }
      return app;
    });

    setApplications(updated);
    setShowUploadModal(false);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 5000);

    onAddAuditLog({
      actor: `Registrar, ${myApp.instituteName}`,
      role: 'Technical Institution',
      action: 'DEFICIENCY_CURED_REUPLOAD',
      applicationId: myApp.id,
      remarks: isHi 
        ? `संशोधित ${docTarget.title} डिजिटल प्रमाणन के साथ अपलोड किया गया।` 
        : `Rectified ${docTarget.title} uploaded with digital certification. Submitted for Regional Officer re-verification.`
    });
  };

  const handleRenewLandLease = () => {
    setLeaseRenewedSuccess(true);
    setTimeout(() => setLeaseRenewedSuccess(false), 5000);

    onAddAuditLog({
      actor: `Registrar, ${myApp.instituteName}`,
      role: 'Technical Institution',
      action: 'LAND_LEASE_EXTENDED_30YR',
      applicationId: myApp.aictePermanentId,
      remarks: isHi ? '2056 तक वैध पंजीकृत पूरक पट्टा विलेख प्रस्तुत किया गया।' : 'Submitted registered supplementary lease deed valid through 2056.'
    });
  };

  const isDeficient = myApp.status === 'DEFICIENT';
  const isEvcScheduled = myApp.status === 'EVC_SCHEDULED' || myApp.currentStage === 'EVC_Pending';
  const isApproved = myApp.status === 'APPROVED' || myApp.currentStage === 'Approved';

  // Helper for status badge in Hindi
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
      {/* Interactive Application Selector Pill Bar */}
      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-gray-700 uppercase tracking-wider text-[11px]">
            {isHi ? 'संस्थान का सक्रिय आवेदन चुनें:' : 'Switch Institution Application:'}
          </span>
          <span className="text-gray-400">|</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {applications.map(app => {
            const isSelected = app.id === myApp.id;
            return (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#003366] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{app.id}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                  app.status === 'DEFICIENT' 
                    ? (isSelected ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800')
                    : app.status === 'APPROVED'
                    ? (isSelected ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-800')
                    : (isSelected ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-900')
                }`}>
                  {getStatusText(app.status)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Institution Profile Banner */}
      <div className="bg-white border-t-4 border-[#003366] p-5 rounded-lg shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-blue-50 text-[#003366] rounded-lg border border-blue-200">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-[#003366] text-white px-2 py-0.5 rounded">
                AICTE PID: {myApp.aictePermanentId}
              </span>
              <span className="bg-blue-100 text-[#003366] text-[11px] font-bold px-2 py-0.5 rounded">
                {isHi ? 'सत्र 2025–26' : 'AY 2025–26'}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">
                {isHi ? `${myApp.region} क्षेत्रीय अधिकार क्षेत्र` : `${myApp.region} Regional Jurisdiction`}
              </span>
            </div>
            <h1 className="text-xl font-black text-gray-900 mt-1">
              {myApp.instituteName}
            </h1>
            <p className="text-xs text-gray-600 flex items-center gap-2 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              <span>{isHi ? 'परिसर:' : 'Campus:'} {myApp.district}, {myApp.state}</span>
              <span>•</span>
              <span className="font-semibold text-blue-900">{isHi ? 'प्रस्ताव:' : 'Application:'} {myApp.applicationType}</span>
            </p>
          </div>
        </div>

        {/* Quick Contact & Authorized Signatory */}
        <div className="text-right text-xs bg-gray-50 p-2.5 rounded border border-gray-200 min-w-[200px]">
          <div className="text-[10px] text-gray-500 uppercase font-bold">{isHi ? 'अधिकृत हस्ताक्षरकर्ता' : 'Authorized Signatory'}</div>
          <div className="font-bold text-gray-900">{isHi ? 'प्राचार्य / कुलसचिव कार्यालय' : 'Principal / Registrar Office'}</div>
          <div className="text-gray-500 text-[11px]">{myApp.district} {isHi ? 'परिसर' : 'Campus'}</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">{isHi ? 'आधार ई-हस्ताक्षर सत्यापित' : 'Aadhaar e-Sign Verified'}</div>
        </div>
      </div>

      {/* Institution Sub-Navigation */}
      <div className="flex items-center space-x-2 border-b border-gray-200 text-xs">
        <button
          onClick={() => setActiveSubTab('application')}
          className={`px-4 py-2.5 font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'application'
              ? 'border-[#003366] text-[#003366] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{isHi ? `सक्रिय आवेदन ट्रैकर (${myApp.id})` : `Active Application Tracker (${myApp.id})`}</span>
          {isDeficient && <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>}
        </button>

        <button
          onClick={() => setActiveSubTab('compliance')}
          className={`px-4 py-2.5 font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'compliance'
              ? 'border-[#003366] text-[#003366] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>{isHi ? 'विधिक अनुपालन एवं 30-वर्षीय भूमि पट्टा' : 'Institutional Compliance & 30-Yr Lease Vault'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('fees')}
          className={`px-4 py-2.5 font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === 'fees'
              ? 'border-[#003366] text-[#003366] bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <CreditCard className="w-4 h-4 text-emerald-600" />
          <span>{isHi ? 'ई-चालान एवं शुल्क रसीद' : 'E-Challan & Fee Receipts'}</span>
        </button>
      </div>

      {/* FEEDBACK TOASTS */}
      {uploadSuccess && (
        <div className="p-4 bg-emerald-900 text-white rounded-lg shadow-md text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-emerald-200">
                {isHi ? 'संशोधित दस्तावेज़ सफलतापूर्वक अपलोड एवं पावती प्राप्त!' : 'Rectified Document Successfully Uploaded & Acknowledged!'}
              </p>
              <p className="text-emerald-100 text-[11px]">
                {isHi ? 'आपका दस्तावेज़ संवीक्षा पुनर्सत्यापन हेतु प्रेषित कर दिया गया है। क्षेत्रीय अधिकारी को सूचित किया गया।' : 'Your document has been submitted for scrutiny re-verification. The regional desk officer has been notified.'}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-emerald-800 px-2 py-1 rounded">ACK-CURED-2026</span>
        </div>
      )}

      {leaseRenewedSuccess && (
        <div className="p-4 bg-blue-900 text-white rounded-lg shadow-md text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 text-blue-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-amber-300">
                {isHi ? 'भूमि पट्टा नवीनीकरण विलेख प्राप्त!' : 'Land Lease Renewal Deed Received!'}
              </p>
              <p className="text-blue-100 text-[11px]">
                {isHi ? 'उप-पंजीयक द्वारा पंजीकृत विलेख AICTE राष्ट्रीय वॉल्ट में सफलतापूर्वक सुरक्षित कर दिया गया।' : 'Statutory validity registered with Sub-Registrar successfully uploaded into AICTE National Vault.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: ACTIVE APPLICATION TRACKER */}
      {activeSubTab === 'application' && (
        <div className="space-y-6">
          {/* CELEBRATORY APPROVED BANNER (If Approved) */}
          {isApproved && (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-5 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                    <span>{isHi ? 'विधिक आदेश जारी' : 'STATUTORY ORDER ISSUED'}</span>
                    <span>•</span>
                    <span>{isHi ? 'AICTE अनुमोदन आदेश (EoA)' : 'Extension of Approval'}</span>
                  </div>
                  <h3 className="text-base font-bold text-emerald-950 mt-1">
                    {isHi 
                      ? 'बधाई! शैक्षणिक सत्र 2025–26 हेतु AICTE अनुमोदन प्रदान किया गया है।' 
                      : 'Congratulations! AICTE Extension of Approval (EoA) has been granted for Academic Year 2025–26.'}
                  </h3>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    {isHi 
                      ? 'अधिकृत डिजिटल हस्ताक्षर एवं सत्यापन QR कोड युक्त औपचारिक आदेश पत्र डाउनलोड एवं मुद्रण हेतु तैयार है।' 
                      : 'Official statutory order signed by Member Secretary with cryptographic QR verification is ready for inspection.'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowEoAModal(true)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded text-xs flex items-center space-x-2 shadow-md shrink-0 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{isHi ? 'आधिकारिक अनुमोदन पत्र (EoA) देखें' : 'View Official Approval Order (EoA)'}</span>
              </button>
            </div>
          )}

          {/* URGENT DEFICIENCY BANNER (If Deficient) */}
          {isDeficient && (
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-5 shadow-xs">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5 animate-bounce" />
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-red-700 bg-red-100 px-2 py-0.5 rounded">
                      <span>{isHi ? 'संस्थान द्वारा कार्रवाई अपेक्षित' : 'Action Required by Institution'}</span>
                      <span>•</span>
                      <span>{isHi ? 'औपचारिक कमी आदेश जारी' : 'Formal Revert Issued'}</span>
                    </div>
                    <h3 className="text-base font-bold text-red-950 mt-1">
                      {isHi ? `संवीक्षा में कमी दर्ज की गई (${myApp.assignedOfficer})` : `Scrutiny Deficiency Flagged by ${myApp.assignedOfficer}`}
                    </h3>
                    <p className="text-xs text-red-800 mt-1">
                      <strong>{isHi ? 'विधिक धारा:' : 'Regulatory Clause:'}</strong> {myApp.deficiencyHistory[0]?.clause || 'APH Chapter 2'}
                    </p>
                    <p className="text-xs text-red-900 bg-white/90 p-2.5 rounded border border-red-200 mt-2 font-mono">
                      "{myApp.deficiencyHistory[0]?.remarks}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold px-4 py-2.5 rounded text-xs flex items-center space-x-2 shadow-md shrink-0 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isHi ? 'संशोधित दस्तावेज़ अपलोड करें' : 'Upload Rectified Document'}</span>
                </button>
              </div>
            </div>
          )}

          {/* APPLICATION DETAILS & PROGRESS BAR */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-4 gap-3">
              <div>
                <span className="text-xs text-gray-500 font-mono">{isHi ? 'आवेदन संदर्भ क्रमांक' : 'Application Reference'}</span>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>{myApp.id}</span>
                  <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {myApp.applicationType}
                  </span>
                </h2>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-gray-500 uppercase font-bold">{isHi ? 'वर्तमान प्रसंस्करण चरण' : 'Current Processing Stage'}</span>
                <div className="text-sm font-black text-[#003366]">{getStatusText(myApp.currentStage)} {isHi ? 'चरण' : 'Stage'}</div>
                <div className="text-[11px] text-gray-500">{isHi ? 'प्रभारी अधिकारी:' : 'Officer In-Charge:'} {myApp.assignedOfficer}</div>
              </div>
            </div>

            {/* Stepper */}
            <div className="mt-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                {isHi ? 'अनुमोदन प्रगति समयसीमा (APH चरण)' : 'Approval Progress Timeline'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 rounded bg-emerald-50 border border-emerald-300 text-emerald-900">
                  <div className="flex justify-between items-center font-bold">
                    <span>{isHi ? '1. आवेदन एवं शुल्क जमा' : '1. Ingestion & Fee'}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-1">{isHi ? '14-अक्तूबर-2026 को पूर्ण' : 'Cleared on 14-Oct-2026'}</div>
                </div>

                <div className={`p-3 rounded border ${
                  isDeficient 
                    ? 'bg-red-50 border-red-400 text-red-900 font-bold' 
                    : (isEvcScheduled || isApproved)
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-blue-50 border-blue-400 text-blue-950 font-bold'
                }`}>
                  <div className="flex justify-between items-center font-bold">
                    <span>{isHi ? '2. संवीक्षा ऑडिट' : '2. Scrutiny Audit'}</span>
                    {isDeficient ? <AlertTriangle className="w-4 h-4 text-red-600" /> : <Clock className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="text-[10px] mt-1">
                    {isDeficient ? (isHi ? 'कमी दर्ज (कार्रवाई लंबित)' : 'Reverted (Action Pending)') : (isEvcScheduled || isApproved) ? (isHi ? 'सत्यापित एवं स्वीकृत' : 'Verified & Cleared') : (isHi ? 'अधिकारी समीक्षाधीन' : 'Under Officer Review')}
                  </div>
                </div>

                <div className={`p-3 rounded border ${
                  isApproved 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                    : isEvcScheduled 
                    ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold' 
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}>
                  <div className="flex justify-between items-center font-bold">
                    <span>{isHi ? '3. EVC परिसर निरीक्षण' : '3. EVC Inspection'}</span>
                    {isApproved ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : isEvcScheduled && <Clock className="w-4 h-4 text-purple-600 animate-spin" />}
                  </div>
                  <div className="text-[10px] mt-1">
                    {isApproved ? (isHi ? 'निरीक्षण पूर्ण' : 'Inspection Cleared') : isEvcScheduled ? (isHi ? 'निरीक्षण निर्धारित' : 'Inspection Queued') : (isHi ? 'संवीक्षा की प्रतीक्षा' : 'Awaiting Scrutiny')}
                  </div>
                </div>

                <div 
                  onClick={() => { if (isApproved) setShowEoAModal(true); }}
                  className={`p-3 rounded border transition-all ${
                    isApproved 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-xs cursor-pointer hover:bg-emerald-100' 
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold">
                    <span>{isHi ? '4. अंतिम अनुमोदन आदेश' : '4. Final Approval'}</span>
                    {isApproved ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div className="text-[10px] mt-1 flex items-center justify-between">
                    <span>{isApproved ? (isHi ? 'अनुमोदन आदेश (EoA) जारी' : 'Approval Granted (EoA)') : (isHi ? 'स्थायी अपीलीय समिति' : 'Standing Committee')}</span>
                    {isApproved && <span className="underline text-emerald-800 text-[10px]">{isHi ? 'पत्र देखें' : 'View Letter'}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Document Checklist for this application */}
            <div className="mt-6">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
                {isHi ? 'प्रस्तुत विधिक दस्तावेज़ एवं सत्यापन स्थिति (APH मानक)' : 'Submitted Statutory Documents & Verification Status'}
              </h3>
              <div className="space-y-2 text-xs">
                {myApp.documents.map(doc => (
                  <div 
                    key={doc.id}
                    className="p-3 rounded border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-gray-50"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] bg-gray-100 font-bold px-1.5 py-0.5 rounded">{doc.id}</span>
                        <span className="font-bold text-gray-900">{doc.title}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {isHi ? 'धारा:' : 'Clause:'} {doc.aphClause} • {isHi ? 'श्रेणी:' : 'Category:'} {doc.category}
                      </div>
                      <div className="text-[11px] text-gray-600 font-medium">
                        {isHi ? 'सत्यापन विवरण:' : 'Observation:'} {doc.validity}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        doc.status === 'DEFICIENT'
                          ? 'bg-red-100 text-red-800 border border-red-300'
                          : doc.status === 'RECTIFIED_PENDING_APPROVAL'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}>
                        {getStatusText(doc.status)}
                      </span>
                      {doc.status === 'DEFICIENT' && (
                        <button
                          onClick={() => {
                            setSelectedDocToRectify(doc);
                            setShowUploadModal(true);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-[11px] px-2.5 py-1 rounded cursor-pointer"
                        >
                          {isHi ? 'पुनः अपलोड करें' : 'Re-Upload'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPLIANCE & 30-YEAR LAND LEASE VAULT */}
      {activeSubTab === 'compliance' && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-5 text-xs">
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              {isHi ? 'संस्थान विधिक अनुपालन एवं 30-वर्षीय भूमि पट्टा वॉल्ट' : 'Institutional Statutory Compliance & Land Deed Vault'}
            </h2>
            <p className="text-gray-600 text-[11px]">
              {isHi ? 'AICTE नियमावली के अंतर्गत न्यूनतम 30-वर्षीय पंजीकृत भूमि पट्टा एवं सुरक्षा प्रमाण पत्रों की निरंतर निगरानी अनिवार्य है।' : 'AICTE requires perpetual monitoring of long-term land lease deeds (30 years minimum) and safety certificates.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-amber-300 bg-amber-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950">{isHi ? '30-वर्षीय पंजीकृत भूमि पट्टा विलेख' : '30-Year Registered Land Lease'}</span>
                <span className="bg-amber-200 text-amber-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  APH Rule 1.4
                </span>
              </div>
              <div className="text-gray-700 space-y-1">
                <div>{isHi ? 'परिसर स्थान:' : 'Campus Location:'} <strong>{myApp.district}, {myApp.state}</strong></div>
                <div>{isHi ? 'उप-पंजीयक पंजीकरण क्रमांक:' : 'Sub-Registrar Registration No:'} <strong>BK-IV/941/2024</strong></div>
                <div>{isHi ? 'वैधता:' : 'Validity:'} <strong>{isHi ? '14-अक्तूबर-2054 तक वैध (28 वर्ष शेष)' : 'Valid through 14-Oct-2054 (28 Years Remaining)'}</strong></div>
              </div>
              <button
                onClick={handleRenewLandLease}
                className="w-full bg-[#003366] hover:bg-blue-900 text-white font-bold py-2 rounded text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{isHi ? 'पूरक नवीनीकरण विलेख अपलोड करें' : 'Upload Supplementary Renewal Deed'}</span>
              </button>
            </div>

            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">{isHi ? 'राज्य लोक निर्माण विभाग (PWD) भवन सुरक्षा प्रमाण पत्र' : 'State PWD Building Safety Certificate'}</span>
                <span className="bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  {isHi ? 'वैध' : 'Valid'}
                </span>
              </div>
              <div className="text-gray-700 space-y-1">
                <div>{isHi ? 'जारीकर्ता प्राधिकरण:' : 'Issuing Authority:'} <strong>{isHi ? 'अधिशासी अभियंता, लोक निर्माण विभाग' : 'Executive Engineer, PWD'}</strong></div>
                <div>{isHi ? 'प्रमाण पत्र तिथि:' : 'Certificate Date:'} <strong>12-जनवरी-2025</strong></div>
                <div>{isHi ? 'स्थिति: राष्ट्रीय भवन संहिता (NBC 2016) के अनुरूप' : 'Status: Fully compliant with National Building Code (NBC 2016)'}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FEES & E-CHALLAN */}
      {activeSubTab === 'fees' && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
          <h2 className="text-sm font-bold text-gray-900">
            {isHi ? 'भारतकोश ई-चालान एवं भुगतान इतिहास' : 'Payment & Bharatkosh E-Challan History'}
          </h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 font-bold">
                <th className="p-2.5">{isHi ? 'लेन-देन आईडी' : 'Transaction ID'}</th>
                <th className="p-2.5">{isHi ? 'तिथि' : 'Date'}</th>
                <th className="p-2.5">{isHi ? 'प्रयोजन' : 'Purpose'}</th>
                <th className="p-2.5">{isHi ? 'राशि' : 'Amount'}</th>
                <th className="p-2.5">{isHi ? 'भारतकोश स्थिति' : 'Bharatkosh Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-2.5 font-mono">BK2026101488219</td>
                <td className="p-2.5 font-mono">14-Oct-2026</td>
                <td className="p-2.5">{myApp.applicationType} {isHi ? 'संवीक्षा एवं निरीक्षण शुल्क' : 'Scrutiny & Inspection Fee'}</td>
                <td className="p-2.5 font-bold">₹1,50,000</td>
                <td className="p-2.5 text-emerald-700 font-bold">{isHi ? 'सफल (सत्यापित)' : 'SUCCESS (Verified)'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* RECTIFICATION UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border-t-4 border-red-600 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-red-600" />
                {isHi ? 'संशोधित दस्तावेज़ अपलोड करें' : 'Upload Rectified Document'}
              </h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div className="p-2.5 bg-red-50 border border-red-200 rounded text-red-900">
                <strong>{isHi ? 'अधिकारी द्वारा दर्ज कमी का कारण:' : 'Deficiency Reason Logged by Officer:'}</strong>
                <p className="mt-0.5 italic">"{myApp.deficiencyHistory[0]?.remarks || (isHi ? 'प्रमाणित नवीनीकरण प्रति आवश्यक है।' : 'Certified renewal copy required.')}"</p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {isHi ? 'प्रमाणित दस्तावेज़ चुनें (केवल PDF, अधिकतम 5MB):' : 'Select Certified Document (PDF format only, max 5MB):'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <FileCheck className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                  <div className="font-semibold text-gray-800">
                    {selectedDocToRectify?.title || 'Rectified_Statutory_Compliance_Doc.pdf'}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {isHi ? 'डिजिटल पृष्ठांकन युक्त राज्य प्राधिकरण द्वारा प्रमाणित प्रति' : 'Certified by State Authority with digital endorsement'}
                  </div>
                </div>
              </div>

              <div className="p-2 bg-blue-50 border border-blue-200 rounded text-[11px] text-blue-900">
                <strong>{isHi ? 'विधिक घोषणा:' : 'Statutory Declaration:'}</strong> {isHi ? 'मैं एतद्द्वारा घोषित करता हूँ कि संलग्न दस्तावेज़ सक्षम राज्य प्राधिकारी से विधिवत प्रमाणित है।' : 'I hereby declare that the attached document is an authentic certified copy from the state authority.'}
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {isHi ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                onClick={handleReuploadDoc}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{isHi ? 'संशोधित दस्तावेज़ जमा करें' : 'Submit Rectified Document'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official AICTE Extension of Approval (EoA) Letter Modal */}
      {showEoAModal && (
        <EoALetterModal
          application={myApp}
          onClose={() => setShowEoAModal(false)}
          language={language}
        />
      )}
    </div>
  );
}
