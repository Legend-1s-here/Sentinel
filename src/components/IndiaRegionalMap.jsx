import React, { useState } from 'react';
import { 
  AlertOctagon, 
  CheckCircle2, 
  MapPin, 
  ShieldAlert, 
  Clock, 
  TrendingUp, 
  Info,
  Maximize2
} from 'lucide-react';

export default function IndiaRegionalMap({ 
  regions, 
  selectedRegion, 
  setSelectedRegion, 
  language = 'en',
  onTriggerEscalation
}) {
  const isHi = language === 'hi';
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [mapMode, setMapMode] = useState('sla'); // 'sla', 'volume', 'tat'

  // Map each region name to SVG ID and styling
  const regionConfig = {
    'Northern Region (RO Kanpur)': {
      id: 'north',
      nameEn: 'Northern Region',
      nameHi: 'उत्तरी क्षेत्र',
      roEn: 'RO Kanpur',
      roHi: 'कानपुर कार्यालय',
      hqCoords: { cx: 285, cy: 220 }, // Kanpur approx
      path: `M 220,50 
             C 230,30 260,30 275,45 
             C 290,60 305,80 320,110 
             C 335,130 310,160 330,185 
             C 350,205 385,215 400,230 
             C 380,265 340,270 305,270 
             C 275,270 250,265 240,250 
             C 230,235 220,240 205,225 
             C 185,210 180,180 190,150 
             C 200,120 185,90 200,70 Z`,
      colorClass: 'fill-red-500 hover:fill-red-600 stroke-red-700',
      glowFilter: 'drop-shadow(0 0 12px rgba(220, 38, 38, 0.65))',
      slaColor: '#dc2626',
      badgeBg: 'bg-red-600',
      statusEn: 'CRITICAL BOTTLENECK (14 SLA BREACHES)',
      statusHi: 'गंभीर अड़चन (14 SLA उल्लंघन)'
    },
    'Western Region (RO Mumbai)': {
      id: 'west',
      nameEn: 'Western Region',
      nameHi: 'पश्चिमी क्षेत्र',
      roEn: 'RO Mumbai',
      roHi: 'मुंबई कार्यालय',
      hqCoords: { cx: 175, cy: 375 }, // Mumbai approx
      path: `M 175,240 
             C 200,240 220,255 240,250 
             C 255,275 250,310 270,335 
             C 265,370 240,400 230,440 
             C 205,435 190,400 170,390 
             C 150,370 160,340 145,320 
             C 120,310 100,290 115,265 
             C 130,245 155,255 175,240 Z`,
      colorClass: 'fill-emerald-500 hover:fill-emerald-600 stroke-emerald-700',
      glowFilter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))',
      slaColor: '#10b981',
      badgeBg: 'bg-emerald-600',
      statusEn: '100% ON TRACK (0 BREACHES)',
      statusHi: '100% समयबद्ध (0 उल्लंघन)'
    },
    'Central Region (RO Bhopal)': {
      id: 'central',
      nameEn: 'Central Region',
      nameHi: 'मध्य क्षेत्र',
      roEn: 'RO Bhopal',
      roHi: 'भोपाल कार्यालय',
      hqCoords: { cx: 280, cy: 315 }, // Bhopal approx
      path: `M 240,250 
             C 275,265 305,270 340,270 
             C 360,285 375,320 365,355 
             C 350,380 320,385 295,380 
             C 275,370 270,345 250,335 
             C 245,300 245,275 240,250 Z`,
      colorClass: 'fill-amber-500 hover:fill-amber-600 stroke-amber-700',
      glowFilter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))',
      slaColor: '#f59e0b',
      badgeBg: 'bg-amber-600',
      statusEn: 'ATTENTION REQUIRED (6 BREACHES)',
      statusHi: 'सावधानी अपेक्षित (6 उल्लंघन)'
    },
    'Eastern Region (RO Kolkata)': {
      id: 'east',
      nameEn: 'Eastern Region',
      nameHi: 'पूर्वी क्षेत्र',
      roEn: 'RO Kolkata',
      roHi: 'कोलकाता कार्यालय',
      hqCoords: { cx: 415, cy: 310 }, // Kolkata approx
      path: `M 340,270 
             C 380,265 400,230 430,225 
             C 460,215 500,205 530,215 
             C 545,230 520,255 490,260 
             C 460,270 440,290 425,330 
             C 400,360 375,370 365,355 
             C 375,320 360,285 340,270 Z`,
      colorClass: 'fill-blue-500 hover:fill-blue-600 stroke-blue-700',
      glowFilter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))',
      slaColor: '#3b82f6',
      badgeBg: 'bg-blue-600',
      statusEn: 'NORMAL (4 BREACHES)',
      statusHi: 'सामान्य (4 उल्लंघन)'
    },
    'South-Western Region (RO Bengaluru)': {
      id: 'southwest',
      nameEn: 'South-Western Region',
      nameHi: 'दक्षिण-पश्चिम क्षेत्र',
      roEn: 'RO Bengaluru',
      roHi: 'बेंगलुरु कार्यालय',
      hqCoords: { cx: 235, cy: 505 }, // Bengaluru approx
      path: `M 230,440 
             C 240,460 250,480 255,510 
             C 255,540 240,570 230,600 
             C 215,570 210,530 205,490 
             C 200,460 215,445 230,440 Z`,
      colorClass: 'fill-indigo-500 hover:fill-indigo-600 stroke-indigo-700',
      glowFilter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))',
      slaColor: '#6366f1',
      badgeBg: 'bg-indigo-600',
      statusEn: 'STABLE (2 BREACHES)',
      statusHi: 'स्थिर (2 उल्लंघन)'
    },
    'Southern Region (RO Chennai)': {
      id: 'south',
      nameEn: 'Southern Region',
      nameHi: 'दक्षिणी क्षेत्र',
      roEn: 'RO Chennai',
      roHi: 'चेन्नई कार्यालय',
      hqCoords: { cx: 285, cy: 520 }, // Chennai approx
      path: `M 270,335 
             C 300,360 330,375 325,410 
             C 320,450 300,490 290,535 
             C 275,575 250,610 240,635 
             C 230,600 240,570 255,510 
             C 250,480 240,460 230,440 
             C 240,400 265,370 270,335 Z`,
      colorClass: 'fill-cyan-500 hover:fill-cyan-600 stroke-cyan-700',
      glowFilter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))',
      slaColor: '#06b6d4',
      badgeBg: 'bg-cyan-600',
      statusEn: 'NORMAL (5 BREACHES)',
      statusHi: 'सामान्य (5 उल्लंघन)'
    }
  };

  const activeHover = hoveredRegion 
    ? regions.find(r => r.region === hoveredRegion)
    : selectedRegion;

  const activeConfig = activeHover ? regionConfig[activeHover.region] : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs space-y-4">
      {/* Top Controls & Map Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-200 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-[#003366] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
              {isHi ? 'इंटरएक्टिव अखिल भारतीय हीटमैप' : 'INTERACTIVE PAN-INDIA HEATMAP'}
            </span>
            <span className="text-xs text-gray-500 font-mono">SVG NeSDA 2.0 Live Matrix</span>
          </div>
          <h2 className="text-base font-bold text-gray-900 mt-1 flex items-center gap-2">
            <span>{isHi ? '8 क्षेत्रीय कार्यालयों का वास्तविक-समय भौगोलिक SLA मानचित्र' : 'Real-Time Geospatial SLA Jurisdiction Heatmap'}</span>
            <span className="text-xs font-normal text-gray-500">
              ({isHi ? 'क्षेत्र का विवरण देखने हेतु माउस घुमाएँ अथवा क्लिक करें' : 'Hover or click regions to inspect live pendency'})
            </span>
          </h2>
        </div>

        {/* Heatmap Layer Selector */}
        <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-md text-xs self-stretch sm:self-auto">
          <button
            onClick={() => setMapMode('sla')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              mapMode === 'sla' ? 'bg-[#003366] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {isHi ? 'SLA उल्लंघन (गंभीरता)' : 'SLA Breaches'}
          </button>
          <button
            onClick={() => setMapMode('volume')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              mapMode === 'volume' ? 'bg-[#003366] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {isHi ? 'आवेदन भार' : 'Application Load'}
          </button>
          <button
            onClick={() => setMapMode('tat')}
            className={`px-2.5 py-1 rounded font-bold transition-all cursor-pointer ${
              mapMode === 'tat' ? 'bg-[#003366] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {isHi ? 'औसत प्रसंस्करण गति' : 'TAT Speed'}
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Map on Left, Dynamic Stat Cockpit on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: The SVG Map Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-2 bg-slate-900 rounded-xl relative overflow-hidden border border-slate-800 shadow-inner min-h-[460px]">
          {/* Subtle Grid Coordinates Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none"></div>

          {/* Compass Rose */}
          <div className="absolute top-4 left-4 z-10 flex flex-col items-center text-slate-400 font-mono text-[9px] pointer-events-none select-none">
            <span className="font-bold text-slate-300">N</span>
            <div className="w-0.5 h-6 bg-slate-600 relative my-0.5">
              <div className="absolute -left-1 top-0 w-2.5 h-2.5 bg-red-500 rotate-45"></div>
            </div>
            <span>S</span>
          </div>

          {/* Live Heatmap Alert Callout Banner for Northern Region */}
          <div className="absolute top-4 right-4 z-10 bg-red-950/90 border border-red-500/80 rounded-lg p-2.5 max-w-[210px] text-xs shadow-lg backdrop-blur-xs pointer-events-none animate-pulse">
            <div className="flex items-center gap-1.5 text-red-300 font-black text-[10px] uppercase">
              <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
              <span>{isHi ? 'उत्तरी क्षेत्र रेड अलर्ट' : 'Northern Region Red Alert'}</span>
            </div>
            <div className="text-white font-bold text-xs mt-0.5">
              14 {isHi ? 'फाइलें 10 दिन से अधिक लंबित' : 'Files > 10 Days Overdue'}
            </div>
            <div className="text-red-200 text-[10px] mt-0.5 font-mono">
              RO Kanpur: NeSDA SLA Breached
            </div>
          </div>

          {/* SVG Map of India's Regional Jurisdictions */}
          <svg
            viewBox="0 0 600 660"
            className="w-full h-[430px] max-w-[520px] select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="radarPing" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
              </radialGradient>
              <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ocean / Boundary Glow */}
            <path
              d="M 120,240 C 200,80 320,40 420,120 C 560,200 480,340 380,480 C 300,580 240,650 220,620 C 180,500 120,400 120,240 Z"
              fill="none"
              stroke="#334155"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.3"
            />

            {/* Regional Geographic Paths */}
            {regions.map((regionItem) => {
              const cfg = regionConfig[regionItem.region];
              if (!cfg) return null;

              const isSelected = selectedRegion.region === regionItem.region;
              const isHovered = hoveredRegion === regionItem.region;
              const isNorthern = regionItem.region.includes('Northern');

              // Color based on mapMode
              let fillColor = '#3b82f6';
              let strokeColor = '#1d4ed8';

              if (mapMode === 'sla') {
                if (regionItem.status === 'CRITICAL_BOTTLENECK') {
                  fillColor = isHovered ? '#b91c1c' : '#dc2626'; // Vivid Red for Northern
                  strokeColor = '#f87171';
                } else if (regionItem.status === 'EXEMPLARY') {
                  fillColor = isHovered ? '#047857' : '#059669'; // Emerald for Western
                  strokeColor = '#34d399';
                } else if (regionItem.status === 'ATTENTION_REQUIRED') {
                  fillColor = isHovered ? '#d97706' : '#f59e0b'; // Amber for Central
                  strokeColor = '#fbbf24';
                } else {
                  fillColor = isHovered ? '#2563eb' : '#3b82f6'; // Blue
                  strokeColor = '#60a5fa';
                }
              } else if (mapMode === 'volume') {
                // Volume heatmap gradient
                const intensity = Math.min(regionItem.totalApplications / 2200, 1);
                fillColor = isHovered ? '#0284c7' : `rgba(14, 165, 233, ${0.4 + intensity * 0.5})`;
                strokeColor = '#38bdf8';
              } else if (mapMode === 'tat') {
                // Turnaround days
                fillColor = regionItem.avgProcessingDays > 10 ? '#dc2626' : regionItem.avgProcessingDays > 7 ? '#f59e0b' : '#10b981';
                strokeColor = '#ffffff';
              }

              return (
                <g key={regionItem.region}>
                  <path
                    d={cfg.path}
                    fill={fillColor}
                    stroke={isSelected || isHovered ? '#ffffff' : strokeColor}
                    strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.5}
                    filter={isNorthern || isSelected ? 'url(#redGlow)' : undefined}
                    className="transition-all duration-200 cursor-pointer opacity-90 hover:opacity-100"
                    onMouseEnter={() => setHoveredRegion(regionItem.region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => setSelectedRegion(regionItem)}
                  />
                  
                  {/* Region Name Label on Map */}
                  <text
                    x={cfg.hqCoords.cx}
                    y={cfg.hqCoords.cy - 12}
                    fill="#ffffff"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none select-none drop-shadow-md"
                  >
                    {isHi ? cfg.nameHi : cfg.nameEn}
                  </text>
                  <text
                    x={cfg.hqCoords.cx}
                    y={cfg.hqCoords.cy}
                    fill="#cbd5e1"
                    fontSize="8"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    ({isHi ? cfg.roHi : cfg.roEn})
                  </text>
                </g>
              );
            })}

            {/* Animated Beacon Rings at Headquarters */}
            {regions.map((regionItem) => {
              const cfg = regionConfig[regionItem.region];
              if (!cfg) return null;
              const isCritical = regionItem.status === 'CRITICAL_BOTTLENECK';

              return (
                <g key={`beacon-${regionItem.region}`} className="pointer-events-none">
                  {/* Radar pulse for critical bottleneck (Northern Region) */}
                  {isCritical && (
                    <>
                      <circle
                        cx={cfg.hqCoords.cx}
                        cy={cfg.hqCoords.cy + 12}
                        r="18"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        className="animate-ping opacity-75"
                      />
                      <circle
                        cx={cfg.hqCoords.cx}
                        cy={cfg.hqCoords.cy + 12}
                        r="8"
                        fill="#ef4444"
                        opacity="0.4"
                      />
                    </>
                  )}

                  {/* Core Point */}
                  <circle
                    cx={cfg.hqCoords.cx}
                    cy={cfg.hqCoords.cy + 12}
                    r="4"
                    fill={isCritical ? '#fee2e2' : '#ffffff'}
                    stroke={isCritical ? '#dc2626' : '#003366'}
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
          </svg>

          {/* Map Legend Footer */}
          <div className="w-full flex items-center justify-between text-[11px] text-slate-300 px-4 py-2 border-t border-slate-800 bg-slate-950/70 rounded-b-lg">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span>{isHi ? 'गंभीर SLA अड़चन (>10 दिन)' : 'Critical SLA (>10d)'}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>{isHi ? '100% समयबद्ध' : '100% On Track'}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>{isHi ? 'सावधानी अपेक्षित' : 'Attention'}</span>
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">
              {isHi ? 'स्रोत: AICTE NeSDA पोर्टल' : 'Source: AICTE NeSDA'}
            </span>
          </div>
        </div>

        {/* Right: Focused Region Stat Cockpit & Escalation Directive */}
        <div className="lg:col-span-5 space-y-4">
          {activeHover && activeConfig && (
            <div className={`p-5 rounded-lg border shadow-sm transition-all ${
              activeHover.status === 'CRITICAL_BOTTLENECK'
                ? 'bg-red-50/80 border-red-300 ring-2 ring-red-200'
                : activeHover.status === 'EXEMPLARY'
                ? 'bg-emerald-50/80 border-emerald-300'
                : 'bg-white border-gray-200'
            }`}>
              {/* Region Title & Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-gray-500">
                    {isHi ? 'चयनित क्षेत्रीय अधिकार क्षेत्र' : 'Selected Regional Jurisdiction'}
                  </span>
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-1.5 mt-0.5">
                    <MapPin className={`w-4 h-4 ${activeHover.status === 'CRITICAL_BOTTLENECK' ? 'text-red-600' : 'text-[#003366]'}`} />
                    <span>{isHi ? activeConfig.nameHi : activeHover.region}</span>
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">{activeHover.states}</p>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-white ${activeConfig.badgeBg} ${
                  activeHover.status === 'CRITICAL_BOTTLENECK' ? 'animate-pulse' : ''
                }`}>
                  {isHi ? activeConfig.statusHi : activeConfig.statusEn}
                </span>
              </div>

              {/* Real-Time Telemetry Counters */}
              <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs">
                <div className="bg-white p-2.5 rounded border border-gray-200 shadow-2xs">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">{isHi ? 'कुल प्राप्त आवेदन' : 'Total Applications'}</div>
                  <div className="text-xl font-black text-gray-900 mt-0.5">{activeHover.totalApplications}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">{activeHover.clearedOnTime} {isHi ? 'समय पर स्वीकृत' : 'Cleared on time'}</div>
                </div>

                <div className={`p-2.5 rounded border shadow-2xs ${
                  activeHover.breachedSLA > 0 ? 'bg-red-100/90 border-red-300' : 'bg-white border-gray-200'
                }`}>
                  <div className="text-[10px] text-red-800 font-bold uppercase">{isHi ? 'SLA उल्लंघन (अतिदेय)' : 'SLA Breaches'}</div>
                  <div className={`text-xl font-black mt-0.5 ${activeHover.breachedSLA > 0 ? 'text-red-700 animate-bounce' : 'text-emerald-800'}`}>
                    {activeHover.breachedSLA} {isHi ? 'फाइलें' : 'Files'}
                  </div>
                  <div className="text-[10px] text-red-700 font-semibold">
                    {activeHover.breachedSLA > 0 ? (isHi ? '10-दिवसीय सीमा पार' : 'Exceeding 10d benchmark') : (isHi ? 'शून्य लंबित' : 'Zero pendency')}
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded border border-gray-200 shadow-2xs">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">{isHi ? 'प्रक्रियाधीन फाइलें' : 'In Progress Queue'}</div>
                  <div className="text-xl font-black text-blue-900 mt-0.5">{activeHover.inProgress}</div>
                  <div className="text-[10px] text-gray-500">{isHi ? 'सक्रिय संवीक्षा/EVC' : 'Active Scrutiny/EVC'}</div>
                </div>

                <div className="bg-white p-2.5 rounded border border-gray-200 shadow-2xs">
                  <div className="text-[10px] text-gray-500 font-bold uppercase">{isHi ? 'औसत प्रसंस्करण समय' : 'Avg Turnaround (TAT)'}</div>
                  <div className="text-xl font-black text-gray-900 mt-0.5">
                    {activeHover.avgProcessingDays} <span className="text-xs font-normal text-gray-500">{isHi ? 'दिन' : 'Days'}</span>
                  </div>
                  <div className="text-[10px] text-gray-600">{isHi ? 'मानक: ≤ 10 दिन' : 'SLA Target: ≤ 10 Days'}</div>
                </div>
              </div>

              {/* Officer / Bottleneck Callout */}
              <div className="mt-3.5 p-3 bg-white/90 rounded border border-gray-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800">{isHi ? 'पहचानी गई संवीक्षा अड़चन / डेस्क:' : 'Identified Bottleneck Desk:'}</span>
                  <span className="font-mono text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.2 rounded">
                    {isHi ? 'NeSDA स्तर-2' : 'NeSDA Level-2'}
                  </span>
                </div>
                <div className="font-semibold text-red-950 text-[11px]">
                  {activeHover.flaggedOfficer}
                </div>
              </div>

              {/* Action Trigger Button (if breaches exist) */}
              {activeHover.breachedSLA > 0 && onTriggerEscalation && (
                <button
                  onClick={() => onTriggerEscalation(activeHover.region, activeHover.flaggedOfficer)}
                  className="w-full mt-3.5 bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-4 rounded text-xs flex items-center justify-center space-x-2 shadow-sm cursor-pointer transition-colors"
                >
                  <ShieldAlert className="w-4 h-4 text-amber-300" />
                  <span>
                    {isHi 
                      ? `शीर्ष ब्यूरो स्तर-2 चेतावनी जारी करें (${activeHover.breachedSLA} फाइलें)` 
                      : `Trigger Apex Bureau Level-2 Escalation (${activeHover.breachedSLA} Files)`}
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Winning Presentation Talking Point */}
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-950">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>{isHi ? 'निर्णायक प्रस्तुति युक्ति (SIH 2025/2026):' : 'SIH Hackathon Presentation Cue:'}</span>
            </div>
            <p className="text-[11px] text-gray-700 mt-1 leading-relaxed">
              {isHi
                ? 'नक्शे पर उत्तरी क्षेत्र (कानपुर) पर होवर करके लाल रंग (14 उल्लंघन) दिखाएं, और पश्चिमी क्षेत्र (मुंबई) पर होवर करके हरा रंग (0 उल्लंघन) दिखाएं। यह NeSDA ई-गवर्नेंस के तहत स्वचालित पदानुक्रमित चेतावनी का सशक्त प्रमाण है।'
                : 'Hovering over Northern Region turns red highlighting 14 SLA breaches in Kanpur, while Western Region stays green with 0 breaches. Demonstrates automated citizen transparency under NeSDA guidelines.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
