"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Rocket,
  X,
  CheckCircle2,
  Plus,
  Minus,
  Leaf,
  Clock,
  Sprout,
  SlidersHorizontal,
  Scale,
  TrendingUp,
  Settings,
  Zap,
  Heart,
} from "lucide-react";

interface IngredientItem {
  id: string;
  name: string;
  botanical: string;
  desc: string;
  image: string;
  baseDosage: number;
  unit: string;
  basePrice: number;
  dosageStep: number;
  minDosage: number;
  maxDosage: number;
  marketRange: string;
  impact: "High" | "Medium" | "Low";
  selected: boolean;
  dosage: number;
}

interface PackagingOption {
  id: string;
  name: string;
  subtext: string;
  price: number;
  image: string;
}

interface OuterOption {
  id: string;
  name: string;
  subtext: string;
  price: number;
  image: string;
}

interface LabelOption {
  id: string;
  name: string;
  subtext: string;
  price: number;
  image: string;
}

const INITIAL_INGREDIENTS: IngredientItem[] = [
  {
    id: "ashwagandha",
    name: "Ashwagandha Extract",
    botanical: "Withania somnifera (KSM-66 / 5% Withanolides)",
    desc: "Helps reduce cortisol, relieve chronic stress, and boost physical stamina.",
    image: "/images/unsplash/photo-1615485290382-441e4d049cb5.jpg",
    baseDosage: 300,
    unit: "mg",
    basePrice: 28.0,
    dosageStep: 25,
    minDosage: 100,
    maxDosage: 600,
    marketRange: "250 - 600 mg",
    impact: "High",
    selected: true,
    dosage: 300,
  },
  {
    id: "black_pepper",
    name: "Black Pepper Extract",
    botanical: "Piper nigrum (95% Piperine)",
    desc: "Improves gut absorption and maximizes bioavailability of herbal extracts.",
    image: "/images/unsplash/photo-1599940824399-b87987ceb72a.jpg",
    baseDosage: 10,
    unit: "mg",
    basePrice: 5.0,
    dosageStep: 1,
    minDosage: 5,
    maxDosage: 20,
    marketRange: "5 - 20 mg",
    impact: "High",
    selected: true,
    dosage: 10,
  },
  {
    id: "l_theanine",
    name: "L-Theanine",
    botanical: "Natural Amino Acid",
    desc: "Promotes calm relaxation without sedation, synergy with adaptogens.",
    image: "/images/unsplash/photo-1544367567-0f2fcb009e0b.jpg",
    baseDosage: 50,
    unit: "mg",
    basePrice: 12.0,
    dosageStep: 5,
    minDosage: 25,
    maxDosage: 100,
    marketRange: "25 - 100 mg",
    impact: "Medium",
    selected: true,
    dosage: 50,
  },
  {
    id: "zinc",
    name: "Zinc",
    botanical: "Zinc Citrate / Bisglycinate",
    desc: "Supports immune defense, cellular repair, and hormonal homeostasis.",
    image: "/images/unsplash/photo-1584308666744-24d5c474f2ae.jpg",
    baseDosage: 10,
    unit: "mg",
    basePrice: 3.0,
    dosageStep: 1,
    minDosage: 5,
    maxDosage: 20,
    marketRange: "5 - 20 mg",
    impact: "Medium",
    selected: true,
    dosage: 10,
  },
  {
    id: "vitamin_d3",
    name: "Vitamin D3",
    botanical: "Cholecalciferol",
    desc: "Supports bone density, neuromuscular integrity, and positive mood.",
    image: "/images/unsplash/photo-1550572017-ed200f5e6343.jpg",
    baseDosage: 600,
    unit: "IU",
    basePrice: 4.0,
    dosageStep: 50,
    minDosage: 400,
    maxDosage: 1000,
    marketRange: "400 - 1000 IU",
    impact: "Medium",
    selected: true,
    dosage: 600,
  },
  {
    id: "excipients",
    name: "Excipients & Others",
    botanical: "Clean-label Plant Binders",
    desc: "Pharmaceutical-grade plant cellulose and natural glidant complex.",
    image: "/images/unsplash/photo-1584308666744-24d5c474f2ae.jpg",
    baseDosage: 120,
    unit: "mg",
    basePrice: 6.0,
    dosageStep: 10,
    minDosage: 50,
    maxDosage: 200,
    marketRange: "-",
    impact: "Low",
    selected: true,
    dosage: 120,
  },
];

const BOTTLE_OPTIONS: PackagingOption[] = [
  {
    id: "hdpe_white",
    name: "HDPE White Bottle",
    subtext: "(60 Capsules)",
    price: 8.0,
    image: "/packaging/hdpe_white.jpg",
  },
  {
    id: "hdpe_black",
    name: "HDPE Black Bottle",
    subtext: "(60 Capsules)",
    price: 10.0,
    image: "/packaging/hdpe_black.jpg",
  },
  {
    id: "pet_transparent",
    name: "PET Transparent Bottle",
    subtext: "(60 Capsules)",
    price: 9.5,
    image: "/packaging/pet_clear.jpg",
  },
  {
    id: "amber_glass",
    name: "Amber Glass Bottle",
    subtext: "(60 Capsules)",
    price: 15.0,
    image: "/packaging/amber_glass.jpg",
  },
  {
    id: "alu_blister",
    name: "Alu-Alu Blister Pack",
    subtext: "(60 Capsules / 6 Strips)",
    price: 7.5,
    image: "/packaging/alu_blister.jpg",
  },
];

const OUTER_OPTIONS: OuterOption[] = [
  {
    id: "shrink_wrap",
    name: "Shrink Wrap",
    subtext: "(with Heat Seal)",
    price: 2.0,
    image: "/packaging/outer_shrink_wrap.jpg",
  },
  {
    id: "paper_box",
    name: "Paper Box",
    subtext: "(Premium Mono Carton)",
    price: 4.0,
    image: "/packaging/outer_paper_box.jpg",
  },
  {
    id: "tin_box",
    name: "Tin Box",
    subtext: "(Metal Keepsake Can)",
    price: 12.0,
    image: "/packaging/outer_tin_box.jpg",
  },
  {
    id: "pouch_pack",
    name: "Pouch Pack",
    subtext: "(Stand-up Zipper Pouch)",
    price: 3.0,
    image: "/packaging/outer_pouch_pack.jpg",
  },
  {
    id: "kraft_box",
    name: "Eco Kraft Box",
    subtext: "(Recycled Sustainable)",
    price: 5.0,
    image: "/packaging/outer_kraft_box.jpg",
  },
];

const LABEL_OPTIONS: LabelOption[] = [
  {
    id: "basic_label",
    name: "Basic Label",
    subtext: "(Sticker Label)",
    price: 1.0,
    image: "/images/unsplash/photo-1522335789203-aabd1fc54bc9.jpg",
  },
  {
    id: "premium_label",
    name: "Premium Label",
    subtext: "(Glossy Finish)",
    price: 2.0,
    image: "/images/unsplash/photo-1556228720-195a672e8a03.jpg",
  },
  {
    id: "matte_label",
    name: "Matte Label",
    subtext: "(Premium Soft-Touch)",
    price: 3.0,
    image: "/images/unsplash/photo-1584308666744-24d5c474f2ae.jpg",
  },
  {
    id: "embossed_label",
    name: "Embossed Label",
    subtext: "(Luxury Foil Stamp)",
    price: 4.0,
    image: "/images/unsplash/photo-1608571423902-eed4a5ad8108.jpg",
  },
  {
    id: "custom_design",
    name: "Custom Design",
    subtext: "(Zenon Creative Team)",
    price: 5.0,
    image: "/images/unsplash/photo-1542744094-3a31727221eb.jpg",
  },
];

interface FoilOption {
  id: string;
  name: string;
  price: number;
  colorHex: string;
  gradient?: string;
}

const FOIL_OPTIONS: FoilOption[] = [
  { id: "none", name: "None", price: 0, colorHex: "#16A34A" },
  { id: "gold", name: "Gold", price: 2.0, colorHex: "#D97706", gradient: "linear-gradient(135deg, #FDE68A 0%, #D97706 100%)" },
  { id: "silver", name: "Silver", price: 2.0, colorHex: "#94A3B8", gradient: "linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)" },
  { id: "red", name: "Red", price: 2.5, colorHex: "#DC2626", gradient: "linear-gradient(135deg, #F87171 0%, #DC2626 100%)" },
];

function LabelGraphic({ labelId, width = 64, height = 64 }: { labelId: string; width?: number; height?: number }) {
  if (labelId === "basic_label") {
    return (
      <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="16" width="36" height="52" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="28" y="10" width="24" height="8" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        <rect x="24" y="24" width="32" height="36" rx="3" fill="#15803D" />
        <rect x="28" y="28" width="24" height="28" rx="2" fill="#166534" />
        <circle cx="40" cy="38" r="6" fill="#86EFAC" opacity="0.8" />
        <rect x="32" y="48" width="16" height="2" rx="1" fill="#FFFFFF" opacity="0.9" />
      </svg>
    );
  }
  if (labelId === "premium_label") {
    return (
      <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="prem-bottle" x1="20" y1="10" x2="60" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="prem-foil" x1="30" y1="30" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <rect x="22" y="16" width="36" height="52" rx="6" fill="url(#prem-bottle)" stroke="#60A5FA" strokeWidth="1.5" />
        <rect x="28" y="10" width="24" height="8" rx="2" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 24,18 L 32,18 L 26,66 L 24,66 Z" fill="#FFFFFF" opacity="0.25" />
        <rect x="26" y="26" width="28" height="32" rx="3" fill="#0F172A" stroke="url(#prem-foil)" strokeWidth="1" />
        <circle cx="40" cy="38" r="6" fill="url(#prem-foil)" />
        <rect x="31" y="48" width="18" height="2" rx="1" fill="#FFFFFF" />
      </svg>
    );
  }
  if (labelId === "matte_label") {
    return (
      <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="matte-body" x1="20" y1="20" x2="60" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        <rect x="20" y="20" width="40" height="46" rx="6" fill="url(#matte-body)" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="26" y="14" width="28" height="8" rx="3" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
        <rect x="25" y="28" width="30" height="28" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="29" y="34" width="22" height="3" rx="1" fill="#475569" />
        <rect x="32" y="40" width="16" height="2" rx="1" fill="#94A3B8" />
        <rect x="34" y="45" width="12" height="2" rx="1" fill="#CBD5E1" />
      </svg>
    );
  }
  if (labelId === "embossed_label") {
    return (
      <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="emboss-foil" x1="30" y1="30" x2="50" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <path d="M 22,18 L 58,18 L 56,66 C 56,68 24,68 24,66 Z" fill="#111827" stroke="#374151" strokeWidth="1.5" />
        <path d="M 20,18 L 60,18" stroke="#4B5563" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="40" cy="38" r="8" fill="none" stroke="url(#emboss-foil)" strokeWidth="1.5" />
        <path d="M 40,33 L 44,41 L 36,41 Z" fill="url(#emboss-foil)" />
        <rect x="30" y="50" width="20" height="2.5" rx="1" fill="url(#emboss-foil)" />
      </svg>
    );
  }
  return (
    <svg width={width} height={height} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="16" width="36" height="52" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <rect x="28" y="10" width="24" height="8" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
      <circle cx="40" cy="38" r="10" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 36,38 L 39,41 L 45,34" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="30" y="52" width="20" height="2" rx="1" fill="#64748B" />
    </svg>
  );
}

function LabelLivePreview({
  productName,
  selectedLabel,
  selectedFoil,
}: {
  productName: string;
  selectedLabel: LabelOption;
  selectedFoil: FoilOption;
}) {
  const isFoil = selectedFoil.id !== "none";
  const foilGradient = selectedFoil.gradient || "none";
  const foilColor = selectedFoil.colorHex;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
        minHeight: "150px",
        borderRadius: "14px",
        background: "#FFFFFF",
        border: isFoil ? `2px solid ${foilColor}` : "1.5px solid #E2E8F0",
        boxShadow: isFoil ? `0 8px 20px ${foilColor}25` : "0 4px 16px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "14px 18px",
        transition: "all 0.25s ease",
      }}
    >
      {/* Botanical Leaves Background Artwork */}
      <div
        style={{
          position: "absolute",
          left: "-12px",
          bottom: "-12px",
          width: "90px",
          height: "90px",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      >
        <Leaf size={90} color="#16A34A" />
      </div>

      <div
        style={{
          position: "absolute",
          right: "-10px",
          bottom: "-10px",
          width: "95px",
          height: "95px",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      >
        <Sprout size={95} color="#15803D" />
      </div>

      {/* Top Header Row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "13px" }}>🌿</span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: isFoil ? foilGradient : undefined,
              color: isFoil ? "transparent" : "#0F172A",
              WebkitBackgroundClip: isFoil ? "text" : undefined,
            }}
          >
            VARADACO
          </span>
        </div>

        {isFoil && (
          <span
            style={{
              fontSize: "9.5px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              padding: "2px 8px",
              borderRadius: "9999px",
              background: foilGradient,
              color: "#FFFFFF",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
            }}
          >
            {selectedFoil.name} Foil
          </span>
        )}
      </div>

      {/* Center Product Title & Strength */}
      <div style={{ textAlign: "center", zIndex: 1, margin: "4px 0" }}>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 800,
            margin: 0,
            letterSpacing: "-0.02em",
            background: isFoil && selectedLabel.id === "embossed_label" ? foilGradient : undefined,
            color: isFoil && selectedLabel.id === "embossed_label" ? "transparent" : "#0F172A",
            WebkitBackgroundClip: isFoil && selectedLabel.id === "embossed_label" ? "text" : undefined,
          }}
        >
          {productName || "Ashwagandha"}
        </h3>
        <div style={{ fontSize: "12px", fontWeight: 700, color: "#16A34A", marginTop: "2px" }}>
          500mg
        </div>
        <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, marginTop: "1px" }}>
          Stress Support
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "10px",
          color: "#94A3B8",
          fontWeight: 600,
          borderTop: "1px solid #F1F5F9",
          paddingTop: "6px",
          zIndex: 1,
        }}
      >
        <span>60 Veg Capsules</span>
        <span>{selectedLabel.name}</span>
        <span>GMP Certified</span>
      </div>
    </div>
  );
}

interface CapOption {
  id: string;
  name: string;
  price: number;
  colorHex: string;
  subtext?: string;
  image?: string;
}

const CAP_TYPES = [
  "Standard Cap",
  "Child-Resistant",
  "Flip-Top",
  "Tamper-Evident",
  "Premium",
];

const CAP_OPTIONS: CapOption[] = [
  { id: "white", name: "White", price: 1.50, colorHex: "#FFFFFF", subtext: "Push & Turn Cap", image: "/caps/cap_white.png" },
  { id: "black", name: "Black", price: 2.00, colorHex: "#111827", subtext: "Matte Black Cap", image: "/caps/cap_black.png" },
  { id: "red", name: "Red", price: 2.25, colorHex: "#DC2626", subtext: "Tamper-Evident Red", image: "/caps/cap_red.png" },
  { id: "blue", name: "Blue", price: 2.25, colorHex: "#2563EB", subtext: "Flip-Off Blue Cap", image: "/caps/cap_blue.png" },
  { id: "green", name: "Green", price: 2.25, colorHex: "#16A34A", subtext: "Emerald Green Cap", image: "/caps/cap_green.png" },
  { id: "gold", name: "Gold", price: 4.00, colorHex: "#D97706", subtext: "Threaded Gold Cap", image: "/caps/cap_gold.png" },
  { id: "silver", name: "Silver", price: 4.00, colorHex: "#94A3B8", subtext: "Aluminum Silver Cap", image: "/caps/cap_silver.png" },
];

function Cap3DGraphic({ capId, width = 72, height = 52 }: { capId: string; width?: number; height?: number }) {
  const capConfigs: Record<string, {
    primaryGrad: [string, string, string];
    topGrad: [string, string];
    ribHighlight: string;
    ribShadow: string;
    border: string;
    glow: string;
  }> = {
    white: {
      primaryGrad: ["#FFFFFF", "#F3F4F6", "#D1D5DB"],
      topGrad: ["#FFFFFF", "#E5E7EB"],
      ribHighlight: "rgba(255,255,255,0.9)",
      ribShadow: "rgba(156,163,175,0.4)",
      border: "#D1D5DB",
      glow: "rgba(0,0,0,0.06)",
    },
    black: {
      primaryGrad: ["#374151", "#1F2937", "#0F172A"],
      topGrad: ["#475569", "#1E293B"],
      ribHighlight: "rgba(148,163,184,0.35)",
      ribShadow: "rgba(0,0,0,0.75)",
      border: "#1E293B",
      glow: "rgba(0,0,0,0.3)",
    },
    red: {
      primaryGrad: ["#EF4444", "#DC2626", "#991B1B"],
      topGrad: ["#F87171", "#DC2626"],
      ribHighlight: "rgba(254,202,202,0.55)",
      ribShadow: "rgba(127,29,29,0.75)",
      border: "#B91C1C",
      glow: "rgba(220,38,38,0.25)",
    },
    blue: {
      primaryGrad: ["#3B82F6", "#2563EB", "#1D4ED8"],
      topGrad: ["#60A5FA", "#2563EB"],
      ribHighlight: "rgba(191,219,254,0.55)",
      ribShadow: "rgba(30,58,138,0.75)",
      border: "#1D4ED8",
      glow: "rgba(37,99,235,0.25)",
    },
    green: {
      primaryGrad: ["#22C55E", "#16A34A", "#15803D"],
      topGrad: ["#4ADE80", "#16A34A"],
      ribHighlight: "rgba(187,247,208,0.55)",
      ribShadow: "rgba(20,83,45,0.75)",
      border: "#15803D",
      glow: "rgba(22,163,74,0.25)",
    },
    gold: {
      primaryGrad: ["#FDE68A", "#D97706", "#78350F"],
      topGrad: ["#FEF3C7", "#D97706"],
      ribHighlight: "rgba(254,240,138,0.75)",
      ribShadow: "rgba(120,53,15,0.65)",
      border: "#B45309",
      glow: "rgba(217,119,6,0.25)",
    },
    silver: {
      primaryGrad: ["#F8FAFC", "#CBD5E1", "#64748B"],
      topGrad: ["#FFFFFF", "#94A3B8"],
      ribHighlight: "rgba(255,255,255,0.95)",
      ribShadow: "rgba(71,85,105,0.55)",
      border: "#94A3B8",
      glow: "rgba(148,163,184,0.2)",
    },
  };

  const cfg = capConfigs[capId] || capConfigs.black;
  const gradId = `cap-body-${capId}`;
  const topGradId = `cap-top-${capId}`;

  return (
    <svg width={width} height={height} viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0 4px 6px ${cfg.glow})` }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={cfg.primaryGrad[0]} />
          <stop offset="45%" stopColor={cfg.primaryGrad[1]} />
          <stop offset="100%" stopColor={cfg.primaryGrad[2]} />
        </linearGradient>
        <linearGradient id={topGradId} x1="50" y1="10" x2="50" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={cfg.topGrad[0]} />
          <stop offset="100%" stopColor={cfg.topGrad[1]} />
        </linearGradient>
      </defs>

      {/* Cap Cylindrical Body */}
      <path
        d="M 14,20 C 14,20 14,50 14,52 C 14,62 86,62 86,52 C 86,50 86,20 86,20 Z"
        fill={`url(#${gradId})`}
        stroke={cfg.border}
        strokeWidth="1"
      />

      {/* Vertical Knurling / Ribs */}
      {[20, 26, 32, 38, 44, 50, 56, 62, 68, 74, 80].map((x) => (
        <g key={x}>
          <line x1={x} y1="22" x2={x} y2="52" stroke={cfg.ribShadow} strokeWidth="1.3" strokeLinecap="round" />
          <line x1={x + 1} y1="22" x2={x + 1} y2="52" stroke={cfg.ribHighlight} strokeWidth="0.8" strokeLinecap="round" />
        </g>
      ))}

      {/* Cap Top Lid Ellipse */}
      <ellipse cx="50" cy="20" rx="36" ry="11" fill={`url(#${topGradId})`} stroke={cfg.border} strokeWidth="1" />
      <ellipse cx="50" cy="19.5" rx="32" ry="9" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
    </svg>
  );
}

function BottleWithCapPreview({ selectedCap }: { selectedCap: CapOption }) {
  const capConfigs: Record<string, {
    primaryGrad: [string, string, string];
    topGrad: [string, string];
    ribHighlight: string;
    ribShadow: string;
    border: string;
  }> = {
    white: {
      primaryGrad: ["#FFFFFF", "#F3F4F6", "#D1D5DB"],
      topGrad: ["#FFFFFF", "#E5E7EB"],
      ribHighlight: "rgba(255,255,255,0.9)",
      ribShadow: "rgba(156,163,175,0.4)",
      border: "#D1D5DB",
    },
    black: {
      primaryGrad: ["#374151", "#1F2937", "#0F172A"],
      topGrad: ["#475569", "#1E293B"],
      ribHighlight: "rgba(148,163,184,0.35)",
      ribShadow: "rgba(0,0,0,0.75)",
      border: "#1E293B",
    },
    red: {
      primaryGrad: ["#EF4444", "#DC2626", "#991B1B"],
      topGrad: ["#F87171", "#DC2626"],
      ribHighlight: "rgba(254,202,202,0.55)",
      ribShadow: "rgba(127,29,29,0.75)",
      border: "#B91C1C",
    },
    blue: {
      primaryGrad: ["#3B82F6", "#2563EB", "#1D4ED8"],
      topGrad: ["#60A5FA", "#2563EB"],
      ribHighlight: "rgba(191,219,254,0.55)",
      ribShadow: "rgba(30,58,138,0.75)",
      border: "#1D4ED8",
    },
    green: {
      primaryGrad: ["#22C55E", "#16A34A", "#15803D"],
      topGrad: ["#4ADE80", "#16A34A"],
      ribHighlight: "rgba(187,247,208,0.55)",
      ribShadow: "rgba(20,83,45,0.75)",
      border: "#15803D",
    },
    gold: {
      primaryGrad: ["#FDE68A", "#D97706", "#78350F"],
      topGrad: ["#FEF3C7", "#D97706"],
      ribHighlight: "rgba(254,240,138,0.75)",
      ribShadow: "rgba(120,53,15,0.65)",
      border: "#B45309",
    },
    silver: {
      primaryGrad: ["#F8FAFC", "#CBD5E1", "#64748B"],
      topGrad: ["#FFFFFF", "#94A3B8"],
      ribHighlight: "rgba(255,255,255,0.95)",
      ribShadow: "rgba(71,85,105,0.55)",
      border: "#94A3B8",
    },
  };

  const cfg = capConfigs[selectedCap.id] || capConfigs.black;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <svg width="130" height="180" viewBox="0 0 140 190" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Ambient Ground Shadow */}
          <radialGradient id="preview-bottle-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(15, 23, 42, 0.28)" />
            <stop offset="60%" stopColor="rgba(15, 23, 42, 0.08)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
          </radialGradient>

          {/* Bottle Body Gradient */}
          <linearGradient id="preview-bottle-body" x1="25" y1="0" x2="115" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="18%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#F8FAFC" />
            <stop offset="88%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Bottle Specular Reflection */}
          <linearGradient id="preview-bottle-shine" x1="42" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Mounted Cap Gradients */}
          <linearGradient id={`preview-cap-body-${selectedCap.id}`} x1="40" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={cfg.primaryGrad[0]} />
            <stop offset="45%" stopColor={cfg.primaryGrad[1]} />
            <stop offset="100%" stopColor={cfg.primaryGrad[2]} />
          </linearGradient>
          <linearGradient id={`preview-cap-top-${selectedCap.id}`} x1="70" y1="14" x2="70" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={cfg.topGrad[0]} />
            <stop offset="100%" stopColor={cfg.topGrad[1]} />
          </linearGradient>
        </defs>

        {/* Floor Shadow */}
        <ellipse cx="70" cy="178" rx="48" ry="8" fill="url(#preview-bottle-shadow)" />

        {/* Bottle Body Container */}
        <path
          d="M 38,62 
             C 38,54 46,50 54,48 
             L 54,40 
             L 86,40 
             L 86,48 
             C 94,50 102,54 102,62 
             L 102,154 
             C 102,170 38,170 38,154 
             Z"
          fill="url(#preview-bottle-body)"
          stroke="#CBD5E1"
          strokeWidth="1.2"
        />

        {/* Bottle Specular Highlight */}
        <path
          d="M 46,62 L 46,154 C 46,160 50,163 54,164 L 54,60 C 50,60 46,61 46,62 Z"
          fill="url(#preview-bottle-shine)"
        />

        {/* Mounted Cap */}
        {/* Cap Body */}
        <path
          d="M 44,22 C 44,22 44,46 44,48 C 44,54 96,54 96,48 C 96,46 96,22 96,22 Z"
          fill={`url(#preview-cap-body-${selectedCap.id})`}
          stroke={cfg.border}
          strokeWidth="0.8"
        />

        {/* Cap Ribbing on Bottle */}
        {[48, 52, 56, 60, 64, 68, 72, 76, 80, 84, 88, 92].map((x) => (
          <g key={x}>
            <line x1={x} y1="24" x2={x} y2="48" stroke={cfg.ribShadow} strokeWidth="1" />
            <line x1={x + 0.8} y1="24" x2={x + 0.8} y2="48" stroke={cfg.ribHighlight} strokeWidth="0.6" />
          </g>
        ))}

        {/* Cap Top Lid */}
        <ellipse cx="70" cy="22" rx="26" ry="8" fill={`url(#preview-cap-top-${selectedCap.id})`} stroke={cfg.border} strokeWidth="0.8" />
        <ellipse cx="70" cy="21.5" rx="23" ry="6.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
      </svg>
    </div>
  );
}

function BrainIcon({ size = 18, color = "#16A34A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z" />
    </svg>
  );
}

function AyurvedaLeafIcon({ size = 28, color = "#16A34A" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3C14 3 6 11 6 17C6 21.4183 9.58172 25 14 25C18.4183 25 22 21.4183 22 17C22 11 14 3 14 3Z" />
      <path d="M14 10V20" strokeLinecap="round" />
      <path d="M14 14.5C16.5 13.5 18 14.5 18 14.5" strokeLinecap="round" />
      <path d="M14 17.5C11.5 16.5 10 17.5 10 17.5" strokeLinecap="round" />
    </svg>
  );
}

const STEPS = [
  { id: 1, name: "Why" },
  { id: 2, name: "Ingredients" },
  { id: 3, name: "Formula" },
  { id: 4, name: "Bottle" },
  { id: 5, name: "Cap" },
  { id: 6, name: "Packaging" },
  { id: 7, name: "Label" },
  { id: 8, name: "MOQ" },
];

interface ProductJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export default function ProductJourneyModal({
  isOpen,
  onClose,
  productName = "Ashwagandha",
}: ProductJourneyModalProps) {
  const [hasSelectedJourneyMode, setHasSelectedJourneyMode] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [ingredients, setIngredients] = useState<IngredientItem[]>(INITIAL_INGREDIENTS);
  const [selectedBottle, setSelectedBottle] = useState<PackagingOption>(BOTTLE_OPTIONS[0]);
  const [selectedCapType, setSelectedCapType] = useState<string>("Standard Cap");
  const [selectedCap, setSelectedCap] = useState<CapOption>(CAP_OPTIONS[1]);
  const [selectedOuter, setSelectedOuter] = useState<OuterOption>(OUTER_OPTIONS[0]);
  const [selectedLabel, setSelectedLabel] = useState<LabelOption>(LABEL_OPTIONS[1]);
  const [selectedFoil, setSelectedFoil] = useState<FoilOption>(FOIL_OPTIONS[0]);
  const [selectedMoq, setSelectedMoq] = useState<number>(500);
  const [maxStepReached, setMaxStepReached] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      setHasSelectedJourneyMode(false);
      setCurrentStep(1);
    }
  }, [isOpen]);

  const [sampleOrdered, setSampleOrdered] = useState(false);
  const [showSampleCheckout, setShowSampleCheckout] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [invoiceBase64, setInvoiceBase64] = useState("");
  const [orderError, setOrderError] = useState("");
  const [sampleForm, setSampleForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const calculateIngredientCost = (item: IngredientItem) => {
    if (!item.selected) return 0;
    // Each '+' click (dosageStep) increases Benchmark Rate by exactly ₹1.00 for all ingredients
    const steps = Math.round((item.dosage - item.baseDosage) / item.dosageStep);
    return Math.max(1, item.basePrice + steps * 1.0);
  };

  const calculations = useMemo(() => {
    const active = ingredients.filter((i) => i.selected);
    const totalActiveCost = active.reduce((acc, curr) => acc + calculateIngredientCost(curr), 0);
    const bottleCost = selectedBottle.price;
    const capCost = selectedCap.price;
    const outerCost = selectedOuter.price;
    const labelCost = selectedLabel.price + selectedFoil.price;

    const baseUnitCost = Math.round(totalActiveCost + bottleCost + capCost + outerCost + labelCost);
    const suggestedSellingPrice = 179.0;
    const profitPerUnit = suggestedSellingPrice - baseUnitCost;
    const profitMarginPercent = Math.round((profitPerUnit / suggestedSellingPrice) * 100);

    const moqTiers = [
      {
        units: 200,
        unitCost: baseUnitCost + 12,
        sellingPrice: 179.0,
        profitPerUnit: 179.0 - (baseUnitCost + 12),
        marginPercent: Math.round(((179.0 - (baseUnitCost + 12)) / 179.0) * 100),
        estProfit: (179.0 - (baseUnitCost + 12)) * 200,
      },
      {
        units: 500,
        unitCost: baseUnitCost,
        sellingPrice: 179.0,
        profitPerUnit: 179.0 - baseUnitCost,
        marginPercent: Math.round(((179.0 - baseUnitCost) / 179.0) * 100),
        estProfit: (179.0 - baseUnitCost) * 500,
      },
      {
        units: 1000,
        unitCost: Math.max(38, baseUnitCost - 4),
        sellingPrice: 179.0,
        profitPerUnit: 179.0 - Math.max(38, baseUnitCost - 4),
        marginPercent: Math.round(((179.0 - (baseUnitCost - 4)) / 179.0) * 100),
        estProfit: (179.0 - Math.max(38, baseUnitCost - 4)) * 1000,
      },
      {
        units: 2000,
        unitCost: Math.max(32, baseUnitCost - 8),
        sellingPrice: 179.0,
        profitPerUnit: 179.0 - Math.max(32, baseUnitCost - 8),
        marginPercent: Math.round(((179.0 - (baseUnitCost - 8)) / 179.0) * 100),
        estProfit: "Contact Us",
      },
    ];

    const currentTier = moqTiers.find((t) => t.units === selectedMoq) || moqTiers[1];
    const totalInvestment = typeof currentTier.unitCost === "number" ? currentTier.unitCost * selectedMoq : 0;

    return {
      activeCount: active.length,
      totalActiveCost: Math.round(totalActiveCost * 100) / 100,
      bottleCost,
      capCost,
      outerCost,
      labelCost,
      baseUnitCost,
      suggestedSellingPrice,
      profitPerUnit,
      profitMarginPercent,
      moqTiers,
      currentTier,
      totalInvestment,
    };
  }, [ingredients, selectedBottle, selectedCap, selectedOuter, selectedLabel, selectedFoil, selectedMoq]);

  const toggleIngredient = (id: string) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const updateDosage = (id: string, delta: number) => {
    setIngredients((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newD = Math.max(item.minDosage, Math.min(item.maxDosage, item.dosage + delta));
          return { ...item, dosage: newD };
        }
        return item;
      })
    );
  };

  const setDosageDirect = (id: string, val: number) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, dosage: val } : item))
    );
  };

  const getOrderConfiguration = () => ({
    ingredients: ingredients
      .filter((item) => item.selected)
      .map((item) => `${item.name} (${item.dosage}${item.unit})`)
      .join(", "),
    bottle: selectedBottle.name,
    cap: `${selectedCap.name} (${selectedCapType})`,
    packaging: selectedOuter.name,
    label: `${selectedLabel.name}${selectedFoil.id !== "none" ? ` + ${selectedFoil.name} Foil` : ""}`,
  });

  const handlePlaceSampleOrder = async () => {
    if (!sampleForm.name || !sampleForm.companyName || !sampleForm.email || !sampleForm.phone || !sampleForm.address || !sampleForm.city || !sampleForm.state || !sampleForm.pincode) {
      setOrderError("Please fill all required details.");
      return;
    }

    setIsSubmittingOrder(true);
    setOrderError("");

    try {
      const configuration = getOrderConfiguration();
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          productId: productName.toLowerCase().replace(/\s+/g, "-"),
          quantity: selectedMoq,
          unitPrice: calculations.currentTier.unitCost,
          subtotal: calculations.totalInvestment,
          discount: 0,
          total: calculations.totalInvestment,
          customer: sampleForm,
          configuration,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to place order");

      setOrderNumber(result.orderNumber || "");
      setInvoiceBase64(result.invoiceBase64 || "");
      setSampleOrdered(true);
    } catch (error) {
      console.error("Sample order error:", error);
      setOrderError("Unable to submit your sample order right now. Please try again.");
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (!invoiceBase64 || !orderNumber) return;
    const bytes = Uint8Array.from(atob(invoiceBase64), (char) => char.charCodeAt(0));
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${orderNumber}-invoice.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const goToStep = (stepNumber: number) => {
    if (stepNumber > currentStep) {
      if (currentStep === 2 && !ingredients.some((i) => i.selected)) {
        alert("Please select at least one active ingredient to proceed.");
        return;
      }
    }
    setCurrentStep(stepNumber);
    setMaxStepReached((prev) => Math.max(prev, stepNumber));
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(10px, 2.5vw, 24px)",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(13, 38, 25, 0.78)",
          backdropFilter: "blur(10px)",
        }}
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        style={{
          position: "relative",
          background: "#FAF8F5",
          borderRadius: "28px",
          maxWidth: "1160px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          border: "1.5px solid rgba(21, 128, 61, 0.25)",
        }}
      >
        {!hasSelectedJourneyMode ? (
          <div
            style={{
              position: "relative",
              padding: "44px 44px 36px 44px",
              background: "linear-gradient(135deg, #F8FBF8 0%, #F1F8F2 50%, #FAFBF9 100%)",
              borderRadius: "28px",
              overflow: "hidden",
            }}
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.95)",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748B",
                zIndex: 10,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E2E8F0";
                e.currentTarget.style.color = "#0F172A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                e.currentTarget.style.color = "#64748B";
              }}
            >
              <X size={18} />
            </button>

            {/* Main 3-column / 2-column layout */}
            <div className="product-mode-select-grid" style={{ position: "relative", zIndex: 2 }}>
              {/* Left Column: Heading & Doodle */}
              <div>
                <div
                  style={{
                    width: "36px",
                    height: "4px",
                    background: "#16A34A",
                    borderRadius: "2px",
                    marginBottom: "16px",
                  }}
                />
                <h2
                  style={{
                    fontSize: "36px",
                    fontWeight: 850,
                    color: "#0F172A",
                    lineHeight: 1.16,
                    letterSpacing: "-0.03em",
                    margin: 0,
                  }}
                >
                  How would you <br />
                  like to create <br />
                  <span style={{ color: "#16A34A" }}>your product?</span>
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#64748B",
                    fontWeight: 500,
                    margin: "12px 0 0 0",
                  }}
                >
                  Two easy ways to get started
                </p>

                {/* Doodle arrow with playful note */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "36px",
                    color: "#16A34A",
                  }}
                >
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      fontFamily: "Comic Sans MS, cursive, sans-serif",
                      transform: "rotate(-7deg)",
                      lineHeight: 1.25,
                      display: "inline-block",
                    }}
                  >
                    Choose what<br />works for you
                  </span>
                  <svg width="46" height="32" viewBox="0 0 46 32" fill="none" style={{ marginTop: "14px" }}>
                    <path
                      d="M3 24C16 20 28 14 42 6M42 6C36 5 31 8 31 8M42 6C41 13 39 18 39 18"
                      stroke="#16A34A"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Middle Column: Two Cards */}
              <div
                className="product-mode-cards-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "18px",
                }}
              >
                {/* Card 1: I'm New */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "24px",
                    border: "1.5px solid #E2E8F0",
                    padding: "26px 20px 22px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "#EBF9EE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <Leaf size={28} color="#16A34A" />
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#0F172A",
                      margin: "0 0 4px 0",
                    }}
                  >
                    I&apos;m New
                  </h3>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#16A34A",
                      marginBottom: "20px",
                    }}
                  >
                    Guide Me Step-by-Step
                  </div>

                  {/* Checklist */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "11px",
                      marginBottom: "24px",
                    }}
                  >
                    {[
                      "Simple language",
                      "No technical knowledge needed",
                      "Get expert suggestions",
                      "Best for first-time buyers",
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "9px",
                          fontSize: "13px",
                          color: "#334155",
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        <Check size={16} color="#16A34A" strokeWidth={2.8} style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      setHasSelectedJourneyMode(true);
                      setCurrentStep(1);
                    }}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 4px 14px rgba(21, 128, 61, 0.25)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 6px 18px rgba(21, 128, 61, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 14px rgba(21, 128, 61, 0.25)";
                    }}
                  >
                    <span>Start Guided Journey</span>
                    <ArrowRight size={16} />
                  </button>

                  {/* Recommended Badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "#DCFCE7",
                      color: "#15803D",
                      border: "1px solid #86EFAC",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      marginTop: "12px",
                    }}
                  >
                    <span>★</span>
                    <span>Recommended</span>
                  </div>
                </div>

                {/* Card 2: I Know What I Need */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "24px",
                    border: "1.5px solid #E2E8F0",
                    padding: "26px 20px 22px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "#F0FDF4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px",
                    }}
                  >
                    <Settings size={28} color="#15803D" />
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#0F172A",
                      margin: "0 0 4px 0",
                    }}
                  >
                    I Know What I Need
                  </h3>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#0F172A",
                      marginBottom: "20px",
                    }}
                  >
                    Quick Order
                  </div>

                  {/* Checklist */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "11px",
                      marginBottom: "24px",
                    }}
                  >
                    {[
                      "Direct configuration",
                      "Choose your specifications",
                      "Get instant pricing",
                      "Add to cart and order",
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "9px",
                          fontSize: "13px",
                          color: "#334155",
                          fontWeight: 600,
                          lineHeight: 1.3,
                        }}
                      >
                        <Check size={16} color="#16A34A" strokeWidth={2.8} style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      setHasSelectedJourneyMode(true);
                      setMaxStepReached(8);
                      setCurrentStep(8);
                    }}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      borderRadius: "12px",
                      background: "#FFFFFF",
                      color: "#0F172A",
                      fontWeight: 700,
                      fontSize: "14px",
                      border: "1.5px solid #CBD5E1",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#0F172A";
                      e.currentTarget.style.background = "#F8FAFC";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#CBD5E1";
                      e.currentTarget.style.background = "#FFFFFF";
                    }}
                  >
                    <span>Quick Order</span>
                    <ArrowRight size={16} />
                  </button>

                  {/* Spacer to align heights */}
                  <div style={{ height: "29px", marginTop: "12px" }} />
                </div>
              </div>

              {/* Right Column: Expert Photo */}
              <div
                className="product-mode-expert-col"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  position: "relative",
                  height: "100%",
                }}
              >
                <img
                  src="/images/product-guide-expert.png"
                  alt="Product Expert"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    maxHeight: "360px",
                    objectFit: "contain",
                    borderRadius: "16px",
                  }}
                />
              </div>
            </div>

            {/* Bottom Strip: WhatsApp Help */}
            <div
              style={{
                marginTop: "32px",
                background: "#EDFDF4",
                border: "1px solid #BBF7D0",
                borderRadius: "20px",
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "#25D366",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(37, 211, 102, 0.35)",
                    flexShrink: 0,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.761.79 2.796.79 3.18 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.776-5.767-5.776zm3.365 8.163c-.14.394-.74.724-1.026.745-.271.02-.622.03-1.85-.477-1.464-.606-2.42-2.073-2.493-2.17-.074-.097-.597-.794-.597-1.514s.374-1.077.507-1.225c.133-.148.291-.185.388-.185.097 0 .194.002.278.006.09.004.21-.034.328.25.121.291.412 1.006.449 1.079.036.073.06.158.012.254-.049.097-.073.158-.145.242-.073.085-.154.19-.22.255-.073.072-.15.15-.064.297.085.146.377.622.809 1.006.557.494 1.026.647 1.172.72.146.073.23.06.315-.037.085-.097.364-.424.461-.57.097-.145.194-.121.328-.073.133.049.848.4 1 .473.151.073.254.109.291.17.037.06.037.643-.103 1.037z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "14.5px", color: "#0F172A" }}>
                    Need help?
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#475569", fontWeight: 500 }}>
                    Talk to our product experts on WhatsApp
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/919822767273?text=${encodeURIComponent(`Hi, I would like to consult with a product expert about creating/customizing ${productName}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#0D2619",
                  color: "#FFFFFF",
                  padding: "10px 22px",
                  borderRadius: "100px",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  boxShadow: "0 2px 8px rgba(13, 38, 25, 0.2)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#15803D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0D2619";
                }}
              >
                <span>Chat Now</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* ========================================================
                STICKY HEADER WITH STEPPER
               ======================================================== */}
            <div
              style={{
                position: "sticky",
                top: 0,
                background: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(16px)",
                borderBottom: "1px solid #E5E7EB",
                padding: "10px 24px 8px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                zIndex: 10,
                borderRadius: "28px 28px 0 0",
              }}
            >
          {/* Top Bar: Title & Close Button (Modern Redesign) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)",
                  border: "1px solid #86EFAC",
                  color: "#15803D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(21, 128, 61, 0.12)",
                }}
              >
                <Leaf size={16} color="#15803D" />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "#0F172A",
                      letterSpacing: "-0.01em",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>{productName}</span>
                    <span style={{ color: "#475569", fontWeight: 600 }}>Formulation & Production Journey</span>
                  </h3>
                  <span
                    style={{
                      fontSize: "10.5px",
                      background: "#F0FDF4",
                      color: "#15803D",
                      border: "1px solid #86EFAC",
                      padding: "2px 8px",
                      borderRadius: "100px",
                      fontWeight: 800,
                      letterSpacing: "0.02em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: "0 1px 3px rgba(21, 128, 61, 0.08)",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "#22C55E",
                        display: "inline-block",
                      }}
                    />
                    Step {currentStep} of {STEPS.length}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={() => setHasSelectedJourneyMode(false)}
                title="Switch creation mode"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #CBD5E1",
                  background: "#FFFFFF",
                  color: "#475569",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#0F172A";
                  e.currentTarget.style.color = "#0F172A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#CBD5E1";
                  e.currentTarget.style.color = "#475569";
                }}
              >
                <Sparkles size={13} color="#15803D" />
                <span>Switch Mode</span>
              </button>
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#64748B",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#E2E8F0";
                  e.currentTarget.style.color = "#0F172A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#F8FAFC";
                  e.currentTarget.style.color = "#64748B";
                }}
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Stepper Navigation Bar (Modern Redesign) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              overflowX: "auto",
              paddingBottom: "4px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                minWidth: "720px",
                justifyContent: "space-between",
              }}
            >
              {STEPS.map((s, idx) => {
                const isCurrent = currentStep === s.id;
                const isDone = currentStep > s.id;
                const isUnlocked = s.id <= maxStepReached;

                return (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", flex: idx === STEPS.length - 1 ? "none" : 1 }}>
                    <button
                      disabled={!isUnlocked}
                      onClick={() => isUnlocked && goToStep(s.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: isUnlocked ? "pointer" : "not-allowed",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                        padding: "2px 6px",
                        opacity: isUnlocked ? 1 : 0.45,
                        transition: "all 0.2s ease",
                      }}
                      title={isUnlocked ? `Go to Step ${s.id}: ${s.name}` : `Complete previous steps to unlock ${s.name}`}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 800,
                          background: isCurrent ? "#057A44" : isDone ? "#15803D" : "#FFFFFF",
                          color: isCurrent ? "#FFFFFF" : isDone ? "#FFFFFF" : "#64748B",
                          border: isCurrent ? "2px solid #057A44" : isDone ? "2px solid #15803D" : "1.5px solid #CBD5E1",
                          boxShadow: isCurrent ? "0 0 0 2px rgba(5, 122, 68, 0.2)" : "none",
                          transition: "all 0.25s ease",
                        }}
                      >
                        {isDone ? <Check size={12} strokeWidth={3} /> : s.id}
                      </div>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: isCurrent ? 800 : isDone ? 700 : 500,
                          color: isCurrent ? "#057A44" : isDone ? "#15803D" : "#64748B",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {s.name}
                      </span>
                    </button>

                    {idx < STEPS.length - 1 && (
                      <div
                        style={{
                          height: "1.5px",
                          flex: 1,
                          margin: "0 4px",
                          marginBottom: "16px",
                          background: isDone ? "#15803D" : s.id < maxStepReached ? "#86EFAC" : "#E2E8F0",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================
            MODAL CONTENT AREA (STEPS 1 TO 7)
           ======================================================== */}
        <div style={{ padding: "14px 20px" }}>
          <AnimatePresence mode="wait">
            {/* ----------------------------------------------------
                STEP 1: WHY & BENEFITS (EXACT USER SPEC)
               ---------------------------------------------------- */}
            {currentStep === 1 && (
              <motion.div
                key="modal-step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "linear-gradient(135deg, #F8FBF8 0%, #F1F8F2 50%, #FAFBF9 100%)",
                  borderRadius: "24px",
                  padding: "36px 40px",
                  border: "1px solid #E2E8F0",
                }}
              >
                {/* Heading Area */}
                <div style={{ marginBottom: "26px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "4px",
                      background: "#16A34A",
                      borderRadius: "2px",
                      marginBottom: "14px",
                    }}
                  />
                  <h2
                    style={{
                      fontSize: "36px",
                      fontWeight: 850,
                      color: "#0F172A",
                      margin: "0 0 6px 0",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Why <span style={{ color: "#16A34A" }}>{productName}?</span>
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#475569",
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    A time-tested herb for modern wellness.
                  </p>
                </div>

                {/* 3-Column Content Layout */}
                <div className="why-benefits-main-grid">
                  {/* Left Column: Real Bottle Display with Handwritten Doodle */}
                  <div
                    className="why-benefits-product-col"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <img
                      src="/images/ashwagandha-why-product.png"
                      alt={`${productName} Premium Formulation`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "360px",
                        height: "auto",
                        objectFit: "contain",
                        filter: "drop-shadow(0 12px 28px rgba(0, 0, 0, 0.09))",
                      }}
                    />
                  </div>

                  {/* Middle Column: Benefits Card */}
                  <div
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "24px",
                      border: "1.5px solid #E2E8F0",
                      padding: "24px 22px",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {[
                      { icon: "leaf", text: "Supports stress management" },
                      { icon: "zap", text: "Boosts energy & stamina" },
                      { icon: "brain", text: "Helps improve focus" },
                      { icon: "shield", text: "Supports overall well-being" },
                      { icon: "heart", text: "Widely used & trusted" },
                    ].map((b, idx, arr) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "11px 4px",
                          borderBottom: idx < arr.length - 1 ? "1px solid #F1F5F9" : "none",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "#EBF9EE",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {b.icon === "leaf" && <Leaf size={18} color="#16A34A" strokeWidth={2.2} />}
                          {b.icon === "zap" && <Zap size={18} color="#16A34A" strokeWidth={2.2} />}
                          {b.icon === "brain" && <BrainIcon size={18} color="#16A34A" />}
                          {b.icon === "shield" && <ShieldCheck size={18} color="#16A34A" strokeWidth={2.2} />}
                          {b.icon === "heart" && <Heart size={18} color="#16A34A" strokeWidth={2.2} />}
                        </div>
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#1E293B",
                            lineHeight: 1.35,
                          }}
                        >
                          {b.text}
                        </span>
                      </div>
                    ))}

                    {/* 100% Natural Extract Pill Badge */}
                    <div
                      style={{
                        background: "#EDFDF4",
                        border: "1px solid #BBF7D0",
                        borderRadius: "14px",
                        padding: "10px 16px",
                        marginTop: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          background: "#DCFCE7",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Sprout size={17} color="#15803D" />
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 800,
                          color: "#15803D",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        100% Natural Extract
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Explanatory info & CTA */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      paddingLeft: "8px",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                        <AyurvedaLeafIcon size={30} color="#16A34A" />
                        <h3
                          style={{
                            fontSize: "21px",
                            fontWeight: 850,
                            color: "#0F172A",
                            margin: 0,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          What is {productName}?
                        </h3>
                      </div>

                      <p
                        style={{
                          fontSize: "14.5px",
                          color: "#475569",
                          lineHeight: 1.6,
                          margin: "0 0 28px 0",
                          fontWeight: 500,
                        }}
                      >
                        A powerful adaptogen traditionally used in Ayurveda. Commonly used in modern wellness products to help the body manage stress and promote vitality.
                      </p>

                      <button
                        onClick={() => goToStep(2)}
                        style={{
                          background: "linear-gradient(135deg, #057A44 0%, #0D2619 100%)",
                          color: "#FFFFFF",
                          padding: "14px 26px",
                          borderRadius: "12px",
                          fontWeight: 700,
                          fontSize: "15px",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "9px",
                          boxShadow: "0 4px 14px rgba(5, 122, 68, 0.28)",
                          transition: "all 0.2s ease",
                          width: "fit-content",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-1px)";
                          e.currentTarget.style.boxShadow = "0 6px 18px rgba(5, 122, 68, 0.38)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 4px 14px rgba(5, 122, 68, 0.28)";
                        }}
                      >
                        <span>Next: Choose Ingredients</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>

                    {/* Playful Handwritten Doodle Note */}
                    <div
                      style={{
                        marginTop: "36px",
                        textAlign: "right",
                        color: "#16A34A",
                        fontFamily: "Comic Sans MS, cursive, sans-serif",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13.5px",
                          fontWeight: 700,
                          display: "inline-block",
                          transform: "rotate(-3deg)",
                          lineHeight: 1.3,
                        }}
                      >
                        Rooted in<br />Tradition, Backed<br />by Science
                      </span>
                      <svg width="68" height="8" viewBox="0 0 68 8" fill="none" style={{ display: "block", marginLeft: "auto", marginTop: "3px" }}>
                        <path d="M2 5.5C22 1.5 44 1.5 66 5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 2: CHOOSE INGREDIENTS
               ---------------------------------------------------- */}
            {currentStep === 2 && (
              <motion.div
                key="modal-step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  border: "1px solid #E5E7EB",
                  padding: "32px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                {/* Modern Step 2 Header with Live Total Pills */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: "16px",
                    borderBottom: "1px solid #F0F4EF",
                    paddingBottom: "18px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#F0FDF4",
                        border: "1px solid #BBF7D0",
                        color: "#15803D",
                        padding: "4px 12px",
                        borderRadius: "100px",
                        fontSize: "11px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: "8px",
                      }}
                    >
                      <Sparkles size={12} />
                      <span>STEP 2 • ACTIVE FORMULATION</span>
                    </div>
                    <h2 style={{ fontSize: "25px", fontWeight: 900, color: "#0F172A", margin: 0, letterSpacing: "-0.02em" }}>
                      Choose Raw Ingredients & Potency
                    </h2>
                    <p style={{ color: "#64748B", fontSize: "14px", margin: "4px 0 0" }}>
                      Select active botanical extracts and customize the exact dosage per single unit.
                    </p>
                  </div>

                  {/* Header Summary Pills */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <div
                      style={{
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        borderRadius: "14px",
                        padding: "8px 16px",
                        textAlign: "right",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 700, display: "block", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Actives Selected
                      </span>
                      <strong style={{ fontSize: "16px", fontWeight: 900, color: "#0F172A" }}>
                        {calculations.activeCount} <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 600 }}>/ {ingredients.length}</span>
                      </strong>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
                        border: "1px solid #86EFAC",
                        borderRadius: "14px",
                        padding: "8px 16px",
                        textAlign: "right",
                        boxShadow: "0 2px 8px rgba(21, 128, 61, 0.1)",
                      }}
                    >
                      <span style={{ fontSize: "11px", color: "#166534", fontWeight: 800, display: "block", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                        Active Blend Cost
                      </span>
                      <strong style={{ fontSize: "16px", fontWeight: 900, color: "#15803D" }}>
                        ₹{calculations.totalActiveCost.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Modern Ingredient Cards List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {ingredients.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px 22px",
                        borderRadius: "18px",
                        border: item.selected ? "1.5px solid #86EFAC" : "1.5px solid #E2E8F0",
                        background: item.selected ? "linear-gradient(135deg, #FFFFFF 0%, #F9FDF9 100%)" : "#FAFAFA",
                        boxShadow: item.selected ? "0 8px 24px -4px rgba(21, 128, 61, 0.08), 0 2px 6px rgba(0,0,0,0.02)" : "none",
                        position: "relative",
                        overflow: "hidden",
                        gap: "18px",
                        flexWrap: "wrap",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {/* Left Subtle Accent Line for Active State */}
                      {item.selected && (
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "4px",
                            background: "linear-gradient(180deg, #15803D 0%, #22C55E 100%)",
                          }}
                        />
                      )}

                      {/* Left: Checkbox + Photo + Details */}
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: "1 1 340px" }}>
                        {/* Modern Checkbox */}
                        <button
                          type="button"
                          onClick={() => toggleIngredient(item.id)}
                          aria-label={`Toggle ${item.name}`}
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "8px",
                            border: item.selected ? "none" : "2px solid #CBD5E1",
                            background: item.selected ? "linear-gradient(135deg, #15803D 0%, #166534 100%)" : "#ffffff",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            flexShrink: 0,
                            boxShadow: item.selected ? "0 2px 8px rgba(21, 128, 61, 0.35)" : "none",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {item.selected && <Check size={14} strokeWidth={3.5} />}
                        </button>

                        {/* Rounded Thumbnail with Soft Shadow */}
                        <div
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "14px",
                            overflow: "hidden",
                            flexShrink: 0,
                            border: "1.5px solid #E2E8F0",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                            background: "#ffffff",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>

                        {/* Title, Botanical, and Description */}
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <strong style={{ fontSize: "16px", fontWeight: 800, color: item.selected ? "#0F172A" : "#64748B" }}>
                              {item.name}
                            </strong>
                            <span
                              style={{
                                fontSize: "10.5px",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                                background: item.impact === "High" ? "#FEF2F2" : "#F0FDF4",
                                color: item.impact === "High" ? "#DC2626" : "#15803D",
                                border: item.impact === "High" ? "1px solid #FECACA" : "1px solid #BBF7D0",
                                padding: "2px 8px",
                                borderRadius: "100px",
                              }}
                            >
                              {item.impact} Impact
                            </span>
                          </div>

                          <span style={{ fontSize: "12px", color: "#15803D", fontWeight: 600, display: "block", marginTop: "2px" }}>
                            {item.botanical}
                          </span>
                          <p style={{ fontSize: "12.5px", color: "#475569", margin: "4px 0 0", lineHeight: "1.45" }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Center/Right: Dedicated Benchmark Rate Badge */}
                      <div
                        style={{
                          background: item.selected ? "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)" : "#F1F5F9",
                          border: item.selected ? "1px solid #BBF7D0" : "1px solid #E2E8F0",
                          borderRadius: "14px",
                          padding: "8px 16px",
                          textAlign: "right",
                          minWidth: "120px",
                          boxShadow: item.selected ? "0 2px 6px rgba(21, 128, 61, 0.08)" : "none",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "10.5px",
                            fontWeight: 800,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: item.selected ? "#166534" : "#64748B",
                            display: "block",
                          }}
                        >
                          Benchmark Rate
                        </span>
                        <strong
                          style={{
                            fontSize: "16.5px",
                            fontWeight: 900,
                            color: item.selected ? "#15803D" : "#94A3B8",
                            fontFamily: "var(--font-inter), system-ui, sans-serif",
                            display: "block",
                            marginTop: "2px",
                          }}
                        >
                          ₹{calculateIngredientCost(item).toFixed(2)}
                        </strong>
                      </div>

                      {/* Right: Modern Pill Dosage Stepper */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          background: "#ffffff",
                          border: "1.5px solid #E2E8F0",
                          borderRadius: "14px",
                          padding: "4px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        }}
                      >
                        <button
                          onClick={() => updateDosage(item.id, -item.dosageStep)}
                          disabled={!item.selected || item.dosage <= item.minDosage}
                          aria-label="Decrease dosage"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            border: "none",
                            background: item.dosage <= item.minDosage ? "transparent" : "#F1F5F9",
                            color: item.dosage <= item.minDosage ? "#CBD5E1" : "#1E293B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: item.dosage <= item.minDosage ? "not-allowed" : "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <Minus size={14} strokeWidth={2.5} />
                        </button>

                        <div
                          style={{
                            padding: "0 14px",
                            textAlign: "center",
                            minWidth: "82px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 800,
                              color: item.selected ? "#0F172A" : "#94A3B8",
                              display: "block",
                              lineHeight: 1.2,
                            }}
                          >
                            {item.dosage} <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748B" }}>{item.unit}</span>
                          </span>
                        </div>

                        <button
                          onClick={() => updateDosage(item.id, item.dosageStep)}
                          disabled={!item.selected || item.dosage >= item.maxDosage}
                          aria-label="Increase dosage"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "10px",
                            border: "none",
                            background: item.dosage >= item.maxDosage ? "transparent" : "#F1F5F9",
                            color: item.dosage >= item.maxDosage ? "#CBD5E1" : "#1E293B",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: item.dosage >= item.maxDosage ? "not-allowed" : "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <Plus size={14} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step 2 Bottom Navigation */}
                <div
                  style={{
                    marginTop: "28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #F0F4EF",
                    paddingTop: "20px",
                  }}
                >
                  <button
                    onClick={() => goToStep(1)}
                    style={{
                      padding: "12px 22px",
                      borderRadius: "12px",
                      border: "1.5px solid #E2E8F0",
                      background: "#ffffff",
                      fontWeight: 700,
                      color: "#475569",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  <button
                    onClick={() => goToStep(3)}
                    style={{
                      background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
                      color: "#ffffff",
                      padding: "13px 28px",
                      borderRadius: "12px",
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      boxShadow: "0 6px 18px rgba(21, 128, 61, 0.25)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Next: Formulation & Cost
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 3: FORMULATION & COST SIMULATOR (MODERN REDESIGN)
               ---------------------------------------------------- */}
            {currentStep === 3 && (
              <motion.div
                key="modal-step3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "18px",
                  border: "1px solid #E5E7EB",
                  padding: "14px 18px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                }}
              >
                {/* Modern Step 3 Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: "10px",
                    borderBottom: "1px solid #F0F4EF",
                    paddingBottom: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        background: "#F0FDF4",
                        border: "1px solid #BBF7D0",
                        color: "#15803D",
                        padding: "2px 8px",
                        borderRadius: "100px",
                        fontSize: "10px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "3px",
                      }}
                    >
                      <Sparkles size={11} />
                      <span>STEP 3 • LIVE COST & FORMULATION SIMULATOR</span>
                    </div>
                    <h2 style={{ fontSize: "17px", fontWeight: 900, color: "#0F172A", margin: 0, letterSpacing: "-0.01em" }}>
                      Try Different Formulations & Live Economics
                    </h2>
                    <p style={{ color: "#64748B", fontSize: "12px", margin: "2px 0 0" }}>
                      Slide ingredient concentrations to calibrate unit economics, potency, and margins.
                    </p>
                  </div>
                </div>

                {/* Side-by-Side Modern Layout */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: "16px", alignItems: "start" }} className="formulation-grid">
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 4px" }}>
                      <thead>
                        <tr style={{ color: "#334155", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left" }}>
                          <th style={{
                            padding: "6px 10px",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                            borderLeft: "1px solid #E2E8F0",
                            borderRadius: "8px 0 0 8px",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ width: "18px", height: "18px", borderRadius: "5px", background: "#DCFCE7", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <Leaf size={10} color="#15803D" />
                              </span>
                              <span>Ingredient</span>
                            </div>
                          </th>
                          <th style={{
                            padding: "6px 10px",
                            minWidth: "210px",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ width: "18px", height: "18px", borderRadius: "5px", background: "#EFF6FF", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <SlidersHorizontal size={10} color="#2563EB" />
                              </span>
                              <span>Your Amount</span>
                            </div>
                          </th>
                          <th style={{
                            padding: "6px 10px",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ width: "18px", height: "18px", borderRadius: "5px", background: "#F1F5F9", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <Scale size={10} color="#475569" />
                              </span>
                              <span>Market Range</span>
                            </div>
                          </th>
                          <th style={{
                            padding: "6px 10px",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ width: "18px", height: "18px", borderRadius: "5px", background: "#FEF3C7", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <Sparkles size={10} color="#D97706" />
                              </span>
                              <span>Impact</span>
                            </div>
                          </th>
                          <th style={{
                            padding: "6px 10px",
                            textAlign: "right",
                            background: "#F8FAFC",
                            borderTop: "1px solid #E2E8F0",
                            borderBottom: "1px solid #E2E8F0",
                            borderRight: "1px solid #E2E8F0",
                            borderRadius: "0 8px 8px 0",
                          }}>
                            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "5px" }}>
                              <span>Cost</span>
                              <span style={{ width: "18px", height: "18px", borderRadius: "5px", background: "#F0FDF4", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                <TrendingUp size={10} color="#15803D" />
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {ingredients.filter((i) => i.selected).map((item) => {
                          const cost = calculateIngredientCost(item);
                          return (
                            <tr
                              key={item.id}
                              style={{
                                background: "#FFFFFF",
                                borderRadius: "10px",
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <td style={{ padding: "6px 10px", borderRadius: "10px 0 0 10px" }}>
                                <strong style={{ fontSize: "13px", fontWeight: 800, color: "#0F172A", display: "block" }}>
                                  {item.name}
                                </strong>
                                <span style={{ fontSize: "10.5px", color: "#15803D", fontWeight: 600, display: "block" }}>
                                  {item.botanical}
                                </span>
                              </td>
                              <td style={{ padding: "6px 10px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  {(() => {
                                    const percent = Math.round(
                                      ((item.dosage - item.minDosage) / (item.maxDosage - item.minDosage)) * 100
                                    );
                                    return (
                                      <input
                                        type="range"
                                        min={item.minDosage}
                                        max={item.maxDosage}
                                        step={item.dosageStep}
                                        value={item.dosage}
                                        onChange={(e) => setDosageDirect(item.id, Number(e.target.value))}
                                        className="modern-pharma-slider"
                                        style={{
                                          flex: 1,
                                          height: "5px",
                                          background: `linear-gradient(to right, #15803D 0%, #22C55E ${percent}%, #E2E8F0 ${percent}%, #E2E8F0 100%)`,
                                        }}
                                      />
                                    );
                                  })()}
                                  <span
                                    style={{
                                      minWidth: "62px",
                                      textAlign: "center",
                                      fontSize: "11.5px",
                                      fontWeight: 800,
                                      color: "#15803D",
                                      background: "#F0FDF4",
                                      border: "1px solid #BBF7D0",
                                      padding: "2px 6px",
                                      borderRadius: "100px",
                                    }}
                                  >
                                    {item.dosage} {item.unit}
                                  </span>
                                </div>
                              </td>
                              <td style={{ padding: "6px 10px", fontSize: "11.5px", color: "#64748B", fontWeight: 600 }}>
                                {item.marketRange}
                              </td>
                              <td style={{ padding: "6px 10px" }}>
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "3px",
                                    fontSize: "9.5px",
                                    fontWeight: 850,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.03em",
                                    background: item.impact === "High" ? "#FEF2F2" : item.impact === "Medium" ? "#FFFBEB" : "#F0FDF4",
                                    color: item.impact === "High" ? "#DC2626" : item.impact === "Medium" ? "#D97706" : "#15803D",
                                    border: item.impact === "High" ? "1px solid #FECACA" : item.impact === "Medium" ? "1px solid #FDE68A" : "1px solid #BBF7D0",
                                    padding: "2px 6px",
                                    borderRadius: "100px",
                                  }}
                                >
                                  {item.impact === "High" ? "▲ High" : item.impact === "Medium" ? "▲ Med" : "● Std"}
                                </span>
                              </td>
                              <td style={{ padding: "6px 10px", textAlign: "right", borderRadius: "0 10px 10px 0" }}>
                                <strong
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 900,
                                    color: "#0F172A",
                                    background: "#F8FAFC",
                                    border: "1px solid #E2E8F0",
                                    padding: "2px 7px",
                                    borderRadius: "6px",
                                    display: "inline-block",
                                  }}
                                >
                                  ₹{cost.toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Right: Modern Live Economics Card */}
                  <div
                    style={{
                      background: "linear-gradient(180deg, #FFFFFF 0%, #F9FDF9 100%)",
                      borderRadius: "16px",
                      border: "1.5px solid #86EFAC",
                      padding: "12px 14px",
                      boxShadow: "0 6px 20px -4px rgba(21, 128, 61, 0.1), 0 2px 6px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Top Price Box */}
                    <div
                      style={{
                        background: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
                        border: "1px solid #BBF7D0",
                        padding: "8px 12px",
                        borderRadius: "10px",
                        boxShadow: "0 1px 4px rgba(21, 128, 61, 0.06)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "#166534" }}>
                          Total Cost / Unit
                        </span>
                        <span style={{ fontSize: "9.5px", background: "#ffffff", padding: "1px 6px", borderRadius: "100px", color: "#15803D", fontWeight: 800, border: "1px solid #86EFAC" }}>
                          LIVE
                        </span>
                      </div>
                      <div style={{ fontSize: "24px", fontWeight: 900, color: "#15803D", marginTop: "2px", letterSpacing: "-0.01em" }}>
                        ₹{calculations.totalActiveCost.toFixed(2)}
                      </div>
                    </div>

                    {/* Financial Breakdown */}
                    <div style={{ marginTop: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 2px", borderBottom: "1px solid #F1F5F0" }}>
                        <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600 }}>Suggested MSRP</span>
                        <strong style={{ fontSize: "14.5px", color: "#0F172A", fontWeight: 800 }}>₹149.00</strong>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 2px" }}>
                        <div>
                          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 600, display: "block" }}>Your Profit / Unit</span>
                          <span style={{ fontSize: "10.5px", color: "#15803D", fontWeight: 800 }}>
                            {Math.round(((149.0 - calculations.totalActiveCost) / 149.0) * 100)}% Gross Margin
                          </span>
                        </div>
                        <strong style={{ fontSize: "16px", color: "#15803D", fontWeight: 900 }}>
                          ₹{(149.0 - calculations.totalActiveCost).toFixed(2)}
                        </strong>
                      </div>
                    </div>

                    {/* Premium Callout */}
                    <div
                      style={{
                        marginTop: "8px",
                        background: "linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)",
                        border: "1px solid #86EFAC",
                        borderRadius: "10px",
                        padding: "8px 10px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#166534", fontWeight: 800, fontSize: "11.5px" }}>
                        <Sparkles size={13} color="#15803D" />
                        <span>High-Margin Formula</span>
                      </div>
                      <p style={{ margin: "2px 0 0", fontSize: "10.5px", color: "#15803D", lineHeight: 1.35 }}>
                        Balanced active clinical dosing with exceptional commercial retail potential.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 Bottom Navigation */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #F0F4EF",
                    paddingTop: "8px",
                  }}
                >
                  <button
                    onClick={() => goToStep(2)}
                    style={{
                      padding: "7px 16px",
                      borderRadius: "8px",
                      border: "1.5px solid #E2E8F0",
                      background: "#ffffff",
                      fontWeight: 700,
                      color: "#475569",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "12.5px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ChevronLeft size={14} />
                    Back
                  </button>

                  <button
                    onClick={() => goToStep(4)}
                    style={{
                      background: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
                      color: "#ffffff",
                      padding: "8px 22px",
                      borderRadius: "8px",
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      boxShadow: "0 4px 12px rgba(21, 128, 61, 0.22)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Next: Bottle Packaging
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 4: BOTTLE PACKAGING
               ---------------------------------------------------- */}
            {currentStep === 4 && (
              <motion.div
                key="modal-step4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                <div style={{ borderBottom: "1px solid #F0F4EF", paddingBottom: "16px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803D" }}>STEP 4</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0D2619", marginTop: "4px" }}>Choose Bottle Packaging</h2>
                  <p style={{ color: "#4B5563", fontSize: "14px", marginTop: "4px" }}>Select primary bottle format and material specifications.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px" }}>
                  {BOTTLE_OPTIONS.map((b) => {
                    const isSelected = selectedBottle.id === b.id;
                    return (
                      <div
                        key={b.id}
                        onClick={() => setSelectedBottle(b)}
                        style={{
                          position: "relative",
                          border: isSelected ? "2px solid #15803D" : "1px solid #E5E7EB",
                          borderRadius: "14px",
                          padding: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: isSelected ? "#F0FDF4" : "#ffffff",
                        }}
                      >
                        {isSelected && (
                          <div style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px", borderRadius: "50%", background: "#15803D", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                        <img src={b.image} alt={b.name} style={{ height: "110px", width: "100%", objectFit: "contain", marginBottom: "10px" }} />
                        <h4 style={{ fontSize: "13.5px", fontWeight: 700, margin: "4px 0" }}>{b.name}</h4>
                        <span style={{ fontSize: "11.5px", color: "#6B7280" }}>{b.subtext}</span>
                        <div style={{ marginTop: "6px", fontSize: "14px", fontWeight: 700, color: "#15803D" }}>₹{b.price.toFixed(2)} / Unit</div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => goToStep(3)} style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid #D1D5DB", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Back</button>
                  <button onClick={() => goToStep(5)} style={{ background: "#15803D", color: "#ffffff", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>Next: Cap &amp; Closure <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 5: CAP & CLOSURE (EXACT DESIGN)
               ---------------------------------------------------- */}
            {currentStep === 5 && (
              <motion.div
                key="modal-step5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                {/* Header */}
                <div style={{ marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: 0, letterSpacing: "-0.02em" }}>
                    Choose Cap Type &amp; Colour
                  </h2>
                  <p style={{ color: "#64748B", fontSize: "14px", marginTop: "4px", marginBottom: 0 }}>
                    Different caps for different needs.
                  </p>
                </div>

                {/* Cap Type Filter Pills */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
                  {CAP_TYPES.map((type) => {
                    const isActive = selectedCapType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedCapType(type)}
                        style={{
                          background: isActive ? "#064E3B" : "#F8FAFC",
                          color: isActive ? "#FFFFFF" : "#475569",
                          border: isActive ? "1px solid #064E3B" : "1px solid #E2E8F0",
                          borderRadius: "9999px",
                          padding: "8px 18px",
                          fontSize: "13px",
                          fontWeight: isActive ? 700 : 600,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                          boxShadow: isActive ? "0 2px 6px rgba(6, 78, 59, 0.2)" : "none",
                        }}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>

                {/* 2-Column Section */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", alignItems: "stretch" }}>
                  {/* Left Column: Cap Color Choices Grid */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {/* Top Row: White, Black, Red, Blue, Green */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
                      {CAP_OPTIONS.slice(0, 5).map((c) => {
                        const isSelected = selectedCap.id === c.id;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setSelectedCap(c)}
                            style={{
                              position: "relative",
                              border: isSelected ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                              borderRadius: "14px",
                              padding: "10px 4px 12px",
                              textAlign: "center",
                              cursor: "pointer",
                              background: isSelected ? "#F0FDF4" : "#FFFFFF",
                              transition: "all 0.15s ease",
                              boxShadow: isSelected ? "0 4px 12px rgba(34, 197, 94, 0.15)" : "0 1px 2px rgba(0,0,0,0.03)",
                            }}
                          >
                            {isSelected && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-5px",
                                  right: "-5px",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  background: "#16A34A",
                                  color: "#FFFFFF",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                                }}
                              >
                                <Check size={12} strokeWidth={3.5} />
                              </div>
                            )}
                            <div style={{ height: "54px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <img src={c.image} alt={c.name} style={{ maxWidth: "52px", maxHeight: "50px", width: "auto", height: "auto", objectFit: "contain", borderRadius: "4px" }} />
                            </div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1F2937", marginTop: "4px" }}>{c.name}</div>
                            <div style={{ fontSize: "13px", fontWeight: 800, color: isSelected ? "#15803D" : "#1F2937", marginTop: "2px" }}>
                              ₹{c.price.toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Row: Gold, Silver */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
                      {CAP_OPTIONS.slice(5, 7).map((c) => {
                        const isSelected = selectedCap.id === c.id;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setSelectedCap(c)}
                            style={{
                              position: "relative",
                              border: isSelected ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                              borderRadius: "14px",
                              padding: "10px 4px 12px",
                              textAlign: "center",
                              cursor: "pointer",
                              background: isSelected ? "#F0FDF4" : "#FFFFFF",
                              transition: "all 0.15s ease",
                              boxShadow: isSelected ? "0 4px 12px rgba(34, 197, 94, 0.15)" : "0 1px 2px rgba(0,0,0,0.03)",
                            }}
                          >
                            {isSelected && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "-5px",
                                  right: "-5px",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  background: "#16A34A",
                                  color: "#FFFFFF",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                                }}
                              >
                                <Check size={12} strokeWidth={3.5} />
                              </div>
                            )}
                            <div style={{ height: "54px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <img src={c.image} alt={c.name} style={{ maxWidth: "52px", maxHeight: "50px", width: "auto", height: "auto", objectFit: "contain", borderRadius: "4px" }} />
                            </div>
                            <div style={{ fontSize: "13px", fontWeight: 700, color: "#1F2937", marginTop: "4px" }}>{c.name}</div>
                            <div style={{ fontSize: "13px", fontWeight: 800, color: isSelected ? "#15803D" : "#1F2937", marginTop: "2px" }}>
                              ₹{c.price.toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Bottle Preview & Feature Checklist Card */}
                  <div
                    style={{
                      border: "1.5px solid #E2E8F0",
                      borderRadius: "18px",
                      padding: "20px 24px",
                      background: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "24px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                    }}
                  >
                    <BottleWithCapPreview selectedCap={selectedCap} />

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[
                        "Secure fit",
                        "Leak resistant",
                        "Multiple colours",
                        "Custom branding",
                      ].map((feature) => (
                        <div key={feature} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "6px",
                              border: "2px solid #16A34A",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#16A34A",
                              background: "#F0FDF4",
                              flexShrink: 0,
                            }}
                          >
                            <Check size={13} strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#334155" }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Navigation */}
                <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    onClick={() => goToStep(4)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "10px",
                      border: "1.5px solid #D1D5DB",
                      background: "#FFFFFF",
                      color: "#1E293B",
                      fontWeight: 600,
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => goToStep(6)}
                    style={{
                      background: "linear-gradient(135deg, #0D5C3A 0%, #064E3B 100%)",
                      color: "#FFFFFF",
                      padding: "12px 28px",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(6, 78, 59, 0.25)",
                    }}
                  >
                    Next: Outer Packaging <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 6: OUTER PACKAGING
               ---------------------------------------------------- */}
            {currentStep === 6 && (
              <motion.div
                key="modal-step6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                <div style={{ borderBottom: "1px solid #F0F4EF", paddingBottom: "16px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803D" }}>STEP 6</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0D2619", marginTop: "4px" }}>Choose Outer Packaging</h2>
                  <p style={{ color: "#4B5563", fontSize: "14px", marginTop: "4px" }}>Select secondary outer protective packaging and retail box finish.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px" }}>
                  {OUTER_OPTIONS.map((o) => {
                    const isSelected = selectedOuter.id === o.id;
                    return (
                      <div
                        key={o.id}
                        onClick={() => setSelectedOuter(o)}
                        style={{
                          position: "relative",
                          border: isSelected ? "2px solid #15803D" : "1px solid #E5E7EB",
                          borderRadius: "14px",
                          padding: "16px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: isSelected ? "#F0FDF4" : "#ffffff",
                        }}
                      >
                        {isSelected && (
                          <div style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px", borderRadius: "50%", background: "#15803D", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Check size={12} strokeWidth={3} />
                          </div>
                        )}
                        <img src={o.image} alt={o.name} style={{ height: "110px", width: "100%", objectFit: "contain", marginBottom: "10px" }} />
                        <h4 style={{ fontSize: "13.5px", fontWeight: 700, margin: "4px 0" }}>{o.name}</h4>
                        <span style={{ fontSize: "11.5px", color: "#6B7280" }}>{o.subtext}</span>
                        <div style={{ marginTop: "6px", fontSize: "14px", fontWeight: 700, color: "#15803D" }}>₹{o.price.toFixed(2)} / Unit</div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => goToStep(5)} style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid #D1D5DB", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Back</button>
                  <button onClick={() => goToStep(7)} style={{ background: "#15803D", color: "#ffffff", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>Next: Label Design <ArrowRight size={16} /></button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 7: LABEL DESIGN (EXACT DESIGN)
               ---------------------------------------------------- */}
            {currentStep === 7 && (
              <motion.div
                key="modal-step7"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                {/* Header */}
                <div style={{ marginBottom: "22px" }}>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: 0, letterSpacing: "-0.02em" }}>
                    Choose Label Design
                  </h2>
                  <p style={{ color: "#64748B", fontSize: "14px", marginTop: "4px", marginBottom: 0 }}>
                    Select finish, material and printing quality.
                  </p>
                </div>

                {/* 5 Label Cards in a Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "26px" }}>
                  {LABEL_OPTIONS.map((l) => {
                    const isSelected = selectedLabel.id === l.id;
                    return (
                      <div
                        key={l.id}
                        onClick={() => setSelectedLabel(l)}
                        style={{
                          position: "relative",
                          border: isSelected ? "2px solid #22C55E" : "1.5px solid #E2E8F0",
                          borderRadius: "14px",
                          padding: "12px 6px 14px",
                          textAlign: "center",
                          cursor: "pointer",
                          background: isSelected ? "#F0FDF4" : "#FFFFFF",
                          transition: "all 0.15s ease",
                          boxShadow: isSelected ? "0 4px 12px rgba(34, 197, 94, 0.15)" : "0 1px 2px rgba(0,0,0,0.03)",
                        }}
                      >
                        {isSelected && (
                          <div
                            style={{
                              position: "absolute",
                              top: "-5px",
                              right: "-5px",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              background: "#16A34A",
                              color: "#FFFFFF",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                            }}
                          >
                            <Check size={12} strokeWidth={3.5} />
                          </div>
                        )}
                        <div style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <LabelGraphic labelId={l.id} width={62} height={60} />
                        </div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1F2937", marginTop: "6px" }}>{l.name}</div>
                        <div style={{ fontSize: "13px", fontWeight: 800, color: "#15803D", marginTop: "2px" }}>
                          ₹{l.price.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Foil Colour (Optional) */}
                <div style={{ marginBottom: "26px", background: "#F8FAFC", padding: "16px 20px", borderRadius: "14px", border: "1px solid #E2E8F0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>Foil Colour</span>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#16A34A" }}>(Optional)</span>
                  </div>

                  <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", alignItems: "center" }}>
                    {FOIL_OPTIONS.map((f) => {
                      const isFoilSelected = selectedFoil.id === f.id;
                      return (
                        <div
                          key={f.id}
                          onClick={() => setSelectedFoil(f)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                            padding: "6px 12px",
                            borderRadius: "9999px",
                            background: isFoilSelected ? "#FFFFFF" : "transparent",
                            border: isFoilSelected ? "1.5px solid #22C55E" : "1.5px solid transparent",
                            boxShadow: isFoilSelected ? "0 2px 6px rgba(34, 197, 94, 0.15)" : "none",
                            transition: "all 0.15s ease",
                          }}
                        >
                          {f.id === "none" ? (
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                background: isFoilSelected ? "#16A34A" : "#E2E8F0",
                                color: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {isFoilSelected && <Check size={12} strokeWidth={3.5} />}
                            </div>
                          ) : (
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                background: f.gradient || f.colorHex,
                                border: isFoilSelected ? "2px solid #0F172A" : "1px solid rgba(0,0,0,0.1)",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                              }}
                            />
                          )}
                          <span style={{ fontSize: "13.5px", fontWeight: isFoilSelected ? 700 : 500, color: isFoilSelected ? "#0F172A" : "#475569" }}>
                            {f.name} {f.price > 0 ? `(+₹${f.price.toFixed(f.price % 1 === 0 ? 0 : 2)})` : "(₹0)"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Label Preview */}
                <div style={{ marginBottom: "26px" }}>
                  <div style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A", marginBottom: "12px" }}>
                    Label Preview
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "24px",
                      alignItems: "center",
                      background: "#FFFFFF",
                      padding: "16px 20px",
                      borderRadius: "18px",
                      border: "1.5px solid #E2E8F0",
                    }}
                  >
                    {/* Left: Label Mockup Card */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <LabelLivePreview productName={productName} selectedLabel={selectedLabel} selectedFoil={selectedFoil} />
                    </div>

                    {/* Right: Feature Checklist */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[
                        "High-quality printing",
                        "Custom design support",
                        "Regulatory-compliant layout",
                        "Your brand, our expertise",
                      ].map((feature) => (
                        <div key={feature} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "6px",
                              border: "2px solid #16A34A",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#16A34A",
                              background: "#F0FDF4",
                              flexShrink: 0,
                            }}
                          >
                            <Check size={13} strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#334155" }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Navigation */}
                <div style={{ marginTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    onClick={() => goToStep(6)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: "10px",
                      border: "1.5px solid #D1D5DB",
                      background: "#FFFFFF",
                      color: "#1E293B",
                      fontWeight: 600,
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => goToStep(8)}
                    style={{
                      background: "linear-gradient(135deg, #0D5C3A 0%, #064E3B 100%)",
                      color: "#FFFFFF",
                      padding: "12px 28px",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "14px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: "0 4px 12px rgba(6, 78, 59, 0.25)",
                    }}
                  >
                    Next: MOQ &amp; Pricing <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ----------------------------------------------------
                STEP 8: MOQ & SAMPLE (EXACT IMAGE 2)
               ---------------------------------------------------- */}
            {currentStep === 8 && (
              <motion.div
                key="modal-step8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                style={{ background: "#FFFFFF", borderRadius: "22px", border: "1px solid #E5E7EB", padding: "32px" }}
              >
                <div style={{ borderBottom: "1px solid #F0F4EF", paddingBottom: "16px", marginBottom: "22px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803D" }}>STEP 8</span>
                  <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#0D2619", marginTop: "4px" }}>MOQ, Pricing &amp; Final Summary</h2>
                  <p style={{ color: "#4B5563", fontSize: "14px", marginTop: "4px" }}>Choose batch volume to calculate exact unit economics and dispatch lab sample.</p>
                </div>

                {/* MOQ Table */}
                <div style={{ overflowX: "auto", marginBottom: "24px" }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px" }}>
                    <thead>
                      <tr style={{ color: "#6B7280", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", textAlign: "left" }}>
                        <th style={{ padding: "8px 14px" }}>Select MOQ (Units)</th>
                        <th style={{ padding: "8px 14px" }}>Total Cost per Unit</th>
                        <th style={{ padding: "8px 14px" }}>Selling Price per Unit</th>
                        <th style={{ padding: "8px 14px" }}>Profit per Unit</th>
                        <th style={{ padding: "8px 14px", textAlign: "right" }}>Est. Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {calculations.moqTiers.map((tier) => {
                        const isSelected = selectedMoq === tier.units;
                        return (
                          <tr
                            key={tier.units}
                            onClick={() => setSelectedMoq(tier.units)}
                            style={{
                              background: isSelected ? "#15803D" : "#FAFAF9",
                              color: isSelected ? "#ffffff" : "#111827",
                              cursor: "pointer",
                              borderRadius: "8px",
                              transition: "all 0.2s ease",
                            }}
                          >
                            <td style={{ padding: "14px", fontWeight: 700, fontSize: "14.5px", borderRadius: "8px 0 0 8px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: isSelected ? "2px solid #ffffff" : "2px solid #9CA3AF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {isSelected && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffffff" }} />}
                                </div>
                                {tier.units >= 2000 ? "2000+ Units" : `${tier.units} Units`}
                              </div>
                            </td>
                            <td style={{ padding: "14px", fontWeight: 600 }}>₹{tier.unitCost.toFixed(2)}</td>
                            <td style={{ padding: "14px" }}>₹{tier.sellingPrice.toFixed(2)}</td>
                            <td style={{ padding: "14px", fontWeight: 700 }}>
                              ₹{tier.profitPerUnit.toFixed(2)}{" "}
                              <span style={{ fontSize: "12px", color: isSelected ? "#86EFAC" : "#16A34A" }}>({tier.marginPercent}%)</span>
                            </td>
                            <td style={{ padding: "14px", textAlign: "right", fontWeight: 700, borderRadius: "0 8px 8px 0" }}>
                              {typeof tier.estProfit === "number" ? `₹${tier.estProfit.toLocaleString("en-IN")}` : tier.estProfit}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Exact Image 2 Summary & Launch Bar */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 260px",
                    gap: "14px",
                    alignItems: "stretch",
                  }}
                  className="summary-launch-grid"
                >
                  {/* Left Pill: Step 8 Summary - Clickable to open Order Confirmation Popup */}
                  <div
                    onClick={() => { setOrderError(""); setSampleOrdered(false); setShowSampleCheckout(true); }}
                    role="button"
                    tabIndex={0}
                    title="Click to view Order Confirmation & Invoice"
                    style={{
                      background: "#0D2619",
                      borderRadius: "16px",
                      padding: "20px 18px",
                      color: "#FFFFFF",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      border: "2px solid transparent",
                      boxShadow: "0 4px 18px rgba(13, 38, 25, 0.25)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 10px 28px rgba(21, 128, 61, 0.4)";
                      e.currentTarget.style.borderColor = "#22C55E";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0px)";
                      e.currentTarget.style.boxShadow = "0 4px 18px rgba(13, 38, 25, 0.25)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ display: "inline-block", background: "#15803D", color: "#FFFFFF", fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "5px", textTransform: "uppercase", marginBottom: "6px" }}>
                          STEP 8
                        </span>
                        <span style={{ fontSize: "10.5px", color: "#86EFAC", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px" }}>
                          View Invoice ↗
                        </span>
                      </div>
                      <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#FFFFFF", margin: "2px 0 4px" }}>Summary</h3>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>Review your product and proceed.</p>
                    </div>

                    <div style={{ marginTop: "14px", display: "flex", justifyContent: "flex-end" }}>
                      <div style={{ width: "42px", height: "50px", background: "#C29B38", borderRadius: "6px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                        <div style={{ width: "22px", height: "5px", background: "#E5E7EB", borderRadius: "2px", position: "absolute", top: "-3px" }} />
                        <div style={{ width: "24px", height: "2px", background: "#78350F", margin: "2px 0" }} />
                        <div style={{ width: "24px", height: "2px", background: "#78350F", margin: "2px 0" }} />
                        <div style={{ width: "16px", height: "2px", background: "#78350F", margin: "2px 0" }} />
                      </div>
                    </div>
                  </div>

                  {/* Middle Panel: Your Product Summary */}
                  <div style={{ background: "#FAF8F5", borderRadius: "16px", border: "1px solid #E8E3DA", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "14px" }}>Your Product Summary</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "16px" }}>🌿</span>
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Product</span>
                            <strong style={{ fontSize: "12px", color: "#111827" }}>{productName}</strong>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img src={selectedBottle.image} alt={selectedBottle.name} style={{ width: "26px", height: "32px", objectFit: "contain" }} />
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Bottle</span>
                            <strong style={{ fontSize: "12px", color: "#111827" }}>{selectedBottle.name}</strong>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img src={selectedCap.image} alt={selectedCap.name} style={{ width: "26px", height: "30px", objectFit: "contain", borderRadius: "4px" }} />
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Cap</span>
                            <strong style={{ fontSize: "12px", color: "#111827" }}>{selectedCap.name} ({selectedCapType})</strong>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <img src={selectedOuter.image} alt={selectedOuter.name} style={{ width: "26px", height: "32px", objectFit: "contain" }} />
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Packaging</span>
                            <strong style={{ fontSize: "12px", color: "#111827" }}>{selectedOuter.name}</strong>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "26px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <LabelGraphic labelId={selectedLabel.id} width={26} height={26} />
                          </div>
                          <div>
                            <span style={{ fontSize: "10.5px", color: "#6B7280", display: "block" }}>Label</span>
                            <strong style={{ fontSize: "12px", color: "#111827" }}>
                              {selectedLabel.name} {selectedFoil.id !== "none" ? `+ ${selectedFoil.name} Foil` : ""}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #E5E0D8", display: "flex", justifyContent: "flex-end", gap: "24px" }}>
                      <div>
                        <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Your Profit per Unit</span>
                        <strong style={{ fontSize: "16px", color: "#15803D" }}>₹{calculations.currentTier.profitPerUnit.toFixed(2)} ({calculations.currentTier.marginPercent}%)</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Total Investment</span>
                        <strong style={{ fontSize: "16px", color: "#15803D" }}>₹{calculations.totalInvestment.toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Right Panel: Ready to Launch? Order Sample Now */}
                  <div style={{ background: "#FAF8F5", borderRadius: "16px", border: "1px solid #E8E3DA", padding: "18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                          <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Ready to Launch?</h4>
                          <p style={{ fontSize: "11.5px", color: "#4B5563", marginTop: "3px" }}>Get your free sample &amp; start your brand</p>
                        </div>
                        <span style={{ fontSize: "28px" }}>🚀</span>
                      </div>
                    </div>

                    <button
                      onClick={() => { setOrderError(""); setSampleOrdered(false); setShowSampleCheckout(true); }}
                      style={{
                        marginTop: "12px",
                        background: "#15803D",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(21, 128, 61, 0.3)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#166534")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#15803D")}
                    >
                      <span style={{ fontSize: "15px" }}>📦</span>
                      <span>Order Sample Now</span>
                    </button>
                  </div>
                </div>

                {/* Inline Sample Confirmation Alert / Form */}
                {sampleOrdered && (
                  <div style={{ marginTop: "24px", padding: "20px", background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: "14px", textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "50%", background: "#15803D", color: "#ffffff", marginBottom: "10px" }}>
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0D2619", margin: "0 0 6px" }}>Sample Request Dispatched to Zenon Cleanrooms!</h3>
                    <p style={{ fontSize: "13.5px", color: "#166534", margin: 0, lineHeight: 1.5 }}>
                      We have registered your formulation order for <strong>{productName}</strong> ({selectedMoq} Units batch scale). Our lab team will courier your sample batch with Certificate of Analysis (CoA) within 48 hours.
                    </p>
                  </div>
                )}

                <div style={{ marginTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button onClick={() => goToStep(7)} style={{ padding: "12px 24px", borderRadius: "10px", border: "1px solid #D1D5DB", background: "#ffffff", fontWeight: 600, cursor: "pointer" }}>Back</button>
                  <button onClick={onClose} style={{ background: "#0D2619", color: "#ffffff", padding: "12px 28px", borderRadius: "10px", fontWeight: 700, border: "none", cursor: "pointer" }}>Finish &amp; Close</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    )}
  </motion.div>

      {/* Contact / Sample Order Modal */}
      <AnimatePresence>
        {showSampleCheckout && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 1200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "rgba(0,0,0,0.68)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }}
              style={{ width: "min(720px, 100%)", maxHeight: "90vh", overflowY: "auto", background: "#FFFFFF", borderRadius: "20px", boxShadow: "0 25px 70px rgba(0,0,0,0.3)", padding: "26px", position: "relative" }}
            >
              <button onClick={() => setShowSampleCheckout(false)} style={{ position: "absolute", top: 14, right: 16, width: 36, height: 36, borderRadius: "50%", border: "1px solid #E5E7EB", background: "#FFFFFF", cursor: "pointer", fontSize: 20, color: "#475569" }} aria-label="Close">×</button>
              {!sampleOrdered ? (
                <>
                  <div style={{ marginBottom: "20px", paddingRight: "40px" }}>
                    <span style={{ display: "inline-block", background: "#DCFCE7", color: "#166534", fontSize: "11px", fontWeight: 800, padding: "5px 9px", borderRadius: "999px", marginBottom: "8px" }}>SAMPLE ORDER REQUEST</span>
                    <h2 style={{ margin: 0, fontSize: "25px", color: "#0D2619", fontWeight: 800 }}>Contact Us to Order Your Sample</h2>
                    <p style={{ margin: "7px 0 0", color: "#64748B", fontSize: "13px", lineHeight: 1.5 }}>Enter your details and we will receive your complete product configuration by email with a PDF invoice.</p>
                  </div>
                  <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "14px", marginBottom: "18px" }}>
                    <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "5px" }}>Selected Product</div>
                    <strong style={{ color: "#0F172A" }}>{productName} • {selectedMoq} Units</strong>
                    <div style={{ marginTop: "6px", fontSize: "11.5px", color: "#475569", lineHeight: 1.55 }}>{selectedBottle.name} • {selectedCap.name} • {selectedOuter.name} • {selectedLabel.name}{selectedFoil.id !== "none" ? ` • ${selectedFoil.name} Foil` : ""}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" }}>
                    {[["name","Full Name *","Enter your full name"],["companyName","Company Name *","Enter company name"],["email","Email *","Enter email address"],["phone","Phone Number *","Enter phone number"],["city","City *","Enter city"],["state","State *","Enter state"],["pincode","PIN Code *","Enter PIN code"]].map(([key,label,placeholder]) => (
                      <label key={key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>{label}</span>
                        <input value={sampleForm[key as keyof typeof sampleForm]} onChange={(e) => setSampleForm((prev) => ({ ...prev, [key]: e.target.value }))} placeholder={placeholder} style={{ width: "100%", boxSizing: "border-box", padding: "11px 12px", border: "1px solid #CBD5E1", borderRadius: "9px", outline: "none", fontSize: "13px", color: "#0F172A" }} />
                      </label>
                    ))}
                    <label style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "1 / -1" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#334155" }}>Complete Address *</span>
                      <textarea value={sampleForm.address} onChange={(e) => setSampleForm((prev) => ({ ...prev, address: e.target.value }))} placeholder="Enter complete delivery address" rows={3} style={{ width: "100%", boxSizing: "border-box", padding: "11px 12px", border: "1px solid #CBD5E1", borderRadius: "9px", outline: "none", resize: "vertical", fontSize: "13px", color: "#0F172A" }} />
                    </label>
                  </div>
                  {orderError && <div style={{ marginTop: "14px", padding: "10px 12px", borderRadius: "9px", background: "#FEF2F2", border: "1px solid #FECACA", color: "#B91C1C", fontSize: "12px" }}>{orderError}</div>}
                  <button onClick={handlePlaceSampleOrder} disabled={isSubmittingOrder} style={{ width: "100%", marginTop: "18px", padding: "13px 16px", border: "none", borderRadius: "10px", background: isSubmittingOrder ? "#94A3B8" : "#15803D", color: "#FFFFFF", fontSize: "14px", fontWeight: 800, cursor: isSubmittingOrder ? "not-allowed" : "pointer" }}>{isSubmittingOrder ? "Submitting Order..." : "Order Sample Now"}</button>
                  <p style={{ margin: "9px 0 0", textAlign: "center", color: "#64748B", fontSize: "11px" }}>No online payment is required here. This is a sample order request.</p>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "28px 10px 12px" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#DCFCE7", color: "#15803D", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 12 }}>✓</div>
                  <h2 style={{ margin: 0, color: "#0D2619", fontSize: "24px" }}>Sample Order Submitted!</h2>
                  <p style={{ color: "#475569", fontSize: "13px", lineHeight: 1.6, maxWidth: 500, margin: "10px auto 0" }}>Your complete product configuration has been submitted successfully. The PDF invoice has been sent to our email team.</p>
                  {orderNumber && <div style={{ display: "inline-block", marginTop: "14px", padding: "7px 12px", borderRadius: "8px", background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#166534", fontWeight: 800, fontSize: "12px" }}>Order ID: {orderNumber}</div>}
                  <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
                    <button onClick={handleDownloadInvoice} disabled={!invoiceBase64} style={{ padding: "11px 18px", borderRadius: "9px", border: "1px solid #15803D", background: "#15803D", color: "#FFFFFF", fontWeight: 700, cursor: invoiceBase64 ? "pointer" : "not-allowed" }}>Download Invoice PDF</button>
                    <button onClick={() => setShowSampleCheckout(false)} style={{ padding: "11px 18px", borderRadius: "9px", border: "1px solid #CBD5E1", background: "#FFFFFF", color: "#334155", fontWeight: 700, cursor: "pointer" }}>Close</button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
