const LoadingSkeleton = () => {
  const skeletonCards = Array.from({ length: 4 }, (_, index) => (
    <div
      key={index}
      className="backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 animate-pulse mb-4"
    >
      <div className="flex gap-6">
        {/* Image Skeleton - Left Side */}
        <div className="flex-shrink-0 relative">
          <div className="w-48 h-36 bg-slate-700/50 rounded-xl"></div>
          {/* Status Badge Skeleton */}
          <div className="absolute -top-2 -right-2 w-20 h-6 bg-slate-700/50 rounded-full"></div>
        </div>

        {/* Content Skeleton - Right Side */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-4">
            {/* Title Skeleton */}
            <div className="flex-1 pr-4">
              <div className="h-6 bg-slate-700/50 rounded-lg mb-2"></div>
              <div className="h-4 bg-slate-700/30 rounded-lg w-3/4"></div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg"></div>
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg"></div>
              <div className="w-8 h-8 bg-slate-700/50 rounded-lg"></div>
            </div>
          </div>

          {/* Price Information Row Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Current Price */}
            <div>
              <div className="h-3 bg-slate-700/30 rounded w-20 mb-1"></div>
              <div className="h-6 bg-slate-700/50 rounded w-24"></div>
            </div>

            {/* Target Price */}
            <div>
              <div className="h-3 bg-slate-700/30 rounded w-20 mb-1"></div>
              <div className="h-5 bg-slate-700/50 rounded w-20"></div>
            </div>

            {/* Price Difference */}
            <div>
              <div className="h-3 bg-slate-700/30 rounded w-16 mb-1"></div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-slate-700/50 rounded"></div>
                <div className="h-4 bg-slate-700/30 rounded w-16"></div>
              </div>
            </div>
          </div>

          {/* Status Message Skeleton */}
          <div className="mb-4">
            <div className="h-4 bg-slate-700/30 rounded w-48"></div>
          </div>

          {/* Timestamp and URL Skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-700/50 gap-2">
            <div className="h-3 bg-slate-700/30 rounded w-24"></div>
            <div className="h-3 bg-slate-700/30 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="space-y-0">
      {skeletonCards}
    </div>
  );
};

export default LoadingSkeleton;