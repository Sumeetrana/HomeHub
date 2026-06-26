"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, Users, Shield, ArrowRight, Home } from "lucide-react";
import Button from "@/components/ui/Button";

const steps = [
  { icon: Users, title: "Create Your Listing", desc: "Sign up as an agent and create a detailed property listing with photos, description, and pricing." },
  { icon: TrendingUp, title: "Reach Qualified Buyers", desc: "Your listing appears to thousands of active buyers across UAE searching for properties like yours." },
  { icon: Shield, title: "Close with Confidence", desc: "Our platform facilitates secure transactions with full legal and documentation support." },
];

const benefits = [
  "Free listing creation",
  "Professional photography tips",
  "Pricing guidance from market data",
  "Dedicated agent dashboard",
  "Lead management tools",
  "WhatsApp & call integration",
];

export default function SellPageClient() {
  return (
    <div className="min-h-screen bg-dark-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden section-padding pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,152,18,0.1),transparent_60%)]" />
        <div className="container-custom relative">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-4">Sell with HomeHub</p>
              <h1 className="text-4xl md:text-5xl font-bold text-dark-50 mb-6">
                List Your Property,
                <br />
                <span className="gradient-text font-display italic">Find Your Buyer</span>
              </h1>
              <p className="text-dark-400 text-lg mb-8 leading-relaxed">
                Join our network of top-performing agents and reach thousands of qualified buyers across the UAE. Free to list, powerful tools included.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/register">
                  <Button size="lg">
                    Start Listing <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/agents">
                  <Button variant="outline" size="lg">Meet Our Agents</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-50 mb-4">How Selling Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="h-7 w-7 text-gold-400" />
                </div>
                <h3 className="text-xl font-semibold text-dark-50 mb-3">{title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-dark-900/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-dark-50 mb-6">Everything You Need to Sell</h2>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-dark-300">
                    <CheckCircle className="h-5 w-5 text-gold-400 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-dark rounded-2xl p-8 text-center"
            >
              <Home className="h-16 w-16 text-gold-400 mx-auto mb-5" />
              <h3 className="text-2xl font-bold text-dark-50 mb-3">Ready to List?</h3>
              <p className="text-dark-400 mb-6">Create your free agent account and start listing today.</p>
              <Link href="/auth/register">
                <Button size="lg" className="w-full">Create Free Account</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
