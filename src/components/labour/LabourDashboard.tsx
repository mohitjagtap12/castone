import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  MapPin,
  Calendar,
  CheckCircle2,
  Phone,
  Clock,
  Briefcase,
  UserCheck,
  ShieldCheck,
  DollarSign,
} from 'lucide-react';

export const LabourDashboard: React.FC = () => {
  const { currentUser, labourJobs, applyToLabourJob, updateLabourJobStatus } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'available' | 'my_jobs'>('available');

  const availableJobs = labourJobs.filter((j) => j.status === 'open');
  const myAssignedJobs = labourJobs.filter((j) => j.assignedLabourId === currentUser.id || j.status === 'assigned');

  const totalEarningsEstimate = myAssignedJobs.reduce(
    (sum, j) => sum + j.dailyWagePerWorker * j.workersNeeded * j.durationDays,
    0
  );

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-yellow-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 text-amber-200 text-xs font-bold border border-amber-500/30">
                Squad Leader Portal
              </span>
              <span className="text-xs text-amber-100 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {currentUser.location.district}, {currentUser.location.state}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              {currentUser.labourDetails?.squadName || currentUser.name} 🌾
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-xl">
              Squad of {currentUser.labourDetails?.memberCount || 10} verified farm workers. View nearby harvesting, sowing, and spraying farm assignments.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl text-xs border border-white/20">
            <span className="text-amber-200 block text-[11px]">Standard Daily Rate</span>
            <span className="text-lg font-extrabold">₹{currentUser.labourDetails?.dailyWagePerWorker || 450} / day</span>
            <span className="text-[10px] text-amber-100 block mt-0.5">Per squad member</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Available Farm Jobs</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{availableJobs.length} Nearby</p>
          <p className="text-[10px] text-amber-600 font-semibold mt-0.5">Within 25km radius</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Assignments</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{myAssignedJobs.length} In Progress</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Confirmed with farmers</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Estimated Squad Payout</span>
          <p className="text-xl font-extrabold text-emerald-700 mt-1">₹{totalEarningsEstimate.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Direct bank transfer</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Squad Reliability</span>
          <p className="text-xl font-extrabold text-amber-700 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            100% Verified
          </p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Aadhaar KYC linked squad</p>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTabFilter('available')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTabFilter === 'available'
              ? 'bg-amber-700 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Available Nearby Jobs ({availableJobs.length})
        </button>
        <button
          onClick={() => setActiveTabFilter('my_jobs')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
            activeTabFilter === 'my_jobs'
              ? 'bg-amber-700 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          My Active Assignments ({myAssignedJobs.length})
        </button>
      </div>

      {/* Job Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(activeTabFilter === 'available' ? availableJobs : myAssignedJobs).map((job) => {
          const isAssignedToMe = job.assignedLabourId === currentUser.id;
          const totalJobValue = job.dailyWagePerWorker * job.workersNeeded * job.durationDays;

          return (
            <div
              key={job.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 hover:shadow-md transition-all space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        job.status === 'assigned'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {job.status === 'assigned' ? 'Assigned' : 'Open Requirement'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Crop: {job.cropType}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{job.jobType}</h3>
                  <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    Farmer: <strong>{job.farmerName}</strong> ({job.farmerPhone})
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-amber-800 block">
                    ₹{job.dailyWagePerWorker}/day
                  </span>
                  <span className="text-[10px] text-slate-500">Per worker</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50/50 rounded-xl space-y-1.5 text-xs text-slate-700 border border-amber-200/40">
                <div className="flex justify-between">
                  <span>Squad Size Required:</span>
                  <strong>{job.workersNeeded} Workers</strong>
                </div>
                <div className="flex justify-between">
                  <span>Start Date & Duration:</span>
                  <span>{job.startDate} ({job.durationDays} Days)</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Assignment Value:</span>
                  <strong className="text-emerald-700">₹{totalJobValue.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex items-start gap-1.5 pt-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{job.location}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600">{job.description}</p>

              <div className="pt-2 flex items-center justify-between">
                {job.status === 'open' ? (
                  <button
                    onClick={() => applyToLabourJob(job.id)}
                    className="w-full py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Accept Job for My Squad</span>
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Assigned to {job.assignedLabourName}
                    </span>
                    <button
                      onClick={() => updateLabourJobStatus(job.id, 'completed')}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs"
                    >
                      Mark Work Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
