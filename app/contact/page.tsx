"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Building2,
  Package,
  Layers,
  FileCheck
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    productRequirement: "",
    productFormat: "Capsules",
    expectedQuantity: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");

const [openFaq, setOpenFaq] = useState<number | null>(0);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.message
  ) {
    return;
  }

  setIsSubmitting(true);
  setSubmitError("");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to send enquiry");
    }

    setSubmitted(true);

  } catch (error) {
    console.error("Contact form error:", error);

    setSubmitError(
      "Unable to send enquiry. Please try again."
    );

  } finally {
    setIsSubmitting(false);
  }
};

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const faqs = [
    {
      q: "What product formats can Varadaco manufacture?",
      a: "We support capsules, tablets, powders, dietary supplements, and Ayurvedic formulations with complete packaging and documentation support.",
    },
    {
      q: "Where is Varadaco Industries based?",
      a: "Varadaco Industries is headquartered in Greater Noida, Uttar Pradesh, with cleanroom manufacturing facilities and global export capabilities.",
    },
    {
      q: "Do you provide regulatory and export documentation support?",
      a: "Yes. We assist businesses with product specifications, packaging and label review, GMP documentation, certificates of analysis, and domestic/export documentation.",
    },
    {
      q: "What is the typical Minimum Order Quantity (MOQ)?",
      a: "MOQ varies by product format and customization level. Contact our team with your expected quantity to receive specific requirements and timelines.",
    },
  ];

  return (
    <main style={{ background: "#FBF9F5", color: "#1F2937", minHeight: "100vh" }}>
      <Navbar />

      {/* 10. HERO BANNER */}
      <section
        style={{
          background: "linear-gradient(135deg, #E8F5ED 0%, #F2FBF5 45%, #E1F4EA 100%)",
          padding: "140px 4.5vw 80px",
          borderBottom: "1px solid #D5E7DC",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="contact-hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >


            <h1
              style={{
                fontSize: "clamp(2.4rem, 4.2vw, 3.6rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#0D2619",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              Let's Build Your <br />
              <span style={{ color: "#15803D" }}>Next Product</span>
            </h1>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.65,
                color: "#475569",
                maxWidth: "540px",
                marginBottom: "30px",
              }}
            >
              Tell us what you want to manufacture. Our team will help you identify the right next step.
            </p>

            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              {[
                { top: "Greater Noida, UP", sub: "HEADQUARTERS" },
                { top: "Fast Response", sub: "WITHIN 24 HOURS" },
                { top: "Bulk & Export", sub: "GLOBAL SUPPORT" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(209, 231, 218, 0.8)",
                    borderRadius: "14px",
                    padding: "12px 18px",
                    minWidth: "115px",
                    boxShadow: "0 4px 12px rgba(13, 38, 25, 0.04)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "#0D2619",
                      lineHeight: 1.1,
                      marginBottom: "4px",
                    }}
                  >
                    {stat.top}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#64748B",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToForm}
              style={{
                background: "#15803D",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "30px",
                padding: "13px 28px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 6px 18px rgba(21, 128, 61, 0.28)",
                transition: "all 0.2s ease",
              }}
            >
              <span>Submit Your Enquiry</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "1 / 1",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(13, 38, 25, 0.2)",
                background: "#E6F4EA",
              }}
            >
              <img
                src="/images/pharma_contact_hero.jpg"
                alt="Varadaco Manufacturing and Product Development"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#0D2619",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                }}
              >
                📍 Greater Noida, Uttar Pradesh
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(8px)",
                  padding: "7px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#15803D",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Phone size={13} color="#15803D" />
                <span>+91 9822767273</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. MAIN CONTACT & FORM SECTION */}
      <section
        ref={formRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "50px 4.5vw 80px",
        }}
      >
        <div className="contact-direct-grid">
          {/* LEFT COLUMN: SIDE CONTENT (Docx Section 10) */}
          <div>
            <div
              style={{
                background: "linear-gradient(135deg, #0D2619 0%, #153E2A 100%)",
                borderRadius: "20px",
                padding: "32px 28px",
                color: "#FFFFFF",
                marginBottom: "24px",
                boxShadow: "0 10px 30px rgba(13, 38, 25, 0.12)",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#7CA832",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                GET IN TOUCH
              </span>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: "12px",
                  lineHeight: 1.25,
                }}
              >
                Have a Product Idea?
              </h2>
              <p style={{ fontSize: "14.5px", color: "#d1e8b0", lineHeight: 1.7, marginBottom: "22px" }}>
                Whether you're launching a new nutraceutical product, looking for contract manufacturing or exploring export opportunities, connect with our team.
              </p>

              <a
                href="https://wa.me/919822767273?text=Hi%20Varadaco%20Team%2C%20I%20have%20a%20product%20idea%20and%20want%20to%20partner%20with%20Varadaco%20Industries."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#7CA832",
                  color: "#0D2619",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  fontSize: "13.5px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={17} />
                <span>Partner With Varadaco Industries</span>
              </a>
            </div>

            {/* Direct Contact Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "#FEE2E2",
                    color: "#DC2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#111827", textTransform: "uppercase", marginBottom: "3px" }}>
                    LOCATION
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1F2937" }}>
                    Varadaco Industries LLP
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#6B7280", marginTop: "2px" }}>
                    A2/57, 1st floor,Site 5, Kasna Industrial Area, Greater Noida, Uttar Pradesh -201308
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "#DCFCE7",
                    color: "#15803D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#111827", textTransform: "uppercase", marginBottom: "3px" }}>
                    PHONE / WHATSAPP
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#15803D" }}>
                    +91 8588813593
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                    Mon - Sat • Business Inquiries Desk
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "14px",
                  padding: "18px 20px",
                  display: "flex",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "#EFF6FF",
                    color: "#2563EB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 800, color: "#111827", textTransform: "uppercase", marginBottom: "3px" }}>
                    EMAIL ADDRESS
                  </div>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#1F2937" }}>
                  enquiry@varadacoindustries.com
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px" }}>
                    Response time: Within 24 business hours
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ENQUIRY FORM (Docx Section 10 Exact Fields) */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #E5E7EB",
              padding: "34px 30px",
              boxShadow: "0 10px 30px -8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <div style={{ marginBottom: "22px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#111827",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                LET'S BUILD YOUR NEXT PRODUCT
              </h3>
              <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
                Tell us what you want to manufacture. Our team will help you identify the right next step.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  padding: "40px 20px",
                  textAlign: "center",
                  background: "#F0FDF4",
                  borderRadius: "14px",
                  border: "1px solid #BBF7D0",
                }}
              >
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "50%",
                    background: "#15803D",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 14px",
                  }}
                >
                  <CheckCircle2 size={30} />
                </div>
                <h4 style={{ fontSize: "19px", fontWeight: 800, color: "#0D2619", marginBottom: "6px" }}>
                  Enquiry Submitted Successfully!
                </h4>
                <p style={{ fontSize: "13.5px", color: "#166534", maxWidth: "360px", margin: "0 auto 20px", lineHeight: 1.5 }}>
                  Thank you, <strong>{formData.fullName}</strong>. Our team at Varadaco Industries will review your requirements for <em>{formData.productFormat}</em> and get in touch within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: "#0D2619",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px 22px",
                    fontSize: "13px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Full Name & Company Name */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "13px",
                        background: "#F9FAFB",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                      COMPANY NAME
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Health LLC"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "13px",
                        background: "#F9FAFB",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Email Address & Phone Number */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "13px",
                        background: "#F9FAFB",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 / International phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "13px",
                        background: "#F9FAFB",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Product Requirement */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                    PRODUCT REQUIREMENT
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ashwagandha Root Extract Capsules / Multivitamin Powder / Herbal Churna"
                    value={formData.productRequirement}
                    onChange={(e) => setFormData({ ...formData, productRequirement: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      fontSize: "13px",
                      background: "#F9FAFB",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Product Format & Expected Quantity */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                      PRODUCT FORMAT
                    </label>
                    <select
                      value={formData.productFormat}
                      onChange={(e) => setFormData({ ...formData, productFormat: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "13px",
                        background: "#F9FAFB",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="Capsules">Capsules</option>
                      <option value="Tablets">Tablets</option>
                      <option value="Powders">Powders</option>
                      <option value="Dietary Supplements">Dietary Supplements</option>
                      <option value="Ayurvedic Products">Ayurvedic Products</option>
                      <option value="Custom / Multiple Formats">Custom / Multiple Formats</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                      EXPECTED QUANTITY
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5,000 units / 500 kg"
                      value={formData.expectedQuantity}
                      onChange={(e) => setFormData({ ...formData, expectedQuantity: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        fontSize: "13px",
                        background: "#F9FAFB",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "5px", textTransform: "uppercase" }}>
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your formulation, packaging preferences, target launch timeline or export destination..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "1px solid #D1D5DB",
                      fontSize: "13px",
                      background: "#F9FAFB",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>
                {submitError && (
  <div
    style={{
      background: "#FEF2F2",
      color: "#B91C1C",
      border: "1px solid #FECACA",
      borderRadius: "8px",
      padding: "12px 14px",
      fontSize: "13px",
    }}
  >
    {submitError}
  </div>
)}

                {/* Submit Button (Submit Enquiry →) */}
                <button
  type="submit"
  disabled={isSubmitting}
  style={{
    marginTop: "6px",
    background: isSubmitting ? "#6B7280" : "#15803D",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    padding: "14px",
    fontSize: "14px",
    fontWeight: 800,
    cursor: isSubmitting ? "not-allowed" : "pointer",
    width: "100%",
    transition: "background 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  }}
>
  <span>
    {isSubmitting
      ? "Sending Enquiry..."
      : "Submit Enquiry →"}
  </span>
</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ background: "#FAF8F5", padding: "70px 4.5vw", borderTop: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>FAQ</p>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0D2619" }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8DF",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1E251F",
                      cursor: "pointer",
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s ease",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 20px 16px", fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
