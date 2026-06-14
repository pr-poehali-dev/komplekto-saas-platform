import Icon from '@/components/ui/icon';
import type { Module } from '@/App';

interface SidebarProps {
  activeModule: string;
  onNavigate: (module: Module) => void;
  onKomiToggle: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: Module; label: string; icon: string; badge?: string }[] = [
  { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
  { id: 'projects', label: 'Проекты', icon: 'Layers' },
  { id: 'catalog', label: 'Каталог', icon: 'Grid3X3' },
  { id: 'specs', label: 'Спецификации', icon: 'FileText' },
  { id: 'cart', label: 'Корзина', icon: 'ShoppingCart', badge: '5' },
  { id: 'orders', label: 'Заказы', icon: 'Package' },
  { id: 'messages', label: 'Сообщения', icon: 'MessageSquare', badge: '3' },
];

const bottomItems: { id: Module; label: string; icon: string }[] = [
  { id: 'admin', label: 'Администрирование', icon: 'Shield' },
];

export default function Sidebar({ activeModule, onNavigate, onKomiToggle, isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`
      w-[220px] min-h-screen flex flex-col bg-k-surface border-r border-k-border
      fixed left-0 top-0 z-50 transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0
    `}>
      {/* Logo */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-k-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md komi-gradient flex items-center justify-center">
            <span className="text-white font-bold text-xs">K</span>
          </div>
          <span className="font-bold text-[15px] tracking-tight text-white">KOMPLEKTO</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden w-7 h-7 rounded-lg bg-k-surface2 flex items-center justify-center"
        >
          <Icon name="X" size={14} className="text-k-dim" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                active
                  ? 'bg-orange-500/15 text-orange-400 font-medium'
                  : 'text-k-dim hover:text-k-text hover:bg-k-surface2'
              }`}
            >
              <Icon name={item.icon} size={16} className={active ? 'text-orange-400' : 'text-k-muted group-hover:text-k-dim'} fallback="Circle" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${active ? 'bg-orange-500 text-white' : 'bg-k-surface3 text-k-dim'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* KOMI Button */}
      <div className="px-2 pb-2">
        <button
          onClick={onKomiToggle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-orange-500/20 to-orange-400/10 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-200"
        >
          <div className="w-5 h-5 rounded komi-gradient flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={11} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <div className="text-xs font-semibold text-orange-400">KOMI AI</div>
            <div className="text-[10px] text-k-muted">Закупочный ассистент</div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 pulse-orange"></div>
        </button>
      </div>

      <div className="border-t border-k-border mx-2 my-1" />

      {/* Bottom */}
      <div className="px-2 pb-2 space-y-0.5">
        {bottomItems.map((item) => {
          const active = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                active ? 'bg-orange-500/15 text-orange-400' : 'text-k-muted hover:text-k-text hover:bg-k-surface2'
              }`}
            >
              <Icon name={item.icon} size={16} fallback="Circle" />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* User */}
        <button className="w-full flex items-center gap-2.5 px-3 py-2 mt-1 rounded-lg hover:bg-k-surface2 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            АК
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="text-xs font-medium text-k-text truncate">Алексей Козлов</div>
            <div className="text-[10px] text-k-muted">PRO · 4%</div>
          </div>
          <Icon name="ChevronUp" size={14} className="text-k-muted" />
        </button>
      </div>
    </aside>
  );
}
