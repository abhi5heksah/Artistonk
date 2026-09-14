import React from 'react';
import type { TicketStatus } from '../types/ticket';
import { AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

interface StatusBadgeProps {
  status: TicketStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; bg: string; color: string; border: string; dotColor: string; Icon: React.ElementType }
> = {
  Open: {
    label: 'Open',
    bg: '#fef2f2',
    color: '#da291c',
    border: '#fecaca',
    dotColor: '#da291c',
    Icon: AlertCircle,
  },
  'In Progress': {
    label: 'In Progress',
    bg: '#f0f9ff',
    color: '#0284c7',
    border: '#bae6fd',
    dotColor: '#0284c7',
    Icon: Clock,
  },
  Resolved: {
    label: 'Resolved',
    bg: '#ecfdf5',
    color: '#059669',
    border: '#a7f3d0',
    dotColor: '#059669',
    Icon: CheckCircle2,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = STATUS_CONFIG[status];
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5 gap-1.5' : 'text-xs px-2.5 py-1 gap-2';

  return (
    <span
      style={{ backgroundColor: config.bg, color: config.color, borderColor: config.border }}
      className={`inline-flex items-center rounded-xs font-bold uppercase tracking-[1px] border ${sizeClasses} whitespace-nowrap`}
    >
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: config.dotColor }} />
      {config.label}
    </span>
  );
};
