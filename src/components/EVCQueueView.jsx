import React, { useState } from 'react';
import { 
  CalendarClock, 
  UserCheck, 
  FileCheck, 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  Building2, 
  MapPin, 
  Sparkles,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export default function EVCQueueView({ applications, setApplications, onAddAuditLog, currentRole }) {
  const [scheduledDate, setScheduledDate] = useState('2026-11-08');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Filter applications that are in or cleared scrutiny heading to EVC
  const evcApplications = applications.filter(
    app => app.currentStage === 'EVC_Pending' || app.workflowRoute.includes('EVC')
  );

  const handleUploadEVCReport = (appId) => {
    const updated = applications.map(app => {
      if (app.id === appId) {
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
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 5000);

    onAddAuditLog({
      actor: 'Prof. S.N. Mukherjee (Lead Expert, IIT Kanpur)',
      role: 'EVC Inspection Committee',
      action: 'EVC_INSPECTION_REPORT_SUBMITTED',
      applicationId: appId,
      remarks: 'Campus physical inspection completed. Infrastructure, lab equipment, and faculty roster verified compliant under APH Chapter 1. Recommended for SAC / Final Approval.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border-l-4 border-purple-700 p-4 rounded-r shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-purple-100 text-purple-900 text-xs font-bold px-2.5 py-0.5 rounded border border-purple-300">
              EXPERT VISIT COMMITTEE (EVC) DESK
            </span>
            <span className="text-xs text-gray-500 font-mono">Fast-Track Inspection Queue</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-1">
            Intelligent EVC Queue & Fast-Track Priority Scheduling
          </h2>
          <p className="text-xs text-gray-600">
            Automatically prioritizes new technical institutions requiring statutory campus inspection, matches expert panels, and monitors 14-day inspection SLAs.
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded p-2 text-xs max-w-sm">
          <p className="font-bold text-purple-900">Priority Engine Active:</p>
          <p className="text-purple-800 text-[11px] mt-0.5">
            New institution proposals (e.g. <strong>APP-2025-0842</strong>) automatically leap to the front of the inspection roster upon scrutiny clearance.
          </p>
        </div>
      </div>

      {/* Report Upload Feedback */}
      {reportSuccess && (
        <div className="p-3.5 bg-emerald-900 text-white rounded-lg shadow-md text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-emerald-200">
                ✅ EVC Inspection Report Cryptographically Uploaded & Signed!
              </p>
              <p className="text-emerald-100 text-[11px]">
                Lead Expert Dr. S.N. Mukherjee has submitted favorable recommendation. Application advanced to SAC / Final Approval Stage.
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-emerald-800 px-2.5 py-1 rounded">EVC-VERIFIED</span>
        </div>
      )}

      {/* Queue List */}
      <div className="space-y-4">
        {evcApplications.map((app) => {
          const isQueued = app.currentStage === 'EVC_Pending';
          const isDone = app.evcDetails?.reportSubmitted;

          return (
            <div
              key={app.id}
              className={`bg-white rounded-lg border p-4 shadow-xs transition-all ${
                app.isNewInstitution ? 'border-purple-300 ring-1 ring-purple-100' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold bg-[#003366] text-white px-2 py-0.5 rounded">
                      {app.id}
                    </span>
                    {app.isNewInstitution && (
                      <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold px-2 py-0.5 rounded border border-purple-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-purple-700" />
                        TOP PRIORITY: NEW TECHNICAL COLLEGE
                      </span>
                    )}
                    <span className="text-xs text-gray-500 font-semibold">
                      {app.region} Region • {app.state}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mt-1 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#003366]" />
                    {app.instituteName}
                  </h3>

                  {/* Expert Panel Breakdown */}
                  <div className="mt-2 p-2.5 bg-gray-50 rounded border border-gray-200 text-xs space-y-1">
                    <div className="font-bold text-gray-700 flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-blue-900" />
                      AICTE Matched Expert Panel:
                    </div>
                    <div className="text-gray-600 flex flex-wrap gap-2 text-[11px]">
                      <span><strong>Lead Expert:</strong> {app.evcDetails?.leadExpert || 'Prof. S.N. Mukherjee (IIT Kanpur)'}</span>
                      <span>•</span>
                      <span><strong>Committee:</strong> Dr. Preeti Verma (NIT), Er. V.K. Goel</span>
                    </div>
                  </div>
                </div>

                {/* Inspection Actions */}
                <div className="flex flex-col gap-2 self-end lg:self-auto shrink-0 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 font-medium">Proposed Date:</span>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-xs font-mono"
                    />
                  </div>

                  {isDone ? (
                    <div className="p-2 bg-emerald-50 border border-emerald-300 rounded text-center">
                      <span className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        Report Submitted & Cleared
                      </span>
                      <span className="text-[10px] text-emerald-700">Recommended for Final Approval</span>
                    </div>
                  ) : isQueued ? (
                    <button
                      onClick={() => handleUploadEVCReport(app.id)}
                      className="bg-purple-800 hover:bg-purple-900 text-white font-bold px-4 py-2 rounded text-xs flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload & Digitally Sign Inspection Report</span>
                    </button>
                  ) : (
                    <div className="p-2 bg-gray-100 rounded text-center text-xs text-gray-500">
                      Awaiting Scrutiny Clearance
                    </div>
                  )}

                  <div className="text-[10px] text-gray-500 text-center font-mono">
                    Mandatory 14-Day EVC SLA Active
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
