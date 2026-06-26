export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom section-padding pt-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="aspect-[16/9] bg-gray-200 rounded-2xl animate-pulse" />

            {/* Title */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="h-8 w-3/4 bg-gray-200 rounded-xl animate-pulse" />
              <div className="h-5 w-1/2 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-10 w-48 bg-gray-200 rounded-xl animate-pulse" />
            </div>

            {/* Details card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-5" />
              <div className="grid grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                    <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Description card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse mx-auto mb-3" />
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-1" />
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mx-auto mb-6" />
              <div className="space-y-3">
                <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
                <div className="h-12 bg-emerald-100 rounded-xl animate-pulse" />
                <div className="h-12 bg-gold-100 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
