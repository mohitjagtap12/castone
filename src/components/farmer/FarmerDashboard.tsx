import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AICropDoctor } from './AICropDoctor';
import {
  Sprout,
  Sparkles,
  ShoppingBag,
  Flame,
  Users,
  Building2,
  Package,
  Plus,
  Trash2,
  TrendingUp,
  MapPin,
  Calendar,
  CloudSun,
  ShieldCheck,
  Eye,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    crops,
    addCrop,
    deleteCrop,
    cropListings,
    addCropListing,
    agriWasteListings,
    addAgriWasteListing,
    labourJobs,
    postLabourJob,
    contracts,
    applyToContract,
    contractApplications,
    orders,
    storeProducts,
    addToCart,
  } = useApp();

  // Modals state
  const [showAddCropModal, setShowAddCropModal] = useState(false);
  const [showListProduceModal, setShowListProduceModal] = useState(false);
  const [showListWasteModal, setShowListWasteModal] = useState(false);
  const [showPostLabourModal, setShowPostLabourModal] = useState(false);
  const [selectedContractForApply, setSelectedContractForApply] = useState<string | null>(null);

  // Form states
  const [cropForm, setCropForm] = useState({
    cropName: 'Tomato',
    variety: 'Abhinav Hybrid F1',
    sowingDate: '2026-06-15',
    expectedHarvestDate: '2026-09-30',
    areaAcres: 2.5,
    fieldLocation: 'Plot #4, East Borewell Field',
    status: 'flowering' as const,
    notes: 'Drip fertigation installed, soil organic carbon 0.72%',
  });

  const [produceListingForm, setProduceListingForm] = useState({
    cropName: 'Fresh Premium Tomatoes',
    variety: 'Abhinav Hybrid F1',
    quantityQuintals: 15,
    pricePerQuintal: 2800,
    harvestDate: '2026-09-10',
    description: 'Freshly harvested, graded A-quality tomatoes with high shelf-life. Zero chemical residue test available.',
    isOrganic: true,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
  });

  const [wasteListingForm, setWasteListingForm] = useState({
    wasteType: 'Wheat Straw (Baled)',
    quantityTonnes: 12,
    pricePerTonne: 2400,
    moisturePercent: 12,
    locationVillage: 'Panchot, Mehsana',
    description: 'Dry machine-baled wheat straw parali. Ready for direct industrial boiler or bio-pellet plant dispatch.',
    isBaled: true,
  });

  const [labourJobForm, setLabourJobForm] = useState({
    jobType: 'Harvesting & Grading',
    cropType: 'Tomato / Cotton',
    workersNeeded: 6,
    dailyWagePerWorker: 450,
    startDate: '2026-09-12',
    durationDays: 3,
    location: 'East Borewell Plot, Panchot Farm, Mehsana',
    description: 'Tomato plucking, grading into crates, and loading onto pickup vehicle. Refreshments and drinking water provided.',
  });

  const [contractApplyForm, setContractApplyForm] = useState({
    acres: 3,
    expectedQuintals: 120,
  });

  // Calculate quick metrics
  const totalAcres = crops.reduce((sum, c) => sum + (c.landAreaAcres || c.areaAcres || 0), 0);
  const myProduceListings = cropListings.filter((l) => l.farmerId === currentUser.id);
  const myWasteListings = agriWasteListings.filter((w) => w.farmerId === currentUser.id);
  const myLabourJobs = labourJobs.filter((j) => j.farmerId === currentUser.id);
  const myContractApps = contractApplications.filter((a) => a.farmerId === currentUser.id);
  const myProduceOrders = orders.filter((o) => o.sellerId === currentUser.id);

  const handleAddCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCrop(cropForm);
    setShowAddCropModal(false);
  };

  const handleProduceListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCropListing(produceListingForm);
    setShowListProduceModal(false);
  };

  const handleWasteListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAgriWasteListing(wasteListingForm);
    setShowListWasteModal(false);
  };

  const handleLabourJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postLabourJob(labourJobForm);
    setShowPostLabourModal(false);
  };

  const handleContractApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContractForApply) {
      applyToContract(selectedContractForApply, Number(contractApplyForm.acres), Number(contractApplyForm.expectedQuintals));
      setSelectedContractForApply(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Farmer Banner & Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-bold border border-emerald-500/30">
                AgroWorld Kisan Portal
              </span>
              <span className="text-xs text-emerald-100 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {currentUser.location.village || 'Panchot Farm'}, {currentUser.location.district || 'Mehsana'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              Hello, Farmer! 🌾
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
              Manage your farm easily
            </p>
          </div>

          {/* Live Farm Weather Widget */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl flex items-center gap-4 text-xs">
            <div className="p-2.5 rounded-xl bg-white/20">
              <CloudSun className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold">28°C</span>
                <span className="text-emerald-200 font-medium">Clear Sky</span>
              </div>
              <p className="text-[11px] text-emerald-100 mt-0.5">
                Humidity 62% • Ideal for field spraying
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('farmer_crops')}
          className="bg-white p-4 rounded-2xl border border-green-200 shadow-2xs hover:border-green-400 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">My Crops</span>
            <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{crops.length || 4}</p>
          <p className="text-[11px] text-green-700 font-semibold mt-0.5">{totalAcres || 5.5} Acres growing</p>
        </div>

        <div
          onClick={() => setActiveTab('farmer_orders')}
          className="bg-white p-4 rounded-2xl border border-blue-200 shadow-2xs hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">My Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{orders.length || 2}</p>
          <p className="text-[11px] text-blue-700 font-semibold mt-0.5">Active deliveries</p>
        </div>

        <div
          onClick={() => setActiveTab('farmer_labour')}
          className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs hover:border-amber-400 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">Labour</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">
            {myLabourJobs.length || 3} <span className="text-sm font-semibold text-slate-500">Requests</span>
          </p>
          <p className="text-[11px] text-amber-800 font-semibold mt-0.5">Farm squad ready</p>
        </div>

        <div
          onClick={() => setActiveTab('farmer_sell')}
          className="bg-white p-4 rounded-2xl border border-purple-200 shadow-2xs hover:border-purple-400 hover:shadow-sm transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">My Sales</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{myProduceListings.length || 5}</p>
          <p className="text-[11px] text-purple-700 font-semibold mt-0.5">Direct buyer listings</p>
        </div>
      </div>

      {/* Main Quick Action Cards (Large & Easy to Tap) */}
      <div>
        <h2 className="text-sm font-bold text-slate-700 mb-2.5">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <button
            onClick={() => setActiveTab('farmer_crops')}
            className="p-4 rounded-2xl bg-white border-2 border-green-200 hover:border-green-600 hover:bg-green-50/60 font-bold text-sm text-slate-800 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 flex items-center justify-center shrink-0">
              <Sprout className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <span className="block text-slate-900 font-extrabold">Add Crop</span>
              <span className="text-[11px] text-slate-500 font-normal">Manage field & area</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('farmer_sell')}
            className="p-4 rounded-2xl bg-white border-2 border-blue-200 hover:border-blue-600 hover:bg-blue-50/60 font-bold text-sm text-slate-800 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <span className="block text-slate-900 font-extrabold">Sell Crop</span>
              <span className="text-[11px] text-slate-500 font-normal">Direct to mandi buyers</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('farmer_labour')}
            className="p-4 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-600 hover:bg-amber-50/60 font-bold text-sm text-slate-800 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <span className="block text-slate-900 font-extrabold">Find Labour</span>
              <span className="text-[11px] text-slate-500 font-normal">Hire harvest helpers</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('ai_doctor')}
            className="p-4 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-sm flex items-center gap-3.5 shadow-md hover:shadow-lg transition-all cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <span className="block font-extrabold">Check Crop Health</span>
              <span className="text-[11px] text-green-100 font-normal">Photo leaf check</span>
            </div>
          </button>
        </div>
      </div>

      {/* Secondary Service Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('farmer_waste')}
          className="p-3 rounded-xl bg-white border border-orange-200 hover:border-orange-400 font-bold text-xs text-slate-800 flex items-center gap-2.5 shadow-2xs hover:bg-orange-50/40 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
            <Flame className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="truncate">Sell Farm Waste</span>
        </button>

        <button
          onClick={() => setActiveTab('farmer_supplies')}
          className="p-3 rounded-xl bg-white border border-teal-200 hover:border-teal-400 font-bold text-xs text-slate-800 flex items-center gap-2.5 shadow-2xs hover:bg-teal-50/40 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Package className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="truncate">Buy Farm Products</span>
        </button>

        <button
          onClick={() => setActiveTab('farmer_contracts')}
          className="p-3 rounded-xl bg-white border border-purple-200 hover:border-purple-400 font-bold text-xs text-slate-800 flex items-center gap-2.5 shadow-2xs hover:bg-purple-50/40 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="truncate">Farm Contracts</span>
        </button>

        <button
          onClick={() => setActiveTab('farmer_orders')}
          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-slate-400 font-bold text-xs text-slate-800 flex items-center gap-2.5 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Eye className="w-4 h-4 stroke-[2.2]" />
          </div>
          <span className="truncate">My Orders</span>
        </button>
      </div>

      {/* Secondary Content Tabs (Crops, Market, Waste, Labour, Contracts) */}
      {(activeTab === 'dashboard' || activeTab === 'farmer_crops') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">My Registered Crops & Fields</h3>
            </div>
            <button
              onClick={() => setShowAddCropModal(true)}
              className="px-3 py-1.5 bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-emerald-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Field</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-sm transition-all relative group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-md capitalize">
                      {crop.status}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5">{crop.cropName}</h4>
                    <p className="text-xs text-slate-500">{crop.variety}</p>
                  </div>
                  <button
                    onClick={() => deleteCrop(crop.id)}
                    className="text-slate-300 hover:text-rose-600 p-1 transition-colors"
                    title="Remove crop record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Field Location:</span>
                    <strong className="text-slate-800">{crop.fieldLocation || 'Primary Plot'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Land Area:</span>
                    <strong className="text-slate-800">{crop.landAreaAcres || crop.areaAcres || 0} Acres</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Sown Date:</span>
                    <span>{crop.sowingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harvest Estimate:</span>
                    <span className="text-emerald-700 font-semibold">{crop.expectedHarvestDate}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 flex gap-2">
                  <button
                    onClick={() => setActiveTab('ai_doctor')}
                    className="flex-1 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    AI Health Check
                  </button>
                  <button
                    onClick={() => {
                      setProduceListingForm((prev) => ({ ...prev, cropName: crop.cropName, variety: crop.variety }));
                      setShowListProduceModal(true);
                    }}
                    className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    List for Sale
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Produce & Market Tab */}
      {(activeTab === 'dashboard' || activeTab === 'farmer_sell') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Active Produce Listed for Direct Sale</h3>
                <p className="text-xs text-slate-500">Visible to retail consumers and direct wholesale buyers</p>
              </div>
            </div>
            <button
              onClick={() => setShowListProduceModal(true)}
              className="px-3 py-1.5 bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-blue-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Harvest</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProduceListings.map((listing) => (
              <div
                key={listing.id}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 hover:bg-white transition-all hover:shadow-md"
              >
                {listing.imageUrl && (
                  <img
                    src={listing.imageUrl}
                    alt={listing.cropName}
                    className="w-full h-36 object-cover"
                  />
                )}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{listing.cropName}</h4>
                      <p className="text-xs text-slate-500">{listing.variety}</p>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ₹{listing.pricePerQuintal}/Qtl
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{listing.description}</p>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500">
                    <span>Available: <strong>{listing.quantityQuintals} Quintals</strong></span>
                    <span>Harvest: {listing.harvestDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agri Waste (Biomass) Tab */}
      {(activeTab === 'farmer_waste') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Agri-Waste & Crop Residue Monetization</h3>
                <p className="text-xs text-slate-500">Sell parali, straw, and husk to biomass pellet and bio-power plants</p>
              </div>
            </div>
            <button
              onClick={() => setShowListWasteModal(true)}
              className="px-3 py-1.5 bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-orange-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>List Waste Lot</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myWasteListings.map((waste) => (
              <div
                key={waste.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-sm">
                      {waste.isBaled ? 'Baled Biomass' : 'Loose Residue'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{waste.wasteType}</h4>
                  </div>
                  <span className="text-xs font-extrabold text-orange-700">
                    ₹{waste.pricePerTonne}/Tonne
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <strong>{waste.quantityTonnes} Tonnes</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Moisture Content:</span>
                    <span>{waste.moisturePercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{waste.locationVillage}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">{waste.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Labour & Farm Squad Tab */}
      {(activeTab === 'farmer_labour') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Farm Squad & Labour Hiring</h3>
                <p className="text-xs text-slate-500">Post sowing, spraying, and harvesting jobs for verified local squads</p>
              </div>
            </div>
            <button
              onClick={() => setShowPostLabourModal(true)}
              className="px-3 py-1.5 bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-amber-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Job Requirement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myLabourJobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${
                        job.status === 'assigned'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {job.status === 'assigned' ? 'Squad Assigned' : 'Open Requirement'}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{job.jobType}</h4>
                    <p className="text-xs text-slate-500">{job.cropType}</p>
                  </div>
                  <span className="text-xs font-extrabold text-amber-800">
                    ₹{job.dailyWagePerWorker}/day
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Squad Size:</span>
                    <strong>{job.workersNeeded} Workers</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{job.durationDays} Days (Starting {job.startDate})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Farm Location:</span>
                    <span className="truncate max-w-[150px]">{job.location}</span>
                  </div>
                </div>

                {job.assignedLabourName && (
                  <div className="p-2 bg-emerald-50 rounded-lg text-xs text-emerald-900 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Assigned to: {job.assignedLabourName}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Corporate Contracts Tab */}
      {(activeTab === 'farmer_contracts') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Assured Corporate Buyback Contracts</h3>
                <p className="text-xs text-slate-500">Guaranteed minimum procurement rates and technical inputs by agro-enterprises</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-purple-300 transition-all space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-sm">
                      {contract.companyName}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {contract.cropRequired} ({contract.variety})
                    </h4>
                    <p className="text-xs text-slate-500">Season: {contract.season}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-purple-800 block">
                      ₹{contract.minimumGuaranteedPricePerQuintal}/Qtl
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Guaranteed Buyback</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-50/60 rounded-xl space-y-1.5 text-xs text-slate-700">
                  <p><strong>Quality Parameters:</strong> {contract.qualitySpecification}</p>
                  <p><strong>Corporate Inputs:</strong> {contract.inputSupport}</p>
                  <p><strong>Delivery Mandi / Factory:</strong> {contract.deliveryLocation}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    Required: {contract.targetVolumeQuintals} Qtl ({contract.applicationsCount} farmers joined)
                  </span>

                  <button
                    onClick={() => setSelectedContractForApply(contract.id)}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Apply for Contract
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Buy Farm Supplies Store Tab */}
      {(activeTab === 'farmer_supplies') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Direct Agri Supplies & Certified Inputs</h3>
                <p className="text-xs text-slate-500">Doorstep delivery of seeds, bio-fertilizers, and drip kits</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {storeProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {prod.imageUrl && (
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-32 object-cover rounded-xl mb-3"
                    />
                  )}
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-sm capitalize">
                    {prod.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{prod.name}</h4>
                  <p className="text-[11px] text-slate-500">{prod.brand} • by {prod.storeName}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-emerald-700">₹{prod.price}</span>
                    <span className="text-[10px] text-slate-400">/{prod.unit}</span>
                  </div>
                  <button
                    onClick={() =>
                      addToCart({
                        id: prod.id,
                        name: prod.name,
                        price: prod.price,
                        quantity: 1,
                        unit: prod.unit,
                        sellerId: prod.storeId,
                        sellerName: prod.storeName,
                        sellerType: 'store',
                        imageUrl: prod.imageUrl,
                      })
                    }
                    className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODALS */}

      {/* Add Crop Modal */}
      {showAddCropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Add Crop / Field Record</h3>
              <button onClick={() => setShowAddCropModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddCropSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    required
                    value={cropForm.cropName}
                    onChange={(e) => setCropForm({ ...cropForm, cropName: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Variety / Hybrid</label>
                  <input
                    type="text"
                    required
                    value={cropForm.variety}
                    onChange={(e) => setCropForm({ ...cropForm, variety: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Land Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={cropForm.areaAcres}
                    onChange={(e) => setCropForm({ ...cropForm, areaAcres: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Stage</label>
                  <select
                    value={cropForm.status}
                    onChange={(e) => setCropForm({ ...cropForm, status: e.target.value as any })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="sown">Sown / Germination</option>
                    <option value="growing">Vegetative Growth</option>
                    <option value="flowering">Flowering / Fruiting</option>
                    <option value="ready_harvest">Ready for Harvest</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Field / Plot Location</label>
                <input
                  type="text"
                  required
                  value={cropForm.fieldLocation}
                  onChange={(e) => setCropForm({ ...cropForm, fieldLocation: e.target.value })}
                  placeholder="e.g. North Canal Plot #3"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sowing Date</label>
                  <input
                    type="date"
                    value={cropForm.sowingDate}
                    onChange={(e) => setCropForm({ ...cropForm, sowingDate: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expected Harvest Date</label>
                  <input
                    type="date"
                    value={cropForm.expectedHarvestDate}
                    onChange={(e) => setCropForm({ ...cropForm, expectedHarvestDate: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Save Crop Field Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* List Produce Modal */}
      {showListProduceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">List Produce for Sale</h3>
              <button onClick={() => setShowListProduceModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleProduceListingSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Produce Name</label>
                  <input
                    type="text"
                    required
                    value={produceListingForm.cropName}
                    onChange={(e) => setProduceListingForm({ ...produceListingForm, cropName: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Variety</label>
                  <input
                    type="text"
                    value={produceListingForm.variety}
                    onChange={(e) => setProduceListingForm({ ...produceListingForm, variety: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quantity (Quintals)</label>
                  <input
                    type="number"
                    required
                    value={produceListingForm.quantityQuintals}
                    onChange={(e) => setProduceListingForm({ ...produceListingForm, quantityQuintals: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price / Quintal (₹)</label>
                  <input
                    type="number"
                    required
                    value={produceListingForm.pricePerQuintal}
                    onChange={(e) => setProduceListingForm({ ...produceListingForm, pricePerQuintal: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quality & Harvest Description</label>
                <textarea
                  rows={2}
                  value={produceListingForm.description}
                  onChange={(e) => setProduceListingForm({ ...produceListingForm, description: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Publish Produce Listing
              </button>
            </form>
          </div>
        </div>
      )}

      {/* List Agri Waste Modal */}
      {showListWasteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">List Agri-Waste / Biomass</h3>
              <button onClick={() => setShowListWasteModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleWasteListingSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Waste / Residue Type</label>
                <input
                  type="text"
                  required
                  value={wasteListingForm.wasteType}
                  onChange={(e) => setWasteListingForm({ ...wasteListingForm, wasteType: e.target.value })}
                  placeholder="e.g. Wheat Straw, Rice Parali, Mustard Stalks"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quantity (Tonnes)</label>
                  <input
                    type="number"
                    required
                    value={wasteListingForm.quantityTonnes}
                    onChange={(e) => setWasteListingForm({ ...wasteListingForm, quantityTonnes: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price / Tonne (₹)</label>
                  <input
                    type="number"
                    required
                    value={wasteListingForm.pricePerTonne}
                    onChange={(e) => setWasteListingForm({ ...wasteListingForm, pricePerTonne: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Moisture Level (%)</label>
                  <input
                    type="number"
                    value={wasteListingForm.moisturePercent}
                    onChange={(e) => setWasteListingForm({ ...wasteListingForm, moisturePercent: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                  <select
                    value={wasteListingForm.isBaled ? 'baled' : 'loose'}
                    onChange={(e) => setWasteListingForm({ ...wasteListingForm, isBaled: e.target.value === 'baled' })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="baled">Machine Baled (Square/Round)</option>
                    <option value="loose">Loose Field Heap</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Publish Biomass Lot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Post Labour Job Modal */}
      {showPostLabourModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Post Labour / Squad Requirement</h3>
              <button onClick={() => setShowPostLabourModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleLabourJobSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Type</label>
                  <input
                    type="text"
                    required
                    value={labourJobForm.jobType}
                    onChange={(e) => setLabourJobForm({ ...labourJobForm, jobType: e.target.value })}
                    placeholder="e.g. Sowing, Harvesting, Spraying"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Crop</label>
                  <input
                    type="text"
                    value={labourJobForm.cropType}
                    onChange={(e) => setLabourJobForm({ ...labourJobForm, cropType: e.target.value })}
                    placeholder="e.g. Tomato, Cotton, Wheat"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Workers Needed</label>
                  <input
                    type="number"
                    required
                    value={labourJobForm.workersNeeded}
                    onChange={(e) => setLabourJobForm({ ...labourJobForm, workersNeeded: parseInt(e.target.value) || 1 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Daily Wage / Worker (₹)</label>
                  <input
                    type="number"
                    required
                    value={labourJobForm.dailyWagePerWorker}
                    onChange={(e) => setLabourJobForm({ ...labourJobForm, dailyWagePerWorker: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Farm Location & Landmark</label>
                <input
                  type="text"
                  required
                  value={labourJobForm.location}
                  onChange={(e) => setLabourJobForm({ ...labourJobForm, location: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Broadcast Job to Nearby Squads
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Apply Contract Modal */}
      {selectedContractForApply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Apply to Corporate Buyback</h3>
              <button onClick={() => setSelectedContractForApply(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleContractApplySubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Committed Land Area (Acres)</label>
                <input
                  type="number"
                  required
                  value={contractApplyForm.acres}
                  onChange={(e) => setContractApplyForm({ ...contractApplyForm, acres: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expected Production (Quintals)</label>
                <input
                  type="number"
                  required
                  value={contractApplyForm.expectedQuintals}
                  onChange={(e) => setContractApplyForm({ ...contractApplyForm, expectedQuintals: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Submit Application to Enterprise
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
