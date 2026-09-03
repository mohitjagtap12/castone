import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  CropRecord,
  CropListing,
  AgriWasteListing,
  StoreProduct,
  LabourJob,
  CorporateContract,
  ContractApplication,
  APMCTraderDemand,
  NegotiationDeal,
  DirectOrder,
  BiomassDemand,
  DeliveryJob,
  MandiRate,
  InAppNotification,
  ChatMessage,
  CropDiseaseDiagnosis,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_CROPS,
  INITIAL_CROP_LISTINGS,
  INITIAL_AGRI_WASTE_LISTINGS,
  INITIAL_STORE_PRODUCTS,
  INITIAL_LABOUR_JOBS,
  INITIAL_CONTRACTS,
  INITIAL_CONTRACT_APPLICATIONS,
  INITIAL_TRADER_DEMANDS,
  INITIAL_NEGOTIATIONS,
  INITIAL_DIRECT_ORDERS,
  INITIAL_BIOMASS_DEMANDS,
  INITIAL_DELIVERY_JOBS,
  INITIAL_MANDI_RATES,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHAT_MESSAGES,
} from '../data/mockData';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  sellerId: string;
  sellerName: string;
  sellerType: 'farmer' | 'store' | 'waste_seller';
  imageUrl?: string;
}

interface AppContextType {
  // Auth & Roles
  currentUser: UserProfile;
  currentRole: UserRole;
  isLoggedIn: boolean;
  selectedRoleForOnboarding: UserRole | null;
  setSelectedRoleForOnboarding: (role: UserRole | null) => void;
  switchRole: (role: UserRole) => void;
  login: (phoneOrEmail: string, role: UserRole) => boolean;
  logout: () => void;
  updateUserProfile: (profileUpdates: Partial<UserProfile>) => void;

  // Active View / Route state
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Data collections
  crops: CropRecord[];
  cropListings: CropListing[];
  agriWasteListings: AgriWasteListing[];
  storeProducts: StoreProduct[];
  labourJobs: LabourJob[];
  contracts: CorporateContract[];
  contractApplications: ContractApplication[];
  traderDemands: APMCTraderDemand[];
  negotiations: NegotiationDeal[];
  orders: DirectOrder[];
  biomassDemands: BiomassDemand[];
  deliveryJobs: DeliveryJob[];
  mandiRates: MandiRate[];
  notifications: InAppNotification[];
  chatMessages: ChatMessage[];
  diagnosesHistory: { id: string; date: string; diagnosis: CropDiseaseDiagnosis; imageUrl?: string }[];

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  checkoutCart: (shippingAddress: string) => Promise<string>;

  // Action mutations
  addCrop: (crop: Omit<CropRecord, 'id' | 'farmerId' | 'farmerName'>) => void;
  updateCrop: (id: string, updates: Partial<CropRecord>) => void;
  deleteCrop: (id: string) => void;

  addCropListing: (listing: Omit<CropListing, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'farmerLocation' | 'createdAt' | 'status'>) => void;
  addAgriWasteListing: (listing: Omit<AgriWasteListing, 'id' | 'farmerId' | 'farmerName' | 'farmerLocation' | 'createdAt'>) => void;
  addStoreProduct: (prod: Omit<StoreProduct, 'id' | 'storeId' | 'storeName' | 'rating' | 'reviewsCount'>) => void;
  updateStoreProduct: (id: string, updates: Partial<StoreProduct>) => void;
  deleteStoreProduct: (id: string) => void;

  postLabourJob: (job: Omit<LabourJob, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'status' | 'createdAt'>) => void;
  applyToLabourJob: (jobId: string) => void;
  updateLabourJobStatus: (jobId: string, status: LabourJob['status']) => void;

  createContract: (contract: Omit<CorporateContract, 'id' | 'companyId' | 'companyName' | 'status' | 'applicationsCount' | 'createdAt'>) => void;
  applyToContract: (contractId: string, offeredAcres: number, expectedQuintals: number) => void;
  updateContractApplicationStatus: (appId: string, status: ContractApplication['status']) => void;

  createTraderDemand: (demand: Omit<APMCTraderDemand, 'id' | 'traderId' | 'traderName' | 'status' | 'offersCount' | 'createdAt'>) => void;
  createNegotiationOffer: (demandId: string, offerPrice: number, message: string) => void;
  respondNegotiation: (dealId: string, action: 'accept' | 'reject' | 'counter', counterPrice?: number, message?: string) => void;

  createBiomassDemand: (demand: Omit<BiomassDemand, 'id' | 'buyerId' | 'buyerName' | 'status' | 'createdAt'>) => void;

  acceptDeliveryJob: (jobId: string) => void;
  updateDeliveryStatus: (jobId: string, status: DeliveryJob['status']) => void;

  updateOrderStatus: (orderId: string, status: DirectOrder['orderStatus']) => void;

  saveCropDiagnosis: (diagnosis: CropDiseaseDiagnosis, imageUrl?: string) => void;
  sendChatMessage: (receiverId: string, receiverName: string, message: string, threadId: string, contextTag?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Admin capabilities
  verifyUserAccount: (userId: string, newStatus: 'verified' | 'rejected') => void;
  deleteListingAdmin: (type: 'crop' | 'waste' | 'product' | 'contract' | 'demand', id: string) => void;
  resetAllDataToDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`agroworld_${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`agroworld_${key}`, JSON.stringify(value));
  } catch (err) {
    console.error('Storage error:', err);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => loadFromStorage('currentRole', 'farmer'));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => loadFromStorage('isLoggedIn', true));
  const [selectedRoleForOnboarding, setSelectedRoleForOnboarding] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [users, setUsers] = useState<Record<string, UserProfile>>(() => loadFromStorage('users', INITIAL_USERS));
  const [crops, setCrops] = useState<CropRecord[]>(() => loadFromStorage('crops', INITIAL_CROPS));
  const [cropListings, setCropListings] = useState<CropListing[]>(() => loadFromStorage('cropListings', INITIAL_CROP_LISTINGS));
  const [agriWasteListings, setAgriWasteListings] = useState<AgriWasteListing[]>(() => loadFromStorage('agriWasteListings', INITIAL_AGRI_WASTE_LISTINGS));
  const [storeProducts, setStoreProducts] = useState<StoreProduct[]>(() => loadFromStorage('storeProducts', INITIAL_STORE_PRODUCTS));
  const [labourJobs, setLabourJobs] = useState<LabourJob[]>(() => loadFromStorage('labourJobs', INITIAL_LABOUR_JOBS));
  const [contracts, setContracts] = useState<CorporateContract[]>(() => loadFromStorage('contracts', INITIAL_CONTRACTS));
  const [contractApplications, setContractApplications] = useState<ContractApplication[]>(() => loadFromStorage('contractApplications', INITIAL_CONTRACT_APPLICATIONS));
  const [traderDemands, setTraderDemands] = useState<APMCTraderDemand[]>(() => loadFromStorage('traderDemands', INITIAL_TRADER_DEMANDS));
  const [negotiations, setNegotiations] = useState<NegotiationDeal[]>(() => loadFromStorage('negotiations', INITIAL_NEGOTIATIONS));
  const [orders, setOrders] = useState<DirectOrder[]>(() => loadFromStorage('orders', INITIAL_DIRECT_ORDERS));
  const [biomassDemands, setBiomassDemands] = useState<BiomassDemand[]>(() => loadFromStorage('biomassDemands', INITIAL_BIOMASS_DEMANDS));
  const [deliveryJobs, setDeliveryJobs] = useState<DeliveryJob[]>(() => loadFromStorage('deliveryJobs', INITIAL_DELIVERY_JOBS));
  const [mandiRates, setMandiRates] = useState<MandiRate[]>(() => loadFromStorage('mandiRates', INITIAL_MANDI_RATES));
  const [notifications, setNotifications] = useState<InAppNotification[]>(() => loadFromStorage('notifications', INITIAL_NOTIFICATIONS));
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => loadFromStorage('chatMessages', INITIAL_CHAT_MESSAGES));
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage('cart', []));
  const [diagnosesHistory, setDiagnosesHistory] = useState<{ id: string; date: string; diagnosis: CropDiseaseDiagnosis; imageUrl?: string }[]>(() => loadFromStorage('diagnosesHistory', []));

  // Sync to local storage on changes
  useEffect(() => saveToStorage('currentRole', currentRole), [currentRole]);
  useEffect(() => saveToStorage('isLoggedIn', isLoggedIn), [isLoggedIn]);
  useEffect(() => saveToStorage('users', users), [users]);
  useEffect(() => saveToStorage('crops', crops), [crops]);
  useEffect(() => saveToStorage('cropListings', cropListings), [cropListings]);
  useEffect(() => saveToStorage('agriWasteListings', agriWasteListings), [agriWasteListings]);
  useEffect(() => saveToStorage('storeProducts', storeProducts), [storeProducts]);
  useEffect(() => saveToStorage('labourJobs', labourJobs), [labourJobs]);
  useEffect(() => saveToStorage('contracts', contracts), [contracts]);
  useEffect(() => saveToStorage('contractApplications', contractApplications), [contractApplications]);
  useEffect(() => saveToStorage('traderDemands', traderDemands), [traderDemands]);
  useEffect(() => saveToStorage('negotiations', negotiations), [negotiations]);
  useEffect(() => saveToStorage('orders', orders), [orders]);
  useEffect(() => saveToStorage('biomassDemands', biomassDemands), [biomassDemands]);
  useEffect(() => saveToStorage('deliveryJobs', deliveryJobs), [deliveryJobs]);
  useEffect(() => saveToStorage('mandiRates', mandiRates), [mandiRates]);
  useEffect(() => saveToStorage('notifications', notifications), [notifications]);
  useEffect(() => saveToStorage('chatMessages', chatMessages), [chatMessages]);
  useEffect(() => saveToStorage('cart', cart), [cart]);
  useEffect(() => saveToStorage('diagnosesHistory', diagnosesHistory), [diagnosesHistory]);

  const currentUser = users[currentRole] || INITIAL_USERS[currentRole] || INITIAL_USERS.farmer;

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setActiveTab('dashboard');
    setIsLoggedIn(true);
  };

  const login = (_phoneOrEmail: string, role: UserRole) => {
    setCurrentRole(role);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setSelectedRoleForOnboarding(null);
  };

  const updateUserProfile = (profileUpdates: Partial<UserProfile>) => {
    setUsers((prev) => ({
      ...prev,
      [currentRole]: {
        ...prev[currentRole],
        ...profileUpdates,
      },
    }));
  };

  // Cart operations
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, item];
    });
    // Add quick toast notification
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        title: 'Added to Cart',
        message: `${item.name} (${item.quantity} ${item.unit}) added to your basket.`,
        type: 'order',
        read: false,
        timestamp: 'Just now',
      },
      ...prev,
    ]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const checkoutCart = async (shippingAddress: string): Promise<string> => {
    if (cart.length === 0) return '';
    const orderId = `ord_${Math.floor(1000 + Math.random() * 9000)}`;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const firstSeller = cart[0];
    const newOrder: DirectOrder = {
      id: orderId,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerPhone: currentUser.phone,
      shippingAddress: shippingAddress || `${currentUser.location.village || 'Farm Road'}, ${currentUser.location.district}, ${currentUser.location.state}`,
      sellerId: firstSeller.sellerId,
      sellerName: firstSeller.sellerName,
      sellerType: firstSeller.sellerType,
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        unitPrice: i.price,
        unit: i.unit,
        imageUrl: i.imageUrl,
      })),
      totalAmount: total,
      paymentStatus: 'paid',
      orderStatus: 'placed',
      createdAt: new Date().toISOString().split('T')[0],
      estimatedDeliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Create delivery job for delivery partner
    const newDelJob: DeliveryJob = {
      id: `del_${Date.now()}`,
      orderId: orderId,
      pickupLocation: {
        address: `${firstSeller.sellerName} Warehouse / Farm Gate, Mehsana`,
        contactName: firstSeller.sellerName,
        contactPhone: '+91 94140 88776',
      },
      dropLocation: {
        address: newOrder.shippingAddress,
        contactName: currentUser.name,
        contactPhone: currentUser.phone,
      },
      cargoDetails: {
        description: `${cart.length} item(s) - ${cart[0].name}`,
        weightKg: Math.max(10, cart.length * 5),
        itemType: firstSeller.sellerType === 'farmer' ? 'Fresh Produce' : 'Agri Supplies',
      },
      payoutAmount: Math.floor(250 + Math.random() * 300),
      distanceKm: Math.floor(15 + Math.random() * 30),
      status: 'available',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setDeliveryJobs((prev) => [newDelJob, ...prev]);
    clearCart();

    // Notify buyer and seller
    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        userId: currentUser.id,
        title: `Order Placed Successfully #${orderId}`,
        message: `Your order for ₹${total.toLocaleString('en-IN')} has been placed and will be delivered by ${newOrder.estimatedDeliveryDate}.`,
        type: 'order',
        read: false,
        timestamp: 'Just now',
      },
      ...prev,
    ]);

    return orderId;
  };

  // Farmer Crop Management
  const addCrop = (cropData: Omit<CropRecord, 'id' | 'farmerId' | 'farmerName'>) => {
    const newCrop: CropRecord = {
      ...cropData,
      id: `crop_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
    };
    setCrops((prev) => [newCrop, ...prev]);
  };

  const updateCrop = (id: string, updates: Partial<CropRecord>) => {
    setCrops((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCrop = (id: string) => {
    setCrops((prev) => prev.filter((c) => c.id !== id));
  };

  // Produce Listing
  const addCropListing = (listingData: Omit<CropListing, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'farmerLocation' | 'createdAt' | 'status'>) => {
    const newListing: CropListing = {
      ...listingData,
      id: `listing_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      farmerLocation: `${currentUser.location.district}, ${currentUser.location.state}`,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCropListings((prev) => [newListing, ...prev]);
  };

  // Agri-Waste Listing
  const addAgriWasteListing = (listingData: Omit<AgriWasteListing, 'id' | 'farmerId' | 'farmerName' | 'farmerLocation' | 'createdAt'>) => {
    const newWaste: AgriWasteListing = {
      ...listingData,
      id: `waste_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerLocation: `${currentUser.location.district}, ${currentUser.location.state}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAgriWasteListings((prev) => [newWaste, ...prev]);
  };

  // Store Product
  const addStoreProduct = (prodData: Omit<StoreProduct, 'id' | 'storeId' | 'storeName' | 'rating' | 'reviewsCount'>) => {
    const newProd: StoreProduct = {
      ...prodData,
      id: `prod_${Date.now()}`,
      storeId: currentUser.id,
      storeName: currentUser.storeDetails?.storeName || currentUser.name,
      rating: 5.0,
      reviewsCount: 1,
    };
    setStoreProducts((prev) => [newProd, ...prev]);
  };

  const updateStoreProduct = (id: string, updates: Partial<StoreProduct>) => {
    setStoreProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteStoreProduct = (id: string) => {
    setStoreProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Labour
  const postLabourJob = (jobData: Omit<LabourJob, 'id' | 'farmerId' | 'farmerName' | 'farmerPhone' | 'status' | 'createdAt'>) => {
    const newJob: LabourJob = {
      ...jobData,
      id: `job_${Date.now()}`,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLabourJobs((prev) => [newJob, ...prev]);
  };

  const applyToLabourJob = (jobId: string) => {
    setLabourJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            status: 'assigned',
            assignedLabourId: currentUser.id,
            assignedLabourName: currentUser.name,
          };
        }
        return job;
      })
    );
  };

  const updateLabourJobStatus = (jobId: string, status: LabourJob['status']) => {
    setLabourJobs((prev) => prev.map((job) => (job.id === jobId ? { ...job, status } : job)));
  };

  // Corporate Contract
  const createContract = (contractData: Omit<CorporateContract, 'id' | 'companyId' | 'companyName' | 'status' | 'applicationsCount' | 'createdAt'>) => {
    const newContract: CorporateContract = {
      ...contractData,
      id: `contract_${Date.now()}`,
      companyId: currentUser.id,
      companyName: currentUser.companyDetails?.companyName || currentUser.name,
      status: 'published',
      applicationsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setContracts((prev) => [newContract, ...prev]);
  };

  const applyToContract = (contractId: string, offeredAcres: number, expectedQuintals: number) => {
    const targetContract = contracts.find((c) => c.id === contractId);
    if (!targetContract) return;

    const newApp: ContractApplication = {
      id: `app_${Date.now()}`,
      contractId,
      contractTitle: `${targetContract.cropRequired} (${targetContract.variety})`,
      companyName: targetContract.companyName,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone,
      farmLocation: `${currentUser.location.village || 'Farm'}, ${currentUser.location.district}, ${currentUser.location.state}`,
      offeredLandAreaAcres: offeredAcres,
      expectedProductionQuintals: expectedQuintals,
      status: 'submitted',
      appliedAt: new Date().toISOString().split('T')[0],
    };

    setContractApplications((prev) => [newApp, ...prev]);
    setContracts((prev) =>
      prev.map((c) => (c.id === contractId ? { ...c, applicationsCount: c.applicationsCount + 1 } : c))
    );
  };

  const updateContractApplicationStatus = (appId: string, status: ContractApplication['status']) => {
    setContractApplications((prev) => prev.map((a) => (a.id === appId ? { ...a, status } : a)));
  };

  // Trader Demands & Negotiations
  const createTraderDemand = (demandData: Omit<APMCTraderDemand, 'id' | 'traderId' | 'traderName' | 'status' | 'offersCount' | 'createdAt'>) => {
    const newDemand: APMCTraderDemand = {
      ...demandData,
      id: `demand_${Date.now()}`,
      traderId: currentUser.id,
      traderName: currentUser.traderDetails?.mandiName || currentUser.name,
      status: 'active',
      offersCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTraderDemands((prev) => [newDemand, ...prev]);
  };

  const createNegotiationOffer = (demandId: string, offerPrice: number, message: string) => {
    const demand = traderDemands.find((d) => d.id === demandId);
    if (!demand) return;

    const newDeal: NegotiationDeal = {
      id: `nego_${Date.now()}`,
      demandId,
      traderId: demand.traderId,
      traderName: demand.traderName,
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      cropName: demand.cropName,
      quantityQuintals: demand.requiredQuantityQuintals,
      initialOfferPrice: demand.offeredPricePerQuintal,
      currentOfferPrice: offerPrice,
      lastOfferBy: 'farmer',
      status: 'pending_trader',
      history: [
        {
          price: offerPrice,
          sender: 'farmer',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          message,
        },
      ],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setNegotiations((prev) => [newDeal, ...prev]);
    setTraderDemands((prev) =>
      prev.map((d) => (d.id === demandId ? { ...d, offersCount: d.offersCount + 1 } : d))
    );
  };

  const respondNegotiation = (dealId: string, action: 'accept' | 'reject' | 'counter', counterPrice?: number, message?: string) => {
    setNegotiations((prev) =>
      prev.map((deal) => {
        if (deal.id === dealId) {
          if (action === 'accept') {
            return {
              ...deal,
              status: 'deal_accepted',
              dealFinalPrice: deal.currentOfferPrice,
              updatedAt: new Date().toISOString().split('T')[0],
            };
          }
          if (action === 'reject') {
            return {
              ...deal,
              status: 'rejected',
              updatedAt: new Date().toISOString().split('T')[0],
            };
          }
          if (action === 'counter' && counterPrice) {
            const isSenderFarmer = currentRole === 'farmer';
            return {
              ...deal,
              currentOfferPrice: counterPrice,
              lastOfferBy: isSenderFarmer ? 'farmer' : 'trader',
              status: isSenderFarmer ? 'pending_trader' : 'pending_farmer',
              updatedAt: new Date().toISOString().split('T')[0],
              history: [
                ...deal.history,
                {
                  price: counterPrice,
                  sender: isSenderFarmer ? 'farmer' : 'trader',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  message,
                },
              ],
            };
          }
        }
        return deal;
      })
    );
  };

  // Biomass
  const createBiomassDemand = (demandData: Omit<BiomassDemand, 'id' | 'buyerId' | 'buyerName' | 'status' | 'createdAt'>) => {
    const newDem: BiomassDemand = {
      ...demandData,
      id: `bio_dem_${Date.now()}`,
      buyerId: currentUser.id,
      buyerName: currentUser.biomassBuyerDetails?.plantName || currentUser.name,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBiomassDemands((prev) => [newDem, ...prev]);
  };

  // Delivery
  const acceptDeliveryJob = (jobId: string) => {
    setDeliveryJobs((prev) =>
      prev.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            status: 'accepted',
            deliveryPartnerId: currentUser.id,
            deliveryPartnerName: currentUser.name,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return job;
      })
    );
  };

  const updateDeliveryStatus = (jobId: string, status: DeliveryJob['status']) => {
    setDeliveryJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status, updatedAt: new Date().toISOString().split('T')[0] } : j)));
  };

  const updateOrderStatus = (orderId: string, status: DirectOrder['orderStatus']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, orderStatus: status } : o)));
  };

  // Diagnosis
  const saveCropDiagnosis = (diagnosis: CropDiseaseDiagnosis, imageUrl?: string) => {
    const newRec = {
      id: `diag_${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      diagnosis,
      imageUrl,
    };
    setDiagnosesHistory((prev) => [newRec, ...prev]);
  };

  // Chat
  const sendChatMessage = (receiverId: string, receiverName: string, message: string, threadId: string, contextTag?: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      threadId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentRole,
      receiverId,
      receiverName,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      contextTag,
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Admin
  const verifyUserAccount = (userId: string, newStatus: 'verified' | 'rejected') => {
    setUsers((prev) => {
      const updated = { ...prev };
      for (const roleKey of Object.keys(updated)) {
        if (updated[roleKey].id === userId) {
          updated[roleKey] = {
            ...updated[roleKey],
            verificationStatus: newStatus,
          };
        }
      }
      return updated;
    });
  };

  const deleteListingAdmin = (type: 'crop' | 'waste' | 'product' | 'contract' | 'demand', id: string) => {
    if (type === 'crop') setCropListings((prev) => prev.filter((c) => c.id !== id));
    if (type === 'waste') setAgriWasteListings((prev) => prev.filter((w) => w.id !== id));
    if (type === 'product') setStoreProducts((prev) => prev.filter((p) => p.id !== id));
    if (type === 'contract') setContracts((prev) => prev.filter((c) => c.id !== id));
    if (type === 'demand') setTraderDemands((prev) => prev.filter((d) => d.id !== id));
  };

  const resetAllDataToDemo = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCrops(INITIAL_CROPS);
    setCropListings(INITIAL_CROP_LISTINGS);
    setAgriWasteListings(INITIAL_AGRI_WASTE_LISTINGS);
    setStoreProducts(INITIAL_STORE_PRODUCTS);
    setLabourJobs(INITIAL_LABOUR_JOBS);
    setContracts(INITIAL_CONTRACTS);
    setContractApplications(INITIAL_CONTRACT_APPLICATIONS);
    setTraderDemands(INITIAL_TRADER_DEMANDS);
    setNegotiations(INITIAL_NEGOTIATIONS);
    setOrders(INITIAL_DIRECT_ORDERS);
    setBiomassDemands(INITIAL_BIOMASS_DEMANDS);
    setDeliveryJobs(INITIAL_DELIVERY_JOBS);
    setMandiRates(INITIAL_MANDI_RATES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setCart([]);
    setDiagnosesHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        isLoggedIn,
        selectedRoleForOnboarding,
        setSelectedRoleForOnboarding,
        switchRole,
        login,
        logout,
        updateUserProfile,
        activeTab,
        setActiveTab,
        crops,
        cropListings,
        agriWasteListings,
        storeProducts,
        labourJobs,
        contracts,
        contractApplications,
        traderDemands,
        negotiations,
        orders,
        biomassDemands,
        deliveryJobs,
        mandiRates,
        notifications,
        chatMessages,
        diagnosesHistory,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        checkoutCart,
        addCrop,
        updateCrop,
        deleteCrop,
        addCropListing,
        addAgriWasteListing,
        addStoreProduct,
        updateStoreProduct,
        deleteStoreProduct,
        postLabourJob,
        applyToLabourJob,
        updateLabourJobStatus,
        createContract,
        applyToContract,
        updateContractApplicationStatus,
        createTraderDemand,
        createNegotiationOffer,
        respondNegotiation,
        createBiomassDemand,
        acceptDeliveryJob,
        updateDeliveryStatus,
        updateOrderStatus,
        saveCropDiagnosis,
        sendChatMessage,
        markNotificationRead,
        markAllNotificationsRead,
        verifyUserAccount,
        deleteListingAdmin,
        resetAllDataToDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
