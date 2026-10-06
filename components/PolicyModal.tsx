"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Cookie, Check, X, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PolicyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already accepted policies
    try {
      const consent = localStorage.getItem("varadaco_policy_accepted");
      if (!consent) {
        // Small delay so it appears smoothly after the page loads
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is disabled
      setIsOpen(true);
    }
  }, []);

  if (!mounted) return null;

  const handleAcceptAll = () => {
    try {
      localStorage.setItem("varadaco_policy_accepted", "all");
      localStorage.setItem("varadaco_policy_timestamp", new Date().toISOString());
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem("varadaco_policy_accepted", "essential");
      localStorage.setItem("varadaco_policy_timestamp", new Date().toISOString());
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Glassmorphic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(13, 38, 25, 0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "540px",
              background: "#FAF8F5",
              borderRadius: "28px",
              border: "1.5px solid #E2E8DF",
              boxShadow: "0 28px 70px rgba(13, 38, 25, 0.25), 0 8px 24px rgba(0, 0, 0, 0.08)",
              padding: "36px 32px",
              color: "#1E251F",
              overflow: "hidden",
            }}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close policy modal"
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(21, 128, 61, 0.08)",
                border: "none",
                color: "#1E251F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(21, 128, 61, 0.16)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(21, 128, 61, 0.08)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <X size={18} />
            </button>

            {/* Header / Security Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #15803D 0%, #2D5A27 100%)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 18px rgba(21, 128, 61, 0.35)",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={26} />
              </div>

              <div>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#15803D",
                  }}
                >
                  Varadaco Compliance & Privacy
                </span>
                <h3
                  style={{
                    fontSize: "21px",
                    fontWeight: 800,
                    margin: "2px 0 0",
                    letterSpacing: "-0.01em",
                    color: "#1E251F",
                  }}
                >
                  Accept Our <em style={{ color: "#15803D", fontStyle: "normal" }}>Terms & Privacy Policy</em>
                </h3>
              </div>
            </div>

            {/* Content Body */}
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.65",
                color: "#475569",
                margin: "0 0 20px",
              }}
            >
              Welcome to <strong>Varadaco Industries</strong>. We adhere to global healthcare, WHO-GMP, and data privacy regulations (GDPR & ISO 27001). We use essential cookies and encrypted telemetry to provide seamless formulation inquiry submissions and secure browsing.
            </p>

            {/* 3 Key Safeguards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "#FCFBF9",
                border: "1px solid #E2E8DF",
                borderRadius: "16px",
                padding: "14px 16px",
                marginBottom: "22px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12.5px", color: "#1E251F", fontWeight: 600 }}>
                <Lock size={15} color="#15803D" style={{ flexShrink: 0 }} />
                <span>256-bit Encrypted NDA formulation requests</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12.5px", color: "#1E251F", fontWeight: 600 }}>
                <Cookie size={15} color="#15803D" style={{ flexShrink: 0 }} />
                <span>Strictly no third-party data selling or ad trackers</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12.5px", color: "#1E251F", fontWeight: 600 }}>
                <Check size={15} color="#15803D" style={{ flexShrink: 0 }} />
                <span>WHO-GMP & FDA regulatory dossier compliance</span>
              </div>
            </div>

            {/* Expandable Policy Details */}
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  background: "#F0F4EF",
                  padding: "12px 14px",
                  borderRadius: "12px",
                }}
              >
                By clicking <strong>Accept Policy</strong>, you agree to the storage of essential cookies on your device to enhance site navigation, analyze formulation traffic, and assist in regulatory compliance. You can update your preferences anytime.
              </motion.div>
            )}

            {/* Policy Toggle / Learn More */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "22px",
                fontSize: "12px",
              }}
            >
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#15803D",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {showDetails ? "Hide Details" : "View Policy Details"}
                <ChevronRight
                  size={13}
                  style={{
                    transform: showDetails ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>

              <Link
                href="/about#vision"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "#64748b",
                  textDecoration: "underline",
                  fontWeight: 500,
                }}
              >
                Compliance Overview
              </Link>
            </div>

            {/* Actions Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleAcceptAll}
                style={{
                  flex: 1,
                  minWidth: "160px",
                  background: "#15803D",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "100px",
                  padding: "13px 20px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(21, 128, 61, 0.3)",
                  transition: "transform 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#2D5A27";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#15803D";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Check size={16} />
                Accept Policy
              </button>

              <button
                type="button"
                onClick={handleAcceptEssential}
                style={{
                  flex: 1,
                  minWidth: "140px",
                  background: "#FCFBF9",
                  color: "#1E251F",
                  border: "1.5px solid #D5E0D5",
                  borderRadius: "100px",
                  padding: "13px 20px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#15803D";
                  e.currentTarget.style.color = "#15803D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#D5E0D5";
                  e.currentTarget.style.color = "#1E251F";
                }}
              >
                Essential Only
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
