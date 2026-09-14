import React from 'react';
import { useTicketStore } from '../store/useTicketStore';
import type { TicketStatus, TicketPriority } from '../types/ticket';
import { Search, ChevronDown, X, SlidersHorizontal } from 'lucide-react';

const STATUS_OPTIONS: Array<{ value: TicketStatus | 'All'; label: string }> = [
  { value: 'All', label: 'All Statuses' },
  { value: 'Open', label: 'Open' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Resolved', label: 'Resolved' },
];

const PRIORITY_OPTIONS: Array<{ value: TicketPriority | 'All'; label: string }> = [
  { value: 'All', label: 'All Priorities' },
  { value: 'High', label: 'High Priority' },
  { value: 'Medium', label: 'Medium Priority' },
  { value: 'Low', label: 'Low Priority' },
];

export const TicketFilters: React.FC = () => {
  const filters = useTicketStore((s) => s.filters);
  const setFilter = useTicketStore((s) => s.setFilter);
  const resetFilters = useTicketStore((s) => s.resetFilters);

  const total = useTicketStore((s) => {
    const q = s.filters.searchQuery.toLowerCase().trim();
    return s.tickets.filter((ticket) => {
      const matchStatus = s.filters.status === 'All' || ticket.status === s.filters.status;
      const matchPriority = s.filters.priority === 'All' || ticket.priority === s.filters.priority;
      const matchSearch =
        !q ||
        ticket.id.toLowerCase().includes(q) ||
        ticket.subject.toLowerCase().includes(q) ||
        ticket.customer.name.toLowerCase().includes(q) ||
        ticket.customer.email.toLowerCase().includes(q);
      return matchStatus && matchPriority && matchSearch;
    }).length;
  });

  const activeFilterCount = [
    filters.status !== 'All' ? 1 : 0,
    filters.priority !== 'All' ? 1 : 0,
    filters.searchQuery ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="glass-card p-3.5 sm:p-4 mb-4 animate-slide-in-up bg-white">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            id="ticket-search"
            type="text"
            placeholder="Search by customer, subject, incident ID..."
            value={filters.searchQuery}
            onChange={(e) => setFilter('searchQuery', e.target.value)}
            className="input-field pl-10 pr-9 h-11 text-sm bg-white text-gray-900 border border-gray-300"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilter('searchQuery', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Status filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              id="filter-status"
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value as TicketStatus | 'All')}
              style={
                filters.status !== 'All'
                  ? { borderColor: '#da291c', backgroundColor: '#fef2f2', color: '#da291c' }
                  : { backgroundColor: '#ffffff', color: '#111827' }
              }
              className="select-field h-11 w-full sm:w-auto pr-8 text-xs uppercase font-bold tracking-wider border border-gray-300"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-white text-gray-900">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
              style={{ color: filters.status !== 'All' ? '#da291c' : '#9ca3af' }}
            />
          </div>

          {/* Priority filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              id="filter-priority"
              value={filters.priority}
              onChange={(e) =>
                setFilter('priority', e.target.value as TicketPriority | 'All')
              }
              style={
                filters.priority !== 'All'
                  ? { borderColor: '#da291c', backgroundColor: '#fef2f2', color: '#da291c' }
                  : { backgroundColor: '#ffffff', color: '#111827' }
              }
              className="select-field h-11 w-full sm:w-auto pr-8 text-xs uppercase font-bold tracking-wider border border-gray-300"
            >
              {PRIORITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-white text-gray-900">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
              style={{ color: filters.priority !== 'All' ? '#da291c' : '#9ca3af' }}
            />
          </div>

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <button
              id="clear-filters"
              onClick={resetFilters}
              style={{ backgroundColor: '#fef2f2', color: '#da291c', borderColor: '#fecaca' }}
              className="flex items-center gap-1.5 h-11 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider border rounded-xs transition-all duration-150 whitespace-nowrap cursor-pointer hover:brightness-95"
            >
              <X className="w-3.5 h-3.5" style={{ color: '#da291c' }} />
              Reset
              <span
                className="w-4 h-4 text-white rounded-xs flex items-center justify-center text-[10px] font-bold font-mono"
                style={{ backgroundColor: '#da291c', color: '#ffffff' }}
              >
                {activeFilterCount}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
        <span>
          Showing <span className="text-gray-950 font-mono font-bold">{total}</span> incident
          {total !== 1 ? 's' : ''}
          {activeFilterCount > 0 ? ' matching active telemetry filters' : ''}
        </span>
      </div>
    </div>
  );
};
