import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronUp, 
  ChevronDown, 
  Send, 
  FileText, 
  Building2, 
  UserCheck, 
  ShieldAlert, 
  ScrollText, 
  HelpCircle,
  Volume2,
  RefreshCw,
  Zap,
  Target,
  Award
} from 'lucide-react';

export default function GuidedDemoTour({
  isOpen,
  setIsOpen,
  currentRole,
  setCurrentRole,
  activeTab,
  setActiveTab,
  selectedAppId,
  setSelectedAppId,
  applications,
  setApplications,
  onAddAuditLog,
  onOpenEoA,
  language = 'en',
  t = (k) => k
}) {
  const isHi = language === 'hi';
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(240); // 4 Minutes = 240s
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  // 7 High-Impact Presentation Steps
  const steps = [
    {
      id: 'step-1',
      minute: isHi ? 'मिनट 1 / 4' : 'MINUTE 1 OF 4',
      phaseEn: 'GIGW 3.0 Look & Institution Intake',
      phaseHi: 'GIGW 3.0 रूप-रंग एवं संस्थान डैशबोर्ड',
      shortLabelEn: '1. Intake',
      shortLabelHi: '1. आवेदन',
      role: 'INSTITUTION',
      tab: 'role_dashboard',
      appId: 'APP-2025-0842',
      impactEn: 'Eliminates paper file submission by enforcing GIGW 3.0 digital ingestion with bilingual accessibility.',
      impactHi: 'GIGW 3.0 डिजिटल इनटेक एवं द्विभाषी सुलभता द्वारा कागजी फाइलों की निर्भरता समाप्त।',
      actionEn: 'Navigate to College Intake Dashboard',
      actionHi: 'संस्थान आवेदन ट्रैकर पर जाएं',
      scriptEn: [
        'Point out the authentic AICTE & Government of India letterhead, Ashoka Stambh, and live English ⟷ हिन्दी toggle.',
        'Here is Aryavart Institute of Technology (PID: 1-0842918) for AY 2025–26 with 4-stage live progress tracking.',
        'Demonstrates 100% compliance with national GIGW 3.0 guidelines and instant role-based access.'
      ],
      scriptHi: [
        'आधिकारिक AICTE एवं भारत सरकार लेटरहेड, अशोक स्तंभ तथा लाइव अंग्रेज़ी ⟷ हिन्दी स्विच दिखाएं।',
        'आर्यावर्त इंस्टीट्यूट (PID: 1-0842918) का 4-चरणीय लाइव प्रगति ट्रैकर सत्र 2025-26 हेतु प्रस्तुत है।',
        'राष्ट्रीय GIGW 3.0 मानकों के पूर्ण अनुपालन एवं सुरक्षित भूमिका-आधारित पहुंच को प्रमाणित करता है।'
      ],
      execute: () => {
        setCurrentRole('INSTITUTION');
        setActiveTab('role_dashboard');
        setSelectedAppId('APP-2025-0842');
      }
    },
    {
      id: 'step-2',
      minute: isHi ? 'मिनट 2 / 4' : 'MINUTE 2 OF 4',
      phaseEn: 'Regional Officer Flags Deficiency (APH 4.1)',
      phaseHi: 'क्षेत्रीय अधिकारी द्वारा कमी दर्ज (APH 4.1)',
      shortLabelEn: '2. Revert',
      shortLabelHi: '2. कमी दर्ज',
      role: 'REGIONAL_OFFICER',
      tab: 'role_dashboard',
      appId: 'APP-2025-0842',
      impactEn: 'Replaces 14-day postal rejections with instant legal reverts cited against APH 2024-27 Chapter 2, Clause 4.1.',
      impactHi: 'डाक द्वारा 14 दिनों की देरी को समाप्त कर APH धारा 4.1 के तहत तत्काल कानूनी कमी आदेश जारी।',
      actionEn: 'Switch to Officer & Flag Fire NOC Deficiency',
      actionHi: 'अधिकारी बनकर अग्निशमन एनओसी में कमी दर्ज करें',
      scriptEn: [
        'Switch to Regional Scrutiny Officer (Dr. R.K. Sharma, RO Kanpur) with assigned queue.',
        'Officer inspects DOC-03 (Fire Safety NOC) and flags deficiency: "NOC expired from 2023 with no active renewal."',
        'Cites statutory APH Chapter 2, Clause 4.1 and stamps the transaction into the cryptographic audit trail.'
      ],
      scriptHi: [
        'कानपुर क्षेत्रीय संवीक्षा अधिकारी (डॉ. आर.के. शर्मा) की कार्यतालिका पर जाएं।',
        'अधिकारी DOC-03 (अग्निशमन सुरक्षा एनओसी) की जांच कर कमी दर्ज करता है: "2023 का एनओसी समाप्त है, नवीनीकरण आवश्यक।"',
        'APH अध्याय 2, धारा 4.1 का विधिक हवाला देकर लेन-देन को क्रिप्टोग्राफिक ऑडिट ट्रेल में दर्ज करता है।'
      ],
      execute: () => {
        setCurrentRole('REGIONAL_OFFICER');
        setActiveTab('role_dashboard');
        setSelectedAppId('APP-2025-0842');

        const updated = applications.map(app => {
          if (app.id === 'APP-2025-0842') {
            return {
              ...app,
              status: 'DEFICIENT',
              documents: app.documents.map(d => 
                d.id === 'DOC-03' 
                  ? { ...d, status: 'DEFICIENT', validity: isHi ? 'कमी दर्ज: मुख्य अग्निशमन अधिकारी से नवीनीकरण आवश्यक' : 'Deficiency Flagged: Renewal endorsement required from CFO' }
                  : d
              ),
              deficiencyHistory: [
                {
                  id: 'DEF-4091',
                  stage: 'Scrutiny',
                  date: new Date().toISOString().split('T')[0],
                  officer: isHi ? 'डॉ. आर.के. शर्मा (कानपुर क्षेत्रीय कार्यालय)' : 'Dr. R.K. Sharma (RO Kanpur)',
                  clause: 'APH Chapter 2, Clause 4.1',
                  remarks: isHi ? 'अपलोड किया गया अग्निशमन सुरक्षा एनओसी 2023 का है जिसमें सक्रिय नवीनीकरण पृष्ठांकन नहीं है।' : 'Fire Safety NOC uploaded is dated 2023 with no active CFO renewal endorsement.',
                  resolved: false
                },
                ...app.deficiencyHistory
              ]
            };
          }
          return app;
        });
        setApplications(updated);

        onAddAuditLog({
          actor: isHi ? 'डॉ. आर.के. शर्मा (कानपुर क्षेत्रीय कार्यालय)' : 'Dr. R.K. Sharma (RO Kanpur)',
          role: isHi ? 'क्षेत्रीय संवीक्षा अधिकारी' : 'Regional Scrutiny Officer',
          action: 'DEFICIENCY_REVERT_ISSUED',
          applicationId: 'APP-2025-0842',
          remarks: isHi ? 'दस्तावेज़ DOC-03 हेतु धारा 4.1 के अंतर्गत औपचारिक कमी आदेश जारी किया गया।' : 'Deficiency flagged for DOC-03 citing APH Chapter 2, Clause 4.1.'
        });
      }
    },
    {
      id: 'step-3',
      minute: isHi ? 'मिनट 2 / 4' : 'MINUTE 2 OF 4',
      phaseEn: 'Institution Cures Deficiency & Re-Uploads',
      phaseHi: 'संस्थान द्वारा कमी निवारण एवं पुनः अपलोड',
      shortLabelEn: '3. Cure & Re-Upload',
      shortLabelHi: '3. निवारण',
      role: 'INSTITUTION',
      tab: 'role_dashboard',
      appId: 'APP-2025-0842',
      impactEn: 'Eliminates lost applications by giving colleges real-time deficiency alerts and instantaneous rectification upload.',
      impactHi: 'वास्तविक समय चेतावनी एवं त्वरित पुनः अपलोड सुविधा से आवेदनों के गुम या निरस्त होने का खतरा समाप्त।',
      actionEn: 'Switch to Institution & Upload Rectified Certificate',
      actionHi: 'संस्थान बनकर प्रमाणित संशोधित प्रति अपलोड करें',
      scriptEn: [
        'Switch back to Institution portal: college immediately sees the prominent red deficiency banner.',
        'Principal reads officer notes and re-uploads the state authority endorsed certificate (2026–2029 Certified).',
        'Status updates to "RECTIFIED (Under Review)" with complete timestamp acknowledgment.'
      ],
      scriptHi: [
        'संस्थान पटल पर वापस आएं: प्राचार्य को तुरंत लाल रंग का कमी आदेश बैनर दिखाई देता है।',
        'संस्थान अधिकारी की टिप्पणी देखकर राज्य प्राधिकारी द्वारा प्रमाणित नवीनीकृत प्रति (2026–2029) अपलोड करता है।',
        'स्थिति तुरंत "संशोधित (समीक्षाधीन)" में परिवर्तित हो जाती है।'
      ],
      execute: () => {
        setCurrentRole('INSTITUTION');
        setActiveTab('role_dashboard');
        setSelectedAppId('APP-2025-0842');

        const updated = applications.map(app => {
          if (app.id === 'APP-2025-0842') {
            return {
              ...app,
              status: 'IN_PROGRESS',
              documents: app.documents.map(d => 
                d.id === 'DOC-03'
                  ? { 
                      ...d, 
                      status: 'RECTIFIED_PENDING_APPROVAL', 
                      title: 'State Fire Safety NOC (2026-2029 Certified Endorsed)',
                      validity: isHi ? 'सक्षम प्राधिकारी से प्रमाणित प्रति संलग्न' : 'Endorsed renewal certificate submitted' 
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

        onAddAuditLog({
          actor: isHi ? 'कुलसचिव, आर्यावर्त इंस्टीट्यूट' : 'Registrar, Aryavart Institute',
          role: isHi ? 'तकनीकी संस्थान' : 'Technical Institution',
          action: 'DEFICIENCY_CURED_REUPLOAD',
          applicationId: 'APP-2025-0842',
          remarks: isHi ? 'संशोधित अग्निशमन सुरक्षा प्रमाण पत्र जमा किया गया।' : 'Rectified Fire Safety NOC submitted for regional re-verification.'
        });
      }
    },
    {
      id: 'step-4',
      minute: isHi ? 'मिनट 2 / 4' : 'MINUTE 2 OF 4',
      phaseEn: 'Officer Approves with e-Sign ➔ Auto EVC Leap',
      phaseHi: 'ई-हस्ताक्षर स्वीकृति ➔ EVC कतार में स्वतः अग्रेषण',
      shortLabelEn: '4. Auto EVC Leap',
      shortLabelHi: '4. स्वतः EVC',
      role: 'REGIONAL_OFFICER',
      tab: 'role_dashboard',
      appId: 'APP-2025-0842',
      impactEn: 'Dynamic BPMN 2.0 router eliminates manual dispatch by auto-advancing compliant files directly to EVC panel queue.',
      impactHi: 'BPMN 2.0 कार्यप्रणाली इंजन मैन्युअल फाइल ट्रांसफर समाप्त कर स्वीकृत फाइलों को स्वतः EVC कतार में भेजता है।',
      actionEn: 'Approve Scrutiny with Aadhaar e-Sign & Leap to EVC',
      actionHi: 'आधार ई-हस्ताक्षर से संवीक्षा स्वीकृत कर EVC को भेजें',
      scriptEn: [
        'Regional Scrutiny Officer verifies the cured certificate.',
        'Officer clicks "Approve Scrutiny with Aadhaar e-Sign" — digitally authenticating under IT Act 2000.',
        'Watch the application leap instantly to the EVC Inspection Committee queue without administrative friction!'
      ],
      scriptHi: [
        'क्षेत्रीय संवीक्षा अधिकारी संशोधित प्रमाण पत्र को सत्यापित करता है।',
        'अधिकारी "आधार ई-हस्ताक्षर से संवीक्षा स्वीकृत करें" पर क्लिक कर आईटी अधिनियम 2000 के तहत प्रमाणित करता है।',
        'आवेदन बिना किसी मैन्युअल देरी के तुरंत विशेषज्ञ निरीक्षण समिति (EVC) कतार में अग्रेषित हो जाता है!'
      ],
      execute: () => {
        setCurrentRole('REGIONAL_OFFICER');
        setActiveTab('role_dashboard');
        setSelectedAppId('APP-2025-0842');

        const updated = applications.map(app => {
          if (app.id === 'APP-2025-0842') {
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

        onAddAuditLog({
          actor: isHi ? 'डॉ. आर.के. शर्मा (कानपुर क्षेत्रीय कार्यालय)' : 'Dr. R.K. Sharma (RO Kanpur)',
          role: isHi ? 'क्षेत्रीय संवीक्षा अधिकारी' : 'Regional Scrutiny Officer',
          action: 'SCRUTINY_STAGE_CLEARED_AUTO_EVC',
          applicationId: 'APP-2025-0842',
          remarks: isHi ? 'संवीक्षा स्वीकृत। आवेदन त्वरित परिसर निरीक्षण हेतु EVC कतार में अग्रेषित।' : 'Scrutiny verified. Application fast-tracked to EVC queue for inspection.'
        });
      }
    },
    {
      id: 'step-5',
      minute: isHi ? 'मिनट 3 / 4' : 'MINUTE 3 OF 4',
      phaseEn: 'Interactive SVG Heatmap & Bureau Escalation',
      phaseHi: 'इंटरएक्टिव SVG हीटमैप एवं पदानुक्रमित शीर्ष चेतावनी',
      shortLabelEn: '5. Heatmap & SLA',
      shortLabelHi: '5. हीटमैप',
      role: 'BUREAU_HEAD',
      tab: 'heatmap',
      impactEn: 'National e-Governance (NeSDA) transparency pinpoints regional backlogs and auto-escalates SLA breaches.',
      impactHi: 'राष्ट्रीय ई-गवर्नेंस (NeSDA) पारदर्शिता क्षेत्रीय अड़चनों को चिन्हित कर SLA उल्लंघनों को शीर्ष स्तर पर भेजती है।',
      actionEn: 'Inspect Northern Red Alert & Dispatch Level-2 Notice',
      actionHi: 'उत्तरी क्षेत्र रेड अलर्ट देखें एवं स्तर-2 चेतावनी जारी करें',
      scriptEn: [
        'Switch to Apex Bureau Head (HQ New Delhi) and inspect the interactive SVG Pan-India heatmap.',
        'Hover over Northern Region (RO Kanpur): glows in red with 14 SLA breaches vs Western Region (RO Mumbai) in green.',
        'Click "Trigger Apex Bureau Escalation" to dispatch real-time Level-2 directives via SMS & official email.'
      ],
      scriptHi: [
        'नई दिल्ली मुख्यालय स्थित शीर्ष ब्यूरो प्रमुख के पटल पर जाएं और इंटरएक्टिव SVG अखिल भारतीय हीटमैप देखें।',
        'उत्तरी क्षेत्र पर होवर करें: कानपुर में 14 SLA उल्लंघन के साथ लाल चमकता है जबकि पश्चिमी हरा (0 उल्लंघन) है।',
        '"शीर्ष ब्यूरो चेतावनी जारी करें" दबाकर क्षेत्रीय निदेशक को तत्काल एसएमएस एवं ईमेल द्वारा स्तर-2 आदेश जारी करें।'
      ],
      execute: () => {
        setCurrentRole('BUREAU_HEAD');
        setActiveTab('heatmap');

        onAddAuditLog({
          actor: isHi ? 'शीर्ष ब्यूरो प्रमुख (नई दिल्ली मुख्यालय)' : 'Apex Bureau Head (New Delhi HQ)',
          role: isHi ? 'ब्यूरो एवं शीर्ष नेतृत्व' : 'Bureau & Apex Leadership',
          action: 'BUREAU_LEVEL_ESCALATION_TRIGGERED',
          applicationId: 'REGIONAL-BREACH-NORTHERN',
          remarks: isHi 
            ? 'कानपुर क्षेत्रीय कार्यालय में 14 अतिदेय फाइलों हेतु स्तर-2 पदानुक्रमित चेतावनी प्रेषित।' 
            : 'Automated Level-2 escalation notice dispatched to RO Kanpur for 14 overdue files.'
        });
      }
    },
    {
      id: 'step-6',
      minute: isHi ? 'मिनट 4 / 4' : 'MINUTE 4 OF 4',
      phaseEn: '30-Year Lease Sentinel & SHA-256 Ledger',
      phaseHi: '30-वर्षीय पट्टा समाप्ति रडार एवं SHA-256 लेजर',
      shortLabelEn: '6. Sentinel & Ledger',
      shortLabelHi: '6. प्रहरी व लेजर',
      role: 'ADMIN_CONFIG',
      tab: 'sentinel',
      impactEn: 'Prevents silent cancellation of college approvals via countdown milestones and anchors all actions into DPDP-compliant ledger.',
      impactHi: 'समयसीमा काउंटडाउन द्वारा कॉलेज अनुमोदनों के निरस्तीकरण को रोकता है एवं DPDP अधिनियम अनुरूप लेजर में सुरक्षित करता है।',
      actionEn: 'Simulate Kashi Lease Renewal & Inspect SHA-256 Chain',
      actionHi: 'काशी इंस्टीट्यूट का पट्टा नवीनीकरण कर लेजर देखें',
      scriptEn: [
        'Open Compliance Sentinel: Kashi Institute had only 28 days remaining on its 30-year lease with seats locked.',
        'Simulate renewal upload: validity extends to 2056 and administrative sanction lock is instantly revoked.',
        'Open Tamper-Proof Audit Trail: every action during this demo is cryptographically stamped with SHA-256 hashes!'
      ],
      scriptHi: [
        'विधिक निगरानी पटल खोलें: काशी इंस्टीट्यूट के 30-वर्षीय पट्टे में केवल 28 दिन शेष थे और सीटें लॉक थीं।',
        'नवीनीकरण सिमुलेट करें: वैधता 2056 तक बढ़ जाती है और प्रशासनिक रोक तुरंत निरस्त हो जाती है।',
        'सुरक्षित ऑडिट लेजर खोलें: डेमो के दौरान की गई प्रत्येक कार्रवाई SHA-256 हैश शृंखला में अपरिवर्तनीय दर्ज है!'
      ],
      execute: () => {
        setActiveTab('sentinel');

        onAddAuditLog({
          actor: isHi ? 'कुलसचिव, काशी इंस्टीट्यूट' : 'Registrar, Kashi Institute',
          role: isHi ? 'तकनीकी संस्थान' : 'Technical Institution',
          action: 'STATUTORY_LEASE_RENEWAL_SUBMITTED',
          applicationId: '1-2849102',
          remarks: isHi ? '30-वर्षीय पूरक पट्टा विलेख सत्यापित। वैधता 2056 तक बढ़ाई गई।' : '30-Year registered renewal lease deed authenticated. Validity extended to 2056.'
        });
      }
    },
    {
      id: 'step-7',
      minute: isHi ? 'भव्य समापन' : 'GRAND FINALE',
      phaseEn: 'Official Verifiable AICTE Approval Order (EoA)',
      phaseHi: 'आधिकारिक AICTE विस्तार अनुमोदन आदेश (EoA)',
      shortLabelEn: '7. Official EoA',
      shortLabelHi: '7. EoA आदेश',
      role: 'INSTITUTION',
      tab: 'role_dashboard',
      impactEn: 'Delivers legally binding, printable Government of India EoA decrees verifiable via central QR code and digital seal.',
      impactHi: 'केंद्रीय QR कोड एवं डिजिटल मुहर द्वारा सत्यापित होने वाले मुद्रण योग्य विधिक भारत सरकार EoA आदेश जारी करता है।',
      actionEn: 'Present Official Printable EoA Order with QR Code',
      actionHi: 'QR कोड युक्त आधिकारिक मुद्रण योग्य EoA पत्र प्रस्तुत करें',
      scriptEn: [
        'Present the official AICTE Extension of Approval (EoA) letter with Ashoka Stambh and official AICTE emblem.',
        'Review the sanctioned intake table for Engineering & Technology programs (CSE: 180, AI&ML: 60, ECE: 120).',
        'Click the verifiable QR Code to prove cryptographic authentication against the central server!'
      ],
      scriptHi: [
        'अशोक स्तंभ एवं आधिकारिक AICTE प्रतीक चिन्ह युक्त अनुमोदन आदेश (EoA) पत्र प्रस्तुत करें।',
        'इंजीनियरिंग एवं तकनीकी पाठ्यक्रमों की स्वीकृत प्रवेश क्षमता तालिका (CSE: 180, AI&ML: 60, ECE: 120) दिखाएं।',
        'केंद्रीय सर्वर पर क्रिप्टोग्राफिक सत्यापन सिद्ध करने हेतु QR कोड पर क्लिक करें!'
      ],
      execute: () => {
        if (onOpenEoA) onOpenEoA();
      }
    }
  ];

  // Timer countdown hook
  useEffect(() => {
    let interval = null;
    if (isPlaying && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timerSeconds]);

  // Auto-play advances step every 35 seconds if active
  useEffect(() => {
    let autoInterval = null;
    if (autoPlay && isPlaying && currentStep < steps.length - 1) {
      autoInterval = setTimeout(() => {
        handleNextStep();
      }, 35000);
    }
    return () => clearTimeout(autoInterval);
  }, [autoPlay, isPlaying, currentStep]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentStepData = steps[currentStep];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextIndex = currentStep + 1;
      setCurrentStep(nextIndex);
      steps[nextIndex].execute();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      setCurrentStep(prevIndex);
      steps[prevIndex].execute();
    }
  };

  const handleStartTour = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setCurrentStep(0);
    setTimerSeconds(240);
    setIsPlaying(true);
    steps[0].execute();
  };

  const handleExecuteCurrentStep = () => {
    currentStepData.execute();
  };

  const handleJumpToStep = (idx) => {
    setCurrentStep(idx);
    steps[idx].execute();
  };

  return (
    <>
      {/* 1. Ultra-Visible Persistent Floating Button (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 print:hidden animate-bounce">
          <button
            onClick={handleStartTour}
            className="bg-linear-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black px-5 py-3 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.5)] flex items-center space-x-2.5 border-2 border-slate-900 cursor-pointer hover:scale-105 transition-all text-xs tracking-tight"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></div>
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span className="text-sm font-black">
              {isHi ? '▶ ४-मिनट निर्णायक प्रस्तुति मोड (प्रारंभ करें)' : '▶ START 4-MINUTE JUDGES DEMO MODE'}
            </span>
            <span className="bg-slate-950 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
              SIH 2026
            </span>
          </button>
        </div>
      )}

      {/* 2. Top-Of-Screen High-Visibility Presentation Ribbon (Visible when Tour is Active) */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#001730] border-b-4 border-amber-400 text-white shadow-2xl print:hidden animate-fadeIn">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
            
            {/* Left: Active Live Badge & Timer */}
            <div className="flex items-center space-x-3 shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded shadow-xs tracking-wider animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>SIH LIVE DEMO</span>
              </span>

              <div className="flex items-center space-x-1.5 bg-slate-900 px-3 py-1 rounded-md border border-amber-400/60 font-mono text-sm text-amber-300 font-extrabold shadow-inner">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTimer(timerSeconds)}</span>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="ml-1 text-slate-400 hover:text-white cursor-pointer"
                  title={isPlaying ? "Pause Timer" : "Start Timer"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>

              <span className="font-mono text-xs font-black text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800">
                {currentStepData.minute}
              </span>
            </div>

            {/* Center: 7-Step Horizontal Clickable Milestone Track */}
            <div className="flex items-center space-x-1 overflow-x-auto py-1 max-w-full no-scrollbar">
              {steps.map((st, idx) => {
                const isActive = currentStep === idx;
                const isCompleted = currentStep > idx;

                return (
                  <button
                    key={st.id}
                    onClick={() => handleJumpToStep(idx)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center space-x-1 ${
                      isActive 
                        ? 'bg-amber-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300' 
                        : isCompleted
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{isCompleted ? '✓' : idx + 1}.</span>
                    <span>{isHi ? st.shortLabelHi : st.shortLabelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Quick Action & Tour Controls */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handleExecuteCurrentStep}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-3.5 py-1.5 rounded-md flex items-center space-x-1.5 shadow-md cursor-pointer border border-emerald-400"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>{isHi ? 'कार्रवाई चलाएं' : 'Run Action'}</span>
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStep === steps.length - 1}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-3 py-1.5 rounded-md flex items-center space-x-1 cursor-pointer shadow-xs disabled:opacity-40"
              >
                <span>{isHi ? 'अगला ▶' : 'Next ▶'}</span>
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-slate-400 hover:text-white p-1"
                title={isMinimized ? "Expand Judge Spotlight" : "Minimize Spotlight"}
              >
                {isMinimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>

              <button
                onClick={() => { setIsOpen(false); setIsPlaying(false); }}
                className="text-slate-400 hover:text-red-400 p-1"
                title="Exit Demo Tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. High-Contrast Judge Spotlight Cockpit (Floating Bottom Deck) */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-2xl z-40 transition-all duration-300 print:hidden">
          <div className="bg-[#001730]/98 text-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-3 border-amber-400 overflow-hidden ring-4 ring-black/40">
            
            {/* Top Bar of the Drawer */}
            <div className="bg-[#002244] px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                  {isHi ? 'निर्णायक प्रस्तुति गाइड (स्पॉटलाइट)' : 'JUDGE PRESENTATION SPOTLIGHT'}
                </span>
                <span className="text-slate-400 text-xs">•</span>
                <span className="text-xs text-white font-bold">{currentStepData.minute}</span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                    autoPlay ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Automatically advances through all 7 steps"
                >
                  {autoPlay ? 'Auto-Advance: ON' : 'Auto-Advance: OFF'}
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 sm:p-5 space-y-3.5">
              
              {/* Step Title Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <div className="text-[10px] font-bold font-mono uppercase text-amber-400">
                    Step {currentStep + 1} of {steps.length}: {currentStepData.minute}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-0.5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                      {currentStep + 1}
                    </span>
                    <span>{isHi ? currentStepData.phaseHi : currentStepData.phaseEn}</span>
                  </h3>
                </div>

                <span className="bg-blue-900 text-amber-300 text-[10px] font-mono px-2.5 py-1 rounded border border-blue-700 font-bold shrink-0">
                  {currentStepData.role}
                </span>
              </div>

              {/* Bold Impact Line for Judges (Large for Projectors) */}
              <div className="p-3 bg-amber-950/40 border border-amber-500/60 rounded-lg text-amber-200">
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>{isHi ? 'निर्णायकों हेतु मुख्य समाधान प्रभाव:' : 'KEY REGULATORY IMPACT FOR JUDGES:'}</span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-1 leading-snug">
                  {isHi ? currentStepData.impactHi : currentStepData.impactEn}
                </div>
              </div>

              {/* Presenter Talking Points */}
              <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                <div className="text-[10px] text-slate-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isHi ? 'प्रस्तुतकर्ता भाषण बिंदु (क्या बोलना है):' : 'PRESENTER SPEAKING POINTS (WHAT TO SAY):'}</span>
                </div>
                <ul className="space-y-1.5 text-slate-200 text-xs leading-relaxed list-disc pl-4 font-sans">
                  {(isHi ? currentStepData.scriptHi : currentStepData.scriptEn).map((point, idx) => (
                    <li key={idx} className="font-medium">{point}</li>
                  ))}
                </ul>
              </div>

              {/* Interactive Actions Deck */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                
                {/* Execute Button */}
                <button
                  onClick={handleExecuteCurrentStep}
                  className="bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black px-5 py-2.5 rounded-lg text-xs flex items-center justify-center space-x-2 shadow-lg cursor-pointer border border-emerald-400 transition-all hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4 text-emerald-200" />
                  <span>{isHi ? currentStepData.actionHi : currentStepData.actionEn}</span>
                </button>

                {/* Step Navigation */}
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs flex items-center space-x-1 cursor-pointer border border-slate-700 text-white"
                  >
                    <SkipBack className="w-3 h-3" />
                    <span>{isHi ? 'पिछला' : 'Previous'}</span>
                  </button>

                  <button
                    onClick={handleNextStep}
                    disabled={currentStep === steps.length - 1}
                    className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center space-x-1.5 cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
                  >
                    <span>{isHi ? 'अगला चरण ▶' : 'Next Step ▶'}</span>
                    <SkipForward className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
