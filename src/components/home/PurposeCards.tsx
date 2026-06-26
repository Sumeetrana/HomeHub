"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Home, DollarSign, ArrowRight } from "lucide-react";

const cards = [
  {
    href: "/properties?purpose=BUY",
    icon: Home,
    title: "Buy a Property",
    description: "Find your forever home or next investment with verified listings across the UAE.",
    color: "from-amber-50 to-yellow-50",
    border: "border-amber-200 hover:border-amber-400",
    iconColor: "text-gold-600",
    tag: "For sale",
  },
  {
    href: "/properties?purpose=RENT",
    icon: TrendingUp,
    title: "Rent a Property",
    description: "Discover rentals across UAE with flexible terms — from studios to luxury villas.",
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-200 hover:border-blue-400",
    iconColor: "text-blue-600",
    tag: "For rent",
  },
  {
    href: "/list",
    icon: DollarSign,
    title: "List Your Property",
    description: "Add your property in minutes. Buyers contact you directly. Zero commission, always.",
    color: "from-emerald-50 to-green-50",
    border: "border-emerald-200 hover:border-emerald-400",
    iconColor: "text-emerald-600",
    tag: "100% free",
  },
];

export default function PurposeCards() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ href, icon: Icon, title, description, color, border, iconColor, tag }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={href}>
                <div className={`relative bg-gradient-to-br ${color} border ${border} rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer group overflow-hidden`}>
                  <div className="absolute top-4 right-4 text-xs font-medium text-gray-500 bg-white/70 px-2.5 py-1 rounded-full">
                    {tag}
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center mb-5 ${iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-xl mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{description}</p>
                  <div className={`flex items-center gap-2 text-sm font-medium ${iconColor} group-hover:gap-3 transition-all`}>
                    Get Started <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
