// Official Government of India & AICTE Emblems in Scalable Vector Graphics

export function AshokaEmblem({ className = "h-14 w-auto" }) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Ashoka Stambh Graphic Representation */}
      <svg viewBox="0 0 100 120" className="h-10 w-auto text-amber-900 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 C40 10 35 20 35 28 C35 34 38 38 42 42 C40 45 35 48 30 52 C25 56 22 62 25 70 C28 78 35 80 40 80 L60 80 C65 80 72 78 75 70 C78 62 75 56 70 52 C65 48 60 45 58 42 C62 38 65 34 65 28 C65 20 60 10 50 10 Z" opacity="0.9" />
        <circle cx="50" cy="92" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="25" y="104" width="50" height="6" rx="2" />
        <rect x="20" y="112" width="60" height="5" rx="1" />
      </svg>
      <span className="text-[9px] font-bold tracking-tight text-gray-800 uppercase mt-0.5 leading-none">
        सत्यमेव जयते
      </span>
    </div>
  );
}

export const AshokaStambh = AshokaEmblem;

export function AicteEmblem({ className = "h-16 w-16" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-sm select-none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Circular Ring */}
        <circle cx="60" cy="60" r="56" fill="#003366" stroke="#c59b27" strokeWidth="3" />
        <circle cx="60" cy="60" r="49" fill="#ffffff" stroke="#c59b27" strokeWidth="1.5" />

        {/* Subtle Gear/Chakra Spoke Lines (Technology Motif) */}
        <g stroke="#e2e8f0" strokeWidth="1.5">
          <line x1="60" y1="14" x2="60" y2="106" />
          <line x1="14" y1="60" x2="106" y2="60" />
          <line x1="27" y1="27" x2="93" y2="93" />
          <line x1="27" y1="93" x2="93" y2="27" />
        </g>

        {/* Sanskrit Upper Arc */}
        <path id="curve" d="M 22 62 A 38 38 0 1 1 98 62" fill="none" />
        <text fontSize="7" fill="#003366" fontWeight="bold" textAnchor="middle">
          <textPath href="#curve" startOffset="50%">
            योगः कर्मसु कौशलम्
          </textPath>
        </text>

        {/* ============================================================== */}
        {/* CENTERPIECE: STYLIZED HUMAN FIGURE OF KNOWLEDGE & TECHNICAL PROGRESS */}
        {/* ============================================================== */}
        
        {/* Golden Aura behind head */}
        <circle cx="60" cy="38" r="10" fill="#fff7ed" stroke="#fde68a" strokeWidth="1" />

        {/* Radiant Flame of Knowledge above human figure's hands */}
        <path d="M60 26 C57 31 54 35 54 39 C54 43 56.5 46 60 46 C63.5 46 66 43 66 39 C66 35 63 31 60 26 Z" fill="#f57c00" />
        <path d="M60 30 C58.5 33 56.5 36 56.5 39 C56.5 41.5 58 43.5 60 43.5 C62 43.5 63.5 41.5 63.5 39 C63.5 36 61.5 33 60 30 Z" fill="#fde047" />

        {/* Human Head */}
        <circle cx="60" cy="46" r="5" fill="#003366" />

        {/* Human Torso & Shoulders */}
        <path d="M57 51 L63 51 L64 68 L56 68 Z" fill="#003366" />

        {/* Raised Human Arms (Left & Right) forming an uplifting cup/cradle for the flame */}
        {/* Left Arm: Curves from shoulder at (57,53) upwards to (47,40) and hands toward (54,34) */}
        <path 
          d="M 57 53 C 50 51, 44 45, 45 38 C 45 34, 48 33, 52 35 C 50 37, 49 41, 53 45 C 55 48, 57 50, 58 53 Z" 
          fill="#003366" 
        />

        {/* Right Arm: Symmetrical curve from shoulder (63,53) upwards */}
        <path 
          d="M 63 53 C 70 51, 76 45, 75 38 C 75 34, 72 33, 68 35 C 70 37, 71 41, 67 45 C 65 48, 63 50, 62 53 Z" 
          fill="#003366" 
        />

        {/* Human Figure Lower Robe / Flowing Foundation */}
        <path d="M 56 68 L 64 68 L 68 78 L 52 78 Z" fill="#c59b27" />

        {/* Pedestal / Base of Knowledge (Books / Lotus Foundation) */}
        <path d="M 46 78 C 53 81, 67 81, 74 78 L 72 82 C 65 84, 55 84, 48 82 Z" fill="#003366" />
        <rect x="42" y="83" width="36" height="3" rx="1.5" fill="#c59b27" />
        <rect x="48" y="87" width="24" height="2" rx="1" fill="#003366" />

        {/* English Bottom Arc */}
        <path id="bottomCurve" d="M 26 66 A 36 36 0 0 0 94 66" fill="none" />
        <text fontSize="6" fill="#003366" fontWeight="900" letterSpacing="0.8" textAnchor="middle">
          <textPath href="#bottomCurve" startOffset="50%">
            AICTE • INDIA
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export function DigitalIndiaBadge() {
  return (
    <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 bg-white border border-gray-200 rounded text-xs shadow-xs">
      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></div>
      <div className="text-[10px] font-bold text-gray-700 leading-tight">
        <span className="text-orange-600 font-extrabold">Digital</span> India
        <div className="text-[8px] text-gray-500 font-normal">Power To Empower</div>
      </div>
    </div>
  );
}
