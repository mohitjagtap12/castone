import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Briefcase,
  Eye,
  ShieldCheck,
  X,
  FileCheck,
  Info,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { CorporateContract } from '../../types';

export const FarmContractsView: React.FC = () => {
  const { currentUser, contracts, applyToContract, contractApplications } = useApp();

  const [activeTab, setActiveTab] = useState<'available' | 'my_applications'>('available');
  const [selectedContract, setSelectedContract] = useState<CorporateContract | null>(null);
  const [applyingContract, setApplyingContract] = useState<CorporateContract | null>(null);
  
  // Apply Form
  const [offeredAcres, setOfferedAcres] = useState(3);
  const [expectedQuintals, setExpectedQuintals] = useState(120);
  const [showApplySuccess, setShowApplySuccess] = useState(false);

  const myApplications = contractApplications.filter((a) => a.farmerId === currentUser.id);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyingContract) {
      applyToContract(applyingContract.id, Number(offeredAcres), Number(expectedQuintals));
      setShowApplySuccess(true);
      setTimeout(() => {
        setShowApplySuccess(false);
        setApplyingContract(null);
        setActiveTab('my_applications');
      }, 1200);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
      case 'approved':
        return 'bg-green-100 text-green-900 border-green-300';
      case 'under review':
      case 'pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'rejected':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-blue-100 text-blue-900 border-blue-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-green-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Building2 className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-950">Farm Contracts</h1>
              <p className="text-xs sm:text-sm text-green-800 font-medium">
                Find companies that want to buy your crop at guaranteed buyback prices.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'available'
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Available Contracts ({contracts.length})
          </button>
          <button
            onClick={() => setActiveTab('my_applications')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'my_applications'
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>My Applications</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-900 font-bold">
              {myApplications.length}
            </span>
          </button>
        </div>
      </div>

      {/* Available Contracts List */}
      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="bg-white rounded-3xl border border-green-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0 border border-purple-100">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{contract.companyName}</h3>
                      <span className="text-[11px] text-green-800 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                        Verified Corporate Buyer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contract Core Info */}
                <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <div className="p-3 bg-green-50/70 rounded-2xl border border-green-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-green-800 font-bold block uppercase">Crop Needed</span>
                      <strong className="text-base font-bold text-green-950">{contract.cropRequired}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-green-800 font-bold block uppercase">Buy Price</span>
                      <strong className="text-base font-bold text-green-700">
                        ₹{contract.assuredBuybackPricePerQuintal || contract.minimumGuaranteedPricePerQuintal || 2800} / Qtl
                      </strong>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Required Quantity:</span>
                      <strong className="text-slate-800">
                        {contract.targetVolumeQuintals || (contract.requiredQuantityMT ? contract.requiredQuantityMT * 10 : 1000)} Quintals
                      </strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Location:</span>
                      <strong className="text-slate-800 truncate max-w-[150px]">
                        {contract.deliveryLocation || contract.targetRegion || currentUser.location.district}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between text-amber-800">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Season:
                      </span>
                      <strong className="font-semibold">{contract.season || 'Kharif 2026'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedContract(contract)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Contract</span>
                </button>

                <button
                  onClick={() => setApplyingContract(contract)}
                  className="w-1/2 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs"
                >
                  <span>Apply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* My Applications Tab */}
      {activeTab === 'my_applications' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-green-950">My Contract Applications</h2>

          {myApplications.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-green-100 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-3">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No contract applications submitted yet</h3>
              <p className="text-xs text-slate-500 mt-1">
                Browse available contracts and apply to secure guaranteed harvest buyback.
              </p>
              <button
                onClick={() => setActiveTab('available')}
                className="mt-3 px-5 py-2.5 bg-[#2E7D32] text-white text-xs font-bold rounded-xl"
              >
                Browse Contracts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl border border-green-100 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-slate-500 font-medium">Company</span>
                        <h3 className="font-bold text-sm text-slate-900">{app.companyName}</h3>
                        <p className="text-xs font-semibold text-green-800 mt-0.5">{app.contractTitle}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(app.status)}`}>
                        {app.status === 'submitted' || app.status === 'under_review' ? 'Under Review' : app.status === 'approved' ? 'Accepted' : app.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block text-[10px]">Offered Farm Land</span>
                        <strong className="text-slate-800 font-bold">{app.offeredLandAreaAcres || 3} Acres</strong>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="text-slate-400 block text-[10px]">Expected Harvest</span>
                        <strong className="text-slate-800 font-bold">{app.expectedProductionQuintals || 120} Quintals</strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                    <span>Applied on: {app.appliedAt || '2026-09-01'}</span>
                    <span className="font-semibold text-green-700">AgroWorld Buyback Guarantee</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Contract Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-100 relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedContract.companyName}</h3>
                  <p className="text-xs text-green-800 font-medium">Contract Farming Agreement</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContract(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block">Required Crop:</span>
                    <strong className="text-base font-bold text-green-950">{selectedContract.cropRequired}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block">Guaranteed Price:</span>
                    <strong className="text-base font-bold text-green-700">
                      ₹{selectedContract.assuredBuybackPricePerQuintal || selectedContract.minimumGuaranteedPricePerQuintal || 2800} / Qtl
                    </strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Total Demand</span>
                  <strong className="text-slate-800">
                    {selectedContract.targetVolumeQuintals || (selectedContract.requiredQuantityMT ? selectedContract.requiredQuantityMT * 10 : 1000)} Quintals
                  </strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block text-[10px]">Procurement Hub</span>
                  <strong className="text-slate-800 truncate block">
                    {selectedContract.deliveryLocation || selectedContract.targetRegion || currentUser.location.district}
                  </strong>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <strong className="text-slate-800 block">Quality Specifications:</strong>
                <p className="text-slate-600 leading-relaxed">
                  {selectedContract.qualitySpecification || (selectedContract.qualitySpecs ? selectedContract.qualitySpecs.join(', ') : 'Moisture below 12%, free from mold, uniform size grading.')}
                </p>
              </div>

              <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 space-y-1">
                <strong className="text-purple-950 block">Input Support Provided by Company:</strong>
                <p className="text-purple-900 leading-relaxed">
                  {selectedContract.inputSupport || (selectedContract.inputsProvided ? 'Certified hybrid seeds, agronomist field visits, and free soil test kit.' : 'Standard technical advisory and harvest pickup.')}
                </p>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedContract(null)}
                  className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setApplyingContract(selectedContract);
                    setSelectedContract(null);
                  }}
                  className="w-2/3 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold shadow-md shadow-green-700/20"
                >
                  Apply for this Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apply Form Modal */}
      {applyingContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-200 relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-green-100">
              <div>
                <h3 className="text-lg font-bold text-green-950">Apply for Contract</h3>
                <p className="text-xs text-green-800">{applyingContract.companyName} - {applyingContract.cropRequired}</p>
              </div>
              <button
                onClick={() => setApplyingContract(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showApplySuccess && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-2xl flex items-center gap-2 text-green-900 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
                <span>Application submitted successfully!</span>
              </div>
            )}

            <form onSubmit={handleApplySubmit} className="mt-4 space-y-4">
              <div className="p-3.5 bg-green-50 rounded-2xl border border-green-200 text-xs">
                <span className="text-slate-500">Guaranteed Buyback Price:</span>
                <strong className="text-green-950 block text-sm font-bold">
                  ₹{applyingContract.assuredBuybackPricePerQuintal || applyingContract.minimumGuaranteedPricePerQuintal || 2800} / Quintal
                </strong>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farm Area You Want to Cultivate (in Acres)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  required
                  value={offeredAcres}
                  onChange={(e) => setOfferedAcres(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected Harvest (in Quintals)
                </label>
                <input
                  type="number"
                  min="10"
                  required
                  value={expectedQuintals}
                  onChange={(e) => setExpectedQuintals(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setApplyingContract(null)}
                  className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-sm shadow-md shadow-green-700/20"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
