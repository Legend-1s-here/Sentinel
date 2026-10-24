// Authentic AICTE Mock Data & Initial State for SIH Prototype

export const INITIAL_APPLICATIONS = [
  {
    id: "APP-2025-0842",
    instituteName: "Aryavart Institute of Technology & Management",
    aictePermanentId: "1-492817291",
    region: "Northern",
    state: "Uttar Pradesh",
    district: "Lucknow",
    applicationType: "New Technical Institution",
    academicYear: "2025-2026",
    currentStage: "Scrutiny", // Scrutiny -> EVC_Pending -> SAC_Review -> Approved
    workflowRoute: "SCRUTINY_EVC",
    isNewInstitution: true,
    slaDeadlineDays: 10,
    daysElapsed: 7,
    status: "DEFICIENT", // Demo default: Ready for demo loop
    assignedOfficer: "Dr. R.K. Sharma (Regional Officer)",
    documents: [
      {
        id: "DOC-01",
        title: "30-Year Registered Land Lease Deed",
        category: "Land & Building",
        status: "VERIFIED",
        fileUrl: "Lease_Deed_Registered_30Yr.pdf",
        validity: "Valid through 14-Oct-2054 (Sub-Registrar Lucknow)",
        aphClause: "APH Chapter 1, Section 1.4"
      },
      {
        id: "DOC-02",
        title: "Approved Master Building Plan & Safety Cert.",
        category: "Infrastructure",
        status: "VERIFIED",
        fileUrl: "PWD_Building_Completion.pdf",
        validity: "Certified by Executive Engineer, State PWD",
        aphClause: "APH Chapter 1, Section 1.7"
      },
      {
        id: "DOC-03",
        title: "State Fire Safety NOC",
        category: "Statutory Approvals",
        status: "DEFICIENT",
        fileUrl: "State_Fire_NOC_2023.pdf",
        validity: "Expired / Missing 2026 CFO Renewal Endorsement",
        aphClause: "APH Chapter 2, Clause 4.1"
      },
      {
        id: "DOC-04",
        title: "Governing Body Undertaking & Affidavit",
        category: "Legal Compliance",
        status: "VERIFIED",
        fileUrl: "Affidavit_Format_1.pdf",
        validity: "Sworn before 1st Class Judicial Magistrate",
        aphClause: "APH Annexure 3"
      }
    ],
    deficiencyHistory: [
      {
        id: "DEF-101",
        stage: "Scrutiny",
        date: "2026-10-22",
        officer: "Dr. R.K. Sharma (RO Kanpur)",
        clause: "APH Chapter 2, Clause 4.1",
        remarks: "Fire Safety NOC uploaded is dated 2023 with no active renewal endorsement from Chief Fire Officer. Valid certified certificate required.",
        resolved: false
      }
    ],
    evcDetails: {
      scheduledDate: null,
      leadExpert: "Prof. S.N. Mukherjee (IIT Kanpur)",
      committeeMembers: ["Dr. Preeti Verma (NIT)", "Er. V.K. Goel (Chief Architect)"],
      status: "AWAITING_SCRUTINY_CLEARANCE",
      reportSubmitted: false
    }
  },
  {
    id: "APP-2025-1104",
    instituteName: "Vidyapeeth Institute of Pharmacy & Research",
    aictePermanentId: "1-77821932",
    region: "Northern",
    state: "Haryana",
    district: "Gurugram",
    applicationType: "New Course Addition (AI & Data Science)",
    academicYear: "2025-2026",
    currentStage: "Scrutiny",
    workflowRoute: "SCRUTINY_EVC",
    isNewInstitution: false,
    slaDeadlineDays: 10,
    daysElapsed: 14, // 14 Days Elapsed - SLA Breach!
    status: "OVERDUE",
    assignedOfficer: "Dr. R.K. Sharma (Regional Officer)",
    documents: [
      {
        id: "DOC-01",
        title: "Board of Governors Resolution for AI Program",
        category: "Academic Governance",
        status: "VERIFIED",
        fileUrl: "BOG_Resolution_AI_2025.pdf",
        validity: "Passed by 100% quorum on 15-Sep-2026",
        aphClause: "APH Chapter 2, Section 2.3"
      },
      {
        id: "DOC-02",
        title: "Dedicated High Performance Computing Lab Plan",
        category: "Laboratory Infrastructure",
        status: "VERIFIED",
        fileUrl: "AI_GPU_Server_Invoice.pdf",
        validity: "30 Nvidia RTX Workstations installed",
        aphClause: "APH Chapter 5, Norms 5.4"
      },
      {
        id: "DOC-03",
        title: "Faculty Roster & Cadre Ratio for AI Faculty",
        category: "Faculty Credentials",
        status: "DEFICIENT",
        fileUrl: "Faculty_BioData_AI.pdf",
        validity: "Associate Professor position vacant (Cadre 1:2:6 deficit)",
        aphClause: "APH Chapter 7, Clause 7.2"
      }
    ],
    deficiencyHistory: [
      {
        id: "DEF-204",
        stage: "Scrutiny",
        date: "2026-10-18",
        officer: "Dr. R.K. Sharma (RO Kanpur)",
        clause: "APH Chapter 7, Clause 7.2",
        remarks: "Cadre proportion requires at least 1 Associate Professor in AI/DS. Appointed faculty currently shows only Assistant Professors.",
        resolved: false
      }
    ],
    evcDetails: {
      scheduledDate: null,
      leadExpert: "Dr. K.L. Verma (DTU Delhi)",
      committeeMembers: ["Prof. Sunita Rao"],
      status: "HELD_FOR_CADRE_COMPLIANCE",
      reportSubmitted: false
    }
  },
  {
    id: "APP-2025-0722",
    instituteName: "Bengal Institute of Advanced Sciences",
    aictePermanentId: "1-33910244",
    region: "Eastern",
    state: "West Bengal",
    district: "Kolkata",
    applicationType: "Intake Variation (+60 Seats)",
    academicYear: "2025-2026",
    currentStage: "EVC_Pending",
    workflowRoute: "SCRUTINY_EVC",
    isNewInstitution: false,
    slaDeadlineDays: 14,
    daysElapsed: 9,
    status: "IN_PROGRESS",
    assignedOfficer: "Dr. P.K. Roy (RO Kolkata)",
    documents: [
      {
        id: "DOC-01",
        title: "Structural Stability Certificate for 4th Floor Expansion",
        category: "Infrastructure",
        status: "VERIFIED",
        fileUrl: "Civil_Stability_Report.pdf",
        validity: "Vetted by IIEST Shibpur Civil Dept",
        aphClause: "APH Chapter 1, Section 1.8"
      },
      {
        id: "DOC-02",
        title: "Additional Library Volumes (1,200 Titles)",
        category: "Library Resources",
        status: "VERIFIED",
        fileUrl: "Library_Accession_Register.pdf",
        validity: "Barcode catalog verified",
        aphClause: "APH Chapter 6, Table 6.1"
      }
    ],
    deficiencyHistory: [],
    evcDetails: {
      scheduledDate: "2026-11-04",
      leadExpert: "Prof. Amit Banerjee (Jadavpur Univ)",
      committeeMembers: ["Dr. S. Chatterjee", "Er. N.K. Dey"],
      status: "SCHEDULED",
      reportSubmitted: false
    }
  },
  {
    id: "APP-2025-0619",
    instituteName: "Deccan College of Engineering & Technology",
    aictePermanentId: "1-10294821",
    region: "Western",
    state: "Maharashtra",
    district: "Pune",
    applicationType: "Extension of Approval (EoA)",
    academicYear: "2025-2026",
    currentStage: "Approved",
    workflowRoute: "SCRUTINY_ONLY",
    isNewInstitution: false,
    slaDeadlineDays: 7,
    daysElapsed: 4,
    status: "APPROVED",
    assignedOfficer: "Mrs. Anjali Deshmukh (RO Mumbai)",
    documents: [
      {
        id: "DOC-01",
        title: "Annual Mandatory Disclosure 2025-26",
        category: "Transparency",
        status: "VERIFIED",
        fileUrl: "Mandatory_Disclosure_Deccan.pdf",
        validity: "Published on institutional web portal",
        aphClause: "APH Chapter 2, Clause 2.1"
      },
      {
        id: "DOC-02",
        title: "Proof of Faculty Salary Payment through Bank",
        category: "Finance & Accounts",
        status: "VERIFIED",
        fileUrl: "Form16_Bank_Certificate.pdf",
        validity: "7th Pay Commission compliant transfer statements",
        aphClause: "APH Chapter 7, Section 7.5"
      }
    ],
    deficiencyHistory: [],
    evcDetails: null
  }
];

export const REGIONAL_PENDENCY_DATA = [
  {
    region: "Northern Region (RO Kanpur)",
    states: "UP, Uttarakhand, Delhi, Haryana",
    totalApplications: 1420,
    clearedOnTime: 1180,
    inProgress: 226,
    breachedSLA: 14, // 14 overdue - Red Alert for Demo!
    avgProcessingDays: 12.8,
    status: "CRITICAL_BOTTLENECK",
    flaggedOfficer: "Dr. R.K. Sharma (14 files > 10 days overdue)"
  },
  {
    region: "Western Region (RO Mumbai)",
    states: "Maharashtra, Gujarat, Goa",
    totalApplications: 1980,
    clearedOnTime: 1890,
    inProgress: 90,
    breachedSLA: 0,
    avgProcessingDays: 5.2,
    status: "EXEMPLARY",
    flaggedOfficer: "None (100% on schedule)"
  },
  {
    region: "Southern Region (RO Chennai)",
    states: "Tamil Nadu, Puducherry",
    totalApplications: 2150,
    clearedOnTime: 1990,
    inProgress: 155,
    breachedSLA: 5,
    avgProcessingDays: 7.4,
    status: "NORMAL",
    flaggedOfficer: "T. Rajendran (5 files nearing SLA)"
  },
  {
    region: "South-Western Region (RO Bengaluru)",
    states: "Karnataka, Kerala",
    totalApplications: 1830,
    clearedOnTime: 1720,
    inProgress: 108,
    breachedSLA: 2,
    avgProcessingDays: 6.1,
    status: "NORMAL",
    flaggedOfficer: "K. Mohan (2 files nearing SLA)"
  },
  {
    region: "Central Region (RO Bhopal)",
    states: "Madhya Pradesh, Chhattisgarh, Gujarat",
    totalApplications: 960,
    clearedOnTime: 890,
    inProgress: 64,
    breachedSLA: 6,
    avgProcessingDays: 8.9,
    status: "ATTENTION_REQUIRED",
    flaggedOfficer: "M.P. Singh (6 files overdue)"
  },
  {
    region: "Eastern Region (RO Kolkata)",
    states: "WB, Bihar, Odisha, Jharkhand, NE States",
    totalApplications: 1120,
    clearedOnTime: 1040,
    inProgress: 76,
    breachedSLA: 4,
    avgProcessingDays: 7.9,
    status: "NORMAL",
    flaggedOfficer: "Dr. P.K. Roy (4 files nearing SLA)"
  }
];

export const COMPLIANCE_SENTINEL_ITEMS = [
  {
    id: "SENTINEL-01",
    instituteName: "Kashi Institute of Engineering & Technology",
    aictePermanentId: "1-2849102",
    region: "Northern",
    documentType: "30-Year Registered Land Lease Deed",
    registrationDate: "1996-11-20",
    expiryDate: "2026-11-21",
    daysRemaining: 28, // 28 Days Remaining! Level-3 Critical Alert for Demo
    alertLevel: "LEVEL_3_CRITICAL", // T-90, T-60, T-30, T-7
    lastNotificationSent: "T-30 Days (2026-10-22 via Email + SMS)",
    escalationStatus: "ESCALATED_TO_REGIONAL_DIRECTOR",
    currentImpact: "Seat Expansion Locked pending certified renewal deed"
  },
  {
    id: "SENTINEL-02",
    instituteName: "Deccan College of Technology",
    aictePermanentId: "1-10294821",
    region: "Western",
    documentType: "Land Use Conversion Certificate",
    registrationDate: "2006-01-15",
    expiryDate: "2027-01-16",
    daysRemaining: 84,
    alertLevel: "LEVEL_1_WARNING",
    lastNotificationSent: "T-90 Days (Dispatched to Registrar)",
    escalationStatus: "NORMAL",
    currentImpact: "No sanction; Reminder active"
  },
  {
    id: "SENTINEL-03",
    instituteName: "Malabar Polytechnic Campus",
    aictePermanentId: "1-5582910",
    region: "South-Western",
    documentType: "State Disaster Management & Fire Safety NOC",
    registrationDate: "2023-11-05",
    expiryDate: "2026-11-05",
    daysRemaining: 12,
    alertLevel: "LEVEL_4_URGENT",
    lastNotificationSent: "T-15 Days (Escalation Warning)",
    escalationStatus: "AUTO_ESCALATED_BUREAU_HEAD",
    currentImpact: "Conditional Approval Withheld"
  },
  {
    id: "SENTINEL-04",
    instituteName: "Chanakya Institute of Management",
    aictePermanentId: "1-9920145",
    region: "Northern",
    documentType: "Bank Guarantee for Endowment Fund (₹1.00 Cr)",
    registrationDate: "2021-12-01",
    expiryDate: "2026-12-01",
    daysRemaining: 38,
    alertLevel: "LEVEL_2_ELEVATED",
    lastNotificationSent: "T-60 Days dispatched",
    escalationStatus: "PENDING_RENEWAL",
    currentImpact: "Routine Audit Flagged"
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 1001,
    timestamp: "2026-10-24 10:14:22 IST",
    actor: "SYS_AUTOMATION_ROUTER",
    role: "System Engine",
    action: "APPLICATION_INGESTION_ROUTED",
    applicationId: "APP-2025-0842",
    remarks: "New Technical Institution proposal routed to SCRUTINY_EVC based on APH 2025 Chapter 1 Matrix.",
    prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    currHash: "a7f4c91b2e884d0ef92314a87c1265b9021a3f019d65c3b14798a44b1c2847d9"
  },
  {
    id: 1002,
    timestamp: "2026-10-24 11:30:05 IST",
    actor: "Dr. R.K. Sharma (RO-Northern)",
    role: "Regional Scrutiny Officer",
    action: "DEFICIENCY_FLAGGED",
    applicationId: "APP-2025-0842",
    remarks: "Document DOC-03 (Fire NOC) deficient under APH Clause 4.1. Formal revert triggered to institution.",
    prevHash: "a7f4c91b2e884d0ef92314a87c1265b9021a3f019d65c3b14798a44b1c2847d9",
    currHash: "b39dc1490e5f67a84029df4821a37c92b5120198c39e018a77f98124b1ca9823"
  },
  {
    id: 1003,
    timestamp: "2026-10-24 12:05:40 IST",
    actor: "SENTINEL_LEASE_DAEMON",
    role: "Compliance Sentinel",
    action: "LEASE_EXPIRY_ALERT_DISPATCHED",
    applicationId: "INST-KASHI-ENG",
    remarks: "30-Year Registered Land Lease deed expiring in 28 days. Level-3 SMS & Email alert dispatched to Trust President & Registrar.",
    prevHash: "b39dc1490e5f67a84029df4821a37c92b5120198c39e018a77f98124b1ca9823",
    currHash: "e48102a94f1c99201bc83921af784a01c38d9284fa9012389dcba01894726bf0"
  }
];

export const INITIAL_RULE_ENGINE_SETTINGS = {
  academicYear: "2025-2026",
  scrutinySlaDays: 10,
  evcSlaDays: 14,
  sacSlaDays: 7,
  requireEvcForNewColleges: true,
  requireEvcForIntakeExpansion: false,
  requireEvcForCourseAddition: true,
  enableAutoEscalation: true,
  leaseNotificationThresholds: [90, 60, 30, 7]
};
