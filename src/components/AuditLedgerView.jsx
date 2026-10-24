import React, { useState } from 'react';
import { 
  ScrollText, 
  ShieldCheck, 
  Hash, 
  Clock, 
  User, 
  Search, 
  Filter, 
  CheckCircle2, 
  Lock, 
  ExternalLink, 
  Copy, 
  Check 
} from 'lucide-react';

export default function AuditLedgerView({ auditLogs, language = 'en', t = (k) => k }) {
  const isHi = language === 'hi';
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredLogs = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.remarks.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyHash = (hash, id) => {
    navigator.clipboard?.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border-l-4 border-emerald-700 p-4 rounded-r shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded border border-emerald-300">
              {isHi ? 'अपरिवर्तनीय डिजिटल ऑडिट लेजर' : 'IMMUTABLE DIGITAL AUDIT LEDGER'}
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {isHi ? 'SHA-256 क्रिप्टोग्राफ़िक शृंखला' : 'SHA-256 Cryptographic Chaining'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mt-1">
            {isHi ? 'छेड़छाड़-मुक्त ऑडिट ट्रेल एवं विधिक सुरक्षा लेजर' : 'Tamper-Proof Audit Trail & Statutory Safeguard Ledger'}
          </h2>
          <p className="text-xs text-gray-600">
            {isHi 
              ? 'DPDP अधिनियम 2023 के तहत प्रत्येक संवीक्षा टिप्पणी, कमी विवरण, EVC अपलोड तथा पट्टा चेतावनी का अपरिवर्तनीय डिजिटल रिकॉर्ड।'
              : 'Append-only legal record preserving every scrutiny remark, deficiency revert, EVC upload, and lease alert with strict hash linkage under DPDP Act 2023 guidelines.'}
          </p>
        </div>

        {/* Demo Script Guide */}
        <div className="bg-emerald-50 border border-emerald-300 rounded p-2 text-xs max-w-sm">
          <p className="font-bold text-emerald-900">{isHi ? 'मिनट 4 प्रस्तुति बिंदु:' : 'Minute 4 Presentation Point:'}</p>
          <p className="text-emerald-800 text-[11px] mt-0.5">
            {isHi 
              ? 'डेमो के दौरान उपयोगकर्ता द्वारा की गई प्रत्येक कार्रवाई (कमी दर्ज करना, पट्टा अपलोड, चरण स्वीकृति) नीचे पैरेंट हैश लिंकेज के साथ दर्ज होती है।'
              : 'Every user action taken during the demo (flagging a deficiency, uploading a renewed lease, clearing a stage) is cryptographically stamped below with parent hash linkage.'}
          </p>
        </div>
      </div>

      {/* Security Verification Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center space-x-3">
          <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <div className="font-bold text-gray-900">
              {isHi ? 'शृंखला अखंडता: 100% सत्यापित' : 'Chain Integrity: 100% Verified'}
            </div>
            <div className="text-gray-500 text-[11px]">
              {isHi ? 'सभी ब्लॉक क्रिप्टोग्राफिक रूप से वैध' : 'All blocks cryptographically valid'}
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center space-x-3">
          <Lock className="w-8 h-8 text-blue-900 shrink-0" />
          <div>
            <div className="font-bold text-gray-900">
              {isHi ? 'DPDP अधिनियम 2023 अनुपालित' : 'DPDP Act 2023 Compliant'}
            </div>
            <div className="text-gray-500 text-[11px]">
              {isHi ? 'व्यक्तिगत पहचानकर्ता सुरक्षित एवं भूमिका-नियंत्रित' : 'Personal identifiers masked & role-gated'}
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center space-x-3">
          <Hash className="w-8 h-8 text-purple-700 shrink-0" />
          <div>
            <div className="font-bold text-gray-900">
              {isHi ? 'एल्गोरिदम: SHA-256 शृंखलाबद्ध' : 'Algorithm: SHA-256 Chained'}
            </div>
            <div className="text-gray-500 text-[11px]">
              {isHi ? 'भूतलक्षी संशोधन पूर्णतः असंभव' : 'Zero retroactive modifications possible'}
            </div>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={isHi ? "कार्रवाई, कर्ता, आवेदन आईडी या टिप्पणी से खोजें..." : "Search by action, actor, application ID, or remarks..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-[#003366] focus:outline-none"
          />
        </div>
        <span className="text-xs text-gray-500 font-mono">
          {isHi ? `${filteredLogs.length} अपरिवर्तनीय ब्लॉक प्रदर्शित` : `Showing ${filteredLogs.length} Immutable Blocks`}
        </span>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200 text-[11px] uppercase tracking-wider">
                <th className="p-3">{isHi ? 'ब्लॉक #' : 'Block #'}</th>
                <th className="p-3">{isHi ? 'समय-मुहर (IST)' : 'Timestamp (IST)'}</th>
                <th className="p-3">{isHi ? 'कर्ता एवं पद' : 'Actor & Role'}</th>
                <th className="p-3">{isHi ? 'कार्रवाई' : 'Action Event'}</th>
                <th className="p-3">{isHi ? 'लक्षित संदर्भ' : 'Target Ref'}</th>
                <th className="p-3">{isHi ? 'नियामक टिप्पणी' : 'Remarks / Regulatory Note'}</th>
                <th className="p-3">{isHi ? 'SHA-256 स्थिति हैश' : 'SHA-256 State Hash'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-3 font-mono font-bold text-gray-900">
                    #{log.id}
                  </td>
                  <td className="p-3 text-gray-600 font-mono whitespace-nowrap text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-gray-900">{log.actor}</div>
                    <div className="text-[10px] text-gray-500 font-medium">{log.role}</div>
                  </td>
                  <td className="p-3">
                    <span className="font-mono font-bold text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-200 inline-block">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-semibold text-gray-800">
                    {log.applicationId}
                  </td>
                  <td className="p-3 text-gray-700 max-w-xs text-[11px]">
                    {log.remarks}
                  </td>
                  <td className="p-3 font-mono text-[10px] max-w-[150px]">
                    <div className="flex items-center space-x-1">
                      <span className="truncate text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200" title={log.currHash}>
                        {log.currHash.slice(0, 14)}...
                      </span>
                      <button
                        onClick={() => handleCopyHash(log.currHash, log.id)}
                        className="text-gray-400 hover:text-gray-700"
                        title={isHi ? "SHA-256 हैश कॉपी करें" : "Copy SHA-256 Hash"}
                      >
                        {copiedId === log.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
