import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  Playfair_Display,
  Noto_Sans_Devanagari,
} from "next/font/google";
import { PromoBar } from "@/components/layout/PromoBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    images: [{ url: "/images/hero-kitchen.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/images/hero-kitchen.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1B4D3E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${devanagari.variable} min-h-screen bg-cream font-sans text-ink antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to content
        </a>
        <PromoBar />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
