import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Plus,
  CheckCircle2,
  XCircle,
  Users,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

export const ContractCompanyDashboard: React.FC = () => {
  const {
    currentUser,
    contracts,
    createContract,
    contractApplications,
    updateContractApplicationStatus,
  } = useApp();

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [contractForm, setContractForm] = useState({
    cropRequired: 'Processing Quality Potatoes',
    variety: 'Kufri Chipsona-1 / LR',
    season: 'Rabi 2026-27',
    minimumGuaranteedPricePerQuintal: 1650,
    targetVolumeQuintals: 3000,
    qualitySpecification: 'Dry matter > 21%, reducing sugars < 0.1%, size 45mm-75mm without hollow heart',
    inputSupport: 'Certified mini-tuber seed supply + Agronomist field visit schedule provided at 30% subsidized credit',
    deliveryLocation: 'ITC Cold Storage & Processing Plant, Mehsana-Palanpur Highway',
    paymentTerms: '100% RTGS settlement within 48 hours of mandi weighbridge gate-in inspection',
  });

  const myContracts = contracts.filter((c) => c.companyId === currentUser.id);
  const myApplications = contractApplications.filter((a) =>
    myContracts.some((c) => c.id === a.contractId)
  );

  const totalProcurementTarget = myContracts.reduce((sum, c) => sum + c.targetVolumeQuintals, 0);
  const totalFarmersJoined = myContracts.reduce((sum, c) => sum + c.applicationsCount, 0);

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createContract(contractForm);
    setShowPublishModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-900/60 text-purple-200 text-xs font-bold border border-purple-500/30">
                Corporate Contract Farming
              </span>
              <span className="text-xs text-purple-100">{currentUser.companyDetails?.registrationNumber || 'CIN: U01111GJ2020PTC114980'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              {currentUser.companyDetails?.companyName || currentUser.name} 🏢
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-xl">
              Publish assured buyback agreements, supply certified hybrid inputs, and manage procurement contracts directly with verified farmers.
            </p>
          </div>

          <button
            onClick={() => setShowPublishModal(true)}
            className="px-4 py-2.5 bg-white text-purple-900 font-bold text-xs rounded-xl shadow-md hover:bg-purple-50 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-purple-700" />
            <span>Publish Buyback Agreement</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Schemes</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{myContracts.length} Published</p>
          <p className="text-[10px] text-purple-600 font-semibold mt-0.5">Assured minimum price</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Target Volume</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{totalProcurementTarget.toLocaleString('en-IN')} Qtl</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Procurement quota</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Farmer Applications</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{myApplications.length} Received</p>
          <p className="text-[10px] text-blue-600 font-semibold mt-0.5">KYC & farm verified</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Contract Compliance</span>
          <p className="text-xl font-extrabold text-purple-700 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            100% Escrow
          </p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Bank guarantee backed</p>
        </div>
      </div>

      {/* Published Contracts */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">Active Buyback Contracts</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myContracts.map((contract) => (
            <div key={contract.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm">
                    {contract.season}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">
                    {contract.cropRequired} ({contract.variety})
                  </h4>
                </div>
                <span className="text-base font-extrabold text-purple-800">
                  ₹{contract.minimumGuaranteedPricePerQuintal}/Qtl
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl space-y-1.5 text-xs text-slate-700 border border-slate-200">
                <p><strong>Quality Standard:</strong> {contract.qualitySpecification}</p>
                <p><strong>Input & Credit Support:</strong> {contract.inputSupport}</p>
                <p><strong>Factory / Mandi Hub:</strong> {contract.deliveryLocation}</p>
                <p><strong>Payment Terms:</strong> {contract.paymentTerms}</p>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600 pt-1">
                <span>Quota: <strong>{contract.targetVolumeQuintals} Quintals</strong></span>
                <span className="font-bold text-purple-700">{contract.applicationsCount} Farmers Registered</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Farmer Applications Review Table */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Farmer Buyback Applications</h3>
          </div>
        </div>

        <div className="space-y-3">
          {myApplications.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{app.farmerName}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      app.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'rejected'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Applied for: <strong>{app.contractTitle}</strong>
                </p>
                <p className="text-[11px] text-slate-500">
                  Land: <strong>{app.offeredLandAreaAcres} Acres</strong> • Expected: <strong>{app.expectedProductionQuintals} Quintals</strong> • Location: {app.farmLocation}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {app.status === 'submitted' && (
                  <>
                    <button
                      onClick={() => updateContractApplicationStatus(app.id, 'approved')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => updateContractApplicationStatus(app.id, 'rejected')}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </>
                )}
                {app.status === 'approved' && (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Agreement Executed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Publish Buyback Agreement</h3>
              <button onClick={() => setShowPublishModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handlePublishSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Crop Required</label>
                  <input
                    type="text"
                    required
                    value={contractForm.cropRequired}
                    onChange={(e) => setContractForm({ ...contractForm, cropRequired: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Variety / Specification</label>
                  <input
                    type="text"
                    required
                    value={contractForm.variety}
                    onChange={(e) => setContractForm({ ...contractForm, variety: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Guaranteed Buyback Price (₹/Qtl)</label>
                  <input
                    type="number"
                    required
                    value={contractForm.minimumGuaranteedPricePerQuintal}
                    onChange={(e) => setContractForm({ ...contractForm, minimumGuaranteedPricePerQuintal: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Volume (Quintals)</label>
                  <input
                    type="number"
                    required
                    value={contractForm.targetVolumeQuintals}
                    onChange={(e) => setContractForm({ ...contractForm, targetVolumeQuintals: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quality Specifications</label>
                <textarea
                  rows={2}
                  value={contractForm.qualitySpecification}
                  onChange={(e) => setContractForm({ ...contractForm, qualitySpecification: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Input & Agronomy Support</label>
                <input
                  type="text"
                  value={contractForm.inputSupport}
                  onChange={(e) => setContractForm({ ...contractForm, inputSupport: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Destination / Factory</label>
                <input
                  type="text"
                  value={contractForm.deliveryLocation}
                  onChange={(e) => setContractForm({ ...contractForm, deliveryLocation: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Publish Contract Scheme to Farmers
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
