import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PropertyGallery from "@/components/property/PropertyGallery";
import Badge from "@/components/ui/Badge";
import { Bed, Bath, Square, MapPin, Car, Calendar, Eye, Building2, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { formatPriceFull, timeAgo } from "@/lib/utils";
import PropertyJsonLd from "@/components/property/PropertyJsonLd";

interface PageProps { params: { slug: string }; }

async function getProperty(slug: string) {
  return prisma.property.findFirst({
    where: { slug, status: { in: ["ACTIVE", "SOLD", "RENTED"] } },
    include: {
      images: { orderBy: { order: "asc" } },
      amenities: { include: { amenity: true } },
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = await getProperty(params.slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: property.title,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.substring(0, 160),
      images: property.images[0]?.url ? [{ url: property.images[0].url }] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const property = await getProperty(params.slug);
  if (!property) notFound();

  // Increment views
  await prisma.property.update({ where: { id: property.id }, data: { views: { increment: 1 } } });

  const typeLabel = property.type.charAt(0) + property.type.slice(1).toLowerCase();
  const purposeLabel = property.purpose === "BUY" ? "For Sale" : "For Rent";

  const amenityCategories = property.amenities.reduce<Record<string, string[]>>((acc, { amenity }) => {
    const cat = amenity.category ?? "Features";
    acc[cat] = [...(acc[cat] ?? []), amenity.name];
    return acc;
  }, {});

  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in your property: ${property.title} (${formatPriceFull(property.price, property.currency)})`);

  return (
    <>
      <PropertyJsonLd property={property} />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container-custom section-padding pt-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-gold-600 transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-gray-700">{property.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              <PropertyGallery images={property.images} title={property.title} />

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge variant={property.purpose === "BUY" ? "gold" : "blue"}>{purposeLabel}</Badge>
                  <Badge variant="dark">{typeLabel}</Badge>
                  {property.featured && <Badge variant="gold">Featured</Badge>}
                  <span className="text-gray-400 text-sm flex items-center gap-1 ml-auto">
                    <Eye className="h-3.5 w-3.5" /> {property.views} views
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <MapPin className="h-4 w-4 text-gold-500" />
                  {property.community ? `${property.community}, ` : ""}{property.address}, {property.city}
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">
                  {formatPriceFull(property.price, property.currency)}
                  {property.purpose === "RENT" && <span className="text-gray-400 text-base font-normal"> / year</span>}
                </div>
              </div>

              {/* Key Details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-5">Property Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {[
                    { icon: Bed, label: "Bedrooms", value: property.bedrooms > 0 ? property.bedrooms : "Studio" },
                    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
                    { icon: Square, label: `Area (${property.areaUnit})`, value: property.area.toLocaleString() },
                    { icon: Car, label: "Parking", value: property.parking || "None" },
                    { icon: Building2, label: "Type", value: typeLabel },
                    ...(property.yearBuilt ? [{ icon: Calendar, label: "Year Built", value: property.yearBuilt }] : []),
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label}>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <Icon className="h-4 w-4 text-gold-500" /> {label}
                      </div>
                      <div className="text-gray-900 font-semibold">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Amenities */}
              {Object.keys(amenityCategories).length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-5">Amenities & Features</h2>
                  <div className="space-y-5">
                    {Object.entries(amenityCategories).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="text-gold-600 text-sm font-semibold uppercase tracking-wider mb-3">{category}</h3>
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <span key={item} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Seller Contact */}
            <div className="space-y-6">
              {/* Contact card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3">
                    {property.sellerName[0].toUpperCase()}
                  </div>
                  <h3 className="font-semibold text-gray-900">{property.sellerName}</h3>
                  <p className="text-gray-400 text-sm">Owner / Seller</p>
                </div>

                <div className="space-y-3">
                  {property.sellerPhone && (
                    <>
                      <a
                        href={`tel:${property.sellerPhone}`}
                        className="flex items-center gap-3 w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors text-sm font-medium text-gray-700"
                      >
                        <Phone className="h-4 w-4 text-gold-600" />
                        {property.sellerPhone}
                      </a>
                      <a
                        href={`https://wa.me/${property.sellerPhone.replace(/\D/g, "")}?text=${whatsappMsg}`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 w-full bg-emerald-500 hover:bg-emerald-600 rounded-xl px-4 py-3 transition-colors text-sm font-semibold text-white"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </>
                  )}
                  {property.sellerEmail && (
                    <a
                      href={`mailto:${property.sellerEmail}?subject=Enquiry: ${property.title}`}
                      className="flex items-center gap-3 w-full bg-gold-500 hover:bg-gold-600 rounded-xl px-4 py-3 transition-colors text-sm font-semibold text-white"
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </a>
                  )}
                </div>

                <p className="text-xs text-gray-400 text-center mt-4">
                  Contact the owner directly. No agents, no commission.
                </p>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-gray-500 text-sm font-medium mb-4">Listing Summary</h3>
                <dl className="space-y-3">
                  {[
                    { label: "Reference", value: property.id.slice(-8).toUpperCase() },
                    { label: "Status", value: property.status },
                    { label: "Listed", value: timeAgo(property.createdAt) },
                    { label: "Type", value: typeLabel },
                    { label: "Purpose", value: purposeLabel },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <dt className="text-gray-400">{label}</dt>
                      <dd className="text-gray-800 font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
