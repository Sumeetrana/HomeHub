"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/properties", label: "Browse" },
  { href: "/properties?purpose=BUY", label: "Buy" },
  { href: "/properties?purpose=RENT", label: "Rent" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    const [path] = href.split("?");
    return pathname === path || pathname.startsWith(path + "/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isHome
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className={cn("text-xl font-bold font-display transition-colors", transparent ? "text-white" : "text-gray-900")}>
                Home<span className="gradient-text">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                    isActive(link.href)
                      ? transparent ? "text-gold-300 bg-white/10" : "text-gold-600 bg-gold-50"
                      : transparent
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/list" className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold">
                + List Your Property
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-xl transition-colors",
                transparent ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-gray-200 shadow-sm lg:hidden"
          >
            <div className="container-custom px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href ? "text-gold-600 bg-gold-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-200">
                <Link href="/list" className="block btn-gold px-4 py-3 rounded-xl text-sm text-center font-semibold">
                  + List Your Property Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
