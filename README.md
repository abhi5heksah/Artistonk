SupportDesk — Customer Support Dashboard

A simple Customer Support Dashboard app built with React, TypeScript, Tailwind CSS, and Zustand for state management.

What it does

Overview & KPI Cards: Quick stats for total, open, in-progress, and resolved tickets (you can click them to filter the list).

Search & Filters: Search by customer name, email, ticket ID, or subject. Filter by status and priority at the same time.

Ticket List: Mobile-friendly layout that switches from a table on desktop to cards on smaller screens. Includes quick inline status changes.

Ticket Details (Drawer): Click any ticket to open a side drawer showing customer details, tier level, full issue description, message history, and a reply box (supports public replies or internal notes).

Mock Backend: Uses a fake REST API with 12 sample tickets and a simulated 700ms loading delay. Data stays saved in localStorage when you refresh.

Tech Stack

React 18 + Vite 6

TypeScript

Tailwind CSS 3

Zustand 5

Lucide React (icons) & date-fns

Quick Start

Install dependencies:

npm install


Start local server:

npm run dev


Open http://localhost:5173 in your browser.

To build for production:

npm run build
