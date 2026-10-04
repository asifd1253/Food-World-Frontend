import React from "react";

const MenuShimmer = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Restaurant Header Shimmer */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="animate-pulse bg-slate-200 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {/* Restaurant Info */}
              <div className="w-full">
                <div className="h-4 w-48 rounded bg-slate-300"></div>

                <div className="mt-4 h-10 w-80 rounded bg-slate-300"></div>

                <div className="mt-4 h-4 w-full max-w-2xl rounded bg-slate-300"></div>
                <div className="mt-2 h-4 w-2/3 max-w-xl rounded bg-slate-300"></div>
              </div>

              {/* Stats */}
              <div className="grid w-full grid-cols-3 gap-3 md:w-80">
                <div className="h-20 rounded-xl bg-slate-300"></div>
                <div className="h-20 rounded-xl bg-slate-300"></div>
                <div className="h-20 rounded-xl bg-slate-300"></div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 px-6 py-4 sm:px-8">
            <div className="h-7 w-36 animate-pulse rounded-full bg-slate-200"></div>
            <div className="h-7 w-32 animate-pulse rounded-full bg-slate-200"></div>
            <div className="h-7 w-28 animate-pulse rounded-full bg-slate-200"></div>
          </div>
        </section>

        {/* Menu Heading Shimmer */}
        <section className="mt-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="h-4 w-28 animate-pulse rounded bg-slate-200"></div>

              <div className="mt-3 h-8 w-52 animate-pulse rounded bg-slate-200"></div>
            </div>

            <div className="h-4 w-36 animate-pulse rounded bg-slate-200"></div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            {/* Category 1 */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
                <div className="h-6 w-32 animate-pulse rounded bg-slate-200"></div>

                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200"></div>
              </div>

              {/* Food Items */}
              <div className="divide-y divide-slate-100">
                <MenuItemShimmer />
                <MenuItemShimmer />
                <MenuItemShimmer />
              </div>
            </div>

            {/* Category 2 */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
                <div className="h-6 w-40 animate-pulse rounded bg-slate-200"></div>

                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200"></div>
              </div>

              {/* Food Items */}
              <div className="divide-y divide-slate-100">
                <MenuItemShimmer />
                <MenuItemShimmer />
                <MenuItemShimmer />
              </div>
            </div>

            {/* Category 3 */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
                <div className="h-6 w-28 animate-pulse rounded bg-slate-200"></div>

                <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200"></div>
              </div>

              {/* Food Items */}
              <div className="divide-y divide-slate-100">
                <MenuItemShimmer />
                <MenuItemShimmer />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

/* Individual Food Item Shimmer */
const MenuItemShimmer = () => {
  return (
    <div className="flex animate-pulse flex-col gap-5 px-5 py-6 sm:flex-row sm:justify-between sm:px-6">
      {/* Details */}
      <div className="min-w-0 flex-1">
        {/* Veg / Non-Veg */}
        <div className="mb-3 h-5 w-20 rounded bg-slate-200"></div>

        {/* Name */}
        <div className="h-6 w-64 rounded bg-slate-200"></div>

        {/* Price */}
        <div className="mt-3 h-5 w-20 rounded bg-slate-200"></div>

        {/* Rating */}
        <div className="mt-3 h-6 w-16 rounded-full bg-slate-200"></div>

        {/* Description */}
        <div className="mt-4 h-4 w-full max-w-2xl rounded bg-slate-200"></div>
        <div className="mt-2 h-4 w-2/3 max-w-xl rounded bg-slate-200"></div>
      </div>

      {/* Image + Button */}
      <div className="relative h-36 w-full shrink-0 sm:w-40">
        {/* Image */}
        <div className="h-full w-full rounded-xl bg-slate-200"></div>

        {/* ADD Button */}
        <div className="absolute -bottom-4 left-1/2 h-10 w-28 -translate-x-1/2 rounded-xl bg-slate-300"></div>
      </div>
    </div>
  );
};

export default MenuShimmer;
