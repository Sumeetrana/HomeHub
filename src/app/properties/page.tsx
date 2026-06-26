import { Suspense } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilters from "@/components/property/PropertyFilters";
import { PropertyCardSkeleton } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const revalidate = 60; // cache for 60s, rebuild on new listings

export const metadata: Metadata = {
  title: "Browse Properties",
  description: "Search and filter thousands of UAE properties — apartments, villas, townhouses, and more.",
};

interface PageProps {
  searchParams: {
    q?: string;
    purpose?: string;
    type?: string;
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    sort?: string;
    page?: string;
    featured?: string;
  };
}

async function getProperties(searchParams: PageProps["searchParams"]) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([k, v]) => { if (v) params.set(k, v); });

  const where: Record<string, unknown> = { status: "ACTIVE" };
  const { q, purpose, type, city, minPrice, maxPrice, bedrooms, bathrooms, featured, sort } = searchParams;
  const page = Math.max(1, parseInt(searchParams.page ?? "1"));
  const limit = 12;

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { city: { contains: q, mode: "insensitive" } },
      { community: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  if (purpose === "BUY" || purpose === "RENT") where.purpose = purpose;
  if (type) where.type = type;
  if (city) where.city = { contains: city, mode: "insensitive" };
  if (featured === "true") where.featured = true;
  if (minPrice || maxPrice) {
    where.price = {
      ...(minPrice ? { gte: parseFloat(minPrice) } : {}),
      ...(maxPrice ? { lte: parseFloat(maxPrice) } : {}),
    };
  }
  if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms) };
  if (bathrooms) where.bathrooms = { gte: parseInt(bathrooms) };

  const orderBy =
    sort === "price_asc"
      ? { price: "asc" as const }
      : sort === "price_desc"
      ? { price: "desc" as const }
      : { createdAt: "desc" as const };

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
        amenities: { include: { amenity: true }, take: 5 },
      },
    }),
    prisma.property.count({ where }),
  ]);

  return { properties, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const { properties, total, page, limit, totalPages } = await getProperties(searchParams);

  const buildPageUrl = (p: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set("page", String(p));
    return `/properties?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding pt-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-50 mb-2">
            {searchParams.purpose === "BUY"
              ? "Properties for Sale"
              : searchParams.purpose === "RENT"
              ? "Properties for Rent"
              : "Browse Properties"}
          </h1>
          <p className="text-dark-400">
            {total.toLocaleString()} {total === 1 ? "property" : "properties"} found
            {searchParams.city ? ` in ${searchParams.city}` : ""}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <Suspense>
            <PropertyFilters />
          </Suspense>
        </div>

        {/* Grid */}
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {properties.map((property: any, index: number) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {page > 1 && (
                  <Link href={buildPageUrl(page - 1)} className="w-10 h-10 flex items-center justify-center rounded-xl border border-dark-700 text-dark-300 hover:border-gold-500 hover:text-gold-400 transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                )}
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const p = i + Math.max(1, page - 3);
                  if (p > totalPages) return null;
                  return (
                    <Link
                      key={p}
                      href={buildPageUrl(p)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors",
                        p === page
                          ? "bg-gold-500 text-dark-950"
                          : "border border-dark-700 text-dark-300 hover:border-gold-500 hover:text-gold-400"
                      )}
                    >
                      {p}
                    </Link>
                  );
                })}
                {page < totalPages && (
                  <Link href={buildPageUrl(page + 1)} className="w-10 h-10 flex items-center justify-center rounded-xl border border-dark-700 text-dark-300 hover:border-gold-500 hover:text-gold-400 transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={Search}
            title="No properties found"
            description="Try adjusting your search filters or browse all properties."
            action={
              <Link href="/properties" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold">
                Clear Filters
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
}
