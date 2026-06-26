"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Bath, Square, MapPin, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface PropertyCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  property: any;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const [imgError, setImgError] = useState(false);

  const primaryImage = property.images?.find((i: { isPrimary: boolean }) => i.isPrimary) ?? property.images?.[0];
  const imageUrl = !imgError && primaryImage?.url
    ? primaryImage.url
    : `https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80`;

  const purposeBadge = property.purpose === "BUY" ? "For Sale" : "For Rent";
  const purposeVariant = property.purpose === "BUY" ? "gold" : "blue";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link href={`/properties/${property.slug}`} prefetch={true}>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 cursor-pointer">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={imageUrl}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant={purposeVariant}>{purposeBadge}</Badge>
              {property.featured && (
                <Badge variant="gold" className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> Featured
                </Badge>
              )}
            </div>

            {/* Price */}
            <div className="absolute bottom-3 left-3">
              <span className="text-white font-bold text-lg drop-shadow-lg">
                {formatPrice(property.price, property.currency)}
              </span>
              {property.purpose === "RENT" && <span className="text-white/80 text-sm ml-1">/yr</span>}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
              <MapPin className="h-3.5 w-3.5 text-gold-500" />
              {property.community ? `${property.community}, ` : ""}{property.city}
            </div>

            <h3 className="text-gray-900 font-semibold text-base mb-1 line-clamp-1 group-hover:text-gold-600 transition-colors">
              {property.title}
            </h3>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{property.description}</p>

            {/* Stats */}
            <div className="flex items-center gap-4 text-gray-500 text-sm border-t border-gray-100 pt-4">
              {property.bedrooms > 0 ? (
                <div className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-gold-500/70" />
                  <span>{property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}</span>
                </div>
              ) : (
                <span className="text-xs text-gray-400 font-medium">Studio</span>
              )}
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-gold-500/70" />
                <span>{property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square className="h-4 w-4 text-gold-500/70" />
                <span>{property.area.toLocaleString()} {property.areaUnit}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
