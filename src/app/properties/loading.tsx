import { PropertyCardSkeleton } from "@/components/ui/Skeleton";

export default function PropertiesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding pt-12">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-9 w-64 bg-gray-200 rounded-xl animate-pulse mb-2" />
          <div className="h-5 w-32 bg-gray-100 rounded-lg animate-pulse" />
        </div>

        {/* Filter bar skeleton */}
        <div className="mb-10 h-14 bg-white rounded-2xl border border-gray-100 animate-pulse" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
