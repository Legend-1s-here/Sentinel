import React, { useState } from 'react';
import { 
  CalendarClock, 
  MapPin, 
  Building2, 
  CheckCircle, 
  UploadCloud, 
  FileCheck, 
  Camera, 
  ShieldCheck, 
  UserCheck, 
  Users, 
  Clock, 
  AlertCircle, 
  FileText,
  Sparkles
} from 'lucide-react';

export default function EVCDashboard({ 
  applications, 
  setApplications, 
  onAddAuditLog,
  selectedAppId,
  setSelectedAppId,
  language = 'en',
  t = (k) => k
}) {
  const isHi = language === 'hi';
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [recommendation, setRecommendation] = useState('RECOMMENDED');
  const [photoCount, setPhotoCount] = useState(4);
  const [checklist, setChecklist] = useState({
    landBoundary: true,
    instructionalArea: true,
    labsEquipment: true,
    libraryResources: true,
    computingCenter: true,
    facultyCadreRatio: true
  });

  // Target application for EVC
  const targetApp = applications.find(a => a.id === selectedAppId) || 
                    applications.find(a => a.currentStage === 'EVC_Pending') || 
                    applications[0];

  const handleToggleCheck = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmitEVCReport = () => {
    const updated = applications.map(app => {
      if (app.id === targetApp.id) {
        return {
          ...app,
          currentStage: 'SAC_Review',
          status: 'SAC_REVIEW_QUEUED',
          evcDetails: {
            ...app.evcDetails,
            status: 'INSPECTION_COMPLETED_RECOMMENDED',
            reportSubmitted: true,
            submissionDate: new Date().toISOString().split('T')[0]
          }
        };
      }
      return app;
    });

    setApplications(updated);
    setReportSubmitted(true);
    setTimeout(() => setReportSubmitted(false), 5000);

    onAddAuditLog({
      actor: isHi ? 'प्रो. एस.एन. मुखर्जी (प्रमुख विशेषज्ञ, आईआईटी कानपुर)' : 'Prof. S.N. Mukherjee (Lead Expert, IIT Kanpur)',
      role: isHi ? 'EVC निरीक्षण समिति' : 'EVC Inspection Committee',
      action: 'EVC_INSPECTION_REPORT_SUBMITTED',
      applicationId: targetApp.id,
      remarks: isHi 
        ? 'भौतिक परिसर निरीक्षण पूर्ण। बुनियादी ढांचा, प्रयोगशाला मशीनरी एवं संकाय रोस्टर APH अध्याय 1 के अनुसार सत्यापित। SAC अनुमोदन हेतु अनुशंसित।'
        : 'Physical campus inspection completed. Infrastructure, lab machinery, and faculty roster verified compliant under APH Chapter 1. Recommended for SAC / Apex sign-off.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Switch Application Selector */}
      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <span className="font-bold text-gray-700 uppercase tracking-wider text-[11px]">
          {isHi ? 'EVC सूची से निरीक्षण आवेदन चुनें:' : 'Select Inspection Application from EVC Roster:'}
        </span>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {applications.map(app => {
            const isSelected = app.id === targetApp.id;
            return (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{app.id}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                  app.currentStage === 'EVC_Pending' || app.status === 'EVC_SCHEDULED'
                    ? (isSelected ? 'bg-amber-400 text-blue-950 font-black' : 'bg-purple-100 text-purple-900')
                    : (isSelected ? 'bg-purple-800 text-purple-200' : 'bg-gray-200 text-gray-600')
                }`}>
                  {app.currentStage}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* EVC Identification Bar */}
      <div className="bg-white border-t-4 border-purple-700 p-5 rounded-lg shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-purple-100 text-purple-900 rounded-lg">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-purple-900 text-white px-2 py-0.5 rounded">
                EVC PANEL: EVC-2025-UP-08
              </span>
              <span className="bg-purple-100 text-purple-900 text-[11px] font-bold px-2 py-0.5 rounded">
                {isHi ? 'स्थायी विशेषज्ञ निरीक्षण समिति' : 'Standing Expert Visit Committee'}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded">
                {isHi ? 'परिसर निरीक्षण अधिकार सक्रिय' : 'Peer Inspection Authorization Active'}
              </span>
            </div>
            <h1 className="text-xl font-black text-gray-900 mt-1">
              {isHi ? 'प्रो. एस.एन. मुखर्जी — प्रमुख विशेषज्ञ (प्राध्यापक, आईआईटी कानपुर)' : 'Prof. S.N. Mukherjee — Lead Expert (Professor, IIT Kanpur)'}
            </h1>
            <p className="text-xs text-gray-600">
              {isHi ? 'समिति सदस्य: डॉ. प्रीति वर्मा (एनआईटी) • इंजी. वी.के. गोयल (मुख्य वास्तुविद अभियंता, लोक निर्माण विभाग)' : 'Panel Members: Dr. Preeti Verma (NIT) • Er. V.K. Goel (Chief Architectural Engineer, State PWD)'}
            </p>
          </div>
        </div>

        {/* Inspection SLA Gauge */}
        <div className="bg-purple-50 border border-purple-300 p-3 rounded-lg text-xs min-w-[200px]">
          <div className="text-[10px] text-purple-900 uppercase font-bold">{isHi ? '14-दिवसीय EVC निरीक्षण समयसीमा' : '14-Day EVC Inspection Window'}</div>
          <div className="font-bold text-gray-900 mt-0.5">{isHi ? 'दौरा अवधि: 28-अक्तूबर से 05-नवंबर' : 'Visit Window: 28-Oct to 05-Nov'}</div>
          <div className="text-[10px] text-purple-700 font-semibold mt-0.5">{isHi ? 'अनिवार्य भू-टैगिंग सक्रिय' : 'Mandatory Geo-Tagging Active'}</div>
        </div>
      </div>

      {/* Submission Feedback */}
      {reportSubmitted && (
        <div className="p-4 bg-emerald-900 text-white rounded-lg shadow-lg text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-emerald-200">
                {isHi ? '✅ आधिकारिक EVC निरीक्षण रिपोर्ट डिजिटल हस्ताक्षरित एवं जमा!' : '✅ Official EVC Inspection Report Digitally Signed & Submitted!'}
              </p>
              <p className="text-emerald-100 text-[11px]">
                {isHi ? 'अनुशंसा AICTE राष्ट्रीय पोर्टल पर सुरक्षित कर दी गई है। आवेदन SAC समीक्षा हेतु अग्रेषित।' : 'The recommendation has been cryptographically uploaded into the AICTE National Portal. Application queued for SAC review.'}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-emerald-800 px-2.5 py-1 rounded">EVC-SEALED</span>
        </div>
      )}

      {/* Main Inspection Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Target Campus Profile & Mandate */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs space-y-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
              {isHi ? 'आवंटित निरीक्षण परिसर' : 'Assigned Inspection Campus'}
            </span>
            <h2 className="text-base font-bold text-gray-900 mt-2">
              {targetApp.instituteName}
            </h2>
            <p className="text-gray-600 text-[11px] flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              {targetApp.district}, {targetApp.state} ({targetApp.region} {isHi ? 'क्षेत्र' : 'Region'})
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-gray-200">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">{isHi ? 'प्रस्ताव श्रेणी:' : 'Proposal Category:'}</span>
              <span className="font-semibold">{targetApp.applicationType}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">{isHi ? 'संवीक्षा स्थिति:' : 'Scrutiny Clearance:'}</span>
              <span className="font-bold text-emerald-700">{isHi ? 'संवीक्षा अधिकारी द्वारा सत्यापित' : 'Verified by Regional Officer'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">{isHi ? 'प्रस्तावित प्रवेश क्षमता:' : 'Proposed Intake:'}</span>
              <span className="font-semibold">300 {isHi ? 'सीटें (5 बी.टेक कार्यक्रम)' : 'Seats (5 UG Engg Programs)'}</span>
            </div>
          </div>

          {/* Geo-Tagged Camera Simulator */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800 flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-blue-900" />
                {isHi ? 'भू-टैग फोटोग्राफिक साक्ष्य' : 'Geo-Tagged Evidence'}
              </span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                GPS Locked
              </span>
            </div>
            <div className="text-[11px] text-gray-600 font-mono">
              Coordinates: Lat 26.6812° N, Long 80.9821° E
            </div>
            <div className="text-[11px] text-gray-500">
              {photoCount} {isHi ? 'सत्यापित तस्वीरें ली गईं (प्रयोगशाला, पुस्तकालय, सर्वर कक्ष, अग्निशमन संयंत्र)।' : 'High-Resolution Verified Photos Captured (Labs, Library, Server Room, Fire Hydrant).'}
            </div>
          </div>
        </div>

        {/* Right 2 Cols: Evaluation Checklist & Digital Recommendation */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-5 shadow-xs space-y-5 text-xs">
          <div>
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              {isHi ? 'परिसर भौतिक निरीक्षण चेकलिस्ट (APH अध्याय 1 मानक)' : 'On-Site Physical Inspection Checklist (APH Chapter 1 Norms)'}
            </h3>
            <p className="text-gray-500 text-[11px] mt-0.5">
              {isHi ? 'अनुमोदन प्रक्रिया पुस्तिका में निर्धारित भौतिक मानकों के अनुसार सत्यापन करें।' : 'Verify compliance against physical inspection parameters specified in AICTE Approval Process Handbook.'}
            </p>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5">
            {[
              { 
                key: 'landBoundary', 
                label: isHi ? 'भूमि सीमांकन एवं चारदीवारी' : 'Land Demarcation & Boundary Wall', 
                note: isHi ? '5.25 एकड़ अखंड भूमि एवं स्थायी परिधि दीवार सत्यापित।' : '5.25 Acres contiguous land verified with permanent perimeter wall.' 
              },
              { 
                key: 'instructionalArea', 
                label: isHi ? 'शैक्षणिक क्षेत्र (कक्षाएं एवं ट्यूटोरियल कक्ष)' : 'Instructional Area (Classrooms & Tutorial Rooms)', 
                note: isHi ? '12 स्मार्ट कक्षाएं इंटरैक्टिव डिस्प्ले व वेंटिलेशन युक्त।' : '12 smart classrooms equipped with interactive displays & ventilation.' 
              },
              { 
                key: 'labsEquipment', 
                label: isHi ? 'प्रयोगशालाएं एवं कार्यशाला मशीनरी' : 'Laboratories & Workshop Machinery', 
                note: isHi ? 'AICTE मानक अनुसार मशीनरी चालू हालत में एवं पावर बैकअप युक्त।' : 'AICTE mandated lab machinery inspected and operational with power backups.' 
              },
              { 
                key: 'libraryResources', 
                label: isHi ? 'केंद्रीय पुस्तकालय एवं ई-जर्नल (DelNet / IEEE)' : 'Central Library & E-Journals (DelNet / IEEE)', 
                note: isHi ? '5,000+ पुस्तकें, डिजिटल टर्मिनल एवं सक्रिय सदस्यता सत्यापित।' : '5,000+ volumes, digital library terminals, and active subscription verified.' 
              },
              { 
                key: 'computingCenter', 
                label: isHi ? 'कंप्यूटर केंद्र एवं 100 Mbps समर्पित इंटरनेट' : 'Computer Center & 100 Mbps Dedicated Internet', 
                note: isHi ? '150 कोर i7 टर्मिनल समर्पित ऑप्टिकल फाइबर लीज्ड लाइन सहित।' : '150 core i7 terminals with dedicated optical fiber leased line.' 
              },
              { 
                key: 'facultyCadreRatio', 
                label: isHi ? 'संकाय संवर्ग अनुपात एवं रोस्टर (1:15 मानक)' : 'Faculty Cadre Ratio & Cadre Roster (1:15 Norm)', 
                note: isHi ? 'नियुक्त संकाय फॉर्म-16 एवं बैंक वेतन अंतरण द्वारा सत्यापित।' : 'All appointed faculty verified with Form 16 and bank salary credits.' 
              }
            ].map(item => (
              <div 
                key={item.key}
                onClick={() => handleToggleCheck(item.key)}
                className={`p-3 rounded-lg border flex items-start justify-between gap-3 cursor-pointer transition-colors ${
                  checklist[item.key] ? 'bg-emerald-50/50 border-emerald-300' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div>
                  <div className="font-bold text-gray-900">{item.label}</div>
                  <div className="text-[11px] text-gray-600 mt-0.5">{item.note}</div>
                </div>
                <input
                  type="checkbox"
                  checked={checklist[item.key]}
                  onChange={() => {}}
                  className="w-4 h-4 text-purple-900 rounded mt-0.5 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Committee Final Recommendation */}
          <div className="p-4 bg-purple-50/60 rounded-lg border border-purple-200 space-y-3">
            <h4 className="font-bold text-purple-950 text-xs">
              {isHi ? 'समिति की विधिक अनुशंसा:' : 'Committee Statutory Recommendation:'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className={`p-2.5 rounded border text-center cursor-pointer transition-colors ${
                recommendation === 'RECOMMENDED' ? 'bg-emerald-700 text-white font-bold border-emerald-700' : 'bg-white border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="rec"
                  checked={recommendation === 'RECOMMENDED'}
                  onChange={() => setRecommendation('RECOMMENDED')}
                  className="hidden"
                />
                <div className="text-xs">{isHi ? 'पूर्ण अनुमोदन हेतु अनुशंसित' : 'Recommended for Full Approval'}</div>
              </label>

              <label className={`p-2.5 rounded border text-center cursor-pointer transition-colors ${
                recommendation === 'UNDERTAKING' ? 'bg-amber-600 text-white font-bold border-amber-600' : 'bg-white border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="rec"
                  checked={recommendation === 'UNDERTAKING'}
                  onChange={() => setRecommendation('UNDERTAKING')}
                  className="hidden"
                />
                <div className="text-xs">{isHi ? 'वचनपत्र के साथ अनुशंसित' : 'Recommended with Undertaking'}</div>
              </label>

              <label className={`p-2.5 rounded border text-center cursor-pointer transition-colors ${
                recommendation === 'REJECTED' ? 'bg-red-700 text-white font-bold border-red-700' : 'bg-white border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="rec"
                  checked={recommendation === 'REJECTED'}
                  onChange={() => setRecommendation('REJECTED')}
                  className="hidden"
                />
                <div className="text-xs">{isHi ? 'अनुमोदन हेतु अस्वीकृत' : 'Not Recommended'}</div>
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                onClick={handleSubmitEVCReport}
                className="w-full bg-purple-900 hover:bg-purple-950 text-white font-bold py-3 px-4 rounded text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {isHi 
                    ? 'EVC निरीक्षण रिपोर्ट को डिजिटल हस्ताक्षरित एवं जमा करें (आधार ई-हस्ताक्षर)' 
                    : 'Digitally Authenticate & Submit EVC Inspection Report (Aadhaar e-Sign)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
