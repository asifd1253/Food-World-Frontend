const HomeShimmer = () => {
  return (
    <div className="m-4 w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-md">
      {/* Image Skeleton */}
      <div className="h-40 w-full animate-pulse rounded-lg bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="mt-3 px-1">
        {/* Restaurant Name */}
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200"></div>

        {/* Cuisines */}
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-200"></div>
        <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-gray-200"></div>

        {/* Rating + Delivery */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-7 w-14 animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
        </div>

        {/* Cost */}
        <div className="mt-3 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default HomeShimmer;
