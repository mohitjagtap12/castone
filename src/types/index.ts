export type UserRole =
  | 'farmer'
  | 'store'
  | 'labour'
  | 'contract_company'
  | 'trader'
  | 'customer'
  | 'biomass_buyer'
  | 'delivery'
  | 'admin';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  location: {
    village?: string;
    taluka?: string;
    district: string;
    state: string;
    pincode: string;
    lat?: number;
    lng?: number;
  };
  verificationStatus: VerificationStatus;
  createdAt: string;
  rating?: number;
  totalReviews?: number;
  // Role specific details
  farmerDetails?: {
    farmName: string;
    landAreaAcres: number;
    soilType: string;
    irrigationSource: string;
    primaryCrops: string[];
    kisanCreditCardNo?: string;
  };
  storeDetails?: {
    storeName: string;
    licenseNumber: string;
    gstNumber?: string;
    authorizedDealerOf: string[];
    deliveryRadiusKm: number;
  };
  labourDetails?: {
    squadName?: string;
    squadType: 'individual' | 'squad';
    squadSize: number;
    memberCount?: number;
    skills: string[];
    dailyWage: number;
    dailyWagePerWorker?: number;
    experienceYears: number;
    isAvailable: boolean;
    preferredWorkTypes: string[];
  };
  companyDetails?: {
    companyName: string;
    registrationNumber: string;
    procurementManager: string;
    targetRegions: string[];
    contractTypes: string[];
  };
  traderDetails?: {
    mandiName: string;
    apmcLicenseNo: string;
    mandiLicenseNumber?: string;
    commoditiesHandled: string[];
    annualTurnoverLakhs?: number;
  };
  biomassBuyerDetails?: {
    plantName: string;
    gstNumber?: string;
    industryType: 'Bio-Ethanol' | 'Biomass Power' | 'Pellet Plant' | 'Paper Mill' | 'Compost Facility';
    monthlyRequirementMT: number;
    storageCapacityMT: number;
  };
  deliveryPartnerDetails?: {
    vehicleType: string;
    vehicleNumber: string;
    drivingLicenseNo?: string;
  };
  deliveryDetails?: {
    vehicleType: 'Two Wheeler' | 'Three Wheeler (Auto/Piaggio)' | 'Tractor Trolley' | 'Mini Truck (Tata Ace/Bolero)' | 'Large Truck (10T+)';
    vehicleNumber: string;
    drivingLicenseNo: string;
    isOnline: boolean;
    maxPayloadKg: number;
  };
}

export interface CropRecord {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  variety: string;
  sowingDate: string;
  expectedHarvestDate: string;
  landAreaAcres?: number;
  areaAcres?: number;
  fieldLocation?: string;
  status: 'Sowing' | 'Vegetative' | 'Flowering' | 'Maturity' | 'Harvested';
  expectedYieldQuintals: number;
  actualHarvestQuintals?: number;
  soilMoisturePercent?: number;
  notes?: string;
}

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  cropName: string;
  variety: string;
  quantity?: number;
  quantityQuintals?: number;
  unit: string;
  expectedPrice?: number;
  pricePerQuintal?: number;
  harvestDate?: string;
  qualityGrade?: string;
  organicCertified?: boolean;
  isOrganic?: boolean;
  images?: string[];
  imageUrl?: string;
  description: string;
  status: 'active' | 'sold' | 'under_negotiation';
  createdAt: string;
}

export interface AgriWasteListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  locationVillage?: string;
  materialType?: string;
  wasteType?: string;
  quantityAvailableMT?: number;
  quantityTonnes?: number;
  pricePerMT?: number;
  pricePerTonne?: number;
  moistureContentPercent?: number;
  moisturePercent?: number;
  potentialUses?: string[];
  baled?: boolean;
  isBaled?: boolean;
  pickupAvailable?: boolean;
  location?: string;
  images?: string[];
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

export interface StoreProduct {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  discountedPrice?: number;
  unit: string;
  stockQuantity: number;
  inStock: boolean;
  approvedByCIBRC?: boolean;
  isCertified?: boolean;
  dosageInstructions?: string;
  images?: string[];
  imageUrl?: string;
  description: string;
  rating: number;
  reviewsCount: number;
}

export interface LabourJob {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  location: string;
  jobType?: string;
  workType?: string;
  cropType?: string;
  workersNeeded: number;
  wagePerWorkerPerDay?: number;
  dailyWagePerWorker?: number;
  startDate: string;
  durationDays: number;
  foodAccommodationProvided?: boolean;
  description?: string;
  specialInstructions?: string;
  status: 'open' | 'applied' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  assignedLabourId?: string;
  assignedLabourName?: string;
  createdAt: string;
}

export interface CorporateContract {
  id: string;
  companyId: string;
  companyName: string;
  cropRequired: string;
  variety: string;
  season?: string;
  requiredQuantityMT?: number;
  targetVolumeQuintals?: number;
  assuredBuybackPricePerQuintal?: number;
  minimumGuaranteedPricePerQuintal?: number;
  minLandAreaAcres?: number;
  qualitySpecs?: string[];
  qualitySpecification?: string;
  inputSupport?: string;
  deliveryLocation?: string;
  paymentTerms?: string;
  contractDurationMonths?: number;
  targetRegion?: string;
  inputsProvided?: boolean;
  status: 'published' | 'closed';
  applicationsCount: number;
  createdAt: string;
  description?: string;
}

export interface ContractApplication {
  id: string;
  contractId: string;
  contractTitle: string;
  companyName: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmLocation: string;
  offeredLandAreaAcres: number;
  expectedProductionQuintals: number;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'harvest_submitted' | 'completed';
  appliedAt: string;
  notes?: string;
}

export interface APMCTraderDemand {
  id: string;
  traderId: string;
  traderName: string;
  mandiLocation?: string;
  mandiName?: string;
  cropName: string;
  variety?: string;
  requiredQuantityQuintals: number;
  offeredPricePerQuintal: number;
  qualityRequirement?: string;
  deadlineDate?: string;
  deliveryDate?: string;
  description?: string;
  status: 'active' | 'fulfilled' | 'expired';
  offersCount: number;
  createdAt: string;
}

export interface NegotiationDeal {
  id: string;
  demandId?: string;
  cropListingId?: string;
  traderId: string;
  traderName: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  quantityQuintals: number;
  initialOfferPrice: number;
  currentOfferPrice: number;
  lastOfferBy: 'farmer' | 'trader';
  status: 'pending_farmer' | 'pending_trader' | 'deal_accepted' | 'rejected';
  history: {
    price: number;
    sender: 'farmer' | 'trader';
    timestamp: string;
    message?: string;
  }[];
  dealFinalPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DirectOrder {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  shippingAddress: string;
  sellerId: string;
  sellerName: string;
  sellerType: 'farmer' | 'store' | 'waste_seller';
  items: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    unit: string;
    imageUrl?: string;
  }[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'cash_on_delivery';
  orderStatus: 'placed' | 'confirmed' | 'preparing' | 'dispatched' | 'in_transit' | 'delivered' | 'cancelled';
  assignedDeliveryPartnerId?: string;
  assignedDeliveryPartnerName?: string;
  createdAt: string;
  estimatedDeliveryDate?: string;
}

export interface BiomassDemand {
  id: string;
  buyerId: string;
  buyerName: string;
  plantName: string;
  wasteTypeRequired?: string;
  materialNeeded?: string;
  requiredQuantityTonnes?: number;
  requiredQuantityMT?: number;
  offeredPricePerTonne?: number;
  offeredPricePerMT?: number;
  moistureToleranceMax?: number;
  plantLocation: string;
  deliveryTimeline?: string;
  deadlineDate?: string;
  description?: string;
  deliveryPreference?: 'Seller Delivers' | 'Plant Arranges Transport';
  status: 'active' | 'fulfilled';
  createdAt: string;
}

export interface DeliveryJob {
  id: string;
  orderId: string;
  pickupLocation: {
    address: string;
    contactName: string;
    contactPhone: string;
  };
  dropLocation: {
    address: string;
    contactName: string;
    contactPhone: string;
  };
  cargoDetails: {
    description: string;
    weightKg: number;
    itemType: string;
  };
  payoutAmount: number;
  distanceKm: number;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  status: 'available' | 'assigned' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  message: string;
  timestamp: string;
  read: boolean;
  contextTag?: string;
}

export interface InAppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'labour' | 'contract' | 'negotiation' | 'delivery' | 'market' | 'system';
  read: boolean;
  timestamp: string;
  linkAction?: string;
}

export interface MandiRate {
  id: string;
  commodity: string;
  variety: string;
  mandi: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  arrivalTons?: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  updatedAt: string;
}

export interface CropDiseaseDiagnosis {
  diseaseName: string;
  cropName: string;
  confidenceScore: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical' | 'None';
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  advisoryWarning: string;
  source?: string;
}
