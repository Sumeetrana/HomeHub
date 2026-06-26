interface PropertyJsonLdProps {
  property: {
    title: string;
    description: string;
    price: number;
    currency: string;
    purpose: string;
    address: string;
    city: string;
    country: string;
    images: { url: string }[];
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: string;
  };
}

export default function PropertyJsonLd({ property }: PropertyJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    image: property.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability:
        property.purpose === "RENT"
          ? "https://schema.org/InStock"
          : "https://schema.org/InStock",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressCountry: property.country,
    },
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "FTK",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
