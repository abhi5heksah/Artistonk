import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-5 bg-white">
            <div className="skeleton-line h-3 w-20 mb-3 rounded-xs" />
            <div className="skeleton-line h-8 w-14 mb-2 rounded-xs" />
            <div className="skeleton-line h-2.5 w-28 rounded-xs" />
          </div>
        ))}
      </div>

      {/* Filter skeleton */}
      <div className="glass-card p-4 mb-4 bg-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="skeleton-line h-11 flex-1 rounded-xs" />
          <div className="skeleton-line h-11 w-32 rounded-xs" />
          <div className="skeleton-line h-11 w-32 rounded-xs" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="glass-card overflow-hidden bg-white">
        <div className="p-4 border-b border-brand-hairline bg-gray-50">
          <div className="skeleton-line h-4 w-36 rounded-xs" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-4 border-b border-brand-hairline last:border-0 bg-white"
          >
            <div className="skeleton-line h-9 w-9 rounded-xs flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="skeleton-line h-3.5 w-36 mb-2 rounded-xs" />
              <div className="skeleton-line h-3 w-52 rounded-xs" />
            </div>
            <div className="hidden md:flex gap-2">
              <div className="skeleton-line h-6 w-20 rounded-xs" />
              <div className="skeleton-line h-6 w-20 rounded-xs" />
            </div>
            <div className="hidden lg:block">
              <div className="skeleton-line h-3 w-24 rounded-xs" />
            </div>
            <div className="skeleton-line h-7 w-28 rounded-xs" />
          </div>
        ))}
      </div>
    </div>
  );
};
