import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Camera,
  Upload,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  RefreshCw,
  ShoppingBag,
  Info,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface MockDiseaseSample {
  id: string;
  name: string;
  cropName: string;
  imageUrl: string;
  problemFound: string;
  severity: 'Low' | 'Moderate' | 'High';
  whatItMeans: string;
  whatYouCanDo: string[];
  preventionTips: string[];
  recommendedMedicine: string;
}

const SAMPLE_DISEASE_PHOTOS: MockDiseaseSample[] = [
  {
    id: 'sample_tomato_leaf_spot',
    name: 'Tomato - Leaf Spot',
    cropName: 'Tomato',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    problemFound: 'Early Blight / Leaf Spot (Alternaria)',
    severity: 'Moderate',
    whatItMeans: 'Small brown and dark spots are seen with yellow rings on lower leaves, caused by warm humid weather.',
    whatYouCanDo: [
      'Pluck and remove badly affected lower leaves so it does not spread.',
      'Water only at the root base — avoid wetting the leaves.',
      'Spray Mancozeb (2g per liter) or Copper Oxychloride 50 WP in the early morning.',
      'Apply organic Neem Oil (5ml/L) to build plant resistance.',
    ],
    preventionTips: [
      'Keep adequate distance (45cm) between tomato plants for airflow.',
      'Use mulch or dry straw around plant roots to prevent soil splash on leaves.',
      'Practice crop rotation — avoid planting tomatoes or potatoes on the same plot every season.',
    ],
    recommendedMedicine: 'Saaf Fungicide (Carbendazim + Mancozeb)',
  },
  {
    id: 'sample_wheat_rust',
    name: 'Wheat - Yellow Rust',
    cropName: 'Wheat',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    problemFound: 'Yellow Stripe Rust (Puccinia striiformis)',
    severity: 'High',
    whatItMeans: 'Bright yellow or orange powdery stripes appear along the leaf veins, reducing grain development.',
    whatYouCanDo: [
      'Inspect surrounding field patches to stop rapid spread.',
      'Spray Propiconazole 25% EC (1 ml per liter of water) immediately across affected plots.',
      'Avoid high nitrogen fertilizer application while rust is active.',
    ],
    preventionTips: [
      'Sow resistant wheat varieties like HD-2967, PBW-550, or DBW-187.',
      'Follow timely sowing schedule in November to avoid peak rust temperatures.',
    ],
    recommendedMedicine: 'Tilt Propiconazole 25 EC Fungicide',
  },
  {
    id: 'sample_cotton_curl',
    name: 'Cotton - Leaf Curl',
    cropName: 'Cotton',
    imageUrl: 'https://images.unsplash.com/photo-1594488554790-2580a6fa2c5d?w=600&auto=format&fit=crop&q=80',
    problemFound: 'Cotton Leaf Curl Virus (CLCuV)',
    severity: 'Moderate',
    whatItMeans: 'Leaves curl upwards with thickening veins, spread by whitefly insects in warm weather.',
    whatYouCanDo: [
      'Control whitefly carrier insects with Diafenthiuron 50% WP or Neem spray.',
      'Install yellow sticky traps (15 traps per acre) to catch adult whiteflies.',
      'Remove weed hosts from field borders.',
    ],
    preventionTips: [
      'Use certified virus-tolerant hybrid Bt-Cotton seeds.',
      'Avoid excess urea fertilizer which attracts sucking pests.',
    ],
    recommendedMedicine: 'Pegasus Sucking Pest Solution & Yellow Sticky Traps',
  },
  {
    id: 'sample_healthy_maize',
    name: 'Maize - Healthy Crop',
    cropName: 'Maize',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&auto=format&fit=crop&q=80',
    problemFound: 'No Problem Found (Healthy Crop)',
    severity: 'Low',
    whatItMeans: 'Leaves are vibrant green with strong chlorophyll development and clean leaf margins.',
    whatYouCanDo: [
      'Maintain regular irrigation during tasseling and grain filling stage.',
      'Apply balanced NPK foliar spray for maximum cob size.',
    ],
    preventionTips: [
      'Monitor for fall armyworm larvae inside the whorl during early vegetative growth.',
      'Keep field free of competing grasses.',
    ],
    recommendedMedicine: 'Bio-NPK Liquid Fertilizer',
  },
];

export const CheckCropHealthView: React.FC = () => {
  const { setActiveTab } = useApp();
  
  const [selectedPhoto, setSelectedPhoto] = useState<string>(SAMPLE_DISEASE_PHOTOS[0].imageUrl);
  const [selectedSample, setSelectedSample] = useState<MockDiseaseSample>(SAMPLE_DISEASE_PHOTOS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [cameraModeActive, setCameraModeActive] = useState<boolean>(false);

  const handleSelectSample = (sample: MockDiseaseSample) => {
    setSelectedSample(sample);
    setSelectedPhoto(sample.imageUrl);
    setShowResult(false);
  };

  const handleRunCheck = () => {
    setIsAnalyzing(true);
    setShowResult(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 1200);
  };

  const handleSimulateCamera = () => {
    setCameraModeActive(true);
    setTimeout(() => {
      setCameraModeActive(false);
      setSelectedSample(SAMPLE_DISEASE_PHOTOS[0]);
      setSelectedPhoto(SAMPLE_DISEASE_PHOTOS[0].imageUrl);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Screen Title & Subtitle in Simple English */}
      <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-xs text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-[#1B5E20] text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-green-700" />
            <span>Plant Health Doctor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-green-950">
            Check Crop Health
          </h1>
          <p className="text-sm text-green-800 font-medium mt-1">
            Take a photo of your crop to check for possible problems.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('farmer_supplies')}
          className="px-4 py-2.5 bg-green-50 hover:bg-green-100 text-[#1B5E20] rounded-2xl text-xs font-bold border border-green-200 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <ShoppingBag className="w-4 h-4 text-green-700" />
          <span>Buy Crop Medicines</span>
        </button>
      </div>

      {/* Main Action Area */}
      {!showResult ? (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-green-100 shadow-xs space-y-6">
          
          {/* Two Large Touch Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Take Photo Button */}
            <button
              type="button"
              onClick={handleSimulateCamera}
              className="p-6 rounded-3xl border-2 border-dashed border-green-600 bg-green-50/70 hover:bg-green-100/60 flex flex-col items-center justify-center text-center gap-3 transition-all cursor-pointer group shadow-2xs active:scale-[0.99]"
            >
              <div className="w-16 h-16 rounded-full bg-[#2E7D32] text-white flex items-center justify-center shadow-md shadow-green-700/20 group-hover:scale-105 transition-transform">
                <Camera className="w-8 h-8 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-950">Take Photo</h3>
                <p className="text-xs text-green-800 font-medium mt-0.5">
                  Use phone camera to click crop leaf or fruit
                </p>
              </div>
            </button>

            {/* Choose Photo Button */}
            <label className="p-6 rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100/80 flex flex-col items-center justify-center text-center gap-3 transition-all cursor-pointer group shadow-2xs active:scale-[0.99]">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (ev.target?.result) {
                        setSelectedPhoto(ev.target.result as string);
                      }
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
              <div className="w-16 h-16 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Upload className="w-8 h-8 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Choose Photo</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Pick a photo from your gallery or files
                </p>
              </div>
            </label>
          </div>

          {/* Camera Simulation Toast */}
          {cameraModeActive && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-center gap-3 text-sm font-bold animate-pulse">
              <Camera className="w-5 h-5 text-green-400" />
              <span>Camera active: Capturing field leaf image...</span>
            </div>
          )}

          {/* Sample Photos to Test Quickly */}
          <div>
            <label className="block text-xs font-bold text-green-950 mb-2">
              Or Choose a Sample Problem to Test:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAMPLE_DISEASE_PHOTOS.map((sample) => {
                const isSelected = selectedSample.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col gap-2 ${
                      isSelected
                        ? 'border-2 border-green-600 bg-green-50/80 shadow-xs ring-2 ring-green-600/20'
                        : 'border-slate-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <div className="h-20 w-full rounded-xl overflow-hidden bg-slate-100">
                      <img
                        src={sample.imageUrl}
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 truncate">{sample.name}</p>
                      <p className="text-[10px] text-green-800 font-medium truncate">{sample.problemFound}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Photo Preview */}
          <div className="p-4 rounded-3xl bg-green-50/50 border border-green-200">
            <h4 className="text-xs font-bold text-green-950 mb-3 flex items-center gap-1.5">
              <span>Selected Crop Photo</span>
              <span className="text-[11px] font-normal text-green-800">• Ready for health check</span>
            </h4>
            
            <div className="h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner relative">
              <img
                src={selectedPhoto}
                alt="Selected Crop"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-xs text-white text-xs font-bold">
                {selectedSample.cropName} Field Sample
              </div>
            </div>

            {/* Check Crop Button */}
            <div className="mt-4">
              <button
                type="button"
                disabled={isAnalyzing}
                onClick={handleRunCheck}
                className="w-full py-4 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-base shadow-lg shadow-green-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Checking Crop Health...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Check Crop</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-green-100 shadow-sm space-y-6">
            
            {/* Header Result */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-md ${
                  selectedSample.severity === 'High' ? 'bg-rose-600 shadow-rose-600/20' : selectedSample.severity === 'Moderate' ? 'bg-amber-600 shadow-amber-600/20' : 'bg-green-600 shadow-green-600/20'
                }`}>
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-green-800">
                    Health Check Finished
                  </span>
                  <h2 className="text-2xl font-bold text-green-950">
                    Crop Health Result
                  </h2>
                </div>
              </div>

              <span className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                selectedSample.severity === 'High'
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : selectedSample.severity === 'Moderate'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-green-50 text-green-800 border-green-200'
              }`}>
                Severity: {selectedSample.severity}
              </span>
            </div>

            {/* Photo & Problem Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="h-48 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={selectedPhoto}
                  alt="Examined Crop"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:col-span-2 space-y-3">
                <div className="p-4 rounded-2xl bg-green-50/70 border border-green-200">
                  <span className="text-xs font-bold uppercase text-green-800 block">
                    Crop Name
                  </span>
                  <p className="text-lg font-bold text-green-950 mt-0.5">
                    {selectedSample.cropName}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <span className="text-xs font-bold uppercase text-amber-800 block">
                    Problem Found
                  </span>
                  <p className="text-lg font-bold text-amber-950 mt-0.5">
                    {selectedSample.problemFound}
                  </p>
                </div>
              </div>
            </div>

            {/* What It Means */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-green-700" />
                <span>What it means:</span>
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed pl-6">
                "{selectedSample.whatItMeans}"
              </p>
            </div>

            {/* What You Can Do */}
            <div className="p-5 rounded-2xl bg-green-50/60 border border-green-200 space-y-3">
              <h4 className="text-sm font-bold text-green-950 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                <span>What you can do:</span>
              </h4>
              <ul className="space-y-2 pl-2 text-xs sm:text-sm text-green-900">
                {selectedSample.whatYouCanDo.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-200 text-green-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Tips */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
              <h4 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Prevention tips:</span>
              </h4>
              <ul className="space-y-2 pl-2 text-xs sm:text-sm text-blue-900">
                {selectedSample.preventionTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span className="leading-snug">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-xs text-amber-900 font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>This result is only a guide. For serious problems, ask a farming expert.</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowResult(false)}
                className="w-full sm:w-1/2 py-3.5 px-4 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
                <span>Check Another Crop</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('farmer_supplies')}
                className="w-full sm:w-1/2 py-3.5 px-4 rounded-2xl bg-[#2E7D32] hover:bg-green-800 text-white font-bold text-sm shadow-md shadow-green-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Find Crop Medicines in Store</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
