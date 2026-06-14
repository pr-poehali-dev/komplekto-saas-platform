import Icon from '@/components/ui/icon';

const gmvData = [42, 58, 71, 65, 89, 94, 78, 102, 115, 98, 134, 147];
const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

const topSuppliers = [
  { name: 'СантехГрупп', gmv: 12400000, orders: 234, rating: 4.8 },
  { name: 'LightPro', gmv: 9800000, orders: 189, rating: 4.9 },
  { name: 'ПлиткаМаркет', gmv: 8200000, orders: 156, rating: 4.6 },
  { name: 'МебельОпт', gmv: 6700000, orders: 98, rating: 4.3 },
  { name: 'КухниПро', gmv: 5400000, orders: 72, rating: 4.5 },
];

const recentUsers = [
  { name: 'Алексей Козлов', role: 'Архитектор', level: 'PRO', date: '2024-01-14', projects: 4 },
  { name: 'Мария Соколова', role: 'Дизайнер', level: 'EXPERT', date: '2024-01-13', projects: 8 },
  { name: 'Дмитрий Петров', role: 'Застройщик', level: 'ELITE', date: '2024-01-12', projects: 23 },
  { name: 'Анна Новикова', role: 'Закупщик', level: 'START', date: '2024-01-11', projects: 2 },
  { name: 'Сергей Волков', role: 'Дизайнер', level: 'PRO', date: '2024-01-10', projects: 6 },
];

const levelCls: Record<string, string> = {
  START: 'bg-k-surface3 text-k-muted',
  PRO: 'bg-blue-500/10 text-blue-400',
  EXPERT: 'bg-purple-500/10 text-purple-400',
  ELITE: 'bg-orange-500/10 text-orange-400',
};

const formatMoney = (v: number) =>
  v >= 1_000_000 ? `₽${(v / 1_000_000).toFixed(1)}М` : `₽${(v / 1000).toFixed(0)}К`;

const maxGmv = Math.max(...gmvData);

export default function Admin() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Icon name="Shield" size={12} className="text-orange-400" />
            </div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Admin Panel</span>
          </div>
          <h1 className="text-2xl font-bold text-k-text">Администрирование</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-k-surface border border-k-border text-sm text-k-dim">
            <Icon name="RefreshCw" size={13} />
            Обновить
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'GMV (месяц)', value: '₽147М', change: '+23%', icon: 'TrendingUp', up: true },
          { label: 'Выручка', value: '₽5.9М', change: '+18%', icon: 'Wallet', up: true },
          { label: 'Заказов', value: '1 284', change: '+31%', icon: 'Package', up: true },
          { label: 'Средний чек', value: '₽114К', change: '+8%', icon: 'BarChart3', up: true },
          { label: 'Пользователей', value: '3 847', change: '+156', icon: 'Users', up: true },
        ].map((k, i) => (
          <div key={i} className="bg-k-surface border border-k-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={k.icon} size={14} className="text-k-muted" fallback="Circle" />
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${k.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {k.change}
              </span>
            </div>
            <div className="text-xl font-bold text-k-text">{k.value}</div>
            <div className="text-[10px] text-k-muted mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* GMV Chart */}
        <div className="col-span-2 bg-k-surface border border-k-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-k-text">GMV по месяцам</h3>
            <span className="text-xs text-k-muted">2024</span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {gmvData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-orange-600 to-orange-400 transition-all hover:from-orange-500 hover:to-orange-300 cursor-pointer relative group"
                  style={{ height: `${(v / maxGmv) * 100}%`, minHeight: '4px' }}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-k-surface2 border border-k-border rounded px-1.5 py-0.5 text-[10px] text-k-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    ₽{v}М
                  </div>
                </div>
                <span className="text-[9px] text-k-muted">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-3">
          <div className="bg-k-surface border border-k-border rounded-xl p-4">
            <h3 className="text-xs font-semibold text-k-dim mb-3 uppercase tracking-wide">Уровни пользователей</h3>
            {[
              { level: 'ELITE', count: 84, pct: 2, fee: '12%' },
              { level: 'EXPERT', count: 412, pct: 11, fee: '8%' },
              { level: 'PRO', count: 1124, pct: 29, fee: '4%' },
              { level: 'START', count: 2227, pct: 58, fee: '2%' },
            ].map((l, i) => (
              <div key={i} className="mb-2.5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${levelCls[l.level]}`}>{l.level}</span>
                    <span className="text-[10px] text-k-muted">{l.fee}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-k-text">{l.count}</span>
                </div>
                <div className="h-1 bg-k-surface3 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-orange-500/60" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-k-surface border border-k-border rounded-xl p-4">
            <h3 className="text-xs font-semibold text-k-dim mb-2 uppercase tracking-wide">Быстрые действия</h3>
            <div className="space-y-1.5">
              {[
                { label: 'Управление пользователями', icon: 'Users' },
                { label: 'Модерация товаров', icon: 'Package' },
                { label: 'Управление поставщиками', icon: 'Store' },
                { label: 'Настройки категорий', icon: 'Grid3X3' },
              ].map((a, i) => (
                <button key={i} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-k-surface2 hover:bg-k-surface3 text-xs text-k-dim hover:text-k-text transition-colors text-left">
                  <Icon name={a.icon} size={13} className="text-k-muted" fallback="Circle" />
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Top Suppliers */}
        <div className="bg-k-surface border border-k-border rounded-xl">
          <div className="px-5 py-3.5 border-b border-k-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-k-text">Топ поставщики</h3>
            <button className="text-xs text-orange-400">Все →</button>
          </div>
          <div>
            {topSuppliers.map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 border-b border-k-border/50 hover:bg-k-surface2/30 transition-colors">
                <div className="w-5 h-5 rounded-full bg-k-surface2 border border-k-border flex items-center justify-center text-[10px] font-bold text-k-muted">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-k-text">{s.name}</div>
                  <div className="text-[10px] text-k-muted">{s.orders} заказов · ★ {s.rating}</div>
                </div>
                <div className="text-sm font-bold text-k-text">{formatMoney(s.gmv)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-k-surface border border-k-border rounded-xl">
          <div className="px-5 py-3.5 border-b border-k-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-k-text">Пользователи</h3>
            <button className="text-xs text-orange-400">Все →</button>
          </div>
          <div>
            {recentUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 border-b border-k-border/50 hover:bg-k-surface2/30 transition-colors">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-400">
                  {u.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-k-text">{u.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${levelCls[u.level]}`}>{u.level}</span>
                  </div>
                  <div className="text-[10px] text-k-muted">{u.role} · {u.projects} проектов</div>
                </div>
                <div className="text-[10px] text-k-muted">{u.date.split('-').reverse().slice(0, 2).join('.')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
