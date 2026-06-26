"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Home, Building2, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import { CITIES, PROPERTY_TYPES } from "@/lib/utils";

export default function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"BUY" | "RENT">("BUY");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("purpose", activeTab);
    if (location) params.set("q", location);
    if (type) params.set("type", type);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/75 to-gray-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/30" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-gold-600/5 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      {/* Content */}
      <div className="relative z-10 container-custom section-padding pt-32 lg:pt-40">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-300 text-sm font-medium">100% Free · No Commission · No Agents</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Buy, Rent or Sell
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 font-display italic">Directly.</span>
            <br />
            Zero Commission.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/75 text-lg lg:text-xl mb-10 max-w-xl leading-relaxed"
          >
            List your property for free and connect directly with buyers and renters across Dubai, Abu Dhabi, Sharjah and beyond. No middlemen.
          </motion.p>

          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-luxury"
          >
            {/* Tabs */}
            <div className="flex gap-1 mb-5 bg-black/20 rounded-xl p-1 w-fit">
              {(["BUY", "RENT"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-gold-500 text-white shadow-gold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab === "BUY" ? "Buy" : "Rent"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Location */}
              <div className="relative sm:col-span-1">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400" />
                <input
                  type="text"
                  placeholder="City or community..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  list="cities"
                  className="bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 rounded-xl px-4 py-3 pl-10 w-full transition-colors duration-200 text-sm"
                />
                <datalist id="cities">
                  {CITIES.map((c) => <option key={c} value={c} />)}
                </datalist>
              </div>

              {/* Property Type */}
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400 pointer-events-none" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-white/15 border border-white/20 text-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/40 rounded-xl px-4 py-3 pl-10 w-full transition-colors duration-200 text-sm appearance-none"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="">Any Property Type</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <Button onClick={handleSearch} size="md" className="w-full">
                <Search className="h-4 w-4" />
                Search Properties
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-8 mt-10"
          >
            {[
              { icon: Home, value: "500+", label: "Active Listings" },
              { icon: Building2, value: "0%", label: "Commission" },
              { icon: TrendingUp, value: "Free", label: "To List & Browse" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{value}</div>
                  <div className="text-white/55 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
