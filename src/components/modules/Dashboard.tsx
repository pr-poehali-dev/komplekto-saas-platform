import { statCards, demoProjects, demoOrders } from '@/data/demo';
import Icon from '@/components/ui/icon';

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  active: { label: 'Активен', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  planning: { label: 'Планирование', color: 'text-blue-400', dot: 'bg-blue-400' },
  completed: { label: 'Завершён', color: 'text-k-muted', dot: 'bg-k-muted' },
  shipped: { label: 'Отгружен', color: 'text-blue-400', dot: 'bg-blue-400' },
  confirmed: { label: 'Подтверждён', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  processing: { label: 'В обработке', color: 'text-orange-400', dot: 'bg-orange-400' },
  draft: { label: 'Черновик', color: 'text-k-muted', dot: 'bg-k-muted' },
  delivered: { label: 'Доставлен', color: 'text-emerald-400', dot: 'bg-emerald-400' },
};

const formatMoney = (v: number) => {
  if (v >= 1_000_000) return `₽${(v / 1_000_000).toFixed(1)}М`;
  if (v >= 1_000) return `₽${(v / 1_000).toFixed(0)}К`;
  return `₽${v}`;
};

const activity = [
  { text: 'Заказ ORD-2401 отгружен поставщиком СантехГрупп', time: '10 мин назад', icon: 'Package', color: 'text-blue-400' },
  { text: 'KOMI сэкономил ₽420К на альтернативной плитке', time: '1 час назад', icon: 'Sparkles', color: 'text-orange-400' },
  { text: 'Новый проект «Апартаменты Sky» создан', time: '2 часа назад', icon: 'Layers', color: 'text-emerald-400' },
  { text: 'Спецификация санузла согласована', time: '3 часа назад', icon: 'FileText', color: 'text-purple-400' },
  { text: 'Поставщик LightPro предложил скидку 5%', time: 'вчера', icon: 'Tag', color: 'text-emerald-400' },
];

const notifications = [
  { text: 'Заказ ORD-2401 будет доставлен 20 января', type: 'info', time: '10 мин' },
  { text: 'Бюджет проекта «Офис Meridian» превышен на 8%', type: 'warn', time: '1 ч' },
  { text: 'Новое предложение от ПлиткаМаркет (-12%)', type: 'success', time: '2 ч' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-k-text">Дашборд</h1>
          <p className="text-sm text-k-muted mt-0.5">Добрый день, Алексей. Вот сводка по вашим проектам.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-k-muted font-mono">14 января 2024</div>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
            <Icon name="Plus" size={14} />
            Новый проект
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-k-surface rounded-xl p-4 border border-k-border hover-lift">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Icon name={card.icon} size={16} className="text-orange-400" fallback="Circle" />
              </div>
              <span className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${
                card.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' :
                card.trend === 'down' ? 'bg-red-500/10 text-red-400' :
                'bg-k-surface2 text-k-muted'
              }`}>{card.change}</span>
            </div>
            <div className="text-2xl font-bold text-k-text">{card.value}</div>
            <div className="text-xs text-k-muted mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Active Projects */}
        <div className="col-span-2 bg-k-surface rounded-xl border border-k-border">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-k-border">
            <h2 className="text-sm font-semibold text-k-text">Активные проекты</h2>
            <button className="text-xs text-orange-400 hover:text-orange-300">Все проекты →</button>
          </div>
          <div className="divide-y divide-k-border">
            {demoProjects.slice(0, 4).map((p) => {
              const s = statusConfig[p.status];
              return (
                <div key={p.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-k-surface2/50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center flex-shrink-0">
                    <Icon name="Building2" size={16} className="text-k-dim" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-k-text truncate">{p.name}</span>
                      <span className={`text-[10px] font-medium flex items-center gap-1 ${s.color}`}>
                        <span className={`status-dot ${s.dot}`} />
                        {s.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-k-muted">{p.type}</span>
                      <span className="text-xs text-k-muted">•</span>
                      <span className="text-xs text-k-muted">{p.city}</span>
                      <span className="text-xs text-k-muted">•</span>
                      <span className="text-xs text-k-muted">{p.rooms} комнат</span>
                    </div>
                    <div className="mt-2 h-1 bg-k-surface3 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-k-text">{formatMoney(p.budget)}</div>
                    <div className="text-xs text-k-muted mt-0.5">{p.progress}% выполнено</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-k-surface rounded-xl border border-k-border">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-k-border">
            <h2 className="text-sm font-semibold text-k-text">Уведомления</h2>
            <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-medium">3</span>
          </div>
          <div className="p-3 space-y-2">
            {notifications.map((n, i) => (
              <div key={i} className={`p-3 rounded-lg border text-xs ${
                n.type === 'warn' ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-300' :
                n.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300' :
                'bg-blue-500/5 border-blue-500/20 text-blue-300'
              }`}>
                <div className="leading-relaxed">{n.text}</div>
                <div className="text-[10px] mt-1 opacity-60">{n.time} назад</div>
              </div>
            ))}
          </div>

          {/* KOMI Tip */}
          <div className="mx-3 mb-3 p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-400/5 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-1.5">
              <Icon name="Sparkles" size={12} className="text-orange-400" />
              <span className="text-[10px] font-semibold text-orange-400">KOMI рекомендует</span>
            </div>
            <p className="text-[11px] text-k-dim leading-relaxed">
              Найдены более дешёвые альтернативы по плитке для ЖК Авангард. Экономия до ₽84К.
            </p>
            <button className="mt-2 text-[10px] font-medium text-orange-400 hover:text-orange-300">
              Посмотреть →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="col-span-2 bg-k-surface rounded-xl border border-k-border">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-k-border">
            <h2 className="text-sm font-semibold text-k-text">Последние заказы</h2>
            <button className="text-xs text-orange-400 hover:text-orange-300">Все заказы →</button>
          </div>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-k-border">
                  <th className="text-left px-5 py-2.5 text-[11px] font-medium text-k-muted">ЗАКАЗ</th>
                  <th className="text-left px-3 py-2.5 text-[11px] font-medium text-k-muted">ПРОЕКТ</th>
                  <th className="text-left px-3 py-2.5 text-[11px] font-medium text-k-muted">ПОСТАВЩИК</th>
                  <th className="text-right px-3 py-2.5 text-[11px] font-medium text-k-muted">СУММА</th>
                  <th className="text-center px-5 py-2.5 text-[11px] font-medium text-k-muted">СТАТУС</th>
                </tr>
              </thead>
              <tbody>
                {demoOrders.slice(0, 5).map((o) => {
                  const s = statusConfig[o.status];
                  return (
                    <tr key={o.id} className="border-b border-k-border/50 hover:bg-k-surface2/30 transition-colors">
                      <td className="px-5 py-3 text-sm font-mono text-orange-400">{o.id}</td>
                      <td className="px-3 py-3 text-xs text-k-dim">{o.project}</td>
                      <td className="px-3 py-3 text-xs text-k-text">{o.supplier}</td>
                      <td className="px-3 py-3 text-sm font-semibold text-k-text text-right">{formatMoney(o.amount)}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          o.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400' :
                          o.status === 'shipped' ? 'bg-blue-500/10 text-blue-400' :
                          o.status === 'processing' ? 'bg-orange-500/10 text-orange-400' :
                          o.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                          'bg-k-surface3 text-k-muted'
                        }`}>
                          <span className={`status-dot ${s.dot}`} />
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-k-surface rounded-xl border border-k-border">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-k-border">
            <h2 className="text-sm font-semibold text-k-text">Активность</h2>
          </div>
          <div className="p-3 space-y-0">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3 py-2.5">
                <div className="relative flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-k-surface2 border border-k-border flex items-center justify-center">
                    <Icon name={a.icon} size={11} className={a.color} fallback="Circle" />
                  </div>
                  {i < activity.length - 1 && (
                    <div className="absolute top-6 left-3 w-px h-full bg-k-border" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-2">
                  <p className="text-[11px] text-k-dim leading-relaxed">{a.text}</p>
                  <p className="text-[10px] text-k-muted mt-1">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
