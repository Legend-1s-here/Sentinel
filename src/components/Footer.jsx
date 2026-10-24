import React from 'react';
import { AshokaEmblem, AicteEmblem } from './Emblems';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer({ t = (k) => k }) {
  return (
    <footer className="w-full bg-[#002244] text-gray-300 text-xs border-t-4 border-[#003366] mt-12">
      {/* Top Footer Strip: Official Links */}
      <div className="border-b border-blue-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Col 1: AICTE Address */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide">{t('footerHq')}</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              {t('footerAddress')}<br />
              EPBAX: +91-11-26131576-78, 80
            </p>
            <div className="pt-1 text-[11px] text-amber-300 font-semibold">
              Approval Process Unit: egov@aicte-india.org
            </div>
          </div>

          {/* Col 2: Regulatory Links */}
          <div className="space-y-1.5">
            <h4 className="text-white font-bold text-sm tracking-wide">{t('footerFramework')}</h4>
            <ul className="space-y-1 text-[11px] text-gray-400">
              <li className="hover:text-white cursor-pointer">• AICTE Act 1987</li>
              <li className="hover:text-white cursor-pointer">• Approval Process Handbook (APH 2024–27)</li>
              <li className="hover:text-white cursor-pointer">• Digital Personal Data Protection (DPDP) Act</li>
              <li className="hover:text-white cursor-pointer">• National Education Policy (NEP 2020)</li>
            </ul>
          </div>

          {/* Col 3: Portal Standards */}
          <div className="space-y-1.5">
            <h4 className="text-white font-bold text-sm tracking-wide">{t('footerCompliance')}</h4>
            <ul className="space-y-1 text-[11px] text-gray-400">
              <li className="hover:text-white cursor-pointer">• Guidelines for Indian Govt Websites (GIGW 3.0)</li>
              <li className="hover:text-white cursor-pointer">• NeSDA Digital Benchmark Standards</li>
              <li className="hover:text-white cursor-pointer">• STQC Website Quality Certified</li>
              <li className="hover:text-white cursor-pointer">• Web Content Accessibility (WCAG 2.1 AA)</li>
            </ul>
          </div>

          {/* Col 4: Hackathon Attribution */}
          <div className="space-y-2 bg-blue-950/60 p-3 rounded border border-blue-800">
            <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Smart India Hackathon 2025/2026</span>
            </div>
            <p className="text-[11px] text-gray-300 leading-normal">
              Automated Workflow & Sentinel Platform developed for AICTE Approval Process Modernization.
            </p>
            <div className="text-[10px] text-gray-400 font-mono">
              Team: Sentinel | PS: Software / GovTech
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer: NIC & Legal Attribution */}
      <div className="bg-[#001730] py-3 text-[11px] text-gray-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div>
            {t('footerContentManaged')}
          </div>
          <div className="flex items-center space-x-3 text-[10px]">
            <span>{t('footerPrivacy')}</span>
            <span>•</span>
            <span>{t('footerTerms')}</span>
            <span>•</span>
            <span>{t('footerHyperlink')}</span>
            <span>•</span>
            <span className="text-amber-300">{t('footerLastUpdated')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
