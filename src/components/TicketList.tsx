import React, { useMemo } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { ChevronRight, AlertTriangle, RefreshCw } from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import type { Ticket, TicketStatus } from '../types/ticket';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { EmptyState } from './EmptyState';

const STATUS_OPTIONS: TicketStatus[] = ['Open', 'In Progress', 'Resolved'];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

interface TicketRowProps {
  ticket: Ticket;
}

const TicketRow: React.FC<TicketRowProps> = ({ ticket }) => {
  const setSelectedTicket = useTicketStore((s) => s.setSelectedTicket);
  const changeStatus = useTicketStore((s) => s.changeStatus);
  const isUpdating = useTicketStore((s) => s.isUpdating);

  const initials = getInitials(ticket.customer.name);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const newStatus = e.target.value as TicketStatus;
    void changeStatus(ticket.id, newStatus);
  };

  const relativeTime = formatDistanceToNow(new Date(ticket.createdAt), {
    addSuffix: true,
  });

  const formattedDate = format(new Date(ticket.createdAt), 'MMM d, yyyy');

  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-50/80 transition-colors duration-150 cursor-pointer group animate-fade-in"
      onClick={() => setSelectedTicket(ticket)}
    >
      {/* Customer */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xs bg-gray-100 border border-gray-200 group-hover:border-[#da291c] flex items-center justify-center text-xs font-bold text-gray-900 flex-shrink-0 transition-colors shadow-xs">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-gray-900 group-hover:text-[#da291c] transition-colors truncate">
              {ticket.customer.name}
            </div>
            <div className="text-xs text-gray-500 truncate">{ticket.customer.email}</div>
          </div>
        </div>
      </td>

      {/* Subject */}
      <td className="px-4 py-3.5 max-w-[220px] xl:max-w-xs">
        <div className="text-xs font-mono mb-0.5 font-bold tracking-wider" style={{ color: '#da291c' }}>
          {ticket.id}
        </div>
        <div className="text-sm text-gray-700 truncate group-hover:text-gray-950 transition-colors font-medium">
          {ticket.subject}
        </div>
      </td>

      {/* Priority */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        <PriorityBadge priority={ticket.priority} />
      </td>

      {/* Status */}
      <td className="px-4 py-3.5 hidden sm:table-cell">
        <StatusBadge status={ticket.status} />
      </td>

      {/* Date */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        <div className="text-xs text-gray-900 font-bold font-mono" title={formattedDate}>
          {relativeTime}
        </div>
        <div className="text-[11px] text-gray-500 mt-0.5">{formattedDate}</div>
      </td>

      {/* Quick status change */}
      <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
        <div className="relative inline-block">
          <select
            id={`status-select-${ticket.id}`}
            value={ticket.status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            className="text-xs bg-white hover:bg-gray-50 border border-gray-300 rounded-xs px-3 py-1.5 text-gray-900 focus:outline-none focus:border-[#da291c] cursor-pointer disabled:opacity-50 pr-6 appearance-none transition-all duration-150 uppercase tracking-wider font-bold shadow-xs"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-white text-gray-900">
                {s}
              </option>
            ))}
          </select>
          <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none rotate-90" />
        </div>
      </td>

      {/* Open arrow */}
      <td className="px-3 py-3.5 text-right">
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#da291c] group-hover:translate-x-0.5 transition-all duration-150 inline-block" />
      </td>
    </tr>
  );
};

// Mobile card view
const TicketCard: React.FC<TicketRowProps> = ({ ticket }) => {
  const setSelectedTicket = useTicketStore((s) => s.setSelectedTicket);
  const changeStatus = useTicketStore((s) => s.changeStatus);

  const initials = getInitials(ticket.customer.name);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    void changeStatus(ticket.id, e.target.value as TicketStatus);
  };

  return (
    <div
      className="p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer animate-fade-in"
      onClick={() => setSelectedTicket(ticket)}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xs bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-900 flex-shrink-0 mt-0.5">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-900 truncate">
                {ticket.customer.name}
              </div>
              <div className="text-[11px] font-mono font-bold tracking-wider" style={{ color: '#da291c' }}>
                {ticket.id}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
          </div>
          <p className="text-sm text-gray-700 mb-2.5 line-clamp-2">{ticket.subject}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={ticket.status} size="sm" />
            <PriorityBadge priority={ticket.priority} size="sm" />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[11px] text-gray-500 font-mono">
              {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
            </span>
            <select
              value={ticket.status}
              onChange={handleStatusChange}
              onClick={(e) => e.stopPropagation()}
              className="text-xs bg-white border border-gray-300 rounded-xs px-2.5 py-1 text-gray-900 focus:outline-none cursor-pointer uppercase font-bold shadow-xs"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-white text-gray-900">
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TicketList: React.FC = () => {
  const allTickets = useTicketStore((s) => s.tickets);
  const filters = useTicketStore((s) => s.filters);
  const error = useTicketStore((s) => s.error);
  const loadTickets = useTicketStore((s) => s.loadTickets);

  const q = filters.searchQuery.toLowerCase().trim();

  // Reactively compute filtered tickets when tickets or filters update
  const tickets = useMemo(() => {
    return allTickets.filter((ticket) => {
      const matchStatus =
        filters.status === 'All' || ticket.status === filters.status;
      const matchPriority =
        filters.priority === 'All' || ticket.priority === filters.priority;
      const matchSearch =
        !q ||
        ticket.id.toLowerCase().includes(q) ||
        ticket.subject.toLowerCase().includes(q) ||
        ticket.customer.name.toLowerCase().includes(q) ||
        ticket.customer.email.toLowerCase().includes(q) ||
        ticket.category.toLowerCase().includes(q);
      return matchStatus && matchPriority && matchSearch;
    });
  }, [allTickets, filters.status, filters.priority, q]);

  const hasFilters =
    filters.status !== 'All' ||
    filters.priority !== 'All' ||
    Boolean(filters.searchQuery);

  if (error) {
    return (
      <div className="glass-card flex flex-col items-center justify-center py-16 gap-4 animate-fade-in bg-white">
        <div className="w-14 h-14 bg-red-50 rounded-xs flex items-center justify-center border border-red-200">
          <AlertTriangle className="w-6 h-6" style={{ color: '#da291c' }} />
        </div>
        <div className="text-center">
          <p className="text-gray-900 font-bold mb-1 uppercase tracking-wide">Failed to load telemetry</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
        <button
          onClick={() => void loadTickets()}
          className="btn-secondary flex items-center gap-2"
          id="error-retry"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-slide-in-up bg-white">
      {/* Table header banner */}
      <div className="px-5 py-3.5 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2.5">
          <h2 className="text-xs font-bold text-gray-900 uppercase tracking-[1.4px]">
            Incident Telemetry Queue
          </h2>
          {tickets.length > 0 && (
            <span
              className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-xs text-white shadow-xs"
              style={{ backgroundColor: '#da291c', color: '#ffffff' }}
            >
              {tickets.length}
            </span>
          )}
        </div>
        <div className="text-[11px] text-gray-500 uppercase tracking-wider hidden sm:block font-mono">
          Select incident to inspect telemetry & activity
        </div>
      </div>

      {tickets.length === 0 ? (
        <EmptyState hasFilters={hasFilters} />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px]">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px]">
                    Subject / Telemetry ID
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px] hidden md:table-cell">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px]">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px] hidden lg:table-cell">
                    Created
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px]">
                    Action
                  </th>
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <TicketRow key={ticket.id} ticket={ticket} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
