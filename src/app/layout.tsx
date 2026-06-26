import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://homehub.ae"),
  title: {
    default: "HomeHub — Free Property Listings in UAE",
    template: "%s | HomeHub",
  },
  description:
    "List and discover properties across Dubai, Abu Dhabi, Sharjah, and the UAE — for free. No commission, no agents. Buy, sell or rent directly.",
  keywords: ["real estate UAE", "Dubai properties", "buy villa Dubai", "rent apartment Abu Dhabi", "free property listing UAE"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://homehub.ae",
    siteName: "HomeHub",
    title: "HomeHub — Free Property Listings in UAE",
    description: "List and discover properties across the UAE for free. No commission.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "HomeHub" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
