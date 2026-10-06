import type { Metadata } from "next";
import "./globals.css";
import PolicyModal from "@/components/PolicyModal";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export const metadata: Metadata = {
  title: "Varadaco Industries | Science-driven nutrition & manufacturing",
  description: "Advanced nutraceutical, health and wellness solutions, from formulation to finished product.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="128x128" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body style={{ fontFamily: 'Inter, Manrope, Helvetica Neue, Arial, sans-serif' }}>
        {children}
        <PolicyModal />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

