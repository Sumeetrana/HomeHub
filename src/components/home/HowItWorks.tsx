"use client";

import { motion } from "framer-motion";
import { ClipboardList, Phone, Handshake } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "List for Free",
    description: "Fill in your property details, upload photos, and add your phone or email. Your listing goes live instantly — no sign-up required.",
    cta: { label: "List a Property", href: "/list" },
  },
  {
    icon: Phone,
    step: "02",
    title: "Buyers Contact You",
    description: "Interested buyers and renters reach you directly via phone, WhatsApp, or email. No intermediaries, no delays.",
    cta: null,
  },
  {
    icon: Handshake,
    step: "03",
    title: "Deal Done. Zero Commission.",
    description: "Negotiate and close on your terms. HomeHub takes absolutely nothing — no agent fees, no platform cut, ever.",
    cta: null,
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Simple. Free. Direct.</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            List your home or find your next property — no agents, no commission, no hassle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, step, title, description, cta }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all"
            >
              <div className="text-gold-200 font-bold text-7xl absolute top-4 right-6 font-display select-none leading-none">
                {step}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-gold-50 border border-gold-100 flex items-center justify-center mb-5">
                <Icon className="h-6 w-6 text-gold-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-500 leading-relaxed mb-4">{description}</p>
              {cta && (
                <Link href={cta.href} className="text-gold-600 text-sm font-semibold hover:text-gold-700 transition-colors">
                  {cta.label} →
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
