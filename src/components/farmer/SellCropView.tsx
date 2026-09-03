import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Plus,
  Eye,
  Edit2,
  Trash2,
  MapPin,
  Tag,
  CheckCircle2,
  X,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { CropListing } from '../../types';

export const SellCropView: React.FC = () => {
  const { currentUser, cropListings, addCropListing, setActiveTab } = useApp();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedListingForView, setSelectedListingForView] = useState<CropListing | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form state
  const [cropName, setCropName] = useState('Tomato');
  const [quantity, setQuantity] = useState(500);
  const [unit, setUnit] = useState('kg');
  const [price, setPrice] = useState(25);
  const [location, setLocation] = useState(currentUser.location.district ? `${currentUser.location.district}, ${currentUser.location.state}` : 'Pune, Maharashtra');
  const [description, setDescription] = useState('Fresh farm-picked tomatoes, graded quality, ready for direct pickup or dispatch.');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');

  // Filter farmer's own listings
  const myListings = cropListings.filter((l) => l.farmerId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCropListing({
      cropName,
      variety: 'Fresh Harvest',
      quantity: Number(quantity),
      quantityQuintals: unit === 'quintals' ? Number(quantity) : Math.round((Number(quantity) / 100) * 10) / 10,
      unit,
      expectedPrice: Number(price),
      pricePerQuintal: unit === 'quintals' ? Number(price) : Number(price) * 100,
      description,
      imageUrl,
      isOrganic: true,
      organicCertified: false,
      qualityGrade: 'Grade A',
    });
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setShowAddModal(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-green-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-950">Sell Crop</h1>
              <p className="text-xs sm:text-sm text-green-800 font-medium">
                Sell your crop directly to buyers.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('market')}
            className="px-4 py-2.5 bg-green-50 hover:bg-green-100 text-[#1B5E20] text-xs font-bold rounded-2xl border border-green-200 transition-colors flex items-center gap-1.5"
          >
            <TrendingUp className="w-4 h-4 text-green-700" />
            <span>Check Mandi Rates</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white text-sm font-bold shadow-md shadow-green-700/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>+ Add Crop for Sale</span>
          </button>
        </div>
      </div>

      {/* My Crop Sales Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-green-950">My Crop Sales</h2>
          <span className="text-xs font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full">
            {myListings.length} Active Listings
          </span>
        </div>

        {myListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-green-100 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-green-100 text-[#2E7D32] flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No crop listings yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You have not posted any crop for sale. Click "+ Add Crop for Sale" to connect with buyers directly.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-5 py-2.5 bg-[#2E7D32] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              + Add Crop for Sale
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myListings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-green-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={
                        item.imageUrl ||
                        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
                      }
                      alt={item.cropName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-900 border border-green-300 backdrop-blur-xs">
                        {item.status === 'active' ? 'Available' : item.status === 'under_negotiation' ? 'Under Negotiation' : 'Sold'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold">
                      ₹{item.expectedPrice || item.pricePerQuintal} / {item.unit || 'kg'}
                    </div>
                  </div>

                  <div className="p-4 space-y-2.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900">{item.cropName}</h3>
                      <span className="text-xs font-bold text-green-700">
                        {item.quantity || item.quantityQuintals} {item.unit || 'Quintals'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-green-700" />
                      <span>{item.farmerLocation || currentUser.location.district}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons: View, Edit, Remove */}
                <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                  <div className="grid grid-cols-3 gap-2 pt-3">
                    <button
                      onClick={() => setSelectedListingForView(item)}
                      className="py-2 px-2 bg-green-50 hover:bg-green-100 text-[#1B5E20] rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={() => setSelectedListingForView(item)}
                      className="py-2 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => {
                        // Frontend local remove simulation
                        setSelectedListingForView(null);
                      }}
                      className="py-2 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Crop for Sale Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-200 relative my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-green-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-950">Add Crop for Sale</h2>
                  <p className="text-xs text-green-800">Post your harvest directly to buyers</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showSuccessToast && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-2xl flex items-center gap-2 text-green-900 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
                <span>Crop listed for sale successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              
              {/* Crop Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Crop Name
                </label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g. Tomato"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="e.g. 500"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="quintals">Quintals (100 kg)</option>
                    <option value="crates">Crates</option>
                    <option value="tonnes">Tonnes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Price (₹ / {unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="e.g. 25"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location / Mandi Area
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Pune, Maharashtra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Grade-A quality, zero pesticide test, freshly plucked"
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

      {/* View Listing Details Modal */}
      {selectedListingForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-green-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{selectedListingForView.cropName}</h3>
              <button
                onClick={() => setSelectedListingForView(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="h-40 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={selectedListingForView.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'}
                  alt={selectedListingForView.cropName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Available Quantity:</span>
                  <p className="font-bold text-slate-900 text-sm">
                    {selectedListingForView.quantity || selectedListingForView.quantityQuintals} {selectedListingForView.unit || 'kg'}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500">Expected Price:</span>
                  <p className="font-bold text-green-700 text-sm">
                    ₹{selectedListingForView.expectedPrice || selectedListingForView.pricePerQuintal} / {selectedListingForView.unit || 'kg'}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Pickup Location:</span>
                <p className="font-semibold text-slate-800">{selectedListingForView.farmerLocation}</p>
              </div>

              <p className="text-slate-600 p-2 bg-green-50/50 rounded-xl leading-relaxed">
                {selectedListingForView.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => setSelectedListingForView(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
