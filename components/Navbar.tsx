"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import SocialIcons from "./SocialIcons";
import Logo from "./Logo";

export const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "R&D", href: "/rnd" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="nav">
      <div className="nav-brand-group">
        <button
          className="menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Logo size="md" variant="light" />
      </div>

      <div className="navlinks">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={isActive(item.href) ? "active" : ""}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="nav-actions">
        <SocialIcons size="sm" />

        <Link href="/contact" className="button button-dark" style={{ padding: "8px 16px", fontSize: "13px" }}>
          Partner with us
          <ArrowRight size={15} />
        </Link>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={isActive(item.href) ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div style={{ display: "flex", justifyContent: "center", padding: "14px 0 8px" }}>
            <SocialIcons size="md" />
          </div>

          <div style={{ marginTop: "6px" }}>
            <Link
              href="/contact"
              className="button button-dark"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setMenuOpen(false)}
            >
              Partner with us
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
