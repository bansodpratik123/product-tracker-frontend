const LoadingSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <div
      key={index}
      className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 animate-pulse"
    >
      {/* Image Skeleton */}
      <div className="relative mb-4">
        <div className="w-full h-32 bg-slate-700/50 rounded-xl"></div>
        {/* Status Badge Skeleton */}
        <div className="absolute top-3 right-3 w-20 h-6 bg-slate-700/50 rounded-full"></div>
      </div>

      {/* Title Skeleton */}
      <div className="mb-3">
        <div className="h-6 bg-slate-700/50 rounded-lg mb-2"></div>
        <div className="h-4 bg-slate-700/30 rounded-lg w-3/4"></div>
      </div>

      {/* Price Info Skeleton */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 bg-slate-700/30 rounded w-20"></div>
            <div className="h-6 bg-slate-700/50 rounded w-24"></div>
          </div>
          <div className="space-y-2 text-right">
            <div className="h-3 bg-slate-700/30 rounded w-20"></div>
            <div className="h-5 bg-slate-700/50 rounded w-20"></div>
          </div>
        </div>

        {/* Price Difference Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-700/50 rounded"></div>
          <div className="h-4 bg-slate-700/30 rounded w-32"></div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-10 bg-slate-700/50 rounded-lg"></div>
        <div className="w-10 h-10 bg-slate-700/50 rounded-lg"></div>
        <div className="w-10 h-10 bg-slate-700/50 rounded-lg"></div>
      </div>

      {/* Timestamp Skeleton */}
      <div className="pt-3 border-t border-slate-700/50">
        <div className="h-3 bg-slate-700/30 rounded w-24"></div>
      </div>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletonCards}
    </div>
  );
};

export default LoadingSkeleton;