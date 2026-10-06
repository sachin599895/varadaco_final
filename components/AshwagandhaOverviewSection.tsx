"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const STEPS = [
  { id: 1, name: "Why & Benefits", active: true },
  { id: 2, name: "Ingredients", active: false },
  { id: 3, name: "Formulation & ROI", active: false },
  { id: 4, name: "Bottle", active: false },
  { id: 5, name: "Packaging", active: false },
  { id: 6, name: "Label", active: false },
  { id: 7, name: "MOQ & Sample", active: false },
];

const BENEFITS = [
  {
    title: "Stress support",
    desc: "Commonly positioned for everyday stress management.",
  },
  {
    title: "Energy & stamina",
    desc: "Often used in wellness and active-lifestyle products.",
  },
  {
    title: "Recovery support",
    desc: "Can be positioned around active lifestyle recovery.",
  },
  {
    title: "Daily wellness",
    desc: "Useful for general wellness product concepts.",
  },
];

export default function AshwagandhaOverviewSection() {
  return (
    <section style={{ padding: "60px 4.5vw", background: "transparent" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: "24px",
          border: "1px solid #E5E7EB",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          padding: "32px 36px",
        }}
      >
        {/* ========================================================
            TOP STEPPER BAR (MATCHING SCREENSHOT)
           ======================================================== */}
        <div
          style={{
            borderBottom: "1px solid #F3F4F6",
            paddingBottom: "24px",
            marginBottom: "32px",
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
            {STEPS.map((step) => {
              const isFirst = step.id === 1;
              const isLast = step.id === 7;
              return (
                <Link
                  key={step.id}
                  href="/products"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      background: isLast ? "#E5E7EB" : "#15803D",
                      color: isLast ? "#6B7280" : "#FFFFFF",
                      boxShadow: isFirst ? "0 0 0 3px rgba(21, 128, 61, 0.2)" : "none",
                    }}
                  >
                    {step.id}
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: isFirst ? 700 : 500,
                      color: isFirst ? "#0D2619" : isLast ? "#6B7280" : "#15803D",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            MAIN TWO-COLUMN CARD: STEP 1 WHY ASHWAGANDHA?
           ======================================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "36px",
            alignItems: "stretch",
          }}
          className="ashwagandha-overview-grid"
        >
          {/* LEFT COLUMN: TITLE & 4 BENEFIT CARDS */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#15803D",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                STEP 1
              </span>

              <h2
                style={{
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  margin: "0 0 14px",
                }}
              >
                Why <span style={{ color: "#15803D" }}>Ashwagandha</span>?
              </h2>

              <p
                style={{
                  color: "#4B5563",
                  fontSize: "15px",
                  lineHeight: 1.55,
                  marginBottom: "32px",
                  maxWidth: "520px",
                }}
              >
                Understand the ingredient, common wellness positioning, typical use cases and what makes it interesting for a new product.
              </p>

              {/* 4 Benefit Cards Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                {BENEFITS.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "14px",
                      padding: "20px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                      transition: "transform 0.2s ease, border-color 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ color: "#15803D", fontWeight: 800, fontSize: "16px" }}>✓</span>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>
                        {item.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.45 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom link to builder */}
            <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #F3F4F6", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <span style={{ fontSize: "13px", color: "#6B7280" }}>
                Ready to formulate with clinical Withania somnifera?
              </span>
              <Link
                href="/products"
                style={{
                  color: "#15803D",
                  fontSize: "14px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                View Formulation Journey & Details <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: REAL GENERATED ASHWAGANDHA PLANT + CALLOUT */}
          <div
            style={{
              background: "#F4F7F3",
              borderRadius: "20px",
              border: "1px solid #E2EAE0",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* REAL PHOTO OF ASHWAGANDHA PLANT & LEAVES */}
              <div
                style={{
                  position: "relative",
                  height: "260px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(13, 38, 25, 0.08)",
                  marginBottom: "18px",
                  background: "#E8EFE7",
                }}
              >
                <img
                  src="/products/ashwagandha_plant_real.jpg"
                  alt="Real Ashwagandha plant with leaves, berries, and roots"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Botanical verification tag */}
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
                  }}
                >
                  🌿 Real Withania Somnifera (Living Plant & Roots)
                </div>
              </div>

              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>
                Ashwagandha
              </h3>
              <p style={{ fontSize: "13.5px", color: "#4B5563", margin: "0 0 18px", lineHeight: 1.45 }}>
                A botanical ingredient commonly used in wellness formulations.
              </p>
            </div>

            {/* CALLOUT BOX WITH GREEN ACCENT BORDER */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                borderLeft: "4px solid #15803D",
                padding: "16px 18px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                Build your business with us.
              </h4>
              <p style={{ fontSize: "13px", color: "#4B5563", margin: 0, lineHeight: 1.45 }}>
                We can help you explore formulation, packaging, pricing and sample development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
