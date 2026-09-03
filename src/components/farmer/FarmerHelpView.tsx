import React, { useState } from 'react';
import {
  HelpCircle,
  Phone,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  ShieldCheck,
  Headphones,
  Sprout,
  Camera,
  ShoppingBag,
  Flame,
  Users,
  Building2,
} from 'lucide-react';

const FAQS = [
  {
    icon: <Sprout className="w-5 h-5 text-green-700" />,
    question: 'How do I add and manage my crops?',
    answer:
      'Go to "My Crops" from the menu or dashboard, and tap "+ Add Crop". Fill in the crop name, land size, planting date, and expected harvest date. You can update watering or fertilizer logs anytime and see your expected profit.',
  },
  {
    icon: <Camera className="w-5 h-5 text-green-700" />,
    question: 'How does "Check Crop Health" work?',
    answer:
      'Tap "Check Crop Health", then take a clear photo of an affected leaf or fruit using your phone camera (or pick from your gallery). The app will tell you the problem name in simple words, explain what it means, and recommend remedies and prevention steps.',
  },
  {
    icon: <ShoppingBag className="w-5 h-5 text-green-700" />,
    question: 'How do I sell my harvest directly to buyers?',
    answer:
      'Tap "Sell Crop", click "+ Add Crop for Sale", enter your quantity, asking price per kg or quintal, and location. Your crop will immediately appear in the marketplace for direct wholesale buyers and retailers.',
  },
  {
    icon: <Flame className="w-5 h-5 text-orange-600" />,
    question: 'How can I earn money from farm waste / parali?',
    answer:
      'Under "Sell Farm Waste", you can list wheat straw, rice parali, sugarcane tops, or cotton stalks. Biogas plants, pellet manufacturers, and cattle feed centers buy this residue at profitable per-tonne rates.',
  },
  {
    icon: <Users className="w-5 h-5 text-amber-700" />,
    question: 'How do I find nearby farm labour for harvesting?',
    answer:
      'Open "Find Labour" to see nearby worker groups with ratings and daily wage rates. You can also tap "+ Create Labour Request" specifying the number of workers needed and work date.',
  },
  {
    icon: <Building2 className="w-5 h-5 text-purple-700" />,
    question: 'What is a Farm Contract and how does buyback work?',
    answer:
      'Verified corporate food companies post purchase contracts with fixed guaranteed prices (e.g. ₹2,400/Qtl for Wheat). When you apply, the company agrees to purchase your crop upon harvest, protecting you from market price drops.',
  },
];

export const FarmerHelpView: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
            <HelpCircle className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-950">Help & Support</h1>
            <p className="text-xs sm:text-sm text-green-800 font-medium">
              Simple answers to common questions and 24/7 Kisan helpline
            </p>
          </div>
        </div>

        <div className="px-4 py-2 bg-green-50 rounded-2xl border border-green-200 text-xs font-bold text-[#1B5E20] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-700" />
          <span>Farmer Helpline Active</span>
        </div>
      </div>

      {/* Helpline Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Kisan Call Centre */}
        <div className="p-5 rounded-3xl bg-green-50/80 border border-green-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center shadow-xs">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-green-800 font-bold uppercase block">
                Govt. Kisan Call Centre (Toll Free)
              </span>
              <a href="tel:18001801551" className="text-lg font-extrabold text-green-950 hover:underline">
                1800-180-1551
              </a>
              <p className="text-[11px] text-green-800 font-medium">Free farming advice in regional languages</p>
            </div>
          </div>
        </div>

        {/* AgroWorld App Support */}
        <div className="p-5 rounded-3xl bg-blue-50/80 border border-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-blue-800 font-bold uppercase block">
                AgroWorld Kisan Support
              </span>
              <a href="tel:+919876543210" className="text-lg font-extrabold text-blue-950 hover:underline">
                +91 98765 43210
              </a>
              <p className="text-[11px] text-blue-800 font-medium">Call or WhatsApp 8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-green-100 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-green-950 pb-2 border-b border-slate-100">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-white hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                      {faq.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100/60">
                    <p className="p-3 bg-green-50/50 rounded-xl border border-green-100 text-slate-700">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
