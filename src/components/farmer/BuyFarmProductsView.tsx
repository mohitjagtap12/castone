import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Search,
  ShoppingCart,
  Eye,
  CheckCircle2,
  MapPin,
  Star,
  X,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { StoreProduct } from '../../types';

const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'seeds', name: 'Seeds' },
  { id: 'fertilizers', name: 'Fertilizers' },
  { id: 'medicines', name: 'Crop Medicines' },
  { id: 'tools', name: 'Tools' },
  { id: 'machines', name: 'Farm Machines' },
  { id: 'water', name: 'Water Equipment' },
];

export const BuyFarmProductsView: React.FC = () => {
  const { storeProducts, addToCart, cart } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingProduct, setViewingProduct] = useState<StoreProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  const filteredProducts = storeProducts.filter((p) => {
    const matchesCat =
      selectedCategory === 'all' ||
      (selectedCategory === 'seeds' && p.category?.toLowerCase().includes('seed')) ||
      (selectedCategory === 'fertilizers' && p.category?.toLowerCase().includes('fertilizer')) ||
      (selectedCategory === 'medicines' && (p.category?.toLowerCase().includes('pesticide') || p.category?.toLowerCase().includes('medicine') || p.category?.toLowerCase().includes('fungicide'))) ||
      (selectedCategory === 'tools' && p.category?.toLowerCase().includes('tool')) ||
      (selectedCategory === 'machines' && (p.category?.toLowerCase().includes('machine') || p.category?.toLowerCase().includes('equipment'))) ||
      (selectedCategory === 'water' && (p.category?.toLowerCase().includes('irrigation') || p.category?.toLowerCase().includes('water')));

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.storeName?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (prod: StoreProduct, qty: number = 1) => {
    addToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      quantity: qty,
      unit: prod.unit || 'pack',
      sellerId: prod.storeId,
      sellerName: prod.storeName,
      sellerType: 'store',
      imageUrl: prod.imageUrl,
    });
    setAddedProductId(prod.id);
    setTimeout(() => {
      setAddedProductId(null);
      setViewingProduct(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-green-100 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Package className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-950">Buy Farm Products</h1>
              <p className="text-xs sm:text-sm text-green-800 font-medium">
                Certified seeds, fertilizers, crop medicines, tools & irrigation equipment
              </p>
            </div>
          </div>
        </div>

        {/* Cart Quick Status */}
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-2xl border border-green-200">
          <ShoppingCart className="w-4 h-4 text-green-700" />
          <span className="text-xs font-bold text-green-900">
            Cart: {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="bg-white p-4 rounded-3xl border border-green-100 shadow-xs space-y-3">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search seeds, fertilizers, sprayers..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-sm focus:border-green-600 focus:outline-hidden font-medium bg-slate-50/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-green-100 shadow-xs">
          <p className="text-sm font-bold text-slate-800">No products found matching your search</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 bg-green-100 text-green-900 text-xs font-bold rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-green-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={prod.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                      {prod.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-xs text-white text-xs font-bold">
                    ₹{prod.price} / {prod.unit || 'pack'}
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs text-slate-600">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">{prod.name}</h3>

                  <div className="flex items-center justify-between text-slate-500">
                    <span>Seller: <strong className="text-slate-800">{prod.storeName}</strong></span>
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {prod.rating || 4.8}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-green-700" />
                    <span className="truncate">Mehsana Mandi Market Center</span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed pt-1">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons: View, Buy */}
              <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <button
                    onClick={() => {
                      setModalQuantity(1);
                      setViewingProduct(prod);
                    }}
                    className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => handleAddToCart(prod, 1)}
                    className="py-2.5 px-3 bg-[#2E7D32] hover:bg-green-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-xs active:scale-95"
                  >
                    {addedProductId === prod.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Buy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-green-100 relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{viewingProduct.name}</h3>
              <button
                onClick={() => setViewingProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="h-48 w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={viewingProduct.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'}
                  alt={viewingProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-green-50 rounded-2xl border border-green-200">
                <div>
                  <span className="text-xs text-green-800 font-bold block">Price per {viewingProduct.unit || 'unit'}</span>
                  <strong className="text-xl font-extrabold text-green-950">₹{viewingProduct.price}</strong>
                </div>
                <div className="text-right text-xs">
                  <span className="text-slate-500 block">Available In Stock:</span>
                  <span className="font-bold text-slate-800">{viewingProduct.stockQuantity || 45} {viewingProduct.unit || 'packs'}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <span className="font-bold text-slate-800 block">Description & Instructions:</span>
                <p className="p-3 bg-slate-50 rounded-xl leading-relaxed text-slate-700">
                  {viewingProduct.description}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <p><span className="text-slate-500">Seller:</span> <strong className="text-slate-800">{viewingProduct.storeName}</strong></p>
                <p><span className="text-slate-500">Location:</span> <span className="text-slate-700">{viewingProduct.location || 'Mehsana Main Market'}</span></p>
                <p><span className="text-slate-500">Brand / Maker:</span> <span className="text-slate-700">{viewingProduct.brand || 'Certified Agro Supply'}</span></p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-700">Select Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setModalQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm text-slate-900 w-6 text-center">{modalQuantity}</span>
                  <button
                    onClick={() => setModalQuantity((prev) => prev + 1)}
                    className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(viewingProduct, modalQuantity)}
                className="w-full py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-sm shadow-md shadow-green-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart (Total: ₹{viewingProduct.price * modalQuantity})</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
