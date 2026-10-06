"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Star,
  ShieldCheck,
  Sparkles,
  Leaf,
  FlaskConical,
  HeartPulse,
  Truck,
  Ban,
  Activity,
  Zap,
  ShoppingCart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductJourneyModal from "@/components/ProductJourneyModal";

// Data structures for 4 Powerful Ingredients per product
interface Ingredient {
  id: string;
  name: string;
  scientificName: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  dosage: string;
  benefits: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge: string;
  image: string;
  keyHighlights: string[];
  badges: { label: string; icon: string }[];
  ingredients: Ingredient[];
  understandBenefits: string[];
}

const products: Record<string, Product> = {
  ashwagandha: {
    id: "ashwagandha",
    name: "Ashwagandha",
    category: "Botanical Adaptogen",
    tagline: "Natural Stress Relief & Strength Booster",
    subtitle: "Pure & Natural Root Extract • Standardized 5% Withanolides",
    price: 699,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 1842,
    badge: "Top Seller",
    image: "/products/ashwagandha.jpg",
    keyHighlights: [
      "Reduces Stress & Anxiety (Lowers cortisol by up to 32%)",
      "Improves Stamina & Cardiorespiratory Output",
      "Enhances Strength & Muscle Recovery",
      "Supports Overall Wellness & Deep Restorative Sleep",
    ],
    badges: [
      { label: "100% Natural", icon: "leaf" },
      { label: "Lab Tested", icon: "flask" },
      { label: "No Added Sugar", icon: "ban" },
      { label: "Vegetarian", icon: "veg" },
    ],
    understandBenefits: [
      "Reduces Stress & Anxiety",
      "Improves Stamina",
      "Enhances Strength",
      "Supports Hormonal Balance",
      "Boosts Immunity",
    ],
    ingredients: [
      {
        id: "withania",
        name: "Withania Somnifera",
        scientificName: "Withania Somnifera Dunal",
        shortDesc: "Helps body adapt to stress and improves energy.",
        fullDesc:
          "A powerful adaptogen that helps the body manage stress, improves stamina, supports hormonal balance and promotes overall well-being.",
        image: "/images/unsplash/photo-1509316975850-ff9c5deb0cd9.jpg",
        dosage: "600mg Standardized Extract",
        benefits: ["Reduces Stress & Anxiety", "Improves Sleep Quality", "Enhances Strength", "Supports Immune System"],
      },
      {
        id: "alkaloids",
        name: "Alkaloids",
        scientificName: "Bioactive Withanine & Somniferine",
        shortDesc: "Supports brain function and reduces anxiety.",
        fullDesc:
          "Natural nitrogenous active plant compounds that soothe neurological hyperactivity, promote calm cognitive clarity, and eliminate mental stress.",
        image: "/images/unsplash/photo-1532094349884-543bc11b234d.jpg",
        dosage: "120mg Active Complex",
        benefits: ["Calms Nervous Overactivity", "Sharpens Cognitive Focus", "Promotes Emotional Stability", "Protects Brain Cells from Fatigue"],
      },
      {
        id: "saponins",
        name: "Saponins",
        scientificName: "Sitoindosides VII - X",
        shortDesc: "Boosts immunity and improves physical performance.",
        fullDesc:
          "High-potency botanical glycosides that stimulate immune phagocytosis, support cardiovascular blood flow, and enhance physical stamina under exertion.",
        image: "/images/unsplash/photo-1512069772995-ec65ed45afd6.jpg",
        dosage: "85mg Active Glycosides",
        benefits: ["Elevates Macrophage Activity", "Increases Physical Endurance", "Accelerates Post-Exercise Recovery", "Fights Chronic Exhaustion"],
      },
      {
        id: "flavonoids",
        name: "Flavonoids",
        scientificName: "Plant Polyphenolic Antioxidants",
        shortDesc: "Powerful antioxidants that protect cells from damage.",
        fullDesc:
          "Potent botanical polyphenols that scavenge reactive oxygen species, shield mitochondrial membranes, and reduce systemic micro-inflammation.",
        image: "/images/unsplash/photo-1540420773420-3366772f4999.jpg",
        dosage: "45mg Plant Polyphenols",
        benefits: ["Scavenges Free Radicals", "Reduces Muscle Soreness", "Supports Cardiovascular Health", "Promotes Youthful Vitality"],
      },
    ],
  },
  shilajit: {
    id: "shilajit",
    name: "Shilajit",
    category: "Mineral Resin",
    tagline: "Boosts Energy & Stamina",
    subtitle: "Pure Himalayan Resin • >75% Fulvic Acid + 84 Ionic Trace Minerals",
    price: 899,
    originalPrice: 1599,
    rating: 4.95,
    reviewCount: 2410,
    badge: "Gold Grade",
    image: "/products/shilajit.jpg",
    keyHighlights: [
      "Boosts Cellular ATP Energy & Peak Physical Power",
      "Improves Stamina & Muscle Endurance",
      "Rich in 75%+ Active Fulvic Acid for Instant Absorption",
      "Replenishes 84+ Essential Ionic Minerals",
    ],
    badges: [
      { label: "100% Natural", icon: "leaf" },
      { label: "Lab Tested", icon: "flask" },
      { label: "No Added Sugar", icon: "ban" },
      { label: "Vegetarian", icon: "veg" },
    ],
    understandBenefits: [
      "Supercharges Cellular Energy",
      "Improves Stamina & Endurance",
      "Enhances Physical Strength",
      "Supports Hormonal Balance",
      "Boosts Natural Immunity",
    ],
    ingredients: [
      {
        id: "fulvic",
        name: "Fulvic Acid (75%+)",
        scientificName: "Bioactive Humic Substance",
        shortDesc: "Supercharges cellular nutrient transport and energy.",
        fullDesc:
          "A powerful organic electrolyte that penetrates mitochondrial membranes, transporting vital minerals directly into cells for explosive energy.",
        image: "/images/unsplash/photo-1518531933037-91b2f5f229cc.jpg",
        dosage: "500mg Purified Himalayan Extract",
        benefits: ["Boosts Mitochondrial ATP Energy", "Accelerates Deep Nutrient Uptake", "Promotes Cellular Detoxification", "Reduces Physical & Mental Fatigue"],
      },
      {
        id: "minerals",
        name: "84+ Ionic Minerals",
        scientificName: "Macro & Micro Trace Spectrum",
        shortDesc: "Restores electrolyte balance and muscular endurance.",
        fullDesc: "Full spectrum of ionic zinc, magnesium, selenium, iron, and silica in micro-chelated bioavailable form.",
        image: "/images/unsplash/photo-1532094349884-543bc11b234d.jpg",
        dosage: "Natural Ionic Blend",
        benefits: ["Prevents Muscle Cramping & Fatigue", "Strengthens Bones & Connective Tissue", "Promotes Restorative Sleep", "Restores Daily Electrolyte Balance"],
      },
      {
        id: "humic",
        name: "Humic Compounds",
        scientificName: "High Molecular Humic Matrix",
        shortDesc: "Potent natural detoxifier and gut protector.",
        fullDesc: "Natural botanical humic matrix that binds to environmental toxins, supports digestion, and enhances nutrient absorption in the gut.",
        image: "/images/unsplash/photo-1540420773420-3366772f4999.jpg",
        dosage: "150mg Purified Humates",
        benefits: ["Strengthens Digestive Mucosa", "Neutralizes Heavy Metal Residues", "Protects Beneficial Microflora", "Supports Metabolic Balance"],
      },
      {
        id: "dbp",
        name: "Dibenzo-Alpha-Pyrones",
        scientificName: "DBPs & Chromoproteins",
        shortDesc: "Protects and restores cellular CoQ10 levels.",
        fullDesc: "Rare bioactive compounds that shield muscle tissues against oxidative breakdown and sustain high-intensity physical performance.",
        image: "/images/unsplash/photo-1512069772995-ec65ed45afd6.jpg",
        dosage: "65mg Bioactive Complex",
        benefits: ["Elevates Muscle CoQ10 Levels", "Accelerates Workout Recovery", "Supports Healthy Testosterone", "Enhances Cardiovascular Stamina"],
      },
    ],
  },
  mulethi: {
    id: "mulethi",
    name: "Mulethi",
    category: "Respiratory Medicine",
    tagline: "Good for Throat & Respiratory Health",
    subtitle: "Standardized Licorice Root Extract • Soothing Vocal & Gut Relief",
    price: 499,
    originalPrice: 899,
    rating: 4.85,
    reviewCount: 930,
    badge: "Throat Soothe",
    image: "/products/mulethi.jpg",
    keyHighlights: [
      "Soothes Sore Throat, Cough & Vocal Strain",
      "Clears Respiratory Airways of Sticky Phlegm",
      "Protects Stomach Mucosa from Hyper-Acidity",
      "Potent Botanical Antimicrobial & Expectorant Action",
    ],
    badges: [
      { label: "100% Natural", icon: "leaf" },
      { label: "Lab Tested", icon: "flask" },
      { label: "No Added Sugar", icon: "ban" },
      { label: "Vegetarian", icon: "veg" },
    ],
    understandBenefits: [
      "Soothes Sore Throat & Cough",
      "Clears Respiratory Airways",
      "Protects Stomach Mucosa",
      "Balances Digestive Acidity",
      "Boosts Natural Immunity",
    ],
    ingredients: [
      {
        id: "glycyrrhizin",
        name: "Glycyrrhizin (20%+)",
        scientificName: "Glycyrrhiza Glabra Extract",
        shortDesc: "Coats mucous membranes and eases throat discomfort.",
        fullDesc: "A natural botanical saponin that coats irritated vocal membranes, breaks up phlegm, and eases chronic dry coughing.",
        image: "/images/unsplash/photo-1509316975850-ff9c5deb0cd9.jpg",
        dosage: "450mg Standardized Extract",
        benefits: ["Relieves Sore Throat & Hoarseness", "Soothes Acid Reflux & Gastritis", "Calms Persistent Coughing", "Strengthens Mucosal Barrier"],
      },
      {
        id: "liquiritin",
        name: "Liquiritin & Isoliquiritin",
        scientificName: "Flavonoid Glycosides",
        shortDesc: "Relaxes bronchial airways and soothes spasms.",
        fullDesc: "Natural flavonoid glycosides with strong spasmolytic and anti-inflammatory properties that open bronchial airways.",
        image: "/images/unsplash/photo-1512069772995-ec65ed45afd6.jpg",
        dosage: "80mg Bioactive Matrix",
        benefits: ["Opens Constricted Airways", "Relieves Chest Tightness", "Eases Seasonal Allergy Symptoms", "Promotes Clear Breathing"],
      },
      {
        id: "glabridin",
        name: "Glabridin Bio-flavonoid",
        scientificName: "Polyphenolic Isoflavane",
        shortDesc: "Protects against throat & digestive inflammation.",
        fullDesc: "One of the most potent plant-derived antioxidants that protects pharyngeal and esophageal tissues from acid wear.",
        image: "/images/unsplash/photo-1532094349884-543bc11b234d.jpg",
        dosage: "35mg Glabridin Extract",
        benefits: ["Neutralizes Gastric Acid Damage", "Calms Systemic Inflammation", "Protects Cellular DNA", "Supports Liver Health"],
      },
      {
        id: "mucilage",
        name: "Plant Mucilage",
        scientificName: "Natural Polysaccharides",
        shortDesc: "Creates a gentle protective shield over tissues.",
        fullDesc: "Water-soluble plant fibers that form an instant protective liquid barrier along the throat and stomach lining.",
        image: "/images/unsplash/photo-1540420773420-3366772f4999.jpg",
        dosage: "120mg Plant Polysaccharides",
        benefits: ["Immediate Soothing Coating", "Eases Painful Swallowing", "Balances Stomach Acid", "Nourishes Gut Flora"],
      },
    ],
  },
  supplements: {
    id: "supplements",
    name: "Multivitamin & Zinc",
    category: "Clinical Micronutrient Medicine",
    tagline: "Immunity, Vitality & Cellular Defense",
    subtitle: "24 Bioactive Vitamins & Chelated Minerals • High Potency Zinc & Methylated B-Complex",
    price: 649,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 1120,
    badge: "Immune Shield",
    image: "/products/supplements.jpg",
    keyHighlights: [
      "24 Essential Bioavailable Vitamins & Chelated Zinc",
      "Sustained All-Day Cellular Energy & Immune Defense",
      "Zinc Bisglycinate + Active Vitamin C & Vegan D3",
      "Zero Artificial Fillers, Heavy Metals or Synthetic Colors",
    ],
    badges: [
      { label: "100% Natural", icon: "leaf" },
      { label: "Lab Tested", icon: "flask" },
      { label: "No Added Sugar", icon: "ban" },
      { label: "Vegetarian", icon: "veg" },
    ],
    understandBenefits: [
      "Supercharges Cellular Immunity",
      "Eliminates Daytime Fatigue",
      "Sharpens Cognitive Clarity",
      "Accelerates Muscle Recovery",
      "Fortifies Bone & Joint Health",
    ],
    ingredients: [
      {
        id: "zinc",
        name: "Zinc Bisglycinate Complex",
        scientificName: "Chelated Amino Acid Complex",
        shortDesc: "Highly absorbable chelated mineral for peak immunity.",
        fullDesc: "Gentle amino-acid bound zinc that fuels testosterone synthesis, white blood cell activity, and rapid tissue healing.",
        image: "/images/unsplash/photo-1532094349884-543bc11b234d.jpg",
        dosage: "25mg Elemental Zinc",
        benefits: ["Strengthens Innate Immune Defense", "Accelerates Muscle Recovery", "Supports Healthy Hormone Levels", "Prevents Daily Nutrient Depletion"],
      },
      {
        id: "bcomplex",
        name: "Methylated B-Complex",
        scientificName: "Bioactive Coenzyme Vitamins",
        shortDesc: "Fuels cellular energy and eliminates mental fatigue.",
        fullDesc: "Pre-methylated folate (5-MTHF) and methylcobalamin B12 that convert carbohydrates and proteins directly into cellular ATP.",
        image: "/images/unsplash/photo-1512069772995-ec65ed45afd6.jpg",
        dosage: "High Potency B-Spectrum",
        benefits: ["Eliminates Afternoon Energy Crashes", "Sharpens Mental Alertness", "Enhances Red Blood Cell Oxygenation", "Nurtures Healthy Nervous System"],
      },
      {
        id: "vitd3k2",
        name: "Vegan Vitamin D3 + K2",
        scientificName: "Lichen D3 + MK-7 Menaquinone",
        shortDesc: "Synergistic duo for strong bones and heart health.",
        fullDesc: "Plant-derived cholecalciferol combined with natural fermented Menaquinone-7 to direct calcium into bones, not arteries.",
        image: "/images/unsplash/photo-1509316975850-ff9c5deb0cd9.jpg",
        dosage: "2000 IU D3 + 55mcg K2",
        benefits: ["Maximizes Calcium Bone Deposition", "Elevates Mood and Vitality", "Supports Immune Cell Signaling", "Promotes Vascular Flexibility"],
      },
      {
        id: "adaptogens",
        name: "Botanical Adaptogen Blend",
        scientificName: "Piperine & Bio-enhancers",
        shortDesc: "Combats daily oxidative stress & athletic fatigue.",
        fullDesc: "Standardized herbal actives including Piperine for 2000% increased nutrient absorption and sustained daily physical endurance.",
        image: "/images/unsplash/photo-1540420773420-3366772f4999.jpg",
        dosage: "100mg Bioactive Matrix",
        benefits: ["Multiplies Micronutrient Uptake", "Fights Exercise-Induced Soreness", "Balances Adrenal Response", "Promotes Longevity & Vigor"],
      },
    ],
  },
  triphala: {
    id: "triphala",
    name: "Triphala Guggulu",
    category: "Clinical Detox Medicine",
    tagline: "Natural Detox & Cholesterol Control",
    subtitle: "Classical Ayurvedic Formulation for Deep Colon Cleanse & Lipid Regulation",
    price: 549,
    originalPrice: 999,
    rating: 4.92,
    reviewCount: 1460,
    badge: "Colon Cleanse",
    image: "/products/triphala.jpg",
    keyHighlights: [
      "Promotes Deep Colon Cleansing & Healthy Regularity",
      "Helps Regulate LDL Cholesterol & Serum Lipids",
      "Relieves Joint Stiffness & Systemic Inflammation",
      "Stimulates Metabolic Digestive Fire (Agni)",
    ],
    badges: [
      { label: "100% Natural", icon: "leaf" },
      { label: "Lab Tested", icon: "flask" },
      { label: "No Added Sugar", icon: "ban" },
      { label: "Vegetarian", icon: "veg" },
    ],
    understandBenefits: [
      "Deep Colon Detoxification",
      "Regulates Lipid & Cholesterol",
      "Relieves Joint Stiffness",
      "Boosts Metabolic Digestion",
      "Supports Healthy Liver",
    ],
    ingredients: [
      {
        id: "amalaki",
        name: "Amalaki Extract",
        scientificName: "Emblica Officinalis",
        shortDesc: "Richest botanical source of Vitamin C and antioxidants.",
        fullDesc: "Potent rejuvenating rasayana that protects gut mucosal membranes, supports cellular immunity, and neutralizes free radicals.",
        image: "/images/unsplash/photo-1509316975850-ff9c5deb0cd9.jpg",
        dosage: "250mg Pure Extract",
        benefits: ["High Vitamin C Immune Shield", "Enhances Digestive Absorption", "Rejuvenates Liver Tissue", "Promotes Longevity"],
      },
      {
        id: "bibhitaki",
        name: "Bibhitaki Extract",
        scientificName: "Terminalia Bellirica",
        shortDesc: "Clears excess mucus, toxins, and internal congestion.",
        fullDesc: "Detoxifying fruit extract with powerful astringent qualities that breaks down stubborn mucosal toxins in the respiratory and GI tract.",
        image: "/images/unsplash/photo-1532094349884-543bc11b234d.jpg",
        dosage: "250mg Pure Extract",
        benefits: ["Clears Respiratory Phlegm", "Detoxifies Blood Vessels", "Eliminates Internal Toxins", "Supports Gut Flora"],
      },
      {
        id: "haritaki",
        name: "Haritaki Extract",
        scientificName: "Terminalia Chebula",
        shortDesc: "The King of Medicines for complete colon harmony.",
        fullDesc: "Gentle natural bowel regulator that stimulates peristalsis without causing dependency, cramping, or loose stools.",
        image: "/images/unsplash/photo-1512069772995-ec65ed45afd6.jpg",
        dosage: "250mg Pure Extract",
        benefits: ["Stimulates Healthy Peristalsis", "Balances Stomach Acidity", "Promotes Nutrient Assimilation", "Soothes Gut Spasms"],
      },
      {
        id: "guggulu",
        name: "Shuddha Guggulu",
        scientificName: "Commiphora Mukul Resin",
        shortDesc: "Standardized guggulsterones for healthy lipid metabolism.",
        fullDesc: "Purified resin rich in E- and Z-Guggulsterones that optimize cholesterol binding and alleviate joint swelling.",
        image: "/images/unsplash/photo-1540420773420-3366772f4999.jpg",
        dosage: "250mg Purified Resin",
        benefits: ["Optimizes HDL/LDL Balance", "Relieves Arthritis Pain", "Supports Thyroid Metabolism", "Cleanses Arterial Channels"],
      },
    ],
  },
};

export default function ProductsPage() {
  const [selectedProdId, setSelectedProdId] = useState<string>("ashwagandha");
  const currentProduct = products[selectedProdId] || products.ashwagandha;

  const [activeIngredientIdx, setActiveIngredientIdx] = useState(0);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const modalScrollRef = useRef<HTMLDivElement>(null);
  const deepDiveSectionRef = useRef<HTMLDivElement>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);

  const handleOpenProductModal = (productId: string) => {
    setSelectedProdId(productId);
    setActiveIngredientIdx(0);
    setIsProductModalOpen(true);
  };

  const handleBuyNow = (productId: string) => {
    setSelectedProdId(productId);
    setActiveIngredientIdx(0);
    setIsProductModalOpen(true);
  };

  const handleExploreIngredientInModal = (idx: number) => {
    setActiveIngredientIdx(idx);
    deepDiveSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNextIngredient = () => {
    setActiveIngredientIdx((prev) => (prev + 1) % currentProduct.ingredients.length);
  };

  const handlePrevIngredient = () => {
    setActiveIngredientIdx((prev) =>
      prev === 0 ? currentProduct.ingredients.length - 1 : prev - 1
    );
  };

  const currentIngredient = currentProduct.ingredients[activeIngredientIdx] || currentProduct.ingredients[0];

  return (
    <main style={{ background: "linear-gradient(180deg, #FAF8F5 0%, #ffffff 40%, #F5F2EB 100%)", minHeight: "100vh", color: "#1E251F", fontFamily: "var(--font-manrope), sans-serif" }}>
      <Navbar />

      <div style={{ paddingTop: "76px" }}>
        
        {/* ======================================================== */}
        {/* HERO BANNER - Ashwagandha Nature & Science Showcase       */}
        {/* ======================================================== */}
        <section style={{ maxWidth: "1680px", margin: "16px auto 0", padding: "0 clamp(16px, 2.5vw, 40px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "relative",
              borderRadius: "28px",
              overflow: "hidden",
              minHeight: "380px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 16px 45px rgba(13, 38, 25, 0.08)",
              border: "1.5px solid #E2E8F0",
              background: "#F4F5F2",
            }}
            className="products-ashwagandha-hero-container"
          >
            {/* DESKTOP BACKGROUND IMAGE (BOTTLE + LIVE SALE 30% OFF + ROOTS & CAPSULES + RIGHT PILL CARDS) */}
            <img
              src="/images/products-ashwagandha-hero.png"
              alt="Ashwagandha - Pure, Potent, Natural. For a Stronger, Healthier You"
              className="products-ashwagandha-desktop-bg"
            />

            {/* DESKTOP LEFT BACKDROP GRADIENT MASK (SOFT BLEND FOR TEXT CONTRAST) */}
            <div
              className="products-ashwagandha-backdrop-mask"
            />

            {/* MOBILE HERO VISUAL (BOTTLE + LIVE SALE 30% OFF + ROOTS & CAPSULES + FEATURE CARDS) */}
            <div className="products-ashwagandha-mobile-visual">
              <img
                src="/images/products-ashwagandha-hero-mobile.png"
                alt="Ashwagandha - Pure, Potent, Natural. For a Stronger, Healthier You"
                className="products-ashwagandha-mobile-img"
              />
              <div className="products-ashwagandha-mobile-fade" />
            </div>

            {/* LIVE CODED CONTENT */}
            <div
              className="products-ashwagandha-content-left"
            >
              {/* BADGE */}
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#B45309",
                  marginBottom: "8px",
                  display: "inline-block",
                }}
              >
                PURE. POTENT. NATURAL.
              </span>

              {/* HEADING */}
              <h1
                style={{
                  fontSize: "clamp(1.75rem, 2.7vw, 2.5rem)",
                  fontWeight: 900,
                  color: "#0A1D37",
                  lineHeight: 1.14,
                  marginBottom: "8px",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-serif), Georgia, serif",
                }}
              >
                Ashwagandha<br />
                for a Stronger,<br />
                Healthier You
              </h1>

              {/* SUBHEADING */}
              <p
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#0F172A",
                  marginBottom: "16px",
                  lineHeight: "1.4",
                }}
              >
                Backed by science. Rooted in nature.
              </p>

              {/* 4 FEATURE HIGHLIGHTS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "10px",
                  marginBottom: "22px",
                  maxWidth: "460px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1.5px solid #15803D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#15803D",
                      marginBottom: "6px",
                      background: "rgba(21, 128, 61, 0.08)",
                    }}
                  >
                    <Leaf size={15} />
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#1E293B", lineHeight: "1.2" }}>
                    Boosts Stress Resilience
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1.5px solid #15803D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#15803D",
                      marginBottom: "6px",
                      background: "rgba(21, 128, 61, 0.08)",
                    }}
                  >
                    <Zap size={15} />
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#1E293B", lineHeight: "1.2" }}>
                    Supports Energy & Vitality
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1.5px solid #15803D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#15803D",
                      marginBottom: "6px",
                      background: "rgba(21, 128, 61, 0.08)",
                    }}
                  >
                    <ShieldCheck size={15} />
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#1E293B", lineHeight: "1.2" }}>
                    Enhances Immunity
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1.5px solid #15803D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#15803D",
                      marginBottom: "6px",
                      background: "rgba(21, 128, 61, 0.08)",
                    }}
                  >
                    <Sparkles size={15} />
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#1E293B", lineHeight: "1.2" }}>
                    Promotes Overall Wellness
                  </span>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <button
                  onClick={() => handleBuyNow("ashwagandha")}
                  style={{
                    background: "linear-gradient(180deg, #057A55 0%, #03543F 100%)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "13.5px",
                    padding: "11px 22px",
                    borderRadius: "100px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 6px 18px rgba(4, 120, 87, 0.35)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease",
                  }}
                  className="hover-lift"
                >
                  <span>Shop Ashwagandha</span>
                  <ArrowRight size={15} />
                </button>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: "13px",
                  }}
                >
                  <ShoppingCart size={17} color="#B45309" />
                  <span style={{ color: "#334155" }}>Limited Time Offer</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ======================================================== */}
        {/* CIRCULAR CATEGORIES ROW - Real Photos in Bluish Rings    */}
        {/* ======================================================== */}
        <section style={{ maxWidth: "1680px", margin: "40px auto 0", padding: "0 clamp(16px, 2.5vw, 40px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#15803D", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Quick Formula Select
            </span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              5 Formulations
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "clamp(16px, 2vw, 26px)",
              overflowX: "auto",
              paddingBottom: "16px",
              paddingTop: "6px",
            }}
          >
            {Object.values(products).map((prod) => {
              const isSelected = prod.id === selectedProdId;
              return (
                <motion.div
                  key={prod.id}
                  onClick={() => handleOpenProductModal(prod.id)}
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                    minWidth: "clamp(115px, 8.5vw, 140px)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(105px, 7.8vw, 126px)",
                      height: "clamp(105px, 7.8vw, 126px)",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: isSelected ? "3.5px solid #15803D" : "2.5px solid #D5E0D5",
                      background: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: isSelected
                        ? "0 10px 26px rgba(21, 128, 61, 0.28)"
                        : "0 6px 18px rgba(13, 38, 25, 0.08)",
                      position: "relative",
                      transition: "all 0.2s",
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <span
                    style={{
                      marginTop: "12px",
                      fontSize: "14px",
                      fontWeight: isSelected ? 800 : 700,
                      color: isSelected ? "#15803D" : "#1e293b",
                      textAlign: "center",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {prod.name.split(" ")[0]}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* TRUST STRIP                                              */}
        {/* ======================================================== */}
        <section style={{ maxWidth: "1680px", margin: "30px auto 0", padding: "0 clamp(16px, 2.5vw, 40px)" }}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #D5E0D5",
              borderRadius: "24px",
              padding: "26px 30px",
              boxShadow: "0 6px 25px rgba(21, 128, 61, 0.05)",
              textAlign: "center",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#15803D", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
              <ShieldCheck size={15} />
              <span>Pharma-Grade Guarantee</span>
            </div>
            <h3
              style={{
                fontSize: "clamp(20px, 2.8vw, 25px)",
                fontWeight: 800,
                color: "#1E251F",
                marginBottom: "22px",
                letterSpacing: "-0.01em",
              }}
            >
              Nature&apos;s Purest Actives. Proven by Molecular Science.
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "20px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", border: "1.5px solid #d1e8b0", color: "#7CA832", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F4EF" }}>
                  <Leaf size={22} />
                </div>
                <span style={{ fontSize: "13.5px", fontWeight: 800, color: "#1E251F" }}>100% Bioactive</span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>Zero synthetic additives</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", border: "1.5px solid #d1e8b0", color: "#15803D", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F4EF" }}>
                  <FlaskConical size={22} />
                </div>
                <span style={{ fontSize: "13.5px", fontWeight: 800, color: "#1E251F" }}>Clinical Lab Tested</span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>HPLC verified potency</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", border: "1.5px solid #d1e8b0", color: "#2D5A27", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F4EF" }}>
                  <ShieldCheck size={22} />
                </div>
                <span style={{ fontSize: "13.5px", fontWeight: 800, color: "#1E251F" }}>GMP Certified</span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>Pharma facility safety</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", border: "1.5px solid #d1e8b0", color: "#7CA832", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F4EF" }}>
                  <Truck size={22} />
                </div>
                <span style={{ fontSize: "13.5px", fontWeight: 800, color: "#1E251F" }}>Cold-Chain Delivery</span>
                <span style={{ fontSize: "11px", color: "#64748b" }}>Dispatched in 24 Hours</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* "OUR PRODUCTS" 8-CARD MEDICINE CATALOG                   */}
        {/* Real Commercial Photography + Bluish UI & Animations     */}
        {/* ======================================================== */}
        <section ref={productsGridRef} style={{ maxWidth: "1680px", margin: "65px auto 90px", padding: "0 clamp(16px, 2.5vw, 40px)" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#D5E0D5", color: "#7CA832", padding: "4px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
              <Sparkles size={13} />
              <span>Evidence-Led Pharmacy</span>
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                color: "#1E251F",
                marginBottom: "8px",
                letterSpacing: "-0.02em",
              }}
            >
              Our Clinical Products
            </h2>
            <p style={{ fontSize: "16px", color: "#475569", maxWidth: "600px", margin: "0 auto" }}>
              Backed by Nature, Proven by Science • Click any product to launch the interactive journey modal
            </p>
          </div>

          {/* Responsive 8-Product Grid */}
          {/* Responsive 5-Product Grid */}
          <div className="products-clinical-grid">
            {Object.values(products).map((prod, index) => (
              <motion.div
                key={prod.id}
                onClick={() => handleOpenProductModal(prod.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "#ffffff",
                  borderRadius: "22px",
                  border: "1.5px solid #D5E0D5",
                  padding: "18px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(21, 128, 61, 0.05)",
                  transition: "border-color 0.25s, box-shadow 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#15803D";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(21, 128, 61, 0.16)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#D5E0D5";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(21, 128, 61, 0.05)";
                }}
              >
                {/* Top Badge: Best Seller / Clinical */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(124, 168, 50, 0.1)",
                    color: "#7CA832",
                    border: "1px solid rgba(124, 168, 50, 0.25)",
                    padding: "2px 8px",
                    borderRadius: "100px",
                    fontSize: "10.5px",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    zIndex: 2,
                  }}
                >
                  {prod.badge}
                </div>

                {/* Rating Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#1E251F",
                    background: "#ffffff",
                    padding: "2px 7px",
                    borderRadius: "100px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                    zIndex: 2,
                  }}
                >
                  <Star size={11} fill="#E8A324" color="#E8A324" />
                  <span>{prod.rating}</span>
                </div>

                {/* Real Commercial Product Photography Container */}
                <div
                  style={{
                    height: "170px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "4px 0 12px",
                    borderRadius: "14px",
                    overflow: "hidden",
                    background: "#f8fafc",
                    position: "relative",
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                </div>

                {/* Category tag */}
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#15803D",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "3px",
                  }}
                >
                  {prod.category}
                </span>

                {/* Product Title */}
                <h3
                  style={{
                    fontSize: "16.5px",
                    fontWeight: 800,
                    color: "#1E251F",
                    marginBottom: "5px",
                    lineHeight: 1.25,
                    textDecoration: "underline",
                    textDecorationColor: "#15803D",
                    textUnderlineOffset: "4px",
                    textDecorationThickness: "2px",
                  }}
                >
                  {prod.name}
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontSize: "12px",
                    color: "#475569",
                    lineHeight: 1.4,
                    marginBottom: "16px",
                    minHeight: "34px",
                  }}
                >
                  {prod.tagline}
                </p>

                {/* High-Converting Interactive Product Modal CTA */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow(prod.id);
                  }}
                  style={{
                    width: "100%",
                    marginTop: "auto",
                    padding: "10px 10px",
                    background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
                    color: "#ffffff",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "12px",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "0 6px 18px rgba(21, 128, 61, 0.25)",
                    letterSpacing: "0.01em",
                  }}
                >
                  <Sparkles size={13} color="#86EFAC" />
                  <span>Buy Now</span>
                  <ArrowRight size={13} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* STEP-BY-STEP NUTRABUILD PRODUCT JOURNEY MODAL             */}
        {/* ======================================================== */}
        <ProductJourneyModal
          isOpen={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          productName={currentProduct.name}
        />


      </div>

      <Footer />
    </main>
  );
}
