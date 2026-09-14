import { create } from 'zustand';
import type { Ticket, TicketStatus, FilterState } from '../types/ticket';
import {
  fetchTickets,
  updateTicketStatus,
  addTicketMessage,
} from '../api/ticketsApi';

interface TicketStore {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  filters: FilterState;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  // Actions
  loadTickets: () => Promise<void>;
  setSelectedTicket: (ticket: Ticket | null) => void;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  changeStatus: (id: string, status: TicketStatus) => Promise<void>;
  sendMessage: (id: string, content: string, isInternal?: boolean) => Promise<void>;

  // Computed
  filteredTickets: () => Ticket[];
  stats: () => { total: number; open: number; inProgress: number; resolved: number };
}

const DEFAULT_FILTERS: FilterState = {
  status: 'All',
  priority: 'All',
  searchQuery: '',
};

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [],
  selectedTicket: null,
  filters: { ...DEFAULT_FILTERS },
  isLoading: false,
  isUpdating: false,
  error: null,

  loadTickets: async () => {
    set({ isLoading: true, error: null });
    try {
      const tickets = await fetchTickets();
      set({ tickets, isLoading: false });
    } catch {
      set({ error: 'Failed to load tickets. Please try again.', isLoading: false });
    }
  },

  setSelectedTicket: (ticket: Ticket | null) => set({ selectedTicket: ticket }),

  setFilter: (key: keyof FilterState, value: string) =>
    set((state: TicketStore) => ({ filters: { ...state.filters, [key]: value } })),

  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),

  changeStatus: async (id: string, status: TicketStatus) => {
    set({ isUpdating: true });
    try {
      const updated = await updateTicketStatus(id, status);
      set((state: TicketStore) => ({
        tickets: state.tickets.map((t: Ticket) => (t.id === id ? updated : t)),
        selectedTicket:
          state.selectedTicket?.id === id ? updated : state.selectedTicket,
        isUpdating: false,
      }));
    } catch {
      set({ isUpdating: false });
    }
  },

  sendMessage: async (id: string, content: string, isInternal = false) => {
    set({ isUpdating: true });
    try {
      const newMsg = await addTicketMessage(id, content, isInternal);
      set((state: TicketStore) => {
        const updatedTickets = state.tickets.map((t: Ticket) =>
          t.id === id ? { ...t, messages: [...t.messages, newMsg] } : t
        );
        const updatedSelected =
          state.selectedTicket?.id === id
            ? {
                ...state.selectedTicket,
                messages: [...state.selectedTicket.messages, newMsg],
              }
            : state.selectedTicket;
        return {
          tickets: updatedTickets,
          selectedTicket: updatedSelected,
          isUpdating: false,
        };
      });
    } catch {
      set({ isUpdating: false });
    }
  },

  filteredTickets: () => {
    const { tickets, filters } = get();
    const q = filters.searchQuery.toLowerCase().trim();

    return tickets.filter((ticket: Ticket) => {
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
  },

  stats: () => {
    const { tickets } = get();
    return {
      total: tickets.length,
      open: tickets.filter((t: Ticket) => t.status === 'Open').length,
      inProgress: tickets.filter((t: Ticket) => t.status === 'In Progress').length,
      resolved: tickets.filter((t: Ticket) => t.status === 'Resolved').length,
    };
  },
}));
