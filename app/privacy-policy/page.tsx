"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  EyeOff, 
  Server, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "overview",
      icon: ShieldCheck,
      title: "1. Institutional Commitment & Scope",
      content: `At Varadaco Industries ("Varadaco", "we", "our", or "us"), we operate pharmaceutical-grade cleanroom facilities, advanced nutraceutical contract manufacturing lines, and specialized clinical R&D laboratories. 

This Privacy Policy establishes our rigorous standards for safeguarding proprietary client formulations, institutional data, intellectual property (IP), and personal contact information submitted via our digital portals, formulation inquiry engines, and client communications.

We operate under strict compliance with global healthcare and scientific data benchmarks, including WHO-GMP Annex 1 data integrity requirements, US FDA 21 CFR Part 11 guidelines, EU General Data Protection Regulation (GDPR), and ISO/IEC 27001 data security standards.`
    },
    {
      id: "proprietary-formulations",
      icon: Lock,
      title: "2. Proprietary Formulation & IP Protection (Formula Vault)",
      content: `We understand that nutraceutical formulations, botanical extraction ratios (including standardized Ashwagandha withanolide fractions), dosage delivery architectures, and active ingredient specs represent sensitive commercial intellectual property.

• Mutual Non-Disclosure Assurance: All preliminary ingredient inquiries, dosage specifications, and bespoke custom blend inquiries are treated as confidential trade secrets under strict pre-execution Non-Disclosure Agreements (NDAs).
• Air-Gapped Recipe Isolation: Approved manufacturing batch records, master formula cards, and pilot-batch stability records are stored within cryptographically isolated, air-gapped laboratory databases.
• Restricted Cleanroom Access: Only designated analytical chemists and formulation engineers assigned to your specific batch are granted access to proprietary client batch parameters.`
    },
    {
      id: "information-collection",
      icon: FileText,
      title: "3. Information We Collect",
      content: `We collect minimal, strictly necessary data required to evaluate manufacturing feasibility, generate regulatory documentation, and execute contract production:

• Corporate & Contact Data: Legal corporate name, authorized representative name, business email address, direct phone number, and delivery destination country.
• Technical & Product Specifications: Desired dosage delivery format (e.g., softgel, vegetable capsule, liposomal liquid, effervescent), target potency, raw material certifications (e.g., Organic, Non-GMO, Halal, Kosher), packaging specifications, and intended distribution jurisdictions.
• Regulatory & Export Details: Import license permits, customs classification requirements, and targeted regional pharmacopeial standards.`
    },
    {
      id: "data-use",
      icon: Server,
      title: "4. How We Utilize Collected Information",
      content: `Institutional and contact data provided to Varadaco Industries is utilized exclusively for genuine commercial and regulatory operations:

1. Pilot Batch Feasibility & Cost Modeling: Calculating active ingredient overages, excipient compatibility, and pilot cleanroom run times.
2. Regulatory Dossier Preparation: Compiling Certificate of Analysis (CoA), stability test reports, Certificate of Free Sale (CFS), and technical product dossiers for submission to national authorities (US FDA, EU EFSA, FSSAI, TGA).
3. Quality Assurance & Traceability: Maintaining mandatory multi-year batch audit trails as mandated by international Good Manufacturing Practice (GMP) protocols.`
    },
    {
      id: "zero-commercial-sharing",
      icon: EyeOff,
      title: "5. Zero Third-Party Commercialization Guarantee",
      content: `Varadaco Industries does not sell, lease, rent, or monetize client or prospect data under any circumstances.

Data is shared only with:
• Certified Third-Party Testing Laboratories: Independent ISO 17025 accredited analytical laboratories for third-party heavy metal, microbial, and HPLC assay verification under binding confidentiality covenants.
• Official Regulatory Agencies: When explicitly requested and authorized by the client to substantiate regulatory clearances or product export certifications.
• Logistics & Cold-Chain Carriers: Shipping manifests required for pharmaceutical-grade freight transport and bonded customs clearance.`
    },
    {
      id: "cookies-telemetry",
      icon: CheckCircle2,
      title: "6. Cookies & Analytical Telemetry",
      content: `Our digital platform utilizes essential session cookies and privacy-centric telemetry to facilitate:
• Seamless multi-step product inquiry and custom formulation builder submissions.
• Cryptographic CSRF security verification to block automated scraping and unauthorized access.
• Aggregated performance analytics (strictly devoid of personally identifiable corporate espionage tracking).

You can modify or disable non-essential cookies at any time via your browser settings.`
    },
    {
      id: "client-rights",
      icon: FileText,
      title: "7. Client Rights & Data Retention",
      content: `You hold perpetual rights to review, rectify, or request the cryptographic erasure of your commercial contact information from our marketing and general inquiry databases. 

Note: Manufacturing batch records, analytical stability studies, and raw material traceability logs must be retained for the minimum statutory period mandated by pharmaceutical GMP regulations (typically 5 to 7 years following the batch expiration date).`
    },
  ];

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: "#1E251F" }}>
      <Navbar />

      {/* Hero Banner */}
      <section 
        style={{
          padding: "130px 5vw 60px",
          background: "linear-gradient(180deg, #F4F7F2 0%, #ffffff 100%)",
          borderBottom: "1px solid rgba(21, 128, 61, 0.12)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          
          {/* Back link */}
          <Link 
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 700,
              color: "#15803D",
              textDecoration: "none",
              marginBottom: "20px",
              padding: "6px 12px",
              borderRadius: "100px",
              background: "rgba(21, 128, 61, 0.08)",
              transition: "background 0.2s ease",
            }}
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <span 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11.5px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#15803D",
                background: "rgba(21, 128, 61, 0.1)",
                padding: "4px 10px",
                borderRadius: "6px",
              }}
            >
              <ShieldCheck size={14} /> Global Healthcare & Data Governance
            </span>
            <span style={{ fontSize: "12px", color: "#64748B", fontWeight: 500 }}>
              Effective Date: September 2026
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.15,
              color: "#1E251F",
              marginBottom: "16px",
            }}
          >
            Privacy Policy & <span style={{ color: "#15803D" }}>Confidentiality Covenant</span>
          </h1>

          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#475569",
              maxWidth: "760px",
              margin: 0,
            }}
          >
            Our institutional framework governing client proprietary formulations, intellectual property safeguarding, clinical data encryption, and regulatory compliance across our global manufacturing cleanroom suites.
          </p>

          {/* Quick Stat Pill Highlights */}
          <div 
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "28px",
            }}
          >
            {[
              "WHO-GMP Certified Data Integrity",
              "256-Bit Formulation NDA Vault",
              "Zero Third-Party Data Monetization",
              "ISO 27001 & GDPR Aligned",
            ].map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#1E251F",
                  background: "#ffffff",
                  padding: "6px 12px",
                  borderRadius: "100px",
                  border: "1px solid #E2E8DF",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
                }}
              >
                <CheckCircle2 size={13} color="#15803D" />
                {tag}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* Main Content Layout */}
      <section style={{ padding: "50px 5vw 80px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
          
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                style={{
                  background: "#FCFDFB",
                  border: "1px solid #E5ECE1",
                  borderRadius: "18px",
                  padding: "30px 32px",
                  boxShadow: "0 3px 12px rgba(0, 0, 0, 0.02)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(21, 128, 61, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#15803D",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h2
                    style={{
                      fontSize: "19px",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "#1E251F",
                      margin: 0,
                    }}
                  >
                    {section.title}
                  </h2>
                </div>

                <div
                  style={{
                    fontSize: "14.5px",
                    lineHeight: 1.75,
                    color: "#374151",
                    whiteSpace: "pre-line",
                  }}
                >
                  {section.content}
                </div>
              </motion.div>
            );
          })}

          {/* Contact / Data Protection Officer Card */}
          <div
            style={{
              background: "linear-gradient(135deg, #143B28 0%, #0D2619 100%)",
              borderRadius: "20px",
              padding: "36px 36px",
              color: "#ffffff",
              boxShadow: "0 16px 36px rgba(13, 38, 25, 0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <ShieldCheck size={26} color="#7CA832" />
              <h3 style={{ fontSize: "20px", fontWeight: 800, margin: 0, color: "#ffffff" }}>
                Data Protection & Compliance Office
              </h3>
            </div>

            <p style={{ fontSize: "14px", lineHeight: 1.65, color: "rgba(255, 255, 255, 0.85)", marginBottom: "22px", maxWidth: "680px" }}>
              For queries concerning proprietary formula handling, executing a mutual corporate Non-Disclosure Agreement (NDA), or requesting personal data audits, our compliance division is available directly:
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", fontSize: "13.5px" }}>
              <a 
                href="mailto:privacy@varadaco.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "background 0.2s ease",
                }}
              >
                <Mail size={15} color="#7CA832" /> privacy@varadaco.com
              </a>

              <a 
                href="tel:+18008459230"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "8px 16px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "background 0.2s ease",
                }}
              >
                <Phone size={15} color="#7CA832" /> +1 (800) 845-9230
              </a>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "rgba(255, 255, 255, 0.9)",
                  padding: "8px 0",
                }}
              >
                <MapPin size={15} color="#7CA832" /> Global Cleanroom & Innovation Hub
              </span>
            </div>

            <div style={{ marginTop: "24px" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "#15803D",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  padding: "10px 20px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(21, 128, 61, 0.4)",
                  transition: "all 0.2s ease",
                }}
              >
                Submit Formulation Inquiry Under NDA
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
