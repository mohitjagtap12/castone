import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoreProduct } from '../../types';
import {
  Store,
  Package,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  Truck,
  CheckCircle2,
  ShoppingBag,
  Star,
  FileText,
} from 'lucide-react';

export const StoreDashboard: React.FC = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    storeProducts,
    addStoreProduct,
    deleteStoreProduct,
    updateStoreProduct,
    orders,
    updateOrderStatus,
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);

  const [form, setForm] = useState({
    name: 'Certified Hybrid Cotton Seeds (Bollgard II)',
    category: 'seeds' as const,
    brand: 'Mahyco Gold Seeds',
    description: 'High germination rate, drought resistant, high boll retention and sucking pest tolerance.',
    price: 920,
    unit: 'packet (450g)',
    stockQuantity: 150,
    imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&auto=format&fit=crop&q=80',
    isCertified: true,
  });

  const myProducts = storeProducts.filter((p) => p.storeId === currentUser.id);
  const myOrders = orders.filter((o) => o.sellerId === currentUser.id || o.sellerType === 'store');

  const totalRevenue = myOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateStoreProduct(editingProduct.id, form);
      setEditingProduct(null);
    } else {
      addStoreProduct(form);
    }
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-cyan-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-900/60 text-blue-200 text-xs font-bold border border-blue-500/30">
                Agri-Store Enterprise
              </span>
              <span className="text-xs text-blue-100">{currentUser.storeDetails?.licenseNumber || 'License: GJ-AGRI-44910'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
              {currentUser.storeDetails?.storeName || currentUser.name} 🏪
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Manage your agricultural inventory, fertilizers, seeds, and dispatch farmer orders with guaranteed rural courier delivery.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddModal(true);
            }}
            className="px-4 py-2.5 bg-white text-blue-900 font-bold text-xs rounded-xl shadow-md hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-blue-700" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Listed Products</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{myProducts.length} Items</p>
          <p className="text-[10px] text-blue-600 font-semibold mt-0.5">Seeds, fertilizers & tools</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Sales Revenue</span>
          <p className="text-xl font-extrabold text-emerald-700 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Direct farmer orders</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Customer Orders</span>
          <p className="text-xl font-extrabold text-slate-900 mt-1">{myOrders.length} Received</p>
          <p className="text-[10px] text-purple-600 font-semibold mt-0.5">Dispatched via AgroWorld fleet</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase">Store Rating</span>
          <p className="text-xl font-extrabold text-amber-600 mt-1 flex items-center gap-1">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            4.9 / 5.0
          </p>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Based on 148 farmer reviews</p>
        </div>
      </div>

      {/* Inventory Management Table / Grid */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Inventory Catalog</h3>
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddModal(true);
            }}
            className="px-3 py-1.5 bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 hover:bg-blue-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                {prod.imageUrl && (
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-36 object-cover rounded-xl mb-2"
                  />
                )}
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm capitalize">
                    {prod.category}
                  </span>
                  <span className="text-xs font-extrabold text-blue-700">₹{prod.price}/{prod.unit}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1.5">{prod.name}</h4>
                <p className="text-xs text-slate-500">{prod.brand}</p>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{prod.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Stock: <strong>{prod.stockQuantity} {prod.unit}</strong></span>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setEditingProduct(prod);
                      setForm({
                        name: prod.name,
                        category: prod.category,
                        brand: prod.brand,
                        description: prod.description,
                        price: prod.price,
                        unit: prod.unit,
                        stockQuantity: prod.stockQuantity,
                        imageUrl: prod.imageUrl || '',
                        isCertified: prod.isCertified,
                      });
                      setShowAddModal(true);
                    }}
                    className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteStoreProduct(prod.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Store Orders List */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Recent Customer Orders & Dispatch</h3>
          </div>
        </div>

        <div className="space-y-3">
          {myOrders.map((ord) => (
            <div key={ord.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Order #{ord.id}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full capitalize">
                    {ord.orderStatus}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Buyer: <strong>{ord.buyerName}</strong> ({ord.buyerPhone})
                </p>
                <p className="text-[11px] text-slate-500">Destination: {ord.shippingAddress}</p>
                <div className="text-xs text-slate-700 mt-1">
                  {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                <span className="text-sm font-extrabold text-emerald-700">₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                <div className="flex gap-2">
                  {ord.orderStatus === 'placed' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'dispatched')}
                      className="px-3 py-1 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-lg shadow-xs"
                    >
                      Mark Dispatched
                    </button>
                  )}
                  {ord.orderStatus === 'dispatched' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'delivered')}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs"
                    >
                      Confirm Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add Store Inventory Item'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="seeds">Seeds & Hybrids</option>
                    <option value="fertilizers">Bio-Fertilizers & Nutrients</option>
                    <option value="pesticides">Crop Protection / Pesticides</option>
                    <option value="tools">Tools & Drip Irrigation</option>
                    <option value="machinery">Machinery & Spray Pumps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    required
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    placeholder="e.g. 50kg bag, 1L bottle"
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stock Qty</label>
                  <input
                    type="number"
                    required
                    value={form.stockQuantity}
                    onChange={(e) => setForm({ ...form, stockQuantity: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                {editingProduct ? 'Update Product' : 'Publish Product to Store'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
