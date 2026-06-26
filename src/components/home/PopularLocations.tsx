"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  { city: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", count: 1240, highlight: "Business Bay, Marina, Palm" },
  { city: "Abu Dhabi", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&q=80", count: 480, highlight: "Yas Island, Saadiyat, Reem" },
  { city: "Sharjah", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", count: 310, highlight: "Al Majaz, Al Nahda, Muwailih" },
  { city: "Ajman", image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&q=80", count: 185, highlight: "Al Rashidiya, Corniche, Rumaila" },
];

export default function PopularLocations() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">Top Destinations</p>
          <h2 className="text-3xl md:text-5xl font-bold text-dark-50 mb-4">Popular Locations</h2>
          <p className="text-dark-400 text-lg max-w-xl mx-auto">
            Explore UAE&#39;s most sought-after real estate markets.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map(({ city, image, count, highlight }, i) => (
            <motion.div
              key={city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/properties?city=${encodeURIComponent(city)}`}>
                <div className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                  <Image
                    src={image}
                    alt={city}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-center gap-1.5 text-gold-400 text-xs mb-1">
                      <MapPin className="h-3.5 w-3.5" /> UAE
                    </div>
                    <h3 className="text-white font-bold text-xl mb-1">{city}</h3>
                    <p className="text-dark-300 text-xs mb-2">{highlight}</p>
                    <span className="text-gold-400 text-sm font-medium">{count.toLocaleString()} properties</span>
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
