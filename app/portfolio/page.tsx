"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  HeartPulse,
  Leaf,
  Microscope,
  Pill,
  Sparkles,
  Zap,
  Package,
  Clock,
  Boxes,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const categories = [
  {
    id: "ayurvedic-herbal",
    title: "Ayurvedic & Herbal Products",
    shortDesc: "Classical and proprietary herbal wellness formulations and standardized extracts.",
    image: "/images/unsplash/photo-1615397349754-cfa2066a298e.jpg",
    formats: "Capsule / Tablet / Powder",
    keyIngredients: "Ashwagandha, Shilajit, Mulethi, Triphala, Brahmi",
    packSize: "60 Capsules / 100g / 500g Bulk",
    shelfLife: "24 - 36 Months",
    moq: "500 - 5,000 Units",
    packaging: "HDPE Bottles, Alu-Alu Blisters, Pouches",
    icon: Leaf,
  },
  {
    id: "nutraceutical-supplements",
    title: "Nutraceutical Supplements",
    shortDesc: "High-potency vitamin blends, active minerals, and bioavailable vitality complexes.",
    image: "/images/unsplash/photo-1584308666744-24d5c474f2ae.jpg",
    formats: "Capsule / Tablet / Powder",
    keyIngredients: "Multivitamins, Minerals, Amino Acids, Bioactive Peptides",
    packSize: "30 / 60 / 90 Count, 250g Powders",
    shelfLife: "24 Months",
    moq: "1,000 Units",
    packaging: "Bottles with Induction Seal, Blisters",
    icon: Sparkles,
  },
  {
    id: "digestive-gut-health",
    title: "Digestive & Gut Health",
    shortDesc: "Triphala, prebiotics, digestive enzymes and gastrointestinal vitality.",
    image: "/images/unsplash/photo-1498837167922-ddd27525d352.jpg",
    formats: "Capsule / Tablet / Powder",
    keyIngredients: "Triphala, Isabgol, Probiotic Blends, Digestive Enzymes",
    packSize: "60 Capsules / 120g Powder Jars",
    shelfLife: "24 Months",
    moq: "500 Units",
    packaging: "Moisture-Barrier Jars, Blister Packs",
    icon: Pill,
  },
  {
    id: "womens-wellness",
    title: "Women's Wellness",
    shortDesc: "Targeted formulations for hormonal balance, bone density, and vitality.",
    image: "/images/unsplash/photo-1543362906-acfc16c67564.jpg",
    formats: "Capsule / Tablet / Powder",
    keyIngredients: "Shatavari, Iron + Folic Acid, Calcium D3, Myo-Inositol",
    packSize: "60 Count Bottles / Single Stick Packs",
    shelfLife: "24 Months",
    moq: "1,000 Units",
    packaging: "Custom Brand Cartons, Amber Glass, Blisters",
    icon: HeartPulse,
  },
  {
    id: "mens-wellness",
    title: "Men's Wellness",
    shortDesc: "Stamina, vitality, and physical performance adaptogen formulations.",
    image: "/images/unsplash/photo-1534438327276-14e5300c3a48.jpg",
    formats: "Capsule / Tablet / Powder",
    keyIngredients: "Shilajit, Gokshura, Safed Musli, Zinc Monomethionine",
    packSize: "60 Capsules / 100g Resin/Powder",
    shelfLife: "24 - 36 Months",
    moq: "500 Units",
    packaging: "Luxury Glass Jars, Alu-Alu Blisters",
    icon: Zap,
  },
  {
    id: "immunity-antioxidants",
    title: "Immunity & Antioxidant Support",
    shortDesc: "Curcumin, Vitamin C, Zinc and cellular defense botanical complexes.",
    image: "/images/unsplash/photo-1518531933037-91b2f5f229cc.jpg",
    formats: "Capsule / Tablet / Powder",
    keyIngredients: "95% Standardized Curcuminoids, Piperine, Amla Extract, Zinc",
    packSize: "60 Count / Effervescent 20 Tubes",
    shelfLife: "24 Months",
    moq: "1,000 Units",
    packaging: "Effervescent Tubes, Blisters, HDPE Bottles",
    icon: ShieldCheck,
  },
  {
    id: "weight-management",
    title: "Weight Management",
    shortDesc: "Metabolism boosters, garcinia extracts and clean nutritional powders.",
    image: "/images/unsplash/photo-1517836357463-d25dfeac3438.jpg",
    formats: "Capsule / Tablet / Powder",
    keyIngredients: "Garcinia Cambogia, Green Tea EGCG, CLA, Plant Proteins",
    packSize: "60 Capsules / 500g Powders",
    shelfLife: "24 Months",
    moq: "500 Units",
    packaging: "Wide-Mouth Tubs, Zip Pouches",
    icon: CircleGauge,
  },
  {
    id: "heart-brain-wellness",
    title: "Heart & Brain Wellness",
    shortDesc: "Omega complexes, Brahmi, CoQ10 and cognitive clarity formulations.",
    image: "/images/unsplash/photo-1532094349884-543bc11b234d.jpg",
    formats: "Capsule / Tablet / Powder",
    keyIngredients: "Brahmi (Bacopa 20%), Shankhpushpi, CoQ10, Flaxseed Omega",
    packSize: "60 Softgels / Capsules",
    shelfLife: "24 Months",
    moq: "1,000 Units",
    packaging: "Blister Packs, Amber Glass Bottles",
    icon: Microscope,
  },
];

export default function PortfolioPage() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="subpage-hero hero-centered">
        <div className="subpage-hero-bg">
          <img
            src="/images/unsplash/photo-1512069772995-ec65ed45afd6.jpg"
            alt="Botanical herbs and nutraceutical ingredients"
          />
        </div>

        <div className="subpage-hero-inner" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="breadcrumbs" style={{ justifyContent: "center" }}>
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Our Product Portfolio</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="hero-tag-pill" style={{ backgroundColor: "rgba(124, 168, 50, 0.15)", borderColor: "rgba(124, 168, 50, 0.35)", color: "#7CA832", margin: "0 auto 14px" }}>
              <Sparkles size={14} />
              <span>07. Product Portfolio</span>
            </div>

            <h1 style={{ maxWidth: "880px", textAlign: "center", margin: "0 auto" }}>
              Our Product Portfolio
            </h1>

            <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 600, color: "#7CA832", marginTop: "12px" }}>
              Quality-Focused Products for Modern Health &amp; Wellness
            </p>

            <p className="hero-text" style={{ maxWidth: "680px", fontSize: "16px", color: "#d1e8b0", margin: "16px auto 0", textAlign: "center", lineHeight: "1.7" }}>
              Explore our range of Ayurvedic, nutraceutical and dietary supplement products, developed for modern wellness requirements and supported by professional product and manufacturing capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCT — ASHWAGANDHA (Docx Section 07) */}
      <section style={{ padding: "80px 4.5vw 40px" }}>
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            background: "linear-gradient(135deg, #0D2619 0%, #153E2A 100%)",
            borderRadius: "24px",
            padding: "45px 40px",
            color: "#FFFFFF",
            boxShadow: "0 18px 45px rgba(13, 38, 25, 0.18)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "35px",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(124, 168, 50, 0.2)",
                border: "1px solid rgba(124, 168, 50, 0.4)",
                padding: "5px 14px",
                borderRadius: "100px",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#7CA832",
                marginBottom: "14px",
              }}
            >
              <span>FEATURED PRODUCT • AYURVEDIC / HERBAL WELLNESS</span>
            </div>

            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, marginBottom: "8px", color: "#FFFFFF" }}>
              Ashwagandha
            </h2>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#7CA832", marginBottom: "14px" }}>
              Ancient Wisdom. Modern Wellness.
            </h3>

            <p style={{ color: "#d1e8b0", fontSize: "15px", lineHeight: "1.7", marginBottom: "24px" }}>
              A premium Ashwagandha product positioned for modern wellness brands and consumers. Use this product section to present the product format, key ingredients, packaging options and enquiry details.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link
                href="/products#ashwagandha"
                className="button button-light"
                style={{ background: "#7CA832", borderColor: "#7CA832", color: "#0D2619", fontWeight: 800 }}
              >
                View Ashwagandha →
              </Link>
              <Link
                href="/contact?inquiry=ashwagandha-bulk"
                className="button button-dark"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                Enquire for Bulk / Manufacturing →
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/products/ashwagandha.jpg"
              alt="Ashwagandha Featured Product"
              style={{ width: "100%", maxWidth: "380px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
            />
          </div>
        </div>
      </section>

      {/* Portfolio Grid with All 8 Categories & Product Card Fields */}
      <section className="page-wrapper" style={{ paddingTop: "50px", paddingBottom: "80px" }}>
        <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 50px" }}>
          <p className="eyebrow" style={{ justifyContent: "center" }}>Product Categories</p>
          <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3rem)" }}>
            8 Specialized <em>Categories</em>
          </h2>
          <div className="trust-underline" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                className="card-panel"
                style={{ padding: "0", display: "flex", flexDirection: "column", overflow: "hidden", borderRadius: "20px", border: "1.5px solid #E2E8DF" }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                variants={fade}
              >
                <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                  <img src={cat.image} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      background: "rgba(13, 38, 25, 0.9)",
                      color: "#FFFFFF",
                      padding: "6px 14px",
                      borderRadius: "100px",
                      fontSize: "12px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      backdropFilter: "blur(6px)",
                    }}
                  >
                    <Icon size={14} color="#7CA832" />
                    <span>{cat.title}</span>
                  </div>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--ink)", marginBottom: "6px" }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: "1.6", marginBottom: "16px" }}>
                    {cat.shortDesc}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px", color: "#334155", marginBottom: "20px", background: "#F8FAF8", padding: "14px", borderRadius: "12px", border: "1px solid #E5EFE2" }}>
                    <div><strong>Product Form:</strong> {cat.formats}</div>
                    <div><strong>Key Ingredients:</strong> {cat.keyIngredients}</div>
                    <div><strong>Pack Size:</strong> {cat.packSize}</div>
                    <div><strong>Shelf Life:</strong> {cat.shelfLife}</div>
                    <div><strong>MOQ:</strong> {cat.moq}</div>
                    <div><strong>Packaging Options:</strong> {cat.packaging}</div>
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                    <Link
                      href="/products"
                      className="button button-dark"
                      style={{ flex: 1, justifyContent: "center", fontSize: "13px", padding: "10px 16px", background: "#15803D", borderColor: "#15803D" }}
                    >
                      View Product →
                    </Link>
                    <Link
                      href={`/contact?category=${cat.id}`}
                      className="button button-light"
                      style={{ fontSize: "13px", padding: "10px 16px" }}
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
