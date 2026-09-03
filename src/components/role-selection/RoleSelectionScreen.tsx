import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sprout,
  Store,
  Users,
  Building2,
  TrendingUp,
  User,
  Flame,
  Truck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface RoleOption {
  id: UserRole;
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
  gradient: string;
  iconColor: string;
  bgLight: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'farmer',
    title: 'Farmer',
    tagline: 'Kisan & Cultivator',
    description: 'Manage crop lifecycle, diagnose plant diseases via AI, sell fresh produce & biomass, hire labour squad.',
    icon: Sprout,
    highlights: ['AI Disease Detection', 'Direct Produce Sale', 'Labour Hiring', 'Biomass Sell'],
    gradient: 'from-emerald-600 to-green-500',
    iconColor: 'text-emerald-700',
    bgLight: 'bg-emerald-50/80',
  },
  {
    id: 'store',
    title: 'Agri-Store Seller',
    tagline: 'Seeds, Fertilizers & Equipment',
    description: 'List certified seeds, bio-fertilizers, pesticides, tools and drip irrigation kits with doorstep farm delivery.',
    icon: Store,
    highlights: ['Inventory Management', 'Farmer Orders', 'Sales Insights', 'Direct Payouts'],
    gradient: 'from-blue-600 to-cyan-500',
    iconColor: 'text-blue-700',
    bgLight: 'bg-blue-50/80',
  },
  {
    id: 'labour',
    title: 'Labour & Farm Squad',
    tagline: 'Agricultural Workforce',
    description: 'Connect with local farmers for harvesting, sowing, spraying and weeding with transparent daily wages.',
    icon: Users,
    highlights: ['Squad / Individual', 'Nearby Farm Jobs', 'Guaranteed Daily Wage', 'Direct Settlement'],
    gradient: 'from-amber-600 to-yellow-500',
    iconColor: 'text-amber-700',
    bgLight: 'bg-amber-50/80',
  },
  {
    id: 'contract_company',
    title: 'Contract Farming Company',
    tagline: 'Agro Corporates & Exporters',
    description: 'Publish assured buyback crop contracts, provide technical guidance, and procure harvest directly from farmers.',
    icon: Building2,
    highlights: ['Buyback Agreements', 'Farmer Approvals', 'Procurement Schedule', 'Quality Assurance'],
    gradient: 'from-purple-600 to-indigo-500',
    iconColor: 'text-purple-700',
    bgLight: 'bg-purple-50/80',
  },
  {
    id: 'trader',
    title: 'APMC Broker / Trader',
    tagline: 'Mandi Commission Agent & Trader',
    description: 'Create bulk mandi demands, participate in live digital negotiations, and procure verified commodity lots.',
    icon: TrendingUp,
    highlights: ['Bulk Demands', 'Live Price Counter-offers', 'Mandi Rate Ticker', 'Consignment Fulfillment'],
    gradient: 'from-teal-600 to-emerald-500',
    iconColor: 'text-teal-700',
    bgLight: 'bg-teal-50/80',
  },
  {
    id: 'customer',
    title: 'Customer / Direct Buyer',
    tagline: 'Retail & Household Buyer',
    description: 'Order farm-fresh vegetables, organic grains, and dairy straight from local cultivators with rapid delivery.',
    icon: User,
    highlights: ['Farm-to-Doorstep', '100% Traceable Harvest', 'Fair Prices', 'Live Delivery Tracking'],
    gradient: 'from-rose-600 to-orange-500',
    iconColor: 'text-rose-700',
    bgLight: 'bg-rose-50/80',
  },
  {
    id: 'biomass_buyer',
    title: 'Agri Waste & Biomass Buyer',
    tagline: 'Bio-Energy & Pellet Industry',
    description: 'Procure wheat straw, rice parali, bagasse and husks for biofuel, briquetting, and clean green energy generation.',
    icon: Flame,
    highlights: ['Straw & Parali Demands', 'Zero Stubble Burning', 'Bulk Logistics', 'Industrial Raw Material'],
    gradient: 'from-orange-600 to-amber-500',
    iconColor: 'text-orange-700',
    bgLight: 'bg-orange-50/80',
  },
  {
    id: 'delivery',
    title: 'Delivery Partner',
    tagline: 'Rural Logistics & Fleet',
    description: 'Accept farm-to-mandi, store-to-farm, and customer delivery orders using your two-wheeler, auto, mini-truck or tractor.',
    icon: Truck,
    highlights: ['Guaranteed Trip Payouts', 'Nearby Agri Routes', 'Live Navigation', 'Daily Earnings'],
    gradient: 'from-indigo-600 to-blue-500',
    iconColor: 'text-indigo-700',
    bgLight: 'bg-indigo-50/80',
  },
];

export const RoleSelectionScreen: React.FC = () => {
  const { switchRole, setActiveTab } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPhone, setLoginPhone] = useState('+91 98250 12345');
  const [loginRole, setLoginRole] = useState<UserRole>('farmer');

  const handleContinue = () => {
    if (selectedRole) {
      switchRole(selectedRole);
    }
  };

  const handleQuickLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(loginRole);
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F9FCF9] text-[#1B5E20] flex flex-col justify-between">
      
      {/* Top Header */}
      <nav className="flex items-center justify-between px-6 sm:px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#2E7D32] rounded-lg flex items-center justify-center text-white shadow-md shadow-green-700/20">
            <Sprout className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-green-900">
              AgroWorld
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 font-semibold text-sm text-green-800">
          <button
            onClick={() => {
              switchRole('customer');
              setActiveTab('market');
            }}
            className="hover:text-green-600 transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4 text-green-700" />
            <span>Market</span>
          </button>
          <button
            onClick={() => {
              switchRole('farmer');
              setActiveTab('help');
            }}
            className="hover:text-green-600 transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-green-700" />
            <span>Help</span>
          </button>
        </div>
      </nav>

      {/* Main Role Selection Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-center flex flex-col items-center justify-center">
        
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-2">
            Welcome to AgroWorld
          </h1>
          <p className="text-base sm:text-lg text-green-700 font-medium">
            Select your role to access your dedicated dashboard
          </p>
        </div>

        {/* 8 Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`group cursor-pointer p-4 rounded-2xl flex flex-col items-center gap-2 transition-all shadow-sm ${
                  isSelected
                    ? 'border-2 border-green-600 bg-green-50 ring-2 ring-green-600/20'
                    : 'border-2 border-green-100 bg-white hover:border-green-600 hover:bg-green-50'
                }`}
              >
                {/* Icon in Circular Container */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 transition-colors ${
                    isSelected
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 group-hover:bg-green-200 text-[#2E7D32]'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                {/* Role Title */}
                <h3 className="font-bold text-sm text-green-950">
                  {role.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] leading-tight text-gray-500 text-center">
                  {role.description}
                </p>

                {/* Highlights Tags */}
                <div className="mt-2 pt-2 border-t border-green-100/60 w-full flex flex-wrap justify-center gap-1">
                  {role.highlights.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 text-[9px] font-medium bg-green-100/60 text-green-900 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button & Login CTA */}
        <div className="mt-8 sm:mt-10 w-full max-w-sm flex flex-col items-center gap-3">
          <button
            disabled={!selectedRole}
            onClick={handleContinue}
            className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-[0.98] ${
              selectedRole
                ? 'bg-green-700 hover:bg-green-800 shadow-green-200 cursor-pointer'
                : 'bg-green-300 text-green-100 cursor-not-allowed shadow-none'
            }`}
          >
            Continue to Portal
          </button>

          <div className="text-sm text-gray-500">
            Already have an account?{' '}
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-green-700 font-bold hover:underline"
            >
              Log In
            </button>
          </div>
        </div>
      </main>


      {/* Login / Switch Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Log In to AgroWorld</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuickLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Your Account Role
                </label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value as UserRole)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} ({r.tagline})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number / Email
                </label>
                <input
                  type="text"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                  placeholder="+91 98250 12345"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Log In & Open Dashboard
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <p>© 2026 AgroWorld Platform. Empowering sustainable agriculture & Indian farm commerce.</p>
      </footer>
    </div>
  );
};
