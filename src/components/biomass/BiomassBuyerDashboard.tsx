import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Plus,
  Sprout,
  MapPin,
  CheckCircle2,
  Calendar,
  Building2,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const BiomassBuyerDashboard: React.FC = () => {
  const {
    currentUser,
    biomassDemands,
    createBiomassDemand,
    agriWasteListings,
    addToCart,
    sendChatMessage,
  } = useApp();

  const [showDemandModal, setShowDemandModal] = useState(false);
  const [demandForm, setDemandForm] = useState({
    wasteTypeRequired: 'Wheat Straw & Paddy Parali (Baled)',
    requiredQuantityTonnes: 120,
    offeredPricePerTonne: 2500,
    plantLocation: 'Bio-Power Pellet Manufacturing Hub, Sanand GIDC',
    deliveryTimeline: '2026-09-25',
    moistureToleranceMax: 14,
    description: 'Looking for square or round machine baled straw with moisture <= 14%. Direct weighbridge receipt & immediate payment.',
  });

  const myDemands = biomassDemands.filter((d) => d.buyerId === currentUser.id);

  const handleDemandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBiomassDemand(demandForm);
    setShowDemandModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-800 via-orange-700 to-amber-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-900/60 text-orange-200 text-xs font-bold border border-orange-500/30">
                Bio-Energy & Green Fuel Enterprise
              </span>
              <span className="text-xs text-orange-100">{currentUser.biomassBuyerDetails?.gstNumber || 'GST: 24AAACR8821K1Z2'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              {currentUser.biomassBuyerDetails?.plantName || currentUser.name} 🔥
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-xl">
              Procure baled parali, straw, and husk in bulk. Eliminate stubble burning while securing clean agricultural biomass for your boilers and briquette plants.
            </p>
          </div>

          <button
            onClick={() => setShowDemandModal(true)}
            className="px-4 py-2.5 bg-white text-orange-900 font-bold text-xs rounded-xl shadow-md hover:bg-orange-50 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-orange-700" />
            <span>Post Biomass Demand</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Plant Demands</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{myDemands.length} Broadcasted</p>
          <p className="text-[10px] text-orange-600 font-semibold mt-0.5">Parali, Straw, Bagasse</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Farmer Residue Lots</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{agriWasteListings.length} Available</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Ready for factory pickup</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Carbon Offset Metric</span>
          <p className="text-xl font-extrabold text-emerald-700 mt-1">140 MT CO2e</p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Stubble burning prevented</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Plant Processing Capacity</span>
          <p className="text-xl font-extrabold text-orange-700 mt-1">50 MT / Day</p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Briquettes & Pellets</p>
        </div>
      </div>

      {/* Available Farmer Waste Lots to Procure */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Farmer Agri-Waste & Straw Lots Available</h3>
          </div>
          <span className="text-xs text-slate-500">{agriWasteListings.length} Lots listed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agriWasteListings.map((waste) => (
            <div
              key={waste.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-orange-300 transition-all space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-sm">
                    {waste.isBaled ? 'Machine Baled' : 'Loose Residue'}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{waste.wasteType}</h4>
                  <p className="text-xs text-slate-600">Farmer: <strong>{waste.farmerName}</strong></p>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-orange-800 block">
                    ₹{waste.pricePerTonne}/Tonne
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Ex-Farm Gate</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl space-y-1 text-xs text-slate-700 border border-slate-200">
                <div className="flex justify-between">
                  <span>Available Volume:</span>
                  <strong>{waste.quantityTonnes} Tonnes</strong>
                </div>
                <div className="flex justify-between">
                  <span>Moisture Content:</span>
                  <span>{waste.moisturePercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Farm Location:</span>
                  <span>{waste.locationVillage}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600">{waste.description}</p>

              <button
                onClick={() =>
                  addToCart({
                    id: waste.id,
                    name: `${waste.wasteType} (${waste.quantityTonnes}T)`,
                    price: waste.pricePerTonne * waste.quantityTonnes,
                    quantity: 1,
                    unit: 'Lot',
                    sellerId: waste.farmerId,
                    sellerName: waste.farmerName,
                    sellerType: 'waste_seller',
                  })
                }
                className="w-full py-2.5 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Flame className="w-4 h-4" />
                <span>Procure Biomass Lot</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Broadcasted Biomass Demands */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-600" />
            <h3 className="text-base font-bold text-slate-900">Broadcasted Plant Demands</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myDemands.map((dem) => (
            <div key={dem.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-sm">
                    {dem.plantLocation}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{dem.wasteTypeRequired}</h4>
                </div>
                <span className="text-xs font-extrabold text-orange-800">
                  ₹{dem.offeredPricePerTonne}/Tonne
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Target Volume:</span>
                  <strong>{dem.requiredQuantityTonnes} Tonnes</strong>
                </div>
                <div className="flex justify-between">
                  <span>Max Moisture Allowed:</span>
                  <span>{dem.moistureToleranceMax}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Timeline:</span>
                  <span>{dem.deliveryTimeline}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">{dem.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Post Demand Modal */}
      {showDemandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Broadcast Biomass Procurement Demand</h3>
              <button onClick={() => setShowDemandModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleDemandSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Residue Type Required</label>
                <input
                  type="text"
                  required
                  value={demandForm.wasteTypeRequired}
                  onChange={(e) => setDemandForm({ ...demandForm, wasteTypeRequired: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Quantity (Tonnes)</label>
                  <input
                    type="number"
                    required
                    value={demandForm.requiredQuantityTonnes}
                    onChange={(e) => setDemandForm({ ...demandForm, requiredQuantityTonnes: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Offered Price / Tonne (₹)</label>
                  <input
                    type="number"
                    required
                    value={demandForm.offeredPricePerTonne}
                    onChange={(e) => setDemandForm({ ...demandForm, offeredPricePerTonne: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Max Moisture (%)</label>
                  <input
                    type="number"
                    value={demandForm.moistureToleranceMax}
                    onChange={(e) => setDemandForm({ ...demandForm, moistureToleranceMax: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Timeline</label>
                  <input
                    type="date"
                    value={demandForm.deliveryTimeline}
                    onChange={(e) => setDemandForm({ ...demandForm, deliveryTimeline: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Plant / Storage Delivery Yard</label>
                <input
                  type="text"
                  required
                  value={demandForm.plantLocation}
                  onChange={(e) => setDemandForm({ ...demandForm, plantLocation: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Broadcast Demand to Farmers
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
