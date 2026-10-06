"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Check,
  Lock,
  CreditCard,
  Building2,
  Wallet,
  Copy,
  MessageCircle,
  ArrowRight,
  FileText,
} from "lucide-react";

export interface SampleCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  dosage?: string;
  units?: number;
  bottleImage?: string;
  bottleName?: string;
  totalAmount?: number;
}

export default function SampleCheckoutModal({
  isOpen,
  onClose,
  productName = "Ashwagandha",
  dosage = "200 mg",
  units = 500,
  bottleImage = "/images/ashwagandha-why-product.png",
  bottleName = "Amber Glass Bottle",
  totalAmount = 54500,
}: SampleCheckoutModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "razorpay" | "upi" | "card" | "netbanking" | "wallet"
  >("razorpay");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const orderId = "GC20240910-0015";
  const formattedAmount = `₹${totalAmount.toLocaleString("en-IN")}`;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    triggerToast("Order ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      triggerToast("Payment successful! Order ID #GC20240910-0015 confirmed.");
    }, 1000);
  };

  const handleDownloadInvoice = () => {
    const invoiceWindow = window.open("", "_blank");
    if (invoiceWindow) {
      invoiceWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice - ${orderId}</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #0F172A; }
              .header { border-bottom: 2px solid #16A34A; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
              .title { font-size: 24px; font-weight: 800; color: #15803D; }
              .table { width: 100%; border-collapse: collapse; margin-top: 30px; }
              .table th, .table td { padding: 12px; border-bottom: 1px solid #E2E8F0; text-align: left; }
              .table th { background: #F8FAFC; font-weight: 700; color: #475569; }
              .total { font-size: 20px; font-weight: 800; text-align: right; margin-top: 30px; color: #15803D; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <div class="title">VARADACO INDUSTRIES</div>
                <div>Custom Healthcare & Nutraceutical Manufacturing</div>
              </div>
              <div style="text-align: right;">
                <h3 style="margin: 0 0 4px 0;">INVOICE</h3>
                <div>Order ID: ${orderId}</div>
                <div>Date: ${new Date().toLocaleDateString("en-IN")}</div>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Specifications</th>
                  <th>Quantity</th>
                  <th style="text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>${productName} Capsules</strong></td>
                  <td>${dosage} | ${bottleName}</td>
                  <td>${units} Units</td>
                  <td style="text-align: right;">${formattedAmount}</td>
                </tr>
              </tbody>
            </table>
            <div class="total">Total Paid: ${formattedAmount} (Secured via Razorpay)</div>
            <p style="margin-top: 40px; color: #64748B; font-size: 13px;">Thank you for partnering with Varadaco Industries. For support, contact +91 9822767273.</p>
          </body>
        </html>
      `);
      invoiceWindow.document.close();
      invoiceWindow.print();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.72)",
        backdropFilter: "blur(10px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0D2619",
            color: "#FFFFFF",
            padding: "9px 20px",
            borderRadius: "100px",
            fontSize: "13px",
            fontWeight: 700,
            zIndex: 100000,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #22C55E",
          }}
        >
          <span style={{ color: "#22C55E" }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        style={{
          background: "linear-gradient(135deg, #F8FBF8 0%, #F1F8F2 50%, #FAFBF9 100%)",
          borderRadius: "22px",
          maxWidth: "1060px",
          width: "100%",
          maxHeight: "96vh",
          overflowY: "auto",
          boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
          border: "1.5px solid rgba(21, 128, 61, 0.25)",
          position: "relative",
          padding: "18px 26px 18px 26px",
        }}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "14px",
            right: "16px",
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748B",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E2E8F0";
            e.currentTarget.style.color = "#0F172A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.color = "#64748B";
          }}
        >
          <X size={15} />
        </button>

        {/* ========================================================
            ROW 1: ORDER SUMMARY (LEFT) & SECURE PAYMENT (RIGHT)
           ======================================================== */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          {/* Right Doodle: Safe Simple Secure */}
          <div
            style={{
              position: "absolute",
              right: "-12px",
              top: "12%",
              color: "#16A34A",
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              textAlign: "center",
            }}
            className="checkout-doodle-text"
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                display: "inline-block",
                transform: "rotate(6deg)",
                lineHeight: 1.2,
              }}
            >
              Safe<br />Simple<br />Secure
            </span>
            <svg width="30" height="22" viewBox="0 0 40 30" fill="none" style={{ margin: "2px auto 0" }}>
              <path
                d="M36 4C26 13 15 21 4 23M4 23C10 23 13 20 13 20M4 23C7 17 9 13 9 13"
                stroke="#16A34A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.02fr 1fr",
              gap: "16px",
              alignItems: "start",
            }}
            className="checkout-two-col-grid"
          >
            {/* LEFT CARD: ORDER SUMMARY */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1.5px solid #E2E8F0",
                padding: "14px 18px",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.02)",
              }}
            >
              <h3
                style={{
                  fontSize: "15.5px",
                  fontWeight: 850,
                  color: "#0F172A",
                  margin: "0 0 10px 0",
                  letterSpacing: "-0.01em",
                }}
              >
                Order Summary
              </h3>

              {/* Product Row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #F1F5F9",
                  gap: "10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "48px",
                      borderRadius: "8px",
                      background: "#FAF8F5",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={bottleImage}
                      alt={productName}
                      style={{ maxWidth: "85%", maxHeight: "85%", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: "13.5px",
                        fontWeight: 800,
                        color: "#0F172A",
                        margin: "0 0 1px 0",
                      }}
                    >
                      {productName} Capsules
                    </h4>
                    <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 500 }}>
                      {dosage} | {units} Units
                    </div>
                    <div
                      style={{
                        width: "15px",
                        height: "15px",
                        borderRadius: "3px",
                        background: "#15803D",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "2px",
                      }}
                    >
                      <span style={{ color: "#FFFFFF", fontSize: "8px", fontWeight: 800 }}>🌿</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "15.5px", fontWeight: 850, color: "#0F172A" }}>
                  {formattedAmount}
                </div>
              </div>

              {/* Breakdown Rows */}
              <div style={{ padding: "6px 0", display: "flex", flexDirection: "column", gap: "4px" }}>
                {[
                  { label: "Bottle & Cap", val: "₹0" },
                  { label: "Packaging Charges", val: "₹0" },
                  { label: "Label Charges", val: "₹0" },
                  { label: "Taxes (GST)", val: "₹0" },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "11.5px",
                      color: "#64748B",
                      fontWeight: 500,
                    }}
                  >
                    <span>{row.label}</span>
                    <span style={{ color: "#0F172A", fontWeight: 600 }}>{row.val}</span>
                  </div>
                ))}
              </div>

              {/* Total Line */}
              <div
                style={{
                  borderTop: "1px solid #E2E8F0",
                  paddingTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A" }}>Total</span>
                <span style={{ fontSize: "17.5px", fontWeight: 850, color: "#0F172A" }}>
                  {formattedAmount}
                </span>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={handlePay}
                style={{
                  width: "100%",
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #057A44 0%, #0D2619 100%)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 3px 10px rgba(5, 122, 68, 0.22)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* RIGHT CARD: SECURE PAYMENT */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                border: "1.5px solid #E2E8F0",
                padding: "14px 18px",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: "#EBF9EE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#15803D",
                    flexShrink: 0,
                  }}
                >
                  <Lock size={14} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 850,
                      color: "#0F172A",
                      margin: 0,
                    }}
                  >
                    Secure Payment
                  </h3>
                  <p style={{ fontSize: "11px", color: "#64748B", margin: "1px 0 0 0" }}>
                    Choose your preferred payment method
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" }}>
                {/* 1. Razorpay */}
                <div
                  onClick={() => setSelectedMethod("razorpay")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "7px 12px",
                    borderRadius: "9px",
                    border: selectedMethod === "razorpay" ? "1.5px solid #16A34A" : "1px solid #E2E8F0",
                    background: selectedMethod === "razorpay" ? "#F0FDF4" : "#FFFFFF",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      border: selectedMethod === "razorpay" ? "4.5px solid #16A34A" : "1.5px solid #CBD5E1",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M4 20L11 4H18L13 15H20L11 20H4Z" fill="#0C2340" />
                      <path d="M11 4L5 16H10L14 7L11 4Z" fill="#0284C7" />
                    </svg>
                    <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#0F172A" }}>
                      Razorpay
                    </span>
                  </div>
                </div>

                {/* 2. UPI */}
                <div
                  onClick={() => setSelectedMethod("upi")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "7px 12px",
                    borderRadius: "9px",
                    border: selectedMethod === "upi" ? "1.5px solid #16A34A" : "1px solid #E2E8F0",
                    background: selectedMethod === "upi" ? "#F0FDF4" : "#FFFFFF",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      border: selectedMethod === "upi" ? "4.5px solid #16A34A" : "1.5px solid #CBD5E1",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "4px",
                        background: "#E0F2FE",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "9px", fontWeight: 800, color: "#0369A1" }}>UPI</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#0F172A" }}>
                      UPI (Google Pay, PhonePe, Paytm)
                    </span>
                  </div>
                </div>

                {/* 3. Cards */}
                <div
                  onClick={() => setSelectedMethod("card")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "7px 12px",
                    borderRadius: "9px",
                    border: selectedMethod === "card" ? "1.5px solid #16A34A" : "1px solid #E2E8F0",
                    background: selectedMethod === "card" ? "#F0FDF4" : "#FFFFFF",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      border: selectedMethod === "card" ? "4.5px solid #16A34A" : "1.5px solid #CBD5E1",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "4px",
                        background: "#0284C7",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      <CreditCard size={11} />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#0F172A" }}>
                      Credit / Debit Card
                    </span>
                  </div>
                </div>

                {/* 4. Net Banking */}
                <div
                  onClick={() => setSelectedMethod("netbanking")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "7px 12px",
                    borderRadius: "9px",
                    border: selectedMethod === "netbanking" ? "1.5px solid #16A34A" : "1px solid #E2E8F0",
                    background: selectedMethod === "netbanking" ? "#F0FDF4" : "#FFFFFF",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      border: selectedMethod === "netbanking" ? "4.5px solid #16A34A" : "1.5px solid #CBD5E1",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "4px",
                        background: "#EA580C",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      <Building2 size={11} />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#0F172A" }}>
                      Net Banking
                    </span>
                  </div>
                </div>

                {/* 5. Wallets */}
                <div
                  onClick={() => setSelectedMethod("wallet")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "7px 12px",
                    borderRadius: "9px",
                    border: selectedMethod === "wallet" ? "1.5px solid #16A34A" : "1px solid #E2E8F0",
                    background: selectedMethod === "wallet" ? "#F0FDF4" : "#FFFFFF",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      border: selectedMethod === "wallet" ? "4.5px solid #16A34A" : "1.5px solid #CBD5E1",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "4px",
                        background: "#7C3AED",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                      }}
                    >
                      <Wallet size={11} />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#0F172A" }}>
                      Wallets
                    </span>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePay}
                disabled={isProcessing}
                style={{
                  width: "100%",
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "#0066FF",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13px",
                  border: "none",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  boxShadow: "0 3px 10px rgba(0, 102, 255, 0.25)",
                  transition: "all 0.2s ease",
                  opacity: isProcessing ? 0.75 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) e.currentTarget.style.background = "#0052CC";
                }}
                onMouseLeave={(e) => {
                  if (!isProcessing) e.currentTarget.style.background = "#0066FF";
                }}
              >
                <Lock size={13} />
                <span>{isProcessing ? "Processing..." : `Pay ${formattedAmount} Securely`}</span>
              </button>

              {/* Trust Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "6px",
                  fontSize: "11px",
                  color: "#64748B",
                  fontWeight: 600,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#16A34A" }}>
                  <Check size={12} strokeWidth={2.8} /> 100% Secure
                </span>
                <span>|</span>
                <span>Encrypted Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            ROW 2: ORDER PLACED SUCCESSFULLY (ON SAME SCREEN)
           ======================================================== */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1.5px solid #E2E8F0",
            padding: "12px 18px 12px 18px",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.02)",
            position: "relative",
          }}
        >
          {/* Right Doodle: Wellness Delivered */}
          <div
            style={{
              position: "absolute",
              right: "18px",
              top: "14px",
              color: "#16A34A",
              fontFamily: "Comic Sans MS, cursive, sans-serif",
              textAlign: "right",
            }}
            className="success-doodle-text"
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                display: "inline-block",
                transform: "rotate(-3deg)",
                lineHeight: 1.2,
              }}
            >
              Wellness<br />Delivered
            </span>
            <svg width="30" height="18" viewBox="0 0 38 24" fill="none" style={{ marginLeft: "auto", marginTop: "2px" }}>
              <path
                d="M34 2C24 9 14 16 4 18M4 18C9 18 13 15 13 15M4 18C7 13 9 10 9 10"
                stroke="#16A34A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  margin: "0 0 4px 0",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: "#15803D",
                    color: "#FFFFFF",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(21, 128, 61, 0.25)",
                  }}
                >
                  <Check size={15} strokeWidth={3} />
                </div>
                <h3
                  style={{
                    fontSize: "17px",
                    fontWeight: 850,
                    color: "#0F172A",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Order Placed Successfully!
                </h3>
              </div>
              <p style={{ fontSize: "11.5px", color: "#475569", margin: "0 0 6px 0" }}>
                Thank you for choosing GreenCart. Your wellness journey just got better.
              </p>

              {/* Order ID with Copy */}
              <div
                onClick={handleCopyOrderId}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#15803D",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                title="Click to copy Order ID"
              >
                <span>Order ID: {orderId}</span>
                {copied ? <Check size={12} color="#16A34A" /> : <Copy size={12} color="#16A34A" />}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleDownloadInvoice}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: "1.5px solid #CBD5E1",
                  background: "#FFFFFF",
                  color: "#0F172A",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#15803D";
                  e.currentTarget.style.color = "#15803D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#CBD5E1";
                  e.currentTarget.style.color = "#0F172A";
                }}
              >
                <FileText size={14} color="#15803D" />
                <span>Download Invoice</span>
              </button>

              <a
                href={`https://wa.me/919822767273?text=${encodeURIComponent(`Hi, I need help regarding my Order #${orderId} (${productName} Capsules).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: "1.5px solid #CBD5E1",
                  background: "#FFFFFF",
                  color: "#0F172A",
                  fontSize: "12px",
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#15803D";
                  e.currentTarget.style.color = "#15803D";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#CBD5E1";
                  e.currentTarget.style.color = "#0F172A";
                }}
              >
                <MessageCircle size={14} color="#15803D" />
                <span>Need Help? Chat Now</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
