import { useState } from 'react';
import { demoCart } from '@/data/demo';
import Icon from '@/components/ui/icon';
import type { Module } from '@/App';

interface CartProps {
  onNavigate: (m: Module) => void;
}

const formatMoney = (v: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v);

export default function Cart({ onNavigate }: CartProps) {
  const [items, setItems] = useState(demoCart);
  const [step, setStep] = useState<'cart' | 'confirm' | 'success'>('cart');
  const [project, setProject] = useState('ЖК Авангард');

  const suppliers = [...new Set(items.map(i => i.supplier))];
  const total = items.reduce((s, i) => s + i.total, 0);

  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQty = Math.max(1, i.qty + delta);
      return { ...i, qty: newQty, total: newQty * i.price };
    }));
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-scale-in">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
          <Icon name="CheckCircle" size={32} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-k-text mb-2">Заказы размещены!</h2>
        <p className="text-sm text-k-muted mb-1">Создано {suppliers.length} заказа по поставщикам</p>
        <p className="text-xs text-k-muted mb-6">Отслеживайте статусы в разделе «Заказы»</p>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('orders')}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors"
          >
            Перейти к заказам
          </button>
          <button
            onClick={() => { setStep('cart'); setItems(demoCart); }}
            className="px-6 py-2.5 rounded-xl bg-k-surface border border-k-border text-k-dim text-sm hover:text-k-text transition-colors"
          >
            Вернуться в корзину
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-k-text">Корзина</h1>
          <p className="text-xs lg:text-sm text-k-muted mt-0.5">
            {items.length} товаров · {suppliers.length} поставщика
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Icon name="Sparkles" size={13} className="text-orange-400" />
          <span className="text-xs text-emerald-400 font-medium">KOMI: экономия ₽184К</span>
        </div>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {['Корзина', 'Подтверждение', 'Размещено'].map((s, i) => {
          const stepMap = ['cart', 'confirm', 'success'];
          const active = stepMap[i] === step;
          const done = stepMap.indexOf(step) > i;
          return (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 text-xs font-medium ${active ? 'text-orange-400' : done ? 'text-emerald-400' : 'text-k-muted'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${active ? 'bg-orange-500 text-white' : done ? 'bg-emerald-500 text-white' : 'bg-k-surface2 border border-k-border'}`}>
                  {done ? <Icon name="Check" size={10} /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < 2 && <div className={`w-8 h-px ${done ? 'bg-emerald-500/40' : 'bg-k-border'}`} />}
            </div>
          );
        })}
      </div>

      {step === 'cart' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Items by supplier */}
          <div className="lg:col-span-2 space-y-4">
            {suppliers.map((supplier) => {
              const supplierItems = items.filter(i => i.supplier === supplier);
              const supplierTotal = supplierItems.reduce((s, i) => s + i.total, 0);
              return (
                <div key={supplier} className="bg-k-surface border border-k-border rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 lg:px-5 py-3 bg-k-surface2 border-b border-k-border">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-k-surface3 border border-k-border flex items-center justify-center">
                        <Icon name="Store" size={13} className="text-k-dim" />
                      </div>
                      <span className="text-sm font-semibold text-k-text">{supplier}</span>
                      <span className="text-[10px] bg-k-surface3 text-k-dim px-1.5 py-0.5 rounded-full">{supplierItems.length} тов.</span>
                    </div>
                    <span className="text-sm font-bold text-k-text">{formatMoney(supplierTotal)}</span>
                  </div>
                  <div className="divide-y divide-k-border/50">
                    {supplierItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-3.5">
                        <div className="w-9 h-9 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center flex-shrink-0">
                          <Icon name="Package" size={15} className="text-k-muted" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs lg:text-sm font-medium text-k-text truncate">{item.product}</div>
                          <div className="text-xs text-k-muted mt-0.5">{formatMoney(item.price)} / шт · {item.delivery}</div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-k-surface2 border border-k-border flex items-center justify-center hover:border-orange-500/30 transition-colors"
                          >
                            <Icon name="Minus" size={10} className="text-k-dim" />
                          </button>
                          <span className="text-sm font-mono text-k-text w-7 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-k-surface2 border border-k-border flex items-center justify-center hover:border-orange-500/30 transition-colors"
                          >
                            <Icon name="Plus" size={10} className="text-k-dim" />
                          </button>
                        </div>
                        <div className="text-sm font-bold text-k-text w-24 text-right hidden sm:block">{formatMoney(item.total)}</div>
                        <button onClick={() => removeItem(item.id)} className="w-6 h-6 rounded-md hover:bg-red-500/10 flex items-center justify-center transition-colors group flex-shrink-0">
                          <Icon name="Trash2" size={12} className="text-k-muted group-hover:text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => onNavigate('catalog')}
              className="w-full py-3 rounded-xl border border-dashed border-k-border text-xs text-k-muted hover:border-orange-500/30 hover:text-orange-400 transition-all flex items-center justify-center gap-2"
            >
              <Icon name="Plus" size={13} />
              Добавить товары из каталога
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-3">
            <div className="bg-k-surface border border-k-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-k-text mb-3">Проект</h3>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full px-3 py-2 bg-k-surface2 border border-k-border rounded-lg text-xs text-k-text focus:outline-none focus:border-orange-500/50 mb-4"
              >
                <option>ЖК Авангард</option>
                <option>Офис Meridian</option>
                <option>Апартаменты Sky</option>
                <option>Отель Grand</option>
              </select>

              <h3 className="text-sm font-semibold text-k-text mb-3">Сводка</h3>
              <div className="space-y-2">
                {suppliers.map((s) => {
                  const t = items.filter(i => i.supplier === s).reduce((sum, i) => sum + i.total, 0);
                  return (
                    <div key={s} className="flex items-center justify-between">
                      <span className="text-xs text-k-muted truncate">{s}</span>
                      <span className="text-xs font-medium text-k-text ml-2 flex-shrink-0">{formatMoney(t)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="my-3 border-t border-k-border" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-k-text">Итого</span>
                <span className="text-lg font-bold text-k-text">{formatMoney(total)}</span>
              </div>
              <button
                onClick={() => setStep('confirm')}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
              >
                Оформить заказы
              </button>
              <p className="text-[10px] text-k-muted text-center mt-2">Заказы разделятся по поставщикам</p>
            </div>

            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Sparkles" size={13} className="text-orange-400" />
                <span className="text-xs font-semibold text-orange-400">KOMI нашёл экономию</span>
              </div>
              <p className="text-[11px] text-k-dim leading-relaxed">Замена плитки сэкономит ещё ₽84 000 без потери качества</p>
              <button
                onClick={() => onNavigate('catalog')}
                className="mt-2 text-xs text-orange-400 hover:text-orange-300 font-medium"
              >
                Посмотреть альтернативы →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Confirm step */
        <div className="max-w-lg mx-auto animate-fade-in">
          <div className="bg-k-surface border border-k-border rounded-2xl p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <Icon name="ClipboardList" size={20} className="text-orange-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-k-text">Подтверждение заказов</h2>
                <p className="text-xs text-k-muted">Проект: {project} · {suppliers.length} поставщика</p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {suppliers.map((s, i) => {
                const t = items.filter(i2 => i2.supplier === s).reduce((sum, i2) => sum + i2.total, 0);
                const c = items.filter(i2 => i2.supplier === s).length;
                return (
                  <div key={s} className="flex items-center gap-3 p-3 rounded-xl bg-k-surface2 border border-k-border">
                    <div className="w-7 h-7 rounded-lg bg-k-surface3 flex items-center justify-center text-xs font-bold text-k-dim">{i + 1}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-k-text">{s}</div>
                      <div className="text-xs text-k-muted">{c} товара</div>
                    </div>
                    <div className="text-sm font-bold text-k-text">{formatMoney(t)}</div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between py-3 border-t border-k-border mb-4">
              <span className="text-sm font-semibold text-k-text">Итого</span>
              <span className="text-xl font-bold text-orange-400">{formatMoney(total)}</span>
            </div>

            <button
              onClick={() => setStep('success')}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors mb-2"
            >
              Разместить все заказы
            </button>
            <button
              onClick={() => setStep('cart')}
              className="w-full py-2 text-xs text-k-muted hover:text-k-dim transition-colors"
            >
              ← Вернуться в корзину
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
