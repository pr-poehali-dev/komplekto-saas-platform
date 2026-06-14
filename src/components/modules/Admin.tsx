import { useState } from 'react';
import Icon from '@/components/ui/icon';

const gmvData = [42, 58, 71, 65, 89, 94, 78, 102, 115, 98, 134, 147];
const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

const topSuppliers = [
  { name: 'СантехГрупп', gmv: 12400000, orders: 234, rating: 4.8, verified: true },
  { name: 'LightPro', gmv: 9800000, orders: 189, rating: 4.9, verified: true },
  { name: 'ПлиткаМаркет', gmv: 8200000, orders: 156, rating: 4.6, verified: true },
  { name: 'МебельОпт', gmv: 6700000, orders: 98, rating: 4.3, verified: false },
  { name: 'КухниПро', gmv: 5400000, orders: 72, rating: 4.5, verified: true },
];

const recentUsers = [
  { name: 'Алексей Козлов', role: 'Архитектор', level: 'PRO', date: '14.06', projects: 4 },
  { name: 'Мария Соколова', role: 'Дизайнер', level: 'EXPERT', date: '13.06', projects: 8 },
  { name: 'Дмитрий Петров', role: 'Застройщик', level: 'ELITE', date: '12.06', projects: 23 },
  { name: 'Анна Новикова', role: 'Закупщик', level: 'START', date: '11.06', projects: 2 },
  { name: 'Сергей Волков', role: 'Дизайнер', level: 'PRO', date: '10.06', projects: 6 },
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
const adminSections = ['Пользователи', 'Поставщики', 'Товары', 'Категории', 'Заказы', 'Спецификации'];

export default function Admin() {
  const [activeSection, setActiveSection] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="space-y-4 lg:space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Icon name="Shield" size={12} className="text-orange-400" />
            </div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Admin</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-k-text">Администрирование</h1>
        </div>
        <button
          onClick={() => showToast('Данные обновлены')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-k-surface border border-k-border text-sm text-k-dim hover:text-k-text transition-colors"
        >
          <Icon name="RefreshCw" size={13} />
          <span className="hidden sm:inline">Обновить</span>
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: 'GMV (месяц)', value: '₽147М', change: '+23%', icon: 'TrendingUp' },
          { label: 'Выручка', value: '₽5.9М', change: '+18%', icon: 'Wallet' },
          { label: 'Заказов', value: '1 284', change: '+31%', icon: 'Package' },
          { label: 'Средний чек', value: '₽114К', change: '+8%', icon: 'BarChart3' },
          { label: 'Пользователей', value: '3 847', change: '+156', icon: 'Users' },
        ].map((k, i) => (
          <div key={i} className="bg-k-surface border border-k-border rounded-xl p-3 lg:p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name={k.icon} size={14} className="text-k-muted" fallback="Circle" />
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400">{k.change}</span>
            </div>
            <div className="text-lg lg:text-xl font-bold text-k-text">{k.value}</div>
            <div className="text-[10px] text-k-muted mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* GMV Chart */}
        <div className="lg:col-span-2 bg-k-surface border border-k-border rounded-xl p-4 lg:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-k-text">GMV по месяцам</h3>
            <span className="text-xs text-k-muted">2026</span>
          </div>
          <div className="flex items-end gap-1.5 lg:gap-2 h-28 lg:h-36">
            {gmvData.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 cursor-pointer relative group transition-colors"
                  style={{ height: `${(v / maxGmv) * 100}%`, minHeight: '4px' }}
                  title={`₽${v}М`}
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-k-surface2 border border-k-border rounded px-1.5 py-0.5 text-[10px] text-k-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    ₽{v}М
                  </div>
                </div>
                <span className="text-[8px] lg:text-[9px] text-k-muted">{months[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right col */}
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
            <h3 className="text-xs font-semibold text-k-dim mb-2 uppercase tracking-wide">Управление</h3>
            <div className="grid grid-cols-2 gap-1.5">
              {adminSections.map((section) => (
                <button
                  key={section}
                  onClick={() => { setActiveSection(section); showToast(`Раздел «${section}» открыт`); }}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs transition-all text-left ${
                    activeSection === section
                      ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                      : 'bg-k-surface2 hover:bg-k-surface3 text-k-dim hover:text-k-text border border-transparent'
                  }`}
                >
                  <Icon name="ChevronRight" size={10} className={activeSection === section ? 'text-orange-400' : 'text-k-muted'} />
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-k-surface border border-k-border rounded-xl">
          <div className="px-4 lg:px-5 py-3.5 border-b border-k-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-k-text">Топ поставщики</h3>
            <button onClick={() => showToast('Открываю всех поставщиков')} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">Все →</button>
          </div>
          <div>
            {topSuppliers.map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-4 lg:px-5 py-3 border-b border-k-border/50 hover:bg-k-surface2/30 transition-colors">
                <div className="w-5 h-5 rounded-full bg-k-surface2 border border-k-border flex items-center justify-center text-[10px] font-bold text-k-muted flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-k-text truncate">{s.name}</span>
                    {s.verified && <Icon name="BadgeCheck" size={11} className="text-blue-400 flex-shrink-0" />}
                  </div>
                  <div className="text-[10px] text-k-muted">{s.orders} заказов · ★ {s.rating}</div>
                </div>
                <div className="text-sm font-bold text-k-text flex-shrink-0">{formatMoney(s.gmv)}</div>
                <button
                  onClick={() => showToast(`Управление: ${s.name}`)}
                  className="w-6 h-6 rounded-md hover:bg-k-surface3 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Icon name="MoreHorizontal" size={13} className="text-k-muted" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-k-surface border border-k-border rounded-xl">
          <div className="px-4 lg:px-5 py-3.5 border-b border-k-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-k-text">Пользователи</h3>
            <button onClick={() => showToast('Открываю всех пользователей')} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">Все →</button>
          </div>
          <div>
            {recentUsers.map((u, i) => (
              <div key={i} className="flex items-center gap-3 px-4 lg:px-5 py-3 border-b border-k-border/50 hover:bg-k-surface2/30 transition-colors">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-400 flex-shrink-0">
                  {u.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-k-text truncate">{u.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${levelCls[u.level]}`}>{u.level}</span>
                  </div>
                  <div className="text-[10px] text-k-muted">{u.role} · {u.projects} проектов</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] text-k-muted">{u.date}</div>
                  <button
                    onClick={() => showToast(`Профиль: ${u.name}`)}
                    className="text-[10px] text-orange-400 hover:text-orange-300 mt-0.5 transition-colors"
                  >
                    Открыть
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-k-surface border border-k-border text-k-text text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl animate-slide-up z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
