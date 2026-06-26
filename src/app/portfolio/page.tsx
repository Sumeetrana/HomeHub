"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink, Database, Code2, Layers, Zap, Shield, Search, Globe, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";

const techStack = [
  { category: "Frontend", items: ["Next.js 14 (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "React Hook Form"] },
  { category: "Backend", items: ["Next.js API Routes", "NextAuth v5", "Prisma ORM", "Zod Validation", "bcryptjs"] },
  { category: "Database", items: ["PostgreSQL", "Prisma Schema", "Full-text search", "Indexed queries"] },
  { category: "UI/UX", items: ["Radix UI primitives", "Lucide icons", "Custom dark theme", "Responsive design"] },
  { category: "DevOps", items: ["Vercel deployment", "Environment config", "Database migrations", "Seed scripts"] },
];

const features = [
  { icon: Search, title: "Advanced Search & Filtering", desc: "Server-side filtered property search with 8+ filter dimensions: location, price, type, bedrooms, bathrooms. Full-text search across title, description, community, and city fields." },
  { icon: Shield, title: "Role-Based Auth (RBAC)", desc: "Three-tier authentication system (USER, AGENT, ADMIN) using NextAuth v5 with JWT strategy. Secure Credentials provider with bcrypt password hashing." },
  { icon: Database, title: "Relational Database Design", desc: "PostgreSQL schema with 10 normalized tables, proper indexes, enum types, and cascade deletes. Prisma ORM with type-safe queries and seed data." },
  { icon: Layers, title: "Admin Dashboard", desc: "Full CRUD admin panel with property approval workflow, user management, featured listing controls, and real-time lead monitoring." },
  { icon: Globe, title: "SEO & Metadata", desc: "Dynamic OpenGraph metadata per property, JSON-LD RealEstateListing schema, SEO-friendly slugs, sitemap.ts, and robots.txt." },
  { icon: Zap, title: "Performance Optimization", desc: "Server Components for data fetching, next/image optimization, lazy loading, pagination, loading skeletons, and scroll-aware animations." },
];

const challenges = [
  {
    challenge: "Next.js 14 App Router + NextAuth v5 Integration",
    solution: "NextAuth v5 beta changed the auth configuration API significantly. I adapted the JWT-based session strategy to work with the new handlers pattern and ensured server-side session access via the auth() function in Server Components.",
  },
  {
    challenge: "Type-safe Prisma relations with Next.js API responses",
    solution: "Prisma include queries return deeply nested types that required careful TypeScript handling. I created a shared types/index.ts with mapped interfaces to bridge Prisma's auto-generated types with the frontend component props.",
  },
  {
    challenge: "Animated UI without layout shift",
    solution: "Used Framer Motion's whileInView with once:true to prevent re-animation, and viewport-based triggering to ensure smooth performance. CSS shimmer animations use background-position instead of opacity to avoid repaints.",
  },
  {
    challenge: "Server-side filtering with URL-driven state",
    solution: "Implemented property filters as URL searchParams, making every filtered view bookmarkable and shareable. Server Components read from searchParams directly, eliminating client-side fetch waterfalls.",
  },
];

const dbTables = [
  { table: "User", fields: "id, name, email, password, role, image", notes: "NextAuth compatible" },
  { table: "AgentProfile", fields: "userId, slug, agency, rating, specialties", notes: "1:1 with User" },
  { table: "Property", fields: "slug, purpose, type, status, price, city", notes: "Indexed on city, purpose, type" },
  { table: "PropertyImage", fields: "propertyId, url, isPrimary, order", notes: "Cascade delete" },
  { table: "Amenity", fields: "name, icon, category", notes: "Normalized lookup" },
  { table: "PropertyAmenity", fields: "propertyId, amenityId", notes: "M:M join table" },
  { table: "Favorite", fields: "userId, propertyId", notes: "Unique constraint" },
  { table: "Lead", fields: "name, email, message, status, propertyId", notes: "CRM pipeline" },
  { table: "Review", fields: "agentId, rating, comment", notes: "Cascade delete" },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,152,18,0.08),transparent_60%)]" />
        <div className="container-custom relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-3 py-1.5 rounded-full text-gold-400 text-xs font-medium mb-6">
              Self-initiated Portfolio Project
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-dark-50 mb-6">
              HomeHub — Real Estate
              <br />
              <span className="gradient-text font-display italic">Platform Case Study</span>
            </h1>
            <p className="text-dark-400 text-xl mb-8 leading-relaxed">
              A full-stack premium real estate platform built to demonstrate production-level engineering across frontend animation,
              backend architecture, database design, authentication, SEO, and admin workflows.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                <ExternalLink className="h-4 w-4" /> View Live
              </Link>
              <a href="https://github.com/sumeetrana/homehub" target="_blank" rel="noopener noreferrer" className="btn-outline px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                <Github className="h-4 w-4" /> View Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section-padding border-t border-dark-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-dark-50 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 text-xs font-bold">P</span>
                The Problem
              </h2>
              <p className="text-dark-400 leading-relaxed mb-4">
                Most real estate portfolio projects look like basic CRUD applications — simple forms,
                minimal styling, no architecture thought. They don&#39;t demonstrate the engineering complexity
                that real-world property platforms require.
              </p>
              <ul className="space-y-2 text-dark-400 text-sm">
                {["No role-based access control", "Static/hardcoded data", "No search or filtering", "No SEO considerations", "Generic UI with no animations"].map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-dark-50 mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold">S</span>
                The Solution
              </h2>
              <p className="text-dark-400 leading-relaxed mb-4">
                HomeHub is built to the same standard as a funded SaaS product — production architecture,
                premium UI/UX, full authentication, and all the database, API, and SEO considerations you&#39;d
                find in real property tech platforms.
              </p>
              <ul className="space-y-2 text-dark-400 text-sm">
                {["3-tier RBAC (User, Agent, Admin)", "20 seeded properties + 5 agents", "8-dimension search & filtering", "Dynamic SEO metadata + JSON-LD", "Framer Motion animations throughout"].map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-dark-900/50">
        <div className="container-custom">
          <SectionHeader eyebrow="What Was Built" title="Key Features" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <h3 className="text-dark-50 font-semibold mb-2">{title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader eyebrow="Engineering" title="Tech Stack" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {techStack.map(({ category, items }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-dark rounded-2xl p-5"
              >
                <h3 className="text-gold-400 text-xs font-semibold uppercase tracking-wider mb-4">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-dark-300 text-sm flex items-center gap-2">
                      <Code2 className="h-3.5 w-3.5 text-dark-600 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Database Design */}
      <section className="section-padding bg-dark-900/50">
        <div className="container-custom">
          <SectionHeader eyebrow="Data Architecture" title="Database Design" />
          <div className="glass-dark rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left text-dark-400 text-sm font-medium px-6 py-4">Table</th>
                    <th className="text-left text-dark-400 text-sm font-medium px-4 py-4">Key Fields</th>
                    <th className="text-left text-dark-400 text-sm font-medium px-4 py-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {dbTables.map(({ table, fields, notes }) => (
                    <tr key={table} className="border-b border-dark-800/50">
                      <td className="px-6 py-3">
                        <code className="text-gold-400 text-sm font-mono">{table}</code>
                      </td>
                      <td className="px-4 py-3 text-dark-300 text-sm font-mono">{fields}</td>
                      <td className="px-4 py-3">
                        <Badge variant="dark">{notes}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Challenges */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader eyebrow="Technical Deep Dive" title="Engineering Challenges" />
          <div className="space-y-6">
            {challenges.map(({ challenge, solution }, i) => (
              <motion.div
                key={challenge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-dark rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center text-gold-400 text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-dark-50 font-semibold mb-3">{challenge}</h3>
                    <p className="text-dark-400 leading-relaxed text-sm">{solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="section-padding bg-dark-900/50">
        <div className="container-custom">
          <SectionHeader eyebrow="Impact" title="Business Value" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { metric: "13 Pages", label: "Complete page coverage", desc: "Home, listings, detail, agents, dashboard, admin, auth, contact, portfolio" },
              { metric: "10+ APIs", label: "RESTful API routes", desc: "CRUD, auth, search, admin, favorites, leads — all secured with role checks" },
              { metric: "20 Properties", label: "Realistic seed data", desc: "Across Dubai, Abu Dhabi, Sharjah, Ajman with real prices and amenities" },
            ].map(({ metric, label, desc }) => (
              <div key={metric} className="glass-dark rounded-2xl p-8 text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{metric}</div>
                <div className="text-dark-100 font-semibold mb-2">{label}</div>
                <div className="text-dark-400 text-sm">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-dark-50 mb-4">Interested in this architecture?</h2>
          <p className="text-dark-400 mb-8">Let&#39;s connect — built by Sumeet Rana as a portfolio project.</p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
              Explore HomeHub <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="mailto:sumeet.rana@innovaccer.com" className="btn-outline px-6 py-3 rounded-xl text-sm font-semibold">
              Contact Sumeet
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
