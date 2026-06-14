import { useState } from 'react';
import { demoProjects } from '@/data/demo';
import Icon from '@/components/ui/icon';
import type { Module } from '@/App';

interface ProjectsProps {
  onNavigate?: (m: Module) => void;
}

const typeIcons: Record<string, string> = {
  'Жилой комплекс': 'Building',
  'Офис': 'Briefcase',
  'Квартира': 'Home',
  'Гостиница': 'Hotel',
  'Загородный дом': 'TreePine',
};

const formatMoney = (v: number) => {
  if (v >= 1_000_000) return `₽${(v / 1_000_000).toFixed(1)}М`;
  return `₽${(v / 1_000).toFixed(0)}К`;
};

const statusConfig: Record<string, { label: string; cls: string }> = {
  active: { label: 'Активен', cls: 'bg-emerald-500/10 text-emerald-400' },
  planning: { label: 'Планирование', cls: 'bg-blue-500/10 text-blue-400' },
  completed: { label: 'Завершён', cls: 'bg-k-surface3 text-k-muted' },
};

const roomsList = [
  { name: 'Гостиная', icon: 'Sofa', products: 14, budget: 820000, status: 'in-progress' },
  { name: 'Спальня', icon: 'BedDouble', products: 9, budget: 450000, status: 'planned' },
  { name: 'Кухня', icon: 'ChefHat', products: 22, budget: 1200000, status: 'in-progress' },
  { name: 'Ванная', icon: 'Bath', products: 18, budget: 680000, status: 'approved' },
  { name: 'Прихожая', icon: 'DoorOpen', products: 7, budget: 290000, status: 'planned' },
];

const projectTypes = ['Квартира', 'Загородный дом', 'Офис', 'Гостиница', 'Жилой комплекс', 'Другое'];

export default function Projects({ onNavigate }: ProjectsProps) {
  const [selected, setSelected] = useState<typeof demoProjects[0] | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('');
  const [newBudget, setNewBudget] = useState('');
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [rooms, setRooms] = useState(roomsList);
  const [newRoom, setNewRoom] = useState('');

  const handleCreateProject = () => {
    if (!newName.trim()) return;
    setShowNew(false);
    setNewName('');
    setNewType('');
    setNewBudget('');
  };

  const handleAddRoom = () => {
    if (!newRoom.trim()) return;
    setRooms(prev => [...prev, { name: newRoom, icon: 'Square', products: 0, budget: 0, status: 'planned' }]);
    setNewRoom('');
    setShowAddRoom(false);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-k-text">Проекты</h1>
          <p className="text-xs lg:text-sm text-k-muted mt-0.5">
            {demoProjects.length} проектов · {demoProjects.filter(p => p.status === 'active').length} активных
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
        >
          <Icon name="Plus" size={15} />
          <span className="hidden sm:inline">Новый проект</span>
        </button>
      </div>

      {selected ? (
        /* Project Detail */
        <div className="animate-fade-in space-y-4">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-xs text-k-muted hover:text-k-dim transition-colors"
          >
            <Icon name="ChevronLeft" size={14} />
            Все проекты
          </button>

          {/* Project Header */}
          <div className="bg-k-surface border border-k-border rounded-xl p-4 lg:p-5">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-xl bg-k-surface2 border border-k-border flex items-center justify-center flex-shrink-0">
                  <Icon name={typeIcons[selected.type] ?? 'Building2'} size={20} className="text-orange-400" fallback="Building2" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-k-text">{selected.name}</h2>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-k-muted">{selected.type}</span>
                    <span className="text-xs text-k-muted hidden sm:inline">· {selected.city}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[selected.status].cls}`}>
                      {statusConfig[selected.status].label}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-k-surface2 border border-k-border text-xs text-k-dim hover:text-k-text transition-colors">
                  Редактировать
                </button>
                <button
                  onClick={() => onNavigate?.('specs')}
                  className="px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 transition-colors"
                >
                  + Спецификация
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 mt-4">
              {[
                { label: 'Бюджет', value: formatMoney(selected.budget), icon: 'Wallet' },
                { label: 'Потрачено', value: formatMoney(selected.spent), icon: 'TrendingUp' },
                { label: 'Остаток', value: formatMoney(selected.budget - selected.spent), icon: 'PiggyBank' },
                { label: 'Заказы', value: String(selected.orders), icon: 'Package' },
                { label: 'Комнаты', value: String(selected.rooms), icon: 'LayoutGrid' },
              ].map((s, i) => (
                <div key={i} className="bg-k-surface2 rounded-lg p-2.5 lg:p-3 border border-k-border">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon name={s.icon} size={11} className="text-k-muted" fallback="Circle" />
                    <span className="text-[10px] text-k-muted">{s.label}</span>
                  </div>
                  <div className="text-xs lg:text-sm font-bold text-k-text">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-k-muted">Прогресс</span>
                <span className="text-xs font-semibold text-orange-400">{selected.progress}%</span>
              </div>
              <div className="h-2 bg-k-surface3 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400" style={{ width: `${selected.progress}%` }} />
              </div>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="bg-k-surface border border-k-border rounded-xl">
            <div className="flex items-center justify-between px-4 lg:px-5 py-3.5 border-b border-k-border">
              <h3 className="text-sm font-semibold text-k-text">Комнаты и помещения</h3>
              <button
                onClick={() => setShowAddRoom(true)}
                className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Icon name="Plus" size={13} />
                Добавить комнату
              </button>
            </div>
            <div className="p-3 lg:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {rooms.map((room, i) => (
                <div
                  key={i}
                  onClick={() => onNavigate?.('specs')}
                  className="bg-k-surface2 border border-k-border rounded-xl p-3 lg:p-4 hover:border-orange-500/30 transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-k-surface3 border border-k-border flex items-center justify-center mb-2 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-all">
                    <Icon name={room.icon} size={15} className="text-k-dim group-hover:text-orange-400" fallback="Square" />
                  </div>
                  <div className="text-xs font-semibold text-k-text">{room.name}</div>
                  <div className="text-[10px] text-k-muted mt-0.5">{room.products} товаров</div>
                  {room.budget > 0 && <div className="text-xs font-medium text-k-dim mt-1">{formatMoney(room.budget)}</div>}
                  <div className={`mt-2 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full w-fit ${
                    room.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                    room.status === 'in-progress' ? 'bg-orange-500/10 text-orange-400' :
                    'bg-k-surface3 text-k-muted'
                  }`}>
                    {room.status === 'approved' ? 'Согласовано' : room.status === 'in-progress' ? 'В работе' : 'Запланировано'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoProjects.map((p) => {
            const s = statusConfig[p.status];
            const spentPct = Math.round((p.spent / p.budget) * 100);
            return (
              <div
                key={p.id}
                onClick={() => setSelected(p)}
                className="bg-k-surface border border-k-border rounded-xl p-4 lg:p-5 hover-lift cursor-pointer group hover:border-orange-500/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-k-surface2 border border-k-border flex items-center justify-center group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-all">
                    <Icon name={typeIcons[p.type] ?? 'Building2'} size={18} className="text-k-dim group-hover:text-orange-400" fallback="Building2" />
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.cls}`}>{s.label}</span>
                </div>

                <h3 className="text-sm font-bold text-k-text mb-0.5">{p.name}</h3>
                <p className="text-xs text-k-muted">{p.type} · {p.city}</p>

                <div className="mt-4 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-k-muted">Прогресс</span>
                    <span className="text-k-text font-semibold">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-k-surface3 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-k-muted">Бюджет</div>
                    <div className="text-sm font-bold text-k-text">{formatMoney(p.budget)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-k-muted">Потрачено</div>
                    <div className={`text-sm font-bold ${spentPct > 90 ? 'text-red-400' : 'text-k-text'}`}>{formatMoney(p.spent)}</div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-k-border flex items-center gap-3 text-[10px] text-k-muted">
                  <span className="flex items-center gap-1"><Icon name="LayoutGrid" size={10} />{p.rooms} комнат</span>
                  <span className="flex items-center gap-1"><Icon name="Package" size={10} />{p.orders} заказов</span>
                </div>
              </div>
            );
          })}

          {/* New Project Card */}
          <div
            onClick={() => setShowNew(true)}
            className="border-2 border-dashed border-k-border rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500/30 hover:bg-orange-500/3 transition-all min-h-[200px] group"
          >
            <div className="w-10 h-10 rounded-xl border-2 border-dashed border-k-border flex items-center justify-center mb-3 group-hover:border-orange-500/30 transition-colors">
              <Icon name="Plus" size={18} className="text-k-muted group-hover:text-orange-400" />
            </div>
            <div className="text-sm font-medium text-k-muted group-hover:text-k-dim">Новый проект</div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-k-surface border border-k-border rounded-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-k-border">
              <h2 className="text-base font-bold text-k-text">Создать проект</h2>
              <button onClick={() => setShowNew(false)} className="w-7 h-7 rounded-lg bg-k-surface2 flex items-center justify-center hover:bg-k-surface3 transition-colors">
                <Icon name="X" size={14} className="text-k-dim" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Название проекта</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-k-surface2 border border-k-border rounded-lg text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="Напр. ЖК Авангард"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Тип объекта</label>
                <div className="grid grid-cols-3 gap-2">
                  {projectTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => setNewType(t)}
                      className={`py-2 text-xs rounded-lg border transition-all ${
                        newType === t
                          ? 'border-orange-500/50 bg-orange-500/10 text-orange-400'
                          : 'bg-k-surface2 border-k-border text-k-dim hover:border-orange-500/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Бюджет</label>
                <input
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-full px-3 py-2.5 bg-k-surface2 border border-k-border rounded-lg text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50 transition-colors"
                  placeholder="₽ 0"
                  type="number"
                />
              </div>
              <button
                onClick={handleCreateProject}
                disabled={!newName.trim()}
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                Создать проект
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Room Modal */}
      {showAddRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-k-surface border border-k-border rounded-2xl w-full max-w-sm animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-k-border">
              <h2 className="text-base font-bold text-k-text">Добавить комнату</h2>
              <button onClick={() => setShowAddRoom(false)} className="w-7 h-7 rounded-lg bg-k-surface2 flex items-center justify-center">
                <Icon name="X" size={14} className="text-k-dim" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Название помещения</label>
                <input
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                  className="w-full px-3 py-2.5 bg-k-surface2 border border-k-border rounded-lg text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50"
                  placeholder="Напр. Гостиная"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleAddRoom()}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Гостиная', 'Спальня', 'Кухня', 'Ванная', 'Кабинет', 'Балкон'].map(r => (
                  <button
                    key={r}
                    onClick={() => setNewRoom(r)}
                    className={`py-1.5 text-xs rounded-lg border transition-all ${newRoom === r ? 'border-orange-500/50 text-orange-400 bg-orange-500/10' : 'bg-k-surface2 border-k-border text-k-dim hover:border-orange-500/20'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddRoom}
                disabled={!newRoom.trim()}
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
