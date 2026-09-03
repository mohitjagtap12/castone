import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Plus,
  MessageSquare,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Send,
  Building2,
  DollarSign,
  ArrowRightLeft,
} from 'lucide-react';

export const TraderDashboard: React.FC = () => {
  const {
    currentUser,
    traderDemands,
    createTraderDemand,
    negotiations,
    respondNegotiation,
    mandiRates,
  } = useApp();

  const [showDemandModal, setShowDemandModal] = useState(false);
  const [selectedDealForCounter, setSelectedDealForCounter] = useState<string | null>(null);
  const [counterPriceInput, setCounterPriceInput] = useState<number>(5550);
  const [counterMessage, setCounterMessage] = useState<string>('Revised counter offer based on today mandi yard arrival.');

  const [demandForm, setDemandForm] = useState({
    cropName: 'Castor Seed (Divela)',
    requiredQuantityQuintals: 150,
    offeredPricePerQuintal: 5650,
    mandiName: 'Mehsana APMC Market Yard #1',
    deliveryDate: '2026-09-18',
    description: 'Looking for dry clean seed lot with oil content > 48%, moisture < 8%. Immediate weighbridge cash/RTGS.',
  });

  const myDemands = traderDemands.filter((d) => d.traderId === currentUser.id);
  const myNegotiations = negotiations.filter((n) => n.traderId === currentUser.id);

  const handleDemandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTraderDemand(demandForm);
    setShowDemandModal(false);
  };

  const handleSendCounter = (dealId: string) => {
    respondNegotiation(dealId, 'counter', counterPriceInput, counterMessage);
    setSelectedDealForCounter(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-900/60 text-teal-200 text-xs font-bold border border-teal-500/30">
                APMC Mandi Commission Trader
              </span>
              <span className="text-xs text-teal-100">{currentUser.traderDetails?.mandiLicenseNumber || 'APMC-MEH-B772'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              {currentUser.traderDetails?.mandiName || currentUser.name} 📈
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
              Post bulk commodity procurement demands, negotiate prices directly with registered farmers, and settle APMC gate deliveries.
            </p>
          </div>

          <button
            onClick={() => setShowDemandModal(true)}
            className="px-4 py-2.5 bg-white text-teal-900 font-bold text-xs rounded-xl shadow-md hover:bg-teal-50 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-teal-700" />
            <span>Post Mandi Bulk Demand</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Bulk Demands</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{myDemands.length} Broadcasted</p>
          <p className="text-[10px] text-teal-600 font-semibold mt-0.5">Across Gujarat APMCs</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Live Negotiations</span>
          <p className="text-xl font-extrabold text-teal-700 mt-1">{myNegotiations.length} Active Deals</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Direct farmer bids</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Procured This Month</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">480 Quintals</p>
          <p className="text-[10px] text-blue-600 font-semibold mt-0.5">Castor, Wheat & Cumin</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">APMC Mandi Status</span>
          <p className="text-xl font-extrabold text-emerald-700 mt-1">Yard Open</p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Live e-NAM integrated</p>
        </div>
      </div>

      {/* Live Digital Negotiations Board */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">Live Farmer Price Negotiations</h3>
          </div>
          <span className="text-xs text-slate-500">{myNegotiations.length} Active Threads</span>
        </div>

        <div className="space-y-4">
          {myNegotiations.map((deal) => (
            <div
              key={deal.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{deal.cropName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                        deal.status === 'deal_accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : deal.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {deal.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Farmer: <strong>{deal.farmerName}</strong> • Volume: <strong>{deal.quantityQuintals} Quintals</strong>
                  </p>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-2">
                      ₹{deal.initialOfferPrice}
                    </span>
                    <span className="text-base font-extrabold text-teal-800">
                      Current: ₹{deal.currentOfferPrice}/Qtl
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat / Negotiation Log */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 max-h-40 overflow-y-auto">
                {deal.history.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col text-xs p-2 rounded-lg ${
                      msg.sender === 'trader'
                        ? 'bg-teal-50 border border-teal-100 ml-6 text-teal-950'
                        : 'bg-slate-100 mr-6 text-slate-800'
                    }`}
                  >
                    <div className="flex justify-between font-bold text-[10px] text-slate-500">
                      <span>{msg.sender === 'trader' ? 'You (Trader)' : deal.farmerName}</span>
                      <span>₹{msg.price}/Qtl • {msg.timestamp}</span>
                    </div>
                    {msg.message && <p className="mt-0.5">{msg.message}</p>}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {deal.status.startsWith('pending') && (
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-slate-500">
                    Last offer by: <strong className="capitalize">{deal.lastOfferBy}</strong>
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => respondNegotiation(deal.id, 'accept')}
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Accept Deal @ ₹{deal.currentOfferPrice}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDealForCounter(deal.id);
                        setCounterPriceInput(deal.currentOfferPrice + 50);
                      }}
                      className="px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Make Counter-Offer</span>
                    </button>

                    <button
                      onClick={() => respondNegotiation(deal.id, 'reject')}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              )}

              {deal.status === 'deal_accepted' && (
                <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Deal finalized at ₹{deal.dealFinalPrice}/Qtl. Farmer authorized for gate-in delivery.
                  </span>
                  <span className="text-[11px] text-emerald-700">Ready for APMC Weighbridge</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Broadcasted Demands Grid */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900">My Broadcasted Bulk Demands</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myDemands.map((demand) => (
            <div key={demand.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-sm">
                    {demand.mandiName}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{demand.cropName}</h4>
                </div>
                <span className="text-xs font-extrabold text-teal-800">
                  ₹{demand.offeredPricePerQuintal}/Qtl
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Required Quantity:</span>
                  <strong>{demand.requiredQuantityQuintals} Quintals</strong>
                </div>
                <div className="flex justify-between">
                  <span>Target Delivery Date:</span>
                  <span>{demand.deliveryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Offers Received:</span>
                  <strong className="text-emerald-700">{demand.offersCount} Bids</strong>
                </div>
              </div>

              <p className="text-xs text-slate-500 pt-2 border-t border-slate-200">{demand.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mandi Rates Live APMC Ticker */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">APMC Mandi Commodity Rates (e-NAM Linked)</h3>
          </div>
          <span className="text-xs text-slate-500">Updated every 15 minutes</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3 rounded-l-xl">Commodity</th>
                <th className="p-3">APMC Mandi</th>
                <th className="p-3">Modal Price</th>
                <th className="p-3">Min - Max Price</th>
                <th className="p-3">Daily Arrival</th>
                <th className="p-3 rounded-r-xl">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {mandiRates.map((mr) => (
                <tr key={mr.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{mr.commodity}</td>
                  <td className="p-3">{mr.mandi}, {mr.state}</td>
                  <td className="p-3 font-extrabold text-emerald-700">₹{mr.modalPrice.toLocaleString('en-IN')}/{mr.unit}</td>
                  <td className="p-3 text-slate-500">₹{mr.minPrice} - ₹{mr.maxPrice}</td>
                  <td className="p-3 font-medium">{mr.arrivalTons} Tons</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 font-bold ${
                        mr.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {mr.trend === 'up' ? '▲' : '▼'} {Math.abs(mr.changePercent)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Post Demand Modal */}
      {showDemandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Broadcast Bulk APMC Demand</h3>
              <button onClick={() => setShowDemandModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleDemandSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Commodity Name</label>
                <input
                  type="text"
                  required
                  value={demandForm.cropName}
                  onChange={(e) => setDemandForm({ ...demandForm, cropName: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Quantity (Quintals)</label>
                  <input
                    type="number"
                    required
                    value={demandForm.requiredQuantityQuintals}
                    onChange={(e) => setDemandForm({ ...demandForm, requiredQuantityQuintals: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Offer Price / Quintal (₹)</label>
                  <input
                    type="number"
                    required
                    value={demandForm.offeredPricePerQuintal}
                    onChange={(e) => setDemandForm({ ...demandForm, offeredPricePerQuintal: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">APMC Mandi Yard Location</label>
                <input
                  type="text"
                  required
                  value={demandForm.mandiName}
                  onChange={(e) => setDemandForm({ ...demandForm, mandiName: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quality & Grade Criteria</label>
                <textarea
                  rows={2}
                  value={demandForm.description}
                  onChange={(e) => setDemandForm({ ...demandForm, description: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Broadcast Demand to Farmers
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Counter-Offer Modal */}
      {selectedDealForCounter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Send Counter-Offer</h3>
              <button onClick={() => setSelectedDealForCounter(null)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Counter Price (₹/Qtl)</label>
                <input
                  type="number"
                  value={counterPriceInput}
                  onChange={(e) => setCounterPriceInput(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl font-bold text-teal-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message for Farmer</label>
                <textarea
                  rows={2}
                  value={counterMessage}
                  onChange={(e) => setCounterMessage(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                onClick={() => handleSendCounter(selectedDealForCounter)}
                className="w-full mt-2 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Submit Counter-Offer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
