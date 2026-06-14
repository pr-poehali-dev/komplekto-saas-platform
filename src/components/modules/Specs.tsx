import { useState } from 'react';
import { demoSpecs } from '@/data/demo';
import Icon from '@/components/ui/icon';

const formatMoney = (v: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v);

const statusMap: Record<string, { label: string; cls: string }> = {
  confirmed: { label: 'Подтверждён', cls: 'bg-emerald-500/10 text-emerald-400' },
  pending: { label: 'Ожидает', cls: 'bg-yellow-500/10 text-yellow-400' },
  draft: { label: 'Черновик', cls: 'bg-k-surface3 text-k-muted' },
  approved: { label: 'Согласована', cls: 'bg-emerald-500/10 text-emerald-400' },
};

export default function Specs() {
  const [selected, setSelected] = useState<typeof demoSpecs[0]>(demoSpecs[0]);
  const [showNew, setShowNew] = useState(false);
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [toast, setToast] = useState('');
  const [newName, setNewName] = useState('');
  const [newProject, setNewProject] = useState('ЖК Авангард');
  const [newRoom, setNewRoom] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const spec = selected;
  const total = spec.items.reduce((s, i) => s + i.total, 0);

  const handleExportPDF = () => showToast('PDF скачивается...');
  const handleExportExcel = () => {
    const csv = [
      ['#', 'Наименование', 'Кол-во', 'Ед.', 'Поставщик', 'Цена', 'Итого', 'Статус'].join(','),
      ...spec.items.map((item, i) => [i + 1, item.product, item.qty, item.unit, item.supplier, item.price, item.total, statusMap[item.status].label].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = `spec_${spec.id}.csv`; a.click(); URL.revokeObjectURL(url);
    showToast('Excel экспортирован');
  };

  const SpecDetail = () => (
    <div className="bg-k-surface border border-k-border rounded-xl flex flex-col">
      {/* Header */}
      <div className="p-4 lg:p-5 border-b border-k-border">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusMap[spec.status].cls}`}>
                {statusMap[spec.status].label}
              </span>
              <span className="text-[10px] text-k-muted">{spec.project} / {spec.room}</span>
            </div>
            <h2 className="text-sm lg:text-base font-bold text-k-text">{spec.name}</h2>
          </div>
          <div className="text-right">
            <div className="text-xs text-k-muted">Итого</div>
            <div className="text-xl font-bold text-k-text">{formatMoney(total)}</div>
          </div>
        </div>
      </div>

      {/* Budget breakdown */}
      <div className="grid grid-cols-3 divide-x divide-k-border border-b border-k-border">
        {[
          { label: 'Подтверждено', value: spec.items.filter(i => i.status === 'confirmed').reduce((s, i) => s + i.total, 0), cls: 'text-emerald-400' },
          { label: 'Ожидает', value: spec.items.filter(i => i.status === 'pending').reduce((s, i) => s + i.total, 0), cls: 'text-yellow-400' },
          { label: 'Позиций', value: spec.items.length, cls: 'text-k-text', isCount: true },
        ].map((b, i) => (
          <div key={i} className="px-3 lg:px-5 py-3 text-center">
            <div className="text-[10px] text-k-muted">{b.label}</div>
            <div className={`text-sm lg:text-base font-bold mt-0.5 ${b.cls}`}>
              {b.isCount ? b.value : formatMoney(b.value as number)}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-k-border">
              <th className="text-left px-4 lg:px-5 py-3 text-[11px] font-medium text-k-muted">#</th>
              <th className="text-left px-3 py-3 text-[11px] font-medium text-k-muted">НАИМЕНОВАНИЕ</th>
              <th className="text-right px-3 py-3 text-[11px] font-medium text-k-muted">КОЛ-ВО</th>
              <th className="text-left px-3 py-3 text-[11px] font-medium text-k-muted">ЕД.</th>
              <th className="text-left px-3 py-3 text-[11px] font-medium text-k-muted">ПОСТАВЩИК</th>
              <th className="text-right px-3 py-3 text-[11px] font-medium text-k-muted">ЦЕНА</th>
              <th className="text-right px-3 py-3 text-[11px] font-medium text-k-muted">ИТОГО</th>
              <th className="text-center px-4 py-3 text-[11px] font-medium text-k-muted">СТАТУС</th>
            </tr>
          </thead>
          <tbody>
            {spec.items.map((item, i) => (
              <tr key={i} className="border-b border-k-border/50 hover:bg-k-surface2/30 transition-colors">
                <td className="px-4 lg:px-5 py-3.5 text-xs text-k-muted font-mono">{String(i + 1).padStart(2, '0')}</td>
                <td className="px-3 py-3.5 text-xs font-medium text-k-text">{item.product}</td>
                <td className="px-3 py-3.5 text-xs font-mono text-k-text text-right">{item.qty}</td>
                <td className="px-3 py-3.5 text-xs text-k-muted">{item.unit}</td>
                <td className="px-3 py-3.5 text-xs text-k-dim">{item.supplier}</td>
                <td className="px-3 py-3.5 text-xs text-k-text text-right font-mono">{formatMoney(item.price)}</td>
                <td className="px-3 py-3.5 text-sm font-bold text-k-text text-right">{formatMoney(item.total)}</td>
                <td className="px-4 py-3.5 text-center">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusMap[item.status].cls}`}>
                    {statusMap[item.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-k-surface2">
              <td colSpan={6} className="px-4 lg:px-5 py-3.5 text-sm font-bold text-k-text text-right">ИТОГО:</td>
              <td className="px-3 py-3.5 text-base font-bold text-orange-400 text-right">{formatMoney(total)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="p-4 border-t border-k-border flex items-center justify-between">
        <button
          onClick={() => showToast('Позиция добавлена')}
          className="flex items-center gap-2 text-xs text-k-muted hover:text-orange-400 transition-colors"
        >
          <Icon name="Plus" size={14} />
          Добавить позицию
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-k-muted hidden sm:inline">KOMI:</span>
          <button
            onClick={() => showToast('KOMI анализирует спецификацию...')}
            className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors"
          >
            <Icon name="Sparkles" size={13} />
            Найти экономию
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 lg:space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-k-text">Спецификации</h1>
          <p className="text-xs lg:text-sm text-k-muted mt-0.5">Управление и расчёт бюджетов</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-k-surface border border-k-border text-sm text-k-dim hover:text-k-text transition-colors"
          >
            <Icon name="Download" size={14} />
            PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-k-surface border border-k-border text-sm text-k-dim hover:text-k-text transition-colors"
          >
            <Icon name="FileSpreadsheet" size={14} />
            Excel
          </button>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 px-3 lg:px-4 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
          >
            <Icon name="Plus" size={15} />
            <span className="hidden sm:inline">Создать</span>
          </button>
        </div>
      </div>

      {/* Mobile export */}
      <div className="flex gap-2 sm:hidden">
        <button onClick={handleExportPDF} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-k-surface border border-k-border text-xs text-k-dim">
          <Icon name="Download" size={13} /> PDF
        </button>
        <button onClick={handleExportExcel} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-k-surface border border-k-border text-xs text-k-dim">
          <Icon name="FileSpreadsheet" size={13} /> Excel
        </button>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        {/* Spec list */}
        <div className="col-span-1 space-y-2">
          {demoSpecs.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selected?.id === s.id ? 'border-orange-500/40 bg-orange-500/5' : 'bg-k-surface border-k-border hover:border-k-surface3'
              }`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusMap[s.status].cls}`}>
                  {statusMap[s.status].label}
                </span>
              </div>
              <div className="text-xs font-semibold text-k-text leading-tight">{s.name}</div>
              <div className="text-[10px] text-k-muted mt-1">{s.project} · {s.room}</div>
              <div className="text-xs font-bold text-k-text mt-2">{formatMoney(s.total)}</div>
              <div className="text-[10px] text-k-muted">{s.itemsCount} позиций</div>
            </div>
          ))}
          <button
            onClick={() => setShowNew(true)}
            className="w-full py-3 rounded-xl border-2 border-dashed border-k-border text-xs text-k-muted hover:border-orange-500/30 hover:text-orange-400 transition-all flex items-center justify-center gap-2"
          >
            <Icon name="Plus" size={14} />
            Новая спецификация
          </button>
        </div>

        <div className="col-span-3">
          <SpecDetail />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden space-y-3">
        <div className="space-y-2">
          {demoSpecs.map((s) => (
            <div
              key={s.id}
              onClick={() => { setSelected(s); setShowMobileDetail(true); }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selected?.id === s.id ? 'border-orange-500/40 bg-orange-500/5' : 'bg-k-surface border-k-border'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-k-text truncate">{s.name}</div>
                  <div className="text-xs text-k-muted mt-0.5">{s.project} · {s.room} · {s.itemsCount} позиций</div>
                </div>
                <div className="text-right ml-3 flex-shrink-0">
                  <div className="text-sm font-bold text-k-text">{formatMoney(s.total)}</div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusMap[s.status].cls}`}>
                    {statusMap[s.status].label}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => setShowNew(true)}
            className="w-full py-3 rounded-xl border-2 border-dashed border-k-border text-xs text-k-muted flex items-center justify-center gap-2"
          >
            <Icon name="Plus" size={14} /> Новая спецификация
          </button>
        </div>
      </div>

      {/* Mobile detail modal */}
      {showMobileDetail && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-k-bg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-k-border bg-k-surface">
            <button onClick={() => setShowMobileDetail(false)} className="flex items-center gap-2 text-xs text-k-muted">
              <Icon name="ChevronLeft" size={14} /> Назад
            </button>
            <div className="flex gap-2">
              <button onClick={handleExportPDF} className="text-xs text-k-dim hover:text-orange-400"><Icon name="Download" size={14} /></button>
              <button onClick={handleExportExcel} className="text-xs text-k-dim hover:text-orange-400"><Icon name="FileSpreadsheet" size={14} /></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <SpecDetail />
          </div>
        </div>
      )}

      {/* New Spec Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-k-surface border border-k-border rounded-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-k-border">
              <h2 className="text-base font-bold text-k-text">Новая спецификация</h2>
              <button onClick={() => setShowNew(false)} className="w-7 h-7 rounded-lg bg-k-surface2 flex items-center justify-center hover:bg-k-surface3 transition-colors">
                <Icon name="X" size={14} className="text-k-dim" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Название</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-k-surface2 border border-k-border rounded-lg text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="Спецификация гостиной"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Проект</label>
                <select
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-k-surface2 border border-k-border rounded-lg text-sm text-k-text focus:outline-none focus:border-orange-500/50"
                >
                  <option>ЖК Авангард</option>
                  <option>Офис Meridian</option>
                  <option>Апартаменты Sky</option>
                  <option>Отель Grand</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Помещение</label>
                <input
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  className="w-full px-3 py-2.5 bg-k-surface2 border border-k-border rounded-lg text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50"
                  placeholder="Гостиная, кухня, ванная..."
                />
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-500/5 border border-orange-500/20">
                <Icon name="Sparkles" size={14} className="text-orange-400 flex-shrink-0" />
                <span className="text-xs text-k-dim">KOMI создаст спецификацию автоматически по параметрам помещения</span>
              </div>
              <button
                onClick={() => { setShowNew(false); showToast('Спецификация создана'); setNewName(''); setNewRoom(''); }}
                disabled={!newName.trim()}
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                Создать спецификацию
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-k-surface border border-k-border text-k-text text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl animate-slide-up z-50 whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
