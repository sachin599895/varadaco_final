"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Beaker,
  CheckCircle2,
  ChevronRight,
  Compass,
  Dna,
  Factory,
  FlaskConical,
  Gauge,
  Microscope,
  Package,
  ShieldCheck,
  Sparkles,
  TestTubes,
  ArrowRight,
  Lightbulb,
  CheckSquare
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const rndProcessSteps = [
  {
    step: "01",
    title: "DISCOVER",
    desc: "Understand the product idea, target customer and market requirement.",
    icon: Lightbulb,
    badge: "Idea & Market Research",
  },
  {
    step: "02",
    title: "DEVELOP",
    desc: "Work on the formulation and desired product format.",
    icon: FlaskConical,
    badge: "Formulation Science",
  },
  {
    step: "03",
    title: "SAMPLE",
    desc: "Develop samples for evaluation and feedback.",
    icon: Beaker,
    badge: "Prototype Testing",
  },
  {
    step: "04",
    title: "REFINE",
    desc: "Make required improvements based on product requirements.",
    icon: Microscope,
    badge: "Optimization & Stability",
  },
  {
    step: "05",
    title: "MANUFACTURE",
    desc: "Move the approved concept toward commercial production.",
    icon: Factory,
    badge: "Cleanroom Scaling",
  },
  {
    step: "06",
    title: "PACKAGE",
    desc: "Complete the product with suitable packaging and labelling.",
    icon: Package,
    badge: "Shelf-Ready Launch",
  },
];

const labEquipment = [
  {
    title: "HPLC & UHPLC-MS/MS",
    desc: "Ultra-high performance liquid chromatography with tandem mass spectrometry for accurate bioactive quantification and contaminant screening.",
    icon: Gauge,
    tag: "Assay Accuracy",
    badge: "0.01 PPM Sensitivity",
    theme: "teal",
  },
  {
    title: "USP Automated Dissolution Testers",
    desc: "Multi-vessel real-time spectrophotometric dissolution testing to ensure targeted enteric release within narrow GI transit windows.",
    icon: Beaker,
    tag: "Dissolution Kinetics",
    badge: "USP Apparatus I & II",
    theme: "blue",
  },
  {
    title: "Particle Size & Zeta Potential Analyzers",
    desc: "Laser diffraction nano-sizing down to 20nm for colloidal emulsions and liposomal suspension stability verification.",
    icon: Dna,
    tag: "Nano-Colloidal",
    badge: "Down to 20nm Sizing",
    theme: "purple",
  },
  {
    title: "Accelerated ICH Stability Chambers",
    desc: "Automated climate-controlled chambers operating at 40°C / 75% RH for stability forecasting and shelf-life certification.",
    icon: ShieldCheck,
    tag: "Shelf-Life Testing",
    badge: "Zone IVb (40°C / 75% RH)",
    theme: "emerald",
  },
];

export default function RndPage() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="subpage-hero hero-centered">
        <div className="subpage-hero-bg">
          <img
            src="/images/unsplash/photo-1579165466741-7f35e4755660.jpg"
            alt="Biomedical laboratory research and analytical science"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        <div className="subpage-hero-inner" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="breadcrumbs" style={{ justifyContent: "center" }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>R&amp;D</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div className="hero-tag-pill" style={{ backgroundColor: "rgba(124, 168, 50, 0.15)", borderColor: "rgba(124, 168, 50, 0.35)", color: "#7CA832", margin: "0 auto 14px" }}>
              <Microscope size={14} />
              <span>08. Research &amp; Product Development</span>
            </div>

            <h1 style={{ maxWidth: "880px", textAlign: "center", margin: "0 auto" }}>
              Research &amp; Product Development
            </h1>

            <p
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                fontWeight: 600,
                color: "#7CA832",
                marginTop: "12px",
                maxWidth: "750px",
              }}
            >
              Turning Ideas Into Market-Ready Health Products
            </p>

            <p className="hero-text" style={{ maxWidth: "680px", fontSize: "16px", color: "#d1e8b0", margin: "16px auto 0", textAlign: "center", lineHeight: "1.7" }}>
              Product innovation begins with understanding the right ingredients, product format and market requirement. Our product-development approach helps businesses move systematically from an initial concept toward a finished product.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6-Step R&D Process (Docx Section 08) */}
      <section className="page-wrapper" style={{ paddingTop: "85px", paddingBottom: "80px" }}>
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 55px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>08. Step-by-Step Methodology</p>
          <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
            R&amp;D <em>PROCESS</em>
          </h2>
          <div className="trust-underline" />
          <p style={{ color: "#475569", fontSize: "16px", marginTop: "16px", lineHeight: "1.6" }}>
            A disciplined, stage-by-stage development lifecycle to transform your initial concept into a compliant, shelf-ready formulation.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            marginBottom: "45px",
          }}
        >
          {rndProcessSteps.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.step}
                className="card-panel"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                variants={fade}
                style={{
                  borderRadius: "20px",
                  padding: "30px 24px",
                  border: "1.5px solid #E2E8DF",
                  background: "#FFFFFF",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(21, 128, 61, 0.1)",
                      color: "#15803D",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 900,
                      color: "#CBD5E1",
                      fontFamily: "monospace",
                    }}
                  >
                    {p.step}
                  </span>
                </div>

                <div style={{ marginBottom: "6px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#7CA832",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.badge}
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--ink)", marginTop: "2px" }}>
                    {p.step} — {p.title}
                  </h3>
                </div>

                <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: "1.65", margin: 0, marginTop: "auto" }}>
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/contact?service=rnd"
            className="button button-dark"
            style={{
              background: "#15803D",
              borderColor: "#15803D",
              fontWeight: 800,
              padding: "14px 32px",
              fontSize: "15px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Discuss Your R&amp;D Requirement →
          </Link>
        </div>
      </section>

      {/* Laboratory Infrastructure */}
      <section style={{ background: "#FAF8F5", padding: "85px 4.5vw", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 50px" }}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>Instrumentation &amp; Rigor</p>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
              Analytical testing <em>infrastructure.</em>
            </h2>
          </div>

          <div className="rnd-equip-grid">
            {labEquipment.map((eq, i) => {
              const Icon = eq.icon;
              return (
                <motion.div
                  key={eq.title}
                  className={`rnd-equip-card rnd-equip-${eq.theme}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <div className="rnd-equip-accent" />
                  <div className="rnd-equip-header">
                    <div className="rnd-equip-icon-box">
                      <Icon size={22} />
                    </div>
                    <span className="rnd-equip-tag">{eq.tag}</span>
                  </div>
                  <h4 className="rnd-equip-title">{eq.title}</h4>
                  <p className="rnd-equip-desc">{eq.desc}</p>
                  <div className="rnd-equip-badge">
                    <span className="rnd-equip-badge-dot" />
                    <span>{eq.badge}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
