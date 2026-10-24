import React from 'react';
import { 
  Building2, 
  FileCheck2, 
  MapPin, 
  CalendarClock, 
  ShieldAlert, 
  ScrollText, 
  Sliders, 
  Bell, 
  HelpCircle, 
  Home, 
  UserCheck, 
  CreditCard 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentRole, alertCounts, language = 'en', t }) {
  const isHi = language === 'hi';

  // Build role-specific navigation items
  const getNavItems = () => {
    switch (currentRole) {
      case 'INSTITUTION':
        return [
          { id: 'role_dashboard', label: t('navCollegeDash'), icon: Building2 },
          { id: 'sentinel', label: t('navLeaseVault'), icon: ShieldAlert, badge: isHi ? 'सक्रिय' : 'Active' },
          { id: 'audit', label: t('navAudit'), icon: ScrollText },
          { id: 'overview', label: t('navOverview'), icon: HelpCircle, badge: isHi ? '4-मिनट प्रवाह' : '4-Min Flow', badgeColor: 'bg-amber-400 text-blue-950 font-black' }
        ];

      case 'REGIONAL_OFFICER':
        return [
          { id: 'role_dashboard', label: t('navScrutinyDesk'), icon: FileCheck2, badge: isHi ? '14 लंबित' : '14 Overdue', badgeColor: 'bg-red-600' },
          { id: 'heatmap', label: t('navHeatmap'), icon: MapPin },
          { id: 'audit', label: t('navAudit'), icon: ScrollText },
          { id: 'overview', label: t('navOverview'), icon: HelpCircle, badge: isHi ? '4-मिनट प्रवाह' : '4-Min Flow', badgeColor: 'bg-amber-400 text-blue-950 font-black' }
        ];

      case 'EVC_MEMBER':
        return [
          { id: 'role_dashboard', label: t('navEvcDesk'), icon: CalendarClock, badge: isHi ? 'निरीक्षण' : 'Assigned Visit' },
          { id: 'audit', label: t('navAudit'), icon: ScrollText },
          { id: 'overview', label: t('navOverview'), icon: HelpCircle, badge: isHi ? '4-मिनट प्रवाह' : '4-Min Flow', badgeColor: 'bg-amber-400 text-blue-950 font-black' }
        ];

      case 'BUREAU_HEAD':
        return [
          { id: 'role_dashboard', label: t('navApexDash'), icon: Building2 },
          { id: 'heatmap', label: t('navHeatmap'), icon: MapPin, badge: isHi ? '8 कार्यालय' : '8 ROs' },
          { id: 'sentinel', label: t('navLeaseVault'), icon: ShieldAlert, badge: isHi ? '28 दिन शेष' : '28d Alert', badgeColor: 'bg-red-600' },
          { id: 'audit', label: t('navAudit'), icon: ScrollText },
          { id: 'overview', label: t('navOverview'), icon: HelpCircle, badge: isHi ? '4-मिनट प्रवाह' : '4-Min Flow', badgeColor: 'bg-amber-400 text-blue-950 font-black' }
        ];

      case 'ADMIN_CONFIG':
        return [
          { id: 'role_dashboard', label: t('navRules'), icon: Sliders, badge: isHi ? 'सक्रिय इंजन' : 'Live Engine' },
          { id: 'audit', label: t('navAudit'), icon: ScrollText },
          { id: 'overview', label: t('navOverview'), icon: HelpCircle, badge: isHi ? '4-मिनट प्रवाह' : '4-Min Flow', badgeColor: 'bg-amber-400 text-blue-950 font-black' }
        ];

      default:
        return [
          { id: 'overview', label: t('navOverview'), icon: Home }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="w-full bg-[#003366] text-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center overflow-x-auto no-scrollbar space-x-1 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-gray-950 font-bold shadow-xs'
                    : 'text-gray-100 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gray-950' : 'text-amber-300'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      item.badgeColor || 'bg-blue-800 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Official AICTE Urgent Notification Ribbon */}
      <div className="bg-amber-50 border-t border-b border-amber-300 text-gray-900 py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center space-x-2">
          <span className="flex items-center space-x-1 font-bold text-red-800 text-[11px] bg-red-100 px-2 py-0.5 rounded shrink-0 border border-red-300">
            <Bell className="w-3 h-3 text-red-600 animate-bounce" />
            <span>{t('alertBadge')}</span>
          </span>
          <div className="overflow-hidden whitespace-nowrap text-[11px] font-medium text-gray-800 flex-1">
            <span className="inline-block animate-marquee">
              {t('alertNotice')}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
