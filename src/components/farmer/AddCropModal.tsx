import React, { useState } from 'react';
import { X, Sprout, Image, CheckCircle, Calendar, MapPin } from 'lucide-react';
import { CropRecord } from '../../types';

interface AddCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (crop: Omit<CropRecord, 'id' | 'farmerId' | 'farmerName'>) => void;
}

const COMMON_CROPS = [
  { name: 'Tomato', variety: 'Abhinav Hybrid F1', defaultDays: 90, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80' },
  { name: 'Wheat', variety: 'Sharbati 306', defaultDays: 120, img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80' },
  { name: 'Onion', variety: 'Nasik Red', defaultDays: 110, img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&auto=format&fit=crop&q=80' },
  { name: 'Sugarcane', variety: 'Co-0238 Early', defaultDays: 300, img: 'https://images.unsplash.com/photo-1590452366170-c02ec03df6dc?w=500&auto=format&fit=crop&q=80' },
  { name: 'Cotton', variety: 'Bt-Cotton RCH-659', defaultDays: 150, img: 'https://images.unsplash.com/photo-1594488554790-2580a6fa2c5d?w=500&auto=format&fit=crop&q=80' },
  { name: 'Maize', variety: 'Pioneer Sweet Corn', defaultDays: 85, img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&auto=format&fit=crop&q=80' },
  { name: 'Potato', variety: 'Kufri Jyoti', defaultDays: 90, img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=80' },
  { name: 'Soybean', variety: 'JS-335 High Protein', defaultDays: 100, img: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=500&auto=format&fit=crop&q=80' },
];

export const AddCropModal: React.FC<AddCropModalProps> = ({ isOpen, onClose, onSave }) => {
  const [cropName, setCropName] = useState('Tomato');
  const [variety, setVariety] = useState('Abhinav Hybrid F1');
  const [areaAcres, setAreaAcres] = useState(2);
  const [sowingDate, setSowingDate] = useState('2026-06-10');
  const [expectedHarvestDate, setExpectedHarvestDate] = useState('2026-09-15');
  const [expectedYieldQuintals, setExpectedYieldQuintals] = useState(80);
  const [fieldLocation, setFieldLocation] = useState('East Borewell Field, Plot #2');
  const [status, setStatus] = useState<'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvested'>('Flowering');
  const [notes, setNotes] = useState('Drip irrigation installed, soil tested healthy.');
  const [selectedPhoto, setSelectedPhoto] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof COMMON_CROPS[0]) => {
    setCropName(preset.name);
    setVariety(preset.variety);
    setSelectedPhoto(preset.img);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      cropName,
      variety,
      landAreaAcres: Number(areaAcres),
      areaAcres: Number(areaAcres),
      sowingDate,
      expectedHarvestDate,
      expectedYieldQuintals: Number(expectedYieldQuintals),
      fieldLocation,
      status,
      notes,
    });
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-200 relative my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-green-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-950">Add Crop</h2>
              <p className="text-xs text-green-800">Enter details to track your farm crop</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast */}
        {showSuccessToast && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-2xl flex items-center gap-2.5 text-green-900 font-bold text-sm animate-bounce">
            <CheckCircle className="w-5 h-5 text-green-700 shrink-0" />
            <span>Crop added successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {/* Quick Crop Selector Chips */}
          <div>
            <label className="block text-xs font-bold text-green-900 mb-1.5">
              Quick Select Crop:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_CROPS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleSelectPreset(c)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                    cropName.toLowerCase() === c.name.toLowerCase()
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                      : 'bg-green-50 text-green-900 border-green-200 hover:bg-green-100'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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

            {/* Variety */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Variety / Seed Name
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Abhinav Hybrid F1"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Farm Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Farm Area (in Acres)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={areaAcres}
                onChange={(e) => setAreaAcres(Number(e.target.value))}
                placeholder="e.g. 2 acres"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
              />
            </div>

            {/* Expected Yield */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Expected Yield (Quintals)
              </label>
              <input
                type="number"
                min="1"
                value={expectedYieldQuintals}
                onChange={(e) => setExpectedYieldQuintals(Number(e.target.value))}
                placeholder="e.g. 80 Quintals"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Planting Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Planting Date
              </label>
              <input
                type="date"
                required
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
              />
            </div>

            {/* Expected Harvest */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Expected Harvest
              </label>
              <input
                type="date"
                required
                value={expectedHarvestDate}
                onChange={(e) => setExpectedHarvestDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
              />
            </div>
          </div>

          {/* Current Growth Stage */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Current Crop Stage
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['Sowing', 'Vegetative', 'Flowering', 'Maturity', 'Harvested'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                    status === st
                      ? 'bg-green-100 text-green-900 border-green-500 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Field Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Field Location / Plot Name
            </label>
            <input
              type="text"
              value={fieldLocation}
              onChange={(e) => setFieldLocation(e.target.value)}
              placeholder="e.g. Plot #2, East Borewell Field"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Notes / Irrigation Info
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Drip fertigation installed, soil organic carbon good"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-green-600 focus:outline-hidden"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-sm shadow-md shadow-green-700/20 transition-all active:scale-[0.98]"
            >
              Save Crop
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
