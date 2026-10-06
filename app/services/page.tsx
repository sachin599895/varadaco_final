"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Factory,
  FileCheck,
  FlaskConical,
  Layers,
  Package,
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
  Pill,
  Microscope,
  Globe2
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PharmaRegulatoryCertificatesSection from "@/components/PharmaRegulatoryCertificatesSection";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const serviceList = [
  {
    id: "contract-manufacturing",
    number: "SERVICE 01",
    title: "Contract & Third-Party Manufacturing",
    stream: "Manufacturing Scale",
    desc: "Bring your product concept to life with professional manufacturing support. We work with businesses looking for manufacturing solutions across different health and wellness product formats.",
    formats: [
      "Capsules",
      "Tablets",
      "Powders",
      "Dietary Supplements",
      "Ayurvedic Products",
    ],
    ctaText: "Discuss Your Product →",
    ctaLink: "/contact?service=contract-manufacturing",
    image: "/images/pharma-cleanroom-bg.jpg",
    icon: Factory,
    badge: "WHO-GMP Standards",
  },
  {
    id: "product-development",
    number: "SERVICE 02",
    title: "Product Development & Formulation",
    stream: "R&D & Formulation",
    desc: "Have a product idea? Our product-development support helps you move from concept to formulation and ultimately toward commercial manufacturing.",
    formats: [
      "Custom Active Blends",
      "Bioavailability Enhancement",
      "Flavor & Taste Masking",
      "Pilot Batch Sampling",
      "Stability Assays",
    ],
    ctaText: "Start Product Development →",
    ctaLink: "/contact?service=product-development",
    image: "/images/unsplash/photo-1579165466741-7f35e4755660.jpg",
    icon: FlaskConical,
    badge: "Turnkey Formulation",
  },
  {
    id: "packaging-labelling",
    number: "SERVICE 03",
    title: "Packaging & Product Labelling",
    stream: "Packaging & Brand Identity",
    desc: "Give your product a professional market identity through customized packaging and product labelling support. From product presentation to packaging requirements, we help businesses prepare products for a professional market launch.",
    formats: [
      "Alu-Alu & Blister Packs",
      "HDPE & Glass Bottles",
      "Single-Serve Stick Packs",
      "Compliant Label Artwork",
      "Export Barcoding",
    ],
    ctaText: "Explore Packaging →",
    ctaLink: "/contact?service=packaging",
    image: "/images/unsplash/photo-1587854692152-cbe660dbde88.jpg",
    icon: Package,
    badge: "Market-Ready Presentation",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <Navbar />

      {/* Subpage Hero */}
      <section className="subpage-hero hero-centered">
        <div className="subpage-hero-bg">
          <img
            src="/images/unsplash/photo-1532187863486-abf9dbad1b69.jpg"
            alt="Pharmaceutical formulation laboratory and cleanroom manufacturing"
          />
        </div>

        <div className="subpage-hero-inner" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="breadcrumbs" style={{ justifyContent: "center" }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Our Services</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div
              className="hero-tag-pill"
              style={{
                backgroundColor: "rgba(124, 168, 50, 0.15)",
                borderColor: "rgba(124, 168, 50, 0.35)",
                color: "#7CA832",
                margin: "0 auto 14px",
              }}
            >
              <Layers size={14} />
              <span>05. Manufacturing Services</span>
            </div>

            <h1 style={{ maxWidth: "900px", textAlign: "center", margin: "0 auto" }}>
              Pharma &amp; Nutraceutical Manufacturing Services
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
              Complete support for businesses developing, manufacturing and launching health products.
            </p>

            <p
              className="hero-text"
              style={{
                maxWidth: "720px",
                fontSize: "16px",
                color: "#d1e8b0",
                margin: "16px auto 0",
                textAlign: "center",
                lineHeight: "1.7",
              }}
            >
              From product formulation and manufacturing to packaging, labelling and documentation support, Varadaco Industries helps businesses build products that are ready for the market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="services-container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        {serviceList.map((service, idx) => {
          const Icon = service.icon;
          const isEven = idx % 2 === 1;

          return (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`service-detail-card ${isEven ? "reverse" : ""}`}
            >
              <div className="service-detail-img">
                <img src={service.image} alt={service.title} />
                <div className="service-detail-badge">
                  <Icon size={16} color="#7CA832" />
                  <span>{service.badge}</span>
                </div>
              </div>

              <div className="service-detail-content">
                <span className="service-stream-tag">{service.number}</span>
                <h3>{service.title}</h3>
                <p className="service-desc">{service.desc}</p>

                <h4 className="service-deliverables-title">Supported Formats &amp; Deliverables:</h4>
                <div className="service-deliverables-grid">
                  {service.formats.map((feat) => (
                    <div key={feat} className="service-deliverable-item">
                      <CheckCircle2 size={17} color="#15803D" style={{ marginTop: "2px", flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <Link
                    href={service.ctaLink}
                    className="button button-dark"
                    style={{
                      background: "#15803D",
                      borderColor: "#15803D",
                      fontWeight: 800,
                      padding: "13px 24px",
                      fontSize: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>{service.ctaText}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Pharma Regulatory Certificates & Process Section (Image 2) */}
      <PharmaRegulatoryCertificatesSection />

      {/* Contact & Consultation Banner */}
      <section style={{ background: "#0D2619", color: "#FFFFFF", padding: "75px 4.5vw" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <p className="eyebrow light" style={{ justifyContent: "center" }}>06. Get in Touch</p>
          <h2 style={{ color: "#FFFFFF", fontSize: "clamp(2.2rem, 3.8vw, 3rem)", marginBottom: "14px" }}>
            Ready to Build Your Next Health Product?
          </h2>
          <p style={{ color: "#d1e8b0", fontSize: "16px", maxWidth: "700px", margin: "0 auto 28px", lineHeight: "1.6" }}>
            Connect with our formulation and manufacturing specialists to discuss your custom specifications and timeline.
          </p>
          <Link href="/contact" className="button button-light" style={{ background: "#7CA832", color: "#0D2619", fontWeight: 800, borderColor: "#7CA832" }}>
            Contact Our Specialists →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
