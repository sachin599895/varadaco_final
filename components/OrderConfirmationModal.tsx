"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Download, Printer, ArrowRight, CheckCircle2 } from "lucide-react";
import Logo from "./Logo";

export interface OrderConfirmationData {
  productTitle: string;
  productImage: string;
  bottleName: string;
  outerName?: string;
  labelName?: string;
  quantity: number; // e.g. 500 units
  unitPrice: number; // base selling/benchmark price per unit
  discountPerUnit?: number;
  totalInvestment: number;
  profitPerUnit?: number;
  customerName?: string;
  customerAddress?: string;
  customerCityState?: string;
  customerZip?: string;
  customerCountry?: string;
  paymentMethod?: string;
  shippingMethod?: string;
  orderId?: string;
  orderDate?: string;
}

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: OrderConfirmationData;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  data,
}: OrderConfirmationModalProps) {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const benchmarkUnitPrice = data.unitPrice || 179.0;
  const discount = data.discountPerUnit ?? 15.0;
  const priceAfterDiscount = Math.max(1, benchmarkUnitPrice - discount);
  const subtotal = benchmarkUnitPrice * data.quantity;
  const totalDiscount = discount * data.quantity;
  const totalPrice = data.totalInvestment || priceAfterDiscount * data.quantity;

  const formattedDate =
    data.orderDate ||
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());

  const handleViewOrder = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          background: "rgba(10, 20, 15, 0.72)",
          backdropFilter: "blur(8px)",
          overflowY: "auto",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "460px",
            background: "#FFFFFF",
            borderRadius: "24px",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            color: "#1F2937",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button Top-Right */}
          <button
            onClick={onClose}
            aria-label="Close Order Confirmation"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: 10,
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.06)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#4B5563",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.12)";
              e.currentTarget.style.color = "#111827";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 0, 0, 0.06)";
              e.currentTarget.style.color = "#4B5563";
            }}
          >
            <X size={18} />
          </button>

          {/* 1. TOP HEADER BANNER (Soft Warm Cream Background) */}
          <div
            style={{
              background: "#FBF7F0",
              padding: "28px 24px 22px",
              textAlign: "center",
              borderBottom: "1px solid #EDE7DC",
            }}
          >
            {/* Center Official Logo */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
              <Logo size="sm" clickable={false} />
            </div>

            {/* ORDER CONFIRMATION with Divider Lines */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                margin: "0 0 6px",
              }}
            >
              <div
                style={{
                  height: "1px",
                  background: "#D8D1C5",
                  flex: 1,
                  maxWidth: "45px",
                }}
              />
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#111827",
                  margin: 0,
                }}
              >
                ORDER CONFIRMATION
              </h2>
              <div
                style={{
                  height: "1px",
                  background: "#D8D1C5",
                  flex: 1,
                  maxWidth: "45px",
                }}
              />
            </div>

            {/* Subtitle & Explanatory Text */}
            <h3
              style={{
                fontSize: "15.5px",
                fontWeight: 700,
                color: "#1F2937",
                margin: "4px 0 6px",
              }}
            >
              Thank you for your order!
            </h3>
            <p
              style={{
                fontSize: "12px",
                lineHeight: "1.5",
                color: "#4B5563",
                margin: "0 auto",
                maxWidth: "360px",
              }}
            >
              We’ve received your order and will contact you as soon as your package is shipped. You can find your purchase information below.
            </p>
          </div>

          {/* SCROLLABLE / COMPACT CONTENT BODY */}
          <div
            style={{
              padding: "20px 22px 24px",
              maxHeight: "calc(88vh - 170px)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* 2. ORDER SUMMARY HEADER & DATE */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  marginBottom: "2px",
                }}
              >
                <div style={{ height: "1px", background: "#E5E7EB", flex: 1 }} />
                <h4
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  Order Summary
                </h4>
                <div style={{ height: "1px", background: "#E5E7EB", flex: 1 }} />
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "11.5px",
                  color: "#6B7280",
                  margin: 0,
                }}
              >
                {formattedDate}
              </p>
            </div>

            {/* 3. PRODUCT SPECS CARD */}
            <div
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: "14px",
                padding: "12px",
                background: "#FFFFFF",
                display: "grid",
                gridTemplateColumns: "110px 1fr",
                gap: "14px",
                alignItems: "center",
              }}
            >
              {/* Product Thumbnail */}
              <div
                style={{
                  width: "110px",
                  height: "125px",
                  background: "#F8F6F2",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px",
                  border: "1px solid #EDE7DC",
                  overflow: "hidden",
                }}
              >
                <img
                  src={data.productImage || "/packaging/hdpe_white.jpg"}
                  alt={data.productTitle}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Product Info Table / Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <strong style={{ fontSize: "13.5px", color: "#111827" }}>
                    {data.productTitle}
                  </strong>
                  <span style={{ fontSize: "12px", color: "#6B7280" }}>
                    ₹{benchmarkUnitPrice.toFixed(2)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11.5px",
                    color: "#6B7280",
                  }}
                >
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#059669",
                    fontWeight: 700,
                    marginBottom: "4px",
                  }}
                >
                  <span>Price after discount</span>
                  <span>₹{priceAfterDiscount.toFixed(2)}</span>
                </div>

                <div
                  style={{
                    borderTop: "1px dashed #E5E7EB",
                    paddingTop: "5px",
                    marginTop: "2px",
                    display: "grid",
                    gridTemplateColumns: "72px 1fr",
                    rowGap: "2px",
                    fontSize: "11px",
                    color: "#4B5563",
                  }}
                >
                  <span style={{ color: "#9CA3AF" }}>Product ID</span>
                  <span style={{ fontWeight: 600, color: "#111827" }}>
                    {data.orderId || "ID12345"}
                  </span>

                  <span style={{ color: "#9CA3AF" }}>Variant</span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#111827",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {data.bottleName}
                  </span>

                  <span style={{ color: "#9CA3AF" }}>Vendor</span>
                  <span style={{ fontWeight: 600, color: "#111827" }}>
                    Varadaco Industries
                  </span>

                  <span style={{ color: "#9CA3AF" }}>Weight</span>
                  <span style={{ fontWeight: 600, color: "#111827" }}>
                    60 Caps / Bottle
                  </span>

                  <span style={{ color: "#9CA3AF" }}>Quantity</span>
                  <span style={{ fontWeight: 700, color: "#15803D" }}>
                    {data.quantity.toLocaleString("en-IN")} Units
                  </span>
                </div>
              </div>
            </div>

            {/* 4. PRICING BREAKDOWN BOX */}
            <div
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#FFFFFF",
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#4B5563",
                }}
              >
                <span>Subtotal price</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div
                style={{
                  padding: "0 14px 10px",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#4B5563",
                }}
              >
                <span>Discount</span>
                <span>-₹{totalDiscount.toLocaleString("en-IN")}</span>
              </div>
              <div
                style={{
                  padding: "0 14px 10px",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#4B5563",
                }}
              >
                <span>Shipping price</span>
                <span style={{ color: "#059669", fontWeight: 600 }}>Free (Cleanroom)</span>
              </div>

              {/* Total Price Highlight Row */}
              <div
                style={{
                  background: "#ECFDF5",
                  borderTop: "1px solid #A7F3D0",
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong style={{ fontSize: "13.5px", color: "#065F46" }}>
                  Total price:
                </strong>
                <strong style={{ fontSize: "16px", color: "#047857" }}>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            {/* 7. VIEW ORDER ACTION BUTTON */}
            <div style={{ textAlign: "center", paddingTop: "4px" }}>
              <button
                onClick={handleViewOrder}
                style={{
                  background: downloaded ? "#15803D" : "#1E5647",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "24px",
                  padding: "9px 36px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(30, 86, 71, 0.25)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.background = downloaded ? "#166534" : "#144537";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = downloaded ? "#15803D" : "#1E5647";
                }}
              >
                {downloaded ? (
                  <>
                    <Check size={14} />
                    Order Confirmed
                  </>
                ) : (
                  <>View order</>
                )}
              </button>

              {downloaded && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: "11px",
                    color: "#15803D",
                    fontWeight: 600,
                    marginTop: "6px",
                  }}
                >
                  Invoice & Batch Specification dispatched to Cleanroom!
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
