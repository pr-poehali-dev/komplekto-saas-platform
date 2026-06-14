import { useState } from 'react';
import { demoOrders } from '@/data/demo';
import Icon from '@/components/ui/icon';

const statuses = [
  { id: 'all', label: 'Все' },
  { id: 'draft', label: 'Черновик' },
  { id: 'sent', label: 'Отправлен' },
  { id: 'confirmed', label: 'Подтверждён' },
  { id: 'processing', label: 'Обработка' },
  { id: 'shipped', label: 'Отгружен' },
  { id: 'delivered', label: 'Доставлен' },
  { id: 'cancelled', label: 'Отменён' },
];

const statusConfig: Record<string, { label: string; cls: string; dot: string; step: number }> = {
  draft: { label: 'Черновик', cls: 'bg-k-surface3 text-k-muted', dot: 'bg-k-muted', step: 0 },
  sent: { label: 'Отправлен', cls: 'bg-blue-500/10 text-blue-400', dot: 'bg-blue-400', step: 1 },
  confirmed: { label: 'Подтверждён', cls: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-400', step: 2 },
  processing: { label: 'Обработка', cls: 'bg-orange-500/10 text-orange-400', dot: 'bg-orange-400', step: 3 },
  shipped: { label: 'Отгружен', cls: 'bg-purple-500/10 text-purple-400', dot: 'bg-purple-400', step: 4 },
  delivered: { label: 'Доставлен', cls: 'bg-emerald-500/10 text-emerald-400', dot: 'bg-emerald-400', step: 5 },
  cancelled: { label: 'Отменён', cls: 'bg-red-500/10 text-red-400', dot: 'bg-red-400', step: -1 },
};

const timeline = ['Черновик', 'Отправлен', 'Подтверждён', 'Обработка', 'Отгружен', 'Доставлен'];

const formatMoney = (v: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v);

export default function Orders() {
  const [activeStatus, setActiveStatus] = useState('all');
  const [selected, setSelected] = useState<typeof demoOrders[0] | null>(null);

  const filtered = activeStatus === 'all'
    ? demoOrders
    : demoOrders.filter(o => o.status === activeStatus);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-k-text">Заказы</h1>
          <p className="text-sm text-k-muted mt-0.5">{demoOrders.length} заказов · {demoOrders.filter(o => ['processing', 'shipped'].includes(o.status)).length} в пути</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-k-surface border border-k-border text-sm text-k-dim hover:text-k-text transition-colors">
          <Icon name="Download" size={14} />
          Экспорт
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {statuses.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStatus(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeStatus === s.id ? 'bg-orange-500 text-white' : 'bg-k-surface border border-k-border text-k-dim hover:text-k-text'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Orders List */}
        <div className="col-span-2 bg-k-surface border border-k-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-k-border">
                <th className="text-left px-5 py-3 text-[11px] font-medium text-k-muted">ЗАКАЗ</th>
                <th className="text-left px-3 py-3 text-[11px] font-medium text-k-muted">ПРОЕКТ</th>
                <th className="text-left px-3 py-3 text-[11px] font-medium text-k-muted">ПОСТАВЩИК</th>
                <th className="text-right px-3 py-3 text-[11px] font-medium text-k-muted">СУММА</th>
                <th className="text-center px-3 py-3 text-[11px] font-medium text-k-muted">ПОЗИЦИИ</th>
                <th className="text-center px-5 py-3 text-[11px] font-medium text-k-muted">СТАТУС</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const s = statusConfig[order.status];
                const isSelected = selected?.id === order.id;
                return (
                  <tr
                    key={order.id}
                    onClick={() => setSelected(isSelected ? null : order)}
                    className={`border-b border-k-border/50 cursor-pointer transition-colors ${isSelected ? 'bg-orange-500/5' : 'hover:bg-k-surface2/30'}`}
                  >
                    <td className="px-5 py-3.5 text-sm font-mono font-semibold text-orange-400">{order.id}</td>
                    <td className="px-3 py-3.5 text-xs text-k-dim">{order.project}</td>
                    <td className="px-3 py-3.5 text-xs text-k-text">{order.supplier}</td>
                    <td className="px-3 py-3.5 text-sm font-bold text-k-text text-right">{formatMoney(order.amount)}</td>
                    <td className="px-3 py-3.5 text-xs text-k-muted text-center">{order.items}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${s.cls}`}>
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

        {/* Order Detail */}
        <div>
          {selected ? (
            <div className="bg-k-surface border border-k-border rounded-xl animate-fade-in">
              <div className="p-4 border-b border-k-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-base font-bold font-mono text-orange-400">{selected.id}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusConfig[selected.status].cls}`}>
                    {statusConfig[selected.status].label}
                  </span>
                </div>
                <div className="text-xs text-k-muted">{selected.project}</div>
              </div>

              <div className="p-4 space-y-2.5">
                {[
                  { label: 'Поставщик', value: selected.supplier },
                  { label: 'Сумма', value: formatMoney(selected.amount) },
                  { label: 'Позиций', value: `${selected.items} шт` },
                  { label: 'Дата заказа', value: selected.date },
                  { label: 'Доставка', value: selected.eta ?? 'Не указана' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-k-muted">{r.label}</span>
                    <span className="text-xs font-medium text-k-text">{r.value}</span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="p-4 border-t border-k-border">
                <div className="text-[10px] font-semibold text-k-muted uppercase tracking-wide mb-3">Трекинг</div>
                <div className="space-y-0">
                  {timeline.map((step, i) => {
                    const currentStep = statusConfig[selected.status].step;
                    const done = i <= currentStep;
                    const current = i === currentStep;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            done ? 'bg-orange-500 border-orange-500' : 'bg-k-surface2 border-k-border'
                          } ${current ? 'ring-2 ring-orange-500/30' : ''}`}>
                            {done && <Icon name="Check" size={8} className="text-white" />}
                          </div>
                          {i < timeline.length - 1 && (
                            <div className={`w-px h-5 mt-0.5 ${i < currentStep ? 'bg-orange-500/40' : 'bg-k-border'}`} />
                          )}
                        </div>
                        <div className="pb-3">
                          <div className={`text-xs font-medium ${done ? 'text-k-text' : 'text-k-muted'}`}>{step}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-k-surface border border-k-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <Icon name="Package" size={28} className="text-k-muted mb-3" />
              <p className="text-xs text-k-muted">Выберите заказ для просмотра деталей и трекинга</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
