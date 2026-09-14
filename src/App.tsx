import { useEffect } from 'react';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { TicketFilters } from './components/TicketFilters';
import { TicketList } from './components/TicketList';
import { TicketDetailDrawer } from './components/TicketDetailDrawer';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { useTicketStore } from './store/useTicketStore';

function App() {
  const loadTickets = useTicketStore((s) => s.loadTickets);
  const isLoading = useTicketStore((s) => s.isLoading);

  useEffect(() => {
    void loadTickets();
  }, [loadTickets]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-canvas text-brand-ink">
      <Header />

      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Page title with high-performance telemetry header */}
        <div className="mb-6 border-b border-brand-hairline pb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-xs shadow-glow" />
            <span className="text-[11px] font-bold text-brand-red uppercase tracking-[1.4px]">
              Live Telemetry & Incident Ops
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-ink uppercase tracking-[1px]">
              Customer Support Console
            </h1>
            <p className="text-xs text-brand-muted font-mono">
              STATUS: <span className="text-accent-green font-bold">ONLINE</span> • 99.98% SLA
            </p>
          </div>
          <p className="text-sm text-brand-body mt-1 max-w-2xl">
            Real-time ticket lifecycle management, customer communications, and resolution telemetry.
          </p>
        </div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <StatsCards />
            <TicketFilters />
            <TicketList />
          </>
        )}
      </main>

      <TicketDetailDrawer />
    </div>
  );
}

export default App;
