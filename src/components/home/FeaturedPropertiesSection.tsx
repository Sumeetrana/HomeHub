import { unstable_cache } from "next/cache";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/property/PropertyCard";
import SectionHeader from "@/components/ui/SectionHeader";

const getFeaturedProperties = unstable_cache(
  async () => {
    try {
      return await prisma.property.findMany({
        where: { featured: true, status: "ACTIVE" },
        take: 6,
        orderBy: { createdAt: "desc" },
        include: {
          images: { orderBy: { order: "asc" } },
          amenities: { include: { amenity: true } },
        },
      });
    } catch {
      return [];
    }
  },
  ["featured-properties"],
  { revalidate: 120 }
);

export default async function FeaturedPropertiesSection() {
  const properties = await getFeaturedProperties();

  if (properties.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <SectionHeader
            eyebrow="Handpicked For You"
            title="Featured Properties"
            description="Curated selection of premium properties across UAE's finest locations."
            center={false}
            className="mb-0 max-w-xl"
          />
          <Link href="/properties?featured=true" className="hidden md:flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium text-sm transition-colors group">
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {properties.map((property: any, index: number) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link href="/properties?featured=true" className="text-gold-600 font-medium text-sm flex items-center gap-2 justify-center">
            View All Featured <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
