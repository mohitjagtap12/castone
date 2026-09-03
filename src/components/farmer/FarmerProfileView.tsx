import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  MapPin,
  Phone,
  Layers,
  Droplets,
  CheckCircle2,
  Save,
  ShieldCheck,
  Sprout,
  ShoppingBag,
} from 'lucide-react';

export const FarmerProfileView: React.FC = () => {
  const { currentUser, updateUserProfile, crops, cropListings } = useApp();

  const [name, setName] = useState(currentUser.name || 'Ramesh Patel');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [village, setVillage] = useState(currentUser.location.village || 'Panchot');
  const [district, setDistrict] = useState(currentUser.location.district || 'Mehsana');
  const [state, setState] = useState(currentUser.location.state || 'Gujarat');
  const [landAcres, setLandAcres] = useState(currentUser.farmerDetails?.landAreaAcres || 5.5);
  const [soilType, setSoilType] = useState(currentUser.farmerDetails?.soilType || 'Black Loamy Soil');
  const [irrigationSource, setIrrigationSource] = useState(currentUser.farmerDetails?.irrigationSource || 'Solar Tube Well & Drip');
  
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      location: {
        ...currentUser.location,
        village,
        district,
        state,
      },
      farmerDetails: {
        farmName: currentUser.farmerDetails?.farmName || 'Patel Organic Farm',
        primaryCrops: currentUser.farmerDetails?.primaryCrops || ['Wheat', 'Cotton', 'Mustard', 'Tomato'],
        landAreaAcres: Number(landAcres),
        soilType,
        irrigationSource,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-green-100 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={
              currentUser.avatarUrl ||
              'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80'
            }
            alt={currentUser.name}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-green-100 shadow-sm"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-1.5 rounded-xl shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-[#1B5E20] text-xs font-bold mb-2">
            <span>Verified Farmer Member</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-950">{currentUser.name}</h1>
          <p className="text-sm text-green-800 font-medium mt-1 flex items-center justify-center sm:justify-start gap-1.5">
            <MapPin className="w-4 h-4 text-green-700" />
            <span>{village}, {district}, {state}</span>
          </p>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 text-center">
            <div className="p-2 bg-green-50/60 rounded-2xl">
              <span className="text-[10px] text-green-800 font-bold block">Farm Land</span>
              <strong className="text-sm font-bold text-green-950">{landAcres} Acres</strong>
            </div>
            <div className="p-2 bg-green-50/60 rounded-2xl">
              <span className="text-[10px] text-green-800 font-bold block">Active Crops</span>
              <strong className="text-sm font-bold text-green-950">{crops.length} Planted</strong>
            </div>
            <div className="p-2 bg-green-50/60 rounded-2xl">
              <span className="text-[10px] text-green-800 font-bold block">Sales Listings</span>
              <strong className="text-sm font-bold text-green-950">{cropListings.length} Active</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-green-100 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-green-100">
          <div>
            <h2 className="text-xl font-bold text-green-950">Farm & Personal Details</h2>
            <p className="text-xs text-green-800">Update your farm information to get better recommendations</p>
          </div>
          {savedSuccess && (
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-green-100 text-green-900 rounded-full text-xs font-bold animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-green-700" />
              <span>Saved!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-green-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-green-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Village / Gram Panchayat
              </label>
              <input
                type="text"
                required
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-green-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                District / Tehsil
              </label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-green-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                State
              </label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-green-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Total Land Size (Acres)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                required
                value={landAcres}
                onChange={(e) => setLandAcres(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-green-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Soil Type
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:border-green-600 focus:outline-hidden"
              >
                <option value="Black Loamy Soil">Black Loamy Soil</option>
                <option value="Red Sandy Soil">Red Sandy Soil</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Clayey Loam">Clayey Loam</option>
                <option value="Laterite Soil">Laterite Soil</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Water & Irrigation Source
              </label>
              <select
                value={irrigationSource}
                onChange={(e) => setIrrigationSource(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:border-green-600 focus:outline-hidden"
              >
                <option value="Solar Tube Well & Drip">Solar Tube Well & Drip</option>
                <option value="Canal Water Connection">Canal Water Connection</option>
                <option value="Borewell Sprinkler">Borewell Sprinkler</option>
                <option value="Rainfed / Pond Storage">Rainfed / Pond Storage</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white text-sm font-bold shadow-md shadow-green-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
