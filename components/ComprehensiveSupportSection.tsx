"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FileCheck, Globe, FlaskConical, Cog, ArrowRight } from "lucide-react";

const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const supportServices = [
  {
    title: "Regulatory Support Services",
    desc: "Documentation, compliance and application support.",
    href: "/services#regulatory-support",
    cta: "Learn More",
    icon: FileCheck,
  },
  {
    title: "Packaging & Labelling",
    desc: "Customized packaging design, compliance and presentation.",
    href: "/services#packaging-labelling",
    cta: "Learn More",
    icon: Globe,
  },
  {
    title: "Product Development",
    desc: "Formulation and R&D support.",
    href: "/services#product-development",
    cta: "Learn More",
    icon: FlaskConical,
  },
  {
    title: "Contract Manufacturing",
    desc: "High-quality, scalable production.",
    href: "/services#contract-manufacturing",
    cta: "Learn More",
    icon: Cog,
  },
];

export default function ComprehensiveSupportSection() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)",
        padding: "85px 4.5vw",
        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        position: "relative",
      }}
      id="comprehensive-support"
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        
        {/* HEADER (FROM IMAGE 2) */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 48px" }}>
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
              marginBottom: "12px",
              display: "inline-block",
            }}
          >
            OUR SERVICES
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            variants={fade}
            style={{
              fontSize: "clamp(2rem, 3.6vw, 2.85rem)",
              fontWeight: 900,
              color: "#0F291E",
              lineHeight: 1.2,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Comprehensive Support for Your Growth
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            variants={fade}
            style={{
              fontSize: "16px",
              lineHeight: "1.68",
              color: "#475569",
              margin: "0 auto",
              maxWidth: "680px",
            }}
          >
            From regulatory approvals to product development, we provide end-to-end solutions for the pharmaceutical and nutraceutical industry.
          </motion.p>
        </div>

        {/* 4 UNIFORM CARDS GRID (ALL CARDS SAME DESIGN & FULLY CLICKABLE TO SERVICES) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {supportServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                variants={fade}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{ height: "100%" }}
              >
                <Link
                  href={service.href}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    padding: "34px 28px 30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    boxShadow: "0 6px 24px rgba(0, 0, 0, 0.04)",
                    border: "1.5px solid #EAEFE7",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  className="support-service-card"
                >
                  <div>
                    {/* ICON */}
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "16px",
                        background: "rgba(21, 128, 61, 0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "24px",
                        color: "#15803D",
                        transition: "background 0.2s ease, transform 0.2s ease",
                      }}
                    >
                      <Icon size={32} strokeWidth={1.8} />
                    </div>

                    {/* TITLE */}
                    <h3
                      style={{
                        fontSize: "19px",
                        fontWeight: 800,
                        color: "#0F291E",
                        marginBottom: "12px",
                        lineHeight: "1.3",
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.65",
                        color: "#52655A",
                        marginBottom: "26px",
                      }}
                    >
                      {service.desc}
                    </p>
                  </div>

                  {/* CTA LINK */}
                  <div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#15803D",
                        borderBottom: "1.5px solid #b45309",
                        paddingBottom: "2px",
                      }}
                    >
                      <span>{service.cta}</span>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
