"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,152,18,0.12)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="relative container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">100% Free · Always</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Have a Property to Sell
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 font-display italic">or Rent Out?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10">
            List it on HomeHub for free. No commission, no subscription, no hidden fees — ever. Buyers contact you directly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/list">
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" /> List Your Property Free
              </Button>
            </Link>
            <Link href="/properties">
              <Button variant="outline" size="lg" className="gap-2 border-white/30 text-white hover:bg-white/10">
                Browse Properties <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
