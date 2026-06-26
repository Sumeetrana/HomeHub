"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema, LeadInput } from "@/lib/validations";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Clock } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (data: LeadInput) => {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-gold-400 text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-3xl md:text-5xl font-bold text-dark-50 mb-4">Contact HomeHub</h1>
          <p className="text-dark-400 text-lg max-w-xl mx-auto">
            Have a question about a property? Want to list your home? We&#39;re here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: Phone, label: "Phone", value: "+971 4 000 0000", href: "tel:+97140000000" },
              { icon: Mail, label: "Email", value: "hello@homehub.ae", href: "mailto:hello@homehub.ae" },
              { icon: MapPin, label: "Office", value: "Dubai, United Arab Emirates", href: "#" },
              { icon: Clock, label: "Hours", value: "Mon–Fri: 9AM – 7PM GST", href: "#" },
            ].map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 glass-dark rounded-2xl p-5 hover:border-gold-500/30 border border-transparent transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-dark-400 text-xs mb-1">{label}</div>
                  <div className="text-dark-100 font-medium text-sm">{value}</div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-dark rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center"
              >
                <CheckCircle className="h-16 w-16 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-dark-50 mb-2">Message Sent!</h3>
                <p className="text-dark-400">We&#39;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <div className="glass-dark rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-dark-50 mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-dark">Full Name *</label>
                      <input {...register("name")} className="input-dark" placeholder="Your name" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="label-dark">Phone</label>
                      <input {...register("phone")} className="input-dark" placeholder="+971..." />
                    </div>
                  </div>
                  <div>
                    <label className="label-dark">Email *</label>
                    <input {...register("email")} type="email" className="input-dark" placeholder="you@example.com" />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="label-dark">Message *</label>
                    <textarea {...register("message")} rows={5} className="input-dark resize-none" placeholder="How can we help?" />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <Button type="submit" loading={isSubmitting} className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
