"use client";
import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { navItems } from "./Navbar";
import SocialIcons from "./SocialIcons";
import Logo from "./Logo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-main-row">
          
          {/* Column 1: Brand & Credentials */}
          <div className="footer-brand-col">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <Logo variant="white" size="sm" />
            </div>
            <p className="footer-tagline">
              Manufacturing and product-support solutions for Ayurvedic, nutraceutical and health &amp; wellness brands.
            </p>
            
            <div className="footer-badges" style={{ marginBottom: "18px" }}>
              <span>WHO-GMP</span>
              <span>ISO 22000</span>
              <span>Quality Assured</span>
            </div>

            <div>
              <span style={{ display: "block", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#ffffff", marginBottom: "8px" }}>
                Follow Us
              </span>
              <SocialIcons size="md" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links-col">
            <h5 className="footer-heading">Quick Links</h5>
            <div className="footer-nav-grid" style={{ gridTemplateColumns: "1fr" }}>
              <Link href="/about" className="footer-link">About Us</Link>
              <Link href="/products" className="footer-link">Products</Link>
              <Link href="/services" className="footer-link">Services</Link>
              <Link href="/rnd" className="footer-link">R&D</Link>
              <Link href="/contact" className="footer-link">Contact Us</Link>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="footer-links-col">
            <h5 className="footer-heading">Our Services</h5>
            <div className="footer-nav-grid" style={{ gridTemplateColumns: "1fr" }}>
              <Link href="/services#contract-manufacturing" className="footer-link">Contract Manufacturing</Link>
              <Link href="/services#product-development" className="footer-link">Product Development</Link>
              <Link href="/services#packaging-labelling" className="footer-link">Packaging &amp; Labelling</Link>
              <Link href="/services#regulatory-certificates" className="footer-link">Regulatory Certificates</Link>
            </div>
          </div>

          {/* Column 4: Contact & Final CTA */}
          <div className="footer-contact-col">
            <h5 className="footer-heading">Have a Product in Mind?</h5>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "14px", lineHeight: "1.5" }}>
              Let's turn your idea into a market-ready product.
            </p>
            <div className="footer-contact-list" style={{ marginBottom: "16px" }}>
              <a href="mailto:enquiry@varadacoindustries.com" className="footer-contact-item">
                <Mail size={14} /> enquiry@varadacoindustries.com
              </a>
              <a href="tel:+918588813593" className="footer-contact-item">
                <Phone size={14} /> +91 8588813593
              </a>
              <span className="footer-contact-item">
                <MapPin size={14} /> A2/57, 1st floor,Site 5, Kasna Industrial Area, Greater Noida, Uttar Pradesh -201308
              </span>
            </div>

            <div>
              <Link
                href="/contact"
                style={{
                  background: "#15803D",
                  color: "#ffffff",
                  padding: "9px 18px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(21, 128, 61, 0.35)",
                  transition: "transform 0.2s ease, background 0.2s ease",
                }}
              >
                Partner With Us
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom-bar">
          <span>© 2026 Varadaco Industries. All rights reserved.</span>
          <div className="footer-legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
          <button onClick={scrollToTop} className="footer-back-top" aria-label="Scroll to top">
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
