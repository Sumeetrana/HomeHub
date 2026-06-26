# HomeHub — Premium Real Estate Platform

> **Self-initiated portfolio project / real estate platform concept**  
> Built by Sumeet Rana to demonstrate full-stack engineering across Next.js, PostgreSQL, authentication, animations, and SEO.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth v5 (Credentials) |
| Validation | Zod + React Hook Form |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Deployment | Vercel-ready |

---

## Prerequisites

- Node.js 18+ (Node 20/24 recommended)
- PostgreSQL 14+ database
- npm or yarn

---

## Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd homehub
npm install --registry https://registry.npmjs.org
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/homehub?schema=public"
AUTH_SECRET="your-32-char-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Apply schema
npx prisma db push

# Generate client
npx prisma generate

# Seed with sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Demo Credentials

| Role  | Email | Password |
|-------|-------|----------|
| Admin | admin@homehub.ae | Admin123! |
| Agent | ahmed@homehub.ae | Agent123! |
| User  | user@homehub.ae | User123! |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── properties/        # Listings + [slug] detail
│   ├── buy/ rent/ sell/   # Purpose pages
│   ├── agents/            # Agent directory + [id] profile
│   ├── favorites/         # Saved properties
│   ├── dashboard/         # User/agent dashboard
│   ├── admin/             # Admin panel (ADMIN role only)
│   ├── auth/              # Login + Register
│   ├── portfolio/         # Case study page
│   ├── contact/           # Contact form
│   ├── api/               # All API routes
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots config
├── components/
│   ├── ui/                # Button, Badge, Skeleton, Toast…
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Hero, PurposeCards, Testimonials…
│   ├── property/          # PropertyCard, Filters, Gallery, ContactForm
│   └── agent/             # AgentCard
├── lib/
│   ├── prisma.ts          # Prisma singleton
│   ├── auth.ts            # NextAuth config
│   ├── utils.ts           # cn(), formatPrice(), slugify()
│   └── validations.ts     # Zod schemas
└── types/
    └── index.ts           # Shared TypeScript types
```

---

## Database Schema

10 models: `User`, `Account`, `Session`, `VerificationToken`, `AgentProfile`, `Property`, `PropertyImage`, `Amenity`, `PropertyAmenity`, `Favorite`, `Lead`, `Review`

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/properties` | Search/filter properties |
| POST | `/api/properties` | Create listing (AGENT/ADMIN) |
| GET | `/api/properties/[id]` | Get property by id/slug |
| PATCH | `/api/properties/[id]` | Update property |
| DELETE | `/api/properties/[id]` | Delete property |
| GET | `/api/agents` | List all agents |
| POST | `/api/agents` | Create agent profile |
| GET/PATCH | `/api/agents/[id]` | Agent detail/update |
| GET/POST | `/api/favorites` | Get/toggle favorites |
| GET/POST | `/api/leads` | Get/create leads |
| POST | `/api/auth/register` | User registration |
| GET/PATCH | `/api/admin/properties` | Admin property management |
| GET/PATCH | `/api/admin/users` | Admin user management |

---

## Features

- ✅ Animated hero with property search
- ✅ Advanced filtering (8+ dimensions)
- ✅ Property listings with pagination
- ✅ Property detail with image gallery
- ✅ Agent profiles and directory
- ✅ Contact agent / WhatsApp integration
- ✅ Role-based auth (USER / AGENT / ADMIN)
- ✅ Favorites system
- ✅ Admin dashboard with approval workflow
- ✅ Dynamic SEO metadata per property
- ✅ JSON-LD RealEstateListing schema
- ✅ Sitemap + robots.txt
- ✅ Dark luxury theme with Framer Motion
- ✅ Mobile-first responsive design
- ✅ 20 seed properties + 5 agents
- ✅ Portfolio case study page

---

## Deployment

### Vercel (Recommended)

1. Connect repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy — Next.js App Router works out of the box

### Database

Use [Supabase](https://supabase.com), [Neon](https://neon.tech), or any PostgreSQL provider. Update `DATABASE_URL` accordingly.

---

## About

This project was self-initiated as a portfolio piece to demonstrate:
- Production-level Next.js App Router architecture
- Role-based authentication with NextAuth v5
- Complex Prisma database design with proper indexes
- Premium UI/UX with Framer Motion animations
- SEO best practices with dynamic metadata
- Admin workflow design

**Not a real estate agency. No real listings or transactions.**

---

Built with ❤️ by Sumeet Rana  
Portfolio: [sumeetrana.dev](https://sumeetrana.dev) | Email: sumeet.rana@innovaccer.com
