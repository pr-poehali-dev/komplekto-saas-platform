import Icon from '@/components/ui/icon';
import type { Module } from '@/App';

interface TopBarProps {
  module: string;
  onKomiToggle: () => void;
  onMenuToggle: () => void;
  onNotifToggle: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const moduleNames: Record<string, string> = {
  dashboard: 'Дашборд',
  projects: 'Проекты',
  catalog: 'Каталог',
  specs: 'Спецификации',
  cart: 'Корзина',
  orders: 'Заказы',
  messages: 'Сообщения',
  admin: 'Администрирование',
};

export default function TopBar({ module, onKomiToggle, onMenuToggle, onNotifToggle, searchQuery, onSearchChange }: TopBarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-6 border-b border-k-border bg-k-surface/90 backdrop-blur sticky top-0 z-30">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden w-8 h-8 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center hover:border-k-surface3 transition-colors"
        >
          <Icon name="Menu" size={16} className="text-k-dim" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-k-muted">
          <span className="font-medium">KOMPLEKTO</span>
          <Icon name="ChevronRight" size={12} className="text-k-border" />
          <span className="font-semibold text-k-text">{moduleNames[module] ?? module}</span>
        </div>
        <div className="sm:hidden text-sm font-bold text-k-text">{moduleNames[module] ?? module}</div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-k-muted" />
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Поиск товаров, проектов..."
            className="w-52 pl-9 pr-3 py-1.5 bg-k-surface2 border border-k-border rounded-lg text-xs text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50 focus:w-64 transition-all duration-200"
          />
        </div>

        {/* Mobile search */}
        <button className="md:hidden w-8 h-8 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center">
          <Icon name="Search" size={15} className="text-k-dim" />
        </button>

        {/* Notifications */}
        <button
          onClick={onNotifToggle}
          className="relative w-8 h-8 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center hover:border-k-surface3 transition-colors"
        >
          <Icon name="Bell" size={15} className="text-k-dim" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </button>

        {/* KOMI */}
        <button
          onClick={onKomiToggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500/15 to-orange-400/5 border border-orange-500/25 hover:border-orange-500/50 transition-all"
        >
          <Icon name="Sparkles" size={14} className="text-orange-400" />
          <span className="text-xs font-semibold text-orange-400 hidden sm:inline">KOMI</span>
        </button>
      </div>
    </header>
  );
}
