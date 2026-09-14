import React from 'react';
import type { TicketPriority } from '../types/ticket';
import { ChevronDown, Minus, ChevronUp } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TicketPriority;
  size?: 'sm' | 'md';
}

const PRIORITY_CONFIG: Record<
  TicketPriority,
  { label: string; bg: string; color: string; border: string; Icon: React.ElementType }
> = {
  Low: {
    label: 'Low',
    bg: '#f3f4f6',
    color: '#374151',
    border: '#e5e7eb',
    Icon: ChevronDown,
  },
  Medium: {
    label: 'Medium',
    bg: '#fffbeb',
    color: '#b45309',
    border: '#fde68a',
    Icon: Minus,
  },
  High: {
    label: 'High',
    bg: '#fef2f2',
    color: '#da291c',
    border: '#fecaca',
    Icon: ChevronUp,
  },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const config = PRIORITY_CONFIG[priority];
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5 gap-1' : 'text-xs px-2.5 py-1 gap-1.5';

  return (
    <span
      style={{ backgroundColor: config.bg, color: config.color, borderColor: config.border }}
      className={`inline-flex items-center rounded-xs font-bold uppercase tracking-[1px] border ${sizeClasses} whitespace-nowrap`}
    >
      <config.Icon className="w-3 h-3" strokeWidth={2.5} style={{ color: config.color }} />
      {config.label}
    </span>
  );
};
