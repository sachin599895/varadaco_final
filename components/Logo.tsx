"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  height?: number;
  variant?: "light" | "dark" | "auto" | "white";
  type?: "full" | "mark";
  showSubtitle?: boolean;
  clickable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export function LogoIcon({
  size = 46,
  variant = "auto",
  className = "",
  style = {},
}: {
  size?: number;
  variant?: "light" | "dark" | "auto" | "white";
  className?: string;
  style?: React.CSSProperties;
}) {
  const isDark = variant === "dark" || variant === "white";
  const markSrc = isDark ? "/images/varadaco-mark-white.png" : "/images/varadaco-mark.png";
  const width = Math.round(size * 1.11);

  return (
    <span
      className={`varadaco-logo-icon-wrapper ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        ...style,
      }}
    >
      <Image
        src={markSrc}
        alt="Varadaco Logo Mark"
        width={width}
        height={size}
        style={{ objectFit: "contain", height: `${size}px`, width: "auto" }}
        priority
        unoptimized
      />
    </span>
  );
}

export default function Logo({
  size = "md",
  height,
  variant = "auto",
  type = "full",
  showSubtitle = true,
  clickable = true,
  className = "",
  style = {},
  priority = true,
}: LogoProps) {
  const isDark = variant === "dark" || variant === "white";

  // Aspect ratio is ~2.94:1
  const heightMap = {
    sm: 46,
    md: 62,
    lg: 76,
    xl: 90,
  };

  const currentHeight = height || heightMap[size] || 62;
  const currentWidth = Math.round(currentHeight * 2.94);

  const logoSrc = isDark ? "/images/varadaco-logo-white.png" : "/images/varadaco-logo.png";
  const markSrc = isDark ? "/images/varadaco-mark-white.png" : "/images/varadaco-mark.png";

  const content = (
    <div
      className={`varadaco-brand-logo ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        textDecoration: "none",
        cursor: clickable ? "pointer" : "default",
        userSelect: "none",
        ...style,
      }}
    >
      {type === "mark" ? (
        <Image
          src={markSrc}
          alt="Varadaco"
          width={Math.round(currentHeight * 1.11)}
          height={currentHeight}
          priority={priority}
          style={{ height: `${currentHeight}px`, width: "auto", objectFit: "contain", display: "block" }}
        />
      ) : (
        <Image
          src={logoSrc}
          alt="Varadaco"
          width={currentWidth}
          height={currentHeight}
          priority={priority}
          unoptimized
          style={{ height: `${currentHeight}px`, width: "auto", objectFit: "contain", display: "block" }}
        />
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
        {content}
      </Link>
    );
  }

  return content;
}
