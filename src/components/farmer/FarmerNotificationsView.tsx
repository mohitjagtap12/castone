import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  TrendingUp,
  Users,
  Building2,
  CloudRain,
  Sparkles,
  Clock,
  Trash2,
} from 'lucide-react';

export const FarmerNotificationsView: React.FC = () => {
  const { notifications, markNotificationRead } = useApp();

  const handleMarkAllRead = () => {
    notifications.forEach((n) => {
      if (!n.read) markNotificationRead(n.id);
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'crop_health':
      case 'alert':
        return <Sparkles className="w-5 h-5 text-green-700" />;
      case 'market':
      case 'price':
        return <TrendingUp className="w-5 h-5 text-blue-700" />;
      case 'labour':
        return <Users className="w-5 h-5 text-amber-700" />;
      case 'contract':
        return <Building2 className="w-5 h-5 text-purple-700" />;
      case 'weather':
        return <CloudRain className="w-5 h-5 text-sky-700" />;
      default:
        return <Bell className="w-5 h-5 text-green-700" />;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-green-100 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
            <Bell className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-green-950">Notifications</h1>
            <p className="text-xs sm:text-sm text-green-800 font-medium">
              Important alerts about your crops, market rates, orders, and contracts
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-green-100 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-green-50 text-green-700 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">You're all caught up!</h3>
            <p className="text-xs text-slate-500 mt-1">
              No new alerts or updates right now. Check back later.
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 rounded-3xl border transition-all flex items-start gap-4 cursor-pointer ${
                n.read
                  ? 'bg-white border-green-100 opacity-80'
                  : 'bg-green-50/70 border-green-200 shadow-xs'
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-xs border border-green-100">
                {getNotificationIcon(n.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-sm ${n.read ? 'font-semibold text-slate-800' : 'font-bold text-green-950'}`}>
                    {n.title}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {n.timestamp || 'Recent'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {n.message}
                </p>

                {!n.read && (
                  <span className="inline-block mt-2 text-[10px] font-bold text-green-700">
                    • Tap to mark read
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
