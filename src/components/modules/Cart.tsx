import { useState } from 'react';
import { demoCart } from '@/data/demo';
import Icon from '@/components/ui/icon';

const formatMoney = (v: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v);

export default function Cart() {
  const [items, setItems] = useState(demoCart);
  const [step, setStep] = useState<'cart' | 'confirm'>('cart');

  const suppliers = [...new Set(items.map(i => i.supplier))];
  const total = items.reduce((s, i) => s + i.total, 0);

  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: number, delta: number) => setItems(prev =>
    prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta), total: Math.max(i.price, (i.qty + delta) * i.price) } : i)
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-k-text">Корзина</h1>
          <p className="text-sm text-k-muted mt-0.5">{items.length} товаров от {suppliers.length} поставщиков</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Icon name="Sparkles" size={14} className="text-orange-400" />
            <span className="text-xs text-emerald-400 font-medium">KOMI сэкономил ₽184 000</span>
          </div>
        </div>
      </div>

      {step === 'cart' ? (
        <div className="grid grid-cols-3 gap-4">
          {/* Items by supplier */}
          <div className="col-span-2 space-y-4">
            {suppliers.map((supplier) => {
              const supplierItems = items.filter(i => i.supplier === supplier);
              const supplierTotal = supplierItems.reduce((s, i) => s + i.total, 0);

              return (
                <div key={supplier} className="bg-k-surface border border-k-border rounded-xl overflow-hidden">
                  {/* Supplier Header */}
                  <div className="flex items-center justify-between px-5 py-3 bg-k-surface2 border-b border-k-border">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-k-surface3 border border-k-border flex items-center justify-center">
                        <Icon name="Store" size={13} className="text-k-dim" />
                      </div>
                      <span className="text-sm font-semibold text-k-text">{supplier}</span>
                      <span className="text-[10px] bg-k-surface3 text-k-dim px-1.5 py-0.5 rounded-full font-medium">
                        {supplierItems.length} товара
                      </span>
                    </div>
                    <span className="text-sm font-bold text-k-text">{formatMoney(supplierTotal)}</span>
                  </div>

                  {/* Items */}
                  <div className="divide-y divide-k-border/50">
                    {supplierItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-k-surface2/30 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center flex-shrink-0">
                          <Icon name="Package" size={16} className="text-k-muted" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-k-text truncate">{item.product}</div>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-xs text-k-muted">Доставка: {item.delivery}</span>
                            <span className="text-xs text-k-muted">{formatMoney(item.price)} / шт</span>
                          </div>
                        </div>

                        {/* Qty */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-k-surface2 border border-k-border flex items-center justify-center hover:border-orange-500/30 transition-colors"
                          >
                            <Icon name="Minus" size={10} className="text-k-dim" />
                          </button>
                          <span className="text-sm font-mono text-k-text w-8 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-k-surface2 border border-k-border flex items-center justify-center hover:border-orange-500/30 transition-colors"
                          >
                            <Icon name="Plus" size={10} className="text-k-dim" />
                          </button>
                        </div>

                        <div className="text-right w-28">
                          <div className="text-sm font-bold text-k-text">{formatMoney(item.total)}</div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 rounded-md hover:bg-red-500/10 flex items-center justify-center transition-colors group"
                        >
                          <Icon name="Trash2" size={13} className="text-k-muted group-hover:text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="space-y-3">
            {/* Order Summary */}
            <div className="bg-k-surface border border-k-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-k-text mb-4">Сводка заказа</h3>

              <div className="space-y-2.5">
                {suppliers.map((s) => {
                  const t = items.filter(i => i.supplier === s).reduce((sum, i) => sum + i.total, 0);
                  return (
                    <div key={s} className="flex items-center justify-between">
                      <span className="text-xs text-k-muted">{s}</span>
                      <span className="text-xs font-medium text-k-text">{formatMoney(t)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="my-3 border-t border-k-border" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-k-text">Итого</span>
                <span className="text-lg font-bold text-k-text">{formatMoney(total)}</span>
              </div>

              <button
                onClick={() => setStep('confirm')}
                className="w-full mt-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
              >
                Оформить заказы
              </button>

              <p className="text-[10px] text-k-muted text-center mt-2">
                Заказы будут автоматически разделены по поставщикам
              </p>
            </div>

            {/* Delivery Info */}
            <div className="bg-k-surface border border-k-border rounded-xl p-4">
              <h3 className="text-xs font-semibold text-k-dim mb-3 uppercase tracking-wide">Сроки доставки</h3>
              {suppliers.map((s) => {
                const item = items.find(i => i.supplier === s);
                return (
                  <div key={s} className="flex items-center justify-between mb-2">
                    <span className="text-xs text-k-muted">{s}</span>
                    <span className="text-xs font-medium text-k-text">{item?.delivery}</span>
                  </div>
                );
              })}
            </div>

            {/* KOMI hint */}
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Sparkles" size={14} className="text-orange-400" />
                <span className="text-xs font-semibold text-orange-400">KOMI</span>
              </div>
              <p className="text-[11px] text-k-dim leading-relaxed">
                Найдена замена плитке: сэкономьте ещё ₽84 000 без потери качества
              </p>
              <button className="mt-2 text-xs text-orange-400 hover:text-orange-300 font-medium">
                Посмотреть альтернативы →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Checkout confirmation */
        <div className="max-w-xl mx-auto animate-fade-in">
          <div className="bg-k-surface border border-k-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Icon name="CheckCircle" size={20} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-k-text">Подтверждение заказов</h2>
                <p className="text-xs text-k-muted">Будет создано {suppliers.length} заказа по поставщикам</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {suppliers.map((s, i) => {
                const t = items.filter(i2 => i2.supplier === s).reduce((sum, i2) => sum + i2.total, 0);
                const c = items.filter(i2 => i2.supplier === s).length;
                return (
                  <div key={s} className="flex items-center gap-3 p-3 rounded-xl bg-k-surface2 border border-k-border">
                    <div className="w-7 h-7 rounded-lg bg-k-surface3 flex items-center justify-center text-xs font-bold text-k-dim">
                      {i + 1}
                    </div>
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
              <span className="text-sm font-semibold text-k-text">Общая сумма</span>
              <span className="text-xl font-bold text-orange-400">{formatMoney(total)}</span>
            </div>

            <button className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors mb-2">
              Разместить все заказы
            </button>
            <button onClick={() => setStep('cart')} className="w-full py-2 text-xs text-k-muted hover:text-k-dim transition-colors">
              ← Вернуться в корзину
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
