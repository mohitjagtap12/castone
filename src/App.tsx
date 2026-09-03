import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header, ROLE_CONFIGS } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { RoleSelectionScreen } from './components/role-selection/RoleSelectionScreen';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { MyCropsView } from './components/farmer/MyCropsView';
import { CheckCropHealthView } from './components/farmer/CheckCropHealthView';
import { SellCropView } from './components/farmer/SellCropView';
import { SellFarmWasteView } from './components/farmer/SellFarmWasteView';
import { FindLabourView } from './components/farmer/FindLabourView';
import { BuyFarmProductsView } from './components/farmer/BuyFarmProductsView';
import { FarmContractsView } from './components/farmer/FarmContractsView';
import { MyOrdersView } from './components/farmer/MyOrdersView';
import { FarmerNotificationsView } from './components/farmer/FarmerNotificationsView';
import { FarmerProfileView } from './components/farmer/FarmerProfileView';
import { FarmerHelpView } from './components/farmer/FarmerHelpView';
import { AICropDoctor } from './components/farmer/AICropDoctor';
import { StoreDashboard } from './components/store/StoreDashboard';
import { LabourDashboard } from './components/labour/LabourDashboard';
import { ContractCompanyDashboard } from './components/contract/ContractCompanyDashboard';
import { TraderDashboard } from './components/trader/TraderDashboard';
import { CustomerDashboard } from './components/customer/CustomerDashboard';
import { BiomassBuyerDashboard } from './components/biomass/BiomassBuyerDashboard';
import { DeliveryDashboard } from './components/delivery/DeliveryDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MarketplaceView } from './components/market/MarketplaceView';
import { ChatView } from './components/chat/ChatView';
import { HelpCenter } from './components/help/HelpCenter';
import { UserProfileView } from './components/profile/UserProfileView';
import { X, Sprout, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { UserRole } from './types';

export const AppContent: React.FC = () => {
  const { isLoggedIn, currentRole, activeTab, setActiveTab, switchRole, logout } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // If user is logged out or wants to choose portal, show role selection screen
  if (!isLoggedIn) {
    return <RoleSelectionScreen />;
  }

  // Render role-appropriate dashboard or global view
  const renderMainContent = () => {
    // Farmer-specific module routing with simple English UX
    if (currentRole === 'farmer') {
      if (activeTab === 'farmer_crops' || activeTab === 'my_crops') return <MyCropsView />;
      if (activeTab === 'ai_doctor' || activeTab === 'farmer_disease' || activeTab === 'crop_health') return <CheckCropHealthView />;
      if (activeTab === 'farmer_sell' || activeTab === 'sell_crop') return <SellCropView />;
      if (activeTab === 'farmer_waste' || activeTab === 'sell_waste') return <SellFarmWasteView />;
      if (activeTab === 'farmer_labour' || activeTab === 'find_labour') return <FindLabourView />;
      if (activeTab === 'farmer_supplies' || activeTab === 'buy_products') return <BuyFarmProductsView />;
      if (activeTab === 'farmer_contracts' || activeTab === 'contracts') return <FarmContractsView />;
      if (activeTab === 'farmer_orders' || activeTab === 'my_orders') return <MyOrdersView />;
      if (activeTab === 'notifications' || activeTab === 'farmer_notifications') return <FarmerNotificationsView />;
      if (activeTab === 'profile') return <FarmerProfileView />;
      if (activeTab === 'help') return <FarmerHelpView />;
      if (activeTab === 'market') return <MarketplaceView />;
      if (activeTab === 'chat') return <ChatView />;
      return <FarmerDashboard />;
    }

    // Global shared tabs for other roles
    if (activeTab === 'market') return <MarketplaceView />;
    if (activeTab === 'ai_doctor') return <AICropDoctor />;
    if (activeTab === 'chat') return <ChatView />;
    if (activeTab === 'help') return <HelpCenter />;
    if (activeTab === 'profile') return <UserProfileView />;

    // Role-specific routing for non-farmer roles
    switch (currentRole as string) {
      case 'store':
        return <StoreDashboard />;
      case 'labour':
        return <LabourDashboard />;
      case 'contract_company':
        return <ContractCompanyDashboard />;
      case 'trader':
        return <TraderDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      case 'biomass_buyer':
        return <BiomassBuyerDashboard />;
      case 'delivery':
        return <DeliveryDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <FarmerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FCF9] text-[#1B5E20] flex flex-col font-sans">
      
      {/* Top Navigation Header */}
      <Header />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar Rail */}
        <Sidebar currentRoleView={currentRole} />

        {/* Dynamic Center Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 overflow-y-auto max-w-full">
          {renderMainContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav onOpenDrawer={() => setMobileDrawerOpen(true)} />

      {/* Mobile Services & Switcher Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-80 bg-white p-5 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-slate-900">AgroWorld Services</span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Role Switcher in Mobile Drawer */}
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Active Role
                </p>
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {(Object.keys(ROLE_CONFIGS) as UserRole[]).map((rKey) => {
                    const rConf = ROLE_CONFIGS[rKey];
                    const RIcon = rConf.icon;
                    const isCurrent = currentRole === rKey;
                    return (
                      <button
                        key={rKey}
                        onClick={() => {
                          switchRole(rKey);
                          setMobileDrawerOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left text-xs transition-colors ${
                          isCurrent
                            ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <RIcon className={`w-4 h-4 ${rConf.color}`} />
                        <span className="truncate flex-1">{rConf.name}</span>
                        {isCurrent && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="pt-2 border-t border-slate-100 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setActiveTab('market');
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Agro Market
                </button>
                <button
                  onClick={() => {
                    setActiveTab('ai_doctor');
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  AI Crop Doctor
                </button>
                <button
                  onClick={() => {
                    setActiveTab('help');
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Kisan Help & FAQs
                </button>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setMobileDrawerOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  My Profile & KYC
                </button>
              </div>
            </div>

            {/* Logout button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  logout();
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold rounded-xl transition-colors"
              >
                Log Out / Switch Role
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
