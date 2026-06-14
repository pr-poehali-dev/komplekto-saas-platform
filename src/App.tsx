import { useState, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import KomiPanel from '@/components/KomiPanel';
import Dashboard from '@/components/modules/Dashboard';
import Catalog from '@/components/modules/Catalog';
import Projects from '@/components/modules/Projects';
import Specs from '@/components/modules/Specs';
import Cart from '@/components/modules/Cart';
import Orders from '@/components/modules/Orders';
import Messages from '@/components/modules/Messages';
import Admin from '@/components/modules/Admin';
import NotificationsPanel from '@/components/NotificationsPanel';

export type Module = 'dashboard' | 'projects' | 'catalog' | 'specs' | 'cart' | 'orders' | 'messages' | 'admin';

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [komiOpen, setKomiOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useCallback((module: Module) => {
    setActiveModule(module);
    setSidebarOpen(false);
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard onNavigate={navigate} />;
      case 'projects': return <Projects onNavigate={navigate} />;
      case 'catalog': return <Catalog />;
      case 'specs': return <Specs />;
      case 'cart': return <Cart onNavigate={navigate} />;
      case 'orders': return <Orders />;
      case 'messages': return <Messages />;
      case 'admin': return <Admin />;
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-k-bg text-k-text flex">

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onNavigate={navigate}
          onKomiToggle={() => { setKomiOpen(o => !o); setSidebarOpen(false); }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main */}
        <div className="flex-1 lg:ml-[220px] flex flex-col min-h-screen">
          <TopBar
            module={activeModule}
            onKomiToggle={() => setKomiOpen(o => !o)}
            onMenuToggle={() => setSidebarOpen(o => !o)}
            onNotifToggle={() => setNotifOpen(o => !o)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
            {renderModule()}
          </main>
        </div>

        {/* Panels */}
        <KomiPanel isOpen={komiOpen} onClose={() => setKomiOpen(false)} onNavigate={navigate} />
        <NotificationsPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} onNavigate={navigate} />
      </div>
    </TooltipProvider>
  );
}
