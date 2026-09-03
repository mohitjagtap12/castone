import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sprout,
  ShoppingBag,
  Bell,
  HelpCircle,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Store,
  Users,
  Building2,
  TrendingUp,
  User,
  Flame,
  Truck,
  ShieldAlert,
  X,
  CheckCircle2,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export const ROLE_CONFIGS: Record<
  UserRole,
  { name: string; icon: React.ElementType; color: string; bg: string; badgeColor: string; description: string }
> = {
  farmer: {
    name: 'Farmer',
    icon: Sprout,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Manage crops, detect diseases with AI, sell produce & biomass, hire farm squad.',
  },
  store: {
    name: 'Agri-Store Seller',
    icon: Store,
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Sell certified seeds, fertilizers, pesticides, and modern farm equipment.',
  },
  labour: {
    name: 'Labour & Farm Squad',
    icon: Users,
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Find harvesting, sowing, and spraying jobs with transparent daily wages.',
  },
  contract_company: {
    name: 'Contract Farming Company',
    icon: Building2,
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Publish assured buyback crop contracts and manage farmer procurement.',
  },
  trader: {
    name: 'APMC Broker / Trader',
    icon: TrendingUp,
    color: 'text-teal-700',
    bg: 'bg-teal-50 border-teal-200',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Create bulk mandi demands and negotiate deals directly with farmers.',
  },
  customer: {
    name: 'Customer / Direct Buyer',
    icon: User,
    color: 'text-rose-700',
    bg: 'bg-rose-50 border-rose-200',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Buy fresh, pesticide-tested produce direct from local organic farms.',
  },
  biomass_buyer: {
    name: 'Agri Waste & Biomass Buyer',
    icon: Flame,
    color: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    description: 'Procure straw, parali, and husk for bio-ethanol, power, and pellet plants.',
  },
  delivery: {
    name: 'Delivery Partner',
    icon: Truck,
    color: 'text-indigo-700',
    bg: 'bg-indigo-50 border-indigo-200',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Accept farm-to-mandi and store cargo deliveries with guaranteed trip earnings.',
  },
  admin: {
    name: 'System Admin',
    icon: ShieldAlert,
    color: 'text-slate-800',
    bg: 'bg-slate-100 border-slate-300',
    badgeColor: 'bg-slate-200 text-slate-900 border-slate-400',
    description: 'Verify businesses, moderate listings, configure mandi rates & system rules.',
  },
};

export const Header: React.FC = () => {
  const {
    currentUser,
    currentRole,
    switchRole,
    activeTab,
    setActiveTab,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    cart,
    removeFromCart,
    updateCartQuantity,
    checkoutCart,
    logout,
  } = useApp();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const currentRoleConfig = ROLE_CONFIGS[currentRole] || ROLE_CONFIGS.farmer;
  const RoleIcon = currentRoleConfig.icon;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    const orderId = await checkoutCart(checkoutAddress);
    setIsCheckingOut(false);
    setOrderSuccessId(orderId);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2.5 group focus:outline-none"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                  <Sprout className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xl tracking-tight text-slate-900">
                      AGRO<span className="text-emerald-600">WORLD</span>
                    </span>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-sm">
                      PRO
                    </span>
                  </div>
                  <p className="text-[10px] font-medium text-slate-500 hidden md:block tracking-wide">
                    Integrated Agri-Commerce & Farm Services
                  </p>
                </div>
              </button>
            </div>

            {/* Middle Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('market')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'market'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                Agro Market
              </button>
              <button
                onClick={() => setActiveTab('ai_doctor')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'ai_doctor'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                AI Crop Doctor
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-slate-500" />
                Messages
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'help'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-slate-500" />
                Help & FAQs
              </button>
            </nav>

            {/* Right Action Icons & Role Switcher */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Notifications Popover */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifs(!showNotifs);
                    setShowRoleDropdown(false);
                    setShowCart(false);
                  }}
                  className="relative p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors focus:outline-none"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifs && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">Notifications</span>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                          {unreadCount} new
                        </span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-xs text-emerald-700 hover:text-emerald-800 font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 text-center py-6">No notifications yet.</p>
                      ) : (
                        notifications.slice(0, 6).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationRead(n.id)}
                            className={`p-3 hover:bg-slate-50 cursor-pointer transition-colors ${
                              !n.read ? 'bg-emerald-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-xs font-bold text-slate-800">{n.title}</p>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Drawer Trigger */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowCart(!showCart);
                    setShowNotifs(false);
                    setShowRoleDropdown(false);
                  }}
                  className="relative p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors focus:outline-none"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartTotalItems > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white shadow-xs">
                      {cartTotalItems}
                    </span>
                  )}
                </button>
              </div>

              {/* Role Switcher Pill */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowRoleDropdown(!showRoleDropdown);
                    setShowNotifs(false);
                    setShowCart(false);
                  }}
                  className={`flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border transition-all text-xs font-bold shadow-xs ${currentRoleConfig.badgeColor} hover:shadow-md focus:outline-none`}
                >
                  <RoleIcon className="w-4 h-4" />
                  <span className="hidden sm:inline-block max-w-[130px] truncate">{currentRoleConfig.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {showRoleDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Switch Active Portal
                    </div>
                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
                      {(Object.keys(ROLE_CONFIGS) as UserRole[]).map((rKey) => {
                        const rConf = ROLE_CONFIGS[rKey];
                        const RIcon = rConf.icon;
                        const isCurrent = currentRole === rKey;
                        return (
                          <button
                            key={rKey}
                            onClick={() => {
                              switchRole(rKey);
                              setShowRoleDropdown(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-xs transition-colors ${
                              isCurrent ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg ${rConf.bg}`}>
                              <RIcon className={`w-4 h-4 ${rConf.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold truncate">{rConf.name}</p>
                              <p className="text-[10px] text-slate-400 truncate">{rKey === 'admin' ? 'Administration' : 'Role Portal'}</p>
                            </div>
                            {isCurrent && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="pt-2 px-3 border-t border-slate-100 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setShowRoleDropdown(false);
                        }}
                        className="w-full text-center py-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold"
                      >
                        Change Role / Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              <div
                onClick={() => setActiveTab('profile')}
                className="w-8 h-8 rounded-full ring-2 ring-emerald-500/20 overflow-hidden cursor-pointer hover:ring-emerald-500 transition-all shrink-0"
                title={`${currentUser.name} (${currentUser.role})`}
              >
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=100'}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer / Slideout Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={() => setShowCart(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              {/* Cart Header */}
              <div className="p-4 sm:p-6 bg-emerald-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-6 h-6" />
                  <div>
                    <h2 className="text-lg font-bold">Your Agro Basket</h2>
                    <p className="text-xs text-emerald-200">{cartTotalItems} item(s) selected</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {orderSuccessId ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Order Placed Successfully!</h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-1">Order #{orderSuccessId}</p>
                    <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
                      Farmer/Agri-store and local delivery partner have been notified for harvest & dispatch.
                    </p>
                    <button
                      onClick={() => {
                        setOrderSuccessId(null);
                        setShowCart(false);
                        setActiveTab('dashboard');
                      }}
                      className="mt-6 w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
                    >
                      Track in Dashboard
                    </button>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Your basket is empty</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      Browse certified farm seeds, bio-fertilizers, or fresh organic farm produce.
                    </p>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setActiveTab('market');
                      }}
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white font-semibold text-xs rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Explore Market
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                            <p className="text-[11px] text-slate-500">
                              By {item.sellerName} ({item.unit})
                            </p>
                            <p className="text-xs font-bold text-emerald-700 mt-1">
                              ₹{item.price.toLocaleString('en-IN')}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                                <button
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                                >
                                  -
                                </button>
                                <span className="px-2.5 py-0.5 text-xs font-bold text-slate-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100"
                                >
                                  +
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address Input */}
                    <div className="pt-4 border-t border-slate-200">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Delivery / Farm Delivery Address
                      </label>
                      <textarea
                        rows={2}
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                        placeholder={`e.g. ${currentUser.location.village || 'Farm House'}, ${currentUser.location.district}, ${currentUser.location.state} - ${currentUser.location.pincode}`}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Cart Footer */}
              {!orderSuccessId && cart.length > 0 && (
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Subtotal</span>
                    <span>₹{cartTotalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Farm Logistics & Packaging</span>
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-emerald-800">₹{cartTotalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    disabled={isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <span className="animate-pulse">Processing Order...</span>
                    ) : (
                      <>
                        <span>Place Order & Pay</span>
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    Secured by AgroWorld Kisan Direct Guarantee
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};
