export type Role = "USER" | "AGENT" | "ADMIN";
export type PropertyPurpose = "BUY" | "RENT";
export type PropertyStatus = "ACTIVE" | "PENDING" | "SOLD" | "RENTED" | "REJECTED";
export type PropertyType =
  | "APARTMENT"
  | "VILLA"
  | "TOWNHOUSE"
  | "PENTHOUSE"
  | "STUDIO"
  | "OFFICE"
  | "SHOP"
  | "WAREHOUSE"
  | "LAND";

export interface AgentProfile {
  id: string;
  userId: string;
  bio?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  agency?: string | null;
  licenseNo?: string | null;
  yearsExp: number;
  languages: string[];
  specialties: string[];
  avatar?: string | null;
  coverImage?: string | null;
  rating: number;
  reviewCount: number;
  totalSales: number;
  verified: boolean;
  slug: string;
  user: { name?: string | null; email: string; image?: string | null };
}

export interface PropertyImage {
  id: string;
  url: string;
  alt?: string | null;
  isPrimary: boolean;
  order: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  address: string;
  city: string;
  community?: string | null;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  floor?: number | null;
  parking: number;
  yearBuilt?: number | null;
  views: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  images: PropertyImage[];
  amenities: { amenity: { id: string; name: string; icon?: string | null; category?: string | null } }[];
  agent?: AgentProfile | null;
  agentId?: string | null;
}

export interface SearchFilters {
  q?: string;
  purpose?: PropertyPurpose;
  type?: PropertyType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  sort?: "newest" | "price_asc" | "price_desc";
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
  propertyId?: string | null;
  agentId?: string | null;
  createdAt: string;
  property?: { title: string; slug: string } | null;
}
