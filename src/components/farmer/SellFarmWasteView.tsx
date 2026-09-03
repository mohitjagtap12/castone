import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Plus,
  Eye,
  Trash2,
  MapPin,
  CheckCircle2,
  X,
  Sparkles,
  Info,
  DollarSign,
} from 'lucide-react';
import { AgriWasteListing } from '../../types';

const WASTE_TYPES = [
  'Wheat Straw',
  'Rice Straw',
  'Sugarcane Waste',
  'Maize Stalks',
  'Cotton Stalks',
  'Coconut Shells',
  'Other Farm Waste',
];

const WASTE_USES = [
  {
    title: 'Animal Feed',
    desc: 'Wheat & maize straw used as nutritious cattle fodder.',
    icon: '🐄',
    color: 'bg-amber-50 border-amber-200 text-amber-900',
  },
  {
    title: 'Compost & Manure',
    desc: 'Decomposed crop residue enriches soil organic carbon.',
    icon: '🌱',
    color: 'bg-green-50 border-green-200 text-green-900',
  },
  {
    title: 'Biogas Power',
    desc: 'Supplied to CBG (Compressed Bio-Gas) plants for clean fuel.',
    icon: '⚡',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
  },
  {
    title: 'Biofuel & Pellets',
    desc: 'Pressed into biomass briquettes for industrial boilers.',
    icon: '🔥',
    color: 'bg-orange-50 border-orange-200 text-orange-900',
  },
  {
    title: 'Field Mulching',
    desc: 'Protects soil moisture and reduces weed growth.',
    icon: '🌾',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  },
];

export const SellFarmWasteView: React.FC = () => {
  const { currentUser, agriWasteListings, addAgriWasteListing } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<AgriWasteListing | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form states
  const [wasteType, setWasteType] = useState('Wheat Straw');
  const [quantityTonnes, setQuantityTonnes] = useState(10);
  const [pricePerTonne, setPricePerTonne] = useState(2200);
  const [locationVillage, setLocationVillage] = useState(
    currentUser.location.village ? `${currentUser.location.village}, ${currentUser.location.district}` : 'Anandpur, Mehsana'
  );
  const [isBaled, setIsBaled] = useState(true);
  const [description, setDescription] = useState('Dry machine-baled straw ready for pickup by truck/trolley.');

  const myListings = agriWasteListings.filter((w) => w.farmerId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAgriWasteListing({
      wasteType,
      quantityTonnes: Number(quantityTonnes),
      pricePerTonne: Number(pricePerTonne),
      moisturePercent: 12,
      locationVillage,
      isBaled,
      description,
    });
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setShowAddModal(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-green-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <Flame className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-950">Sell Farm Waste</h1>
              <p className="text-xs sm:text-sm text-green-800 font-medium">
                Sell waste from your farm and earn extra money.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white text-sm font-bold shadow-md shadow-green-700/20 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>+ Add Farm Waste for Sale</span>
        </button>
      </div>

      {/* "Where it can be used" Section */}
      <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-green-700" />
          <h2 className="text-base font-bold text-green-950">Where it can be used</h2>
        </div>
        <p className="text-xs text-green-800">
          Buyers purchase farm waste, parali, and stalks for these productive industries:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {WASTE_USES.map((use) => (
            <div
              key={use.title}
              className={`p-3.5 rounded-2xl border ${use.color} flex flex-col justify-between`}
            >
              <div>
                <span className="text-2xl block mb-1">{use.icon}</span>
                <h4 className="font-bold text-xs">{use.title}</h4>
                <p className="text-[10px] mt-1 opacity-80 leading-snug">{use.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Farm Waste Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-green-950">My Farm Waste Listings</h2>
          <span className="text-xs font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full">
            {myListings.length} Active Listings
          </span>
        </div>

        {myListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-green-100 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No farm waste listed yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Turn your crop residue, straw, or sugarcane tops into cash. Click "+ Add Farm Waste for Sale".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-green-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold bg-orange-100 text-orange-800 rounded-full">
                        {item.isBaled ? 'Machine Baled' : 'Loose Biomass'}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1.5">{item.wasteType}</h3>
                    </div>
                    <span className="text-sm font-bold text-green-700">
                      ₹{item.pricePerTonne} / Tonne
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Available Quantity:</span>
                      <strong className="text-slate-800 font-bold">{item.quantityTonnes} Tonnes</strong>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0" />
                      <span className="truncate">{item.locationVillage}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-xl">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedListing(item)}
                    className="py-1.5 px-3 bg-green-50 hover:bg-green-100 text-[#1B5E20] rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                    Status: Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Farm Waste Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-200 relative my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-green-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-950">Sell Farm Waste</h2>
                  <p className="text-xs text-green-800">Earn extra money from crop residue</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showSuccessToast && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-2xl flex items-center gap-2 text-green-900 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
                <span>Farm waste posted for sale successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Waste Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Waste Type
                </label>
                <select
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium bg-white"
                >
                  {WASTE_TYPES.map((wt) => (
                    <option key={wt} value={wt}>
                      {wt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quantity (Tonnes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantityTonnes}
                    onChange={(e) => setQuantityTonnes(Number(e.target.value))}
                    placeholder="e.g. 10"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price (₹ / Tonne)
                  </label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={pricePerTonne}
                    onChange={(e) => setPricePerTonne(Number(e.target.value))}
                    placeholder="e.g. 2200"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Farm Location
                </label>
                <input
                  type="text"
                  required
                  value={locationVillage}
                  onChange={(e) => setLocationVillage(e.target.value)}
                  placeholder="e.g. Anandpur, Mehsana"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                />
              </div>

              {/* Baled Toggle */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="baled_check"
                  checked={isBaled}
                  onChange={(e) => setIsBaled(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded-sm"
                />
                <label htmlFor="baled_check" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Is the waste machine baled into bundles?
                </label>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description / Pickup Notes
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Dry straw, moisture below 12%, accessible by tractor"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-green-600 focus:outline-hidden"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-sm shadow-md shadow-green-700/20"
                >
                  Post for Sale
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
