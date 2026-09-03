import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Bell,
  User,
  Sparkles,
  MessageSquare,
  Menu,
} from 'lucide-react';

interface MobileNavProps {
  onOpenDrawer: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenDrawer }) => {
  const { activeTab, setActiveTab, currentRole, notifications } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const farmerNavButtons = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'market', label: 'Market', icon: ShoppingBag },
    { id: 'farmer_orders', label: 'Orders', icon: Package },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount > 0 ? unreadCount : undefined },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const defaultNavButtons = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'market', label: 'Market', icon: ShoppingBag },
    { id: 'ai_doctor', label: 'AI Doctor', icon: Sparkles, highlight: true },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
  ];

  const navButtons = currentRole === 'farmer' ? farmerNavButtons : defaultNavButtons;

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-slate-200 z-40 lg:hidden px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {navButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = activeTab === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveTab(btn.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-green-800 font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg relative ${isActive ? 'bg-green-100' : ''}`}>
                <Icon className="w-5 h-5" />
                {btn.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {btn.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5">{btn.label}</span>
            </button>
          );
        })}

        {currentRole !== 'farmer' && (
          <button
            onClick={onOpenDrawer}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-900 font-medium"
          >
            <div className="p-1">
              <Menu className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">Services</span>
          </button>
        )}
      </div>
    </nav>
  );
};

