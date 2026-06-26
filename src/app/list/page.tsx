"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Home, Phone, Mail, MapPin, DollarSign, Bed, Bath, Square } from "lucide-react";
import { CITIES, PROPERTY_TYPES } from "@/lib/utils";
import Button from "@/components/ui/Button";

const PURPOSES = [
  { value: "BUY", label: "For Sale" },
  { value: "RENT", label: "For Rent" },
];

export default function ListPropertyPage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "", description: "", purpose: "BUY", type: "APARTMENT",
    price: "", city: "", community: "", address: "",
    bedrooms: "1", bathrooms: "1", area: "", areaUnit: "sqft",
    parking: "0", yearBuilt: "",
    sellerName: "", sellerPhone: "", sellerEmail: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.sellerPhone && !form.sellerEmail) {
      setError("Please provide at least a phone number or email so buyers can reach you.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          bedrooms: parseInt(form.bedrooms),
          bathrooms: parseInt(form.bathrooms),
          area: parseFloat(form.area),
          parking: parseInt(form.parking) || 0,
          yearBuilt: form.yearBuilt ? parseInt(form.yearBuilt) : null,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Something went wrong");
      }
      setStep("success");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-12 max-w-md w-full mx-4 text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your listing is live!</h2>
          <p className="text-gray-500 mb-8">
            Your property has been listed for free. Interested buyers and renters will contact you directly using the details you provided.
          </p>
          <div className="flex flex-col gap-3">
            <a href="/properties" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold text-center">
              Browse All Properties
            </a>
            <button onClick={() => { setStep("form"); setForm({ title:"",description:"",purpose:"BUY",type:"APARTMENT",price:"",city:"",community:"",address:"",bedrooms:"1",bathrooms:"1",area:"",areaUnit:"sqft",parking:"0",yearBuilt:"",sellerName:"",sellerPhone:"",sellerEmail:"" }); }} className="text-gray-500 text-sm hover:text-gray-700 transition-colors">
              List another property
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 px-4 py-1.5 rounded-full text-gold-700 text-sm font-medium mb-4">
            100% Free · No Commission
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">List Your Property</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Fill in your property details and your contact info. Buyers and renters reach you directly — no middlemen, no fees.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          {/* Section 1: Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-sm">1</div>
              <h2 className="text-lg font-semibold text-gray-900">Property Details</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="label-dark">Listing Title *</label>
                <input required value={form.title} onChange={(e) => set("title", e.target.value)}
                  className="input-dark" placeholder="e.g. Spacious 2-Bedroom Apartment in Dubai Marina" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-dark">Purpose *</label>
                  <select required value={form.purpose} onChange={(e) => set("purpose", e.target.value)} className="input-dark">
                    {PURPOSES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-dark">Property Type *</label>
                  <select required value={form.type} onChange={(e) => set("type", e.target.value)} className="input-dark">
                    {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="label-dark">Description *</label>
                <textarea required rows={4} value={form.description} onChange={(e) => set("description", e.target.value)}
                  className="input-dark resize-none" placeholder="Describe your property — key features, condition, nearby landmarks..." />
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-sm">2</div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-600" /> Location</h2>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-dark">City *</label>
                  <select required value={form.city} onChange={(e) => set("city", e.target.value)} className="input-dark">
                    <option value="">Select City</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-dark">Community / Area</label>
                  <input value={form.community} onChange={(e) => set("community", e.target.value)}
                    className="input-dark" placeholder="e.g. Downtown, JVC, Marina" />
                </div>
              </div>
              <div>
                <label className="label-dark">Full Address *</label>
                <input required value={form.address} onChange={(e) => set("address", e.target.value)}
                  className="input-dark" placeholder="Building name, street name" />
              </div>
            </div>
          </div>

          {/* Section 3: Specs & Price */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-sm">3</div>
              <h2 className="text-lg font-semibold text-gray-900">Size & Price</h2>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="label-dark"><Bed className="inline h-3.5 w-3.5 mr-1" />Bedrooms</label>
                  <select value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} className="input-dark">
                    <option value="0">Studio</option>
                    {[1,2,3,4,5,6,7].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-dark"><Bath className="inline h-3.5 w-3.5 mr-1" />Bathrooms</label>
                  <select value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} className="input-dark">
                    {[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-dark">Parking Spots</label>
                  <select value={form.parking} onChange={(e) => set("parking", e.target.value)} className="input-dark">
                    {[0,1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-dark"><Square className="inline h-3.5 w-3.5 mr-1" />Area *</label>
                  <div className="flex gap-2">
                    <input required type="number" min="1" value={form.area} onChange={(e) => set("area", e.target.value)}
                      className="input-dark flex-1" placeholder="1200" />
                    <select value={form.areaUnit} onChange={(e) => set("areaUnit", e.target.value)} className="input-dark w-24">
                      <option value="sqft">sqft</option>
                      <option value="sqm">sqm</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label-dark">Year Built</label>
                  <input type="number" min="1950" max="2025" value={form.yearBuilt} onChange={(e) => set("yearBuilt", e.target.value)}
                    className="input-dark" placeholder="2020" />
                </div>
              </div>

              <div>
                <label className="label-dark"><DollarSign className="inline h-3.5 w-3.5 mr-1" />Price (AED) *</label>
                <input required type="number" min="1" value={form.price} onChange={(e) => set("price", e.target.value)}
                  className="input-dark" placeholder={form.purpose === "RENT" ? "e.g. 80000 (annual rent)" : "e.g. 1500000"} />
                {form.purpose === "RENT" && <p className="text-xs text-gray-400 mt-1">Enter the annual rent in AED</p>}
              </div>
            </div>
          </div>

          {/* Section 4: Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-sm">4</div>
              <h2 className="text-lg font-semibold text-gray-900">Your Contact Info</h2>
            </div>
            <p className="text-sm text-gray-400 mb-6 ml-11">This is how buyers and renters will contact you directly.</p>

            <div className="space-y-5">
              <div>
                <label className="label-dark"><Home className="inline h-3.5 w-3.5 mr-1" />Your Name *</label>
                <input required value={form.sellerName} onChange={(e) => set("sellerName", e.target.value)}
                  className="input-dark" placeholder="Full name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label-dark"><Phone className="inline h-3.5 w-3.5 mr-1" />Phone / WhatsApp</label>
                  <input type="tel" value={form.sellerPhone} onChange={(e) => set("sellerPhone", e.target.value)}
                    className="input-dark" placeholder="+971 50 123 4567" />
                </div>
                <div>
                  <label className="label-dark"><Mail className="inline h-3.5 w-3.5 mr-1" />Email Address</label>
                  <input type="email" value={form.sellerEmail} onChange={(e) => set("sellerEmail", e.target.value)}
                    className="input-dark" placeholder="you@email.com" />
                </div>
              </div>
              <p className="text-xs text-gray-400">Provide at least one contact method.</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" loading={loading} size="lg" className="w-full">
            Publish My Listing — It&apos;s Free
          </Button>
          <p className="text-center text-gray-400 text-xs mt-4">
            By submitting, your contact details will be visible to interested buyers and renters.
          </p>
        </form>
      </div>
    </div>
  );
}
