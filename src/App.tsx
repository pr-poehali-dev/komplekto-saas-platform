import { useState } from 'react';
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

export default function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [komiOpen, setKomiOpen] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard />;
      case 'projects': return <Projects />;
      case 'catalog': return <Catalog />;
      case 'specs': return <Specs />;
      case 'cart': return <Cart />;
      case 'orders': return <Orders />;
      case 'messages': return <Messages />;
      case 'admin': return <Admin />;
      default: return <Dashboard />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="min-h-screen bg-k-bg text-k-text flex">
        <Sidebar
          activeModule={activeModule}
          onNavigate={setActiveModule}
          onKomiToggle={() => setKomiOpen(o => !o)}
        />
        <div className="flex-1 ml-[220px] flex flex-col min-h-screen">
          <TopBar module={activeModule} onKomiToggle={() => setKomiOpen(o => !o)} />
          <main className="flex-1 p-6 overflow-y-auto">
            {renderModule()}
          </main>
        </div>
        <KomiPanel isOpen={komiOpen} onClose={() => setKomiOpen(false)} />
      </div>
    </TooltipProvider>
  );
}
