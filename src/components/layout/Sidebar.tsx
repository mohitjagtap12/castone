import React from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_CONFIGS } from './Header';
import {
  LayoutDashboard,
  Sprout,
  Sparkles,
  ShoppingBag,
  Flame,
  Users,
  Building2,
  TrendingUp,
  Package,
  FileText,
  Truck,
  ShieldAlert,
  ChevronRight,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface SidebarProps {
  currentRoleView: string;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { currentRole, activeTab, setActiveTab, currentUser, mandiRates, resetAllDataToDemo } = useApp();

  const roleConfig = ROLE_CONFIGS[currentRole] || ROLE_CONFIGS.farmer;
  const RoleIcon = roleConfig.icon;

  // Generate role-specific navigation links
  const getNavItems = () => {
    switch (currentRole) {
      case 'farmer':
        return [
          { id: 'dashboard', label: 'Farmer Overview', icon: LayoutDashboard },
          { id: 'farmer_crops', label: 'My Crops', icon: Sprout, badge: 'Active' },
          { id: 'ai_doctor', label: 'Check Crop Health', icon: Sparkles, highlight: true },
          { id: 'farmer_sell', label: 'Sell Crop', icon: ShoppingBag },
          { id: 'farmer_waste', label: 'Sell Farm Waste', icon: Flame },
          { id: 'farmer_labour', label: 'Find Labour', icon: Users },
          { id: 'farmer_supplies', label: 'Buy Farm Products', icon: Package },
          { id: 'farmer_contracts', label: 'Farm Contracts', icon: Building2 },
          { id: 'farmer_orders', label: 'My Orders', icon: FileText },
          { id: 'market', label: 'Mandi Rates & Market', icon: TrendingUp },
          { id: 'help', label: 'Help & Support', icon: HelpCircle },
        ];
      case 'store':
        return [
          { id: 'dashboard', label: 'Store Overview', icon: LayoutDashboard },
          { id: 'store_inventory', label: 'Product Inventory', icon: Package },
          { id: 'store_add_product', label: 'Add New Product', icon: Sprout },
          { id: 'store_orders', label: 'Customer Orders', icon: FileText, badge: 'New' },
          { id: 'market', label: 'Live Agri Market', icon: TrendingUp },
        ];
      case 'labour':
        return [
          { id: 'dashboard', label: 'Squad Overview', icon: LayoutDashboard },
          { id: 'labour_jobs', label: 'Nearby Farm Jobs', icon: Users, badge: 'Available' },
          { id: 'labour_active', label: 'Job Tracker & Status', icon: FileText },
          { id: 'labour_profile', label: 'Skills & Daily Wage', icon: Sprout },
        ];
      case 'contract_company':
        return [
          { id: 'dashboard', label: 'Company Overview', icon: LayoutDashboard },
          { id: 'company_contracts', label: 'Publish Buyback Contracts', icon: Building2 },
          { id: 'company_applications', label: 'Farmer Applications', icon: FileText, badge: 'Review' },
          { id: 'company_harvest', label: 'Harvest Procurement', icon: Sprout },
        ];
      case 'trader':
        return [
          { id: 'dashboard', label: 'Trader Overview', icon: LayoutDashboard },
          { id: 'trader_demands', label: 'Bulk Mandi Demands', icon: TrendingUp },
          { id: 'trader_negotiations', label: 'Live Negotiations', icon: MessageSquare, badge: 'Active' },
          { id: 'market', label: 'APMC Commodity Ticker', icon: ShoppingBag },
        ];
      case 'customer':
        return [
          { id: 'dashboard', label: 'Fresh Market', icon: LayoutDashboard },
          { id: 'market', label: 'Organic Farm Direct', icon: Sprout },
          { id: 'customer_orders', label: 'My Farm Orders', icon: FileText },
        ];
      case 'biomass_buyer':
        return [
          { id: 'dashboard', label: 'Procurement Overview', icon: LayoutDashboard },
          { id: 'biomass_demands', label: 'Post Biomass Demand', icon: Flame },
          { id: 'biomass_browse', label: 'Browse Farmer Waste', icon: Sprout },
        ];
      case 'delivery':
        return [
          { id: 'dashboard', label: 'Driver Dashboard', icon: LayoutDashboard },
          { id: 'delivery_available', label: 'Available Cargo Trips', icon: Truck, badge: 'Active' },
          { id: 'delivery_transit', label: 'Active Delivery Tracking', icon: FileText },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Admin Command Center', icon: LayoutDashboard },
          { id: 'admin_verifications', label: 'Verify Businesses', icon: ShieldCheck, badge: 'Pending' },
          { id: 'admin_moderation', label: 'Listing Moderation', icon: ShieldAlert },
          { id: 'admin_mandi', label: 'APMC Mandi Rates Admin', icon: TrendingUp },
          { id: 'admin_rules', label: 'Firebase Rules & Schema', icon: FileText },
        ];
      default:
        return [{ id: 'dashboard', label: 'Overview', icon: LayoutDashboard }];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r border-emerald-100 flex flex-col justify-between shrink-0 hidden lg:flex min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-5">
        
        {/* Active Role Card Badge */}
        <div className={`p-3.5 rounded-2xl border ${roleConfig.bg}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center shrink-0">
              <RoleIcon className={`w-5 h-5 ${roleConfig.color}`} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
              </div>
              <p className={`text-[11px] font-semibold ${roleConfig.color} truncate`}>
                {roleConfig.name}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-600">
            <span>{currentUser.location.district}, {currentUser.location.state}</span>
            <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400 px-3 mb-2">
            Portal Navigation
          </p>
          {navItems.map((item) => {
            const ItemIcon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : item.highlight
                    ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100/70 border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <ItemIcon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-white'
                        : item.highlight
                        ? 'text-emerald-600'
                        : 'text-slate-400 group-hover:text-slate-700'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full ${
                      isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {!item.badge && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* APMC Mandi Mini-Ticker */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              Live Mandi Ticker
            </span>
            <span className="text-[9px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded-sm">
              Today
            </span>
          </div>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {mandiRates.slice(0, 3).map((mr) => (
              <div
                key={mr.id}
                onClick={() => setActiveTab('market')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 cursor-pointer transition-colors"
              >
                <div className="flex justify-between text-[11px] font-bold text-slate-800">
                  <span className="truncate max-w-[110px]">{mr.commodity.split(' ')[0]}</span>
                  <span className="text-emerald-700">₹{mr.modalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 mt-0.5">
                  <span className="truncate">{mr.mandi}</span>
                  <span className={mr.trend === 'up' ? 'text-emerald-600 font-semibold' : 'text-rose-500 font-semibold'}>
                    {mr.trend === 'up' ? '▲' : '▼'} {Math.abs(mr.changePercent)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Support & Reset Button */}
      <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
        <button
          onClick={() => setActiveTab('help')}
          className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-slate-600 hover:text-emerald-800 hover:bg-white rounded-xl border border-slate-200 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          Kisan Helpline 1800-233-800
        </button>

        <button
          onClick={resetAllDataToDemo}
          className="w-full flex items-center justify-center gap-1.5 text-[10px] text-slate-400 hover:text-slate-600 py-1 transition-colors"
          title="Reset local changes back to fresh AgroWorld dataset"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Demo State
        </button>
      </div>
    </aside>
  );
};
