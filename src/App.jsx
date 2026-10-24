import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Role-specific bespoke dashboards
import InstitutionDashboard from './components/roles/InstitutionDashboard';
import OfficerDashboard from './components/roles/OfficerDashboard';
import EVCDashboard from './components/roles/EVCDashboard';
import BureauDashboard from './components/roles/BureauDashboard';
import AdminDashboard from './components/roles/AdminDashboard';

// Shared specialized tools
import OverviewView from './components/OverviewView';
import HeatmapView from './components/HeatmapView';
import ComplianceSentinelView from './components/ComplianceSentinelView';
import AuditLedgerView from './components/AuditLedgerView';
import AphCoPilot from './components/AphCoPilot';
import EoALetterModal from './components/EoALetterModal';
import GuidedDemoTour from './components/GuidedDemoTour';

import { 
  INITIAL_APPLICATIONS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import { TRANSLATIONS } from './data/translations';

// Helper to simulate SHA-256 hash chaining
function generateHash(data) {
  let str = JSON.stringify(data) + Date.now().toString();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const dummyHex2 = Math.abs(hash * 31).toString(16).padStart(8, '0');
  const dummyHex3 = Math.abs(hash * 127).toString(16).padStart(8, '0');
  const dummyHex4 = Math.abs(hash * 8191).toString(16).padStart(8, '0');
  return `${hex}${dummyHex2}${dummyHex3}${dummyHex4}`.padEnd(64, 'f');
}

export default function App() {
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [currentRole, setCurrentRole] = useState('INSTITUTION'); // Starts with Institution as in Minute 1
  const [activeTab, setActiveTab] = useState('role_dashboard');
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [selectedAppId, setSelectedAppId] = useState('APP-2025-0842');
  const [showEoAModal, setShowEoAModal] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);

  // Translation helper
  const t = (key) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;

  // Automatically reset to role dashboard when role switcher changes
  useEffect(() => {
    setActiveTab('role_dashboard');
  }, [currentRole]);

  // Append new SHA-256 block into immutable ledger
  const handleAddAuditLog = (entry) => {
    const lastHash = auditLogs[auditLogs.length - 1]?.currHash || "0000000000000000000000000000000000000000000000000000000000000000";
    const newHash = generateHash(entry);

    const now = new Date();
    const timestamp = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]} IST`;

    const newBlock = {
      id: auditLogs.length + 1001,
      timestamp,
      actor: entry.actor,
      role: entry.role,
      action: entry.action,
      applicationId: entry.applicationId,
      remarks: entry.remarks,
      prevHash: lastHash,
      currHash: newHash
    };

    setAuditLogs(prev => [...prev, newBlock]);
  };

  // Render the role-specific bespoke interface
  const renderRoleDashboard = () => {
    switch (currentRole) {
      case 'INSTITUTION':
        return (
          <InstitutionDashboard
            applications={applications}
            setApplications={setApplications}
            onAddAuditLog={handleAddAuditLog}
            selectedAppId={selectedAppId}
            setSelectedAppId={setSelectedAppId}
            language={language}
            t={t}
          />
        );

      case 'REGIONAL_OFFICER':
        return (
          <OfficerDashboard
            applications={applications}
            setApplications={setApplications}
            onAddAuditLog={handleAddAuditLog}
            selectedAppId={selectedAppId}
            setSelectedAppId={setSelectedAppId}
            language={language}
            t={t}
          />
        );

      case 'EVC_MEMBER':
        return (
          <EVCDashboard
            applications={applications}
            setApplications={setApplications}
            onAddAuditLog={handleAddAuditLog}
            selectedAppId={selectedAppId}
            setSelectedAppId={setSelectedAppId}
            language={language}
            t={t}
          />
        );

      case 'BUREAU_HEAD':
        return (
          <BureauDashboard
            onAddAuditLog={handleAddAuditLog}
            language={language}
            t={t}
          />
        );

      case 'ADMIN_CONFIG':
        return (
          <AdminDashboard
            auditLogs={auditLogs}
            onAddAuditLog={handleAddAuditLog}
            language={language}
            t={t}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans selection:bg-amber-300 selection:text-blue-950">
      {/* Official AICTE GIGW Header & Role Switcher */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedAppId={selectedAppId}
        applications={applications}
        language={language}
        setLanguage={setLanguage}
        t={t}
        onOpenEoA={() => setShowEoAModal(true)}
        onStartTour={() => setIsTourOpen(true)}
      />

      {/* Official AICTE Navigation Bar (Adapts per Role & Language) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentRole={currentRole}
        alertCounts={{ leaseExpiring: '28d' }}
        language={language}
        t={t}
      />

      {/* Main Container Content */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'role_dashboard' && renderRoleDashboard()}

        {activeTab === 'overview' && (
          <OverviewView
            setActiveTab={setActiveTab}
            setCurrentRole={setCurrentRole}
            language={language}
            t={t}
          />
        )}

        {activeTab === 'heatmap' && (
          <HeatmapView
            onAddAuditLog={handleAddAuditLog}
            language={language}
            t={t}
          />
        )}

        {activeTab === 'sentinel' && (
          <ComplianceSentinelView
            onAddAuditLog={handleAddAuditLog}
            language={language}
            t={t}
          />
        )}

        {activeTab === 'audit' && (
          <AuditLedgerView
            auditLogs={auditLogs}
            language={language}
            t={t}
          />
        )}
      </main>

      {/* Floating AICTE APH Regulatory Co-Pilot */}
      <AphCoPilot currentRole={currentRole} language={language} t={t} />

      {/* Official GIGW AICTE Footer */}
      <Footer t={t} />

      {/* Global Official AICTE Extension of Approval (EoA) Letter Modal */}
      {showEoAModal && (
        <EoALetterModal
          application={applications.find(a => a.id === selectedAppId) || applications[0]}
          onClose={() => setShowEoAModal(false)}
          language={language}
        />
      )}

      {/* One-Click Guided 4-Minute Presentation Tour HUD */}
      <GuidedDemoTour
        isOpen={isTourOpen}
        setIsOpen={setIsTourOpen}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedAppId={selectedAppId}
        setSelectedAppId={setSelectedAppId}
        applications={applications}
        setApplications={setApplications}
        onAddAuditLog={handleAddAuditLog}
        onOpenEoA={() => setShowEoAModal(true)}
        language={language}
        t={t}
      />
    </div>
  );
}
