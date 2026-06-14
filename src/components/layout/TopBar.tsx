import Icon from '@/components/ui/icon';

interface TopBarProps {
  module: string;
  onKomiToggle: () => void;
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

export default function TopBar({ module, onKomiToggle }: TopBarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-k-border bg-k-surface/80 backdrop-blur sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="text-xs text-k-muted font-medium">KOMPLEKTO</div>
        <Icon name="ChevronRight" size={12} className="text-k-border" />
        <div className="text-sm font-semibold text-k-text">{moduleNames[module] ?? module}</div>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-k-muted" />
          <input
            placeholder="Поиск товаров, проектов..."
            className="w-56 pl-9 pr-3 py-1.5 bg-k-surface2 border border-k-border rounded-lg text-xs text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50 focus:w-72 transition-all duration-200"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-k-muted bg-k-surface3 px-1 rounded font-mono hidden">/</kbd>
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center hover:border-k-surface3 transition-colors">
          <Icon name="Bell" size={14} className="text-k-dim" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </button>

        {/* KOMI trigger */}
        <button
          onClick={onKomiToggle}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500/15 to-orange-400/5 border border-orange-500/25 hover:border-orange-500/50 transition-all"
        >
          <Icon name="Sparkles" size={14} className="text-orange-400" />
          <span className="text-xs font-semibold text-orange-400">KOMI</span>
        </button>
      </div>
    </header>
  );
}
