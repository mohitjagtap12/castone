import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  MapPin,
  CheckCircle2,
  Navigation,
  Phone,
  Clock,
  ShieldCheck,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

export const DeliveryDashboard: React.FC = () => {
  const {
    currentUser,
    deliveryJobs,
    acceptDeliveryJob,
    updateDeliveryStatus,
  } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'available' | 'active' | 'history'>('available');

  const availableDeliveries = deliveryJobs.filter((d) => d.status === 'available');
  const myActiveDeliveries = deliveryJobs.filter(
    (d) => (d.deliveryPartnerId === currentUser.id || d.status === 'accepted' || d.status === 'in_transit') && d.status !== 'delivered'
  );
  const deliveredTrips = deliveryJobs.filter((d) => d.status === 'delivered');

  const totalEarnings = deliveredTrips.reduce((sum, d) => sum + d.payoutAmount, 0);

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-700 to-blue-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-200 text-xs font-bold border border-indigo-500/30">
                Agro Logistics Partner
              </span>
              <span className="text-xs text-indigo-100">{currentUser.deliveryPartnerDetails?.vehicleType || 'Mini Truck'} ({currentUser.deliveryPartnerDetails?.vehicleNumber || 'GJ-02-AT-8812'})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              {currentUser.name} 🚛
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl">
              Accept rural farm-to-mandi, agri-store delivery, and customer grocery deliveries with guaranteed per-trip payouts.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl text-xs border border-white/20">
            <span className="text-indigo-200 block text-[11px]">Today Earnings</span>
            <span className="text-lg font-extrabold">₹{totalEarnings || 650}</span>
            <span className="text-[10px] text-indigo-100 block mt-0.5">3 Completed trips</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Available Trips</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{availableDeliveries.length} Nearby</p>
          <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">Within 20km radius</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Active In-Transit</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{myActiveDeliveries.length} Trips</p>
          <p className="text-[10px] text-amber-600 font-semibold mt-0.5">Navigation live</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Trips Completed</span>
          <p className="text-xl font-extrabold text-emerald-700 mt-1">{deliveredTrips.length + 8}</p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">100% on-time rating</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Driving License</span>
          <p className="text-xl font-extrabold text-indigo-700 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Commercial
          </p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Verified & Insured vehicle</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTabFilter('available')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTabFilter === 'available'
              ? 'bg-indigo-700 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Available Cargo Trips ({availableDeliveries.length})
        </button>
        <button
          onClick={() => setActiveTabFilter('active')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTabFilter === 'active'
              ? 'bg-indigo-700 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Active Trips ({myActiveDeliveries.length})
        </button>
      </div>

      {/* Trips List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(activeTabFilter === 'available' ? availableDeliveries : myActiveDeliveries).map((trip) => (
          <div
            key={trip.id}
            className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    trip.status === 'in_transit'
                      ? 'bg-amber-100 text-amber-800'
                      : trip.status === 'accepted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}
                >
                  {trip.status.replace('_', ' ').toUpperCase()}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{trip.cargoDetails.description}</h3>
                <p className="text-xs text-slate-500">Weight: {trip.cargoDetails.weightKg} kg • {trip.cargoDetails.itemType}</p>
              </div>

              <div className="text-right">
                <span className="text-base font-extrabold text-emerald-700 block">
                  ₹{trip.payoutAmount}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">{trip.distanceKm} km trip</span>
              </div>
            </div>

            {/* Route Box */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs border border-slate-200">
              <div className="flex items-start gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Pickup Location</span>
                  <p className="text-slate-800 font-medium">{trip.pickupLocation.address}</p>
                  <p className="text-[11px] text-slate-500">
                    Contact: {trip.pickupLocation.contactName} ({trip.pickupLocation.contactPhone})
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-slate-200">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-600 mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Drop Destination</span>
                  <p className="text-slate-800 font-medium">{trip.dropLocation.address}</p>
                  <p className="text-[11px] text-slate-500">
                    Contact: {trip.dropLocation.contactName} ({trip.dropLocation.contactPhone})
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              {trip.status === 'available' ? (
                <button
                  onClick={() => acceptDeliveryJob(trip.id)}
                  className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Accept Cargo Trip (Earn ₹{trip.payoutAmount})</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  {trip.status === 'accepted' && (
                    <button
                      onClick={() => updateDeliveryStatus(trip.id, 'in_transit')}
                      className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Start Navigation / Picked Up</span>
                    </button>
                  )}
                  {trip.status === 'in_transit' && (
                    <button
                      onClick={() => updateDeliveryStatus(trip.id, 'delivered')}
                      className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Delivered & Collect Payout</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
