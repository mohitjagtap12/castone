import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sprout,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Calendar,
  MapPin,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { CropRecord } from '../../types';
import { AddCropModal } from './AddCropModal';

// Sample fallback crop images
const CROP_IMAGES: Record<string, string> = {
  Tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
  Wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
  Onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
  Sugarcane: 'https://images.unsplash.com/photo-1590452366170-c02ec03df6dc?w=600&auto=format&fit=crop&q=80',
  Cotton: 'https://images.unsplash.com/photo-1594488554790-2580a6fa2c5d?w=600&auto=format&fit=crop&q=80',
  Maize: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
  Potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
  Soybean: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=600&auto=format&fit=crop&q=80',
};

export const MyCropsView: React.FC = () => {
  const { crops, addCrop, updateCrop, deleteCrop, setActiveTab } = useApp();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingCrop, setViewingCrop] = useState<CropRecord | null>(null);
  const [editingCrop, setEditingCrop] = useState<CropRecord | null>(null);
  const [cropToDelete, setCropToDelete] = useState<CropRecord | null>(null);
  const [filterStage, setFilterStage] = useState<string>('all');

  const filteredCrops = crops.filter((crop) => {
    if (filterStage === 'all') return true;
    return crop.status?.toLowerCase() === filterStage.toLowerCase();
  });

  const getCropImage = (name: string) => {
    const key = Object.keys(CROP_IMAGES).find((k) => name.toLowerCase().includes(k.toLowerCase()));
    return key ? CROP_IMAGES[key] : 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600&auto=format&fit=crop&q=80';
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'sowing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'vegetative':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'flowering':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'maturity':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'harvested':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-green-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-950">My Crops</h1>
              <p className="text-xs text-green-800 font-medium">
                View, manage and monitor your active crop fields
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white text-sm font-bold shadow-md shadow-green-700/20 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>+ Add Crop</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['all', 'sowing', 'vegetative', 'flowering', 'maturity', 'harvested'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStage(st)}
            className={`px-4 py-2 rounded-xl font-bold capitalize transition-colors whitespace-nowrap border ${
              filterStage === st
                ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {st === 'all' ? `All Crops (${crops.length})` : st}
          </button>
        ))}
      </div>

      {/* Crops Grid */}
      {filteredCrops.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-green-100 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-green-100 text-[#2E7D32] flex items-center justify-center mx-auto mb-3">
            <Sprout className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No crops found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You don't have any crops in this filter. Click "+ Add Crop" to add a new crop field.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 px-5 py-2.5 bg-[#2E7D32] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            + Add Crop Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCrops.map((crop) => {
            const imgSrc = getCropImage(crop.cropName);
            const acres = crop.landAreaAcres || crop.areaAcres || 2;
            return (
              <div
                key={crop.id}
                className="bg-white rounded-3xl border border-green-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Crop Image & Badges */}
                  <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={imgSrc}
                      alt={crop.cropName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-xs shadow-xs ${getStatusColor(
                          crop.status
                        )}`}
                      >
                        {crop.status || 'Active'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="text-xl font-bold">{crop.cropName}</h3>
                      <p className="text-xs text-green-200 font-medium">{crop.variety || 'Hybrid Variety'}</p>
                    </div>
                  </div>

                  {/* Crop Details in Simple English */}
                  <div className="p-4 space-y-2.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-semibold text-slate-500">Area:</span>
                      <strong className="text-sm font-bold text-slate-900">{acres} acres</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-green-700" />
                        Planted:
                      </span>
                      <strong className="text-slate-800 font-semibold">{crop.sowingDate}</strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        Harvest:
                      </span>
                      <strong className="text-slate-800 font-semibold">{crop.expectedHarvestDate}</strong>
                    </div>

                    {crop.fieldLocation && (
                      <div className="flex items-center justify-between pt-1">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          Plot:
                        </span>
                        <span className="text-slate-700 truncate max-w-[140px]">{crop.fieldLocation}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons: View, Edit, Delete */}
                <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                  <div className="grid grid-cols-3 gap-2 pt-3">
                    <button
                      onClick={() => setViewingCrop(crop)}
                      className="py-2 px-2 bg-green-50 hover:bg-green-100 text-[#1B5E20] rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={() => setEditingCrop(crop)}
                      className="py-2 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setCropToDelete(crop)}
                      className="py-2 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Crop Modal */}
      <AddCropModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(newCrop) => addCrop(newCrop)}
      />

      {/* View Crop Details Modal */}
      {viewingCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-100 relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{viewingCrop.cropName}</h3>
                  <p className="text-xs text-green-800 font-medium">{viewingCrop.variety}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingCrop(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="h-44 w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={getCropImage(viewingCrop.cropName)}
                  alt={viewingCrop.cropName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block font-medium">Farm Area</span>
                  <strong className="text-sm font-bold text-slate-900">
                    {viewingCrop.landAreaAcres || viewingCrop.areaAcres || 2} acres
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block font-medium">Growth Stage</span>
                  <strong className="text-sm font-bold text-green-700 capitalize">
                    {viewingCrop.status}
                  </strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block font-medium">Planting Date</span>
                  <strong className="text-sm font-bold text-slate-900">{viewingCrop.sowingDate}</strong>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500 block font-medium">Expected Harvest</span>
                  <strong className="text-sm font-bold text-slate-900">{viewingCrop.expectedHarvestDate}</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 text-xs">
                <p className="font-bold text-green-950 mb-1">Expected Production:</p>
                <p className="text-green-900 font-semibold text-sm">
                  {viewingCrop.expectedYieldQuintals || 80} Quintals (approx. {(viewingCrop.expectedYieldQuintals || 80) * 100} kg)
                </p>
              </div>

              {viewingCrop.notes && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-700 block mb-1">Farm Notes:</span>
                  <p className="text-slate-600 leading-relaxed">{viewingCrop.notes}</p>
                </div>
              )}

              {/* Quick Actions from Crop View */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    setViewingCrop(null);
                    setActiveTab('ai_doctor');
                  }}
                  className="flex-1 py-3 rounded-xl bg-green-100 text-[#1B5E20] hover:bg-green-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-green-700" />
                  <span>Check Health</span>
                </button>

                <button
                  onClick={() => {
                    setViewingCrop(null);
                    setActiveTab('farmer_sell');
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Sell Harvest</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Crop Modal */}
      {editingCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-100 relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Edit Crop: {editingCrop.cropName}</h3>
              <button
                onClick={() => setEditingCrop(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateCrop(editingCrop.id, editingCrop);
                setEditingCrop(null);
              }}
              className="mt-4 space-y-3.5"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Crop Name</label>
                <input
                  type="text"
                  value={editingCrop.cropName}
                  onChange={(e) => setEditingCrop({ ...editingCrop, cropName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingCrop.landAreaAcres || editingCrop.areaAcres || 2}
                    onChange={(e) =>
                      setEditingCrop({
                        ...editingCrop,
                        landAreaAcres: Number(e.target.value),
                        areaAcres: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Stage</label>
                  <select
                    value={editingCrop.status}
                    onChange={(e) =>
                      setEditingCrop({
                        ...editingCrop,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
                  >
                    <option value="Sowing">Sowing</option>
                    <option value="Vegetative">Vegetative</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Maturity">Maturity</option>
                    <option value="Harvested">Harvested</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Planting Date</label>
                  <input
                    type="date"
                    value={editingCrop.sowingDate}
                    onChange={(e) => setEditingCrop({ ...editingCrop, sowingDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expected Harvest</label>
                  <input
                    type="date"
                    value={editingCrop.expectedHarvestDate}
                    onChange={(e) => setEditingCrop({ ...editingCrop, expectedHarvestDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={editingCrop.notes || ''}
                  onChange={(e) => setEditingCrop({ ...editingCrop, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingCrop(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-[#2E7D32] text-white text-xs font-bold shadow-xs hover:bg-green-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {cropToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-rose-100 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delete Crop?</h3>
            <p className="text-xs text-slate-600 mt-1">
              Are you sure you want to remove <strong>{cropToDelete.cropName}</strong> ({cropToDelete.landAreaAcres || cropToDelete.areaAcres || 2} acres)? This action cannot be undone.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={() => setCropToDelete(null)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteCrop(cropToDelete.id);
                  setCropToDelete(null);
                }}
                className="w-1/2 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
