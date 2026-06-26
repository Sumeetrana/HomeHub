import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export async function GET(req: NextRequest) {
  const s = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(s.get("page") ?? "1"));
  const limit = 12;
  const where: Record<string, unknown> = { status: "ACTIVE" };

  const q = s.get("q");
  if (q) where.OR = [
    { title: { contains: q, mode: "insensitive" } },
    { city: { contains: q, mode: "insensitive" } },
    { community: { contains: q, mode: "insensitive" } },
    { description: { contains: q, mode: "insensitive" } },
  ];

  const purpose = s.get("purpose");
  if (purpose === "BUY" || purpose === "RENT") where.purpose = purpose;
  const type = s.get("type");
  if (type) where.type = type;
  const city = s.get("city");
  if (city) where.city = { contains: city, mode: "insensitive" };
  if (s.get("featured") === "true") where.featured = true;

  const minPrice = s.get("minPrice"), maxPrice = s.get("maxPrice");
  if (minPrice || maxPrice) where.price = { ...(minPrice ? { gte: parseFloat(minPrice) } : {}), ...(maxPrice ? { lte: parseFloat(maxPrice) } : {}) };

  const bedrooms = s.get("bedrooms");
  if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms) };
  const bathrooms = s.get("bathrooms");
  if (bathrooms) where.bathrooms = { gte: parseInt(bathrooms) };

  const sort = s.get("sort");
  const orderBy = sort === "price_asc" ? { price: "asc" as const } : sort === "price_desc" ? { price: "desc" as const } : { createdAt: "desc" as const };

  const [properties, total] = await Promise.all([
    prisma.property.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit, include: { images: { orderBy: { order: "asc" }, take: 1 }, amenities: { include: { amenity: true }, take: 5 } } }),
    prisma.property.count({ where }),
  ]);

  return NextResponse.json({ properties, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, purpose, type, price, city, community, address, bedrooms, bathrooms, area, areaUnit, parking, yearBuilt, sellerName, sellerPhone, sellerEmail } = body;

    if (!title || !description || !purpose || !type || !price || !city || !address || !sellerName || !area) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!sellerPhone && !sellerEmail) {
      return NextResponse.json({ error: "Provide at least a phone number or email" }, { status: 400 });
    }

    const slug = slugify(title) + "-" + Math.random().toString(36).slice(2, 6);
    const property = await prisma.property.create({
      data: {
        slug, title, description,
        purpose: purpose as "BUY" | "RENT",
        type: type as "APARTMENT" | "VILLA" | "TOWNHOUSE" | "PENTHOUSE" | "STUDIO" | "OFFICE" | "SHOP" | "WAREHOUSE" | "LAND",
        price: parseFloat(price), city, community: community || null, address,
        bedrooms: parseInt(bedrooms) || 0, bathrooms: parseInt(bathrooms) || 1,
        area: parseFloat(area), areaUnit: areaUnit || "sqft",
        parking: parseInt(parking) || 0, yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        sellerName, sellerEmail: sellerEmail || null, sellerPhone: sellerPhone || null, status: "ACTIVE",
      },
    });
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}
