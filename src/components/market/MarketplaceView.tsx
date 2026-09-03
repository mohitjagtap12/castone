import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Sprout,
  Package,
  Flame,
  Building2,
  TrendingUp,
  Search,
  Sparkles,
  MapPin,
  Star,
  CheckCircle2,
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const {
    cropListings,
    storeProducts,
    agriWasteListings,
    contracts,
    mandiRates,
    addToCart,
    applyToContract,
  } = useApp();

  const [activeMarketTab, setActiveMarketTab] = useState<'all' | 'produce' | 'supplies' | 'waste' | 'contracts' | 'mandi'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProduce = cropListings.filter((c) =>
    c.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.farmerLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSupplies = storeProducts.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWaste = agriWasteListings.filter((w) =>
    w.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.locationVillage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold mb-3">
            <ShoppingBag className="w-3.5 h-3.5 text-yellow-300" />
            <span>Unified Agricultural Commerce Exchange</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
            AgroWorld Market Exchange
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-2xl">
            Direct farmer produce, certified seeds and bio-fertilizers, agri-waste biomass, and corporate buyback contracts in one connected marketplace.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crops, seeds, fertilizers, biomass..."
              className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>

          {/* Market Sub-tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'produce', label: 'Fresh Produce' },
              { id: 'supplies', label: 'Store Supplies' },
              { id: 'waste', label: 'Biomass / Waste' },
              { id: 'contracts', label: 'Contracts' },
              { id: 'mandi', label: 'Mandi Rates' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMarketTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors shrink-0 ${
                  activeMarketTab === tab.id
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fresh Produce Section */}
      {(activeMarketTab === 'all' || activeMarketTab === 'produce') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Direct Farm Fresh Produce</h3>
            </div>
            <span className="text-xs text-slate-500">{filteredProduce.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProduce.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.cropName} className="w-full h-36 object-cover" />
                  )}
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{item.cropName}</h4>
                        <p className="text-xs text-slate-500">{item.variety}</p>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        ₹{item.pricePerQuintal}/Qtl
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{item.description}</p>
                    <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
                      <span>Farmer: <strong>{item.farmerName}</strong></span>
                      <span>{item.farmerLocation}</span>
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
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                  >
                    + Add to Basket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agri Store Supplies Section */}
      {(activeMarketTab === 'all' || activeMarketTab === 'supplies') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">Certified Agri-Store Supplies & Inputs</h3>
            </div>
            <span className="text-xs text-slate-500">{filteredSupplies.length} Products</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSupplies.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {prod.imageUrl && (
                    <img src={prod.imageUrl} alt={prod.name} className="w-full h-32 object-cover rounded-xl mb-2" />
                  )}
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm capitalize">
                    {prod.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{prod.name}</h4>
                  <p className="text-[11px] text-slate-500">{prod.brand} • by {prod.storeName}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-blue-800">₹{prod.price}/{prod.unit}</span>
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
                    className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Agri Waste / Biomass Section */}
      {(activeMarketTab === 'all' || activeMarketTab === 'waste') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <h3 className="text-base font-bold text-slate-900">Agri-Waste & Biomass Parali Lots</h3>
            </div>
            <span className="text-xs text-slate-500">{filteredWaste.length} Lots</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWaste.map((waste) => (
              <div
                key={waste.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-orange-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-sm">
                      {waste.isBaled ? 'Baled Biomass' : 'Loose'}
                    </span>
                    <span className="text-xs font-extrabold text-orange-700">₹{waste.pricePerTonne}/Tonne</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{waste.wasteType}</h4>
                  <p className="text-xs text-slate-500">Farmer: {waste.farmerName} ({waste.locationVillage})</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
                  <span>Available: <strong>{waste.quantityTonnes} Tonnes</strong></span>
                  <button
                    onClick={() =>
                      addToCart({
                        id: waste.id,
                        name: `${waste.wasteType} (${waste.quantityTonnes}T)`,
                        price: waste.pricePerTonne * waste.quantityTonnes,
                        quantity: 1,
                        unit: 'Lot',
                        sellerId: waste.farmerId,
                        sellerName: waste.farmerName,
                        sellerType: 'waste_seller',
                      })
                    }
                    className="px-3 py-1 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-lg text-xs"
                  >
                    Procure Lot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mandi Rates Table */}
      {(activeMarketTab === 'all' || activeMarketTab === 'mandi') && (
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">APMC Mandi Daily Commodity Rates</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Commodity</th>
                  <th className="p-3">Mandi Yard</th>
                  <th className="p-3">Modal Rate</th>
                  <th className="p-3">Min - Max</th>
                  <th className="p-3">Daily Arrival</th>
                  <th className="p-3">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {mandiRates.map((mr) => (
                  <tr key={mr.id}>
                    <td className="p-3 font-bold text-slate-900">{mr.commodity}</td>
                    <td className="p-3">{mr.mandi}, {mr.state}</td>
                    <td className="p-3 font-extrabold text-emerald-700">₹{mr.modalPrice}/{mr.unit}</td>
                    <td className="p-3 text-slate-500">₹{mr.minPrice} - ₹{mr.maxPrice}</td>
                    <td className="p-3">{mr.arrivalTons} Tons</td>
                    <td className="p-3 font-bold text-emerald-600">
                      {mr.trend === 'up' ? '▲' : '▼'} {Math.abs(mr.changePercent)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

    </div>
  );
};
