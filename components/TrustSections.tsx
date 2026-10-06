"use client";
import { motion } from "framer-motion";

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export const clientLogos = [
  {
    name: "Meiji",
    component: (
      <span style={{ fontSize: "28px", fontWeight: 900, color: "#d91e18", fontFamily: "Helvetica, Arial, sans-serif", letterSpacing: "-0.04em" }}>
        meiji
      </span>
    ),
  },
  {
    name: "MedLife",
    component: (
      <div style={{ background: "#ff6a00", color: "#ffffff", padding: "8px 16px", borderRadius: "6px", display: "flex", alignItems: "center", gap: "8px", fontWeight: 900, fontSize: "17px", letterSpacing: "-0.02em" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ width: "12px", height: "3px", background: "white", borderRadius: "2px" }} />
          <span style={{ width: "8px", height: "3px", background: "white", borderRadius: "2px" }} />
        </div>
        <span>MED<br /><span style={{ fontSize: "13px", fontWeight: 700 }}>LIFE</span></span>
      </div>
    ),
  },
  {
    name: "Matris Curam",
    component: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", border: "2px solid #1a365d", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a365d", fontWeight: 900, fontSize: "12px", marginBottom: "4px" }}>
          MC
        </div>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#1a365d", fontStyle: "italic" }}>
          Matris Curam Pvt. Ltd.
        </span>
      </div>
    ),
  },
  {
    name: "Mankind",
    component: (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#0066b2", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "13px", fontStyle: "italic" }}>
          m
        </div>
        <span style={{ fontSize: "20px", fontWeight: 900, color: "#111827", letterSpacing: "-0.03em" }}>
          Mankind<span style={{ color: "#0066b2" }}>///</span>
        </span>
      </div>
    ),
  },
  {
    name: "Makers",
    component: (
      <div style={{ textAlign: "center" }}>
        <div style={{ height: "2px", background: "#111", width: "100%", marginBottom: "3px" }} />
        <span style={{ fontSize: "18px", fontWeight: 900, color: "#111", letterSpacing: "0.12em", fontStyle: "italic" }}>
          MAKERS
        </span>
        <div style={{ height: "2px", background: "#111", width: "100%", marginTop: "3px" }} />
      </div>
    ),
  },
  {
    name: "Macleods",
    component: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ fontSize: "19px", fontWeight: 900, color: "#e53e3e", letterSpacing: "0.06em" }}>
          MACLEODS
        </span>
        <div style={{ display: "flex", gap: "2px", marginTop: "3px" }}>
          {[...Array(12)].map((_, i) => (
            <span key={i} style={{ width: "3px", height: "7px", background: i % 2 === 0 ? "#e53e3e" : "#1a365d" }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "PharmEasy",
    component: (
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a786" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.5 20.5L3.5 13.5C2 12 2 9.5 3.5 8L8 3.5C9.5 2 12 2 13.5 3.5L20.5 10.5C22 12 22 14.5 20.5 16L16 20.5C14.5 22 12 22 10.5 20.5Z" />
          <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
        </svg>
        <span style={{ fontSize: "18px", fontWeight: 800, color: "#00a786", letterSpacing: "-0.02em" }}>
          PharmEasy
        </span>
      </div>
    ),
  },
  {
    name: "LivEasy",
    component: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", width: "18px", height: "18px" }}>
          <span style={{ background: "#111" }} />
          <span style={{ background: "#111" }} />
          <span style={{ background: "#111" }} />
          <span style={{ background: "#111" }} />
        </div>
        <span style={{ fontSize: "20px", fontWeight: 900, color: "#111", letterSpacing: "0.04em" }}>
          LIVEASY
        </span>
      </div>
    ),
  },
];

export const certLogos = [
  {
    name: "FSSC 22000",
    component: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: "2px solid #00875a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#00875a" }} />
        </div>
        <span style={{ fontSize: "15px", fontWeight: 800, color: "#00875a", letterSpacing: "0.02em" }}>
          FSSC 22000
        </span>
      </div>
    ),
  },
  {
    name: "Great Place To Work",
    component: (
      <div style={{ background: "#dc2626", color: "white", padding: "6px 12px", borderRadius: "4px", textAlign: "center", lineHeight: "1.1" }}>
        <div style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase" }}>Great Place</div>
        <div style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase" }}>To Work.</div>
        <div style={{ fontSize: "7px", fontWeight: 700, background: "#1e3a8a", padding: "2px 4px", borderRadius: "2px", marginTop: "3px" }}>CERTIFIED INDIA</div>
      </div>
    ),
  },
  {
    name: "URS GMP",
    component: (
      <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: "2.5px solid #1B3626", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "#1B3626", padding: "2px" }}>
        <span style={{ fontSize: "6px", fontWeight: 800, textTransform: "uppercase" }}>REGISTRAR</span>
        <span style={{ fontSize: "11px", fontWeight: 900 }}>URS</span>
        <span style={{ fontSize: "6px", fontWeight: 800 }}>GMP</span>
      </div>
    ),
  },
  {
    name: "AYUSH Premium",
    component: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: "42px", height: "42px", borderRadius: "50%", border: "2.5px dashed #b45309", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", color: "#92400e", fontWeight: 900, fontSize: "9px" }}>
          AYUSH
        </div>
        <div style={{ display: "flex", gap: "3px", marginTop: "-3px" }}>
          <span style={{ width: "6px", height: "10px", background: "#dc2626", transform: "rotate(-15deg)" }} />
          <span style={{ width: "6px", height: "10px", background: "#dc2626", transform: "rotate(15deg)" }} />
        </div>
      </div>
    ),
  },
  {
    name: "DSIR Recognized",
    component: (
      <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: "2px solid #b91c1c", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "#b91c1c", padding: "2px" }}>
        <span style={{ fontSize: "6px", fontWeight: 800 }}>DSIR</span>
        <span style={{ fontSize: "8px", fontWeight: 900 }}>RECOGNIZED</span>
        <span style={{ fontSize: "5px", fontWeight: 700 }}>GOVT. OF INDIA</span>
      </div>
    ),
  },
  {
    name: "D&B D-U-N-S",
    component: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#1e3a8a", color: "white", padding: "6px 10px", borderRadius: "6px", textAlign: "center" }}>
        <span style={{ fontSize: "14px", fontWeight: 900 }}>&amp;</span>
        <span style={{ fontSize: "7px", fontWeight: 800, letterSpacing: "0.05em" }}>D-U-N-S® REGISTERED</span>
      </div>
    ),
  },
  {
    name: "WHO-GMP",
    component: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#15803D", textAlign: "center" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <span style={{ fontSize: "11px", fontWeight: 900, marginTop: "2px" }}>WHO–GMP</span>
        <span style={{ fontSize: "7px", fontWeight: 700, color: "#64748b" }}>ISO 22000:2018</span>
      </div>
    ),
  },
  {
    name: "MOH Certified",
    component: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", color: "#334155" }}>
        <div style={{ width: "32px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: "#b45309", fontWeight: 900, fontSize: "15px" }}>
          🦅
        </div>
        <span style={{ fontSize: "8px", fontWeight: 700, color: "#1e293b", marginTop: "2px" }}>
          Ministry of Health
        </span>
        <span style={{ fontSize: "7px", color: "#64748b" }}>Global Approved</span>
      </div>
    ),
  },
];

export function ClientsSection() {
  const clientsMarquee = [...clientLogos, ...clientLogos, ...clientLogos];
  return (
    <section className="trust-section">
      <div className="trust-header">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
          <h2 className="trust-title">OUR VALUABLE CLIENTS</h2>
          <div className="trust-underline" />
        </motion.div>
      </div>

      <div className="marquee-container">
        <div className="marquee-track-left">
          {clientsMarquee.map((client, idx) => (
            <div key={`client-${idx}`} className="trust-card">
              {client.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificationsSection() {
  const certsMarquee = [...certLogos, ...certLogos, ...certLogos];
  return (
    <section className="trust-section alt-bg">
      <div className="trust-header">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
          <h2 className="trust-title">CERTIFICATIONS</h2>
          <div className="trust-underline" />
        </motion.div>
      </div>

      <div className="marquee-container">
        <div className="marquee-track-right">
          {certsMarquee.map((cert, idx) => (
            <div key={`cert-${idx}`} className="trust-card">
              {cert.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TrustSections() {
  return (
    <>
      <ClientsSection />
      <CertificationsSection />
    </>
  );
}
