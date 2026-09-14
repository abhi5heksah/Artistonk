import React from 'react';
import { Ticket, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import type { TicketStatus, FilterState } from '../types/ticket';

interface StatCardProps {
  id: string;
  label: string;
  value: number;
  Icon: React.ElementType;
  iconBgClass: string;
  iconColor: string;
  valueColor: string;
  filter: TicketStatus | 'All';
  subtitle: string;
}

const StatCard: React.FC<StatCardProps> = ({
  id,
  label,
  value,
  Icon,
  iconBgClass,
  iconColor,
  valueColor,
  filter,
  subtitle,
}) => {
  const filters = useTicketStore((s: { filters: FilterState }) => s.filters);
  const setFilter = useTicketStore((s: { setFilter: (k: keyof FilterState, v: string) => void }) => s.setFilter);
  const resetFilters = useTicketStore((s: { resetFilters: () => void }) => s.resetFilters);

  const isActive = filters.status === filter;

  const handleClick = () => {
    if (filter === 'All') {
      // Switching to Total Incidents shows all tickets
      setFilter('status', 'All');
    } else {
      if (isActive) {
        // Toggle off back to All
        resetFilters();
      } else {
        setFilter('status', filter);
      }
    }
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      style={
        isActive
          ? { borderColor: '#da291c', backgroundColor: '#fef2f2' }
          : { backgroundColor: '#ffffff' }
      }
      className={`p-5 text-left w-full transition-all duration-200 group rounded-xs relative overflow-hidden border shadow-xs cursor-pointer active:scale-[0.99]
        ${
          isActive
            ? 'border-2 shadow-md'
            : 'border-gray-200 hover:border-gray-400 hover:shadow-card-hover'
        }`}
    >
      {/* Top red accent line when active */}
      {isActive && <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: '#da291c' }} />}

      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-9 h-9 ${iconBgClass} rounded-xs border border-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          <Icon className="w-4 h-4" style={{ color: iconColor }} strokeWidth={2.2} />
        </div>
        {isActive && (
          <span
            className="text-[9px] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-xs text-white shadow-xs"
            style={{ backgroundColor: '#da291c', color: '#ffffff' }}
          >
            Active Filter
          </span>
        )}
      </div>

      <div
        className="text-3xl sm:text-4xl font-bold font-mono mb-1 transition-all duration-300 tracking-tight"
        style={{ color: valueColor }}
      >
        {value}
      </div>
      <div className="text-[11px] font-bold text-gray-700 uppercase tracking-[1.4px] mb-0.5">
        {label}
      </div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </button>
  );
};

export const StatsCards: React.FC = () => {
  const total = useTicketStore((s) => s.tickets.length);
  const open = useTicketStore((s) => s.tickets.filter((t) => t.status === 'Open').length);
  const inProgress = useTicketStore((s) => s.tickets.filter((t) => t.status === 'In Progress').length);
  const resolved = useTicketStore((s) => s.tickets.filter((t) => t.status === 'Resolved').length);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 animate-slide-in-up">
      <StatCard
        id="stat-total"
        label="Total Incidents"
        value={total}
        Icon={Ticket}
        iconBgClass="bg-gray-100"
        iconColor="#111827"
        valueColor="#111827"
        filter="All"
        subtitle="Full operational queue (All)"
      />
      <StatCard
        id="stat-open"
        label="Open"
        value={open}
        Icon={AlertCircle}
        iconBgClass="bg-red-50"
        iconColor="#da291c"
        valueColor="#da291c"
        filter="Open"
        subtitle="Unresolved / Pending response"
      />
      <StatCard
        id="stat-in-progress"
        label="In Progress"
        value={inProgress}
        Icon={Clock}
        iconBgClass="bg-sky-50"
        iconColor="#0284c7"
        valueColor="#0284c7"
        filter="In Progress"
        subtitle="Under investigation"
      />
      <StatCard
        id="stat-resolved"
        label="Resolved"
        value={resolved}
        Icon={CheckCircle2}
        iconBgClass="bg-emerald-50"
        iconColor="#059669"
        valueColor="#059669"
        filter="Resolved"
        subtitle="Successfully closed"
      />
    </div>
  );
};
