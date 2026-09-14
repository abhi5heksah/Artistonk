import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import {
  X,
  User,
  Mail,
  Phone,
  Globe,
  Tag,
  Calendar,
  Clock,
  MessageSquare,
  Send,
  Lock,
  ChevronDown,
  Ticket,
  ShieldCheck,
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';
import type { Ticket as TicketType, TicketStatus } from '../types/ticket';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';

const STATUS_OPTIONS: TicketStatus[] = ['Open', 'In Progress', 'Resolved'];

const TIER_CONFIG: Record<string, { bg: string; color: string; border: string; icon: React.ElementType }> = {
  Enterprise: {
    bg: '#fef2f2',
    color: '#da291c',
    border: '#fecaca',
    icon: ShieldCheck,
  },
  Pro: {
    bg: '#f0f9ff',
    color: '#0284c7',
    border: '#bae6fd',
    icon: User,
  },
  Starter: {
    bg: '#ecfdf5',
    color: '#059669',
    border: '#a7f3d0',
    icon: User,
  },
  Free: {
    bg: '#f3f4f6',
    color: '#4b5563',
    border: '#e5e7eb',
    icon: User,
  },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

interface DrawerProps {
  ticket: TicketType;
}

const ConversationThread: React.FC<DrawerProps> = ({ ticket }) => {
  const sendMessage = useTicketStore((s) => s.sendMessage);
  const isUpdating = useTicketStore((s) => s.isUpdating);
  const [reply, setReply] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    const trimmed = reply.trim();
    if (!trimmed) return;
    await sendMessage(ticket.id, trimmed, isInternal);
    setReply('');
    setTimeout(() => {
      threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages */}
      <div ref={threadRef} className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        {ticket.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 animate-fade-in ${
              msg.sender === 'agent' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              style={
                msg.sender === 'customer'
                  ? { backgroundColor: '#f3f4f6', color: '#111827' }
                  : { backgroundColor: '#da291c', color: '#ffffff' }
              }
              className="w-7 h-7 rounded-xs flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 border border-gray-200 shadow-xs"
            >
              {getInitials(msg.senderName)}
            </div>

            {/* Bubble */}
            <div className={`max-w-[82%] ${msg.sender === 'agent' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                  {msg.senderName}
                </span>
                {msg.isInternal && (
                  <span
                    style={{ backgroundColor: '#fef3c7', color: '#92400e', borderColor: '#fde68a' }}
                    className="text-[9px] border px-2 py-0.5 rounded-xs flex items-center gap-1 font-bold uppercase tracking-wider"
                  >
                    <Lock className="w-2.5 h-2.5" /> Internal Note
                  </span>
                )}
              </div>
              <div
                style={
                  msg.sender === 'agent'
                    ? msg.isInternal
                      ? { backgroundColor: '#fffbeb', color: '#78350f', borderColor: '#fde68a' }
                      : { backgroundColor: '#181818', color: '#ffffff' }
                    : { backgroundColor: '#f3f4f6', color: '#111827', borderColor: '#e5e7eb' }
                }
                className={`px-3.5 py-2.5 rounded-xs text-sm leading-relaxed border ${
                  msg.sender === 'agent' && !msg.isInternal ? 'border-l-2 border-l-[#da291c]' : ''
                }`}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-gray-400 font-mono">
                {format(new Date(msg.timestamp), 'MMM d, h:mm a')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reply composer */}
      <div className="mt-4 border-t border-gray-200 pt-3 bg-white">
        <div
          className={`rounded-xs border transition-all duration-150 ${
            isInternal
              ? 'border-amber-300 bg-amber-50/40'
              : 'border-gray-300 bg-white focus-within:border-[#da291c]'
          }`}
        >
          <textarea
            id="reply-input"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isInternal
                ? 'Write internal note (visible only to operations team)...'
                : 'Write telemetry response to customer...'
            }
            rows={3}
            className="w-full bg-transparent px-3.5 pt-3 pb-1 text-sm text-gray-950 placeholder-gray-400 resize-none focus:outline-none"
          />
          <div className="flex items-center justify-between px-3 pb-2.5 gap-2">
            <button
              onClick={() => setIsInternal((p) => !p)}
              style={
                isInternal
                  ? { backgroundColor: '#d97706', color: '#ffffff', borderColor: '#b45309' }
                  : { backgroundColor: '#ffffff', color: '#4b5563', borderColor: '#d1d5db' }
              }
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-xs border transition-all duration-150 shadow-xs cursor-pointer"
              id="toggle-internal"
            >
              <Lock className="w-3 h-3" />
              {isInternal ? 'Internal Note' : 'Public Reply'}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-mono hidden sm:block">
                Enter to send, Shift + Enter for new line
              </span>
              <button
                id="send-reply"
                onClick={() => void handleSend()}
                disabled={!reply.trim() || isUpdating}
                className="btn-primary flex items-center gap-1.5 py-2 px-4 disabled:opacity-40 disabled:cursor-not-allowed text-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {isUpdating ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DrawerContent: React.FC<DrawerProps> = ({ ticket }) => {
  const changeStatus = useTicketStore((s) => s.changeStatus);
  const isUpdating = useTicketStore((s) => s.isUpdating);

  const tierConfig = TIER_CONFIG[ticket.customer.tier] ?? TIER_CONFIG.Free;
  const TierIcon = tierConfig.icon;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* Ticket Header */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold tracking-wider" style={{ color: '#da291c' }}>
                  {ticket.id}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500 font-mono uppercase font-semibold">{ticket.category}</span>
              </div>
              <p className="text-lg font-bold text-gray-950 leading-snug tracking-tight">
                {ticket.subject}
              </p>
            </div>
          </div>
          {/* Status + Priority row */}
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={ticket.status} />
            <PriorityBadge priority={ticket.priority} />
            {ticket.assignedTo && (
              <span className="text-xs text-gray-800 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-xs font-mono font-medium">
                OPERATOR: {ticket.assignedTo}
              </span>
            )}
          </div>
        </div>

        {/* Customer Info */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px] mb-3 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-gray-400" />
            Customer Telemetry
          </h3>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xs bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-900 flex-shrink-0 shadow-xs">
              {getInitials(ticket.customer.name)}
            </div>
            <div>
              <div className="text-sm font-bold text-gray-950">{ticket.customer.name}</div>
              {ticket.customer.company && (
                <div className="text-xs text-gray-500">{ticket.customer.company}</div>
              )}
              <span
                style={{ backgroundColor: tierConfig.bg, color: tierConfig.color, borderColor: tierConfig.border }}
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border mt-1.5"
              >
                <TierIcon className="w-3 h-3" />
                {ticket.customer.tier}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-sm text-gray-700">
              <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <a
                href={`mailto:${ticket.customer.email}`}
                className="truncate hover:text-[#da291c] transition-colors font-mono text-xs"
              >
                {ticket.customer.email}
              </a>
            </div>
            {ticket.customer.phone && (
              <div className="flex items-center gap-2.5 text-sm text-gray-700">
                <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="font-mono text-xs">{ticket.customer.phone}</span>
              </div>
            )}
            {ticket.customer.timezone && (
              <div className="flex items-center gap-2.5 text-sm text-gray-700">
                <Globe className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-xs font-mono">{ticket.customer.timezone}</span>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-sm text-gray-700">
              <Tag className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="text-xs font-mono" style={{ color: '#da291c' }}>{ticket.customer.accountRef}</span>
            </div>
          </div>
        </div>

        {/* Ticket Lifecycle & Timestamps */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px] mb-3 flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-gray-400" />
            Lifecycle Configuration
          </h3>

          {/* Status change */}
          <div className="mb-4">
            <label className="text-xs text-gray-700 mb-1.5 block font-bold uppercase tracking-wider">
              Change Status
            </label>
            <div className="relative">
              <select
                id="drawer-status-select"
                value={ticket.status}
                onChange={(e) => void changeStatus(ticket.id, e.target.value as TicketStatus)}
                disabled={isUpdating}
                className="select-field w-full pr-8 disabled:opacity-50 font-bold uppercase tracking-wider text-xs h-10 bg-white border border-gray-300"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s} className="bg-white text-gray-900">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xs p-3 border border-gray-200">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
                <Calendar className="w-3 h-3 text-gray-400" /> Created
              </div>
              <div className="text-xs text-gray-900 font-bold font-mono">
                {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
              </div>
              <div className="text-[10px] text-gray-500 font-mono">
                {format(new Date(ticket.createdAt), 'h:mm a')}
              </div>
            </div>
            <div className="bg-gray-50 rounded-xs p-3 border border-gray-200">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
                <Clock className="w-3 h-3 text-gray-400" /> Updated
              </div>
              <div className="text-xs text-gray-900 font-bold font-mono">
                {format(new Date(ticket.updatedAt), 'MMM d, yyyy')}
              </div>
              <div className="text-[10px] text-gray-500 font-mono">
                {format(new Date(ticket.updatedAt), 'h:mm a')}
              </div>
            </div>
          </div>

          {/* Tags */}
          {ticket.tags && ticket.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {ticket.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-xs text-gray-700 font-mono uppercase font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Issue Description */}
        <div className="p-5 border-b border-gray-200 bg-white">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px] mb-2.5">
            Issue Overview
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
        </div>

        {/* Conversation */}
        <div className="p-5 bg-white" style={{ minHeight: '400px' }}>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[1.4px] mb-4 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
            Activity Log ({ticket.messages.length})
          </h3>
          <ConversationThread ticket={ticket} />
        </div>
      </div>
    </div>
  );
};

export const TicketDetailDrawer: React.FC = () => {
  const selectedTicket = useTicketStore((s) => s.selectedTicket);
  const setSelectedTicket = useTicketStore((s) => s.setSelectedTicket);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTicket(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setSelectedTicket]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (selectedTicket) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTicket]);

  if (!selectedTicket) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs animate-fade-in"
        onClick={() => setSelectedTicket(null)}
        id="drawer-backdrop"
      />

      {/* Drawer panel - 100% Solid Opaque Background */}
      <div
        className="fixed right-0 top-0 h-full z-50 w-full max-w-[620px] bg-white border-l border-gray-200 shadow-2xl animate-slide-in-right flex flex-col"
        id="ticket-detail-drawer"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 flex-shrink-0 bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-5 rounded-xs shadow-glow" style={{ backgroundColor: '#da291c' }} />
            <p className="text-xs font-bold text-gray-950 uppercase tracking-[1.4px]">
              Incident Telemetry & Activity
            </p>
          </div>
          <button
            id="close-drawer"
            onClick={() => setSelectedTicket(null)}
            className="btn-ghost p-1.5 rounded-xs text-gray-400 hover:text-gray-950 hover:bg-gray-100 cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-white">
          <DrawerContent key={selectedTicket.id} ticket={selectedTicket} />
        </div>
      </div>
    </>
  );
};
