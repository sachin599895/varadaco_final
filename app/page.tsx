"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Atom,
  Award,
  Beaker,
  Check,
  ChevronRight,
  CircleGauge,
  FileCheck,
  FlaskConical,
  Globe2,
  HeartPulse,
  Leaf,
  Microscope,
  Package,
  PackageCheck,
  Pill,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Building2,
  Layers,
  FileText
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustSections from "@/components/TrustSections";
import TestimonialsSection from "@/components/TestimonialsSection";
import ComprehensiveSupportSection from "@/components/ComprehensiveSupportSection";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const whyVaradacoPillars = [
  {
    title: "Product Development",
    desc: "Transform your product idea into a practical, market-ready formulation.",
    icon: FlaskConical,
  },
  {
    title: "Manufacturing",
    desc: "Manufacturing support across capsule, tablet and powder product formats.",
    icon: Building2,
  },
  {
    title: "Packaging & Labelling",
    desc: "Professional packaging and customized product labelling for your brand.",
    icon: Package,
  },
  {
    title: "Business Support",
    desc: "Dedicated support from product development through commercial launch.",
    icon: ShieldCheck,
  },
];

const compliancePillars = [
  {
    title: "Documentation Support",
    desc: "Assistance with product documentation and regulatory compliance files.",
    icon: FileText,
  },
  {
    title: "Product Compliance Guidance",
    desc: "Comprehensive review of ingredients, limits, and labeling regulations.",
    icon: ShieldCheck,
  },
  {
    title: "Packaging & Label Review",
    desc: "Ensuring market-ready pack specifications and regulatory label compliance.",
    icon: Package,
  },
  {
    title: "Export Documentation",
    desc: "Guidance for domestic and international market entry and customs dossiers.",
    icon: Globe2,
  },
];

const solutions = [
  ["Ashwagandha", "Ancient Wisdom. Modern Wellness. Premium root extract standardized for adaptogenic support.", "/products/ashwagandha.jpg", Leaf],
  ["Shilajit", "Pure Himalayan Resin with >75% Fulvic Acid + 84 Ionic Trace Minerals for cellular energy.", "/products/shilajit.jpg", Sparkles],
  ["Mulethi", "Pure Licorice Root rich in Glycyrrhizin and Glabridin for respiratory & digestive vitality.", "/products/mulethi.jpg", HeartPulse],
  ["Supplements", "Complete Daily Multivitamin with Zinc, B-Complex & Vitamin D3/K2 for energy.", "/products/supplements.jpg", CircleGauge],
  ["Triphala", "Three Sacred Ayurvedic Fruits (Amalaki, Bibhitaki & Haritaki) for digestive harmony.", "/products/triphala.jpg", Pill],
  ["Brahmi", "Standardized Bacopa Monnieri with 20% Bacosides for memory, focus & mental clarity.", "/products/brahmi.jpg", Microscope],
  ["Karela Jamun", "Bitter Gourd & Indian Blackberry extract with active Charantin for glucose care.", "/products/karela.jpg", Leaf],
  ["Curcumin", "95% Standardized Curcuminoids with Piperine bio-enhancer for joint & cellular health.", "/products/curcumin.jpg", Sparkles],
];

const timelineSteps = [
  {
    step: "01",
    name: "Discover",
    desc: "Understand product idea, target customer & market requirement",
    image: "/images/unsplash/photo-1532094349884-543bc11b234d.jpg",
    badge: "01 • Discovery & Concept",
    alt: "Concept research and molecular botanical discovery",
  },
  {
    step: "02",
    name: "Develop & Sample",
    desc: "Work on formulation, product format and sample prototypes",
    image: "/images/unsplash/photo-1579165466741-7f35e4755660.jpg",
    badge: "02 • Formulation & Sampling",
    alt: "Formulation laboratory scientist testing bioavailable nutrition",
  },
  {
    step: "03",
    name: "Refine & Manufacture",
    desc: "Make required improvements & move toward commercial production",
    image: "/images/unsplash/photo-1581091226825-a6a2a5aee158.jpg",
    badge: "03 • Cleanroom Commercial Scaling",
    alt: "Automated high-speed pharmaceutical manufacturing",
  },
  {
    step: "04",
    name: "Package & Launch",
    desc: "Complete the product with suitable packaging and labelling",
    image: "/images/unsplash/photo-1587854692152-cbe660dbde88.jpg",
    badge: "04 • Shelf-Ready Packaging",
    alt: "Automated pharmaceutical bottle filling and packaging line",
  },
];

const portfolioItems = [
  {
    title: "Ayurvedic & Herbal Products",
    desc: "Classical and proprietary herbal wellness formulations and standardized extracts.",
    image: "/images/unsplash/photo-1615397349754-cfa2066a298e.jpg",
    href: "/products",
  },
  {
    title: "Nutraceutical Supplements",
    desc: "High-potency vitamin blends, minerals, and bio-available vitality complexes.",
    image: "/images/unsplash/photo-1584308666744-24d5c474f2ae.jpg",
    href: "/products",
  },
  {
    title: "Digestive & Gut Health",
    desc: "Triphala, prebiotics, digestive enzymes and gastrointestinal support.",
    image: "/images/unsplash/photo-1498837167922-ddd27525d352.jpg",
    href: "/products",
  },
  {
    title: "Women's Wellness",
    desc: "Targeted formulations for hormonal balance, bone density, and energy.",
    image: "/images/unsplash/photo-1543362906-acfc16c67564.jpg",
    href: "/products",
  },
  {
    title: "Men's Wellness",
    desc: "Stamina, vitality, and physical performance adaptogen formulations.",
    image: "/images/unsplash/photo-1534438327276-14e5300c3a48.jpg",
    href: "/products",
  },
  {
    title: "Immunity & Antioxidant Support",
    desc: "Curcumin, Vitamin C, Zinc and cellular defense botanical complexes.",
    image: "/images/unsplash/photo-1518531933037-91b2f5f229cc.jpg",
    href: "/products",
  },
  {
    title: "Weight Management",
    desc: "Metabolism boosters, garcinia extracts and clean nutritional powders.",
    image: "/images/unsplash/photo-1517836357463-d25dfeac3438.jpg",
    href: "/products",
  },
  {
    title: "Heart & Brain Wellness",
    desc: "Omega complexes, Brahmi, CoQ10 and cognitive clarity formulations.",
    image: "/images/unsplash/photo-1532094349884-543bc11b234d.jpg",
    href: "/products",
  },
];

const services = [
  {
    title: "CONTRACT MANUFACTURING",
    desc: "Bring your product concept to life with professional manufacturing across capsules, tablets, powders, dietary supplements & Ayurvedic products.",
    href: "/services",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 6L38 22L24 36L8 20L22 6Z" />
        <circle cx="18" cy="16" r="2.5" />
        <path d="M20 28C22 30 26 30 28 26C30 22 28 18 24 20" />
        <path d="M26 14C27 12 29 11 31 12" />
      </svg>
    ),
  },
  {
    title: "PRODUCT DEVELOPMENT",
    desc: "Move from concept to formulation and commercial production with our dedicated product development support.",
    href: "/services",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6H28V12H20V6Z" />
        <path d="M24 12V20" />
        <path d="M12 28H20V40H12V28Z" />
        <path d="M28 28H36V40H28V28Z" />
        <path d="M6 42H42" />
      </svg>
    ),
  },
  {
    title: "PACKAGING & LABELLING",
    desc: "Give your product a professional market identity with customized packaging, labeling, and presentation support.",
    href: "/services",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 16L24 8L38 16L24 24L10 16Z" />
        <path d="M10 16V34L24 42V24" />
        <path d="M38 16V34L24 42" />
        <path d="M16 12.5L30 20.5" />
      </svg>
    ),
  },
  {
    title: "REGULATORY & PHARMA SUPPORT",
    desc: "End-to-end support for obtaining regulatory certificates, compliance documentation, and verification.",
    href: "/services",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#15803D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M6 24H42" />
        <path d="M24 6C28 12 30 18 30 24C30 30 28 36 24 42" />
        <path d="M24 6C20 12 18 18 18 24C18 30 20 36 24 42" />
      </svg>
    ),
  },
];

const heroBackgrounds = [
  {
    src: "/images/pharma-ashwagandha-roots-composite.jpg",
    alt: "Pharma, Nutraceutical and Ayurvedic manufacturing environment",
    badge: "PHARMA • NUTRACEUTICAL • AYURVEDIC MANUFACTURING",
  },
  {
    src: "/images/pharma-ashwagandha-bg.jpg",
    alt: "Herbal actives and modern manufacturing processes",
    badge: "FROM CONCEPT TO MARKET-READY MANUFACTURING",
  },
  {
    src: "/images/pharma-cleanroom-bg.jpg",
    alt: "Cleanroom manufacturing and quality documentation",
    badge: "GREATER NOIDA • GLOBAL REACH",
  },
];

export default function Home() {
  const [currentHeroBg, setCurrentHeroBg] = useState(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentHeroBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 4500);
    return () => clearInterval(bgTimer);
  }, []);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setActiveTimelineStep((prev) => (prev + 1) % timelineSteps.length);
    }, 4000);
    return () => clearInterval(stepTimer);
  }, []);

  return (
    <main>
      <Navbar />

      {/* 01. HERO SECTION */}
      <section className="pharma-hero" id="top">
        <div className="pharma-hero-bg-slider">
          <AnimatePresence initial={false}>
            <motion.div
              key={heroBackgrounds[currentHeroBg].src}
              className="pharma-hero-bg-slide"
              style={{ backgroundImage: `url(${heroBackgrounds[currentHeroBg].src})` }}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        <div className="pharma-hero-top-banner">
          PHARMA • NUTRACEUTICAL • AYURVEDIC MANUFACTURING
        </div>

        <div className="pharma-hero-content">
          <motion.div
            className="pharma-hero-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="pharma-hero-card-accent" />

            <div className="pharma-hero-badge">
              <Sparkles size={12} className="pharma-hero-badge-icon" />
              <span>PHARMA • NUTRACEUTICAL • AYURVEDIC MANUFACTURING</span>
            </div>

            <h1 className="pharma-hero-title" style={{ fontSize: "clamp(2.1rem, 3.8vw, 3rem)" }}>
              From Product Concept to <br className="pharma-title-br" />Market-Ready Manufacturing
            </h1>

            <p className="pharma-hero-desc">
              Varadaco Industries provides manufacturing and product development solutions for pharmaceutical, nutraceutical and Ayurvedic brands. From formulation and product development to manufacturing, packaging and documentation support, we help businesses transform ideas into quality-focused health products.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "18px" }}>
              <Link href="/products" className="pharma-hero-btn">
                <span>Explore Our Products</span>
                <ArrowRight size={15} />
              </Link>
              <Link href="/contact" className="pharma-hero-btn" style={{ background: "rgba(21, 128, 61, 0.08)", border: "1.5px solid #15803D", color: "#15803D" }}>
                <span>Partner With Us</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Slider Dots */}
            <div className="pharma-hero-dots">
              {heroBackgrounds.map((bg, idx) => (
                <button
                  key={bg.src}
                  className={`pharma-hero-dot ${currentHeroBg === idx ? "active" : ""}`}
                  onClick={() => setCurrentHeroBg(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 01. WHY VARADACO SECTION */}
      <section className="section page-wrapper" id="why-varadaco" style={{ paddingTop: "75px", paddingBottom: "75px" }}>
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 48px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Why Varadaco</p>
          <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
            Your Trusted <em>Manufacturing Partner</em>
          </h2>
          <div className="trust-underline" />
          <p style={{ color: "#475569", fontSize: "16px", marginTop: "16px", lineHeight: "1.7" }}>
            Building a successful health product requires more than a formulation. It requires dependable manufacturing, product expertise, quality-focused processes and professional support at every stage.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {whyVaradacoPillars.map((pillar, idx) => {
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
                  borderRadius: "20px",
                  padding: "30px 24px",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: "rgba(21, 128, 61, 0.1)",
                    color: "#15803D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "18px",
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--ink)", marginBottom: "8px" }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", margin: 0 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 01. ASHWAGANDHA PROMOTIONAL BANNER */}
      <section className="home-ashwagandha-section">
        <div className="home-ashwagandha-card">
          {/* DESKTOP BACKGROUND IMAGE (FULL BANNER WITH BOTTLE, BADGE, HERBAL ELEMENTS) */}
          <img
            src="/images/varadaco-ashwagandha-hero-bg.png"
            alt="Varadaco Ashwagandha - Nature Meets Modern Wellness"
            className="home-ashwagandha-desktop-bg"
          />

          {/* DESKTOP GRADIENT BACKDROP FOR HIGH TEXT READABILITY */}
          <div className="home-ashwagandha-desktop-gradient" />

          {/* MOBILE VISUAL (PRODUCT BOTTLE + MEGA SALE BADGE + ROOTS & CAPSULES) */}
          <div className="home-ashwagandha-mobile-visual">
            <img
              src="/images/varadaco-ashwagandha-hero-mobile.png"
              alt="Varadaco Ashwagandha - Nature Meets Modern Wellness"
              className="home-ashwagandha-mobile-img"
            />
            <div className="home-ashwagandha-mobile-fade" />
          </div>

          {/* CONTENT (COPY & ACTION BUTTONS) */}
          <div className="home-ashwagandha-content">
            <div className="home-ashwagandha-badge">
              <Sparkles size={12} />
              <span>SPECIAL LAUNCH OFFER</span>
            </div>

            <h3 className="home-ashwagandha-title">
              Ashwagandha — Nature Meets Modern Wellness
            </h3>

            <p className="home-ashwagandha-desc">
              Discover carefully developed Ashwagandha products designed for today's wellness market. Choose Varadaco for quality-focused sourcing, formulation and manufacturing support.
            </p>

            <div className="home-ashwagandha-btn-group">
              <Link
                href="/products#ashwagandha"
                className="home-ashwagandha-btn home-ashwagandha-btn-primary"
              >
                Explore Ashwagandha →
              </Link>
              <Link
                href="/contact?inquiry=ashwagandha-bulk"
                className="home-ashwagandha-btn home-ashwagandha-btn-secondary"
              >
                Enquire for Bulk / Manufacturing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP & TIMELINE */}
      <section className="section partnership" id="about">
        <motion.div
          className="partnership-copy"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">About Varadaco Industries</p>
          <h2>Your brand.<br /><em>Our manufacturing.</em></h2>
          <p>
            Varadaco Industries is a health and wellness manufacturing company focused on developing and supplying Ayurvedic, nutraceutical and dietary supplement products based in Greater Noida, Uttar Pradesh.
          </p>
          <Link href="/contact" className="button button-dark" style={{ background: "#15803D", borderColor: "#15803D", fontWeight: 800, padding: "14px 28px", fontSize: "15px" }}>
            Start a partnership
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <div className="partnership-image-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={timelineSteps[activeTimelineStep].name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <img
                src={timelineSteps[activeTimelineStep].image}
                alt={timelineSteps[activeTimelineStep].alt}
              />
              <div className="partnership-image-badge">
                <ShieldCheck size={18} color="#7CA832" />
                <span>{timelineSteps[activeTimelineStep].badge}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="timeline">
          {timelineSteps.map((item, i) => {
            const isActive = activeTimelineStep === i;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className={isActive ? "active" : ""}
                onMouseEnter={() => setActiveTimelineStep(i)}
                onClick={() => setActiveTimelineStep(i)}
                style={{ cursor: "pointer" }}
              >
                <span>{item.step}</span>
                <div>
                  <b>{item.name}</b>
                  <small>{item.desc}</small>
                </div>
                <i />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section className="services-section" id="services">
        <div className="services-header">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <Link href="/services" style={{ textDecoration: "none", color: "inherit", display: "inline-block" }}>
              <h2 className="services-title">Our Services</h2>
              <div className="services-underline" />
            </Link>
          </motion.div>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => (
            <Link
              key={service.title}
              href={service.href}
              className="service-card"
            >
              <div className="service-corner-blob" />
              <div className="service-icon-box">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="service-read-more">
                Read More
                <ChevronRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 09. CERTIFICATION / COMPLIANCE SECTION ON HOME */}
      <section style={{ background: "#FAF8F5", padding: "85px 4.5vw", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }} id="compliance">
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 50px" }}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>09. Compliance &amp; Standards</p>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
              Quality. Documentation. <em>Compliance Support.</em>
            </h2>
            <div className="trust-underline" />
            <p style={{ color: "#475569", fontSize: "16px", marginTop: "16px", lineHeight: "1.7" }}>
              We help businesses navigate the documentation and preparation required for launching health, wellness and nutraceutical products, with support across product information, packaging, labelling and related regulatory requirements.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            {compliancePillars.map((pillar, idx) => {
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
                  <h3 style={{ fontSize: "17px", fontWeight: 800, color: "var(--ink)", marginBottom: "8px" }}>
                    {pillar.title}
                  </h3>
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
              Talk to Our Experts →
            </Link>
          </div>
        </div>
      </section>

      {/* 07. OUR PRODUCT PORTFOLIO ON HOME */}
      <section className="portfolio-section" id="portfolio">
        <div className="portfolio-header">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
            <h2 className="portfolio-title">OUR PRODUCT PORTFOLIO</h2>
            <div className="portfolio-underline" />
          </motion.div>
        </div>

        <div className="portfolio-grid">
          {portfolioItems.map((item, idx) => (
            <motion.a
              key={item.title}
              href="/products"
              className="portfolio-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.45 }}
              whileHover={{ y: -6 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="portfolio-card-bg"
              />
              <div className="portfolio-card-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section solutions" id="products">
        <div className="section-heading">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="eyebrow">Explore Our Products</p>
            <h2>Quality-Focused Products for<br /><em>Modern Health &amp; Wellness.</em></h2>
          </motion.div>
          <Link className="text-link" href="/products">
            View all products <ArrowRight size={16} />
          </Link>
        </div>
        <div className="solution-grid">
          {solutions.map(([title, desc, img, Icon], i) => (
            <motion.div
              key={String(title)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              variants={fade}
              whileHover={{ y: -5 }}
            >
              <Link href="/products" className="solution-card" style={{ display: "block", textDecoration: "none" }}>
                <div className="card-image">
                  <img src={img as string} alt={title as string} />
                </div>
                <div className="card-body">
                  <Icon size={21} />
                  <h3>{title as string}</h3>
                  <p>{desc as string}</p>
                  <span>Explore <ArrowRight size={15} /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GLOBAL REACH & EXPORT STANDARDS */}
      <section className="global" id="global">
        <div className="global-bg-grid" />
        <div className="global-glow-orb" />

        <motion.div
          className="global-copy"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow">GLOBAL REACH & EXPORT STANDARDS</p>
          <h2>Nutrition without<br /><em>borders.</em></h2>
          <p>
            Trusted by healthcare leaders and innovative nutraceutical brands
            worldwide. We formulate, manufacture, and clear global regulatory
            dossiers for seamless delivery to over 30+ international markets.
          </p>

          <div className="global-features-list">
            <div className="global-feature-item">
              <ShieldCheck size={18} color="#a3e635" />
              <span>Full Regulatory Dossier Support (FDA, EFSA, TGA, AYUSH)</span>
            </div>
            <div className="global-feature-item">
              <Globe2 size={18} color="#a3e635" />
              <span>Worldwide Cold-Chain Logistics & Maritime Freight</span>
            </div>
            <div className="global-feature-item">
              <Check size={18} color="#a3e635" />
              <span>100% Batch Traceability with Certified CoA & Lab Reports</span>
            </div>
          </div>

          <Link
            href="/contact"
            className="button button-dark"
            style={{
              background: "#15803D",
              borderColor: "#15803D",
              fontWeight: 800,
              padding: "14px 28px",
              fontSize: "15px",
              marginTop: "24px",
              display: "inline-flex",
            }}
          >
            Inquire About Global Export
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        <motion.div
          className="global-visual-container"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* 3D Photorealistic Illuminated Globe with Atmosphere */}
          <div className="globe-sphere-wrapper">
            <div className="globe-atmosphere-glow" />
            <img
              src="/images/unsplash/photo-1614730321146-b6fa6a46bcb4.jpg"
              alt="Global nutraceutical supply network"
              className="globe-image"
            />
            <div className="globe-inner-shadow" />

            {/* Glowing Hub Radar Markers */}
            <div className="global-hub-pin pin-us" title="North America: US FDA Registered">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">North America</span>
            </div>

            <div className="global-hub-pin pin-eu" title="Europe: EFSA Standard">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">Europe</span>
            </div>

            <div className="global-hub-pin pin-me" title="Middle East: GCC & Halal Hub">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">Middle East</span>
            </div>

            <div className="global-hub-pin pin-asia" title="Asia-Pacific: GMP Manufacturing">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">Asia-Pacific</span>
            </div>

            <div className="global-hub-pin pin-aus" title="Oceania: TGA Standards">
              <span className="radar-pulse" />
              <span className="hub-dot" />
              <span className="hub-label">Australia</span>
            </div>
          </div>

          {/* Floating Metric Badges */}
          <div className="global-stat-card stat-top-right anim-float">
            <b>30+</b>
            <small>Countries Served Worldwide</small>
          </div>

          <div className="global-stat-card stat-bottom-left anim-float-delay">
            <div className="stat-pill-row">
              <ShieldCheck size={16} color="#7CA832" />
              <span>100% Export Clearance</span>
            </div>
            <small>WHO-GMP • CoAs • Halal • Kosher</small>
          </div>
        </motion.div>
      </section>

      {/* TRUST & CERTIFICATIONS */}
      <TrustSections />

      {/* COMPREHENSIVE SUPPORT / OUR SERVICES */}
      <ComprehensiveSupportSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* FINAL CTA BANNER */}
      <section className="cta-banner-section">
        <motion.div
          className="cta-banner-card"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-banner-content">
            <span className="cta-banner-pill">Have a Product in Mind?</span>
            <h3 className="cta-banner-title">Let's turn your idea into a market-ready product.</h3>
            <p className="cta-banner-desc">From product formulation and manufacturing to packaging, labelling and documentation support.</p>
          </div>
          <div className="cta-banner-actions">
            <Link href="/contact" className="button button-dark" style={{ background: "#15803D", borderColor: "#15803D" }}>
              Partner With Us
              <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
