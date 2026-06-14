import { useState } from 'react';
import { demoOrders } from '@/data/demo';
import Icon from '@/components/ui/icon';

const statuses = [
  { id: 'all', label: 'Все' },
  { id: 'draft', label: 'Черновик' },
  { id: 'confirmed', label: 'Подтверждён' },
  { id: 'processing', label: 'Обработка' },
  { id: 'shipped', label: 'Отгружен' },
  { id: 'delivered', label: 'Доставлен' },
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
  const [showDetail, setShowDetail] = useState(false);

  const filtered = activeStatus === 'all'
    ? demoOrders
    : demoOrders.filter(o => o.status === activeStatus);

  const handleExport = () => {
    const csv = [
      ['ID', 'Проект', 'Поставщик', 'Сумма', 'Статус', 'Дата'].join(','),
      ...filtered.map(o => [o.id, o.project, o.supplier, o.amount, statusConfig[o.status].label, o.date].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'orders.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 lg:space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-k-text">Заказы</h1>
          <p className="text-xs lg:text-sm text-k-muted mt-0.5">
            {demoOrders.length} заказов · {demoOrders.filter(o => ['processing', 'shipped'].includes(o.status)).length} в пути
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-k-surface border border-k-border text-sm text-k-dim hover:text-k-text transition-colors"
        >
          <Icon name="Download" size={14} />
          <span className="hidden sm:inline">Экспорт CSV</span>
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {statuses.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveStatus(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeStatus === s.id ? 'bg-orange-500 text-white' : 'bg-k-surface border border-k-border text-k-dim hover:text-k-text'
            }`}
          >
            {s.label}
            {s.id !== 'all' && (
              <span className="ml-1.5 opacity-60">{demoOrders.filter(o => o.status === s.id).length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Orders List / Cards */}
        <div className={`${selected && !showDetail ? 'lg:col-span-2' : 'lg:col-span-2'} space-y-2 lg:space-y-0 lg:bg-k-surface lg:border lg:border-k-border lg:rounded-xl lg:overflow-hidden`}>
          {/* Desktop table header */}
          <div className="hidden lg:grid grid-cols-12 gap-0 border-b border-k-border">
            <div className="col-span-2 px-5 py-3 text-[11px] font-medium text-k-muted">ЗАКАЗ</div>
            <div className="col-span-3 px-3 py-3 text-[11px] font-medium text-k-muted">ПРОЕКТ</div>
            <div className="col-span-3 px-3 py-3 text-[11px] font-medium text-k-muted">ПОСТАВЩИК</div>
            <div className="col-span-2 px-3 py-3 text-[11px] font-medium text-k-muted text-right">СУММА</div>
            <div className="col-span-2 px-3 py-3 text-[11px] font-medium text-k-muted text-center">СТАТУС</div>
          </div>

          {filtered.map((order) => {
            const s = statusConfig[order.status];
            const isSelected = selected?.id === order.id;

            return (
              <div key={order.id}>
                {/* Desktop row */}
                <div
                  onClick={() => { setSelected(isSelected ? null : order); setShowDetail(true); }}
                  className={`hidden lg:grid grid-cols-12 gap-0 border-b border-k-border/50 cursor-pointer transition-colors ${isSelected ? 'bg-orange-500/5' : 'hover:bg-k-surface2/30'}`}
                >
                  <div className="col-span-2 px-5 py-3.5 text-sm font-mono font-semibold text-orange-400">{order.id}</div>
                  <div className="col-span-3 px-3 py-3.5 text-xs text-k-dim">{order.project}</div>
                  <div className="col-span-3 px-3 py-3.5 text-xs text-k-text">{order.supplier}</div>
                  <div className="col-span-2 px-3 py-3.5 text-sm font-bold text-k-text text-right">{formatMoney(order.amount)}</div>
                  <div className="col-span-2 px-3 py-3.5 flex items-center justify-center">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${s.cls}`}>
                      <span className={`status-dot ${s.dot}`} />
                      {s.label}
                    </span>
                  </div>
                </div>

                {/* Mobile card */}
                <div
                  onClick={() => { setSelected(order); setShowDetail(true); }}
                  className={`lg:hidden bg-k-surface border rounded-xl p-4 cursor-pointer transition-all ${isSelected ? 'border-orange-500/40' : 'border-k-border hover:border-k-surface3'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono font-bold text-orange-400">{order.id}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${s.cls}`}>
                      <span className={`status-dot ${s.dot}`} />
                      {s.label}
                    </span>
                  </div>
                  <div className="text-xs text-k-text font-medium mb-0.5">{order.supplier}</div>
                  <div className="text-xs text-k-muted">{order.project}</div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-k-border">
                    <span className="text-xs text-k-muted">{order.items} позиций · {order.date}</span>
                    <span className="text-sm font-bold text-k-text">{formatMoney(order.amount)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Detail */}
        <div className="hidden lg:block">
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
                  { label: 'Дата', value: selected.date },
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
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${done ? 'bg-orange-500 border-orange-500' : 'bg-k-surface2 border-k-border'} ${current ? 'ring-2 ring-orange-500/30' : ''}`}>
                            {done && <Icon name="Check" size={8} className="text-white" />}
                          </div>
                          {i < timeline.length - 1 && <div className={`w-px h-5 mt-0.5 ${i < currentStep ? 'bg-orange-500/40' : 'bg-k-border'}`} />}
                        </div>
                        <div className="pb-3">
                          <div className={`text-xs font-medium ${done ? 'text-k-text' : 'text-k-muted'}`}>{step}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selected.status === 'draft' && (
                <div className="p-4 border-t border-k-border">
                  <button className="w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors">
                    Отправить поставщику
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-k-surface border border-k-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <Icon name="Package" size={28} className="text-k-muted mb-3" />
              <p className="text-xs text-k-muted">Выберите заказ для просмотра деталей и трекинга</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Order Detail Modal */}
      {selected && showDetail && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-k-surface border-t border-k-border rounded-t-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-k-border">
              <div>
                <span className="text-base font-bold font-mono text-orange-400">{selected.id}</span>
                <div className="text-xs text-k-muted">{selected.project}</div>
              </div>
              <button onClick={() => setShowDetail(false)} className="w-8 h-8 rounded-lg bg-k-surface2 flex items-center justify-center">
                <Icon name="X" size={15} className="text-k-dim" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {[
                { label: 'Поставщик', value: selected.supplier },
                { label: 'Сумма', value: formatMoney(selected.amount) },
                { label: 'Позиций', value: `${selected.items} шт` },
                { label: 'Дата', value: selected.date },
                { label: 'Доставка', value: selected.eta ?? 'Не указана' },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-k-border/50">
                  <span className="text-xs text-k-muted">{r.label}</span>
                  <span className="text-xs font-semibold text-k-text">{r.value}</span>
                </div>
              ))}
              <div className="pt-2">
                <div className="text-xs font-semibold text-k-dim mb-3 uppercase tracking-wide">Трекинг</div>
                <div className="flex items-center gap-1">
                  {timeline.map((step, i) => {
                    const currentStep = statusConfig[selected.status].step;
                    const done = i <= currentStep;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${done ? 'bg-orange-500 border-orange-500' : 'bg-k-surface2 border-k-border'}`}>
                          {done && <Icon name="Check" size={9} className="text-white" />}
                        </div>
                        <span className="text-[9px] text-k-muted text-center leading-tight">{step.split(' ')[0]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
