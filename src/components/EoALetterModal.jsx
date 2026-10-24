import React, { useState } from 'react';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Download, 
  Building2, 
  FileText,
  ExternalLink,
  Lock,
  Sparkles
} from 'lucide-react';
import { AshokaStambh, AicteEmblem } from './Emblems';

export default function EoALetterModal({ application, onClose, language = 'en' }) {
  const isHi = language === 'hi';
  const [showQrVerification, setShowQrVerification] = useState(false);

  if (!application) return null;

  const handlePrint = () => {
    window.print();
  };

  // Dynamically tailor courses based on application
  const getCourses = () => {
    if (application.id === 'APP-2025-1104') {
      return [
        { program: 'Engineering & Technology', level: 'UG', course: 'Computer Science & Engineering', intake24: 180, intake25: 240, status: 'Approved' },
        { program: 'Engineering & Technology', level: 'UG', course: 'Cyber Security & Forensic Computing', intake24: 0, intake25: 60, status: 'New Approved' },
        { program: 'Engineering & Technology', level: 'UG', course: 'Information Technology', intake24: 120, intake25: 120, status: 'Approved' }
      ];
    } else if (application.id === 'APP-2025-0722') {
      return [
        { program: 'Engineering & Technology', level: 'UG', course: 'Computer Science & Engineering', intake24: 120, intake25: 120, status: 'Conditional (Lease T-28d)' },
        { program: 'Engineering & Technology', level: 'UG', course: 'Civil Engineering', intake24: 60, intake25: 60, status: 'Approved' },
        { program: 'Engineering & Technology', level: 'UG', course: 'Electrical & Electronics Engg', intake24: 60, intake25: 60, status: 'Approved' }
      ];
    } else {
      return [
        { program: 'Engineering & Technology', level: 'UG', course: 'Computer Science & Engineering', intake24: 180, intake25: 180, status: 'Approved' },
        { program: 'Engineering & Technology', level: 'UG', course: 'Artificial Intelligence & Machine Learning', intake24: 0, intake25: 60, status: 'New Approved' },
        { program: 'Engineering & Technology', level: 'UG', course: 'Electronics & Communication Engg', intake24: 120, intake25: 120, status: 'Approved' }
      ];
    }
  };

  const courses = getCourses();
  const totalSanctionedIntake = courses.reduce((sum, c) => sum + c.intake25, 0);

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full border border-gray-300 overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none">
        
        {/* Top Control Bar (Hidden during printing) */}
        <div className="bg-[#002244] text-white px-5 py-3 flex items-center justify-between print:hidden border-b-2 border-amber-400">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-blue-950 text-xs font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
              {isHi ? 'विधिक अनुमोदन आदेश (EoA)' : 'OFFICIAL STATUTORY EoA ORDER'}
            </span>
            <span className="text-xs text-blue-200 font-mono hidden sm:inline">
              {application.id} • F.No. Northern/1-{application.id.replace('APP-', '')}/2025/EOA
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowQrVerification(true)}
              className="bg-blue-800 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded text-xs flex items-center space-x-1 cursor-pointer border border-blue-600"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHi ? 'QR सत्यापन' : 'Verify QR'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-3.5 py-1.5 rounded text-xs flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHi ? 'मुद्रित / PDF सहेजें' : 'Print / Save PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 text-lg font-bold ml-1 cursor-pointer"
              title={isHi ? "बंद करें" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Letter Container */}
        <div className="p-6 sm:p-10 md:p-12 text-slate-900 bg-white font-serif relative">
          
          {/* Subtle AICTE National Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
            <div className="text-center">
              <div className="text-9xl font-black text-[#003366]">AICTE</div>
              <div className="text-2xl font-bold tracking-widest mt-2">GOVERNMENT OF INDIA</div>
            </div>
          </div>

          {/* National Tricolor Top Ribbon */}
          <div className="h-1.5 w-full bg-linear-to-r from-[#FF9933] via-white to-[#138808] mb-4 rounded-xs"></div>

          {/* Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 text-center relative">
            <div className="flex items-center justify-between mb-2 gap-2">
              <AshokaStambh className="w-14 h-18 shrink-0" />
              
              <div className="text-center px-2 flex-1">
                <div className="text-[11px] font-bold text-slate-700 tracking-wider uppercase font-sans">
                  {isHi ? 'भारत सरकार • शिक्षा मंत्रालय' : 'GOVERNMENT OF INDIA • MINISTRY OF EDUCATION'}
                </div>
                <div className="text-lg sm:text-2xl font-black text-[#003366] font-sans tracking-wide mt-0.5">
                  अखिल भारतीय तकनीकी शिक्षा परिषद
                </div>
                <div className="text-xs sm:text-base font-black text-slate-900 font-sans tracking-wider">
                  ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
                </div>
                <div className="text-[11px] text-slate-600 italic font-sans mt-0.5">
                  (A Statutory Body under Ministry of Education, Govt. of India)
                </div>
                <div className="text-[10px] text-slate-600 font-sans mt-0.5">
                  Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070 | Ph: 011-29581000 | Website: www.aicte-india.org
                </div>
              </div>

              <AicteEmblem className="w-16 h-16 shrink-0" />
            </div>
          </div>

          {/* Reference Metadata Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start text-xs font-sans mt-4 text-slate-800 gap-2 border-b border-gray-200 pb-3">
            <div>
              <div><strong>F. No.</strong> Northern/1-{application.id.replace('APP-', '')}/2025/EOA</div>
              <div><strong>AICTE Permanent Institute ID (PID):</strong> <span className="font-mono font-bold text-[#003366]">{application.aictePermanentId}</span></div>
              <div><strong>Regional Office:</strong> {application.region} Regional Office (Kanpur)</div>
            </div>
            <div className="text-left sm:text-right">
              <div><strong>Date of Issue:</strong> 24-Oct-2026</div>
              <div><strong>Academic Session:</strong> 2025–2026</div>
              <div><strong>Dispatch Ref:</strong> AICTE/AB/EOA-2025-26/GEN</div>
            </div>
          </div>

          {/* Addressee */}
          <div className="text-xs font-sans mt-4 space-y-0.5 text-slate-800">
            <div className="font-bold text-slate-900">To,</div>
            <div>The Principal / Secretary / Director,</div>
            <div className="font-bold text-[#003366] text-sm">{application.instituteName}</div>
            <div>Campus Address: {application.district}, {application.state} - 250005</div>
            <div>Affiliating University: Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow</div>
          </div>

          {/* Subject Line */}
          <div className="text-xs font-sans mt-4 bg-slate-100 p-3 rounded border-l-4 border-[#003366] font-semibold text-slate-900 leading-snug">
            <strong>Sub:</strong> Extension of Approval (EoA) / Grant of Approval for Academic Year 2025–26 under AICTE Approval Process Handbook (APH 2024–27) & Regulations notified vide F.No. AB/AICTE/REG/2020 dated 4th February, 2020.
          </div>

          {/* Formal Body Paragraph */}
          <div className="text-xs font-sans mt-3.5 space-y-2 leading-relaxed text-slate-800 text-justify">
            <p>
              Sir / Madam,
            </p>
            <p>
              In terms of the provisions under the All India Council for Technical Education (Grant of Approvals for Technical Institutions) Regulations, 2020 notified by the Council vide notification number F.No. AB/AICTE/REG/2020 and subsequent amendments from time to time, and norms, standards, procedures and conditions prescribed by the Council from time to time, I am directed to convey the Extension of Approval (EoA) to:
            </p>
          </div>

          {/* Official Sanctioned Courses & Intake Table */}
          <div className="mt-4 overflow-x-auto border border-slate-300 rounded text-xs font-sans">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                  <th className="p-2.5 border-r border-slate-300">Program</th>
                  <th className="p-2.5 border-r border-slate-300">Level</th>
                  <th className="p-2.5 border-r border-slate-300">Approved Course / Specialization</th>
                  <th className="p-2.5 border-r border-slate-300 text-center">Affiliating Body</th>
                  <th className="p-2.5 border-r border-slate-300 text-center">Intake 24-25</th>
                  <th className="p-2.5 border-r border-slate-300 text-center bg-blue-50 text-blue-950">Intake 25-26</th>
                  <th className="p-2.5 text-center">Approval Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {courses.map((c, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-2.5 border-r border-slate-200 font-semibold">{c.program}</td>
                    <td className="p-2.5 border-r border-slate-200">{c.level}</td>
                    <td className="p-2.5 border-r border-slate-200 font-bold text-slate-900">{c.course}</td>
                    <td className="p-2.5 border-r border-slate-200 text-center text-[10px] text-slate-600">AKTU, Lucknow</td>
                    <td className="p-2.5 border-r border-slate-200 text-center font-mono text-slate-600">{c.intake24}</td>
                    <td className="p-2.5 border-r border-slate-200 text-center font-mono font-bold text-emerald-800 bg-emerald-50/50">
                      {c.intake25}
                    </td>
                    <td className="p-2.5 text-center">
                      <span className="font-bold text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-900">
                  <td colSpan={5} className="p-2.5 text-right border-r border-slate-300 uppercase text-[11px]">
                    Total Sanctioned Annual Intake for AY 2025–26:
                  </td>
                  <td className="p-2.5 text-center font-mono text-sm text-emerald-900 bg-emerald-100 font-black border-r border-slate-300">
                    {totalSanctionedIntake}
                  </td>
                  <td className="p-2.5 text-center text-[10px] text-emerald-800">
                    ALL SANCTIONED
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mandatory Statutory Stipulations & Undertakings */}
          <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-300 rounded text-[11px] font-sans text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Mandatory Statutory Compliance Undertakings & Safeguards (APH 2024–27):</span>
            </div>
            <ul className="list-disc pl-5 space-y-0.5 text-slate-700 leading-relaxed">
              <li>
                <strong>30-Year Land Lease Continuum:</strong> The Institution must maintain registered land lease validity continuously for a minimum period of 30 years as per APH Chapter 1. Any lapse in lease registration will automatically revoke this approval order.
              </li>
              <li>
                <strong>Biometric Attendance & Faculty Cadre:</strong> Strict adherence to AICTE mandated faculty-to-student cadre ratio (1:15 or 1:20) and implementation of national biometric attendance systems.
              </li>
              <li>
                <strong>Safety & Structural Integrity:</strong> Valid Fire Safety NOC from State Chief Fire Officer and Structural Soundness Certificate under National Building Code (NBC 2016) must be maintained at all times.
              </li>
              <li>
                <strong>Anti-Ragging & Grievance Redressal:</strong> Strict compliance with the AICTE Anti-Ragging Regulations 2009 and establishment of Online Grievance Redressal Mechanism.
              </li>
            </ul>
          </div>

          {/* Official Copy To Section (As in authentic AICTE orders) */}
          <div className="mt-4 text-[10px] font-sans text-slate-600 border-t border-gray-200 pt-3">
            <div className="font-bold text-slate-800 uppercase mb-1">Copy forwarded for information and necessary action to:</div>
            <ol className="list-decimal pl-4 space-y-0.5">
              <li>The Regional Officer, AICTE Northern Regional Office, Vikas Nagar, Kanpur - 208002.</li>
              <li>The Director of Technical Education, Government of Uttar Pradesh, Kanpur.</li>
              <li>The Registrar, Dr. A.P.J. Abdul Kalam Technical University, Sector 11, Jankipuram Vistar, Lucknow.</li>
              <li>Guard File (Approval Bureau), AICTE Headquarters, Nelson Mandela Marg, New Delhi - 110070.</li>
            </ol>
          </div>

          {/* Digital Signature & Verification QR Code Section */}
          <div className="mt-6 pt-4 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between items-end gap-4 font-sans text-xs">
            
            {/* Authentic QR Code Verification Badge */}
            <div 
              onClick={() => setShowQrVerification(true)}
              className="flex items-center space-x-3 bg-slate-50 hover:bg-slate-100 p-2.5 rounded border border-slate-300 transition-colors cursor-pointer group shadow-2xs"
            >
              <div className="p-1 bg-white border border-slate-400 rounded group-hover:ring-2 group-hover:ring-[#003366]">
                <QrCode className="w-16 h-16 text-slate-900" />
              </div>
              <div className="text-[10px] text-slate-600">
                <div className="font-bold text-slate-900 uppercase flex items-center gap-1">
                  <span>AICTE VERIFIABLE DIGITAL SEAL</span>
                  <ExternalLink className="w-3 h-3 text-blue-700" />
                </div>
                <div>Click to test instant verification</div>
                <div className="font-mono text-[#003366] font-bold">portal.aicte-india.org/verify</div>
                <div className="font-mono text-[9px] text-slate-500 mt-0.5">SHA-256: 4a9f73c091e847b83e</div>
              </div>
            </div>

            {/* Officer Digital Signature Block */}
            <div className="text-right">
              <div className="inline-block border-b border-dashed border-slate-400 pb-1 mb-1">
                <span className="text-emerald-700 font-mono text-[11px] font-bold flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>DIGITALLY SIGNED</span>
                </span>
                <div className="text-[10px] font-mono text-slate-500">2026.10.24 14:32:10 +05'30'</div>
              </div>
              <div className="font-black text-slate-900 text-sm">Prof. Rajive Kumar</div>
              <div className="text-slate-700 text-xs font-semibold">Member Secretary</div>
              <div className="text-slate-500 text-[11px]">All India Council for Technical Education</div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Control Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center print:hidden">
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>DPDP Act 2023 & IT Act 2000 Section 43A Compliant</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#003366] hover:bg-blue-900 text-white font-bold rounded text-xs flex items-center space-x-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHi ? 'प्रिंट करें' : 'Print Order'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded text-xs cursor-pointer"
            >
              {isHi ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive QR Code Instant Verification Dialog */}
      {showQrVerification && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full border-t-4 border-emerald-600 p-5 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="font-black text-gray-900 text-sm">
                  AICTE Central Repository Verification
                </h3>
              </div>
              <button 
                onClick={() => setShowQrVerification(false)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2 text-gray-700">
              <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-900 font-medium">
                ✅ <strong>VERIFIED GENUINE ORDER:</strong> This Extension of Approval (EoA) order was issued directly from the AICTE Central Approval Server.
              </div>

              <div className="space-y-1 font-mono text-[11px] bg-gray-50 p-3 rounded border border-gray-200">
                <div><strong>PID:</strong> {application.aictePermanentId}</div>
                <div><strong>Institute:</strong> {application.instituteName}</div>
                <div><strong>Academic Year:</strong> 2025–2026</div>
                <div><strong>Total Intake:</strong> {totalSanctionedIntake} Seats</div>
                <div><strong>Signatory:</strong> Prof. Rajive Kumar (Member Secretary)</div>
                <div className="text-gray-500 truncate"><strong>SHA-256:</strong> 4a9f73c091e847b83ec489201f89bc7291a84</div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowQrVerification(false)}
                className="px-4 py-1.5 bg-[#003366] text-white font-bold rounded text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
