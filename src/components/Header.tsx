import React, { useState, useRef, useEffect } from 'react';
import {
  LifeBuoy,
  Bell,
  Settings,
  X,
  Ticket,
  LogOut,
  ShieldCheck,
  Check,
  Command,
} from 'lucide-react';
import { useTicketStore } from '../store/useTicketStore';

type AgentStatus = 'Active' | 'Away' | 'Busy';

export const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('Active');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const setFilter = useTicketStore((s) => s.setFilter);
  const resetFilters = useTicketStore((s) => s.resetFilters);
  const searchQuery = useTicketStore((s) => s.filters.searchQuery);
  const tickets = useTicketStore((s) => s.tickets);

  // Count tickets assigned to Aarav Sharma
  const myAssignedCount = tickets.filter((t) => t.assignedTo === 'Aarav Sharma').length;

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  const handleFilterMyTickets = () => {
    if (searchQuery === 'Aarav Sharma') {
      resetFilters();
      setStatusMessage('Showing all tickets');
    } else {
      setFilter('searchQuery', 'Aarav Sharma');
      setStatusMessage('Filtered to Aarav Sharma tickets');
    }
    setIsProfileOpen(false);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const handleSignOut = () => {
    setStatusMessage('Demo Mode: Session remains active');
    setTimeout(() => setStatusMessage(null), 3000);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand Title */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-xs flex items-center justify-center shadow-cta flex-shrink-0"
            style={{ backgroundColor: '#da291c' }}
          >
            <LifeBuoy className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-950 leading-none tracking-[1.4px] uppercase">
              SupportDesk
            </p>
            <p className="text-[10px] text-gray-500 mt-1 leading-none font-bold uppercase tracking-[1.2px]">
              Incident Telemetry & Ops
            </p>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2.5">
          {statusMessage && (
            <div
              className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xs text-xs font-bold uppercase tracking-wide animate-fade-in"
              style={{ backgroundColor: '#fef2f2', color: '#da291c', border: '1px solid #fecaca' }}
            >
              <Check className="w-3.5 h-3.5" style={{ color: '#da291c' }} />
              {statusMessage}
            </div>
          )}

          <button
            id="header-notifications"
            className="btn-ghost relative p-2 rounded-xs border border-transparent hover:border-gray-200 hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-gray-600 hover:text-gray-950" />
            <span
              className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#da291c' }}
            />
          </button>

          <button
            id="header-settings"
            className="btn-ghost p-2 rounded-xs border border-transparent hover:border-gray-200 hover:bg-gray-100"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4 text-gray-600 hover:text-gray-950" />
          </button>

          {/* Profile Dropdown Trigger */}
          <div className="relative" ref={profileRef}>
            <button
              id="header-profile-btn"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              style={{ backgroundColor: '#da291c', color: '#ffffff' }}
              className={`relative w-8 h-8 rounded-xs flex items-center justify-center text-xs font-bold text-white flex-shrink-0 cursor-pointer shadow-cta transition-all duration-150 hover:brightness-110 active:scale-95 focus:outline-none ${
                isProfileOpen ? 'ring-2 ring-[#da291c] ring-offset-2 ring-offset-white' : ''
              }`}
              aria-label="Open profile dialog"
              aria-expanded={isProfileOpen}
              aria-haspopup="dialog"
            >
              AS
              {/* Live status dot on avatar */}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
                style={{
                  backgroundColor:
                    agentStatus === 'Active'
                      ? '#059669'
                      : agentStatus === 'Away'
                      ? '#d97706'
                      : '#da291c',
                }}
              />
            </button>

            {/* Profile Dialog / Popover - 100% Solid Opaque Background */}
            {isProfileOpen && (
              <div
                id="profile-dialog"
                role="dialog"
                aria-label="User Profile"
                className="absolute right-0 top-full mt-2 w-80 sm:w-84 z-50 rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-gray-200 animate-fade-in overflow-hidden"
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* Red accent line on top */}
                <div className="h-1 w-full" style={{ backgroundColor: '#da291c' }} />

                {/* Header Profile Info */}
                <div className="p-4 bg-white border-b border-gray-100">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className="w-12 h-12 rounded-xs flex items-center justify-center text-base font-bold text-white shadow-cta"
                          style={{ backgroundColor: '#da291c', color: '#ffffff' }}
                        >
                          AS
                        </div>
                        <span
                          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                          style={{
                            backgroundColor:
                              agentStatus === 'Active'
                                ? '#059669'
                                : agentStatus === 'Away'
                                ? '#d97706'
                                : '#da291c',
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-bold text-gray-950 truncate">Aarav Sharma</p>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#da291c' }} />
                        </div>
                        <p className="text-xs text-gray-500 truncate">aarav.sharma@supportdesk.in</p>
                        <span
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[1px] px-2 py-0.5 rounded-xs mt-1"
                          style={{ backgroundColor: '#fef2f2', color: '#da291c', border: '1px solid #fecaca' }}
                        >
                          <ShieldCheck className="w-2.5 h-2.5" /> Lead Support Engineer
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="text-gray-400 hover:text-gray-950 p-1 rounded-xs hover:bg-gray-100 transition-colors"
                      aria-label="Close dialog"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status Toggle Row */}
                  <div className="mt-3.5 pt-3 border-t border-gray-100">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Availability Status:
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-xs border border-gray-200">
                      {(['Active', 'Away', 'Busy'] as AgentStatus[]).map((status) => {
                        const isSelected = agentStatus === status;
                        return (
                          <button
                            key={status}
                            onClick={() => setAgentStatus(status)}
                            style={
                              isSelected
                                ? status === 'Active'
                                  ? { backgroundColor: '#059669', color: '#ffffff' }
                                  : status === 'Away'
                                  ? { backgroundColor: '#d97706', color: '#ffffff' }
                                  : { backgroundColor: '#da291c', color: '#ffffff' }
                                : { backgroundColor: '#ffffff', color: '#374151' }
                            }
                            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xs text-xs font-bold transition-all shadow-xs border border-gray-200 cursor-pointer"
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: isSelected
                                  ? '#ffffff'
                                  : status === 'Active'
                                  ? '#059669'
                                  : status === 'Away'
                                  ? '#d97706'
                                  : '#da291c',
                              }}
                            />
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Quick Performance Metrics */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white p-2 rounded-xs border border-gray-200 shadow-xs">
                      <div className="text-base font-bold text-gray-950 font-mono">{myAssignedCount}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Assigned</div>
                    </div>
                    <div className="bg-white p-2 rounded-xs border border-gray-200 shadow-xs">
                      <div className="text-base font-bold font-mono" style={{ color: '#059669' }}>98%</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">CSAT</div>
                    </div>
                    <div className="bg-white p-2 rounded-xs border border-gray-200 shadow-xs">
                      <div className="text-base font-bold text-gray-950 font-mono">12m</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Avg Time</div>
                    </div>
                  </div>
                </div>

                {/* Action Menu */}
                <div className="p-2 space-y-1 bg-white">
                  <button
                    onClick={handleFilterMyTickets}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-bold text-gray-900 hover:bg-gray-100 rounded-xs transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Ticket className="w-4 h-4" style={{ color: '#da291c' }} />
                      <span className="uppercase tracking-wide">
                        {searchQuery === 'Aarav Sharma' ? 'Show All Tickets' : 'My Assigned Tickets'}
                      </span>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-xs text-white text-[10px] font-bold font-mono shadow-xs"
                      style={{ backgroundColor: '#da291c' }}
                    >
                      {myAssignedCount}
                    </span>
                  </button>

                  <div className="flex items-center justify-between px-3 py-2 text-xs font-medium text-gray-600 rounded-xs">
                    <div className="flex items-center gap-2.5">
                      <Command className="w-4 h-4 text-gray-400" />
                      <span>Quick Search</span>
                    </div>
                    <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded-xs border border-gray-200 font-mono">
                      / or Tab
                    </span>
                  </div>
                </div>

                {/* Footer / Sign Out */}
                <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={handleSignOut}
                    style={{ color: '#da291c' }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold hover:bg-red-50 rounded-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                  <span className="text-[10px] text-gray-500 font-mono">OPS CONSOLE v2.4</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
