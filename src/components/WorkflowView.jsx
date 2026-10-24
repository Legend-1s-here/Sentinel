import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  UploadCloud, 
  ArrowRight, 
  Send, 
  ShieldCheck, 
  Building2, 
  UserCheck, 
  MapPin, 
  Calendar, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function WorkflowView({ 
  currentRole, 
  applications, 
  setApplications, 
  onAddAuditLog 
}) {
  const [selectedAppId, setSelectedAppId] = useState('APP-2025-0842');
  const [showDeficiencyModal, setShowDeficiencyModal] = useState(false);
  const [selectedDocForDeficiency, setSelectedDocForDeficiency] = useState(null);
  const [deficiencyReason, setDeficiencyReason] = useState(
    'Fire Safety NOC uploaded is dated 2023 with no active endorsement from Chief Fire Officer. Valid certified certificate required.'
  );
  const [deficiencyClause, setDeficiencyClause] = useState('APH Chapter 2, Clause 4.1');
  const [reuploadSuccess, setReuploadSuccess] = useState(false);
  const [stageClearedSuccess, setStageClearedSuccess] = useState(false);

  const currentApp = applications.find(a => a.id === selectedAppId) || applications[0];

  // Stage sequence
  const stages = [
    { key: 'Ingestion', label: '1. Ingestion', status: 'COMPLETED' },
    { 
      key: 'Scrutiny', 
      label: '2. Scrutiny Stage', 
      status: currentApp.currentStage === 'Scrutiny' 
        ? (currentApp.status === 'DEFICIENT' ? 'DEFICIENT' : 'IN_PROGRESS') 
        : 'COMPLETED' 
    },
    { 
      key: 'EVC_Pending', 
      label: '3. EVC Inspection', 
      status: currentApp.currentStage === 'EVC_Pending' 
        ? 'IN_PROGRESS' 
        : (currentApp.currentStage === 'SAC_Review' || currentApp.currentStage === 'Approved' ? 'COMPLETED' : 'PENDING') 
    },
    { 
      key: 'SAC_Review', 
      label: '4. SAC / SHC Review', 
      status: currentApp.currentStage === 'SAC_Review' 
        ? 'IN_PROGRESS' 
        : (currentApp.currentStage === 'Approved' ? 'COMPLETED' : 'PENDING') 
    },
    { 
      key: 'Approved', 
      label: '5. Final Approval', 
      status: currentApp.currentStage === 'Approved' ? 'COMPLETED' : 'PENDING' 
    }
  ];

  // Flag Deficiency Handler
  const handleFlagDeficiency = () => {
    const updated = applications.map(app => {
      if (app.id === currentApp.id) {
        return {
          ...app,
          status: 'DEFICIENT',
          documents: app.documents.map(d => 
            d.id === (selectedDocForDeficiency?.id || 'DOC-03') 
              ? { ...d, status: 'DEFICIENT', validity: 'Deficiency Flagged by Officer' } 
              : d
          ),
          deficiencyHistory: [
            {
              id: `DEF-${Date.now().toString().slice(-4)}`,
              stage: 'Scrutiny',
              date: new Date().toISOString().split('T')[0],
              officer: 'Dr. R.K. Sharma (Regional Officer)',
              clause: deficiencyClause,
              remarks: deficiencyReason,
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
      actor: 'Dr. R.K. Sharma (RO Kanpur)',
      role: 'Regional Scrutiny Officer',
      action: 'DEFICIENCY_REVERT_ISSUED',
      applicationId: currentApp.id,
      remarks: `Deficiency flagged for DOC-03 citing ${deficiencyClause}. Formal email/SMS dispatched to institution.`
    });
  };

  // Institution Rectification / Re-Upload Handler
  const handleReuploadDoc = () => {
    const updated = applications.map(app => {
      if (app.id === currentApp.id) {
        return {
          ...app,
          status: 'IN_PROGRESS',
          documents: app.documents.map(d => 
            d.id === 'DOC-03' 
              ? { 
                  ...d, 
                  status: 'RECTIFIED_PENDING_APPROVAL', 
                  title: 'State Fire Safety NOC (2026-2029 Certified CFO Endorsed)',
                  validity: 'Certified until 15-Sep-2029' 
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
    setReuploadSuccess(true);
    setTimeout(() => setReuploadSuccess(false), 5000);

    onAddAuditLog({
      actor: 'Registrar, Aryavart Institute',
      role: 'Technical Institution',
      action: 'DEFICIENCY_CURED_REUPLOAD',
      applicationId: currentApp.id,
      remarks: 'Rectified State Fire Safety NOC uploaded with verified CFO digital signature.'
    });
  };

  // Officer Approves Scrutiny & Auto-Advances to EVC
  const handleApproveScrutiny = () => {
    const updated = applications.map(app => {
      if (app.id === currentApp.id) {
        return {
          ...app,
          currentStage: 'EVC_Pending',
          status: 'EVC_SCHEDULED',
          daysElapsed: 1, // Reset SLA clock for new stage
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
    setStageClearedSuccess(true);
    setTimeout(() => setStageClearedSuccess(false), 6000);

    onAddAuditLog({
      actor: 'Dr. R.K. Sharma (RO Kanpur)',
      role: 'Regional Scrutiny Officer',
      action: 'SCRUTINY_STAGE_CLEARED_AUTO_EVC',
      applicationId: currentApp.id,
      remarks: 'All infrastructure & legal deeds verified. Automated APH state engine advanced application to EVC Inspection Queue.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Context */}
      <div className="bg-white border-l-4 border-[#003366] p-4 rounded-r shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-[#003366] text-xs font-bold px-2.5 py-0.5 rounded border border-blue-200">
              APH WORKFLOW PIPELINE
            </span>
            <span className="text-xs text-gray-500 font-mono">Academic Session 2025–26</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-1">
            Dynamic Approval Lifecycle & Deficiency Loop
          </h2>
          <p className="text-xs text-gray-600">
            Automates stage movement according to APH dynamic rules: <span className="font-semibold text-blue-900">Scrutiny ➔ EVC ➔ SAC/SHC</span>.
          </p>
        </div>

        {/* Demo Guide Notification */}
        <div className="bg-amber-50 border border-amber-300 rounded p-2 text-xs max-w-md">
          <p className="font-semibold text-amber-900 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            Hackathon Live Demo Tip (Minute 2):
          </p>
          <p className="text-gray-700 text-[11px] mt-0.5">
            Switch role to <strong>Regional Officer</strong> to flag deficiency on Fire NOC. Switch to <strong>Institution</strong> to upload rectified deed, then back to Officer to approve and auto-leap to <strong>EVC Queue</strong>!
          </p>
        </div>
      </div>

      {/* Application Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {applications.map(app => (
          <button
            key={app.id}
            onClick={() => setSelectedAppId(app.id)}
            className={`px-3 py-2 rounded-t font-semibold border-b-2 transition-all duration-150 flex items-center space-x-2 whitespace-nowrap ${
              selectedAppId === app.id
                ? 'bg-white border-[#003366] text-[#003366] shadow-xs'
                : 'bg-gray-100 border-transparent text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{app.id}</span>
            <span className="text-[10px] text-gray-500 font-normal">({app.region} Region)</span>
            {app.status === 'DEFICIENT' && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            )}
            {app.status === 'EVC_SCHEDULED' && (
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            )}
          </button>
        ))}
      </div>

      {/* Main Application Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-xs overflow-hidden">
        {/* Application Header Card */}
        <div className="bg-linear-to-r from-gray-50 to-blue-50/40 p-4 border-b border-gray-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-[#003366] text-white px-2 py-0.5 rounded">
                {currentApp.id}
              </span>
              <span className="text-xs text-gray-600 font-mono">
                Permanent AICTE ID: <strong>{currentApp.aictePermanentId}</strong>
              </span>
              {currentApp.isNewInstitution && (
                <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold px-2 py-0.5 rounded border border-purple-300">
                  ⚡ HIGH PRIORITY: NEW TECHNICAL INSTITUTION
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-gray-900 mt-1 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#003366]" />
              {currentApp.instituteName}
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-600 mt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-500" />
                {currentApp.district}, {currentApp.state} ({currentApp.region} Region)
              </span>
              <span>•</span>
              <span className="font-medium text-gray-700">Proposal: {currentApp.applicationType}</span>
              <span>•</span>
              <span className="font-medium text-blue-900">Workflow: {currentApp.workflowRoute}</span>
            </div>
          </div>

          {/* SLA Counter & Status Badge */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <div className="bg-white border border-gray-200 p-2 rounded shadow-2xs text-center min-w-[120px]">
              <div className="text-[10px] text-gray-500 uppercase font-bold">NeSDA SLA Watch</div>
              <div className="text-sm font-extrabold text-blue-950 flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Day {currentApp.daysElapsed} of {currentApp.slaDeadlineDays}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div 
                  className={`h-1.5 rounded-full ${
                    currentApp.daysElapsed > currentApp.slaDeadlineDays 
                      ? 'bg-red-600' 
                      : (currentApp.daysElapsed > 7 ? 'bg-amber-500' : 'bg-emerald-600')
                  }`}
                  style={{ width: `${Math.min(100, (currentApp.daysElapsed / currentApp.slaDeadlineDays) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-gray-500 uppercase font-bold">Stage Status</div>
              <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                currentApp.status === 'DEFICIENT' 
                  ? 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                  : currentApp.status === 'EVC_SCHEDULED'
                  ? 'bg-purple-100 text-purple-900 border border-purple-300'
                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}>
                {currentApp.status === 'DEFICIENT' ? 'Deficiency Revert' : currentApp.status}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Visual Stage Stepper */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
            APH 2025 Multi-Stage Route Progression
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {stages.map((stage, idx) => {
              const isDone = stage.status === 'COMPLETED';
              const isInProgress = stage.status === 'IN_PROGRESS';
              const isDeficient = stage.status === 'DEFICIENT';
              return (
                <div 
                  key={stage.key}
                  className={`p-2.5 rounded border text-xs flex flex-col justify-between transition-all ${
                    isDone 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : isDeficient
                      ? 'bg-red-50 border-red-400 text-red-900 ring-2 ring-red-200'
                      : isInProgress
                      ? 'bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-100 font-bold'
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{stage.label}</span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {isDeficient && <AlertTriangle className="w-4 h-4 text-red-600 animate-bounce" />}
                    {isInProgress && <Clock className="w-4 h-4 text-blue-600 animate-spin" />}
                  </div>
                  <div className="text-[10px] mt-1 font-mono uppercase">
                    {isDone ? 'Cleared' : isDeficient ? 'Reverted (Deficiency)' : isInProgress ? 'Active Stage' : 'Pending'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts / Success Feedback Messages */}
        {reuploadSuccess && (
          <div className="m-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Document Re-uploaded Successfully:</strong> Fire Safety NOC (2026-2029 Certified) received. Regional Scrutiny Officer notified for re-verification.
              </span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-200 px-2 py-0.5 rounded">ACK-8420-OK</span>
          </div>
        )}

        {stageClearedSuccess && (
          <div className="m-4 p-4 bg-linear-to-r from-blue-900 to-indigo-900 text-white text-xs rounded shadow-lg flex items-center justify-between animate-fadeIn">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-6 h-6 text-amber-300 animate-spin" />
              <div>
                <h4 className="font-bold text-sm text-amber-300">
                  🎉 Scrutiny Stage Cleared & Application Fast-Tracked to EVC Queue!
                </h4>
                <p className="text-blue-100 text-[11px] mt-0.5">
                  Automated routing engine has allocated inspection slot to Expert Panel headed by Prof. S.N. Mukherjee (IIT Kanpur). Zero manual email delays!
                </p>
              </div>
            </div>
            <button
              onClick={() => {}}
              className="px-3 py-1 bg-amber-400 text-blue-950 font-bold rounded text-xs hover:bg-amber-300"
            >
              View in EVC Tab
            </button>
          </div>
        )}

        {/* Revert / Deficiency Active Warning Notice */}
        {currentApp.status === 'DEFICIENT' && (
          <div className="m-4 p-3.5 bg-red-50 border-l-4 border-red-600 rounded-r text-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-red-900 text-sm">
                    ⚠️ Application Locked in Deficiency Revert State
                  </h4>
                  <p className="text-red-800 text-[11px] mt-0.5">
                    <strong>Statutory Clause:</strong> {currentApp.deficiencyHistory[0]?.clause}
                  </p>
                  <p className="text-red-700 text-xs mt-1 bg-red-100/70 p-2 rounded border border-red-200 font-mono">
                    "{currentApp.deficiencyHistory[0]?.remarks}"
                  </p>
                </div>
              </div>

              {/* Institution Action Button */}
              {currentRole === 'INSTITUTION' && (
                <button
                  onClick={handleReuploadDoc}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold px-3 py-2 rounded text-xs flex items-center space-x-1.5 shadow-xs shrink-0 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Rectified Fire NOC</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Document Checklist & Stage Action Panel */}
        <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Statutory Document Checklist */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#003366]" />
                Mandatory Institutional Documents (APH Verification)
              </h4>
              <span className="text-[11px] text-gray-500 font-medium">
                4 Required • 100% Cryptographic Check
              </span>
            </div>

            <div className="space-y-2">
              {currentApp.documents.map((doc) => {
                const isDef = doc.status === 'DEFICIENT';
                const isRect = doc.status === 'RECTIFIED_PENDING_APPROVAL';
                return (
                  <div
                    key={doc.id}
                    className={`p-3 border rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                      isDef 
                        ? 'border-red-400 bg-red-50/50' 
                        : isRect
                        ? 'border-amber-400 bg-amber-50/60'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded font-bold">
                          {doc.id}
                        </span>
                        <span className="font-bold text-gray-900">{doc.title}</span>
                      </div>
                      <div className="text-[11px] text-gray-500 flex items-center space-x-3">
                        <span>Category: {doc.category}</span>
                        <span>•</span>
                        <span className="font-mono text-blue-900">{doc.aphClause}</span>
                      </div>
                      <div className="text-[11px] text-gray-600 font-medium">
                        Verification Note: <span className={isDef ? 'text-red-700 font-bold' : 'text-gray-700'}>{doc.validity}</span>
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
                        {isDef ? 'Deficient' : isRect ? 'Rectified (Pending Review)' : 'Verified'}
                      </span>

                      {/* Scrutiny Officer Actions */}
                      {currentRole === 'REGIONAL_OFFICER' && (
                        <button
                          onClick={() => {
                            setSelectedDocForDeficiency(doc);
                            setShowDeficiencyModal(true);
                          }}
                          className="px-2 py-1 border border-red-300 text-red-700 hover:bg-red-50 rounded text-[11px] font-semibold flex items-center space-x-1 cursor-pointer"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          <span>Flag</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 1 Col: Role Action Box & Statutory Human Gate */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  Active Officer Console
                </span>
                <span className="text-[10px] font-mono text-blue-900 bg-blue-100 px-1.5 py-0.5 rounded">
                  APH Gatekeeper
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 mt-0.5 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#003366]" />
                {currentRole === 'REGIONAL_OFFICER' 
                  ? 'Dr. R.K. Sharma (RO Kanpur)' 
                  : currentRole === 'INSTITUTION' 
                  ? 'Aryavart Institute Authority' 
                  : 'AICTE Official Desk'}
              </h4>
              <p className="text-[11px] text-gray-600 mt-1">
                Role Authority: {currentRole}
              </p>
            </div>

            {/* Officer Action Buttons */}
            {currentRole === 'REGIONAL_OFFICER' ? (
              <div className="space-y-2.5 pt-2 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-800">
                  Scrutiny Decision Gateway:
                </div>

                <button
                  onClick={handleApproveScrutiny}
                  disabled={currentApp.status === 'DEFICIENT'}
                  className={`w-full py-2.5 px-3 rounded font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors cursor-pointer ${
                    currentApp.status === 'DEFICIENT'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve Scrutiny & Auto-Forward to EVC</span>
                </button>

                <button
                  onClick={() => setShowDeficiencyModal(true)}
                  className="w-full py-2 px-3 border border-red-600 text-red-700 hover:bg-red-50 rounded font-semibold text-xs flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Formal Revert (Log Deficiency)</span>
                </button>

                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-[11px] text-blue-900 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                    Regulatory Human Gate Enforced
                  </div>
                  <p className="text-[10px] text-blue-800 leading-tight">
                    Statutory decisions require authentic officer sign-off. Automation handles handoffs and SLA clocking.
                  </p>
                </div>
              </div>
            ) : currentRole === 'INSTITUTION' ? (
              <div className="space-y-2.5 pt-2 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-800">
                  Institutional Action Center:
                </div>
                {currentApp.status === 'DEFICIENT' ? (
                  <button
                    onClick={handleReuploadDoc}
                    className="w-full py-2.5 px-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded text-xs flex items-center justify-center space-x-2 shadow-md cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Rectified Fire Safety NOC</span>
                  </button>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900">
                    <p className="font-bold">No Pending Actions</p>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Your proposal is under active processing by the AICTE Regional Office.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-200 text-xs text-gray-600">
                <p className="text-[11px]">
                  Logged in as <strong>{currentRole}</strong>. Switch to <strong>Regional Scrutiny Officer</strong> or <strong>Institution</strong> to interact with this application's deficiency loop.
                </p>
              </div>
            )}

            {/* Quick Audit Hash Stamp */}
            <div className="pt-2 border-t border-gray-200 text-[10px] font-mono text-gray-500">
              <span className="font-bold text-gray-700">Latest Chained Hash:</span>
              <p className="truncate text-blue-900">sha256:b39dc1490e5f67a84029df4821a37c92b5120198c39e018a77f98124b1ca9823</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deficiency Modal Popup */}
      {showDeficiencyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border-t-4 border-red-600 overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Issue Formal Deficiency Revert (APH Chapter 2)
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
                  Target Statutory Document:
                </label>
                <div className="p-2 bg-gray-100 rounded text-gray-800 font-mono">
                  {selectedDocForDeficiency?.title || 'DOC-03: State Fire Safety NOC'}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Statutory APH Clause / Regulatory Reference:
                </label>
                <input
                  type="text"
                  value={deficiencyClause}
                  onChange={(e) => setDeficiencyClause(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded font-mono text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Mandatory Deficiency Reason (Dispatched via SMS/Email):
                </label>
                <textarea
                  rows={3}
                  value={deficiencyReason}
                  onChange={(e) => setDeficiencyReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="p-2.5 bg-amber-50 border border-amber-300 rounded text-[11px] text-amber-900">
                <strong>Statutory Guard:</strong> Submitting will lock application in <em>Deficiency Revert</em> state and trigger automated multi-channel alert to the institution's Registered Email and Mobile.
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeficiencyModal(false)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFlagDeficiency}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Issue Revert</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
