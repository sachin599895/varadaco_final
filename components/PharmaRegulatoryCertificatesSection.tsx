"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  Layers,
  Award,
  Crown,
  Check
} from "lucide-react";

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const processSteps = [
  {
    step: "1",
    title: "Consultation",
    desc: "Discuss your requirements",
  },
  {
    step: "2",
    title: "Documentation",
    desc: "We help prepare your documents",
  },
  {
    step: "3",
    title: "Application Support",
    desc: "Guidance through the process",
  },
  {
    step: "4",
    title: "Certificate Delivery",
    desc: "Receive your certificate (through our service)",
  },
];

const checklistItems = [
  "Documentation Support",
  "Compliance Guidance",
  "Application Assistance",
  "Professional Review",
  "Faster Processing Support",
];

export default function PharmaRegulatoryCertificatesSection() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #F8FAF7 0%, #FFFFFF 100%)",
        padding: "85px 4.5vw",
        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        position: "relative",
      }}
      id="regulatory-certificates"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
        
        {/* TOP HERO SHOWCASE BANNER (LIVE CODED LEFT + IMAGE RIGHT) */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fade}
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 14px 40px rgba(13, 38, 25, 0.08)",
            border: "1.5px solid #E2E8F0",
            background: "#F5F7F4",
            minHeight: "380px",
            display: "flex",
            alignItems: "center",
          }}
          className="pharma-regulatory-hero-container"
        >
          {/* RIGHT SIDE BACKGROUND IMAGE (CERTIFICATE + PLANT + BEAKERS + WAX SEAL) */}
          <img
            src="/images/pharma-regulatory-banner.png"
            alt="Pharma Regulatory Certificates Visual"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center right",
              zIndex: 0,
            }}
          />

          {/* LEFT BACKDROP GRADIENT MASK */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, #F4F6F3 0%, #F4F6F3 38%, rgba(244, 246, 243, 0.96) 43%, rgba(244, 246, 243, 0.6) 48%, rgba(244, 246, 243, 0) 54%)",
              zIndex: 1,
            }}
            className="pharma-regulatory-backdrop-mask"
          />

          {/* LIVE CODED LEFT CONTENT */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "clamp(24px, 3.8vw, 44px) clamp(24px, 4vw, 50px)",
              maxWidth: "520px",
              width: "100%",
            }}
            className="pharma-regulatory-content-left"
          >
            {/* BADGE */}
            <span
              style={{
                fontSize: "11.5px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#B45309",
                marginBottom: "10px",
                display: "inline-block",
              }}
            >
              OUR SERVICES
            </span>

            {/* HEADING */}
            <h2
              style={{
                fontSize: "clamp(1.75rem, 2.7vw, 2.45rem)",
                fontWeight: 900,
                color: "#0A1D37",
                lineHeight: 1.15,
                marginBottom: "12px",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-serif), Georgia, serif",
              }}
            >
              Pharma Regulatory<br />Certificates
            </h2>

            {/* SUBHEADING */}
            <p
              style={{
                fontSize: "14.5px",
                fontWeight: 700,
                color: "#0F172A",
                marginBottom: "12px",
                lineHeight: "1.4",
              }}
            >
              Professional Support. Verified Documentation.
            </p>

            {/* DESCRIPTION */}
            <p
              style={{
                fontSize: "13.2px",
                lineHeight: "1.65",
                color: "#475569",
                marginBottom: "24px",
                maxWidth: "470px",
                fontWeight: 500,
              }}
            >
              We provide end-to-end support for obtaining various pharma regulatory certificates through a professional, paid service. Our team helps you with documentation, compliance guidance and application support to make the process smoother and faster.
            </p>

            {/* ACTION BUTTONS */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/contact?inquiry=regulatory-certificate"
                style={{
                  background: "linear-gradient(180deg, #057A55 0%, #03543F 100%)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  padding: "11px 22px",
                  borderRadius: "100px",
                  boxShadow: "0 6px 18px rgba(4, 120, 87, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                  transition: "transform 0.18s ease, box-shadow 0.18s ease",
                }}
                className="hover-lift"
              >
                <span>Request Certificate</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/contact?inquiry=expert-consultation"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  padding: "4px 8px",
                  borderRadius: "10px",
                  transition: "background 0.2s ease",
                }}
                className="hover-subtle-bg"
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#FEF3C7",
                    border: "1.5px solid #FDE68A",
                    color: "#B45309",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Headphones size={17} />
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: "13px", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                    Talk to Our Experts
                  </strong>
                  <span style={{ display: "block", fontSize: "11.5px", color: "#64748B", fontWeight: 500, marginTop: "2px" }}>
                    Get a Free Consultation
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM ROW: PROCESS STEPS (LEFT) + SERVICE PACKAGES (RIGHT) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.7fr 1fr",
            gap: "24px",
          }}
          className="regulatory-process-grid"
        >
          {/* LEFT: OUR SERVICE PROCESS */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            variants={fade}
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1.5px solid #E4EAE2",
              padding: "28px 30px",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)",
            }}
          >
            <h3
              style={{
                fontSize: "17px",
                fontWeight: 800,
                color: "#0F291E",
                marginBottom: "20px",
              }}
            >
              Our Service Process
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
                alignItems: "flex-start",
                position: "relative",
              }}
              className="service-process-steps-grid"
            >
              {processSteps.map((stepItem, i) => (
                <div key={stepItem.step} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "10px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#15803D",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        fontSize: "13px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 3px 10px rgba(21, 128, 61, 0.3)",
                      }}
                    >
                      {stepItem.step}
                    </div>
                    {i < processSteps.length - 1 && (
                      <div
                        style={{
                          flex: 1,
                          height: "1.5px",
                          background: "#D1DCD0",
                          margin: "0 6px",
                        }}
                        className="process-connector-line"
                      />
                    )}
                  </div>
                  <strong style={{ fontSize: "13.5px", fontWeight: 800, color: "#0F291E", marginBottom: "4px", lineHeight: "1.3" }}>
                    {stepItem.title}
                  </strong>
                  <span style={{ fontSize: "11.5px", color: "#64748B", lineHeight: "1.4" }}>
                    {stepItem.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: SERVICE PACKAGES */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            variants={fade}
            style={{
              background: "#FBF9F4",
              borderRadius: "20px",
              border: "1.5px solid #EFE4CE",
              padding: "28px 28px",
              boxShadow: "0 6px 20px rgba(180, 83, 9, 0.04)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(180, 83, 9, 0.12)",
                    color: "#b45309",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Layers size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0F291E", margin: 0 }}>
                    Service Packages
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "#64748B", margin: "2px 0 0" }}>
                    Flexible packages for different certificate needs.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "12px" }}>
              <Link
                href="/contact?inquiry=service-packages"
                style={{
                  background: "linear-gradient(135deg, #b45309 0%, #92400e 100%)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  padding: "11px 20px",
                  borderRadius: "100px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  textDecoration: "none",
                  width: "100%",
                  boxShadow: "0 4px 14px rgba(180, 83, 9, 0.25)",
                }}
              >
                <span>Contact Us</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
