"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrderConfirmationModal from "./OrderConfirmationModal";
import RazorpayModal from "./RazorpayModal";
import {
  Check,
  TrendingUp,
  Leaf,
  Clock,
  Sparkles,
  ArrowRight,
  ClipboardList,
  Rocket,
  ShieldCheck,
  X,
  CheckCircle2,
  ChevronRight,
  Sprout,
  Activity,
  HeartPulse,
  BatteryCharging,
  Sun,
  Package,
} from "lucide-react";

interface IngredientState {
  id: string;
  name: string;
  amount: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  marketRange: string;
  impact: "High" | "Medium" | "Low";
  basePricePerUnit: number;
  defaultAmount: number;
}

const INITIAL_INGREDIENTS: IngredientState[] = [
  {
    id: "ashwagandha",
    name: "Ashwagandha Extract",
    amount: 300,
    unit: "mg",
    min: 100,
    max: 600,
    step: 25,
    marketRange: "250 - 600 mg",
    impact: "High",
    basePricePerUnit: 28.0 / 300,
    defaultAmount: 300,
  },
  {
    id: "black_pepper",
    name: "Black Pepper Extract",
    amount: 10,
    unit: "mg",
    min: 5,
    max: 20,
    step: 1,
    marketRange: "5 - 20 mg",
    impact: "High",
    basePricePerUnit: 5.0 / 10,
    defaultAmount: 10,
  },
  {
    id: "l_theanine",
    name: "L-Theanine",
    amount: 50,
    unit: "mg",
    min: 25,
    max: 100,
    step: 5,
    marketRange: "25 - 100 mg",
    impact: "Medium",
    basePricePerUnit: 12.0 / 50,
    defaultAmount: 50,
  },
  {
    id: "zinc",
    name: "Zinc",
    amount: 10,
    unit: "mg",
    min: 5,
    max: 20,
    step: 1,
    marketRange: "5 - 20 mg",
    impact: "Medium",
    basePricePerUnit: 3.0 / 10,
    defaultAmount: 10,
  },
  {
    id: "vitamin_d3",
    name: "Vitamin D3",
    amount: 600,
    unit: "IU",
    min: 400,
    max: 1000,
    step: 50,
    marketRange: "400 - 1000 IU",
    impact: "Medium",
    basePricePerUnit: 4.0 / 600,
    defaultAmount: 600,
  },
  {
    id: "excipients",
    name: "Excipients & Others",
    amount: 120,
    unit: "mg",
    min: 50,
    max: 200,
    step: 10,
    marketRange: "-",
    impact: "Low",
    basePricePerUnit: 6.0 / 120,
    defaultAmount: 120,
  },
];

const WIZARD_STEPS = [
  { id: 1, name: "Why & Benefits" },
  { id: 2, name: "Ingredients" },
  { id: 3, name: "Formulation & ROI" },
  { id: 4, name: "Bottle" },
  { id: 5, name: "Packaging" },
  { id: 6, name: "Label" },
  { id: 7, name: "MOQ & Sample" },
];

export default function FormulationSimulator() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [ingredients, setIngredients] = useState<IngredientState[]>(INITIAL_INGREDIENTS);
  const [selectedMoq, setSelectedMoq] = useState<number>(500);
  const [sampleModalOpen, setSampleModalOpen] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    phone: "",
    email: "",
    address: "",
  });

  const updateAmount = (id: string, val: number) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: val } : item))
    );
  };

  // Calculations
  const stats = useMemo(() => {
    const rawTotal = ingredients.reduce((sum, item) => {
      return sum + item.amount * item.basePricePerUnit;
    }, 0);

    const totalCostPerCapsule = Math.round(rawTotal);
    const suggestedSellingPrice = 149.0;
    const profitPerUnit = suggestedSellingPrice - totalCostPerCapsule;
    const marginPercent = Math.round((profitPerUnit / suggestedSellingPrice) * 100);

    const bottleCost = 8.0; // HDPE White Bottle
    const packagingCost = 4.0; // Paper Box
    const labelCost = 2.0; // Premium Label
    const totalUnitPackagedCost = totalCostPerCapsule + bottleCost + packagingCost + labelCost;
    const finalSellingPrice = 179.0;
    const finalProfitPerUnit = finalSellingPrice - totalUnitPackagedCost;
    const finalMarginPercent = Math.round((finalProfitPerUnit / finalSellingPrice) * 100);
    const totalInvestment = selectedMoq * totalUnitPackagedCost;

    return {
      totalCostPerCapsule,
      suggestedSellingPrice,
      profitPerUnit,
      marginPercent,
      finalProfitPerUnit,
      finalMarginPercent,
      totalInvestment,
    };
  }, [ingredients, selectedMoq]);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", fontFamily: "inherit" }}>
      {/* ========================================================
          TOP STEPPER BAR (MATCHING SCREENSHOT)
          1 Why & Benefits | 2 Ingredients | 3 Formulation & ROI | 4 Bottle | 5 Packaging | 6 Label | 7 MOQ & Sample
         ======================================================== */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E5E7EB",
          padding: "16px 24px",
          marginBottom: "24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minWidth: "720px",
            gap: "12px",
          }}
        >
          {WIZARD_STEPS.map((step) => {
            const isCurrent = activeStep === step.id;
            const isCompleted = activeStep > step.id || step.id < 7;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 10px",
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                    background: step.id === 7 && activeStep !== 7 ? "#E5E7EB" : "#15803D",
                    color: step.id === 7 && activeStep !== 7 ? "#6B7280" : "#FFFFFF",
                    boxShadow: isCurrent ? "0 0 0 3px rgba(21, 128, 61, 0.2)" : "none",
                  }}
                >
                  {step.id}
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? "#0D2619" : step.id === 7 ? "#6B7280" : "#15803D",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          STEP 1: WHY ASHWAGANDHA? (EXACT SCREENSHOT LAYOUT WITH REAL PLANT PHOTO)
         ======================================================== */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          padding: "32px",
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: "36px",
          alignItems: "stretch",
          marginBottom: "28px",
        }}
        className="formulation-grid"
      >
        {/* LEFT COLUMN: TITLE & 4 BENEFIT CARDS */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#15803D",
                display: "block",
                marginBottom: "6px",
              }}
            >
              STEP 1
            </span>

            <h2
              style={{
                fontSize: "clamp(26px, 3vw, 36px)",
                fontWeight: 800,
                color: "#111827",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                margin: "0 0 12px",
              }}
            >
              Why <span style={{ color: "#15803D" }}>Ashwagandha</span>?
            </h2>

            <p
              style={{
                color: "#4B5563",
                fontSize: "15px",
                lineHeight: 1.55,
                marginBottom: "28px",
                maxWidth: "540px",
              }}
            >
              Understand the ingredient, common wellness positioning, typical use cases and what makes it interesting for a new product.
            </p>

            {/* 4 BENEFIT CARDS (2x2 GRID) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {/* Card 1: Stress support */}
              <div
                style={{
                  background: "#FAF9F6",
                  border: "1px solid #EAE5DE",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: "#15803D", fontWeight: 800, fontSize: "16px" }}>✓</span>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>
                    Stress support
                  </h4>
                </div>
                <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>
                  Commonly positioned for everyday stress management.
                </p>
              </div>

              {/* Card 2: Energy & stamina */}
              <div
                style={{
                  background: "#FAF9F6",
                  border: "1px solid #EAE5DE",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: "#15803D", fontWeight: 800, fontSize: "16px" }}>✓</span>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>
                    Energy & stamina
                  </h4>
                </div>
                <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>
                  Often used in wellness and active-lifestyle products.
                </p>
              </div>

              {/* Card 3: Recovery support */}
              <div
                style={{
                  background: "#FAF9F6",
                  border: "1px solid #EAE5DE",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: "#15803D", fontWeight: 800, fontSize: "16px" }}>✓</span>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>
                    Recovery support
                  </h4>
                </div>
                <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>
                  Can be positioned around active lifestyle recovery.
                </p>
              </div>

              {/* Card 4: Daily wellness */}
              <div
                style={{
                  background: "#FAF9F6",
                  border: "1px solid #EAE5DE",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ color: "#15803D", fontWeight: 800, fontSize: "16px" }}>✓</span>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>
                    Daily wellness
                  </h4>
                </div>
                <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>
                  Useful for general wellness product concepts.
                </p>
              </div>
            </div>
          </div>

          {/* Quick jump link to sliders below */}
          <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: "#15803D", fontWeight: 600 }}>
              🌿 Clinical Grade Withania Somnifera (KSM-66 & Root Extract Available)
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL ASHWAGANDHA PLANT VISUAL + CALLOUT */}
        <div
          style={{
            background: "#F2F6F1",
            borderRadius: "18px",
            border: "1px solid #DFEADB",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* REAL ASHWAGANDHA PLANT IMAGE */}
          <div>
            <div
              style={{
                position: "relative",
                height: "210px",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(13, 38, 25, 0.08)",
                marginBottom: "16px",
                background: "#E8F0E6",
              }}
            >
              <img
                src="/products/ashwagandha.jpg"
                alt="Real Ashwagandha Plant (Withania somnifera) with natural leaves, berries and roots"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  // Fallback to botanical unsplash photo if needed
                  e.currentTarget.src =
                    "/images/unsplash/photo-1615485290382-441e4d049cb5.jpg";
                }}
              />

              {/* Botanical badge overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  background: "rgba(13, 38, 25, 0.85)",
                  backdropFilter: "blur(6px)",
                  color: "#A7F3D0",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Sprout size={13} color="#34D399" />
                Withania somnifera (Living Plant)
              </div>
            </div>

            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
              Ashwagandha
            </h3>
            <p style={{ fontSize: "13px", color: "#4B5563", margin: "0 0 16px", lineHeight: 1.4 }}>
              A botanical ingredient commonly used in wellness formulations.
            </p>
          </div>

          {/* CALLOUT BOX WITH GREEN LEFT BORDER */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "10px",
              border: "1px solid #E5E7EB",
              borderLeft: "4px solid #15803D",
              padding: "14px 16px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
            }}
          >
            <h5 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
              Build your business with us.
            </h5>
            <p style={{ fontSize: "12.5px", color: "#4B5563", margin: 0, lineHeight: 1.45 }}>
              We can help you explore formulation, packaging, pricing and sample development.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================
          IMAGE 1: TRY DIFFERENT FORMULATIONS & SEE YOUR COST
         ======================================================== */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          padding: "28px 32px",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "32px",
          alignItems: "start",
        }}
        className="formulation-grid"
      >
        {/* LEFT PANEL: TABLE / SLIDERS */}
        <div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.01em",
              marginBottom: "24px",
            }}
          >
            Try Different Formulations & See Your Cost
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#4B5563", fontSize: "13px", fontWeight: 600, borderBottom: "1px solid #F3F4F6" }}>
                  <th style={{ textAlign: "left", padding: "10px 8px", width: "24%" }}>Ingredient</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", width: "38%" }}>Your Amount</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", width: "16%" }}>Market Range</th>
                  <th style={{ textAlign: "left", padding: "10px 8px", width: "10%" }}>Impact</th>
                  <th style={{ textAlign: "right", padding: "10px 8px", width: "12%" }}>Cost Impact</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((item) => {
                  const itemCost = item.amount * item.basePricePerUnit;
                  return (
                    <tr key={item.id} style={{ borderBottom: "1px solid #F9FAFB" }}>
                      <td style={{ padding: "14px 8px", fontWeight: 600, color: "#1F2937", fontSize: "14px" }}>
                        {item.name}
                      </td>

                      <td style={{ padding: "14px 8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <input
                            type="range"
                            min={item.min}
                            max={item.max}
                            step={item.step}
                            value={item.amount}
                            onChange={(e) => updateAmount(item.id, Number(e.target.value))}
                            style={{
                              flex: 1,
                              accentColor: "#15803D",
                              cursor: "pointer",
                              height: "5px",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#111827",
                              minWidth: "62px",
                              textAlign: "right",
                            }}
                          >
                            {item.amount} {item.unit}
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: "14px 8px", fontSize: "13px", color: "#4B5563" }}>
                        {item.marketRange}
                      </td>

                      <td style={{ padding: "14px 8px" }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "12px",
                            fontWeight: 700,
                            color:
                              item.impact === "High"
                                ? "#166534"
                                : item.impact === "Medium"
                                ? "#B45309"
                                : "#15803D",
                          }}
                        >
                          {item.impact}
                          {item.impact === "High" && <span style={{ color: "#166534", fontSize: "10px" }}>▲</span>}
                          {item.impact === "Medium" && <span style={{ color: "#B45309", fontSize: "10px" }}>▲</span>}
                          {item.impact === "Low" && <span style={{ color: "#15803D", fontSize: "10px" }}>●</span>}
                        </span>
                      </td>

                      <td style={{ padding: "14px 8px", textAlign: "right", fontWeight: 600, fontSize: "14px", color: "#111827" }}>
                        ₹{itemCost.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDEBAR PANEL: LIVE UNIT ECONOMICS */}
        <div
          style={{
            background: "#FBF9F5",
            borderRadius: "16px",
            border: "1px solid #EDE8E1",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#4B5563", display: "block" }}>
              Total Cost per Capsule
            </span>
            <div style={{ fontSize: "36px", fontWeight: 800, color: "#15803D", marginTop: "2px", letterSpacing: "-0.02em" }}>
              ₹{stats.totalCostPerCapsule.toFixed(2)}
            </div>

            <div style={{ height: "1px", background: "#E5E0D8", margin: "18px 0" }} />

            <span style={{ fontSize: "13px", fontWeight: 600, color: "#4B5563", display: "block" }}>
              Suggested Selling Price
            </span>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#111827", marginTop: "2px" }}>
              ₹{stats.suggestedSellingPrice.toFixed(2)}
            </div>

            <div style={{ height: "1px", background: "#E5E0D8", margin: "18px 0" }} />

            <span style={{ fontSize: "13px", fontWeight: 600, color: "#4B5563", display: "block" }}>
              Your Profit per Unit
            </span>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#15803D", marginTop: "2px" }}>
              ₹{stats.profitPerUnit.toFixed(2)}{" "}
              <span style={{ fontSize: "16px", fontWeight: 700 }}>({stats.marginPercent}%)</span>
            </div>
          </div>

          <div
            style={{
              marginTop: "24px",
              background: "#FEF9C3",
              border: "1px solid #FDE047",
              borderRadius: "10px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#854D0E",
              lineHeight: 1.4,
            }}
          >
            <strong>🎉 Great Choice!</strong>
            <br />
            High demand formula!
          </div>
        </div>
      </div>

      {/* ========================================================
          IMAGE 2: STEP 7 / HORIZONTAL SUMMARY & LAUNCH BAR
         ======================================================== */}
      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "220px 1fr 280px",
          gap: "16px",
          alignItems: "stretch",
        }}
        className="summary-launch-grid"
      >
        {/* LEFT PILL: STEP 7 SUMMARY */}
        <div
          onClick={() => setShowOrderConfirmation(true)}
          role="button"
          tabIndex={0}
          title="Click to view Order Confirmation & Invoice"
          style={{
            background: "#0D2619",
            borderRadius: "18px",
            padding: "22px 20px",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
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
              <span
                style={{
                  display: "inline-block",
                  background: "#15803D",
                  color: "#FFFFFF",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px",
                }}
              >
                STEP 7
              </span>
              <span style={{ fontSize: "10.5px", color: "#86EFAC", fontWeight: 600 }}>
                View Invoice ↗
              </span>
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#FFFFFF", margin: "2px 0 4px" }}>
              Summary
            </h3>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
              Review your product and proceed.
            </p>
          </div>

          <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                width: "48px",
                height: "56px",
                background: "#C29B38",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ width: "24px", height: "6px", background: "#E5E7EB", borderRadius: "3px", position: "absolute", top: "-3px" }} />
              <div style={{ width: "28px", height: "2px", background: "#78350F", margin: "2px 0" }} />
              <div style={{ width: "28px", height: "2px", background: "#78350F", margin: "2px 0" }} />
              <div style={{ width: "20px", height: "2px", background: "#78350F", margin: "2px 0" }} />
            </div>
          </div>
        </div>

        {/* MIDDLE PANEL: YOUR PRODUCT SUMMARY */}
        <div
          style={{
            background: "#FAF8F5",
            borderRadius: "18px",
            border: "1px solid #E8E3DA",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#111827", marginBottom: "16px" }}>
              Your Product Summary
            </h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", color: "#15803D" }}>
                  <Leaf size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Product</span>
                  <strong style={{ fontSize: "13px", color: "#111827" }}>Ashwagandha Capsules</strong>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", color: "#15803D" }}>
                  <Clock size={18} />
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Formulation Cost</span>
                  <strong style={{ fontSize: "13px", color: "#15803D" }}>₹{stats.totalCostPerCapsule.toFixed(2)} / Capsule</strong>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src="/images/unsplash/photo-1584308666744-24d5c474f2ae.jpg"
                  alt="Bottle"
                  style={{ width: "32px", height: "38px", objectFit: "contain", borderRadius: "4px" }}
                />
                <div>
                  <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Bottle</span>
                  <strong style={{ fontSize: "13px", color: "#111827" }}>HDPE White Bottle</strong>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src="/images/unsplash/photo-1530587191325-3db32d826c18.jpg"
                  alt="Packaging"
                  style={{ width: "32px", height: "38px", objectFit: "contain", borderRadius: "4px" }}
                />
                <div>
                  <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Packaging</span>
                  <strong style={{ fontSize: "13px", color: "#111827" }}>Paper Box</strong>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img
                  src="/images/unsplash/photo-1556228720-195a672e8a03.jpg"
                  alt="Label"
                  style={{ width: "32px", height: "38px", objectFit: "contain", borderRadius: "4px" }}
                />
                <div>
                  <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Label</span>
                  <strong style={{ fontSize: "13px", color: "#111827" }}>Premium Label</strong>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "16px",
              paddingTop: "14px",
              borderTop: "1px solid #E5E0D8",
              display: "flex",
              justifyContent: "flex-end",
              gap: "28px",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Your Profit per Unit</span>
              <strong style={{ fontSize: "17px", color: "#15803D" }}>
                ₹{stats.finalProfitPerUnit.toFixed(2)} ({stats.finalMarginPercent}%)
              </strong>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#6B7280", display: "block" }}>Total Investment</span>
              <strong style={{ fontSize: "18px", color: "#15803D" }}>
                ₹{stats.totalInvestment.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: READY TO LAUNCH? */}
        <div
          style={{
            background: "#FAF8F5",
            borderRadius: "18px",
            border: "1px solid #E8E3DA",
            padding: "22px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0 }}>
                  Ready to Launch?
                </h4>
                <p style={{ fontSize: "12px", color: "#4B5563", marginTop: "4px", lineHeight: 1.4 }}>
                  Get your free sample & start your brand
                </p>
              </div>

              <div style={{ fontSize: "36px", lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>
                🚀
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.open("https://razorpay.com", "_blank");
            }}
            style={{
              marginTop: "16px",
              background: "#15803D",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 14px rgba(21, 128, 61, 0.3)",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            💳 Order Sample Now
          </button>
        </div>
      </div>

      {/* MODAL: ORDER SAMPLE NOW */}
      {sampleModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(13, 38, 25, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              maxWidth: "520px",
              width: "100%",
              padding: "32px",
              position: "relative",
              boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
            }}
          >
            <button
              onClick={() => {
                setSampleModalOpen(false);
                setOrderSubmitted(false);
              }}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "#F3F4F6",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#4B5563",
              }}
            >
              <X size={18} />
            </button>

            {!orderSubmitted ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "#15803D", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Rocket size={18} />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                    Order Free Lab Formulation Sample
                  </h3>
                </div>

                <p style={{ fontSize: "13px", color: "#4B5563", marginBottom: "18px" }}>
                  Zenon R&D cleanrooms will prepare a custom pilot batch with your selected dosages (₹{stats.totalCostPerCapsule}/cap) and express courier it with official Certificate of Analysis (CoA).
                </p>

                <form onSubmit={handleOrderSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "4px" }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "4px" }}>
                        Brand / Company *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Zenon Nutra"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "1px solid #D1D5DB",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "4px" }}>
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "1px solid #D1D5DB",
                          fontSize: "14px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "4px" }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="founder@yourbrand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "14px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "4px" }}>
                      Shipping Address for Sample Courier *
                    </label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Office or Lab dispatch address with Pincode"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "14px",
                        outline: "none",
                        resize: "none",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      marginTop: "10px",
                      background: "#15803D",
                      color: "#FFFFFF",
                      padding: "13px",
                      borderRadius: "10px",
                      fontSize: "15px",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    Confirm & Dispatch Sample Order
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#DCFCE7",
                    color: "#15803D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                  Sample Order Dispatched to Lab!
                </h3>
                <p style={{ color: "#4B5563", fontSize: "14px", marginTop: "8px", lineHeight: 1.5 }}>
                  Thank you, <strong>{formData.name}</strong>. Your custom formulation ticket for <strong>{formData.brand}</strong> has been assigned to Zenon QC & Formulation Suite. You will receive courier dispatch & tracking details on WhatsApp ({formData.phone}).
                </p>

                <button
                  onClick={() => {
                    setSampleModalOpen(false);
                    setOrderSubmitted(false);
                  }}
                  style={{
                    marginTop: "20px",
                    background: "#0D2619",
                    color: "#FFFFFF",
                    padding: "10px 24px",
                    borderRadius: "8px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={showOrderConfirmation}
        onClose={() => setShowOrderConfirmation(false)}
        data={{
          productTitle: "Ashwagandha Formulation",
          productImage: "/packaging/hdpe_white.jpg",
          bottleName: "HDPE White Bottle",
          quantity: selectedMoq,
          unitPrice: 149.0,
          discountPerUnit: 15.0,
          totalInvestment: stats.totalInvestment,
          profitPerUnit: stats.profitPerUnit,
          customerName: formData.name || "Vikram Malhotra",
          customerAddress: formData.address || "Plot 42, Okhla Industrial Area Ph-III",
          customerCityState: "New Delhi, Delhi",
          customerZip: "110020",
          customerCountry: "India",
          paymentMethod: "Visa **** 4242",
          shippingMethod: "Standard shipping",
          orderId: "ID12345",
        }}
      />

     
      
    </div>
  );
}
