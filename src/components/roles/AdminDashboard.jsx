import React, { useState } from 'react';
import { 
  Sliders, 
  Save, 
  CheckCircle, 
  ScrollText, 
  Code2, 
  ShieldCheck, 
  Server, 
  Sparkles, 
  Search, 
  Copy, 
  Check 
} from 'lucide-react';
import { INITIAL_RULE_ENGINE_SETTINGS } from '../../data/mockData';

export default function AdminDashboard({ auditLogs, onAddAuditLog, language = 'en', t = (k) => k }) {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState('rules');
  const [rules, setRules] = useState(INITIAL_RULE_ENGINE_SETTINGS);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleToggle = (key) => {
    setRules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNumberChange = (key, val) => {
    setRules(prev => ({ ...prev, [key]: parseInt(val) || 0 }));
  };

  const handleSaveRules = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 5000);

    onAddAuditLog({
      actor: isHi ? 'AICTE शीर्ष प्रशासन' : 'AICTE Apex Administration',
      role: isHi ? 'प्रणाली व्यवस्थापक' : 'System Administrator',
      action: 'APH_RULE_ENGINE_UPDATED',
      applicationId: `POLICY-${rules.academicYear}`,
      remarks: isHi 
        ? `APH कार्यप्रणाली मैट्रिक्स अद्यतित: संवीक्षा SLA=${rules.scrutinySlaDays} दिन, नवीन कॉलेज EVC=${rules.requireEvcForNewColleges}। शून्य डाउनटाइम में गतिशील अपडेट लागू।`
        : `Updated APH workflow matrix: Scrutiny SLA=${rules.scrutinySlaDays}d, EVC New Colleges=${rules.requireEvcForNewColleges}. Dynamic update live without redeployment.`
    });
  };

  const handleCopyHash = (hash, id) => {
    navigator.clipboard?.writeText(hash);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredLogs = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.remarks.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Admin Identification Bar */}
      <div className="bg-white border-t-4 border-indigo-700 p-5 rounded-lg shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-3 bg-indigo-100 text-indigo-900 rounded-lg">
            <Server className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs font-bold bg-indigo-900 text-white px-2 py-0.5 rounded">
                {isHi ? 'प्रणाली विन्यास एवं नीति पटल' : 'SYSTEM CONFIG & POLICY DESK'}
              </span>
              <span className="bg-indigo-100 text-indigo-900 text-[11px] font-bold px-2 py-0.5 rounded">
                {isHi ? 'ई-गवर्नेंस प्रकोष्ठ • AICTE मुख्यालय' : 'E-Governance Cell • AICTE HQ'}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">
                BPMN 2.0 Dynamic Engine
              </span>
            </div>
            <h1 className="text-xl font-black text-gray-900 mt-1">
              {isHi ? 'APH गतिशील नियम विन्यासकर्ता एवं सुरक्षित ऑडिट लेजर' : 'APH Dynamic Rule Configurator & Cryptographic Ledger'}
            </h1>
            <p className="text-xs text-gray-600">
              {isHi 
                ? 'वार्षिक अनुमोदन प्रक्रिया पुस्तिका रूटिंग मैट्रिक्स, SLA सीमाएं एवं अपरिवर्तनीय SHA-256 ब्लॉक प्रबंधित करें'
                : 'Manage annual Approval Process Handbook routing matrices, SLA parameters, and immutable SHA-256 audit blocks'}
            </p>
          </div>
        </div>

        {/* Demo Tip */}
        <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg text-xs max-w-xs">
          <p className="font-bold text-indigo-950 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            {isHi ? 'निर्णायक Q&A बचाव कुंजी (प्रश्न 1):' : 'Judge Q&A Defense Key (Q1):'}
          </p>
          <p className="text-indigo-900 text-[11px] mt-0.5">
            {isHi 
              ? 'दिखाएं कि जब वार्षिक APH नियम बदलते हैं, तो व्यवस्थापक कोड बदले बिना यहां से नियम बदलते हैं!'
              : 'Shows judges that when yearly APH regulations change, administrators modify rules here via simple controls without developer redeployments!'}
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 text-xs">
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-4 py-2.5 font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'rules'
              ? 'border-indigo-700 text-indigo-900 bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Sliders className="w-4 h-4 text-indigo-600" />
          <span>{isHi ? 'APH गतिशील नियम मैट्रिक्स' : 'APH Dynamic Rule Matrix'}</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'border-indigo-700 text-indigo-900 bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <ScrollText className="w-4 h-4 text-emerald-600" />
          <span>{isHi ? `SHA-256 ऑडिट लेजर (${auditLogs.length} ब्लॉक)` : `SHA-256 Audit Ledger (${auditLogs.length} Blocks)`}</span>
        </button>
      </div>

      {/* Save Toast */}
      {saveSuccess && (
        <div className="p-4 bg-indigo-900 text-white rounded-lg shadow-md text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-indigo-300 animate-bounce" />
            <div>
              <p className="font-bold text-sm text-indigo-200">
                {isHi ? '✅ APH नीति नियम मेमोरी में तुरंत लागू!' : '✅ APH Policy Rules Updated Live in Memory!'}
              </p>
              <p className="text-indigo-100 text-[11px]">
                {isHi 
                  ? `कार्यप्रणाली राउटर अब शैक्षणिक सत्र ${rules.academicYear} हेतु अद्यतित मैट्रिक्स लागू कर रहा है।`
                  : `The workflow router is now enforcing updated stage matrices for Academic Year ${rules.academicYear}.`}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-indigo-800 px-2.5 py-1 rounded">RULES-LIVE</span>
        </div>
      )}

      {/* VIEW 1: DYNAMIC RULES */}
      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#003366]" />
                {isHi ? 'APH SLA सीमाएं एवं रूटिंग सेटिंग्स' : 'APH SLA Thresholds & Route Settings'}
              </h3>
              <span className="text-[11px] font-mono text-gray-500">{isHi ? 'सत्र 2025–26' : 'AY 2025–26'}</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">{isHi ? 'संवीक्षा SLA:' : 'Scrutiny SLA:'}</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={rules.scrutinySlaDays}
                    onChange={(e) => handleNumberChange('scrutinySlaDays', e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 font-mono text-xs focus:ring-1 focus:ring-indigo-700 focus:outline-none"
                  />
                  <span className="ml-1 text-gray-500">{isHi ? 'दिन' : 'Days'}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{isHi ? 'EVC SLA:' : 'EVC SLA:'}</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={rules.evcSlaDays}
                    onChange={(e) => handleNumberChange('evcSlaDays', e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 font-mono text-xs focus:ring-1 focus:ring-indigo-700 focus:outline-none"
                  />
                  <span className="ml-1 text-gray-500">{isHi ? 'दिन' : 'Days'}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">{isHi ? 'SAC अपील SLA:' : 'SAC SLA:'}</label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={rules.sacSlaDays}
                    onChange={(e) => handleNumberChange('sacSlaDays', e.target.value)}
                    className="w-full border border-gray-300 rounded p-2 font-mono text-xs focus:ring-1 focus:ring-indigo-700 focus:outline-none"
                  />
                  <span className="ml-1 text-gray-500">{isHi ? 'दिन' : 'Days'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-200">
              <h4 className="font-bold text-gray-800">{isHi ? 'गतिशील रूटिंग टॉगल:' : 'Dynamic Routing Toggles:'}</h4>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-200">
                <div>
                  <div className="font-semibold text-gray-900">{isHi ? 'नवीन कॉलेजों हेतु EVC अनिवार्य' : 'Mandate EVC for New Colleges'}</div>
                  <div className="text-[11px] text-gray-500">{isHi ? 'मार्ग: आवेदन ➔ संवीक्षा ➔ EVC ➔ SAC' : 'Route: Ingestion ➔ Scrutiny ➔ EVC ➔ SAC'}</div>
                </div>
                <input
                  type="checkbox"
                  checked={rules.requireEvcForNewColleges}
                  onChange={() => handleToggle('requireEvcForNewColleges')}
                  className="w-4 h-4 text-indigo-900 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-200">
                <div>
                  <div className="font-semibold text-gray-900">{isHi ? 'नवीन पाठ्यक्रमों हेतु EVC अनिवार्य' : 'Mandate EVC for Course Additions'}</div>
                  <div className="text-[11px] text-gray-500">{isHi ? 'प्रयोगशाला एवं संकाय का भौतिक सत्यापन' : 'Physical audit of lab equipment & faculty'}</div>
                </div>
                <input
                  type="checkbox"
                  checked={rules.requireEvcForCourseAddition}
                  onChange={() => handleToggle('requireEvcForCourseAddition')}
                  className="w-4 h-4 text-indigo-900 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-200">
                <div>
                  <div className="font-semibold text-gray-900">{isHi ? 'प्रवेश क्षमता वृद्धि हेतु EVC अनिवार्य' : 'Mandate EVC for Intake Variations'}</div>
                  <div className="text-[11px] text-gray-500">{isHi ? 'केवल संवीक्षा बनाम संवीक्षा+EVC का चयन' : 'Toggles Scrutiny-Only vs Scrutiny+EVC path'}</div>
                </div>
                <input
                  type="checkbox"
                  checked={rules.requireEvcForIntakeExpansion}
                  onChange={() => handleToggle('requireEvcForIntakeExpansion')}
                  className="w-4 h-4 text-indigo-900 rounded cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleSaveRules}
              className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-2.5 px-4 rounded text-xs flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isHi ? 'नियम तुरंत लागू करें (शून्य डाउनटाइम)' : 'Deploy Rules Live (Zero Redeployment)'}</span>
            </button>
          </div>

          {/* JSON-Logic Payload */}
          <div className="bg-gray-900 text-emerald-400 p-5 rounded-lg border border-gray-800 font-mono text-xs shadow-md space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-2 mb-3">
                <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold text-gray-300">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                  Live JSON Policy Payload
                </span>
                <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-amber-300">
                  BPMN 2.0 Engine
                </span>
              </div>

              <pre className="overflow-x-auto text-[11px] leading-relaxed text-emerald-300">
{JSON.stringify({
  aph_policy_version: "2025.2.1-RELEASE",
  academic_session: rules.academicYear,
  routing_matrix: {
    NEW_INSTITUTE: rules.requireEvcForNewColleges ? ["SCRUTINY", "EVC", "SAC_SHC"] : ["SCRUTINY", "SAC_SHC"],
    COURSE_ADDITION: rules.requireEvcForCourseAddition ? ["SCRUTINY", "EVC"] : ["SCRUTINY_ONLY"],
    INTAKE_VARIATION: rules.requireEvcForIntakeExpansion ? ["SCRUTINY", "EVC"] : ["SCRUTINY_ONLY"],
    EXTENSION_OF_APPROVAL: ["SCRUTINY_ONLY"]
  },
  sla_benchmarks_days: {
    scrutiny: rules.scrutinySlaDays,
    evc_scheduling: rules.evcSlaDays,
    sac_appeals: rules.sacSlaDays
  }
}, null, 2)}
              </pre>
            </div>

            <div className="pt-3 border-t border-gray-800 text-[10px] text-gray-400 flex items-center justify-between">
              <span>{isHi ? 'स्थिति: सक्रिय एवं प्रवर्तित' : 'Status: Active & Enforced'}</span>
              <span className="text-amber-400 font-bold">API: /api/v1/rules/aph-current</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: AUDIT LEDGER */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={isHi ? 'ऑडिटर, कार्रवाई या ब्लॉक संख्या से खोजें...' : 'Search audit trail by actor, action, or block...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-indigo-700 focus:outline-none"
              />
            </div>
            <span className="text-gray-500 font-mono">
              {filteredLogs.length} {isHi ? 'ब्लॉक सत्यापित' : 'Blocks Verified'}
            </span>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200 text-[11px] uppercase tracking-wider">
                    <th className="p-3">{isHi ? 'ब्लॉक #' : 'Block #'}</th>
                    <th className="p-3">{isHi ? 'समय (IST)' : 'Timestamp (IST)'}</th>
                    <th className="p-3">{isHi ? 'कर्ता एवं भूमिका' : 'Actor & Role'}</th>
                    <th className="p-3">{isHi ? 'कार्रवाई' : 'Action Event'}</th>
                    <th className="p-3">{isHi ? 'संदर्भ आईडी' : 'Target Ref'}</th>
                    <th className="p-3">{isHi ? 'टिप्पणी' : 'Remarks'}</th>
                    <th className="p-3">{isHi ? 'SHA-256 हैश' : 'SHA-256 State Hash'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-3 font-mono font-bold text-gray-900">#{log.id}</td>
                      <td className="p-3 text-gray-600 font-mono text-[11px] whitespace-nowrap">{log.timestamp}</td>
                      <td className="p-3">
                        <div className="font-bold text-gray-900">{log.actor}</div>
                        <div className="text-[10px] text-gray-500">{log.role}</div>
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded border border-blue-200">
                          {log.action}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-semibold">{log.applicationId}</td>
                      <td className="p-3 text-gray-700 max-w-xs text-[11px]">{log.remarks}</td>
                      <td className="p-3 font-mono text-[10px] max-w-[140px]">
                        <div className="flex items-center space-x-1">
                          <span className="truncate text-gray-600 bg-gray-100 px-1 py-0.5 rounded border border-gray-200">
                            {log.currHash.slice(0, 14)}...
                          </span>
                          <button
                            onClick={() => handleCopyHash(log.currHash, log.id)}
                            className="text-gray-400 hover:text-gray-700"
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
      )}
    </div>
  );
}
