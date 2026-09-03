import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Eye,
  X,
} from 'lucide-react';
import { DirectOrder } from '../../types';

export const MyOrdersView: React.FC = () => {
  const { currentUser, orders, setActiveTab } = useApp();

  const [activeTab, setActiveTabState] = useState<'buying' | 'selling'>('buying');
  const [selectedOrder, setSelectedOrder] = useState<DirectOrder | null>(null);

  // Orders where the farmer is the buyer (buying seeds, fertilizers, tools)
  const buyingOrders = orders.filter((o) => o.buyerId === currentUser.id);

  // Orders where the farmer is the seller (selling tomatoes, wheat, biomass)
  const sellingOrders = orders.filter((o) => o.sellerId === currentUser.id);

  const getStatusPill = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return {
          label: 'Delivered',
          classes: 'bg-green-100 text-green-900 border-green-300',
        };
      case 'in_transit':
      case 'on the way':
        return {
          label: 'On the Way',
          classes: 'bg-blue-100 text-blue-900 border-blue-300',
        };
      case 'accepted':
      case 'confirmed':
        return {
          label: 'Accepted',
          classes: 'bg-purple-100 text-purple-900 border-purple-300',
        };
      case 'dispatched':
        return {
          label: 'Dispatched',
          classes: 'bg-teal-100 text-teal-900 border-teal-300',
        };
      default:
        return {
          label: 'Placed',
          classes: 'bg-amber-100 text-amber-900 border-amber-300',
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-green-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-green-100 text-[#2E7D32] flex items-center justify-center">
              <FileText className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-950">My Orders</h1>
              <p className="text-xs sm:text-sm text-green-800 font-medium">
                Track products you bought and crops you sold
              </p>
            </div>
          </div>
        </div>

        {/* Buying vs Selling Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTabState('buying')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'buying'
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Buying Orders ({buyingOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTabState('selling')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'selling'
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Selling Orders ({sellingOrders.length})</span>
          </button>
        </div>
      </div>

      {/* Orders List */}
      {activeTab === 'buying' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-green-950">Farm Products & Seeds Ordered</h2>
            <button
              onClick={() => setActiveTab('farmer_supplies')}
              className="text-xs font-bold text-green-700 hover:underline"
            >
              + Buy More Products
            </button>
          </div>

          {buyingOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-green-100 shadow-xs">
              <Package className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No buying orders yet</p>
              <button
                onClick={() => setActiveTab('farmer_supplies')}
                className="mt-3 px-4 py-2 bg-[#2E7D32] text-white text-xs font-bold rounded-xl"
              >
                Browse Farm Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buyingOrders.map((order) => {
                const statusInfo = getStatusPill(order.orderStatus);
                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-green-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Order #{order.id.slice(-6)}
                          </span>
                          <h3 className="font-bold text-base text-slate-900 mt-0.5">{order.items?.[0]?.name || 'Farm Supply Order'}</h3>
                          <p className="text-xs text-slate-500">Seller: <strong className="text-slate-700">{order.sellerName}</strong></p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.classes}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl">
                          <span className="text-slate-400 block text-[10px]">Quantity</span>
                          <strong className="text-slate-800 font-bold">{order.items?.[0]?.quantity || 1} {order.items?.[0]?.unit || 'units'}</strong>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl">
                          <span className="text-green-800 block text-[10px]">Total Price</span>
                          <strong className="text-green-900 font-bold text-sm">₹{order.totalAmount}</strong>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
                        <span>Ordered: {order.createdAt || '2026-09-01'}</span>
                        <span className="capitalize text-slate-700">Payment: {order.paymentStatus || 'Cash on Delivery'}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <div className="flex items-center gap-1 text-xs text-green-700 font-bold">
                        <Truck className="w-4 h-4" />
                        <span>{statusInfo.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-green-950">Crop Harvest Sold to Buyers</h2>
            <button
              onClick={() => setActiveTab('farmer_sell')}
              className="text-xs font-bold text-green-700 hover:underline"
            >
              + Sell More Produce
            </button>
          </div>

          {sellingOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center border border-green-100 shadow-xs">
              <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No selling orders yet</p>
              <button
                onClick={() => setActiveTab('farmer_sell')}
                className="mt-3 px-4 py-2 bg-[#2E7D32] text-white text-xs font-bold rounded-xl"
              >
                List Crop for Sale
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sellingOrders.map((order) => {
                const statusInfo = getStatusPill(order.orderStatus);
                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-green-100 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            Sale #{order.id.slice(-6)}
                          </span>
                          <h3 className="font-bold text-base text-slate-900 mt-0.5">{order.items?.[0]?.name || 'Produce Dispatched'}</h3>
                          <p className="text-xs text-slate-500">Buyer: <strong className="text-slate-700">{order.buyerName}</strong></p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.classes}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        <div className="p-3 bg-slate-50 rounded-xl">
                          <span className="text-slate-400 block text-[10px]">Dispatched Quantity</span>
                          <strong className="text-slate-800 font-bold">{order.items?.[0]?.quantity || 10} {order.items?.[0]?.unit || 'kg'}</strong>
                        </div>
                        <div className="p-3 bg-green-50 rounded-xl">
                          <span className="text-green-800 block text-[10px]">Payment to Receive</span>
                          <strong className="text-green-900 font-bold text-sm">₹{order.totalAmount}</strong>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
                        <span>Dispatch Date: {order.createdAt || '2026-09-02'}</span>
                        <span className="text-green-700 font-semibold">Direct Mandi Settlement</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <div className="flex items-center gap-1 text-xs text-green-700 font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Payment Assured</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-green-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Order Receipt</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedOrder.items?.[0]?.name || 'Farm Order'}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-bold text-slate-800">#{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Buyer / Seller:</span>
                  <span className="font-bold text-slate-800">{selectedOrder.sellerName} / {selectedOrder.buyerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="font-semibold text-slate-800 text-right">{selectedOrder.shippingAddress || 'Panchot Farm, Mehsana'}</span>
                </div>
              </div>

              <div className="p-3.5 bg-green-50 rounded-xl border border-green-200 flex justify-between items-center">
                <span className="text-green-950 font-bold">Total Bill:</span>
                <strong className="text-xl font-extrabold text-green-950">₹{selectedOrder.totalAmount}</strong>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
