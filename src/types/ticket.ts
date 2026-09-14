export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';
export type TicketPriority = 'Low' | 'Medium' | 'High';
export type TicketCategory = 'Billing' | 'Technical' | 'Account' | 'Feature Request' | 'General';

export interface Message {
  id: string;
  sender: 'customer' | 'agent';
  senderName: string;
  content: string;
  timestamp: string;
  isInternal?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: 'Enterprise' | 'Pro' | 'Starter' | 'Free';
  accountRef: string;
  phone?: string;
  company?: string;
  timezone?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory;
  customer: Customer;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  tags?: string[];
  assignedTo?: string;
}

export interface FilterState {
  status: TicketStatus | 'All';
  priority: TicketPriority | 'All';
  searchQuery: string;
}
