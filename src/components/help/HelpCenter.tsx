import React, { useState } from 'react';
import {
  HelpCircle,
  Phone,
  MessageCircle,
  FileText,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Flame,
  Sprout,
} from 'lucide-react';

export const HelpCenter: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const FAQS = [
    {
      q: 'How does the AI Crop Disease Doctor work?',
      a: 'Simply upload or capture a clear photo of the infected crop leaf or fruit. Our Gemini-powered pathology engine detects fungal, bacterial, and viral blights, computes a confidence score, and provides actionable organic and chemical spray dosages.',
    },
    {
      q: 'How do farmers sell crop residue / parali without stubble burning?',
      a: 'Farmers can list baled or loose wheat straw, paddy parali, or mustard stalks in the Agri-Waste section. Verified biomass buyers, bio-ethanol plants, and pellet factories can directly buy and arrange tractor/truck transport from your farm gate.',
    },
    {
      q: 'How do digital negotiations with APMC traders work?',
      a: 'APMC commission agents and wholesale buyers broadcast commodity demands with target prices. Farmers can submit counter-offers with customized messages. Once both parties agree, the deal is locked and gate-in delivery is scheduled.',
    },
    {
      q: 'Are payments on AgroWorld protected?',
      a: 'Yes. All direct retail customer orders, corporate buyback agreements, and mandi deliveries are processed through secure digital escrow. Payment is released upon buyer inspection or APMC weighbridge receipt.',
    },
    {
      q: 'How can farm labour squads find work?',
      a: 'Squad leaders can register their team size and standard daily wage per member. When local farmers post harvesting, sowing, or spraying requirements, squads receive instant notifications and can accept jobs with guaranteed daily wage settlements.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-yellow-300" />
          <span>24x7 Kisan Support & Knowledge Hub</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
          AgroWorld Help & Advisory Center
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-xl mx-auto">
          Get assistance with crop disease diagnostics, direct buyer orders, mandi price negotiations, and government scheme linkages.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:1800233800"
            className="px-5 py-2.5 bg-white text-emerald-900 font-bold text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>Kisan Toll-Free: 1800-233-800</span>
          </a>
          <a
            href="mailto:support@agroworld.in"
            className="px-5 py-2.5 bg-emerald-900/70 border border-emerald-500/40 text-emerald-100 font-bold text-xs rounded-xl hover:bg-emerald-900 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Email Agronomist Desk</span>
          </a>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex justify-between items-center text-xs sm:text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sustainable Farming Guidelines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-200 space-y-2">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-700" />
            <h4 className="text-sm font-bold text-emerald-950">Zero Chemical Residue Protocol</h4>
          </div>
          <p className="text-xs text-emerald-900/80 leading-relaxed">
            Follow our integrated pest management (IPM) guidelines to ensure your produce fetches premium export and direct consumer pricing.
          </p>
        </div>

        <div className="bg-orange-50 p-5 rounded-2xl border border-orange-200 space-y-2">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-700" />
            <h4 className="text-sm font-bold text-orange-950">Clean Biomass Stubble Incentive</h4>
          </div>
          <p className="text-xs text-orange-900/80 leading-relaxed">
            Earn up to ₹2,500/tonne by baling your wheat and paddy straw for local pellet manufacturing instead of burning.
          </p>
        </div>
      </div>

    </div>
  );
};
