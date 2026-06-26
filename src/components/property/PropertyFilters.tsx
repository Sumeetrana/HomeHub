"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { CITIES, PROPERTY_TYPES, SORT_OPTIONS } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    q: searchParams.get("q") ?? "",
    purpose: searchParams.get("purpose") ?? "",
    type: searchParams.get("type") ?? "",
    city: searchParams.get("city") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    bedrooms: searchParams.get("bedrooms") ?? "",
    bathrooms: searchParams.get("bathrooms") ?? "",
    sort: searchParams.get("sort") ?? "newest",
  });

  const updateFilters = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v && v !== "newest") params.set(k, v);
    });
    if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);
    params.set("page", "1");
    router.push(`/properties?${params.toString()}`);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({ q: "", purpose: "", type: "", city: "", minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "", sort: "newest" });
    router.push("/properties");
  };

  const activeCount = Object.entries(filters).filter(([k, v]) => v && k !== "sort").length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search by location, community, or keyword..."
            value={filters.q}
            onChange={(e) => updateFilters("q", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            className="input-dark pl-11"
          />
        </div>
        <Button onClick={applyFilters} size="md">
          <Search className="h-4 w-4" /> Search
        </Button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors",
            showFilters ? "border-gold-500 text-gold-400 bg-gold-500/10" : "border-dark-600 text-dark-300 hover:border-dark-500 hover:text-dark-100"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold-500 text-dark-950 text-xs font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Quick purpose tabs */}
      <div className="flex gap-2">
        {[{ v: "", l: "All" }, { v: "BUY", l: "For Sale" }, { v: "RENT", l: "For Rent" }].map(({ v, l }) => (
          <button
            key={v}
            onClick={() => { updateFilters("purpose", v); }}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium border transition-colors",
              filters.purpose === v
                ? "border-gold-500 text-gold-400 bg-gold-500/10"
                : "border-dark-700 text-dark-400 hover:border-dark-600 hover:text-dark-200"
            )}
          >
            {l}
          </button>
        ))}
        <div className="ml-auto">
          <select
            value={filters.sort}
            onChange={(e) => { updateFilters("sort", e.target.value); applyFilters(); }}
            className="bg-dark-800 border border-dark-600 text-dark-200 text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-gold-500"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="glass-dark rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Property Type */}
              <div>
                <label className="label-dark">Property Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => updateFilters("type", e.target.value)}
                  className="input-dark py-2.5"
                >
                  <option value="">Any Type</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="label-dark">City</label>
                <select
                  value={filters.city}
                  onChange={(e) => updateFilters("city", e.target.value)}
                  className="input-dark py-2.5"
                >
                  <option value="">Any City</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="label-dark">Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => updateFilters("bedrooms", e.target.value)}
                  className="input-dark py-2.5"
                >
                  <option value="">Any</option>
                  <option value="0">Studio</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}+ Beds</option>
                  ))}
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="label-dark">Bathrooms</label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => updateFilters("bathrooms", e.target.value)}
                  className="input-dark py-2.5"
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}+</option>
                  ))}
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="label-dark">Min Price (AED)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => updateFilters("minPrice", e.target.value)}
                  className="input-dark py-2.5"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="label-dark">Max Price (AED)</label>
                <input
                  type="number"
                  placeholder="No limit"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilters("maxPrice", e.target.value)}
                  className="input-dark py-2.5"
                />
              </div>

              {/* Actions */}
              <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex items-end gap-3 pt-2">
                <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
                <Button variant="outline" onClick={clearFilters} className="flex items-center gap-1.5">
                  <X className="h-4 w-4" /> Clear
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
