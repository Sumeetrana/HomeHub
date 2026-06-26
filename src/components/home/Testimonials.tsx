"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Al-Mansoori",
    role: "Property Investor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "HomeHub made finding my dream villa in Dubai Hills an absolute breeze. The platform is stunning and the agents are genuinely knowledgeable. Closed in 3 weeks!",
  },
  {
    name: "James Thornton",
    role: "Expat Relocating to UAE",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    rating: 5,
    text: "As an expat, the UAE market was intimidating. HomeHub guided me through every step — from finding the right community to understanding the legal process. Exceptional service.",
  },
  {
    name: "Aisha Qasim",
    role: "First-Time Buyer",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80",
    rating: 5,
    text: "The property search filters are incredibly detailed and the listings are always accurate. Found a gorgeous 2-bed in Abu Dhabi with sea views — my first home!",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-white border-t border-gray-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">Client Stories</p>
          <h2 className="text-3xl md:text-5xl font-bold text-dark-50 mb-4">What Our Clients Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, avatar, rating, text }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-dark rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-gold-500/20" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-dark-300 leading-relaxed mb-6 text-sm">{text}</p>
              <div className="flex items-center gap-3">
                <img src={avatar} alt={name} className="w-11 h-11 rounded-full object-cover ring-2 ring-dark-700" />
                <div>
                  <div className="text-dark-100 font-semibold text-sm">{name}</div>
                  <div className="text-dark-500 text-xs">{role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
