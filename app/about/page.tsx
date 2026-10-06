"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  Globe2,
  Layers,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  BookOpen,
  Briefcase,
  X
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClientsSection, CertificationsSection } from "@/components/TrustSections";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const leaders = [
  {
    name: "Mrs. Shaanzee K. Sarna",
    designation: "Co-Founder",
    image: "/images/avatar-placeholder.png",
    bio: "With a strong background in pharmaceutical sciences and natural wellness formulations, Mrs. Shaanzee K. Sarna drives our vision of delivering high-quality, science-backed solutions to global markets.",
    quote: "Science, nature and people united for a healthier world.",
  },
  {
    name: "Mr. Amit Singh",
    designation: "Co-Founder",
    image: "/images/avatar-placeholder.png",
    bio: "Supporting the company's business growth, operations, and regulatory strategy, Mr. Amit Singh leads Varadaco's long-term manufacturing excellence and international market development.",
    quote: "Innovation today for a healthier tomorrow.",
  },
];

const qualitySupportPillars = [
  {
    title: "Regulatory Documentation Support",
    desc: "Assistance with product documentation and regulatory requirements.",
    icon: FileCheck,
  },
  {
    title: "GMP / Quality Documentation Support",
    desc: "Guidance for businesses preparing manufacturing and quality documentation.",
    icon: ShieldCheck,
  },
  {
    title: "Product Documentation",
    desc: "Support with product specifications, packaging information and related documentation.",
    icon: BookOpen,
  },
  {
    title: "Export Documentation Support",
    desc: "Assistance for businesses preparing documentation for domestic and international markets.",
    icon: Globe2,
  },
];

export default function AboutPage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <main>
      <Navbar />

      {/* Subpage Hero */}
      <section className="subpage-hero hero-centered">
        <div className="subpage-hero-bg">
          <img
            src="/images/pharma-cleanroom-bg.jpg"
            alt="WHO-GMP cleanroom facility and manufacturing laboratory"
            style={{ objectPosition: "center 40%" }}
          />
        </div>

        <div className="subpage-hero-inner" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="breadcrumbs" style={{ justifyContent: "center" }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>About Us</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div className="hero-tag-pill" style={{ backgroundColor: "rgba(124, 168, 50, 0.15)", borderColor: "rgba(124, 168, 50, 0.35)", color: "#7CA832", margin: "0 auto 14px" }}>
              <Users size={14} />
              <span>02. About Varadaco Industries</span>
            </div>

            <h1 style={{ maxWidth: "880px", textAlign: "center", margin: "0 auto" }}>
              About Varadaco Industries
            </h1>

            <p className="hero-text" style={{ maxWidth: "680px", fontSize: "16px", color: "#d1e8b0", margin: "16px auto 0", textAlign: "center" }}>
              Health and wellness manufacturing company focused on developing and supplying Ayurvedic, nutraceutical and dietary supplement products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 02. MAIN SECTION: About Varadaco Industries */}
      <section className="page-wrapper" id="about-main" style={{ paddingTop: "80px", paddingBottom: "70px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "40px", alignItems: "center" }}>
          <div>
            <p className="eyebrow">02. Overview</p>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)", marginBottom: "20px" }}>
              About <em>Varadaco Industries</em>
            </h2>
            <p style={{ color: "#334155", fontSize: "16px", lineHeight: "1.8", marginBottom: "16px" }}>
              Varadaco Industries is a health and wellness manufacturing company focused on developing and supplying Ayurvedic, nutraceutical and dietary supplement products. Based in Greater Noida, Uttar Pradesh, we work with businesses looking for dependable product development, manufacturing, packaging and product-support solutions.
            </p>
            <p style={{ color: "#334155", fontSize: "15.5px", lineHeight: "1.8", marginBottom: "26px" }}>
              Our approach brings together product knowledge, manufacturing capabilities and customer-focused support to help brands move from an initial product idea to a finished market-ready product.
            </p>

            {/* 3 Highlights */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#F4F8F3", padding: "12px 18px", borderRadius: "12px", border: "1px solid #DDE8DA" }}>
                <CheckCircle2 size={20} color="#15803D" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#1E251F" }}>
                  Quality-Focused Manufacturing
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#F4F8F3", padding: "12px 18px", borderRadius: "12px", border: "1px solid #DDE8DA" }}>
                <CheckCircle2 size={20} color="#15803D" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#1E251F" }}>
                  Product Development Support
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#F4F8F3", padding: "12px 18px", borderRadius: "12px", border: "1px solid #DDE8DA" }}>
                <CheckCircle2 size={20} color="#15803D" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#1E251F" }}>
                  Domestic &amp; Export Opportunities
                </span>
              </div>
            </div>

            <div>
              <Link href="/contact" className="button button-dark" style={{ background: "#15803D", borderColor: "#15803D", fontWeight: 700, padding: "13px 26px" }}>
                Partner With Us
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", boxShadow: "0 16px 40px rgba(6, 36, 25, 0.12)" }}>
            <img
              src="/images/arranging_capsules.jpg"
              alt="Varadaco Manufacturing and Laboratory Operations"
              style={{ width: "100%", height: "480px", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", bottom: "24px", left: "24px", right: "24px", background: "rgba(6, 36, 25, 0.92)", color: "white", padding: "20px 24px", borderRadius: "16px", backdropFilter: "blur(10px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <MapPin size={18} color="#7CA832" />
                <strong style={{ fontSize: "15px" }}>Greater Noida, Uttar Pradesh</strong>
              </div>
              <p style={{ fontSize: "12.5px", color: "#d1e2f2", margin: 0, lineHeight: "1.5" }}>
                Formulation, cleanroom manufacturing, and documentation support for health and wellness brands worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02. VIDEO SECTION: See How We Work */}
      <section style={{ background: "#0D2619", color: "#FFFFFF", padding: "85px 4.5vw" }} id="video-section">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "35px", alignItems: "center" }}>
            <div>
              <p className="eyebrow light">02. Video Showcase</p>
              <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)", color: "#FFFFFF", marginBottom: "8px" }}>
                See How We Work
              </h2>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#7CA832", marginBottom: "16px" }}>
                From Concept to Finished Product
              </h3>
              <p style={{ color: "#d1e8b0", fontSize: "15.5px", lineHeight: "1.75", marginBottom: "28px" }}>
                Take a closer look at our approach to product development, manufacturing and customer support. Discover how we work with brands to turn health and wellness product ideas into market-ready solutions.
              </p>

              <button
                onClick={() => setVideoModalOpen(true)}
                className="button button-light"
                style={{
                  background: "#7CA832",
                  borderColor: "#7CA832",
                  color: "#0D2619",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <Play size={16} fill="#0D2619" />
                <span>Watch Our Story →</span>
              </button>
            </div>

            {/* Video Placeholder Box */}
            <div
              onClick={() => setVideoModalOpen(true)}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: "16 / 9",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
                border: "2px solid rgba(124, 168, 50, 0.3)",
              }}
            >
              <img
                src="/images/unsplash/photo-1581091226825-a6a2a5aee158.jpg"
                alt="Varadaco Manufacturing Process Video Thumbnail"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(13, 38, 25, 0.45)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    background: "#7CA832",
                    color: "#0D2619",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 30px rgba(124, 168, 50, 0.6)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <Play size={28} fill="#0D2619" style={{ marginLeft: "4px" }} />
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Watch Our Story (YouTube Video)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. DIRECTORS / LEADERSHIP SECTION (EXACT IMAGE 2 LAYOUT) */}
      <section className="page-wrapper" id="leadership" style={{ paddingTop: "90px", paddingBottom: "85px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          
          {/* HEADER: 2 Columns (Left: Eyebrow + Title + Subtitle, Right: Intro text) */}
          <div className="leadership-header-grid">
            <div>
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                style={{
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#b45309",
                  marginBottom: "10px",
                }}
              >
                OUR LEADERSHIP
              </motion.p>
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                variants={fade}
                style={{
                  fontSize: "clamp(2.2rem, 3.8vw, 3rem)",
                  fontWeight: 900,
                  color: "#0F291E",
                  lineHeight: 1.15,
                  marginBottom: "12px",
                  letterSpacing: "-0.02em",
                }}
              >
                Meet Our Directors
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: 0.14 }}
                variants={fade}
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#15803D",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                Guided by vision. Driven by science. Committed to a healthier tomorrow.
              </motion.p>
            </div>

            <div>
              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                variants={fade}
                style={{
                  fontSize: "15px",
                  lineHeight: "1.7",
                  color: "#475569",
                  margin: 0,
                }}
              >
                Our leadership team brings together decades of experience in pharmaceuticals, natural wellness and global healthcare, leading Varadaco towards innovation, quality and a better tomorrow for all.
              </motion.p>
            </div>
          </div>

          {/* TWO DIRECTOR CARDS (HORIZONTAL SPLIT ON DESKTOP, STACKED ON MOBILE) */}
          <div className="director-cards-grid">
            {leaders.map((leader, idx) => (
              <motion.div
                key={leader.name}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                variants={fade}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="director-card-split"
              >
                {/* LEFT/TOP: PHOTO PLACEHOLDER */}
                <div className="director-card-photo">
                  <div className="director-avatar-circle">
                    <img
                      src={leader.image}
                      alt={leader.name}
                    />
                  </div>
                </div>

                {/* RIGHT/BOTTOM: DETAILS & QUOTE */}
                <div className="director-card-details">
                  <div>
                    <h3 className="director-card-name">
                      {leader.name}
                    </h3>
                    <p className="director-card-designation">
                      {leader.designation}
                    </p>
                    <div className="director-card-accent-line" />
                    <p className="director-card-bio">
                      {leader.bio}
                    </p>
                  </div>

                  {/* QUOTE PILL */}
                  <div className="director-card-quote">
                    <p>
                      “{leader.quote}”
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. CERTIFICATIONS / QUALITY & REGULATORY SUPPORT */}
      <section
        style={{
          background: "#FAF8F5",
          padding: "85px 4.5vw",
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
        id="regulatory-support"
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 50px" }}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>04. Compliance &amp; Standards</p>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
              Quality &amp; Regulatory <em>Support</em>
            </h2>
            <div className="trust-underline" />
            <p style={{ color: "#475569", fontSize: "16px", marginTop: "16px", lineHeight: "1.7" }}>
              Building a health product requires more than a good formulation. Documentation, product information, packaging compliance and regulatory requirements all play an important role in bringing a product to market.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            {qualitySupportPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  className="card-panel"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  variants={fade}
                  style={{
                    background: "#FFFFFF",
                    border: "1.5px solid #E2E8DF",
                    borderRadius: "16px",
                    padding: "28px 24px",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)",
                  }}
                >
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
                      marginBottom: "16px",
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <h4 style={{ fontSize: "17px", fontWeight: 800, color: "var(--ink)", marginBottom: "8px" }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link
              href="/contact"
              className="button button-dark"
              style={{
                background: "#15803D",
                borderColor: "#15803D",
                fontWeight: 700,
                padding: "14px 30px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Discuss Your Requirements →
            </Link>
          </div>
        </div>
      </section>

      {/* Clients & Certifications Sections */}
      <ClientsSection />
      <CertificationsSection />

      {/* Video Modal (Popup) */}
      {videoModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "850px",
              background: "#000",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Varadaco Manufacturing Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
