import React from 'react';
import { AshokaEmblem, AicteEmblem, DigitalIndiaBadge } from './Emblems';
import { UserCheck, Shield, Award, HelpCircle, Phone, Mail, Building, Users, FileText } from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab, 
  selectedAppId, 
  applications,
  language = 'en',
  setLanguage,
  t,
  onOpenEoA,
  onStartTour
}) {
  const currentDate = new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const currentApp = applications?.find(a => a.id === selectedAppId) || applications?.[0];

  // Get active role profile info
  const getRoleProfile = () => {
    switch (currentRole) {
      case 'INSTITUTION':
        return {
          title: language === 'hi' ? 'प्राचार्य / कुलसचिव कार्यालय' : 'Principal / Registrar Desk',
          subtitle: `${currentApp?.instituteName || 'Aryavart Institute'} (PID: ${currentApp?.aictePermanentId || '1-492817291'})`,
          badge: language === 'hi' ? 'तकनीकी संस्थान' : 'Technical Institution',
          badgeColor: 'bg-emerald-500'
        };
      case 'REGIONAL_OFFICER':
        return {
          title: language === 'hi' ? 'डॉ. आर.के. शर्मा (क्षेत्रीय संवीक्षा अधिकारी)' : 'Dr. R.K. Sharma (Regional Officer)',
          subtitle: language === 'hi' ? 'उत्तरी क्षेत्रीय कार्यालय (कानपुर, उ.प्र.)' : 'Northern Regional Office (RO Kanpur, UP)',
          badge: language === 'hi' ? 'संवीक्षा पटल' : 'Scrutiny Officer Desk',
          badgeColor: 'bg-blue-400'
        };
      case 'EVC_MEMBER':
        return {
          title: language === 'hi' ? 'प्रो. एस.एन. मुखर्जी (प्रमुख विशेषज्ञ)' : 'Prof. S.N. Mukherjee (Lead Expert)',
          subtitle: language === 'hi' ? 'आईआईटी कानपुर • स्थायी EVC निरीक्षण समिति' : 'IIT Kanpur • Standing EVC Inspection Panel',
          badge: language === 'hi' ? 'समिति सदस्य' : 'Peer Inspection Panel',
          badgeColor: 'bg-purple-400'
        };
      case 'BUREAU_HEAD':
        return {
          title: language === 'hi' ? 'अनुमोदन ब्यूरो प्रमुख / शीर्ष प्राधिकरण' : 'Approval Bureau Chief / Apex Authority',
          subtitle: language === 'hi' ? 'नेल्सन मंडेला मार्ग मुख्यालय • नई दिल्ली' : 'Nelson Mandela Marg HQ • New Delhi',
          badge: language === 'hi' ? 'शीर्ष स्तर' : 'Apex Executive Level',
          badgeColor: 'bg-red-500'
        };
      case 'ADMIN_CONFIG':
        return {
          title: language === 'hi' ? 'नीति प्रकोष्ठ / मुख्य वास्तुकार' : 'Policy Cell / System Architect',
          subtitle: language === 'hi' ? 'ई-गवर्नेंस प्रकोष्ठ • AICTE नई दिल्ली' : 'E-Governance Bureau • AICTE New Delhi',
          badge: language === 'hi' ? 'प्रणाली व्यवस्थापक' : 'System Administrator',
          badgeColor: 'bg-amber-400'
        };
      default:
        return {
          title: 'AICTE Authorized Official',
          subtitle: 'National Portal Session',
          badge: 'Active User',
          badgeColor: 'bg-gray-400'
        };
    }
  };

  const roleInfo = getRoleProfile();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top GIGW Accessibility & Indian Government Strip */}
      <div className="bg-gray-100 text-gray-700 text-xs border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-1 flex flex-wrap justify-between items-center text-[11px]">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-gray-800">{t('govIndia')}</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 hidden sm:inline">{t('moe')}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-gray-500 hidden md:inline">🕒 {currentDate}</span>
            <span className="text-gray-300 hidden md:inline">|</span>
            <a href="#main-content" className="hover:underline text-blue-900 hidden sm:inline">
              {t('skipToMain')}
            </a>
            <span className="text-gray-300 hidden sm:inline">|</span>
            
            {/* Font Sizers */}
            <div className="flex items-center space-x-1 font-mono text-[10px]">
              <button className="px-1 py-0.5 border border-gray-300 rounded hover:bg-gray-200" title="Decrease font size">A-</button>
              <button className="px-1 py-0.5 border border-gray-300 rounded bg-white font-bold" title="Normal font size">A</button>
              <button className="px-1 py-0.5 border border-gray-300 rounded hover:bg-gray-200 font-bold" title="Increase font size">A+</button>
            </div>
            <span className="text-gray-300">|</span>

            {/* High-Impact 4-Minute SIH Demo Mode for Judges */}
            {onStartTour && (
              <>
                <button
                  onClick={onStartTour}
                  className="bg-linear-to-r from-red-600 via-amber-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black px-3 py-0.5 rounded text-[10px] flex items-center space-x-1.5 cursor-pointer shadow-sm border border-amber-300 animate-pulse"
                  title={language === 'hi' ? 'निर्णायकों हेतु 4-मिनट स्वचालित प्रस्तुति मोड' : 'Launch 4-Minute Presentation Mode for Judges'}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  <span className="font-black tracking-tight">{language === 'hi' ? '🎯 ४-मिनट निर्णायक डेमो' : '🎯 4-MIN JUDGES DEMO'}</span>
                </button>
                <span className="text-gray-300">|</span>
              </>
            )}

            {/* Official AICTE Printable EoA Order Trigger */}
            {onOpenEoA && (
              <>
                <button
                  onClick={onOpenEoA}
                  className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-black px-2.5 py-0.5 rounded text-[10px] flex items-center space-x-1 cursor-pointer shadow-2xs border border-amber-500 animate-pulse"
                  title={language === 'hi' ? 'आधिकारिक AICTE अनुमोदन आदेश (EoA) देखें' : 'View Official AICTE Extension of Approval (EoA) Order'}
                >
                  <FileText className="w-3 h-3 text-blue-950" />
                  <span>{language === 'hi' ? '📄 आधिकारिक EoA आदेश' : '📄 Official EoA Letter'}</span>
                </button>
                <span className="text-gray-300">|</span>
              </>
            )}

            {/* Interactive Bilingual Language Toggle */}
            <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white shadow-2xs">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                  language === 'en' ? 'bg-[#003366] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 text-[10px] font-bold cursor-pointer transition-colors ${
                  language === 'hi' ? 'bg-[#003366] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tricolor National Gradient Ribbon */}
      <div className="tricolor-stripe"></div>

      {/* Main AICTE Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Official Emblems & Bilingual AICTE Titles */}
        <div className="flex items-center space-x-4">
          <AshokaEmblem className="h-14 w-auto hidden sm:flex" />
          <div className="h-12 w-px bg-gray-300 hidden sm:block"></div>
          <AicteEmblem className="h-16 w-16" />
          <div>
            <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
              {t('aicteHindi')}
            </h2>
            <h1 className="text-base sm:text-xl font-extrabold text-[#003366] tracking-tight leading-none mt-0.5">
              {t('aicteEnglish')}
            </h1>
            <p className="text-[11px] text-gray-600 font-medium">
              {t('statutoryBody')}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                {t('engineBadge')}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                {t('gigwBadge')}
              </span>
            </div>
          </div>
        </div>

        {/* Right: SIH Hackathon Demo Role Switcher & Live Profile Card */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <DigitalIndiaBadge />

          {/* Interactive Role Switcher Pill & Active Identity */}
          <div className="bg-linear-to-r from-[#002244] via-[#003366] to-[#001730] p-2.5 rounded-lg shadow-md border-2 border-amber-400 text-white w-full sm:w-auto">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center space-x-1.5">
                <span className={`w-2 h-2 rounded-full ${roleInfo.badgeColor} animate-ping`}></span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                  {t('activeRole')}
                </span>
              </div>
              <span className="text-[9px] bg-blue-900 px-1.5 py-0.2 rounded font-mono text-amber-300 font-bold border border-blue-700">
                {roleInfo.badge}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="bg-white text-gray-900 text-xs font-bold rounded px-2.5 py-1.5 focus:ring-2 focus:ring-amber-400 focus:outline-none cursor-pointer border border-amber-400 w-full"
              >
                <option value="INSTITUTION">{t('roleInstitution')}</option>
                <option value="REGIONAL_OFFICER">{t('roleOfficer')}</option>
                <option value="EVC_MEMBER">{t('roleEvc')}</option>
                <option value="BUREAU_HEAD">{t('roleBureau')}</option>
                <option value="ADMIN_CONFIG">{t('roleAdmin')}</option>
              </select>
            </div>

            {/* Active User Sub-Label */}
            <div className="mt-1 pt-1 border-t border-blue-800/80 text-[10px] flex items-center justify-between text-blue-200">
              <span className="font-semibold truncate max-w-[200px]">{roleInfo.title}</span>
              <span className="text-gray-400 text-[9px] ml-1">{roleInfo.subtitle.split('•')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
