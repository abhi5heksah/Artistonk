import React from 'react';
import { SearchX, FilterX } from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

interface EmptyStateProps {
  hasFilters: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters }) => {
  const resetFilters = useTicketStore((s: { resetFilters: () => void }) => s.resetFilters);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 animate-fade-in bg-white">
      <div className="w-16 h-16 bg-gray-50 rounded-xs flex items-center justify-center mb-4 border border-gray-200">
        {hasFilters ? (
          <FilterX className="w-7 h-7 text-brand-red" />
        ) : (
          <SearchX className="w-7 h-7 text-brand-muted" />
        )}
      </div>
      <h3 className="text-brand-ink font-bold text-lg mb-2 uppercase tracking-wide">
        {hasFilters ? 'No matching incidents' : 'No telemetry data found'}
      </h3>
      <p className="text-brand-muted text-sm text-center max-w-xs mb-5">
        {hasFilters
          ? "Your current telemetry filters didn't return any active incidents. Try adjusting your filter parameters."
          : 'Customer support tickets and telemetry will appear here in real time.'}
      </p>
      {hasFilters && (
        <button
          onClick={resetFilters}
          className="btn-primary flex items-center gap-2"
          id="empty-state-reset-filters"
        >
          <FilterX className="w-4 h-4" />
          Reset Filters
        </button>
      )}
    </div>
  );
};
