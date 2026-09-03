import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  ShoppingBag,
  Sprout,
  CheckCircle2,
  Truck,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Search,
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const {
    currentUser,
    cropListings,
    orders,
    addToCart,
    setActiveTab,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'organic' | 'fruits_veggies' | 'grains'>('all');

  const myOrders = orders.filter((o) => o.buyerId === currentUser.id);

  const filteredProduce = cropListings.filter((item) => {
    const matchesSearch =
      item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedCategory === 'organic') return item.isOrganic;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-orange-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-900/60 text-rose-200 text-xs font-bold border border-rose-500/30">
                100% Farm-to-Kitchen Direct
              </span>
              <span className="text-xs text-rose-100 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Chemical Residue Tested
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              Fresh Harvest Direct from Kisan 🥕
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-xl">
              Support local cultivators and enjoy premium organic vegetables, fruits, and stone-ground grains harvested fresh upon your order.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl text-xs border border-white/20">
            <span className="text-rose-200 block text-[11px]">Delivery Radius</span>
            <span className="text-lg font-extrabold">Within 24 Hours</span>
            <span className="text-[10px] text-rose-100 block mt-0.5">Farm gate to your doorstep</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farm fresh produce, crops, farmer..."
            className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-rose-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Produce
          </button>
          <button
            onClick={() => setSelectedCategory('organic')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-1 shrink-0 ${
              selectedCategory === 'organic'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Organic Certified Only</span>
          </button>
        </div>
      </div>

      {/* Fresh Farm Produce Grid */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Direct From Farm Gate</h3>
          </div>
          <span className="text-xs text-slate-500">{filteredProduce.length} Fresh lots available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProduce.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white hover:border-rose-300 hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.cropName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {item.isOrganic && (
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[10px] font-extrabold bg-emerald-600 text-white rounded-md shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      100% Organic
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.cropName}</h4>
                      <p className="text-xs text-slate-500">{item.variety}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-emerald-800">
                        ₹{item.pricePerQuintal}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/Quintal (₹{(item.pricePerQuintal / 100).toFixed(1)}/kg)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.description}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {item.farmerLocation}
                    </span>
                    <span>Cultivator: <strong className="text-slate-700">{item.farmerName}</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      name: item.cropName,
                      price: item.pricePerQuintal,
                      quantity: 1,
                      unit: 'Quintal',
                      sellerId: item.farmerId,
                      sellerName: item.farmerName,
                      sellerType: 'farmer',
                      imageUrl: item.imageUrl,
                    })
                  }
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Direct from Farmer</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Orders Tracking Section */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">My Farm Orders & Live Dispatch Status</h3>
          </div>
        </div>

        <div className="space-y-3">
          {myOrders.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">No farm orders placed yet.</p>
          ) : (
            myOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Order #{ord.id}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full capitalize">
                      {ord.orderStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Seller / Farm: <strong>{ord.sellerName}</strong>
                  </p>
                  <div className="text-xs text-slate-700 mt-1">
                    {ord.items.map((i) => `${i.name} (${i.quantity} ${i.unit})`).join(', ')}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Estimated Delivery: <strong>{ord.estimatedDeliveryDate}</strong> • Ship to: {ord.shippingAddress}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-emerald-700">
                    ₹{ord.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Paid via Escrow</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};
