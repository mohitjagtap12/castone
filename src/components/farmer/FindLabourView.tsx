import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Plus,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Briefcase,
  Star,
  Check,
  X,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { LabourJob } from '../../types';

interface LabourCandidate {
  id: string;
  name: string;
  workType: string;
  squadSize: number;
  experienceYears: number;
  distanceKm: number;
  dailyWage: number;
  isAvailable: boolean;
  phone: string;
  rating: number;
  avatarUrl: string;
}

const NEARBY_LABOUR_CANDIDATES: LabourCandidate[] = [
  {
    id: 'squad_1',
    name: 'Babu Rao & Jai Kisan Squad',
    workType: 'Harvesting & Cotton Picking',
    squadSize: 8,
    experienceYears: 7,
    distanceKm: 3.2,
    dailyWage: 450,
    isAvailable: true,
    phone: '+91 97230 45678',
    rating: 4.8,
    avatarUrl: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'squad_2',
    name: 'Shankar Lal & Group',
    workType: 'Spraying & Pesticide Application',
    squadSize: 4,
    experienceYears: 5,
    distanceKm: 4.8,
    dailyWage: 500,
    isAvailable: true,
    phone: '+91 98980 11223',
    rating: 4.9,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'squad_3',
    name: 'Mahesh & Farm Helpers',
    workType: 'Sowing, Tilling & De-Weeding',
    squadSize: 6,
    experienceYears: 6,
    distanceKm: 2.5,
    dailyWage: 420,
    isAvailable: true,
    phone: '+91 98251 77665',
    rating: 4.7,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'squad_4',
    name: 'Kisan Shakti Worker Group',
    workType: 'Loading, Unloading & Crating',
    squadSize: 10,
    experienceYears: 8,
    distanceKm: 6.0,
    dailyWage: 400,
    isAvailable: false,
    phone: '+91 94260 33445',
    rating: 4.6,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
];

export const FindLabourView: React.FC = () => {
  const { currentUser, labourJobs, postLabourJob } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'find' | 'requests'>('find');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestedSquadId, setRequestedSquadId] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form state
  const [workType, setWorkType] = useState('Harvesting');
  const [workersNeeded, setWorkersNeeded] = useState(5);
  const [startDate, setStartDate] = useState('2026-09-12');
  const [dailyWage, setDailyWage] = useState(500);
  const [location, setLocation] = useState(
    currentUser.location.village ? `${currentUser.location.village}, Plot #2` : 'Panchot Farm, Mehsana'
  );
  const [description, setDescription] = useState('Harvesting ripe tomatoes, grading into crates, and loading.');

  const myRequests = labourJobs.filter((j) => j.farmerId === currentUser.id);

  const handlePostRequest = (e: React.FormEvent) => {
    e.preventDefault();
    postLabourJob({
      jobType: workType,
      cropType: 'Farm Field',
      workersNeeded: Number(workersNeeded),
      dailyWagePerWorker: Number(dailyWage),
      startDate,
      durationDays: 2,
      location,
      description,
    });
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      setShowRequestModal(false);
      setActiveSubTab('requests');
    }, 1200);
  };

  const handleDirectRequestSquad = (squad: LabourCandidate) => {
    setRequestedSquadId(squad.id);
    setTimeout(() => {
      setRequestedSquadId(null);
      alert(`Request sent to ${squad.name}! They will call you on your mobile.`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-green-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Users className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-950">Find Labour</h1>
              <p className="text-xs sm:text-sm text-green-800 font-medium">
                Hire reliable farm workers and squads for harvesting, spraying, and sowing.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white text-sm font-bold shadow-md shadow-green-700/20 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>+ Create Labour Request</span>
        </button>
      </div>

      {/* Screen Options Tabs */}
      <div className="flex items-center gap-2 border-b border-green-100 pb-2">
        <button
          onClick={() => setActiveSubTab('find')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeSubTab === 'find'
              ? 'bg-[#2E7D32] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Find Nearby Labour
        </button>

        <button
          onClick={() => setActiveSubTab('requests')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeSubTab === 'requests'
              ? 'bg-[#2E7D32] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <span>My Requests</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-green-100 text-green-900 font-bold">
            {myRequests.length}
          </span>
        </button>
      </div>

      {/* Subtab 1: Find Nearby Labour */}
      {activeSubTab === 'find' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-green-950">Nearby Available Labour Squads</h2>
            <span className="text-xs text-green-800 font-medium">Within 10 km radius</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEARBY_LABOUR_CANDIDATES.map((squad) => (
              <div
                key={squad.id}
                className="bg-white rounded-3xl border border-green-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={squad.avatarUrl}
                        alt={squad.name}
                        className="w-12 h-12 rounded-2xl object-cover bg-slate-100 border border-green-100"
                      />
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{squad.name}</h3>
                        <p className="text-xs text-green-800 font-semibold">{squad.workType}</p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        squad.isAvailable
                          ? 'bg-green-100 text-green-900 border border-green-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {squad.isAvailable ? 'Available Now' : 'Busy'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Experience</span>
                      <strong className="text-slate-800 font-bold">{squad.experienceYears} Years</strong>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px]">Distance</span>
                      <strong className="text-slate-800 font-bold">{squad.distanceKm} km</strong>
                    </div>
                    <div className="p-2 bg-green-50 rounded-xl">
                      <span className="text-green-800 block text-[10px]">Daily Wage</span>
                      <strong className="text-green-900 font-bold">₹{squad.dailyWage}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-slate-800">{squad.rating}</span>
                    <span>• {squad.squadSize} Workers</span>
                  </div>

                  <button
                    disabled={!squad.isAvailable || requestedSquadId === squad.id}
                    onClick={() => handleDirectRequestSquad(squad)}
                    className={`py-2 px-5 rounded-xl font-bold text-xs transition-all ${
                      squad.isAvailable
                        ? 'bg-[#2E7D32] hover:bg-green-800 text-white shadow-xs active:scale-95'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {requestedSquadId === squad.id ? 'Requesting...' : 'Request'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: My Requests */}
      {activeSubTab === 'requests' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-green-950">My Posted Labour Requests</h2>
          
          {myRequests.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-green-100 shadow-xs">
              <div className="w-14 h-14 rounded-full bg-green-100 text-[#2E7D32] flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">No active labour requests</h3>
              <p className="text-xs text-slate-500 mt-1">
                Post a requirement for farm workers with your required date and daily wage.
              </p>
              <button
                onClick={() => setShowRequestModal(true)}
                className="mt-4 px-5 py-2.5 bg-[#2E7D32] text-white text-xs font-bold rounded-xl"
              >
                + Create Request
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl border border-green-100 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 rounded-full">
                          {req.jobType}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 mt-1">
                          {req.workersNeeded} Workers Needed
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-900">
                        ₹{req.dailyWagePerWorker} / Day
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-green-700" />
                        <span>Date: <strong>{req.startDate}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-green-700" />
                        <span className="truncate">{req.location}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 p-2 bg-slate-50 rounded-xl leading-relaxed">
                      {req.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-green-700">Status: Active Request</span>
                    <span className="text-slate-400 font-normal">Posted by You</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-200 relative my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-green-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-950">Find Labour</h2>
                  <p className="text-xs text-green-800">Post your work requirements</p>
                </div>
              </div>
              <button
                onClick={() => setShowRequestModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {showSuccessToast && (
              <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-2xl flex items-center gap-2 text-green-900 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-green-700" />
                <span>Labour request created successfully!</span>
              </div>
            )}

            <form onSubmit={handlePostRequest} className="mt-4 space-y-4">
              {/* Work */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Work Type
                </label>
                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium bg-white"
                >
                  <option value="Harvesting">Harvesting</option>
                  <option value="Sowing & Planting">Sowing & Planting</option>
                  <option value="Spraying Pesticides">Spraying Pesticides</option>
                  <option value="Weeding & Cleaning">Weeding & Cleaning</option>
                  <option value="Plowing & Tilling">Plowing & Tilling</option>
                  <option value="Loading & Transport">Loading & Transport</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {/* Workers Needed */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Workers Needed
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={workersNeeded}
                    onChange={(e) => setWorkersNeeded(Number(e.target.value))}
                    placeholder="e.g. 5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Daily Wage */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Daily Wage (₹ / Worker)
                  </label>
                  <input
                    type="number"
                    min="200"
                    required
                    value={dailyWage}
                    onChange={(e) => setDailyWage(Number(e.target.value))}
                    placeholder="e.g. 500"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Required Work Date
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Farm Location / Field
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Plot #2, East Farm"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Work Details & Notes
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Drinking water provided, plucking tomatoes from 8 AM to 4 PM"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:border-green-600 focus:outline-hidden"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-sm shadow-md shadow-green-700/20"
                >
                  Find Labour
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
