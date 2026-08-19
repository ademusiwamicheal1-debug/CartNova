import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-pulse flex flex-col h-full">
      {/* Image container skeleton */}
      <div className="w-full aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800 mb-3.5 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
      </div>

      {/* Brand & tag skeleton */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3.5 w-16 bg-slate-200 dark:bg-slate-800 rounded-full" />
        <div className="h-3.5 w-20 bg-slate-100 dark:bg-slate-800/60 rounded-full" />
      </div>

      {/* Title skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>

      {/* Rating skeleton */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800/50 rounded" />
      </div>

      {/* Price and button skeleton */}
      <div className="mt-auto pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-3 w-14 bg-slate-100 dark:bg-slate-800/50 rounded" />
        </div>
        <div className="w-9 h-9 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
};

export const FlashDropSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm animate-pulse min-w-[240px] sm:min-w-[260px]">
      <div className="w-full aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800 mb-3" />
      <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded mb-2" />
      <div className="h-5 w-1/2 bg-slate-200 dark:bg-slate-800 rounded mb-3" />
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-2" />
      <div className="h-8 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
    </div>
  );
};

export const BannerSkeleton: React.FC = () => {
  return (
    <div className="w-full h-56 sm:h-80 md:h-96 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
      <div className="p-8 h-full flex flex-col justify-center max-w-lg space-y-4">
        <div className="h-6 w-32 bg-slate-300 dark:bg-slate-700 rounded-full" />
        <div className="h-10 w-full bg-slate-300 dark:bg-slate-700 rounded-xl" />
        <div className="h-4 w-3/4 bg-slate-300 dark:bg-slate-700 rounded-md" />
        <div className="h-12 w-44 bg-slate-300 dark:bg-slate-700 rounded-2xl" />
      </div>
    </div>
  );
};
