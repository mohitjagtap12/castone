import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Trash2,
  TrendingUp,
  FileCode,
  Users,
  Building2,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    cropListings,
    agriWasteListings,
    storeProducts,
    contracts,
    traderDemands,
    deleteListingAdmin,
    verifyUserAccount,
    mandiRates,
    resetAllDataToDemo,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'verifications' | 'moderation' | 'mandi' | 'security'>('verifications');

  // Pending user accounts for verification
  const pendingUsers = [
    { id: 'usr_store_99', name: 'Kalyan Agri Biotech Inputs', role: 'store', location: 'Ahmedabad GIDC', license: 'GJ-SEED-99120', docs: 'GST + Seed Dealer License' },
    { id: 'usr_trader_44', name: 'Shree Ram APMC Brokerage', role: 'trader', location: 'Unjha Mandi', license: 'APMC-UNJ-C441', docs: 'Mandi Commission License' },
    { id: 'usr_bio_33', name: 'Suryam Clean Bio-Energy Ltd', role: 'biomass_buyer', location: 'Mehsana Industrial Area', license: 'GST-24AAACS9981K', docs: 'Pollution Board Clearance' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-bold border border-emerald-500/30">
                Super Admin Access
              </span>
              <span className="text-xs text-slate-300">Govt Agri Portal Linked</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              AgroWorld Command Center 🛡️
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Verify agricultural licenses, moderate multi-role marketplace listings, manage APMC live rates, and enforce Firebase security rules.
            </p>
          </div>

          <button
            onClick={resetAllDataToDemo}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-emerald-400" />
            <span>Reset Demo DB</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors shrink-0 ${
            activeTab === 'verifications'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          KYC & License Verification ({pendingUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors shrink-0 ${
            activeTab === 'moderation'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Marketplace Moderation
        </button>
        <button
          onClick={() => setActiveTab('mandi')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors shrink-0 ${
            activeTab === 'mandi'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          APMC Mandi Rates Admin
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors shrink-0 ${
            activeTab === 'security'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Firebase Security & Rules
        </button>
      </div>

      {/* Tab: Verifications */}
      {activeTab === 'verifications' && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Pending Business & Trader Approvals
            </h3>
          </div>

          <div className="space-y-3">
            {pendingUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{user.name}</span>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded-sm capitalize">
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Location: {user.location} • License: <strong>{user.license}</strong>
                  </p>
                  <p className="text-[11px] text-slate-500">Submitted Documents: {user.docs}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      verifyUserAccount(user.id, 'verified');
                      alert(`Verified ${user.name} successfully.`);
                    }}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Verify</span>
                  </button>
                  <button
                    onClick={() => {
                      verifyUserAccount(user.id, 'rejected');
                      alert(`Rejected ${user.name}.`);
                    }}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab: Moderation */}
      {activeTab === 'moderation' && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            Live Marketplace Listings Moderation
          </h3>

          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Farmer Produce Listings</div>
            {cropListings.map((c) => (
              <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <strong>{c.cropName}</strong> by {c.farmerName} ({c.farmerLocation}) — ₹{c.pricePerQuintal}/Qtl
                </div>
                <button
                  onClick={() => deleteListingAdmin('crop', c.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="Remove from public feed"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider pt-2">Agri-Store Products</div>
            {storeProducts.map((p) => (
              <div key={p.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <strong>{p.name}</strong> by {p.storeName} — ₹{p.price}/{p.unit}
                </div>
                <button
                  onClick={() => deleteListingAdmin('product', p.id)}
                  className="p-1 text-slate-400 hover:text-rose-600"
                  title="Remove product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab: Mandi Admin */}
      {activeTab === 'mandi' && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            e-NAM & State APMC Mandi Rate Sync
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Commodity</th>
                  <th className="p-3">Mandi Yard</th>
                  <th className="p-3">Modal Rate (₹)</th>
                  <th className="p-3">Arrivals</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {mandiRates.map((mr) => (
                  <tr key={mr.id}>
                    <td className="p-3 font-bold text-slate-900">{mr.commodity}</td>
                    <td className="p-3">{mr.mandi}</td>
                    <td className="p-3 font-extrabold text-emerald-700">₹{mr.modalPrice}/{mr.unit}</td>
                    <td className="p-3">{mr.arrivalTons} Tons</td>
                    <td className="p-3">
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm font-bold text-[10px]">
                        Live Sync OK
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Tab: Security & Rules */}
      {activeTab === 'security' && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-600" />
            Firestore Role-Based Security Rules
          </h3>

          <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Authenticated helper
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Role-based profiles
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
    }

    // Crop Fields & Diagnoses
    match /crops/{cropId} {
      allow read, write: if isAuthenticated();
    }

    // Public Produce & Agri-Waste Market
    match /listings/{listingId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isAuthenticated();
    }

    // Corporate Buyback Contracts
    match /contracts/{contractId} {
      allow read: if true;
      allow write: if isAuthenticated();
    }
  }
}`}
          </pre>
        </section>
      )}

    </div>
  );
};
