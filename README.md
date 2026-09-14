# SupportDesk — Customer Support Dashboard

A modern, responsive **Customer Support Dashboard** built with **React + TypeScript**, **Tailwind CSS**, and **Zustand** for state management.

## 🚀 Live Demo

> Deploy to Vercel/Netlify after running `npm run build` and uploading the `dist/` folder.

---

## ✨ Features

### Dashboard
- **KPI Stats Cards** — Total, Open, In Progress, and Resolved ticket counts that also act as **click-to-filter** shortcuts
- **Real-time Search** — Instantly search across customer name, email, ticket ID (`#TK-1001`), and subject
- **Multi-criteria Filtering** — Filter by Status and Priority simultaneously with active filter badges
- **Responsive Ticket List** — Desktop table view + mobile card layout
- **Inline Status Updates** — Change ticket status directly from the list without opening the detail view

### Ticket Details (Slide-over Drawer)
- Full **Customer Information** — Name, company, email, phone, timezone, account tier (Enterprise / Pro / Starter / Free)
- **Ticket Metadata** — Status (editable inline), priority, category, timestamps, tags
- **Full Issue Description** — Detailed description of the initial complaint or request
- **Conversation Thread** — Chronological message history with distinct customer/agent bubbles
- **Reply Composer** — Post a new **Public Reply** or **Internal Note** directly into the ticket thread
- **Keyboard navigation** — Press `Esc` to dismiss the drawer

### State & API
- **Zustand** store for all application state
- **Mock REST API** (`src/api/ticketsApi.ts`) with realistic 700ms simulated network delay
- **12 pre-seeded tickets** spanning diverse categories: Billing, Technical, Account, Feature Requests, General
- **localStorage persistence** — ticket states and replies persist across page reloads
- **Loading, error, and empty states** handled gracefully

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3 | Styling |
| Zustand | 5 | State management |
| Lucide React | latest | Icons |
| date-fns | latest | Date formatting |
| Vite | 6 | Build tool |

---

## 📦 Setup Instructions

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone or navigate to the project directory
cd support-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

The production bundle will be in the `dist/` folder, ready to deploy to any static hosting platform (Vercel, Netlify, GitHub Pages, etc.).

---

## 🏗 Project Structure

```
src/
├── api/
│   └── ticketsApi.ts      # Mock REST API with 12 seeded tickets
├── components/
│   ├── Header.tsx          # Top navigation bar
│   ├── StatsCards.tsx      # KPI metric cards (click-to-filter)
│   ├── TicketFilters.tsx   # Search + filter bar
│   ├── TicketList.tsx      # Responsive ticket list (table + cards)
│   ├── TicketDetailDrawer.tsx  # Slide-over detail panel
│   ├── StatusBadge.tsx     # Reusable status badge
│   ├── PriorityBadge.tsx   # Reusable priority badge
│   ├── LoadingSkeleton.tsx # Shimmer loading state
│   └── EmptyState.tsx      # Empty/no-results state
├── store/
│   └── useTicketStore.ts   # Zustand store (all state + actions)
├── types/
│   └── ticket.ts           # TypeScript interfaces
├── App.tsx                 # Root component
├── main.tsx                # Application entry point
└── index.css               # Global styles + Tailwind directives
```

---

## 🎨 Design Decisions

- **Glassmorphism dark theme** — `bg-slate-950` base with `glass-card` utility for frosted panels
- **Slide-over drawer** — Industry-standard SaaS pattern (Intercom, Linear, Zendesk) that lets agents inspect full threads while maintaining list context
- **Gradient avatars** — Color-coded by first letter of customer name for quick visual identification
- **Glow dots** on status badges for immediate status recognition at a glance
- **Mobile-first** — Switches from table to card layout at `sm` breakpoint (640px)
- **Inter font** from Google Fonts for clean, modern SaaS typography

---

## 📋 Remaining / Future Improvements

Given more time, I would add:
- Ticket creation form (new ticket modal)
- Pagination / infinite scroll for large ticket volumes
- Sort controls (by date, priority, status)
- Real backend API integration (REST/GraphQL)
- Email notification simulation
- Dark/light theme toggle
- Agent assignment functionality
- Ticket analytics / trend charts

---

## 👤 Author

Built as a technical assessment submission.
